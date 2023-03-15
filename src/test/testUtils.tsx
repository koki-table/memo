import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const CustomProvider = ({ children }: { children: JSX.Element }) => {
  return { children }
}

const customRender = (ui: JSX.Element, options?: any) =>
  render(ui, { wrapper: CustomProvider, ...options })

export * from '@testing-library/react'
export { customRender, userEvent }
