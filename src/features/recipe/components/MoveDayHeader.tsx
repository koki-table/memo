import { Text, VStack, Flex, Link, HStack } from '@chakra-ui/react'
import { FC, memo } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { calculateDay } from '@/utils/calculateDay'

export const MoveDayHeader: FC = memo(() => {
  const { date } = useParams()
  const formattedDate = `${date!.slice(0, 4)}/${date!.slice(4, 6)}/${date!.slice(6)}`

  const navigate = useNavigate()

  return (
    <VStack spacing={6} w="92%">
      <Flex w="100%" whiteSpace={'nowrap'} alignItems={'center'} justifyContent="space-between">
        <HStack alignItems={'center'} spacing={3}>
          <Text w={'100%'} fontSize={'sm'} fontWeight="600">
            {formattedDate}
          </Text>
          <Link
            onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: false })}`)}
          >
            <IoIosArrowBack />
          </Link>
          <Link
            onClick={() => navigate(`/recipe/${calculateDay({ date: date!, isNextDay: true })}`)}
          >
            <IoIosArrowForward />
          </Link>
        </HStack>
        <Link onClick={() => navigate(`/calendar`)} mr={'2'}>
          <MdCalendarMonth size={27} />
        </Link>
      </Flex>
    </VStack>
  )
})

MoveDayHeader.displayName = 'MoveDayHeader'
