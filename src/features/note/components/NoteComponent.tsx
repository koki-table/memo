// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text, chakra, VStack, Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/Elements'
import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'

// import { Button } from '@/components/Elements'

// import { useNote } from '../lib'

export const NoteComponent: FC = () => {
  // const { dispatch } = useNote()
  const { id } = useParams()

  const formattedDate = `${id!.slice(0, 4)}/${id!.slice(4, 6)}/${id!.slice(6)}`

  const onSubmit = (data: any) => console.log(data)

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

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
          <ImgInput />
          <Box minW={'100%'}>
            <Textarea placeholder="メモしたいことを記載" minH={'180px'} {...register('example')} />
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
