import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import SmoothScroll from '@/src/components/effects/SmoothScroll'
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
  title: 'Christopher Sellers',
  description: 'Christopher Sellers - Bridging regulation, equity, and technology through elegant systems design.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <a 
          href="#main-content"
          className="skip-to-content"
        >
          Skip to main content
        </a>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
