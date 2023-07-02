/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, useToast, Flex, Link, HStack } from '@chakra-ui/react'
import { doc, getDoc } from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { Recipe } from '@/types/Recipe'
import { calculateDay } from '@/utils/calculateDay'
import { db } from '@/utils/database'

import { useRecipe } from '../lib'

import { RecipeFormComponent } from './RecipeFormComponent'

export const RecipeRegisterComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { date } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const {
    defaultRecipe,
    isLoading,
    setIsLoading,
    recipeData,
    registerHandler,
    setRecipeData,
    setOptions,
    imgFiles,
    appendImgFile,
    isLoadingButton,
    options,
    updateRecipeHandler,
    removeRecipeHandler,
  } = useRecipe()

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
  }, [date, defaultRecipe, setIsLoading, setOptions, setRecipeData, toast, user])

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
          onSubmit={registerHandler}
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
