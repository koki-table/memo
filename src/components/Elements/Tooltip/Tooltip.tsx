import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
  Box,
  defineStyle,
  defineStyleConfig,
  cssVar,
} from '@chakra-ui/react'
import { FC, ReactNode, forwardRef } from 'react'

// style
const $arrowBg = cssVar('popper-arrow-bg')

const baseStyle = {
  background: 'var(--background-color-gray)',
  [$arrowBg.variable]: 'var(--background-color-gray)',
  color: 'var(--white)',
  fontSize: 'sm',
  p: 4,
  borderRadius: 0,
}

const gray = defineStyle({ ...baseStyle })
const white = defineStyle({
  ...baseStyle,
  background: 'var(--white)',
  [$arrowBg.variable]: 'var(--white)',
  color: 'var(--text-color-main)',
  borderRadius: '4px',
})

export const tooltipTheme = defineStyleConfig({
  variants: { gray, white },
})

export type TooltipProps = ChakraTooltipProps & {
  variant?: 'gray' | 'white'
  placement?: 'bottom' | 'bottom-start'
}

type CustomBoxProps = {
  children: ReactNode
}

// eslint-disable-next-line react/display-name
const CustomBox: FC<CustomBoxProps> = forwardRef<HTMLSpanElement, JSX.IntrinsicElements['span']>(
  (props, ref) => {
    const { children, ...rest } = props
    return (
      <span ref={ref} {...rest}>
        <Box mb={-2} display="inline-block">
          {children}
        </Box>
      </span>
    )
  }
)

export const Tooltip: FC<TooltipProps> = (props) => {
  const { children, variant = 'gray', placement = 'bottom', ..._props } = props

  return (
    <ChakraTooltip variant={variant} placement={placement} {..._props}>
      <CustomBox>{children}</CustomBox>
    </ChakraTooltip>
  )
}
