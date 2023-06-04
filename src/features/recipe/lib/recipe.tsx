import dayjs from 'dayjs'
import { createContext, ReactNode, useContext, FC, useReducer } from 'react'

type Action = {
  type: 'increment' | 'decrement'
}

type State = {
  currentMonth: number
}

export type UseRecipe = {
  currentMonth: State['currentMonth']
  dispatch: React.Dispatch<Action>
}

const calendarContext = createContext<UseRecipe | undefined>(undefined)

type Props = { children: ReactNode }

export const useRecipe = () => {
  const context = useContext(calendarContext)

  if (context === undefined) {
    throw new Error('useRecipeがRecipeProvider内で利用されていません')
  }
  return context
}

export const RecipeProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const calendar = useRecipeProvider()
  return <calendarContext.Provider value={calendar}>{children}</calendarContext.Provider>
}

const useRecipeProvider = (): UseRecipe => {
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
