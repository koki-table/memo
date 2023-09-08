import { useToast } from '@chakra-ui/react'
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createContext, ReactNode, useContext, FC, useState, useCallback, useMemo } from 'react'
import { FieldValues } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'

import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Recipe } from '@/types/Recipe'
import { createCollection, db } from '@/utils/database'
import { hasTargetValue } from '@/utils/hasTargetValue'

export type option = [
  {
    value: string
    label: string
  }
]

export type UseRecipe = {
  isLoading: boolean
  recipeData: Recipe[]
  updateLocalRecipeHandler: (newRecipe: Recipe, index: number) => void
  removeRecipeHandler: (index: number, date: string) => Promise<void>
  imgFiles: { [index: number]: File } | null
  updateImgFile: (newImgFile: File, index: number) => void
  registerRecipeHandler: (data: FieldValues, date: string) => Promise<void>
  updateRecipeHandler: (data: FieldValues, date: string) => Promise<void>
  options: option | undefined
  isLoadingButton: boolean
  fetchRecipe: (date: string) => Promise<void>
}

const recipeContext = createContext<UseRecipe | undefined>(undefined)

type Props = { children: ReactNode }

export const useRecipe = () => {
  const context = useContext(recipeContext)

  if (context === undefined) {
    throw new Error('useRecipeがRecipeProvider内で利用されていません')
  }
  return context
}

export const RecipeProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const recipe = useRecipeProvider()
  return <recipeContext.Provider value={recipe}>{children}</recipeContext.Provider>
}

const useRecipeProvider = (): UseRecipe => {
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { user } = useAuth()
  const uniqueId: string = uuidv4()

  const defaultRecipe = useMemo(() => {
    return {
      img: '',
      name: '',
      memo: '',
      category: '',
      date: '',
    }
  }, [])
  const [recipeData, setRecipeData] = useState<Recipe[]>([defaultRecipe])

  const [imgFiles, setImgFiles] = useState<{ [index: number]: File } | null>(null)

  const [options, setOptions] = useState<
    [
      {
        value: string
        label: string
      }
    ]
  >()

  const fetchRecipe = useCallback(
    async (date: string) => {
      try {
        const categoryDoc = doc(db, `users/${user!.uid.toString()}`)
        const recipeDoc = doc(db, `users/${user!.uid.toString()}/dates/${date}`)

        setIsLoading(true)
        const queryRecipe = await getDoc(recipeDoc)
        const queryCategory = await getDoc(categoryDoc)
        setIsLoading(false)

        if (queryCategory.data() != null) {
          setOptions(queryCategory.data()!.categories.map((v: string) => ({ value: v, label: v })))
        } else {
          console.log('categoryは未登録です。')
        }

        if (queryRecipe.exists()) {
          setRecipeData((queryRecipe.data().recipes as Recipe[]) ?? [defaultRecipe])
          return
        } else {
          setRecipeData([defaultRecipe])
          setImgFiles(null)
        }
      } catch (e: any) {
        console.log(e.message)
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
      }
    },
    [defaultRecipe, toast, user]
  )

  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const updateLocalRecipeHandler = useCallback(
    (newRecipe: Recipe, index: number) => {
      setRecipeData((prevRecipes) =>
        prevRecipes.map((prevRecipe, i) => (i === index ? newRecipe : prevRecipe))
      )
      setRecipeData((prevRecipes) => [...prevRecipes, defaultRecipe])
    },
    [defaultRecipe]
  )

  const removeRecipeHandler = useCallback(
    async (index: number, date: string) => {
      setRecipeData((recipeData) => recipeData.filter((_, i) => i !== index))
      const recipeDoc = doc(createCollection('dates', user), date)

      const removeRecipe = recipeData.filter((_, i) => i !== index)
      await setDoc(recipeDoc, {
        recipes: removeRecipe,
      })
      if (imgFiles != null) {
        setImgFiles((prevImgFiles) => {
          const updatedImgFiles = Object.keys(prevImgFiles!)
            .filter((key) => parseInt(key) !== index)
            .reduce<{ [key: number]: File }>((acc, key) => {
              acc[parseInt(key)] = prevImgFiles![parseInt(key)]
              return acc
            }, {})
          return updatedImgFiles
        })
      }
    },
    [imgFiles, recipeData, user]
  )

  const updateImgFile = useCallback((newImgFile: File, index: number) => {
    setImgFiles((imgFiles) => {
      if (imgFiles?.[index]) {
        // 既存のimgFilesが登録済みの場合は更新する
        const updatedImgFiles = { ...imgFiles, [index]: newImgFile }
        return updatedImgFiles
      } else {
        // 新しい値を連想配列に追加する
        return { ...imgFiles, [index]: newImgFile }
      }
    })
  }, [])

  const handleStorage = useCallback(async () => {
    if (imgFiles != null) {
      const uploadPromises = Object.entries(imgFiles).map(async ([index, file]) => {
        // 画像をstorageにアップロード
        const uploadStorage = ref(storage, `users/${user!.uid.toString()}/${uniqueId}_${file.name}`)
        const imgData = await uploadBytes(uploadStorage, file)

        // アップロードした画像のURLを取得
        const downloadURL = await getDownloadURL(imgData.ref)
        return [Number(index), downloadURL] // [index, downloadURL]の形式で返り値を設定
      })

      const downloadURLs = await Promise.all(uploadPromises)
      const result = Object.fromEntries(downloadURLs) // 返り値を連想配列に変換

      return result
    }
    return null
  }, [imgFiles, uniqueId, user])

  const updateRecipeHandler = useCallback(
    async (data: FieldValues, date: string) => {
      const imgPath = await handleStorage()
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      setIsLoadingButton(true)

      const firstRecipe = [
        {
          img: imgPath != null ? imgPath[0] : data.img,
          name: data.name,
          memo: data.memo,
          category: data.category,
          date,
        },
      ]

      // 画面描画用の最後のdefaultオブジェクトを削除
      const formattedRecipes = recipeData.filter((_, i) => i !== recipeData.length - 1)

      const imgPathFilter = (index: number) => {
        if (imgPath != null) {
          if (imgPath[index] != null) {
            return imgPath[index]
          }
          return null
        }
      }

      const connectedImgWithRecipe = () => {
        const connectedData = formattedRecipes.map((recipe, i) => ({
          img: imgPathFilter(i) ?? recipe.img ?? defaultRecipe.img,
          name: recipe.name,
          memo: recipe.memo,
          category: recipe.category,
          date,
        }))

        if (data.name !== defaultRecipe.name) {
          const appendedLastData = [
            ...connectedData,
            {
              img:
                imgPathFilter(recipeData.length - 1) ??
                recipeData[recipeData.length - 1].img ??
                defaultRecipe.img,
              name: data.name,
              memo: data.memo,
              category: data.category,
              date,
            },
          ]
          return appendedLastData
        }
      }

      const recipes = recipeData.length === 1 ? firstRecipe : connectedImgWithRecipe()
      const recipeDoc = doc(createCollection('dates', user), date)

      await setDoc(recipeDoc, {
        recipes,
      })

      // 新規でカテゴリーを追加した場合は、dbのカテゴリーを追加
      if (options === undefined) {
        await setDoc(categoryDoc, {
          categories: arrayUnion(data.category),
        })
      } else {
        // 既存のカテゴリーに新規追加した場合は、dbのカテゴリーを更新
        if (!hasTargetValue(options, data.category))
          await updateDoc(categoryDoc, {
            categories: arrayUnion(data.category),
          })
      }

      setIsLoadingButton(false)

      toast({
        title: '保存しました。',
        status: 'success',
        position: 'top',
        duration: 1300,
      })
    },
    [defaultRecipe.img, defaultRecipe.name, handleStorage, options, recipeData, toast, user]
  )

  const registerRecipeHandler = useCallback(
    async (data: FieldValues, date: string) => {
      const imgPath = await handleStorage()
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      setIsLoadingButton(true)

      const firstRecipe = [
        {
          img: imgFiles != null ? imgPath[0] : data.img,
          name: data.name,
          memo: data.memo,
          category: data.category,
          date,
        },
      ]

      // 画面描画用の最後のdefaultオブジェクトを削除
      const formattedRecipes = recipeData.filter((_, i) => i !== recipeData.length - 1)

      const connectedImgWithRecipe = () => {
        const connectedData = formattedRecipes.map((recipe, i) => ({
          img: imgPath[i] ?? defaultRecipe.img,
          name: recipe.name,
          memo: recipe.memo,
          category: recipe.category,
          date,
        }))

        const appendedLastData = [
          ...connectedData,
          {
            img: imgPath[Object.keys(imgPath).length - 1] ?? defaultRecipe.img,
            name: data.name,
            memo: data.memo,
            category: data.category,
            date,
          },
        ]
        return appendedLastData
      }

      const recipes = recipeData.length === 1 ? firstRecipe : connectedImgWithRecipe()
      const recipeDoc = doc(createCollection('dates', user), date)

      await setDoc(recipeDoc, {
        recipes,
      })

      // 新規でカテゴリーを追加した場合は、dbのカテゴリーを追加
      if (options === undefined) {
        await setDoc(categoryDoc, {
          categories: arrayUnion(data.category),
        })
      } else {
        // 既存のカテゴリーに新規追加した場合は、dbのカテゴリーを更新
        if (!hasTargetValue(options, data.category))
          await updateDoc(categoryDoc, {
            categories: arrayUnion(data.category),
          })
      }

      setIsLoadingButton(false)

      toast({
        title: '保存しました。',
        status: 'success',
        position: 'top',
        duration: 1300,
      })
    },
    [defaultRecipe.img, handleStorage, imgFiles, options, recipeData, toast, user]
  )

  return {
    isLoading,
    recipeData,
    updateLocalRecipeHandler,
    removeRecipeHandler,
    imgFiles,
    updateImgFile,
    registerRecipeHandler,
    options,
    isLoadingButton,
    fetchRecipe,
    updateRecipeHandler,
  }
}
