import { Github, Linkedin, Mail } from 'lucide-react'
import { Typography } from '../design/Typography'

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-16 border-t border-border-light">
      <div className="max-w-5xl w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Contact */}
          <div className="space-y-2">
            <Typography variant="label" className="text-text-secondary/60 mb-4 block">
              Contact
            </Typography>
            <a
              href="mailto:hello@chrissellers.com"
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <Mail className="w-4 h-4" />
              <Typography variant="body-sm">hello@chrissellers.com</Typography>
            </a>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <Typography variant="label" className="text-text-secondary/60 mb-4 block">
              Connect
            </Typography>
            <div className="flex gap-6">
              <a
                href="https://github.com/chrissellers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/christopher-sellers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border-light/50">
          <Typography variant="body-sm" className="text-text-secondary/60">
            © {new Date().getFullYear()} Christopher Sellers. Systems for public good.
          </Typography>
        </div>
      </div>
    </footer>
  )
}
