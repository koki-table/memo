/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, useToast, Flex, Link, HStack } from '@chakra-ui/react'
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Recipe } from '@/types/Recipe'
import { calculateDay } from '@/utils/calculateDay'
import { createCollection, db } from '@/utils/database'
import { hasTargetValue } from '@/utils/hasTargetValue'

import { RecipeFormComponent } from './RecipeFormComponent'

export type option = [
  {
    value: string
    label: string
  }
]

export const RecipeRegisterComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { date } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const recipeDoc = doc(createCollection('dates', user), date)

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

  const [options, setOptions] = useState<option>()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  useEffect(() => {
    const fetchDb = async () => {
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
    fetchDb()
  }, [date, defaultRecipe, toast, user])

  console.log(recipeData)

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

      const removeRecipe = recipeData.filter((_, i) => i !== index)
      await setDoc(recipeDoc, {
        recipes: removeRecipe,
      })
    },
    [recipeData, recipeDoc]
  )

  const [imgFiles, setImgFiles] = useState<File[]>()

  const appendImgFile = useCallback((newImgFile: File) => {
    setImgFiles((imgFiles) => (imgFiles ? [...imgFiles, newImgFile] : [newImgFile]))
  }, [])

  const handleStorage = useCallback(async () => {
    console.log(imgFiles)

    const uploadPromises = imgFiles!.map(async (file) => {
      // 画像をstorageにアップロード
      const uploadStorage = ref(storage, file.name)
      const imgData = await uploadBytes(uploadStorage, file)

      // アップロードした画像のURLを取得
      const downloadURL = await getDownloadURL(imgData.ref)
      return downloadURL
    })

    const downloadURLs = await Promise.all(uploadPromises)
    return downloadURLs
  }, [imgFiles])

  const handleImgData = useCallback(
    async (data: FieldValues) => {
      if (imgFiles != null) return await handleStorage()
      return data.img
    },
    [imgFiles, handleStorage]
  )

  const onSubmit = useCallback(
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
    [date, defaultRecipe.img, handleImgData, options, recipeData, recipeDoc, toast, user]
  )

  if (isLoading) return <Spinner variants="full" />

  return (
    <VStack
      px={'4'}
      pb={8}
      pt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 69px)`}
    >
      <VStack spacing={6}>
        <Flex w="100%" whiteSpace={'nowrap'} alignItems={'center'} justifyContent="space-between">
          <HStack alignItems={'center'} spacing={3}>
            <Text w={'100%'} fontSize={'sm'} fontWeight="700">
              {formattedDate}
            </Text>
            <Link
              onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: false })}`)}
            >
              <IoIosArrowBack />
            </Link>
            <Link
              onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: true })}`)}
            >
              <IoIosArrowForward />
            </Link>
          </HStack>
          <Link onClick={() => navigate(`/calendar`)} mr={'2'}>
            <MdCalendarMonth size={27} />
          </Link>
        </Flex>
      </VStack>
      {recipeData.map((v, i) => (
        <RecipeFormComponent
          key={i}
          index={i}
          recipe={v}
          hasSubmit={recipeData.length === i + 1}
          onSubmit={onSubmit}
          imgFiles={imgFiles ? imgFiles[i] : undefined}
          appendImgFile={appendImgFile}
          options={options ?? undefined}
          isLoadingButton={isLoadingButton}
          updateRecipeHandler={updateRecipeHandler}
          removeRecipeHandler={removeRecipeHandler}
        />
      ))}
    </VStack>
  )
}
