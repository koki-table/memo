import { useToast } from '@chakra-ui/react'
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { createContext, ReactNode, useContext, FC, useState, useCallback, useMemo } from 'react'
import { FieldValues } from 'react-hook-form'

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
  imgFiles: { [index: number]: File } | undefined
  appendImgFile: (newImgFile: File, index: number) => void
  registerRecipeHandler: (data: FieldValues, date: string) => Promise<void>
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

  const [imgFiles, setImgFiles] = useState<{ [index: number]: File }>()

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

        console.log(recipeDoc)

        setIsLoading(true)
        const queryDateSnapshot = await getDoc(recipeDoc)
        const queryCategorySnapshot = await getDoc(categoryDoc)
        setIsLoading(false)

        if (queryCategorySnapshot.exists()) {
          setOptions(
            queryCategorySnapshot.data()!.categories.map((v: string) => ({ value: v, label: v }))
          )
        } else {
          console.log('categoryは未登録です。')
        }

        console.log(queryDateSnapshot.exists())

        if (queryDateSnapshot.exists()) {
          setRecipeData((queryDateSnapshot.data().recipes as Recipe[]) ?? [defaultRecipe])
          // フォームの初期値をreact-hook-formのresetでキャッシュしてしまうので、resetを使う
          // reset([defaultRecipe])
          return
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
    },
    [recipeData, user]
  )

  const appendImgFile = useCallback((newImgFile: File, index: number) => {
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
    const uploadPromises = Object.entries(imgFiles!).map(async ([index, file]) => {
      // 画像をstorageにアップロード
      const uploadStorage = ref(storage, `users/${user!.uid.toString()}/${file.name}`)
      const imgData = await uploadBytes(uploadStorage, file)

      // アップロードした画像のURLを取得
      const downloadURL = await getDownloadURL(imgData.ref)
      return [Number(index), downloadURL] // [index, downloadURL]の形式で返り値を設定
    })

    const downloadURLs = await Promise.all(uploadPromises)
    const result = Object.fromEntries(downloadURLs) // 返り値を連想配列に変換
    console.log(result)

    return result
  }, [imgFiles, user])

  const handleImgData = useCallback(
    async (data: FieldValues) => {
      if (imgFiles != null) return await handleStorage()
      return data.img
    },
    [imgFiles, handleStorage]
  )

  const registerRecipeHandler = useCallback(
    async (data: FieldValues, date: string) => {
      const imgData = await handleImgData(data)
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      setIsLoadingButton(true)

      // 画面描画用の最後のdefaultオブジェクトを削除
      const formattedRecipes = recipeData.filter((_, i) => i !== recipeData.length - 1)

      const newRecipe = [
        {
          img: imgData[0] ?? defaultRecipe.img,
          name: data.name,
          memo: data.memo,
          category: data.category,
          date,
        },
      ]

      const connectedImgAndRecipe = () => {
        const connectedData = formattedRecipes.map((recipe, i) => ({
          img: imgData[i] ?? defaultRecipe.img,
          name: recipe.name,
          memo: recipe.memo,
          category: recipe.category,
          date,
        }))

        const appendedData = [
          ...connectedData,
          {
            img: imgData[Object.keys(imgData).length - 1] ?? defaultRecipe.img,
            name: data.name,
            memo: data.memo,
            category: data.category,
            date,
          },
        ]
        return appendedData
      }

      const recipes = recipeData.length === 1 ? newRecipe : connectedImgAndRecipe()
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
    [defaultRecipe.img, handleImgData, options, recipeData, toast, user]
  )

  return {
    isLoading,
    recipeData,
    updateLocalRecipeHandler,
    removeRecipeHandler,
    imgFiles,
    appendImgFile,
    registerRecipeHandler,
    options,
    isLoadingButton,
    fetchRecipe,
  }
}
