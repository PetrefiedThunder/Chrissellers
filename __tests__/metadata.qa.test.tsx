/** @jest-environment-options {"customExportConditions": ["node", "node-addons"]} */
import { renderToStaticMarkup } from 'react-dom/server'
import type { ReactElement } from 'react'
import RootLayout, { metadata } from '@/app/layout'
import OpengraphImage, { alt, contentType, size } from '@/app/opengraph-image'
import { ImageResponse } from 'next/og'
import { profile } from '@/src/content/profile'
import { featured, other } from '@/src/content/work'

jest.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--test-inter' }),
  Space_Grotesk: () => ({ variable: '--test-space-grotesk' }),
}))

// Unit-test the app's renderer inputs. BE-local-contracts separately validates
// a real PNG from the production localhost server; this mock is not image proof.
jest.mock('next/og', () => ({
  ImageResponse: jest.fn().mockImplementation(() => ({})),
}))

describe('public metadata contracts', () => {
  it('keeps search, Open Graph and Twitter identity consistent', () => {
    const title = `${profile.name} — ${profile.role}`
    expect(metadata).toMatchObject({
      title,
      description: profile.summary,
      openGraph: {
        type: 'website',
        url: profile.siteUrl,
        title,
        description: profile.summary,
        siteName: profile.name,
      },
      twitter: { card: 'summary_large_image', title, description: profile.summary },
    })
    expect(metadata.metadataBase?.toString()).toBe(new URL(profile.siteUrl).href)
  })

  it.each([
    ['metadata base', profile.siteUrl],
    ['GitHub', profile.links.github],
    ...[...featured, ...other]
      .filter((project) => project.href)
      .map((project) => [project.name, project.href!]),
  ])('%s uses a valid public HTTPS URL without embedded credentials', (_name, href) => {
    const url = new URL(href)
    expect(url.protocol).toBe('https:')
    expect(url.hostname).toContain('.')
    expect(url.hostname).not.toMatch(/^(localhost|127\.|0\.|\[::1\])/)
    expect(url.username).toBe('')
    expect(url.password).toBe('')
    expect(href).toBe(href.trim())
  })

  it('renders the declared language, skip target and supplied server content', () => {
    const html = renderToStaticMarkup(
      <RootLayout><main id="main">Server-rendered content</main></RootLayout>,
    )
    const document = new DOMParser().parseFromString(html, 'text/html')
    expect(document.documentElement.lang).toBe('en')
    expect(document.querySelector('a')?.getAttribute('href')).toBe('#main')
    expect(document.querySelector('#main')?.textContent).toBe('Server-rendered content')
  })

  it('declares a large landscape PNG with a meaningful accessible description', () => {
    expect(size).toEqual({ width: 1200, height: 630 })
    expect(contentType).toBe('image/png')
    expect(alt).toBe(`${profile.name} — ${profile.role}`)
  })

  it('passes current profile content and the declared size to ImageResponse', () => {
    const imageResponse = ImageResponse as unknown as jest.Mock
    imageResponse.mockClear()
    OpengraphImage()
    expect(imageResponse).toHaveBeenCalledTimes(1)
    const [element, options] = imageResponse.mock.calls[0] as [ReactElement, typeof size]
    const html = renderToStaticMarkup(element)
    const text = new DOMParser().parseFromString(html, 'text/html').body.textContent
    expect(options).toEqual(size)
    expect(text).toContain(profile.name)
    expect(text).toContain(profile.role)
    expect(text).toContain(profile.headline)
    expect(text).toContain(new URL(profile.siteUrl).hostname)
  })
})
