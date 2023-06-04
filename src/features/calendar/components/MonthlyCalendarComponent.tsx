import { VStack, Flex, useToast } from '@chakra-ui/react'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import { query, where, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { createCollection } from '@/utils/database'
import { getMonth } from '@/utils/getMonth'

import { useCalendar } from '../lib'

import { CalendarHeader } from './CalendarHeader'
import { Day } from './Day'

export const MonthlyCalendarComponent = () => {
  dayjs.locale(ja)
  const { currentMonth } = useCalendar()
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()
  const toast = useToast()

  const { dayInit: currentMonthData } = getMonth(currentMonth)

  const [activeDate, setActiveDate] = useState([''])

  const hasActiveDate = (day: dayjs.Dayjs) => activeDate.includes(day.format('YYYYMMDD'))

  useEffect(() => {
    const { firstDate, lastDate } = getMonth(currentMonth)

    const fetchAccount = async () => {
      try {
        const recipeCol = createCollection('recipes', user)
        const dateQuery = query(
          recipeCol,
          where('date', '>=', firstDate.format('YYYYMMDD')),
          where('date', '<=', lastDate.format('YYYYMMDD'))
        )

        if (dateQuery === null) return

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(dateQuery)
        setIsLoading(false)

        queryDateSnapshot.forEach((doc) => {
          setActiveDate((prev) => [...prev, doc.data().date])
        })
      } catch (e: any) {
        console.log(e.message)
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
      }
    }
    fetchAccount()
  }, [currentMonth, toast, user])

  if (isLoading) return <Spinner variants="full" />

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
              <Day day={day} key={idx} rowIndex={i} hasActiveDate={hasActiveDate(day)} />
            ))}
          </Flex>
        ))}
      </Flex>
    </VStack>
  )
}
