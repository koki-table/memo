import { UseFormRegisterReturn } from 'react-hook-form'

export type ImgInputProps = {
  registration: Partial<UseFormRegisterReturn>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileImg: string | null
}
