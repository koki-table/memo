// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text, HStack, VStack, Box } from '@chakra-ui/react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { ImgInput } from '@/components/Form/ImgInput'
import { Textarea } from '@/components/Form/Textarea'

// import { Button } from '@/components/Elements'

// import { useNote } from '../lib'

export const NoteComponent: FC = () => {
  // const { dispatch } = useNote()
  const { id } = useParams()

  console.log(id)

  return (
    <VStack
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
      spacing={6}
    >
      <Box minW={'80%'}>
        <Textarea placeholder="メモしたいことを記載" minH={'180px'} />
      </Box>
      {/* <Text>{id}</Text> */}
      <ImgInput />
    </VStack>
  )
}
