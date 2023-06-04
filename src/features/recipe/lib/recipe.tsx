import { createContext, ReactNode, useContext, FC, useState } from 'react'

export type UseRecipe = {
  isLoading: boolean
}

const recipeContext = createContext<UseRecipe | undefined>(undefined)

type Props = { children: ReactNode }

export const useRecipe = () => {
  const context = useContext(recipeContext)

  if (context === undefined) {
    throw new Error('useRecipeがRecipeProvider内で利用されていません')
  }
  return context
}

export const RecipeProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const recipe = useRecipeProvider()
  return <recipeContext.Provider value={recipe}>{children}</recipeContext.Provider>
}

const useRecipeProvider = (): UseRecipe => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true)

  return {
    isLoading,
  }
}
