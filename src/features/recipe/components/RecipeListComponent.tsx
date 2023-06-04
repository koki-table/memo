/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input, useToast, Flex, Link, HStack } from '@chakra-ui/react'
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
import { FC, useEffect, useMemo, useState } from 'react'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { Recipe } from '@/types/Recipe'
import { createCollection, db } from '@/utils/database'

export const RecipeListComponent: FC = () => {
  // const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { user } = useAuth()
  const toast = useToast()

  const defaultRecipes = useMemo(() => {
    return {
      img: '',
      name: '',
      memo: '',
      category: '',
      date: '',
    }
  }, [])

  const [recipeList, setRecipeList] = useState<Recipe>(defaultRecipes)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const recipeCol = createCollection('recipes', user)

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(recipeCol)
        setIsLoading(false)

        if (queryDateSnapshot.size > 0) {
          // setRecipeList(
          //   queryDateSnapshot.data()!.categories.map((v: string) => ({ value: v, label: v }))
          // )
        } else {
          console.log('categoryは未登録です。')
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
  }, [defaultRecipes, toast, user])

  if (isLoading) return <Spinner variants="full" />

  return (
    <VStack
      px={'4'}
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <VStack spacing={6}>
        <VStack w="100%" alignItems={'flex-start'}>
          <Text fontSize={'xs'} pl={2}>
            サンプル
          </Text>
        </VStack>
      </VStack>
    </VStack>
  )
}
