/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Box, Link, HStack } from '@chakra-ui/react'
import { FC } from 'react'
import { BsArrowRightShort } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

type CustomRowLinkProps = {
  text: string
  path: string
}

export const CustomRowLink: FC<CustomRowLinkProps> = (props) => {
  const navigate = useNavigate()
  const viewWidth = window.innerWidth - 32

  return (
    <Link onClick={() => navigate(props.path)}>
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
          {props.text}
        </Text>
        <Box pr={3}>
          <BsArrowRightShort size={23} />
        </Box>
      </HStack>
    </Link>
  )
}
