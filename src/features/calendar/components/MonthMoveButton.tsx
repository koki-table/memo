import { Text, HStack } from '@chakra-ui/react'
import { FC } from 'react'

import { Button } from '@/components/Elements'

import { useCalendar } from '../lib'

export const MonthMoveButton: FC = () => {
  const { dispatch } = useCalendar()

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
