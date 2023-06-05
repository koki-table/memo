/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, VStack, Box, Link, keyframes, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import gyoza from '@/assets/gyoza.png'

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
      pb={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxW={['100%', '400px']}
      margin="0 auto"
      minH={`calc(100vh)`}
    >
      <VStack>
        <Link onClick={() => navigate(`/calendar/`)}>
          <HStack
            width={viewWidth}
            alignItems={'flex-start'}
            spacing={2}
            pt="6"
            pb="6"
            borderBottom={'1px'}
            borderColor={'var(--line-color-main)'}
          >
            <Text fontSize={'md'} pl={2} w={'100%'} lineHeight="1.6" fontWeight={'semibold'}>
              Calendar
            </Text>
            <Box pr={3}>
              <BsArrowRightShort size={23} />
            </Box>
          </HStack>
        </Link>
        <Box
          backgroundImage={gyoza}
          w={'120%'}
          h={'50px'}
          backgroundPosition="0 0"
          backgroundSize={'auto 100%'}
          backgroundRepeat={'repeat-x'}
          animation={`${bgLoop} 380s linear infinite`}
        />
      </VStack>
    </VStack>
  )
}
