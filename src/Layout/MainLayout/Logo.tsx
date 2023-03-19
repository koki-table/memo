import { Center, CenterProps } from '@chakra-ui/react'
import { FC } from 'react'

import logo from '@/assets/logo.svg'
import { Image } from '@/components/Elements'

type LogoProps = CenterProps
export const Logo: FC<LogoProps> = (props) => {
  return (
    <Center {...props}>
      <Image src={logo} alt="logo" />
    </Center>
  )
}
