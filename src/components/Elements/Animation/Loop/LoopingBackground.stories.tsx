import { Meta, Story } from '@storybook/react'

import { LoopingBackground, LoopingBackgroundProps } from './LoopingBackground'

const meta: Meta = {
  title: 'Components/Elements/LoopingBackground',
  component: LoopingBackground,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<LoopingBackgroundProps> = (props) => <LoopingBackground {...props} />

export const Default = Template.bind({})
Default.args = {
  source: 'https://source.unsplash.com/random',
  w: '100%',
  h: '160px',
  animationDuration: '180s',
  backgroundPosition: '-6300px 0',
}
