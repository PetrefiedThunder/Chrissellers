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
  const fixture: Project = {
    name: 'QA fixture project',
    tagline: 'Boundary content',
    description: 'A local fixture used only to test optional portfolio fields.',
    status: 'Prototype',
    stack: ['TypeScript'],
  }

  it('renders a project without optional details or a destination without an empty link', () => {
    featured.splice(0, featured.length, fixture)
    other.splice(0, other.length)
    render(<Work />)
    const card = screen.getByRole('article')
    expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    expect(within(card).getAllByRole('list')).toHaveLength(1)
    expect(within(card).getByText('TypeScript')).toBeVisible()
    expect(within(card).getByText('Prototype')).toBeVisible()
  })

  it('uses an accessible default visit label when only an href is supplied', () => {
    featured.splice(0, featured.length, { ...fixture, href: 'https://portfolio.example.org/project' })
    other.splice(0, other.length)
    render(<Work />)
    expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute('href', 'https://portfolio.example.org/project')
  })

  it('renders content as text, including HTML-looking strings and punctuation', () => {
    const text = '<script>window.qaUnexpected = true</script> & "quoted"'
    featured.splice(0, featured.length, { ...fixture, description: text, detail: [text] })
    other.splice(0, other.length)
    const { container } = render(<Work />)
    expect(screen.getAllByText(text)).toHaveLength(2)
    expect(container.querySelector('script')).not.toBeInTheDocument()
  })

  it('keeps an undated career entry with no highlights readable without an empty bullet list', () => {
    career.splice(0, career.length, {
      role: 'QA learning fixture',
      organization: 'Local example',
      period: '',
      summary: 'An undated education entry with intentionally absent highlights.',
      highlights: [],
    })
    render(<Career />)
    expect(screen.getByRole('heading', { name: 'QA learning fixture' })).toBeVisible()
    expect(screen.getByText('Local example')).toBeVisible()
    expect(screen.getAllByRole('list')).toHaveLength(1)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})
