/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, Box } from '@chakra-ui/react'
import { FC } from 'react'

import bgFood from '@/assets/bgFood.png'
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
      position="relative"
    >
      <Box
        backgroundImage={`url(${bgFood})`}
        position="absolute"
        opacity={0.2}
        w={'100%'}
        h={'100%'}
        zIndex={0}
      />
      <VStack zIndex={2}>
        <LinkItem text={'カレンダー'} path={'/calendar'} />
        <LinkItem text={'料理リスト'} path={'/recipe/list'} />
      </VStack>
      <LoopingBackground source={sushi} w="120%" h={'50px'} animationDuration={'380s'} zIndex={2} />
    </VStack>
  )
}
