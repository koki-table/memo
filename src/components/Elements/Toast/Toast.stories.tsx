import { Meta, Story } from '@storybook/react'

import { Button } from '@/components/Elements/Button'

import { useToast } from './'

const MyToast = () => {
  const { emitToast } = useToast()
  return (
    <Button
      onClick={() =>
        emitToast({
          title: 'MyToast',
          description: 'sample of emitting Toast',
        })
      }
    >
      Show Toast
    </Button>
  )
}

const meta: Meta = {
  title: 'Components/Elements/Toast',
  component: MyToast,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story = () => <MyToast />

export const Default = Template.bind({})
Default.args = {}
