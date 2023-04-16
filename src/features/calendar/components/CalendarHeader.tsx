import { Text, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import { useCalendar } from '../lib'

import { MonthMoveButton } from './MonthMoveButton'

// type CalendarHeaderProps = {
// }

export const CalendarHeader: FC = () => {
  const { currentMonth } = useCalendar()
  return (
    <HStack
      spacing={5}
      position="absolute"
      top="100px"
      right="20px"
      justifyContent={'space-between'}
      width={'85%'}
    >
      <Text fontSize="sm">{dayjs(new Date(dayjs().year(), currentMonth)).format('YYYY/MMMM')}</Text>
      <MonthMoveButton />
    </HStack>
  )
}