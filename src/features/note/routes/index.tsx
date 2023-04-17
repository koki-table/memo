import { Route, Routes } from 'react-router-dom'

import { Suspense } from '@/providers'
import { lazyImport } from '@/utils/lazyImport'

import { NoteProvider } from '../lib'

const { Note } = lazyImport(async () => await import('./Note'), 'Note')

export const NoteRoutes = () => {
  return (
    <NoteProvider>
      <Suspense>
        <Routes>
          <Route path="/:id" element={<Note />} />
        </Routes>
      </Suspense>
    </NoteProvider>
  )
}
