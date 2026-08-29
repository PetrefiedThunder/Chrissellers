import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { profile } from '@/src/content/profile'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: `${profile.name} — ${profile.role}`,
  description: profile.summary,
  openGraph: {
    type: 'website',
    url: profile.siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
    siteName: profile.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
