/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, chakra, VStack, Box, Input } from '@chakra-ui/react'
import { doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FC, useEffect, useState } from 'react'
import { useForm, FieldValues, Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import CreatableSelect from 'react-select/creatable'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'
import { useAuth } from '@/features/auth'
import { storage } from '@/main'
import { Note } from '@/types/Note'
import { createCollection } from '@/utils/database'

export const NoteComponent: FC = () => {
  const { date } = useParams()
  const { user } = useAuth()

  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const onSubmit = async (data: FieldValues) => await uploadNote(data)

  const [noteData, setNoteData] = useState<Note>({
    img: '',
    name: '',
    memo: '',
    category: 0,
    date: '',
  })

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      name: noteData.name,
      memo: noteData.memo,
      category: noteData.category,
      date: noteData.date,
      img: noteData.img,
    },
  })

  const defaultValue = 1

  const viewWidth = window.innerWidth - 32

  // TODO:カテゴリの内容を動的にする
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  console.log(noteData)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        // TODO: 該当dateで過去のデータがある場合は、stateに登録してフォームにセットする
        // const res = await getDoc(userRef)

        const noteCol = createCollection('notes', user)
        const stateQuery = query(noteCol, where('date', '==', `${date!}`))

        if (stateQuery === null) return
        const querySnapshot = await getDocs(stateQuery)
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data())
          setNoteData(doc.data() as Note)
        })
      } catch (e: any) {
        console.log(e.message)
      }
    }
    fetchAccount()
  }, [date, user])

  const [fileObject, setFileObject] = useState<Blob>()

  const fileImg = fileObject ? window.URL.createObjectURL(fileObject) : null

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const fileObject = e.target.files[0]
    setFileObject(fileObject)
  }

  const uploadNote = async (data: FieldValues) => {
    // 画像をstorageにアップロード処理
    const uploadStorage = ref(storage, fileObject!.name)
    const imgData = await uploadBytes(uploadStorage, fileObject!)

    // アップロードした画像のURLを取得
    const downloadURL = await getDownloadURL(imgData.ref)

    const noteDoc = doc(createCollection('notes', user), date)

    console.log(data)

    // dbにデータを登録
    // TODO: 既に登録されている場合は、storageの登録済み画像を削除してから登録する
    await setDoc(noteDoc, {
      img: downloadURL,
      name: data.name,
      memo: data.memo,
      category: data.category.value,
      date,
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
          <ImgInput
            registration={register('img')}
            onChange={onFileInputChange}
            fileImg={fileImg!}
          />
          <Input
            {...register('name')}
            placeholder={'料理名'}
            _placeholder={{ color: 'var(--text-color-placeholder)' }}
            defaultValue={noteData.name}
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
                defaultValue={{ label: 'Select Dept', value: 0 }}
                value={{ value: 'one', label: 'One' }}
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
            <Textarea
              placeholder="メモしたいこと"
              minH={'180px'}
              registration={register('memo')}
              defaultValue={noteData.memo}
            />
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
