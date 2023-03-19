import '@testing-library/jest-dom'
import { screen, render } from '@/test'

import { Button } from './'

test('「Hello Test」が描画されている', () => {
  render(<Button variant="primary">Hello Test</Button>)
  expect(screen.getByText('Hello Test')).toBeInTheDocument()
})
