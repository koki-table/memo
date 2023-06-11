/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Link } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Badge } from '@/components/Elements/Badge'
import { Tag } from '@/components/Elements/Tag'

import { useRecipe } from '../lib'

type TagPickerProps = {
  category: string
  hasBadge?: boolean
}

export const TagPicker: FC<TagPickerProps> = memo((props) => {
  const { category, hasBadge } = props

  const { fetchSelectedRecipe, selectedCategory, fetchAllRecipe } = useRecipe()

  return (
    <>
      {hasBadge ? (
        <Badge type={'icon'}>
          <Link onClick={async () => await fetchSelectedRecipe(category)}>
            <Tag
              px={4}
              py={2}
              backgroundColor={selectedCategory === category ? 'var(--black)' : 'none'}
            >
              <Text
                fontSize={'xs'}
                color={selectedCategory === category ? 'var(--white)' : 'var(--text-color-main)'}
              >
                {category}
              </Text>
            </Tag>
          </Link>
        </Badge>
      ) : (
        <Link
          onClick={async () =>
            category === 'All' ? await fetchAllRecipe() : await fetchSelectedRecipe(category)
          }
        >
          <Tag
            px={4}
            py={2}
            backgroundColor={selectedCategory === category ? 'var(--black)' : 'none'}
          >
            <Text
              fontSize={'xs'}
              color={selectedCategory === category ? 'var(--white)' : 'var(--text-color-main)'}
            >
              {category}
            </Text>
          </Tag>
        </Link>
      )}
    </>
  )
})

TagPicker.displayName = 'TagPicker'
