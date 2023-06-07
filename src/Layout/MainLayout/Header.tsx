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
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'
import { useAuth } from '@/features/auth'

export const Header = memo(() => {
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
    <chakra.header
      py={3}
      bgColor={'var(--white)'}
      position={'relative'}
      _before={{
        content: "''",
        position: 'absolute',
        display: 'block',
        height: '1px',
        width: '90%',
        inset: 0,
        margin: 'auto auto 0',
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'var(--line-color-main)',
      }}
    >
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
                <Avatar flexShrink={0} width={7} height={7} />
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
})

Header.displayName = 'Header'
