import { Meta, Story } from '@storybook/react'

import { Breadcrumb, BreadcrumbProps } from './Breadcrumb'

const meta: Meta = {
  title: 'Components/Elements/Breadcrumb',
  component: Breadcrumb,
}

export default meta

const Template: Story<BreadcrumbProps> = (props) => <Breadcrumb {...props} />

export const Default = Template.bind({})
Default.args = {
  items: [
    {
      label: 'root',
      path: '/',
    },
    {
      label: 'parent',
      path: '/parent',
    },
    {
      label: 'current',
      path: '/current',
    },
  ],
}
