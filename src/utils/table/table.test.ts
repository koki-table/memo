import { getTotalPage } from './table'

describe('utils/table', () => {
  test('総件数(totalCount)と1ページの表示件数(requestCount)から、総ページ数を取得する', () => {
    expect(getTotalPage({ totalCount: 0, requestCount: 0 })).toBe(0)
    expect(getTotalPage({ totalCount: 0, requestCount: 20 })).toBe(0)
    expect(getTotalPage({ totalCount: 1, requestCount: 20 })).toBe(1)
    expect(getTotalPage({ totalCount: 20, requestCount: 20 })).toBe(1)
    expect(getTotalPage({ totalCount: 21, requestCount: 20 })).toBe(2)
    expect(getTotalPage({ totalCount: 21, requestCount: 10 })).toBe(3)
    expect(getTotalPage({ totalCount: 20, requestCount: 3 })).toBe(7)
  })
})
