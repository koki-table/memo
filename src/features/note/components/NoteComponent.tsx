// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Text, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { ImgInput } from '@/components/Form/ImgInput'

// import { Button } from '@/components/Elements'

// import { useNote } from '../lib'

export const NoteComponent: FC = () => {
  // const { dispatch } = useNote()
  const { id } = useParams()

  console.log(id)

  return (
    <HStack spacing={1}>
      {/* <Text>{id}</Text> */}
      <ImgInput />
    </HStack>
  )
}
