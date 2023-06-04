import { Text, HStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import { useCalendar } from '../lib'

import { MonthMoveButton } from './MonthMoveButton'

export const CalendarHeader: FC = () => {
  const { currentMonth } = useCalendar()

  return (
    <HStack
      spacing={5}
      position="absolute"
      top="100px"
      right="20px"
      justifyContent={'space-between'}
      width={'90%'}
      alignItems={'center'}
    >
      <Text fontSize="sm" fontWeight="700">
        {dayjs(new Date(dayjs().year(), currentMonth)).format('YYYY/MMMM')}
      </Text>
      <MonthMoveButton />
    </HStack>
  )
}
