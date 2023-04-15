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

  const dayViewWidth = (window.innerWidth - 40) / 7

  return (
    <Box borderRight={'solid 1px var(--line-color-light)'}>
      <Text minW={`${dayViewWidth}px`} display="grid" placeItems="center">
        {/* 1行目に曜日を表示 */}
        {rowIndex === 0 && (
          <Text
            as="span"
            borderBottom={'solid 1px var(--line-color-light)'}
            display="grid"
            placeItems="center"
            w="100%"
            paddingY={2}
            fontSize="xs"
          >
            {day.format('ddd')}
          </Text>
        )}
        <Text
          as="span"
          paddingY="5"
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
