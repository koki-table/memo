import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { RecipeProvider } from '../lib'

const { RecipeList } = lazyImport(async () => await import('./RecipeList'), 'RecipeList')

export const RecipeListRoutes = () => {
  return (
    <RecipeProvider>
      <Suspense>
        <Routes>
          <Route path="/" element={<RecipeList />} />
        </Routes>
      </Suspense>
    </RecipeProvider>
  )
}
