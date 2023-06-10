// import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import {
  Modal as ChakraModal,
  ModalProps as ChakraModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
} from '@chakra-ui/react'
// import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { FC, ReactNode } from 'react'

// import { Button } from '@/components/Elements'

// const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys)

// style
// const baseStyle = definePartsStyle({
// })

// export const modalTheme = defineMultiStyleConfig({
//   baseStyle,
// })

// view
export type ModalProps = ChakraModalProps & {
  children: ReactNode[] // [body, header]
}

export const Modal: FC<ModalProps> = (props) => {
  const { children } = props
  const [header, body] = children

  return (
    <ChakraModal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <VStack>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
        </VStack>
      </ModalContent>
    </ChakraModal>
  )
}
