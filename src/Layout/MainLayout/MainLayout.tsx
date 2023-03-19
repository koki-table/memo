import { Box } from '@chakra-ui/react'
import { FC } from 'react'

import { Header } from '@/Layout/MainLayout/Header'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box overflow="hidden">
      <Header />
      <Box as="main" flex="1" overflow="hidden">
        {children}
      </Box>
    </Box>
  )
}
