import { useToast } from '@chakra-ui/react'
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import {
  createContext,
  ReactNode,
  useContext,
  FC,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { FieldValues } from 'react-hook-form'
import { useParams } from 'react-router-dom'

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
  updateRecipeHandler: (newRecipe: Recipe, index: number) => void
  removeRecipeHandler: (index: number) => Promise<void>
  imgFiles: File[] | undefined
  appendImgFile: (newImgFile: File) => void
  registerRecipeHandler: (data: FieldValues) => Promise<void>
  options: option | undefined
  isLoadingButton: boolean
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
  const { date } = useParams()

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

  const [options, setOptions] = useState<
    [
      {
        value: string
        label: string
      }
    ]
  >()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const categoryDoc = doc(db, `users/${user!.uid.toString()}`)
        const recipeDoc = doc(db, `users/${user!.uid.toString()}/dates/${date!}`)

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
    }
    fetchRecipe()
  }, [date, defaultRecipe, setIsLoading, setOptions, setRecipeData, toast, user])

  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const updateRecipeHandler = useCallback(
    (newRecipe: Recipe, index: number) => {
      setRecipeData((prevRecipes) =>
        prevRecipes.map((prevRecipe, i) => (i === index ? newRecipe : prevRecipe))
      )
      setRecipeData((prevRecipes) => [...prevRecipes, defaultRecipe])
    },
    [defaultRecipe]
  )

  const removeRecipeHandler = useCallback(
    async (index: number) => {
      setRecipeData((recipeData) => recipeData.filter((_, i) => i !== index))
      const recipeDoc = doc(createCollection('dates', user), date)

      const removeRecipe = recipeData.filter((_, i) => i !== index)
      await setDoc(recipeDoc, {
        recipes: removeRecipe,
      })
    },
    [date, recipeData, user]
  )

  const [imgFiles, setImgFiles] = useState<File[]>()

  const appendImgFile = useCallback((newImgFile: File) => {
    setImgFiles((imgFiles) => (imgFiles ? [...imgFiles, newImgFile] : [newImgFile]))
  }, [])

  const handleStorage = useCallback(async () => {
    console.log(imgFiles)

    const uploadPromises = imgFiles!.map(async (file) => {
      // 画像をstorageにアップロード
      const uploadStorage = ref(storage, `users/${user!.uid.toString()}/${file.name}`)
      const imgData = await uploadBytes(uploadStorage, file)

      // アップロードした画像のURLを取得
      const downloadURL = await getDownloadURL(imgData.ref)
      return downloadURL
    })

    const downloadURLs = await Promise.all(uploadPromises)
    return downloadURLs
  }, [imgFiles, user])

  const handleImgData = useCallback(
    async (data: FieldValues) => {
      if (imgFiles != null) return await handleStorage()
      return data.img
    },
    [imgFiles, handleStorage]
  )

  const registerRecipeHandler = useCallback(
    async (data: FieldValues) => {
      const imgData = await handleImgData(data)
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      setIsLoadingButton(true)

      // 画面描画用の最後のdefaultオブジェクトを削除
      const formattedRecipes = recipeData.filter((_, i) => i !== recipeData.length - 1)

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
            img: imgData[imgData.length - 1] ?? defaultRecipe.img,
            name: data.name,
            memo: data.memo,
            category: data.category,
            date,
          },
        ]
        return appendedData
      }

      const recipes = connectedImgAndRecipe()
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
    [date, defaultRecipe.img, handleImgData, options, recipeData, toast, user]
  )

  return {
    isLoading,
    recipeData,
    updateRecipeHandler,
    removeRecipeHandler,
    imgFiles,
    appendImgFile,
    registerRecipeHandler,
    options,
    isLoadingButton,
  }
}
