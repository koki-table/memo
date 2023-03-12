import { Text, TextProps } from '@chakra-ui/react'
import { FC } from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

export type LinkProps = RouterLinkProps & Partial<Pick<TextProps, 'color' | 'fontSize' | 'mt'>>
export const Link: FC<LinkProps> = (props) => {
  const { children, color = 'var(--text-color-link)', fontSize = 'md', mt, ..._props } = props

  return (
    <RouterLink {..._props}>
      <Text as="span" color={color} fontSize={fontSize} mt={mt}>
        {children}
      </Text>
    </RouterLink>
  )
}
