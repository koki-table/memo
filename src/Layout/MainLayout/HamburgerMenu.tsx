/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { FaHamburger } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'

export const HamburgerMenu: FC = () => {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const today = dayjs().format('YYMMDD')

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
            icon={isOpen ? <RxCross2 /> : <FaHamburger />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>ホーム</MenuItem>
            <MenuItem onClick={() => navigate(`/recipe/${today}`)}>本日の料理</MenuItem>
            <MenuItem onClick={() => navigate(`/calendar`)}>カレンダー</MenuItem>
            <MenuItem onClick={() => navigate(`/recipe/list`)}>料理リスト</MenuItem>
            <MenuItem onClick={onSubmit}>ログアウト</MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}
