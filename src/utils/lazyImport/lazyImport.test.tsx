import React from 'react'

import { screen, render } from '@/test'

import { MockComponent } from './Mock'
import '@testing-library/jest-dom/extend-expect'

it('子コンポーネントがimportされる', async () => {
  render(<MockComponent />)
  const textToMatch = await screen.findByText(/child component/)
  expect(textToMatch).toBeInTheDocument()
})
