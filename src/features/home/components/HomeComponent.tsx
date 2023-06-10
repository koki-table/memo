/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack } from '@chakra-ui/react'
import { FC } from 'react'

import gyoza from '@/assets/gyoza.png'
import { LoopingBackground } from '@/components/Elements/Animation/Loop'

import { LinkItem } from './LinkItem'

export const HomeComponent: FC = () => {
  return (
    <VStack
      px={'4'}
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh - 69px)`}
      spacing={10}
    >
      <VStack>
        <LinkItem text={'カレンダー'} path={'/calendar'} />
        <LinkItem text={'レシピリスト'} path={'/recipe/list'} />
      </VStack>
      <LoopingBackground source={gyoza} w="120%" h={'50px'} animationDuration={'380s'} />
    </VStack>
  )
}
