import { profile } from '@/src/content/profile'

const sections = [
  { href: '#work', label: 'Work' },
  { href: '#career', label: 'Career' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule/10 bg-bg-page/85 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-4 md:px-10"
      >
        <a href="#main" className="font-display text-base font-semibold tracking-tight">
          {profile.name}
        </a>
        <ul className="flex items-center gap-5 text-body-sm">
          {sections.map((section) => (
            <li key={section.href}>
              <a
                href={section.href}
                className="text-text-secondary transition-colors hover:text-text-primary"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
