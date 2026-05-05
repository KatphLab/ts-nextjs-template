import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from '../page'

describe('app/page', () => {
  describe('Home', () => {
    it('should render Next.js logo image', () => {
      render(<Home />)

      const logoImage = screen.getByAltText('Next.js logo')
      expect(logoImage).toBeInTheDocument()
    })

    it('should render main heading', () => {
      render(<Home />)

      const heading = screen.getByRole('heading', {
        name: /To get started, edit the page.tsx file./i,
      })
      expect(heading).toBeInTheDocument()
    })

    it('should render description paragraph with Templates link', () => {
      render(<Home />)

      const templatesLink = screen.getByRole('link', { name: 'Templates' })
      expect(templatesLink).toBeInTheDocument()
      expect(templatesLink).toHaveAttribute(
        'href',
        expect.stringContaining('vercel.com/templates'),
      )
    })

    it('should render description paragraph with Learning link', () => {
      render(<Home />)

      const learningLink = screen.getByRole('link', { name: 'Learning' })
      expect(learningLink).toBeInTheDocument()
      expect(learningLink).toHaveAttribute(
        'href',
        expect.stringContaining('nextjs.org/learn'),
      )
    })

    it('should render Deploy Now button with Vercel logo', () => {
      render(<Home />)

      const deployLink = screen.getByRole('link', { name: /Deploy Now/i })
      expect(deployLink).toBeInTheDocument()
      expect(deployLink).toHaveAttribute(
        'href',
        expect.stringContaining('vercel.com/new'),
      )
      expect(deployLink).toHaveAttribute('target', '_blank')
      expect(deployLink).toHaveAttribute('rel', 'noopener noreferrer')

      const vercelLogo = screen.getByAltText('Vercel logomark')
      expect(vercelLogo).toBeInTheDocument()
    })

    it('should render Documentation link', () => {
      render(<Home />)

      const documentationLink = screen.getByRole('link', {
        name: 'Documentation',
      })
      expect(documentationLink).toBeInTheDocument()
      expect(documentationLink).toHaveAttribute(
        'href',
        expect.stringContaining('nextjs.org/docs'),
      )
      expect(documentationLink).toHaveAttribute('target', '_blank')
      expect(documentationLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render main container with correct structure', () => {
      render(<Home />)

      const mainElement = screen.getByRole('main')
      expect(mainElement).toBeInTheDocument()
    })
  })
})
