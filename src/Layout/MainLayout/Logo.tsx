import { Center, CenterProps } from '@chakra-ui/react'
import { FC, memo } from 'react'

import logo from '@/assets/logo.svg'
import { Image } from '@/components/Elements'

type LogoProps = CenterProps
export const Logo: FC<LogoProps> = memo((props) => {
  return (
    <Center {...props}>
      <Image src={logo} alt="logo" />
    </Center>
  )
})

Logo.displayName = 'Logo'
