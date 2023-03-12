import { Menu as ChakraMenu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

type IconMenuItems = {
  label: string
  onClick: () => void
}

export type IconMenuProps = {
  icon: ReactNode
  items: IconMenuItems[]
}

/**
 * TODO:
 * - HiFiスタイル調整
 * - toggle ChevroIcon
 */
export const IconMenu: FC<IconMenuProps> = ({ icon, items }) => {
  return (
    <>
      <ChakraMenu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={icon}
          bg="rgba(0, 0 , 0, 0)"
          _hover={{ bg: 'rgba(0, 0 , 0, 0)' }}
        />
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
