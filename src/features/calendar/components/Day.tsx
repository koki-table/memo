import { Box, Text, Link, Image } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type DayProps = {
  day: dayjs.Dayjs
  rowIndex: number
  imgUrl: string | null
}

export const Day: FC<DayProps> = (props) => {
  const { day, rowIndex, imgUrl } = props
  const navigate = useNavigate()

  // 今日の日付を色付け
  const getTodayStyle =
    day.format('D-MM-YY') === dayjs().format('D-MM-YY') ? 'var(--secondary-color-main)' : ''

  const dayViewWidth = (window.innerWidth - 40) / 7

  return (
    <Box borderRight={'solid 1px var(--line-color-light)'}>
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
      <Link
        display="grid"
        placeItems="center"
        textAlign={'center'}
        onClick={() => navigate(`/recipe/${day.format('YYYYMMDD')}`)}
        position="relative"
      >
        {/* 1行目に曜日を表示 */}
        <Text
          minW={`${dayViewWidth}px`}
          paddingY="5"
          zIndex={2}
          position="relative"
          color={imgUrl ? 'var(--white)' : 'var(--text-color-main)'}
          fontWeight={imgUrl ? 600 : 400}
          _before={{
            content: '""',
            position: 'absolute',
            w: '35px',
            h: '35px',
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
        {imgUrl && (
          <Image
            src={imgUrl}
            w={'100%'}
            position={'absolute'}
            inset={0}
            m={'auto'}
            objectFit={'contain'}
            maxHeight={'100%'}
          />
        )}
      </Link>
    </Box>
  )
}
