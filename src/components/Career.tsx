import { career } from '@/src/content/career'

export default function Career() {
  return (
    <section id="career" className="border-b border-rule/10 px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-title-lg text-text-primary">Career</h2>
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
          Public service, enterprise software, and the U.S. Senate — then building
          the thing myself.
        </p>

        <ol className="mt-14 space-y-12">
          {career.map((role) => (
            <li key={`${role.organization}-${role.role}`}>
              <div className="grid gap-x-10 gap-y-3 md:grid-cols-[9rem_1fr]">
                <p className="pt-1 text-body-sm tabular-nums text-text-secondary">
                  {role.period}
                </p>

                <div>
                  <h3 className="font-display text-title-md text-text-primary">
                    {role.role}
                  </h3>
                  <p className="mt-1 text-body-md text-text-accent">
                    {role.organization}
                  </p>
                  <p className="mt-3 max-w-xl text-body-md text-text-secondary">
                    {role.summary}
                  </p>

                  {role.highlights.length > 0 && (
                    <ul className="mt-4 max-w-xl space-y-2">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-body-sm text-text-secondary"
                        >
                          <span aria-hidden="true" className="text-text-accent">
                            —
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
