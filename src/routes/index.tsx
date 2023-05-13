import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import { Spinner } from '@/components/Elements/Spinner'
import { useAuth } from '@/features/auth'
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
const { CalendarRoutes } = lazyImport(
  async () => await import('@/features/calendar'),
  'CalendarRoutes'
)
const { NoteRoutes } = lazyImport(async () => await import('@/features/note'), 'NoteRoutes')
const { App } = lazyImport(async () => await import('@/App'), 'App')

export const AppRoutes = () => {
  const { user } = useAuth()

  const handleAuth = () => {
    if (typeof user === 'undefined') return <Spinner variants="full" />
    if (user === null) return <Navigate to="/auth/login" />
    return <ProtectedLayout />
  }

  return (
    <Routes>
      <Route path="/" element={handleAuth()}>
        <Route index element={<App />} />
        <Route path="/calendar/*" element={<CalendarRoutes />} />
        <Route path="/note/*" element={<NoteRoutes />} />
      </Route>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
