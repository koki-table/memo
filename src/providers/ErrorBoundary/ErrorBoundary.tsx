import { Center } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { ErrorBoundary as _ErrorBoundary } from 'react-error-boundary'

import { Button, Heading } from '@/components/Elements'

const ErrorFallback = () => {
  return (
    <Center h="100vh" w="100vw" flexDirection="column" gap={8}>
      <Heading variant={'h4'}>エラーが発生しました</Heading>
      <Button onClick={() => window.location.assign(window.location.origin)}>トップへ戻る</Button>
    </Center>
  )
}

type ErrorBoundaryProps = {
  children: ReactNode
}

export const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => {
  const onError = (error: Error, info: { componentStack: string }) => {
    // ここでログ出力などを行う
    console.log('error.message', error.message)
    console.log('info.componentStack:', info.componentStack)
  }

  return (
    <_ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
      {children}
    </_ErrorBoundary>
  )
}
