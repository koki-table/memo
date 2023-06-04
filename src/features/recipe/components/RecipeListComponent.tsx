/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input, useToast, Flex, Link, HStack } from '@chakra-ui/react'
import { getDocs, limit, orderBy, query } from 'firebase/firestore'
import { FC, useEffect, useMemo, useState } from 'react'

import { Spinner } from '@/components/Elements'
import { Tag } from '@/components/Elements/Tag'
import { useAuth } from '@/features/auth'
import { RecipeList } from '@/types/RecipeList'
import { createCollection } from '@/utils/database'

export const RecipeListComponent: FC = () => {
  // const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { user } = useAuth()
  const toast = useToast()

  const [recipeList, setRecipeList] = useState<RecipeList>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const recipeCol = createCollection('recipes', user)
        const recipeQuery = query(recipeCol, orderBy('date', 'desc'), limit(10))

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(recipeQuery)
        setIsLoading(false)

        if (queryDateSnapshot.size > 0) {
          const recipes = queryDateSnapshot.docs.map((doc) => ({
            name: doc.data().name,
            category: doc.data().category,
          })) as RecipeList

          setRecipeList(recipes)
        } else {
          console.log('recipeは未登録です。')
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
  }, [toast, user])

  if (isLoading) return <Spinner variants="full" />

  return (
    <VStack
      px={'4'}
      pb={8}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <VStack spacing={6}>
        <VStack w="100%" alignItems={'flex-start'}>
          {recipeList?.map((recipe, index) => (
            <VStack
              width={viewWidth}
              key={index}
              alignItems={'flex-start'}
              spacing={2}
              py="4"
              borderBottom={'1px'}
              borderColor={'var(--line-color-main)'}
            >
              <Text fontSize={'md'} pl={2} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
                {recipe.name}
              </Text>
              <Box pl="2">
                <Tag>
                  <Text fontSize={'xs'}>{recipe.category}</Text>
                </Tag>
              </Box>
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  )
}
