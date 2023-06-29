import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { RecipeProvider } from '../lib'

const { Recipe } = lazyImport(async () => await import('./DailyRecipe'), 'Recipe')

export const DailyRecipeRoutes = () => {
  return (
    <RecipeProvider>
      <Suspense>
        <Routes>
          <Route path="/:date" element={<Recipe />} />
        </Routes>
      </Suspense>
    </RecipeProvider>
  )
}
