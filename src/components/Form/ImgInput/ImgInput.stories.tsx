import { Meta, Story } from '@storybook/react'

import { ImgInput } from './ImgInput'

const meta: Meta = {
  title: 'Components/Form/ImgInput',
  component: ImgInput,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story = () => <ImgInput />

export const Logo = Template.bind({})
Logo.args = {}
