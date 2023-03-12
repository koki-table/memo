import { Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Icon, IconButton } from '@/components/Elements'

import { Badge, BadgeProps } from './Badge'

const meta: Meta = {
  title: 'Components/Elements/Badge',
  component: Badge,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<BadgeProps> = (props) => (
  <Badge {...props}>
    <Text>label</Text>
  </Badge>
)

export const TypeText = Template.bind({})
TypeText.args = {
  type: 'text',
}

const TemplateIcon: Story<BadgeProps> = (props) => (
  <Badge {...props}>
    <IconButton
      aria-label="お知らせ"
      icon={<Icon type="notification--default" />}
      variant="transparent"
    />
  </Badge>
)

export const TypeIcon = TemplateIcon.bind({})
TypeIcon.args = {
  type: 'icon',
}
