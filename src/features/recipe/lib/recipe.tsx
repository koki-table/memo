import { useToast } from '@chakra-ui/react'
import { query, orderBy, getDocs, where, doc, getDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, FC, useState, useCallback } from 'react'

import { useAuth } from '@/features/auth'
import { RecipeList } from '@/types/RecipeList'
import { createCollection, db } from '@/utils/database'

export type UseRecipe = {
  isLoading: boolean
  fetchAllRecipe: () => Promise<void>
  recipeList: RecipeList[]
  fetchSelectedRecipe: (selectedCategory: string) => Promise<void>
  fetchCategoryList: () => Promise<void>
  categoryList: string[] | undefined
  selectedCategory: string
  currentPage: number
  handlePage: (index: number) => void
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
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { user } = useAuth()

  const [recipeList, setRecipeList] = useState<RecipeList[]>([])
  const [categoryList, setCategoryList] = useState<string[]>()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAllRecipe = useCallback(async () => {
    try {
      const recipeCol = createCollection('recipes', user)
      const recipeQuery = query(recipeCol, orderBy('date', 'desc'))

      setIsLoading(true)
      const queryDateSnapshot = await getDocs(recipeQuery)
      setIsLoading(false)

      if (queryDateSnapshot.size > 0) {
        const recipes = queryDateSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          category: doc.data().category,
          date: doc.data().date,
        })) as RecipeList

        // RecipeListを10個ずつの配列に分割
        const chunkedRecipes = recipes.reduce((acc: RecipeList[], recipe, index) => {
          const chunkIndex = Math.floor(index / 10)
          if (!acc[chunkIndex]) {
            acc[chunkIndex] = []
          }
          acc[chunkIndex].push(recipe)
          return acc
        }, [])

        setRecipeList(chunkedRecipes)
        setSelectedCategory('All')
        setCurrentPage(1)
      } else {
        console.log('recipeは未登録です。')
      }
    } catch (e: any) {
      console.log(e.message)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      throw Error('Error in fetchUserAPI')
    }
  }, [toast, user])

  const fetchSelectedRecipe = useCallback(
    async (selectedValue: string) => {
      try {
        const recipeCol = createCollection('recipes', user)
        const recipeQuery = query(
          recipeCol,
          orderBy('date', 'desc'),
          where('category', '==', selectedValue)
        )

        setIsLoading(true)
        const queryDateSnapshot = await getDocs(recipeQuery)
        setIsLoading(false)

        if (queryDateSnapshot.size > 0) {
          const recipes = queryDateSnapshot.docs.map((doc) => ({
            name: doc.data().name,
            category: doc.data().category,
            date: doc.data().date,
          })) as RecipeList

          // RecipeListを10個ずつの配列に分割
          const chunkedRecipes = recipes.reduce((acc: RecipeList[], recipe, index) => {
            const chunkIndex = Math.floor(index / 10)
            if (!acc[chunkIndex]) {
              acc[chunkIndex] = []
            }
            acc[chunkIndex].push(recipe)
            return acc
          }, [])

          setRecipeList(chunkedRecipes)
          setSelectedCategory(selectedValue)
          setCurrentPage(1)
        } else {
          console.log('recipeは未登録です。')
        }
      } catch (e: any) {
        console.log(e.message)
        toast({
          title: 'エラーが発生しました。',
          status: 'error',
          position: 'top',
        })
        throw Error('Error in fetchUserAPI')
      }
    },
    [toast, user]
  )

  const fetchCategoryList = useCallback(async () => {
    try {
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)

      const queryCategorySnapshot = await getDoc(categoryDoc)

      if (queryCategorySnapshot.exists()) {
        setCategoryList(queryCategorySnapshot.data()!.categories)
      } else {
        console.log('categoryは未登録です。')
      }
    } catch (e: any) {
      console.log(e.message)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      throw Error('Error in fetchUserAPI')
    }
  }, [toast, user])

  const handlePage = useCallback((index: number) => {
    setCurrentPage(index)
  }, [])

  return {
    isLoading,
    fetchAllRecipe,
    recipeList,
    fetchSelectedRecipe,
    categoryList,
    fetchCategoryList,
    selectedCategory,
    currentPage,
    handlePage,
  }
}
