/* eslint-disable @typescript-eslint/no-misused-promises */
// import { useNavigate } from 'react-router-dom'
import { VStack, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import { useReducer } from 'react'

import { getMonth } from '@/utils/getMonth'

import { Day } from './Day'

export const MonthlyCalendarComponent = () => {
  dayjs.locale(ja)
  const month = dayjs().month()

  type Action = {
    type: 'increment' | 'decrement'
  }
  type State = {
    currentMonth: number
  }

  const initialState: State = {
    currentMonth: month,
  } as const

  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'increment': {
        return {
          ...state,
          currentMonth: state.currentMonth + 1,
        }
      }
      case 'decrement': {
        return {
          ...state,
          currentMonth: state.currentMonth - 1,
        }
      }
      default: {
        return state
      }
    }
  }

  const [{ currentMonth }, dispatch] = useReducer(reducer, initialState)

  const currentMonthData = getMonth(currentMonth)

  console.log(currentMonthData)

  return (
    <VStack
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 88px)`}
    >
      <Flex flexWrap="wrap" justifyContent="center">
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
