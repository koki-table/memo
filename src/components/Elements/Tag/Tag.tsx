import { Tag as ChakraTag, TagLabel, TagProps as ChakraTagProps } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

export type TagProps = ChakraTagProps & {
  children: ReactNode
}
export const Tag: FC<TagProps> = ({ children, ..._props }) => {
  return (
    <ChakraTag borderRadius="full" variant="outline" colorScheme="gray" px={3} {..._props}>
      <TagLabel color="var(--text-color-main)">{children}</TagLabel>
    </ChakraTag>
  )
}
