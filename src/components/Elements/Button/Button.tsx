import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react'
import { FC } from 'react'

// style
const baseStyle = {
  background: 'var(--primary-color-main)',
  color: 'white',
  transition: 'var(--transition-ease-in)',
  fontWeight: 'Medium',
  fontSize: '14px',
  _hover: {
    background: 'var(--primary-color-dark)',
  },
}

const primary = defineStyle({ ...baseStyle })
const gray = defineStyle({
  ...baseStyle,
  background: 'var(--text-color-main)',
  _hover: {
    background: 'var(--text-color-sub)',
  },
})

const round = defineStyle({
  ...baseStyle,
  borderRadius: '22px',
  minH: '44px',
})

const roundTransparent = defineStyle({
  ...round,
  background: 'var(--white)',
  color: 'var(--text-color-secondary)',
  border: '1px solid var(--line-color-main)',
  _hover: {
    opacity: 0.7,
  },
})

const circle = defineStyle({
  transition: 'var(--transition-ease-in)',
  borderRadius: '50%',
  bg: 'var(--hover-color-primary)',
  p: 1,
  color: 'var(--text-color-pagination)',
  fontWeight: '400',
})

const circleTransparent = defineStyle({
  transition: 'var(--transition-ease-in)',
  bg: 'none',
  borderRadius: '50%',
  p: 1,
  color: 'var(--text-color-pagination)',
  fontWeight: '400',
  _hover: {
    bg: 'var(--hover-color-primary)',
  },
})

const transparent = defineStyle({
  transition: 'var(--transition-ease-in)',
  background: 'none',
  border: 'none',
  _hover: {
    bg: 'var(--background-color-main)',
  },
})

export const buttonTheme = defineStyleConfig({
  variants: { primary, gray, round, roundTransparent, circle, circleTransparent, transparent },
})

// view
export type ButtonProps = ChakraButtonProps & {
  variant?: 'primary' | 'gray' | 'round' | 'roundTransparent' | 'circle' | 'circleTransparent'
  minWidth?: string | number
}
export const Button: FC<ButtonProps> = (props) => {
  const { variant = 'primary', children, onClick, minWidth = '180px', ..._props } = props

  return (
    <ChakraButton variant={variant} {..._props} onClick={onClick} minWidth={minWidth}>
      {children}
    </ChakraButton>
  )
}
