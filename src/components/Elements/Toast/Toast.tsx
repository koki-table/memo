import { useToast as useChakraToast, ToastProps } from '@chakra-ui/react'

export const useToast = () => {
  const toast = useChakraToast()

  const emitToast = (props: ToastProps) => {
    const { title, status, position = 'bottom-left' } = props
    return toast({
      position,
      title,
      status,
      duration: 3000,
      isClosable: false,
    })
  }

  return { emitToast }
}

export type { ToastProps }
// TODO: デザインの調整が必要になったらrender使ってviewを作成してください
