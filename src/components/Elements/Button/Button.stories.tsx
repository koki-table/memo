import { Meta, Story } from '@storybook/react'

import { Button, ButtonProps } from './Button'

const meta: Meta = {
  title: 'Components/Elements/Button',
  component: Button,
}

export default meta

const Template: Story<ButtonProps> = (props) => <Button {...props} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Primary Button',
}

export const Gray = Template.bind({})
Gray.args = {
  variant: 'gray',
  children: 'Gray Button',
}

export const RoundTransparent = Template.bind({})
RoundTransparent.args = {
  variant: 'round',
  children: 'Round Button',
}
