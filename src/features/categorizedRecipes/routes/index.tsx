import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { RecipeProvider } from '../lib'

const { RecipeList } = lazyImport(async () => await import('./RecipeList'), 'RecipeList')

export const CategorizedRecipesRoutes = () => {
  return (
    <RecipeProvider>
      <Suspense>
        <Routes>
          <Route path="/list" element={<RecipeList />} />
        </Routes>
      </Suspense>
    </RecipeProvider>
  )
}
