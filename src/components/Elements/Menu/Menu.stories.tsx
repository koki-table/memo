import { HStack } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Icon } from '@/components/Elements'

import { ButtonMenu, ButtonMenuItems, IconMenu, IconMenuProps } from './'

const items: ButtonMenuItems[] | IconMenuProps[] = [
  {
    label: 'MenuItem1',
    onClick: () => {
      alert('click MenuItem1')
    },
  },
  {
    label: 'MenuItem2',
    onClick: () => {
      alert('click MenuItem2')
    },
  },
  {
    label: 'MenuItem3',
    onClick: () => {
      alert('click MenuItem3')
    },
  },
]

const MyMenu = () => {
  return (
    <HStack>
      <ButtonMenu label="ButtonMenu" items={items} />
      <IconMenu icon={<Icon type="circle-check--primary" />} items={items} />
    </HStack>
  )
}

const meta: Meta = {
  title: 'Components/Elements/Menu',
  component: MyMenu,
}

export default meta

const Template: Story = () => <MyMenu />

export const Default = Template.bind({})
Default.args = {}
