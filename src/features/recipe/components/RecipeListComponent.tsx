/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, useToast, Link, keyframes } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { getDocs, limit, orderBy, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'
import { Spinner } from '@/components/Elements'
import { Tag } from '@/components/Elements/Tag'
import { useAuth } from '@/features/auth'
import { RecipeList } from '@/types/RecipeList'
import { createCollection } from '@/utils/database'

const bgLoop = keyframes`
  from { background-position: 0 0; }
to { background-position: -6300px 0; }
`

export const RecipeListComponent: FC = () => {
  const navigate = useNavigate()
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
            date: doc.data().date,
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
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <VStack>
        <Box
          backgroundImage={gyoza}
          w={'120%'}
          h={'160px'}
          backgroundPosition="0 0"
          backgroundSize={'auto 100%'}
          backgroundRepeat={'repeat-x'}
          animation={`${bgLoop} 180s linear infinite`}
        />
        {recipeList?.map((recipe, index) => (
          <Link
            key={index}
            onClick={() => navigate(`/recipe/${dayjs(recipe.date).format('YYYYMMDD')}`)}
          >
            <VStack
              width={viewWidth}
              alignItems={'flex-start'}
              spacing={2}
              pt="6"
              pb="6"
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
          </Link>
        ))}
      </VStack>
    </VStack>
  )
}
