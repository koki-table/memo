import { Text, Box } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Tab, TabProps } from './Tab'

const meta: Meta = {
  title: 'Components/Elements/Tab',
  component: Tab,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<TabProps> = (props) => (
  <Box maxW="600px">
    <Tab {...props}>
      <Text>01のコンテンツ</Text>
      <Text>02のコンテンツ</Text>
    </Tab>
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  titles: ['01を表示させる', '02を表示させる'],
}

export const HeaderRight = Template.bind({})
HeaderRight.args = {
  titles: ['01を表示させる', '02を表示させる'],
  header: <Text>header</Text>,
}

export const HeaderLeft = Template.bind({})
HeaderLeft.args = {
  titles: ['01を表示させる', '02を表示させる'],
  header: <Text>header</Text>,
  titleAlign: 'right',
}
