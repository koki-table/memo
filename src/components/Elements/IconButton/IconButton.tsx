import {
  IconButton as ChakraIconButton,
  IconButtonProps as ChakraIconButtonProps,
} from '@chakra-ui/react'
import { FC } from 'react'

export type IconButtonProps = ChakraIconButtonProps & {
  variant?: 'transparent'
}

export const IconButton: FC<IconButtonProps> = (props) => {
  const { children, variant, ..._props } = props

  return <ChakraIconButton variant={variant} {..._props} />
}
