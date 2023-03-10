import { render, screen } from '@/test'

import { ErrorBoundary } from './ErrorBoundary'

import '@testing-library/jest-dom'

const ThrowError = () => {
  throw new Error('ErrorBoundary Test')
}

describe('Error Boundary', () => {
  test('エラーを捕捉する', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    )
    expect(screen.getByText('エラーが発生しました')).toBeVisible()
  })
})
