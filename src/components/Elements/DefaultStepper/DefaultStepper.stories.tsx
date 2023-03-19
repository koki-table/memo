import { Meta, Story } from '@storybook/react'

import { DefaultStepper, DefaultStepperProps } from './DefaultStepper'

const meta: Meta = {
  title: 'Components/Elements/DefaultStepper',
  component: DefaultStepper,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<DefaultStepperProps> = (props) => <DefaultStepper {...props} />

export const Default = Template.bind({})
Default.args = {
  activeStep: 1,
  stepLength: 5,
}
