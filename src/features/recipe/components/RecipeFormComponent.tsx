/* eslint-disable @typescript-eslint/no-misused-promises */
import { Text, chakra, VStack, Box, Input, HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback } from 'react'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { Recipe } from '@/types/Recipe'

import { option } from '../lib'

import { SelectBox } from './SelectBox'

const schema = z.object({
  name: z.string().min(1, '料理名を入力は必須です。'),
  category: z.string().min(1, 'カテゴリー選択は必須です。'),
  memo: z.string(),
  img: z.string(),
})

type RecipeFormComponentProps = {
  index: number
  recipe?: Recipe
  onSubmit: (data: FieldValues, date: string) => Promise<void>
  hasSubmit: boolean
  imgFiles: File | undefined
  updateImgFile: (imgFiles: File, index: number) => void
  options: option | undefined
  isLoadingButton: boolean
  updateLocalRecipeHandler: (newRecipe: Recipe, index: number) => void
  removeRecipeHandler: (index: number, date: string) => void
  hasDelete?: boolean
}

export const RecipeFormComponent: FC<RecipeFormComponentProps> = (props) => {
  const {
    index,
    recipe,
    onSubmit,
    hasSubmit,
    imgFiles,
    updateImgFile,
    options,
    isLoadingButton,
    updateLocalRecipeHandler,
    removeRecipeHandler,
    hasDelete,
  } = props

  const { date } = useParams()

  const viewWidth = window.innerWidth - 32

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: recipe,
    resolver: zodResolver(schema),
  })

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return

      const fileData = e.target.files[0]

      updateImgFile(fileData, index)
    },
    [updateImgFile, index]
  )

  const fileImg = useCallback(() => {
    if (imgFiles != null) return window.URL.createObjectURL(imgFiles)
    if (recipe === undefined) return null
    if (recipe.img) return recipe.img
    return null
  }, [imgFiles, recipe])

  return (
    <chakra.form w="92%">
      <VStack
        spacing={6}
        mt={3}
        mb={5}
        borderBottom={hasSubmit ? 'none' : 'solid 1px var(--text-color-placeholder)'}
        pb={10}
      >
        <ImgInput registration={register('img')} onChange={onFileInputChange} fileImg={fileImg()} />
        <VStack w="100%" alignItems={'flex-start'}>
          <Input
            {...register('name')}
            placeholder={'料理名'}
            _placeholder={{ color: 'var(--text-color-placeholder)' }}
          />
          {errors.name && (
            <Text fontSize={'xs'} pl={2}>
              {errors.name?.message}
            </Text>
          )}
        </VStack>
        <VStack w="100%" alignItems={'flex-start'}>
          {/* 外部ライブラリの場合は、unControlな要素では無いのでregisterの代わりにControllerを使う */}
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <SelectBox viewWidth={viewWidth} field={field} options={options!} />
            )}
          />
          {errors.category && (
            <Text fontSize={'xs'} pl={2}>
              {errors.category.message}
            </Text>
          )}
        </VStack>
        <Box minW={'100%'}>
          <Textarea placeholder="メモ" minH={'180px'} registration={register('memo')} />
        </Box>
        {hasSubmit && (
          <VStack spacing={14}>
            {hasDelete && (
              <Button
                onClick={() => removeRecipeHandler(index, date!)}
                isLoading={isLoadingButton}
                backgroundColor={'var(--warning-color-main)'}
              >
                <Text fontSize={'sm'} fontWeight="700">
                  削除
                </Text>
              </Button>
            )}
            <HStack>
              <Button
                onClick={handleSubmit((v) => updateLocalRecipeHandler(v, index))}
                isLoading={isLoadingButton}
              >
                <Text fontSize={'sm'} fontWeight="700">
                  追加
                </Text>
              </Button>
              <Button
                onClick={handleSubmit(async (v) => await onSubmit(v, date!))}
                isLoading={isLoadingButton}
              >
                <Text fontSize={'sm'} fontWeight="700">
                  登録
                </Text>
              </Button>
            </HStack>
          </VStack>
        )}
      </VStack>
    </chakra.form>
  )
}
