import "@testing-library/jest-dom"
import { render, screen, within } from '@testing-library/react'
import Home from '@/app/page'
import Work from '@/src/components/Work'
import Career from '@/src/components/Career'
import { profile } from '@/src/content/profile'
import { featured, other, type Project } from '@/src/content/work'
import { career } from '@/src/content/career'

const originalFeatured = [...featured]
const originalOther = [...other]
const originalCareer = [...career]

afterEach(() => {
  featured.splice(0, featured.length, ...originalFeatured)
  other.splice(0, other.length, ...originalOther)
  career.splice(0, career.length, ...originalCareer)
})

describe('portfolio visitor contracts', () => {
  it('renders the complete visitor journey with one main landmark and a unique page heading', () => {
    render(<Home />)
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.headline)
    expect(screen.getByRole('heading', { name: 'Selected work' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Career' })).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Get in touch' })).toBeVisible()
    for (const paragraph of profile.bio) expect(screen.getByText(paragraph)).toBeVisible()
  })

  it('connects every in-page navigation link to exactly one destination', () => {
    const { container } = render(<Home />)
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      const target = link.getAttribute('href')!
      expect(target).not.toBe('#')
      expect(container.querySelectorAll(target)).toHaveLength(1)
    }
    const navigation = screen.getByRole('navigation', { name: 'Primary' })
    expect(within(navigation).getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work')
    expect(within(navigation).getByRole('link', { name: 'Career' })).toHaveAttribute('href', '#career')
    expect(within(navigation).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
  })

  it('provides the same valid email destination from the hero and footer', () => {
    render(<Home />)
    const expected = `mailto:${profile.links.email}`
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', expected)
    expect(screen.getByRole('link', { name: profile.links.email })).toHaveAttribute('href', expected)
    expect(profile.links.email).not.toMatch(/[\r\n?&#]/)
    expect(profile.links.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
  })

  it('makes new-tab links explicitly named and isolates their opener', () => {
    const { container } = render(<Home />)
    const links = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'))
    expect(links).toHaveLength(featured.filter(project => project.href).length + 2)
    for (const link of links) {
      expect(link).toHaveAccessibleName()
      const destination = new URL(link.href)
      expect(destination.protocol).toBe('https:')
      expect(destination.username).toBe('')
      expect(destination.password).toBe('')
      expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']))
    }
  })

  it('shows every project status and all career claims in the rendered page', () => {
    render(<Home />)
    for (const project of [...featured, ...other]) {
      const card = screen.getByRole('heading', { name: project.name }).closest('article')!
      expect(within(card).getByText(project.description)).toBeVisible()
      expect(within(card).getByText(project.status)).toBeVisible()
    }
    const careerSection = screen.getByRole('heading', { name: 'Career' }).closest('section')!
    for (const role of career) {
      expect(within(careerSection).getByRole('heading', { name: role.role })).toBeVisible()
      expect(within(careerSection).getByText(role.organization, { exact: true })).toBeVisible()
      expect(within(careerSection).getByText(role.summary, { exact: true })).toBeVisible()
      for (const highlight of role.highlights) expect(within(careerSection).getByText(highlight)).toBeVisible()
    }
  })
})

describe('optional content boundaries', () => {
  // Built from the site's own recorded content with optional fields removed.
  const { detail: _detail, href: _href, hrefLabel: _hrefLabel, ...required } = originalFeatured[0]
  const fixture: Project = required
  const linked = originalFeatured.find((project) => project.href)!

  it('renders a project without optional details or a destination without an empty link', () => {
    featured.splice(0, featured.length, fixture)
    other.splice(0, other.length)
    render(<Work />)
    const card = screen.getByRole('article')
    expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    expect(within(card).getAllByRole('list')).toHaveLength(1)
    for (const item of fixture.stack) expect(within(card).getByText(item)).toBeVisible()
    expect(within(card).getByText(fixture.status)).toBeVisible()
  })

  it('uses an accessible default visit label when only an href is supplied', () => {
    featured.splice(0, featured.length, { ...fixture, href: linked.href })
    other.splice(0, other.length)
    render(<Work />)
    expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute('href', linked.href)
  })

  it('keeps an undated career entry with no highlights readable without an empty bullet list', () => {
    const entry = { ...originalCareer[0], period: '', highlights: [] }
    career.splice(0, career.length, entry)
    render(<Career />)
    expect(screen.getByRole('heading', { name: entry.role })).toBeVisible()
    expect(screen.getByText(entry.organization)).toBeVisible()
    expect(screen.getAllByRole('list')).toHaveLength(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
