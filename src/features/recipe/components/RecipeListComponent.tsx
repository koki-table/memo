/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, Link, HStack, useDisclosure } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC, useEffect } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import { Heading, Spinner } from '@/components/Elements'
import { Tag } from '@/components/Elements/Tag'
import { Modal } from '@/components/Modal'

import { useRecipe } from '../lib/recipe'

import { CategoryListComponent } from './CategoryListComponent'
import { PaginationComponent } from './PaginationComponent'

export const RecipeListComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { onOpen, onClose, isOpen } = useDisclosure()

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
      pt={8}
      pb={8}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 69px)`}
    >
      <VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <p>Modal Title</p>
          <div>
            <p>Modal Content</p>
            <p>Modal Content</p>
            <p>Modal Content</p>
            <p>Modal Content</p>
          </div>
        </Modal>
        <Heading w="100%" pb="8">
          料理リスト 🥘
        </Heading>
        <CategoryListComponent onClick={onOpen} />
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
