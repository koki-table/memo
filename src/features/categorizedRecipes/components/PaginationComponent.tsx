import { HStack, Text } from '@chakra-ui/react'
import { FC, memo, useEffect } from 'react'

import { Button } from '@/components/Elements'
import { usePagination } from '@/utils/pagination'

const OMIT_STRING = '…'

export type PaginationComponentProps = {
  currentPage?: number
  requestCount?: number
  totalCount?: number
  handlePage?: (index: number) => void
}

export const PaginationComponent: FC<PaginationComponentProps> = memo(
  ({ currentPage = 1, requestCount = 20, totalCount = 50, handlePage }) => {
    const {
      hasPrevPage,
      hasPrevIndicator,
      hasNextPage,
      hasNextIndicator,
      pageItems,
      initializePagination,
    } = usePagination()

    useEffect(() => {
      initializePagination({ currentPage, requestCount, totalCount })
    }, [currentPage, initializePagination, requestCount, totalCount])

    return (
      <HStack spacing="2">
        {hasPrevPage && (
          <Text
            color="var(--warning-color-main)"
            px="1"
            fontSize="sm"
            cursor="pointer"
            onClick={() => handlePage?.(currentPage - 1)}
          >
            戻る
          </Text>
        )}
        {hasPrevIndicator && <Text px="3">{OMIT_STRING}</Text>}
        {pageItems.map((item, i) => (
          <Button
            key={i}
            variant={item === currentPage ? 'circle' : 'circleTransparent'}
            onClick={() => handlePage?.(item)}
            minWidth="40px"
          >
            {item}
          </Button>
        ))}
        {hasNextIndicator && <Text px="3">{OMIT_STRING}</Text>}
        {hasNextPage && (
          <Text
            color="var(--warning-color-main)"
            px="1"
            fontSize="sm"
            cursor="pointer"
            onClick={() => handlePage?.(currentPage + 1)}
          >
            次へ
          </Text>
        )}
      </HStack>
    )
  }
)

PaginationComponent.displayName = 'PaginationComponent'
