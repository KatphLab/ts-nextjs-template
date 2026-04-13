import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Home from '../page'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) =>
    createElement('img', { alt, src }),
}))

describe('Home page', () => {
  it('renders key onboarding copy and links', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', {
        name: 'To get started, edit the page.tsx file.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Deploy Now/ })).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com/new?'),
    )
    expect(
      screen.getByRole('link', {
        name: 'Documentation',
      }),
    ).toHaveAttribute('href', expect.stringContaining('nextjs.org/docs?'))
    expect(
      screen.getByRole('img', { name: 'Vercel logomark' }),
    ).toHaveAttribute('src', '/vercel.svg')
  })
})
