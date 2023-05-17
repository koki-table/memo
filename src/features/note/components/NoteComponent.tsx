/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input, useToast } from '@chakra-ui/react'
import { doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FC, useEffect, useMemo, useState } from 'react'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

import { Button, Spinner } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Note } from '@/types/Note'
import { createCollection } from '@/utils/database'

export const NoteComponent: FC = () => {
  const viewWidth = window.innerWidth - 32
  const { date } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const onSubmit = async (data: FieldValues) => await uploadNote(data)

  const [noteData, setNoteData] = useState<Note>({
    img: '',
    name: '',
    memo: '',
    category: '',
    date: '',
  })

  const defaultValues = useMemo(() => {
    return noteData
  }, [noteData])

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues,
  })

  // TODO:カテゴリの内容を動的にする
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingButton, setIsLoadingButton] = useState(false)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const noteCol = createCollection('notes', user)
        const stateQuery = query(noteCol, where('date', '==', `${date!}`))

        if (stateQuery === null) return

        setIsLoading(true)
        const querySnapshot = await getDocs(stateQuery)
        setIsLoading(false)

        querySnapshot.forEach((doc) => {
          setNoteData(doc.data() as Note)

          // フォームの初期値をreact-hook-formのresetでキャッシュしてしまうので、resetを使う
          reset(doc.data() as Note)
        })
      } catch (e: any) {
        console.log(e.message)
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
      }
    }
    fetchAccount()
  }, [date, reset, toast, user])

  const [fileObject, setFileObject] = useState<Blob>()

  const fileImg = () => {
    if (fileObject) return window.URL.createObjectURL(fileObject)
    if (noteData.img) return noteData.img
    return null
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileData = e.target.files[0]
    setFileObject(fileData)
  }

  const handleStorage = async () => {
    // 画像をstorageにアップロード
    const uploadStorage = ref(storage, fileObject!.name)
    const imgData = await uploadBytes(uploadStorage, fileObject!)

    // アップロードした画像のURLを取得
    const downloadURL = await getDownloadURL(imgData.ref)
    return downloadURL
  }

  const uploadNote = async (data: FieldValues) => {
    const handleImgData = noteData.img ? noteData.img : await handleStorage()

    const noteDoc = doc(createCollection('notes', user), date)

    setIsLoadingButton(true)
    // db登録
    await setDoc(noteDoc, {
      img: handleImgData,
      name: data.name,
      memo: data.memo,
      category: data.category,
      date,
    })
    setIsLoadingButton(false)
    toast({
      title: '保存しました。',
      status: 'success',
      position: 'top',
      duration: 1300,
    })
  }

  if (isLoading) return <Spinner variants="full" />

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
          <ImgInput
            registration={register('img')}
            onChange={onFileInputChange}
            fileImg={fileImg()}
            isRequired
          />
          <Input
            {...register('name')}
            placeholder={'料理名'}
            _placeholder={{ color: 'var(--text-color-placeholder)' }}
            required
          />
          {/* 外部ライブラリの場合は、unControlな要素では無いのでregisterの代わりにControllerを使う */}
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                placeholder={'カテゴリ'}
                options={options}
                value={options.find((v) => v.value === field.value)}
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
          <Box minW={'100%'}>
            <Textarea placeholder="メモしたいこと" minH={'180px'} registration={register('memo')} />
          </Box>
          <Button type={'submit'} isLoading={isLoadingButton}>
            <Text fontSize={'sm'} fontWeight="700">
              保存
            </Text>
          </Button>
        </VStack>
      </chakra.form>
    </VStack>
  )
}
