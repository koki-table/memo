import { Routes, Route, Outlet } from 'react-router-dom'

import { NotFound } from '@/features/misc'
import { MainLayout } from '@/Layout'
import { Suspense } from '@/providers/Suspense'
import { lazyImport } from '@/utils/lazyImport'

const ProtectedLayout = () => {
  return (
    <MainLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

const { AuthRoutes } = lazyImport(async () => await import('@/features/auth'), 'AuthRoutes')
const { App } = lazyImport(async () => await import('@/App'), 'App')

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<App />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
