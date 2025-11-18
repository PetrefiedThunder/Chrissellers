import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-16 border-t border-studio-stone/20">
      <div className="max-w-5xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Contact */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider uppercase text-studio-stone/60 mb-4">
              Contact
            </h3>
            <a
              href="mailto:hello@chrissellers.com"
              className="flex items-center gap-2 studio-link text-studio-stone hover:text-studio-charcoal"
            >
              <Mail className="w-4 h-4" />
              <span>hello@chrissellers.com</span>
            </a>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-wider uppercase text-studio-stone/60 mb-4">
              Connect
            </h3>
            <div className="flex gap-6">
              <a
                href="https://github.com/chrissellers"
                target="_blank"
                rel="noopener noreferrer"
                className="studio-link text-studio-stone hover:text-studio-charcoal"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/christopher-sellers"
                target="_blank"
                rel="noopener noreferrer"
                className="studio-link text-studio-stone hover:text-studio-charcoal"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-studio-stone/10">
          <p className="text-sm text-studio-stone/60">
            © {new Date().getFullYear()} Christopher Sellers. Systems for public good.
          </p>
        </div>
      </div>
    </footer>
  )
}
