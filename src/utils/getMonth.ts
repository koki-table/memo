import dayjs from 'dayjs'

export const getMonth = (monthIndex: number) => {
  const year = dayjs().year()
  // 月初が何曜日から始まるか取得
  const firstDay = dayjs(new Date(year, Number(monthIndex), 1)).day()
  const lastDay = dayjs().endOf('month').format('DD')
  const totalDay = Number(lastDay) + Number(firstDay)

  let currentMonthCount = 0 - firstDay

  // 合計日数で5週か6週の条件分岐
  const num = totalDay <= 35 ? 5 : 6

  const dayInit = new Array(num).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++
      return dayjs(new Date(year, Number(monthIndex), currentMonthCount))
    })
  })
  return dayInit
}
