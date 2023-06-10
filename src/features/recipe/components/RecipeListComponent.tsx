/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, useToast, Link, keyframes, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'
import { Heading, Spinner } from '@/components/Elements'
import { LoopingBackground } from '@/components/Elements/Animation/Loop'
import { Tag } from '@/components/Elements/Tag'

import { useRecipe } from '../lib/recipe'

import { CategoryListComponent } from './CategoryListComponent'
import { PaginationComponent } from './PaginationComponent'

export const RecipeListComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32

  const { fetchAllRecipe, recipeList, isLoading, handlePage, currentPage } = useRecipe()

  // recipeListが10個のオブジェクトを1つの配列に詰めているので、10倍にする
  const totalCount = recipeList?.length * 10

  useEffect(() => {
    fetchAllRecipe()
  }, [fetchAllRecipe])

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
      minH={`calc(100vh - 69px)`}
    >
      <VStack>
        <LoopingBackground source={gyoza} w="120%" h={'160px'} />
        <Heading w="100%" pb="8">
          レシピリスト 🥘
        </Heading>
        <CategoryListComponent />
        {/* currentPageが1から始まる為、-1している */}
        <Box pt={5}>
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
        </Box>
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
