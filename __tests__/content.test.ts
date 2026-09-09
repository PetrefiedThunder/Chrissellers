import { profile } from '@/src/content/profile'
import { career } from '@/src/content/career'
import { featured, other, type Project } from '@/src/content/work'

/**
 * The site's premise is that every claim on it is accurate. These tests guard the
 * content files so a half-finished edit cannot reach production.
 *
 * TODO(chris): decide how far link checking should go. This only validates shape.
 * Actually fetching each URL in CI would catch real 404s — which is the failure
 * that costs the most credibility — but it makes CI network-dependent and flaky
 * when a host is briefly down. A middle path is a separate weekly scheduled
 * workflow that fetches links and opens an issue, keeping PR CI hermetic.
 */
function isPublishableLink(url: string): boolean {
  return url.startsWith('https://') && !/example\.com|localhost|TODO/i.test(url)
}

const allProjects: Project[] = [...featured, ...other]

describe('profile', () => {
  it('has the copy every preview card depends on', () => {
    expect(profile.headline.length).toBeGreaterThan(20)
    expect(profile.summary.length).toBeGreaterThan(50)
    expect(profile.bio.length).toBeGreaterThan(0)
  })

  it('only links somewhere publishable', () => {
    expect(profile.links.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    expect(isPublishableLink(profile.links.github)).toBe(true)
  })
})

describe('work', () => {
  it.each(allProjects.map((p) => [p.name, p] as const))(
    '%s is fully described',
    (_name, project) => {
      expect(project.tagline).toBeTruthy()
      expect(project.description.length).toBeGreaterThan(50)
      expect(project.stack.length).toBeGreaterThan(0)
    },
  )

  it('states a status for every project so nothing reads as shipped by default', () => {
    for (const project of allProjects) {
      expect(project.status).toBeTruthy()
    }
  })

  it('only links somewhere publishable', () => {
    for (const project of allProjects) {
      if (project.href) {
        expect(isPublishableLink(project.href)).toBe(true)
      }
    }
  })
})

describe('career', () => {
  it('describes every role', () => {
    for (const role of career) {
      expect(role.role).toBeTruthy()
      expect(role.organization).toBeTruthy()
      expect(role.summary.length).toBeGreaterThan(20)
    }
  })
})
