import { FC, memo } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'

import { Recipe } from '@/types/Recipe'

import { option } from './RecipeRegisterComponent'

type SelectBoxProps = {
  field: ControllerRenderProps<Recipe, 'category'>
  options: option
  viewWidth: number
}

export const SelectBox: FC<SelectBoxProps> = memo((props) => {
  const { field, options, viewWidth } = props
  return (
    <CreatableSelect
      {...field}
      placeholder={'カテゴリ'}
      options={options}
      value={options?.find((v) => v.value === field.value)}
      onChange={(newValue) => {
        field.onChange(newValue?.value)
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: 'var(--line-color-light)',
          minWidth: viewWidth,
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--text-color-placeholder)',
        }),
        indicatorSeparator: (baseStyles) => ({
          ...baseStyles,
          display: 'none',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: 'var(--text-color)',
        }),
      }}
    />
  )
})

SelectBox.displayName = 'SelectBox'
