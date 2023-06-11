/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, Link, HStack, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { l } from 'vitest/dist/index-220c1d70'
import { z } from 'zod'

import { EditModal } from '@/components/EditModal'
import { Heading, Spinner } from '@/components/Elements'
import { Tag } from '@/components/Elements/Tag'

import { useRecipe } from '../lib/recipe'

import { CategoryListComponent } from './CategoryListComponent'
import { PaginationComponent } from './PaginationComponent'

const schema = z.object({
  category: z.string().min(1, 'カテゴリー名は必須です'),
})

export const RecipeListComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  const { onOpen, onClose, isOpen } = useDisclosure()

  const {
    fetchAllRecipe,
    recipeList,
    isLoading,
    handlePage,
    currentPage,
    updateRecipeCategories,
    updateCategory,
  } = useRecipe()

  // recipeListが10個のオブジェクトを1つの配列に詰めているので、10倍にする
  const totalCount = recipeList?.length * 10

  useEffect(() => {
    fetchAllRecipe()
  }, [fetchAllRecipe])

  const [updatingCategory, setUpdatingCategory] = useState<string>('')

  const handleOpenModal = async (category: string) => {
    setUpdatingCategory(category)
    onOpen()
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const submitHandler = handleSubmit(async (updatedData) => {
    await updateRecipeCategories(updatingCategory, updatedData.category)
    await updateCategory(updatingCategory, updatedData.category)
    await fetchAllRecipe()
    reset()
    onClose()
  })

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
        <EditModal
          isOpen={isOpen}
          submitHandler={submitHandler}
          onClose={onClose}
          reset={reset}
          errors={errors}
          isSubmitting={isSubmitting}
          fields={[updatingCategory]}
          register={register}
          title={'カテゴリ編集'}
          buttonText={'更新'}
          inputName={['category']}
        />
        <Heading w="100%" pb="8">
          料理リスト 🥘
        </Heading>
        <CategoryListComponent onClick={handleOpenModal} />
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
