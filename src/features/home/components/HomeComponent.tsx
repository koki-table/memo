/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { VStack, Box } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'

import bgFood from '@/assets/bgFood.png'
import sushi from '@/assets/sushi.png'
import { CustomRowLink } from '@/components/CustomRowLink'
import { LoopingBackground } from '@/components/Elements/Animation/Loop'

export const HomeComponent: FC = () => {
  const today = dayjs().format('YYYYMMDD')

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
        <CustomRowLink text={'本日の料理'} path={`/recipe/${today}`} />
        <CustomRowLink text={'カレンダー'} path={'/calendar'} />
        <CustomRowLink text={'料理リスト'} path={'/recipe-list'} />
      </VStack>
      <LoopingBackground source={sushi} w="120%" h={'50px'} animationDuration={'380s'} zIndex={2} />
    </VStack>
  )
}
