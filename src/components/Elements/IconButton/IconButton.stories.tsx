import { Meta, Story } from '@storybook/react'

import { Icon } from '@/components/Elements'

import { IconButton, IconButtonProps } from './IconButton'

const meta: Meta = {
  title: 'Components/Elements/IconButton',
  component: IconButton,
}

export default meta

const Template: Story<IconButtonProps> = (props) => <IconButton {...props} />

export const Primary = Template.bind({})
Primary.args = {
  'aria-label': 'Primary IconButton',
  icon: <Icon type="circle-check--primary" />,
  onClick: () => {
    alert('onClick')
  },
}
