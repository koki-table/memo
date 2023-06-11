import { Flex } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

export type BadgeProps = {
  type: 'text' | 'icon'
  children: ReactNode
}

export const Badge: FC<BadgeProps> = ({ children, type }) => {
  type WrapperBadgeProps = {
    m: string | number
    children: ReactNode
  }

  const WrapperBadge: FC<WrapperBadgeProps> = ({ m, children }) => {
    const baseStyle = {
      content: '""',
      display: 'inline-block',
      bg: 'var(--success-color-main)',
      w: '2',
      h: '2',
      borderRadius: '50%',
      position: 'relative',
    }

    return (
      <Flex
        _after={{
          ...baseStyle,
          m,
        }}
      >
        {children}
      </Flex>
    )
  }

  const typeStatus = {
    text: <WrapperBadge m="0 0 0 4px">{children}</WrapperBadge>,
    icon: <WrapperBadge m="3px 0 0 -8px">{children}</WrapperBadge>,
  }[type]

  return <>{typeStatus}</>
}
