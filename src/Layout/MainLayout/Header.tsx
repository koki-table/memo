/* eslint-disable @typescript-eslint/no-misused-promises */
import { chakra, Container, Flex, Link, Image, Box } from '@chakra-ui/react'
import { memo } from 'react'

import gyoza from '@/assets/gyoza.png'

import { HamburgerMenu } from './HamburgerMenu'

export const Header = memo(() => {
  return (
    <chakra.header
      py={3}
      bgColor={'var(--white)'}
      position={'relative'}
      zIndex={999}
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
        <Flex justifyContent="space-between" alignItems={'center'}>
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
          <HamburgerMenu />
        </Flex>
      </Container>
    </chakra.header>
  )
})

Header.displayName = 'Header'
