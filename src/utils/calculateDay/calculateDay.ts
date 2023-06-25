import dayjs from 'dayjs'

/**
 * 前日または翌日の日付を計算する
 * @param date 日付(20230625)
 * @param isNextDay 翌日か前日を判定するフラグ
 * @returns 計算された前日または翌日の日付(20230626 or 20230624)
 */

type dateInfo = {
  date: string
  isNextDay: boolean
}
export const calculateDay = (dateInfo: dateInfo): number => {
  const formattedDate = dayjs(dateInfo.date).format('YYYYMMDD')

  if (dateInfo.isNextDay) {
    const addDay = dayjs(formattedDate).add(1, 'day')
    return Number(addDay.format('YYYYMMDD'))
  } else {
    const subtractDay = dayjs(formattedDate).subtract(1, 'day')
    return Number(subtractDay.format('YYYYMMDD'))
  }
}
