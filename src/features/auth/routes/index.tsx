import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

const { Register } = lazyImport(async () => await import('./Register'), 'Register')
const { Login } = lazyImport(async () => await import('./Login'), 'Login')

export const AuthRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Suspense>
  )
}
