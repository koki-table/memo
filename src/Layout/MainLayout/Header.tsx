/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Avatar,
  Button,
  chakra,
  Container,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Box,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'
import { useAuth } from '@/features/auth'

export const Header = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const onSubmit = async () => {
    const { success, message } = await signOut()
    if (success) {
      console.log(message)
      navigate('/auth/login')
    }
  }

  return (
    <chakra.header py={6} bgColor={'var(--white)'}>
      <Container maxW={'container.lg'}>
        <Flex justifyContent="space-between">
          <Link href={'/'}>
            <chakra.a
              _hover={{
                opacity: 0.8,
              }}
            >
              <Box w={'60px'}>
                <Image src={gyoza} />
              </Box>
            </chakra.a>
          </Link>
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>
              <MenuList py={0}>
                <MenuItem onClick={onSubmit}>サインアウト</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href={'/auth/register'}>
              <Button as={'a'} colorScheme={'teal'}>
                サインイン
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
