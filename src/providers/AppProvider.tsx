import { FC, ReactNode } from 'react'

import { AuthProvider } from '@/features/auth'
import { ChakraProvider, ErrorBoundary, Suspense } from '@/providers'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = (props) => {
  const { children } = props

  return (
    <ChakraProvider>
      <Suspense>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}
