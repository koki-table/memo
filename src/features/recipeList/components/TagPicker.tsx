/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Link, Box } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { Badge } from '@/components/Elements/Badge'
import { Tag } from '@/components/Elements/Tag'

import { useRecipeList } from '../lib'

type TagPickerProps = {
  title: string
  hasBadge?: boolean
  onClick?: (category: string) => void
}

export const TagPicker: FC<TagPickerProps> = memo((props) => {
  const { title, hasBadge, onClick } = props

  const { fetchSelectedRecipe, selectedCategory, fetchAllRecipe } = useRecipeList()

  return (
    <Box mb={hasBadge && title === 'All' ? 0 : 3} mr={hasBadge && title === 'All' ? 0 : 2}>
      {hasBadge && title !== 'All' ? (
        <Badge type={'icon'}>
          <Link onClick={() => onClick!(title)}>
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
          display={hasBadge && title === 'All' ? 'none' : 'block'}
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
    </Box>
  )
})

TagPicker.displayName = 'TagPicker'
