import { VStack, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'

import { getMonth } from '@/utils/getMonth'

import { useCalendar } from '../lib'

import { CalendarHeader } from './CalendarHeader'
import { Day } from './Day'

export const MonthlyCalendarComponent = () => {
  dayjs.locale(ja)
  const { currentMonth } = useCalendar()

  const currentMonthData = getMonth(currentMonth)

  return (
    <VStack
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <CalendarHeader />
      <Flex flexWrap="wrap" justifyContent="center" position="absolute" top="140px">
        {currentMonthData.map((row, i) => (
          <Flex
            key={i}
            flexWrap="wrap"
            borderTop={'solid 1px var(--line-color-light)'}
            borderLeft={'solid 1px var(--line-color-light)'}
            _last={{ borderBottom: 'solid 1px var(--line-color-light)' }}
          >
            {row.map((day, idx) => (
              <Day day={day} key={idx} rowIndex={i} />
            ))}
          </Flex>
        ))}
      </Flex>
    </VStack>
  )
}
