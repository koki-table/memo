/* eslint-disable @typescript-eslint/no-misused-promises */
import { Text, chakra, VStack, Box, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'

export const NoteComponent: FC = () => {
  const { id } = useParams()

  const formattedDate = `${id!.slice(0, 4)}/${id!.slice(4, 6)}/${id!.slice(6)}`

  const onSubmit = (data: FieldValues) => console.log(data)

  const { register, handleSubmit } = useForm()

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
          <ImgInput registration={register('img')} />
          <Input
            {...register('title')}
            placeholder={'料理名'}
            _placeholder={{ color: 'var(--text-color-placeholder)' }}
          />
          <Box minW={'100%'}>
            <Textarea
              placeholder="メモしたいこと"
              minH={'180px'}
              registration={register('textarea')}
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
