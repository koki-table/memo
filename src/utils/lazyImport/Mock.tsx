import React, { Suspense } from 'react'

import { lazyImport } from '@/utils/lazyImport'

export const { MockChildComponent } = lazyImport(
  async () => await import('./MockChild'),
  'MockChildComponent'
)

export const MockComponent: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MockChildComponent />
      </Suspense>
    </div>
  )
}
