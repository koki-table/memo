import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

const { Home } = lazyImport(async () => await import('./Home'), 'Home')

export const HomeRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  )
}
