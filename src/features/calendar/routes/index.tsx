import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { CalendarProvider } from '../lib'

const { MonthlyCalendar } = lazyImport(
  async () => await import('./MonthlyCalendar'),
  'MonthlyCalendar'
)

export const CalendarRoutes = () => {
  return (
    <CalendarProvider>
      <Suspense>
        <Routes>
          <Route path="/" element={<MonthlyCalendar />} />
        </Routes>
      </Suspense>
    </CalendarProvider>
  )
}
