/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Link } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Badge } from '@/components/Elements/Badge'
import { Tag } from '@/components/Elements/Tag'

import { useRecipe } from '../lib'

type TagPickerProps = {
  title: string
  hasBadge?: boolean
  onClick?: () => void
}

export const TagPicker: FC<TagPickerProps> = memo((props) => {
  const { title, hasBadge, onClick } = props

  const { fetchSelectedRecipe, selectedCategory, fetchAllRecipe } = useRecipe()

  return (
    <>
      {hasBadge ? (
        <Badge type={'icon'}>
          <Link onClick={onClick}>
            <Tag
              px={4}
              py={2}
              backgroundColor={selectedCategory === title ? 'var(--black)' : 'none'}
            >
              <Text
                fontSize={'xs'}
                color={selectedCategory === title ? 'var(--white)' : 'var(--text-color-main)'}
              >
                {title}
              </Text>
            </Tag>
          </Link>
        </Badge>
      ) : (
        <Link
          onClick={async () =>
            title === 'All' ? await fetchAllRecipe() : await fetchSelectedRecipe(title)
          }
        >
          <Tag px={4} py={2} backgroundColor={selectedCategory === title ? 'var(--black)' : 'none'}>
            <Text
              fontSize={'xs'}
              color={selectedCategory === title ? 'var(--white)' : 'var(--text-color-main)'}
            >
              {title}
            </Text>
          </Tag>
        </Link>
      )}
    </>
  )
})

TagPicker.displayName = 'TagPicker'
