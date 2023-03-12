import { Routes, Route } from 'react-router-dom'

import { NotFound } from '@/features/misc'
import { lazyImport } from '@/utils/lazyImport'

const { AuthRoutes } = lazyImport(async () => await import('@/features/auth'), 'AuthRoutes')
const { App } = lazyImport(async () => await import('@/App'), 'App')

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<App />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
