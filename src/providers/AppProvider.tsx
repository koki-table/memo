import { FC, ReactNode } from 'react'

import { ChakraProvider, ErrorBoundary, Suspense } from '@/providers'

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: FC<AppProviderProps> = (props) => {
  const { children } = props

  return (
    <ChakraProvider>
      <Suspense>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Suspense>
    </ChakraProvider>
  )
}
