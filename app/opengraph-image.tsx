import { ImageResponse } from 'next/og'
import { profile } from '@/src/content/profile'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${profile.name} — ${profile.role}`

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F4F0',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#5E705E',
          }}
        >
          {profile.role}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 60,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            color: '#1C1C1C',
          }}
        >
          {profile.headline}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 26,
            color: '#6A6A64',
          }}
        >
          <span>{profile.name}</span>
          <span>{new URL(profile.siteUrl).hostname}</span>
        </div>
      </div>
    ),
    size,
  )
}
