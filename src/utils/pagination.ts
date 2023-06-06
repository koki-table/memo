import { useCallback, useState } from 'react'

import { getTotalPage } from '@/utils/table'

type InitializePagination = {
  currentPage: number
  requestCount: number
  totalCount: number
  maxPageLength?: 3 | 5 | 7 | 9
}

export type UsePagination = {
  pageItems: number[]
  hasPrevIndicator: boolean
  hasPrevPage: boolean
  hasNextIndicator: boolean
  hasNextPage: boolean
  initializePagination: (payload: InitializePagination) => void
}
export const usePagination = (): UsePagination => {
  const [hasPrevIndicator, setHasPrevIndicator] = useState(false)
  const [hasPrevPage, setHasPrevPage] = useState(false)
  const [hasNextIndicator, setHasNextIndicator] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pageItems, setPageItems] = useState([1])

  const initializePagination = useCallback(
    ({ currentPage, requestCount, totalCount, maxPageLength = 5 }: InitializePagination) => {
      // calc page
      const totalPage = getTotalPage({ requestCount, totalCount })

      setHasPrevPage(currentPage > 1)
      setHasNextPage(currentPage < totalPage)

      // set pageItems
      if (totalPage < maxPageLength) {
        const pageIndex = [...Array(totalPage)].map((_, i) => i + 1)
        setPageItems(pageIndex)
        setHasPrevIndicator(false)
        setHasNextIndicator(false)
      } else if (currentPage <= maxPageLength) {
        // 最初の5ページの時
        const pageIndex = [...Array(maxPageLength)].map((_, i) => i + 1)
        setPageItems(pageIndex)
        setHasPrevIndicator(false)
        setHasNextIndicator(totalPage > maxPageLength)
      } else if (totalPage - currentPage <= maxPageLength) {
        // 最後の5ページの時
        const pageIndex = [...Array(maxPageLength)]
          .map((_, i) => totalPage - i)
          .sort((a, b) => a - b)
        setPageItems(pageIndex)
        setHasPrevIndicator(true)
        setHasNextIndicator(false)
      } else {
        const pageIndex = [...Array(Math.floor(maxPageLength / 2))]
          .map((_, i) => i + 1)
          .reduce(
            (acc, cur: number) => {
              acc.unshift(currentPage - cur)
              acc.push(currentPage + cur)
              return acc
            },
            [currentPage]
          )
        setPageItems(pageIndex)
        setHasPrevIndicator(true)
        setHasNextIndicator(true)
      }
    },
    []
  )

  return {
    pageItems,
    hasPrevIndicator,
    hasPrevPage,
    hasNextIndicator,
    hasNextPage,
    initializePagination,
  }
}
