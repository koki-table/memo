import { calculateDay } from './calculateDay'

describe('utils/calculate/calculateDay', () => {
  test('前日を返す', () => {
    expect(calculateDay({ date: '20230625', isNextDay: false })).toBe(20230624)
  })
})

describe('utils/calculate/calculateDay', () => {
  test('翌日を返す', () => {
    expect(calculateDay({ date: '20230625', isNextDay: true })).toBe(20230626)
  })
})
