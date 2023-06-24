/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input, HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, FieldValues, Controller, UseFormReset } from 'react-hook-form'
import { PropsValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { string, z } from 'zod'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { Recipe } from '@/types/Recipe'

import { option } from './RecipeRegisterComponent'
import { SelectBox } from './SelectBox'

const schema = z.object({
  name: z.string().min(1, '料理名を入力は必須です。'),
  category: z.string().min(1, 'カテゴリー選択は必須です。'),
  memo: z.string(),
  img: z.string(),
})

type RecipeFormComponentProps = {
  index?: number
  recipe?: Recipe
  onSubmit: (data: FieldValues) => Promise<void>
  hasSubmit: boolean
  fileObject: File | undefined
  onChangeFile: (fileObject: File) => void
  options: option | undefined
  isLoadingButton: boolean
  addRecipeHandler: (newRecipe: Recipe, reset: UseFormReset<Recipe>) => void
  removeRecipeHandler: (index: number) => void
}

export const RecipeFormComponent: FC<RecipeFormComponentProps> = (props) => {
  const {
    index,
    recipe,
    onSubmit,
    hasSubmit,
    fileObject,
    onChangeFile,
    options,
    isLoadingButton,
    addRecipeHandler,
    removeRecipeHandler,
  } = props

  const viewWidth = window.innerWidth - 32

  const defaultRecipe = useMemo(() => {
    return {
      img: '',
      name: '',
      memo: '',
      category: '',
      date: '',
    }
  }, [])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: recipe ?? defaultRecipe,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    recipe === undefined && reset(defaultRecipe)
  }, [reset, recipe, defaultRecipe])

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return

      const fileData = e.target.files[0]

      console.log(fileData)

      onChangeFile(fileData)
    },
    [onChangeFile]
  )

  console.log(isSubmitSuccessful)

  if (isSubmitSuccessful) {
    console.log('fffffffff')

    reset(defaultRecipe)
  }
  // useEffect(() => {
  // }, [defaultRecipe, isSubmitSuccessful, reset])

  const fileImg = useCallback(() => {
    if (fileObject != null) return window.URL.createObjectURL(fileObject)
    if (recipe === undefined) return null
    if (recipe.img) return recipe.img
    return null
  }, [fileObject, recipe])

  return (
    <VStack
      px={'4'}
      pb={8}
      pt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 69px)`}
    >
      <chakra.form>
        <VStack spacing={6}>
          <ImgInput
            registration={register('img')}
            onChange={onFileInputChange}
            fileImg={fileImg()}
          />
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
          {hasSubmit ? (
            <HStack>
              <Button
                onClick={handleSubmit((value) => addRecipeHandler(value, reset))}
                isLoading={isLoadingButton}
              >
                <Text fontSize={'sm'} fontWeight="700">
                  追加
                </Text>
              </Button>
              <Button onClick={handleSubmit(onSubmit)} isLoading={isLoadingButton}>
                <Text fontSize={'sm'} fontWeight="700">
                  登録
                </Text>
              </Button>
            </HStack>
          ) : (
            <Button onClick={() => removeRecipeHandler(index!)} isLoading={isLoadingButton}>
              <Text fontSize={'sm'} fontWeight="700">
                削除
              </Text>
            </Button>
          )}
        </VStack>
      </chakra.form>
    </VStack>
  )
}
