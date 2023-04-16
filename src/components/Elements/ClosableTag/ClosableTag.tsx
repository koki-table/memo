import { Tag, TagLabel } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

import { Icon } from '@/components/Elements'

export type ClosableTagProps = {
  children: ReactNode
  onClose: () => void
}
export const ClosableTag: FC<ClosableTagProps> = ({ children, onClose }) => {
  return (
    <Tag borderRadius="full" variant="outline" colorScheme="gray" px={3}>
      <TagLabel color="var(--text-color-main)">{children}</TagLabel>
      <Icon
        type="circle-close--default"
        cursor="pointer"
        ml={1}
        transition={'var(--transition-ease-in)'}
        _hover={{ opacity: 0.8 }}
        onClick={onClose}
      />
    </Tag>
  )
}
