import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import { FC } from 'react'

import { Icon } from '@/components/Elements'

type Item = {
  label: string
  path: string
}
export type BreadcrumbProps = {
  items: Item[]
}
export const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <ChakraBreadcrumb
      fontSize="xs"
      separator={<Icon type="chevron-right--default" htmlWidth="6px" htmlHeight="auto" />}
      spacing="4"
    >
      {items.map((item, i) => (
        <BreadcrumbItem key={item.label}>
          {items.length === i + 1 ? (
            <Text color="var(--primary-color-main)">{item.label}</Text>
          ) : (
            <BreadcrumbLink
              href={item.path}
              isCurrentPage={items.length === i + 1}
              color="var(----text-color-secondary)"
              transition={'var(--transition-ease-in)'}
              _hover={{
                textDecoration: 'none',
              }}
            >
              {item.label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </ChakraBreadcrumb>
  )
}
