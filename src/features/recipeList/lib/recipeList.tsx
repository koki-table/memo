import { useToast } from '@chakra-ui/react'
import { query, orderBy, getDocs, where, doc, getDoc, updateDoc } from 'firebase/firestore'
import { createContext, ReactNode, useContext, FC, useState, useCallback } from 'react'

import { useAuth } from '@/features/auth'
import { Recipe } from '@/types/Recipe'
import { RecipeList } from '@/types/RecipeList'
import { createCollection, db } from '@/utils/database'

export type UseRecipeList = {
  isLoading: boolean
  fetchAllRecipe: () => Promise<void>
  recipeList: RecipeList[]
  fetchSelectedRecipe: (selectedCategory: string) => Promise<void>
  fetchCategoryList: () => Promise<void>
  categoryList: string[] | undefined
  selectedCategory: string
  currentPage: number
  handlePage: (index: number) => void
  updateRecipeCategories: (prevCategoryValue: string, newCategoryValue: string) => Promise<void>
  updateCategory: (prevCategoryValue: string, newCategoryValue: string) => Promise<void>
}

const recipeListContext = createContext<UseRecipeList | undefined>(undefined)

type Props = { children: ReactNode }

export const useRecipeList = () => {
  const context = useContext(recipeListContext)

  if (context === undefined) {
    throw new Error('useRecipeListがRecipeListProvider内で利用されていません')
  }
  return context
}

export const RecipeListProvider: FC<{ children: ReactNode }> = ({ children }: Props) => {
  const recipeList = useRecipeListProvider()
  return <recipeListContext.Provider value={recipeList}>{children}</recipeListContext.Provider>
}

const useRecipeListProvider = (): UseRecipeList => {
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { user } = useAuth()

  const [recipeList, setRecipeList] = useState<RecipeList[]>([])
  const [categoryList, setCategoryList] = useState<string[]>()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAllRecipe = useCallback(async () => {
    try {
      const recipeCol = createCollection('dates', user)
      const recipeQuery = query(recipeCol)

      setIsLoading(true)
      const queryDateSnapshot = await getDocs(recipeQuery)
      setIsLoading(false)

      if (queryDateSnapshot.size > 0) {
        const flattenRecipes = queryDateSnapshot.docs.flatMap((doc) =>
          doc.data().recipes.map((recipe: Pick<Recipe, 'category' | 'name'>) => ({
            name: recipe.name,
            category: recipe.category,
            date: doc.data().date,
          }))
        ) as RecipeList

        // RecipeListを10個ずつの配列に分割
        const chunkedRecipes = flattenRecipes.reduce((acc: RecipeList[], recipe, index) => {
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

  const updateRecipeCategories = async (prevCategoryValue: string, newCategoryValue: string) => {
    try {
      const recipeCol = createCollection('recipes', user)
      const categoryQuery = query(recipeCol, where('category', '==', prevCategoryValue))

      const querySnapshot = await getDocs(categoryQuery)

      querySnapshot.forEach((query) => {
        const docRef = doc(recipeCol, query.id)
        updateDoc(docRef, { category: newCategoryValue })
      })
    } catch (e: any) {
      console.log(e.message)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      throw Error('Error in updateRecipeCategories')
    }
  }

  const updateCategory = async (prevCategoryValue: string, newCategoryValue: string) => {
    try {
      const categoryDoc = doc(db, `users/${user!.uid.toString()}`)
      const categorySnapshot = await getDoc(categoryDoc)

      if (categorySnapshot.exists()) {
        const categories = categorySnapshot.data().categories
        const updatedCategories = categories.map((category: string) => {
          if (category === prevCategoryValue) {
            return newCategoryValue
          }
          return category
        })
        await updateDoc(categoryDoc, {
          categories: updatedCategories,
        })
      }
    } catch (e: any) {
      console.log(e.message)
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      })
      throw Error('Error in updateCategory')
    }
  }

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
    updateRecipeCategories,
    updateCategory,
  }
}
