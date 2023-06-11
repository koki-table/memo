/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Flex, Link, Box, useDisclosure } from '@chakra-ui/react'
import { FC, memo, useEffect, useState } from 'react'

import { Modal } from '@/components/Modal'

import { useRecipe } from '../lib'

import { TagPicker } from './TagPicker'

type CategoryListComponentProps = {
  onClick?: (categoryName: string) => void
}

export const CategoryListComponent: FC<CategoryListComponentProps> = memo((props) => {
  const { onClick } = props
  const { categoryList, fetchCategoryList } = useRecipe()

  useEffect(() => {
    fetchCategoryList()
  }, [fetchCategoryList])

  const [isEditing, setIsEditing] = useState(false)

  const modifiedCategoryList = ['All', ...(categoryList ?? [])] as const

  return (
    <VStack
      w={'100%'}
      spacing={4}
      borderBottom={'2px'}
      borderColor={'var(--line-color-main)'}
      pb={3}
      mb={2}
    >
      <Flex justifyContent={'space-between'} w={'100%'}>
        <Text fontSize={'xs'} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
          カテゴリ
        </Text>
        <Link
          borderBottomColor={'var(--secondary-color-main)'}
          borderBottomWidth={2}
          pr={2}
          pl={2}
          onClick={() => setIsEditing(!isEditing)}
          _hover={{
            textDecoration: 'none',
          }}
        >
          <Text
            fontSize={'xs'}
            color={'var(--text-color-sub)'}
            fontWeight={'semibold'}
            whiteSpace={'nowrap'}
          >
            {isEditing ? '完了' : '編集'}
          </Text>
        </Link>
      </Flex>
      <Flex flexWrap={'wrap'} w={'100%'}>
        {modifiedCategoryList?.map((category, index) => (
          <Box key={index} mb={3} mr={2}>
            {isEditing ? (
              <TagPicker hasBadge={true} title={category} onClick={onClick} />
            ) : (
              <TagPicker hasBadge={false} title={category} />
            )}
          </Box>
        ))}
      </Flex>
    </VStack>
  )
})

CategoryListComponent.displayName = 'CategoryListComponent'
