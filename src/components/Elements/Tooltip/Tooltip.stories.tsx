import { Box } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Tooltip } from './Tooltip'

const meta: Meta = {
  title: 'Components/Elements/Tooltip',
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story = (props) => (
  <Tooltip {...props}>
    <Box width="100%">Hover me !!!</Box>
  </Tooltip>
)

export const Gray = Template.bind({})
Gray.args = {
  hasArrow: true,
  label: 'Gray tooltip',
}

export const White = Template.bind({})
White.args = {
  hasArrow: true,
  variant: 'white',
  label: 'White tooltip',
  placement: 'bottom-start',
}
