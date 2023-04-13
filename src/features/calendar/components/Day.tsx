import { Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { FC } from 'react'

type DayProps = {
  day: dayjs.Dayjs
  rowIndex: number
}

export const Day: FC<DayProps> = (props) => {
  const { day, rowIndex } = props

  // 今日の日付を色付けする
  const getTodayStyle =
    day.format('D-MM-YY') === dayjs().format('D-MM-YY') ? 'var(--primary-color-light)' : ''

  const viewWidth = (window.innerWidth - 40) / 7

  return (
    <Box>
      <Text minW={viewWidth} display="grid" placeItems="center">
        {/* 1行目に曜日を表示 */}
        {rowIndex === 0 && <Text>{day.format('ddd')}</Text>}
        <Text
          paddingY="4"
          zIndex={2}
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            w: '25px',
            h: '25px',
            inset: '0',
            margin: 'auto',
            borderRadius: '20px',
            backgroundColor: getTodayStyle,
            zIndex: 1,
            opacity: 0.6,
          }}
        >
          {day.format('D')}
        </Text>
      </Text>
    </Box>
  )
}
