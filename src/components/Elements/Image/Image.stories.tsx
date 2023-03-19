import { Meta, Story } from '@storybook/react'

import logo from '@/assets/logo.svg'

import { Image, ImageProps } from './'

const meta: Meta = {
  title: 'Components/Elements/Image',
  component: Image,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<ImageProps> = (props) => <Image {...props} />

export const Logo = Template.bind({})
Logo.args = {
  src: logo,
}
