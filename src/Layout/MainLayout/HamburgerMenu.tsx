/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { BiHomeAlt2, BiBowlRice, BiRun } from 'react-icons/bi'
import { BsBook } from 'react-icons/bs'
import { FaHamburger } from 'react-icons/fa'
import { GiKnifeFork } from 'react-icons/gi'
import { MdCalendarMonth } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'

export const HamburgerMenu: FC = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const today = dayjs().format('YYYYMMDD')

  const onSubmit = async () => {
    const { success, message } = await signOut()
    if (success) {
      console.log(message)
      navigate('/auth/login')
    }
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={isOpen ? <GiKnifeFork /> : <FaHamburger />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={() => navigate(`/`)} icon={<BiHomeAlt2 />}>
              ホーム
            </MenuItem>
            <MenuItem onClick={() => navigate(`/recipe/${today}`)} icon={<BiBowlRice />}>
              本日の料理
            </MenuItem>
            <MenuItem onClick={() => navigate(`/calendar`)} icon={<MdCalendarMonth />}>
              カレンダー
            </MenuItem>
            <MenuItem onClick={() => navigate(`/recipe-list`)} icon={<BsBook />}>
              料理リスト
            </MenuItem>
            <MenuItem onClick={onSubmit} icon={<BiRun />}>
              ログアウト
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
