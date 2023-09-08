import { useDisclosure } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { Button } from '@/components/Elements'

import { Modal, ModalProps } from './Modal'

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const MyModal = ({ ...props }) => {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>開く</Button>
      <Modal isOpen={isOpen} onClose={onClose} {...props}>
        <p>Modal Title</p>
        <div>
          <p>Modal Content</p>
          <p>Modal Content</p>
          <p>Modal Content</p>
          <p>Modal Content</p>
        </div>
      </Modal>
    </>
  )
}

const Template: Story<ModalProps> = (props) => <MyModal {...props} />

export const Default = Template.bind({})
Default.args = {}
