import { UseFormRegisterReturn } from 'react-hook-form'

export type TextareaFieldProps = {
  defaultValue?: string
  placeholder?: string
  minH?: number | string
  registration: Partial<UseFormRegisterReturn>
}
