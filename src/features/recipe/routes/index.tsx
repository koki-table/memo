import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { RecipeProvider } from '../lib'

const { Recipe } = lazyImport(async () => await import('./Recipe'), 'Recipe')
const { RecipeList } = lazyImport(async () => await import('./RecipeList'), 'RecipeList')

export const RecipeRoutes = () => {
  return (
    <RecipeProvider>
      <Suspense>
        <Routes>
          <Route path="/:date" element={<Recipe />} />
          <Route path="/list" element={<RecipeList />} />
        </Routes>
      </Suspense>
    </RecipeProvider>
  )
}
