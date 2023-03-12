import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/react'
import { FC } from 'react'

// style
const baseStyle = {
  color: 'var(--text-color-main)',
  fontSize: '3xl',
  fontWeight: 'bold',
}

const h2 = defineStyle({ ...baseStyle })
const h1 = defineStyle({
  ...baseStyle,
  fontSize: '4xl',
})
const h3 = defineStyle({
  ...baseStyle,
  fontSize: '2xl',
})
const h4 = defineStyle({
  ...baseStyle,
  fontSize: 'xl',
})
const h5 = defineStyle({
  ...baseStyle,
  fontSize: 'lg',
})
const h6 = defineStyle({
  ...baseStyle,
  fontSize: 'md',
})

export const headingTheme = defineStyleConfig({
  variants: { h1, h2, h3, h4, h5, h6 },
})

// view
export type HeadingProps = ChakraHeadingProps & {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
export const Heading: FC<HeadingProps> = (props) => {
  const { variant = 'h2', children, ..._props } = props

  return (
    <ChakraHeading as={variant} variant={variant} {..._props}>
      {children}
    </ChakraHeading>
  )
}
