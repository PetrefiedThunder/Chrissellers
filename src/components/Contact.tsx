import { Github, Mail } from 'lucide-react'
import { profile } from '@/src/content/profile'

export default function Contact() {
  return (
    <footer id="contact" className="px-6 py-24 md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-title-lg text-text-primary">Get in touch</h2>
        <p className="mt-4 max-w-xl text-body-lg text-text-secondary">
          Open to conversations about regulatory infrastructure, compliance tooling,
          and building in constrained environments.
        </p>

        <a
          href={`mailto:${profile.links.email}`}
          className="mt-8 inline-flex items-center gap-3 font-display text-title-md text-text-primary underline decoration-text-accent decoration-2 underline-offset-8 transition-colors hover:text-text-accent"
        >
          <Mail className="h-6 w-6 shrink-0" aria-hidden="true" />
          {profile.links.email}
        </a>

        <div className="mt-16 flex items-center justify-between border-t border-rule/10 pt-8">
          <p className="text-body-sm text-text-secondary">
            © {new Date().getFullYear()} {profile.name}
          </p>

          <div className="flex gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary transition-colors hover:text-text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
