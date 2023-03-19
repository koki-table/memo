import { Box, Flex } from '@chakra-ui/react'
import { ReactElement, useState, memo, FC } from 'react'

export type TabProps = {
  titles: [string, string]
  children: [ReactElement, ReactElement]
  titleAlign?: 'left' | 'center' | 'right'
  header?: ReactElement
}

// eslint-disable-next-line react/display-name
export const Tab: FC<TabProps> = memo(({ children, titles, titleAlign = 'left', header }) => {
  const [selectedTab, setSelectedTab] = useState<0 | 1>(0)

  const handleTitleAlign = {
    left: 'auto 0 0 0',
    center: '0 auto',
    right: '0 0 0 auto',
  }[titleAlign]

  type TabTitleProps = {
    title: string
    index: 0 | 1
    setSelectedTab: (index: 0 | 1) => void
  }

  const TabTitle: React.FC<TabTitleProps> = ({ title, setSelectedTab, index }) => {
    return (
      <Box
        as="button"
        fontSize="sm"
        p="8px 16px"
        whiteSpace="nowrap"
        borderRadius={index === 0 ? '22px 0 0 22px' : '0 22px 22px 0'}
        bg={index === selectedTab ? 'var(--primary-color-main)' : 'var(--white)'}
        color={index === selectedTab ? 'var(--white)' : 'var(--primary-color-main)'}
        onClick={() => setSelectedTab(index)}
      >
        {title}
      </Box>
    )
  }

  return (
    <Box>
      <Flex justifyContent="space-between" m={handleTitleAlign} alignItems="center">
        {header && titleAlign === 'right' && header}
        <Box>
          {titles.map((title, index) => (
            <TabTitle
              key={index}
              title={title}
              index={index as 0 | 1}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </Box>
        {header && titleAlign === 'left' && header}
      </Flex>
      {children[selectedTab]}
    </Box>
  )
})
