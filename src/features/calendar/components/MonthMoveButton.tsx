import { HStack, Link } from '@chakra-ui/react'
import { FC } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

import { useCalendar } from '../lib'

export const MonthMoveButton: FC = () => {
  const { dispatch } = useCalendar()

  return (
    <HStack spacing={1}>
      <Link onClick={() => dispatch({ type: 'decrement' })}>
        <IoIosArrowBack />
      </Link>
      <Link onClick={() => dispatch({ type: 'increment' })}>
        <IoIosArrowForward />
      </Link>
    </HStack>
  )
}
