type GetTotalPageArgs = {
  totalCount: number
  requestCount: number
}
export const getTotalPage = ({ totalCount, requestCount }: GetTotalPageArgs) => {
  if (requestCount === 0 || totalCount === 0) return 0

  return Math.floor(totalCount / requestCount) + (totalCount % requestCount === 0 ? 0 : 1)
}
