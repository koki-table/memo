import { Textarea as ChakraTextArea } from '@chakra-ui/react'
import ResizeTextarea from 'react-textarea-autosize'

import { TextareaFieldProps } from './types'

export const Textarea = (props: TextareaFieldProps) => {
  const { defaultValue, placeholder, minH } = props
  return (
    <ChakraTextArea
      defaultValue={defaultValue}
      _placeholder={{ color: 'var(--text-color-placeholder)' }}
      placeholder={placeholder}
      bg="var(--white)"
      minH={minH}
      as={ResizeTextarea}
      borderRadius={'md'}
      border={'1px solid var(--line-color-light)'}
    />
  )
}
