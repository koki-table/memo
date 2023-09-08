import { InputProps as ChakraInputProps } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type ImgInputProps = ChakraInputProps & {
  registration: Partial<UseFormRegisterReturn>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileImg: string | null
}
