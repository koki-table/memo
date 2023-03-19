import { Center } from '@chakra-ui/react'
import { FC, ReactNode, Suspense as _Suspense } from 'react'

import { Spinner } from '@/components/Elements'

const SuspenseFallback = (): ReactNode => {
  return (
    <Center w="100vw" h="100vh">
      <Spinner />
    </Center>
  )
}

type SuspenseProps = {
  children: ReactNode
  fallback?: ReactNode
}

export const Suspense: FC<SuspenseProps> = (props) => {
  const { children, fallback = SuspenseFallback() } = props

  return <_Suspense fallback={fallback}>{children}</_Suspense>
}
