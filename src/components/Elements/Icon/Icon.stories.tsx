import { HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import logo from '@/assets/logo.svg'
import { iconType } from '@/components/Elements/Icon/types'

import { Icon, IconProps } from '.'

const MyIcons = () => {
  return (
    <SimpleGrid columns={4} spacing={10} p={4}>
      {iconType.map((type, i) => (
        <HStack key={i}>
          <Icon type={type} />
          <Text>{type}</Text>
        </HStack>
      ))}
    </SimpleGrid>
  )
}

const meta: Meta = {
  title: 'Components/Elements/Icon',
  component: Icon,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<IconProps> = () => <MyIcons />

export const Logo = Template.bind({})
Logo.args = {
  src: logo,
}
