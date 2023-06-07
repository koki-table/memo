/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, useToast, Link, HStack, Flex } from '@chakra-ui/react'
import { doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { FC, memo, useEffect, useState } from 'react'

import { Tag } from '@/components/Elements/Tag'
import { useAuth } from '@/features/auth'
import { db } from '@/utils/database'

export const CategoryListComponent: FC = memo(() => {
  const { user } = useAuth()
  const toast = useToast()
  const [categoryList, setCategoryList] = useState<string[]>()

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

        const queryCategorySnapshot = await getDoc(categoryDoc)

        if (queryCategorySnapshot.exists()) {
          setCategoryList(queryCategorySnapshot.data()!.categories)
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
        throw Error('Error in fetchUserAPI')
      }
    }
    fetchCategory()
  }, [toast, user])

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
