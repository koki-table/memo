/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack } from '@chakra-ui/react'
import { FC } from 'react'

import sushi from '@/assets/sushi.png'
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
      spacing={16}
    >
      <VStack>
        <LinkItem text={'カレンダー'} path={'/calendar'} />
        <LinkItem text={'料理リスト'} path={'/recipe/list'} />
      </VStack>
      <LoopingBackground source={sushi} w="120%" h={'50px'} animationDuration={'380s'} />
    </VStack>
  )
}
