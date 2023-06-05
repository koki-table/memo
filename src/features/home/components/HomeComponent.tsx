/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, Link, keyframes, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'

import { LinkItem } from './LinkItem'

const bgLoop = keyframes`
  from { background-position: 0 0; }
to { background-position: -6300px 0; }
`

export const HomeComponent: FC = () => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32

  return (
    <VStack
      px={'4'}
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 93px)`}
      spacing={10}
    >
      <VStack>
        <LinkItem text={'カレンダー'} path={'/calendar'} />
        <LinkItem text={'レシピリスト'} path={'/recipe/list'} />
      </VStack>
      <Box
        backgroundImage={gyoza}
        w={'120%'}
        h={'50px'}
        backgroundPosition="0 0"
        backgroundSize={'auto 100%'}
        backgroundRepeat={'repeat-x'}
        animation={`${bgLoop} 380s linear infinite`}
        mt={10}
      />
    </VStack>
  )
}
