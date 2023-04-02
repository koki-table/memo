import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

const { MonthlyCalendar } = lazyImport(
  async () => await import('./MonthlyCalendar'),
  'MonthlyCalendar'
)

export const CalendarRoutes = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<MonthlyCalendar />} />
      </Routes>
    </Suspense>
  )
}
