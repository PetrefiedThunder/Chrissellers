import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Christopher Sellers — Trusted Systems in Chaos',
  description: 'From disaster zones to the U.S. Senate to regulatory AI — building infrastructure that holds steady when the stakes are highest. Founder of RegEngine.',
  openGraph: {
    title: 'Christopher Sellers — Trusted Systems in Chaos',
    description: 'From disaster zones to the U.S. Senate to regulatory AI — building infrastructure that holds steady when the stakes are highest.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Christopher Sellers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Christopher Sellers — Trusted Systems in Chaos',
    description: 'From disaster zones to the U.S. Senate to regulatory AI — building infrastructure that holds steady when the stakes are highest.',
  },
  keywords: ['regulatory technology', 'systems design', 'RegEngine', 'policy technology', 'neural networks', 'compliance', 'Christopher Sellers'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
