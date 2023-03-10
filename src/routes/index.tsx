import { Routes, Route } from 'react-router-dom'

import { lazyImport } from '@/utils/lazyImport'
import { NotFound } from '@/features/misc'

const { AccountRegister } = lazyImport(
  async () => await import('@/features/accounts'),
  'AccountRegister'
)

export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/">
        <Route index element={<AccountRegister />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
