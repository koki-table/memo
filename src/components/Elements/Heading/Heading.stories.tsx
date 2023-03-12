import { Stack, StackDivider } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Heading, HeadingProps } from './Heading'

const MyHeading = () => {
  return (
    <Stack
      spacing={4}
      width="480px"
      divider={<StackDivider borderColor="var(--border-color-main)" />}
    >
      <Heading variant="h1">This is h1 heading.</Heading>
      <Heading>This is h2 heading.</Heading>
      <Heading variant="h3">This is h3 heading.</Heading>
      <Heading variant="h4">This is h4 heading.</Heading>
      <Heading variant="h5">This is h5 heading.</Heading>
      <Heading variant="h6">This is h6 heading.</Heading>
    </Stack>
  )
}

const meta: Meta = {
  title: 'Components/Elements/Heading',
  component: Heading,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<HeadingProps> = () => <MyHeading />

export const Default = Template.bind({})
Default.args = {}
