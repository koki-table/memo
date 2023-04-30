/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Text, chakra, VStack, Box, Input } from '@chakra-ui/react'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { FC, useEffect } from 'react'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { useAuth } from '@/features/auth'
import { notesCol } from '@/utils/database'

export const NoteComponent: FC = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const formattedDate = `${id!.slice(0, 4)}/${id!.slice(4, 6)}/${id!.slice(6)}`

  const onSubmit = async (data: FieldValues) => await setUser(data)

  const { register, handleSubmit, control } = useForm()

  const defaultValue = 1

  const viewWidth = window.innerWidth - 32

  // TODO:カテゴリの内容を動的にする
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const noteRef = doc(notesCol, user?.uid)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        // TODO: 該当dateで過去のデータがある場合は、stateに登録してフォームにセットする
        // const res = await getDoc(userRef)
        // console.log(res.data())
      } catch (e: any) {
        console.log(e.message)
      }
    }
    fetchAccount()
  }, [user])

  const setUser = async (data: FieldValues) => {
    // TODO: imgのアップロード処理を調整（現状はdataにundefinedが入ってしまう）
    await setDoc(noteRef, {
      date: id,
      // img: data.img,
      name: data.name,
      memo: data.memo,
      category: data.category.value,
    })
  }

  return (
    <VStack
      px={'4'}
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6}>
          <Text w={'100%'} fontSize={'sm'} fontWeight="700">
            {formattedDate}
          </Text>
          {/* <ImgInput registration={register('img')} /> */}
          <Input
            {...register('name')}
            placeholder={'料理名'}
            _placeholder={{ color: 'var(--text-color-placeholder)' }}
          />
          {/* 外部ライブラリの場合は、unControlな要素では無いのでregisterの代わりにControllerを使う */}
          <Controller
            control={control}
            defaultValue={defaultValue}
            name="category"
            render={({ field }) => (
              <CreatableSelect
                {...field}
                placeholder={'カテゴリ'}
                options={options}
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
          <Box minW={'100%'}>
            <Textarea placeholder="メモしたいこと" minH={'180px'} registration={register('memo')} />
          </Box>
          <Button type={'submit'}>
            <Text fontSize={'sm'} fontWeight="700">
              保存
            </Text>
          </Button>
        </VStack>
      </chakra.form>
    </VStack>
  )
}
