import { HStack, Text } from '@chakra-ui/react'
import { FC } from 'react'

import { Icon } from '@/components/Elements/Icon'
import { IconType } from '@/components/Elements/Icon/types'

export type SnackBarProps = {
  type: 'success' | 'error' | 'guide' | 'notifiNav'
  text: string
  onClick?: () => void
}

type StyleProps = {
  iconType: IconType
  bgColor: string
  textColor: string
}

type StyleMap = {
  [key in SnackBarProps['type']]: StyleProps
}

const STYLE_MAP: StyleMap = {
  success: {
    iconType: 'circle-check--success',
    bgColor: 'var(--success-color-light)',
    textColor: 'var(--success-color-main)',
  },
  error: {
    iconType: 'alert-outline--error',
    bgColor: 'var(--error-color-light)',
    textColor: 'var(--error-color-main)',
  },
  guide: {
    iconType: 'information--accent',
    bgColor: 'var(--accent-color-light)',
    textColor: 'var(--accent-color-main)',
  },
  notifiNav: {
    iconType: 'alert--white',
    bgColor: 'var(--secondary-color-main)',
    textColor: 'var(--white)',
  },
}

export const SnackBar: FC<SnackBarProps> = ({ type, text, onClick }) => {
  return (
    <HStack
      p="14px"
      w="100%"
      bg={STYLE_MAP[type].bgColor}
      justifyContent="space-between"
      onClick={onClick}
      _hover={onClick !== undefined ? { opacity: 0.6, transition: '0.3s' } : undefined}
    >
      <HStack>
        <Icon type={STYLE_MAP[type].iconType} />
        <Text color={STYLE_MAP[type].textColor}>{text}</Text>
      </HStack>
      {onClick !== undefined ? (
        type === 'success' ? (
          <Icon type="chevron-right--success" />
        ) : type === 'error' ? (
          <Icon type="chevron-right--error" />
        ) : type === 'notifiNav' ? (
          <Icon type="chevron-right--white" />
        ) : null
      ) : null}
    </HStack>
  )
}
