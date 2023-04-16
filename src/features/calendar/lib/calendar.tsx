import dayjs from 'dayjs'
import { createContext, ReactNode, useContext, FC, useReducer } from 'react'

type Action = {
  type: 'increment' | 'decrement'
}

type State = {
  currentMonth: number
}

export type UseCalendar = {
  currentMonth: State['currentMonth']
  dispatch: React.Dispatch<Action>
}

const calendarContext = createContext<UseCalendar | undefined>(undefined)

type Props = { children: ReactNode }

export const useCalendar = () => {
  const context = useContext(calendarContext)

  if (context === undefined) {
    throw new Error('useCalendarがCalendarProvider内で利用されていません')
  }
  return context
}

export const CalendarProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const calendar = useCalendarProvider()
  return <calendarContext.Provider value={calendar}>{children}</calendarContext.Provider>
}

const useCalendarProvider = (): UseCalendar => {
  const month = dayjs().month()

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

  return {
    currentMonth,
    dispatch,
  }
}
