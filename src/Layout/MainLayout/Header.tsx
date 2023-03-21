/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, chakra, Container, Heading } from '@chakra-ui/react'

import { useAuth } from '@/features/auth'

export const Header = () => {
  const { user, isLoading, signOut } = useAuth()

  return (
    <chakra.header py={4} bgColor={'blue.600'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          {user ? (
            <Button colorScheme={'teal'} onClick={signOut} isLoading={isLoading}>
              サインアウト
            </Button>
          ) : (
            'ログアウト中'
          )}
        </Heading>
      </Container>
    </chakra.header>
  )
}
