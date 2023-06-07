/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, useToast, Link, keyframes, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'
import { Heading, Spinner } from '@/components/Elements'
import { Tag } from '@/components/Elements/Tag'
import { useAuth } from '@/features/auth'
import { RecipeList } from '@/types/RecipeList'
import { createCollection } from '@/utils/database'

import { CategoryListComponent } from './CategoryListComponent'
import { PaginationComponent } from './PaginationComponent'

const bgLoop = keyframes`
  from { background-position: 0 0; }
to { background-position: -6300px 0; }
`

export const RecipeListComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32

  const { user } = useAuth()
  const toast = useToast()

  const [recipeList, setRecipeList] = useState<RecipeList[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  console.log(selectedCategory)

  const [currentPage, setCurrentPage] = useState(1)

  const handlePage = (index: number) => {
    setCurrentPage(index)
  }

  // recipeListが10個のオブジェクトを1つの配列に詰めているので、10倍にする
  const totalCount = recipeList?.length * 10

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDb = async () => {
      try {
        const recipeCol = createCollection('recipes', user)
        const recipeQuery = query(recipeCol, orderBy('date', 'desc'))

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(recipeQuery)
        setIsLoading(false)

        if (queryDateSnapshot.size > 0) {
          const recipes = queryDateSnapshot.docs.map((doc) => ({
            name: doc.data().name,
            category: doc.data().category,
            date: doc.data().date,
          })) as RecipeList

          // RecipeListを10個ずつの配列に分割
          const chunkedRecipes = recipes.reduce((acc: RecipeList[], recipe, index) => {
            const chunkIndex = Math.floor(index / 10)
            if (!acc[chunkIndex]) {
              acc[chunkIndex] = []
            }
            acc[chunkIndex].push(recipe)
            return acc
          }, [])

          setRecipeList(chunkedRecipes)
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
        throw Error('Error in fetchUserAPI')
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
      minH={`calc(100vh - 93px)`}
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
        <Heading w="100%" pb="8">
          レシピリスト 🥘
        </Heading>
        <CategoryListComponent />
        {/* currentPageが1から始まる為、-1している */}
        {recipeList[currentPage - 1]?.map((recipe, index) => (
          <Link
            key={index}
            onClick={() => navigate(`/recipe/${dayjs(recipe.date).format('YYYYMMDD')}`)}
          >
            <HStack
              width={viewWidth}
              pt="6"
              pb="6"
              borderBottom={'1px'}
              borderColor={'var(--line-color-main)'}
              justifyContent={'space-between'}
            >
              <VStack alignItems={'flex-start'} spacing={2}>
                <Text fontSize={'md'} pl={2} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
                  {recipe.name}
                </Text>
                <Box pl="2">
                  <Tag>
                    <Text fontSize={'xs'}>{recipe.category}</Text>
                  </Tag>
                </Box>
              </VStack>
              <Box pr={3}>
                <BsArrowRightShort size={23} />
              </Box>
            </HStack>
          </Link>
        ))}
      </VStack>
      <PaginationComponent
        totalCount={totalCount}
        requestCount={10}
        currentPage={currentPage}
        handlePage={handlePage}
      />
    </VStack>
  )
}
