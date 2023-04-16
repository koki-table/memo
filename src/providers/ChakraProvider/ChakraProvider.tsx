import { ChakraProvider as _ChakraProvider } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

import { theme } from '@/providers/ChakraProvider/theme'
import '@/assets/index.css'

type ChakraProviderProps = {
  children: ReactNode
}

export const ChakraProvider: FC<ChakraProviderProps> = ({ children }) => {
  return (
    <_ChakraProvider theme={theme} resetCSS>
      {children}
    </_ChakraProvider>
  )
}
