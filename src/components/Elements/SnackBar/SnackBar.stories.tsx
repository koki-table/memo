import { Text } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { SnackBar, SnackBarProps } from '@/components/Elements'

const meta: Meta = {
  title: 'Components/Elements/SnackBar',
  component: SnackBar,
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['success', 'error', 'guide', 'notifiNav'],
      },
    },
    text: {
      control: {
        type: 'text',
      },
    },
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<SnackBarProps> = (props) => (
  <SnackBar {...props}>
    <Text>label</Text>
  </SnackBar>
)

export const TypeSuccess = Template.bind({})
TypeSuccess.args = {
  type: 'success',
  text: 'オファーを承諾しました。',
}

export const TypeWarning = Template.bind({})
TypeWarning.args = {
  type: 'error',
  text: '仮発注の有効期限が近づいている広告グループが3件あります。有効期限をすぎると選択された広告枠が確保されなくなります。',
}

export const TypeGuide = Template.bind({})
TypeGuide.args = {
  type: 'guide',
  text: 'ガイドラインの文章が入ります',
}

export const TypeNotifiNav = Template.bind({})
TypeNotifiNav.args = {
  type: 'notifiNav',
  text: '広告主の紐付けがない状態のため、キャンペーン作成は在庫確認までしか行なえません。発注するには広告主との紐付けを行ってください。',
}
