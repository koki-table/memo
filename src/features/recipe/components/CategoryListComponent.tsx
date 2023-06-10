/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, useToast, Flex } from '@chakra-ui/react'
import { FC, memo, useEffect } from 'react'

import { Tag } from '@/components/Elements/Tag'
import { useAuth } from '@/features/auth'

import { useRecipe } from '../lib'

export const CategoryListComponent: FC = memo(() => {
  const { user } = useAuth()
  const toast = useToast()
  const { categoryList, fetchCategoryList } = useRecipe()

  useEffect(() => {
    fetchCategoryList()
  }, [fetchCategoryList, toast, user])

  return (
    <VStack spacing={4} borderBottom={'2px'} borderColor={'var(--secondary-color-main)'} mb={3}>
      <Text fontSize={'xs'} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
        カテゴリ
      </Text>
      <Flex flexWrap={'wrap'}>
        {categoryList?.map((category, index) => (
          <Tag key={index} mb={3} mr={2} px={4} py={2}>
            <Text fontSize={'xs'}>{category}</Text>
          </Tag>
        ))}
      </Flex>
    </VStack>
  )
})

CategoryListComponent.displayName = 'CategoryListComponent'
