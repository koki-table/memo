import { Meta, Story } from '@storybook/react'

import { Tag, TagProps } from './Tag'

const meta: Meta = {
  title: 'Components/Elements/Tag',
  component: Tag,
}

export default meta

const Template: Story<TagProps> = (props) => <Tag {...props} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Tag',
}
