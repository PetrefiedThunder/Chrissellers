import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/src/content/profile'

export default function Hero() {
  return (
    <section className="border-b border-rule/10 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="text-label uppercase tracking-widest text-text-accent">
          {profile.role}
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-display-md text-text-primary">
          {profile.headline}
        </h1>

        <div className="mt-10 max-w-2xl space-y-5">
          {profile.bio.map((paragraph) => (
            <p key={paragraph} className="text-body-lg text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.links.email}`}
            className="rounded-lg bg-text-primary px-6 py-3 text-body-md font-medium text-bg-page transition-opacity hover:opacity-90"
          >
            Get in touch
          </a>
          <a
            href="#work"
            className="rounded-lg border border-rule/20 px-6 py-3 text-body-md font-medium text-text-primary transition-colors hover:bg-bg-surface"
          >
            See the work
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2 py-3 text-body-md text-text-secondary transition-colors hover:text-text-primary"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
