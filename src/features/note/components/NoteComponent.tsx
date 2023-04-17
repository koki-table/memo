import { Text, HStack } from '@chakra-ui/react'
import { FC } from 'react'

import { Button } from '@/components/Elements'

import { useNote } from '../lib'

export const NoteComponent: FC = () => {
  const { dispatch } = useNote()

  return (
    <HStack spacing={1}>
      <Button variant="circle" onClick={() => dispatch({ type: 'decrement' })} minWidth="40px">
        <Text fontSize="xs">前月</Text>
      </Button>
      <Button variant="circle" onClick={() => dispatch({ type: 'increment' })} minWidth="40px">
        <Text fontSize="xs">翌月</Text>
      </Button>
    </HStack>
  )
}
