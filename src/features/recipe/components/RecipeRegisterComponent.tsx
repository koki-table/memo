/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, useToast, Flex, Link, HStack } from '@chakra-ui/react'
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { FieldValues } from 'react-hook-form'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Recipe } from '@/types/Recipe'
import { calculateBeforeDay, calculateNextDay } from '@/utils/calculateDay'
import { createCollection, db } from '@/utils/database'
import { hasTargetValue } from '@/utils/hasTargetValue'

import { RecipeFormComponent } from './RecipeFormComponent'

export type option = [
  {
    value: string
    label: string
  }
]

const schema = z.object({
  name: z.string().min(1, '料理名を入力は必須です。'),
  category: z.string().min(1, 'カテゴリー選択は必須です。'),
  memo: z.string(),
  img: z.string(),
})

export const RecipeRegisterComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { date } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

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
        const recipeCol = createCollection('recipes', user)
        const dateQuery = query(recipeCol, where('date', '==', `${date!}`))

        const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(dateQuery)
        const queryCategorySnapshot = await getDoc(categoryDoc)
        setIsLoading(false)

        if (queryCategorySnapshot.exists()) {
          setOptions(
            queryCategorySnapshot.data()!.categories.map((v: string) => ({ value: v, label: v }))
          )
        } else {
          console.log('categoryは未登録です。')
        }

        if (queryDateSnapshot.size === 0) {
          // フォームの初期値をreact-hook-formのresetでキャッシュしてしまうので、resetを使う
          // reset([defaultRecipe])
          // setRecipeData([defaultRecipe])
          return
        }

        queryDateSnapshot.forEach((doc) => {
          setRecipeData([doc.data()] as Recipe[])

          // フォームの初期値をreact-hook-formのresetでキャッシュしてしまうので、resetを使う
          // reset([doc.data()] as Recipe[])
        })
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
  }, [date, toast, user])

  const [fileObject, setFileObject] = useState<File[]>()

  const onChangeFile = useCallback(
    (newFileObject: File) => {
      setFileObject((fileObject) => {
        if (fileObject) {
          return [...fileObject, newFileObject]
        } else {
          return [newFileObject]
        }
      })
    },
    [setFileObject]
  )

  const handleStorage = useCallback(async () => {
    console.log(fileObject)

    const uploadPromises = fileObject!.map(async (file) => {
      // 画像をstorageにアップロード
      const uploadStorage = ref(storage, file.name)
      const imgData = await uploadBytes(uploadStorage, file)

      // アップロードした画像のURLを取得
      const downloadURL = await getDownloadURL(imgData.ref)
      return downloadURL
    })

    const downloadURLs = await Promise.all(uploadPromises)
    return downloadURLs
  }, [fileObject])

  const handleImgData = useCallback(
    async (data: FieldValues) => {
      if (fileObject != null) return await handleStorage()
      return data.img
    },
    [fileObject, handleStorage]
  )

  const updateRecipeHandler = useCallback(
    (newRecipe: Recipe, index: number) => {
      setRecipeData((prevRecipes) =>
        prevRecipes.map((prevRecipe, i) => (i === index ? newRecipe : prevRecipe))
      )
      setRecipeData((prevRecipes) => [...prevRecipes, defaultRecipe])
    },
    [defaultRecipe]
  )

  console.log(recipeData)

  const removeRecipeHandler = useCallback(
    (index: number) => {
      console.log(index)
      setRecipeData((recipeData) => recipeData.filter((_, i) => i !== index))
    },
    [setRecipeData]
  )

  const onSubmit = useCallback(
    async (data: FieldValues) => {
      const imgData = await handleImgData(data)
      const recipeDoc = doc(createCollection('recipes', user), date)
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      setIsLoadingButton(true)
      // db登録
      await setDoc(recipeDoc, {
        recipes: arrayUnion(
          {
            img: imgData,
            name: data.name,
            memo: data.memo,
            category: data.category,
            date,
          },
          {
            img: imgData,
            name: data.name,
            memo: data.name,
            category: data.name,
            date,
          }
        ),
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
    [date, handleImgData, options, toast, user]
  )

  const handleDateChange = useCallback(
    (isNext: boolean) => {
      setFileObject(undefined)

      if (isNext) {
        navigate(`/recipe/${calculateBeforeDay(date!)}`)
      }
      navigate(`/recipe/${calculateNextDay(date!)}`)
    },
    [date, navigate]
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
            <Link onClick={() => handleDateChange(false)}>
              <IoIosArrowBack />
            </Link>
            <Link onClick={() => handleDateChange(true)}>
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
          fileObject={fileObject ? fileObject[i] : undefined}
          onChangeFile={onChangeFile}
          options={options ?? undefined}
          isLoadingButton={isLoadingButton}
          updateRecipeHandler={updateRecipeHandler}
          removeRecipeHandler={removeRecipeHandler}
        />
      ))}
    </VStack>
  )
}
