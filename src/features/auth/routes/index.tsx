import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

const { Register } = lazyImport(async () => await import('./Register'), 'Register')

export const AuthRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="register" element={<Register />} />
      </Routes>
    </Suspense>
  )
}
