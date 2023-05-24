import dayjs from 'dayjs'

export const calculateBeforeDay = (date: string): number => {
  const formattedDate = dayjs(date).format('YYYYMMDD')
  const nextDay = dayjs(formattedDate).subtract(1, 'day')
  return Number(nextDay.format('YYYYMMDD'))
}
