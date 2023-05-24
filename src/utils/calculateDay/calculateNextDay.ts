import dayjs from 'dayjs'

export const calculateNextDay = (date: string): number => {
  const formattedDate = dayjs(date).format('YYYYMMDD')
  const nextDay = dayjs(formattedDate).add(1, 'day')
  return Number(nextDay.format('YYYYMMDD'))
}
