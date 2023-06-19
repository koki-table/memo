/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input, useToast, Flex, Link, HStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'
import { z } from 'zod'

import { Button, Spinner } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Recipe } from '@/types/Recipe'
import { calculateBeforeDay, calculateNextDay } from '@/utils/calculateDay'
import { createCollection, db } from '@/utils/database'
import { hasTargetValue } from '@/utils/hasTargetValue'

type option = [
  {
    value: string
    label: string
  }
]

const schema = z.object({
  name: z.string().min(1, '料理名を入力は必須です。'),
  category: z.string().min(1, 'カテゴリー選択は必須です。'),
  memo: z.string(),
  img: z.string(),
})

type RecipeFormComponentProps = {
  recipe: Recipe
  onSubmit: (data: FieldValues) => Promise<void>
  hasSubmit: boolean
}

export const RecipeFormComponent: FC<RecipeFormComponentProps> = (props) => {
  const { recipe, onSubmit, hasSubmit } = props

  // const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32
  // const { date } = useParams()
  // const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const defaultRecipes = useMemo(() => {
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
    formState: { errors },
  } = useForm({
    defaultValues: recipe,
    resolver: zodResolver(schema),
  })

  const [options, setOptions] = useState<option>()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  const [fileObject, setFileObject] = useState<File>()

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileData = e.target.files[0]
    setFileObject(fileData)
  }, [])

  const fileImg = useCallback(() => {
    if (fileObject != null) return window.URL.createObjectURL(fileObject)
    if (recipe.img) return recipe.img
    return null
  }, [fileObject, recipe.img])

  if (isLoading) return <Spinner variants="full" />

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
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          {/* <Flex w="100%" whiteSpace={'nowrap'} alignItems={'center'} justifyContent="space-between">
            <HStack alignItems={'center'} spacing={3}>
              <Text w={'100%'} fontSize={'sm'} fontWeight="700">
                {formattedDate}
              </Text>
              <Link onClick={() => handleDateChange(false)}>
                <IoIosArrowBack />
              </Link>
              <Link onClick={() => handleDateChange(true)}>
                <IoIosArrowForward />
              </Link>
            </HStack>
            <Link onClick={() => navigate(`/calendar`)} mr={'2'}>
              <MdCalendarMonth size={27} />
            </Link>
          </Flex> */}
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
                <CreatableSelect
                  {...field}
                  placeholder={'カテゴリ'}
                  options={options}
                  value={options?.find((v) => v.value === field.value)}
                  onChange={(newValue) => {
                    field.onChange(newValue?.value)
                  }}
                  styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      borderColor: 'var(--line-color-light)',
                      minWidth: viewWidth,
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: 'var(--text-color-placeholder)',
                    }),
                    indicatorSeparator: (baseStyles) => ({
                      ...baseStyles,
                      display: 'none',
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: 'var(--text-color)',
                    }),
                  }}
                />
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
            <Button type={'submit'} isLoading={isLoadingButton}>
              <Text fontSize={'sm'} fontWeight="700">
                登録
              </Text>
            </Button>
          )}
        </VStack>
      </chakra.form>
    </VStack>
  )
}
