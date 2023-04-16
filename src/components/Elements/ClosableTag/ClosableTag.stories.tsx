import { Meta, Story } from '@storybook/react'

import { ClosableTag, ClosableTagProps } from './ClosableTag'

const meta: Meta = {
  title: 'Components/Elements/ClosableTag',
  component: ClosableTag,
}

export default meta

const Template: Story<ClosableTagProps> = (props) => <ClosableTag {...props} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Closable Tag',
  onClose: () => {
    alert('onClose')
  },
}
