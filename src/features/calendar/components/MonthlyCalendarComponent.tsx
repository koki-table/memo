/* eslint-disable @typescript-eslint/no-misused-promises */
import { VStack } from '@chakra-ui/react'
// import { useNavigate } from 'react-router-dom'

import { Heading } from '@/components/Elements'

export const MonthlyCalendarComponent = () => {
  return (
    <VStack
      py={14}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['80%', '400px']}
      margin="0 auto"
      padding={5}
      minH="100vh"
    >
      <Heading variant={'h3'}>ログイン</Heading>
    </VStack>
  )
}
