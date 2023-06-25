import { calculateDay } from './calculateDay'

describe('utils/calculate/calculateDay', () => {
  test('前日を返す', () => {
    expect(calculateDay('20230625', false)).toBe(20230624)
  })
})

describe('utils/calculate/calculateDay', () => {
  test('翌日を返す', () => {
    expect(calculateDay('20230625', false)).toBe(20230624)
  })
})
