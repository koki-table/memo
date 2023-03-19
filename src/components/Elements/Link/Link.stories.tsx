import { Meta, Story } from '@storybook/react'

import { Link, LinkProps } from './Link'

const meta: Meta = {
  title: 'Components/Elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<LinkProps> = (props) => <Link {...props}>Link to somewhere!</Link>

export const Default = Template.bind({})
Default.args = {
  to: 'https://www.google.com/',
  target: '_blank',
}
