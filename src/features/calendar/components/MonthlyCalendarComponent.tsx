import { VStack, Flex, useToast } from '@chakra-ui/react'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import { query, getDocs } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'

import { Spinner } from '@/components/Elements'
import { useAuth } from '@/features/auth'
import { Recipe } from '@/types/Recipe'
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

  const [activeDate, setActiveDate] = useState<Array<Pick<Recipe, 'img' | 'date'>>>([])

  const toImgUrl = useCallback(
    (date: dayjs.Dayjs) => {
      const matchedItem = activeDate.filter((item) => item.date === date.format('YYYYMMDD'))
      if (matchedItem.length === 0) return null
      return matchedItem[0].img
    },
    [activeDate]
  )

  useEffect(() => {
    const { firstDate, lastDate } = getMonth(currentMonth)

    const fetchAccount = async () => {
      try {
        const recipeCol = createCollection('dates', user)
        const dateQuery = query(recipeCol)

        if (dateQuery === null) return

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(dateQuery)
        setIsLoading(false)

        const flattenRecipes = queryDateSnapshot.docs.flatMap((doc) =>
          doc.data().recipes.map((recipe: Pick<Recipe, 'img' | 'date'>) => ({
            img: recipe.img,
            date: recipe.date,
          }))
        )

        const filteredRecipes = flattenRecipes.filter((recipe: Pick<Recipe, 'img' | 'date'>) => {
          const recipeDate = dayjs(recipe.date)
          return recipeDate.isAfter(dayjs(firstDate)) && recipeDate.isBefore(dayjs(lastDate))
        })

        setActiveDate(filteredRecipes)
      } catch (e: any) {
        console.log(e.message)
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
        throw Error('Error in fetchUserAPI')
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
      minH={`calc(100vh - 69px)`}
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
              <Day day={day} key={idx} rowIndex={i} imgUrl={toImgUrl(day)} />
            ))}
          </Flex>
        ))}
      </Flex>
    </VStack>
  )
}
