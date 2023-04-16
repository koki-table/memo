import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'

import { Icon, ButtonProps } from '@/components/Elements'

export type ButtonMenuItems = {
  label: string
  onClick: () => void
}

export type ButtonMenuProps = Pick<ButtonProps, 'variant'> & {
  label: string
  items: ButtonMenuItems[]
}

/**
 * TODO:
 * - HiFiスタイル調整
 * - toggle ChevroIcon
 */
export const ButtonMenu: FC<ButtonMenuProps> = ({ label, items, variant = 'round' }) => {
  return (
    <>
      <ChakraMenu>
        <MenuButton as={Button} variant={variant}>
          <HStack spacing={1}>
            <Text>{label}</Text>
            <Icon type="chevron-down--white" />
          </HStack>
        </MenuButton>
        <MenuList>
          {items.map((item) => (
            <MenuItem key={item.label} onClick={item.onClick}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </ChakraMenu>
    </>
  )
}
