import { Meta, Story } from '@storybook/react'

import { Textarea } from './Textarea'

const meta: Meta = {
  title: 'Components/Form/Textarea',
  component: Textarea,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story = () => <Textarea />

export const Logo = Template.bind({})
Logo.args = {
  placeHolder: 'Enter your note',
}
