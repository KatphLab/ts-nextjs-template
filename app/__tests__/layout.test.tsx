import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'mocked-geist-sans' }),
  Geist_Mono: () => ({ variable: 'mocked-geist-mono' }),
}))

const { default: RootLayout } = await import('../layout')

describe('app/layout', () => {
  describe('RootLayout', () => {
    it('should render children inside html element with correct lang', () => {
      render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>,
      )

      const htmlElement = document.querySelector('html')
      expect(htmlElement).toHaveAttribute('lang', 'en')
    })

    it('should apply font variables to html element', () => {
      render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>,
      )

      const htmlElement = document.querySelector('html')
      const classAttribute = htmlElement?.getAttribute('class') ?? ''
      expect(classAttribute).toContain('mocked-geist-sans')
      expect(classAttribute).toContain('mocked-geist-mono')
    })

    it('should render body with correct classes', () => {
      render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>,
      )

      const bodyElement = document.querySelector('body')
      expect(bodyElement).toHaveClass('min-h-full')
      expect(bodyElement).toHaveClass('flex')
      expect(bodyElement).toHaveClass('flex-col')
    })

    it('should render children content', () => {
      render(
        <RootLayout>
          <div data-testid="test-child">Test Content</div>
        </RootLayout>,
      )

      expect(screen.getByTestId('test-child')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })
})
