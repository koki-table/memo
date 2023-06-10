/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Flex, Link } from '@chakra-ui/react'
import { FC, memo, useEffect, useState } from 'react'

import { Tag } from '@/components/Elements/Tag'

import { useRecipe } from '../lib'

export const CategoryListComponent: FC = memo(() => {
  const { categoryList, fetchCategoryList, fetchSelectedRecipe, fetchAllRecipe, selectedCategory } =
    useRecipe()

  useEffect(() => {
    fetchCategoryList()
  }, [fetchCategoryList])

  return (
    <VStack
      w={'100%'}
      spacing={4}
      borderBottom={'2px'}
      borderColor={'var(--line-color-main)'}
      pb={3}
      mb={2}
    >
      <Text fontSize={'xs'} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
        カテゴリ
      </Text>
      <Flex flexWrap={'wrap'} w={'100%'}>
        <Link mb={3} mr={2} onClick={async () => await fetchAllRecipe()}>
          <Tag px={4} py={2} backgroundColor={selectedCategory === 'All' ? 'var(--black)' : 'none'}>
            <Text
              fontSize={'xs'}
              color={selectedCategory === 'All' ? 'var(--white)' : 'var(--text-color-main)'}
            >
              All
            </Text>
          </Tag>
        </Link>
        {categoryList?.map((category, index) => (
          <Link key={index} mb={3} mr={2} onClick={async () => await fetchSelectedRecipe(category)}>
            <Tag
              px={4}
              py={2}
              backgroundColor={selectedCategory === category ? 'var(--black)' : 'none'}
            >
              <Text
                fontSize={'xs'}
                color={selectedCategory === category ? 'var(--white)' : 'var(--text-color-main)'}
              >
                {category}
              </Text>
            </Tag>
          </Link>
        ))}
      </Flex>
    </VStack>
  )
})

CategoryListComponent.displayName = 'CategoryListComponent'
