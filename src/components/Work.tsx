import { ArrowUpRight } from 'lucide-react'
import { featured, other, type Project } from '@/src/content/work'

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((item) => (
        <li
          key={item}
          className="rounded-full border border-rule/15 px-3 py-1 text-body-sm text-text-secondary"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-rule/10 bg-bg-surface p-8 md:p-10">
      <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:items-baseline md:gap-x-6">
        <h3 className="font-display text-title-lg text-text-primary md:col-start-1">
          {project.name}
        </h3>
        <p className="mt-2 text-body-lg text-text-accent md:col-start-1 md:mt-1">
          {project.tagline}
        </p>
        <p className="mt-3 text-body-sm text-text-secondary md:col-start-2 md:row-start-1 md:mt-0 md:text-right">
          {project.status}
        </p>
      </div>

      <p className="mt-5 max-w-2xl text-body-md text-text-secondary">
        {project.description}
      </p>

      {project.detail && (
        <ul className="mt-6 max-w-2xl space-y-2.5 border-t border-rule/10 pt-6">
          {project.detail.map((item) => (
            <li key={item} className="flex gap-3 text-body-sm text-text-secondary">
              <span aria-hidden="true" className="text-text-accent">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <StackList stack={project.stack} />

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-text-primary underline decoration-text-accent underline-offset-4 transition-colors hover:text-text-accent"
          >
            {project.hrefLabel ?? 'Visit'}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section id="work" className="border-b border-rule/10 bg-bg-sunken px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-title-lg text-text-primary">Selected work</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
          Systems where being wrong has a cost — regulatory evidence, autonomous
          agent authority, and dispatch. Status is stated plainly; nothing here
          claims traction it does not have.
        </p>

        <div className="mt-14 space-y-6">
          {featured.map((project) => (
            <FeaturedProject key={project.name} project={project} />
          ))}
        </div>

        <h3 className="mt-20 font-display text-title-md text-text-primary">Also built</h3>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {other.map((project) => (
            <article key={project.name}>
              <h4 className="font-display text-body-lg font-semibold text-text-primary">
                {project.name}
              </h4>
              <p className="mt-1 text-body-sm text-text-accent">{project.tagline}</p>
              <p className="mt-3 text-body-sm text-text-secondary">
                {project.description}
              </p>
              <p className="mt-3 text-body-sm text-text-secondary">{project.status}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
