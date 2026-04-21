'use client'

/**
 * Mobile Navigation Component
 *
 * Responsive mobile menu with smooth animations and focus trap
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { Typography } from '../design/Typography'

interface MobileNavProps {
  onOpenLab: () => void
}

const FOCUSABLE_ELEMENTS = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function MobileNav({ onOpenLab }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    },
  }

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      const firstFocusable = menuRef.current?.querySelector(FOCUSABLE_ELEMENTS) as HTMLElement
      firstFocusable?.focus()
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus()
    }
  }, [isOpen])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (e.key === 'Tab') {
      const focusableElements = menuRef.current?.querySelectorAll(FOCUSABLE_ELEMENTS)
      if (!focusableElements?.length) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleOpenLab = () => {
    setIsOpen(false)
    onOpenLab()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-bg-surface/90 backdrop-blur-sm border border-border-light shadow-lg md:hidden hover:scale-110 transition-transform duration-200"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? <X className="w-6 h-6 text-text-primary" /> : <Menu className="w-6 h-6 text-text-primary" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-bg-page md:hidden"
          >
            <button
              className="absolute top-6 right-24 p-2 text-text-primary"
              onClick={handleClose}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              <motion.a
                href="#main-content"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Typography variant="display-md" className="hover:text-text-accent transition-colors">
                  Studio
                </Typography>
              </motion.a>

              <motion.button
                onClick={handleOpenLab}
                className="group flex items-center gap-3 px-8 py-4 bg-text-primary text-bg-page rounded-lg hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-6 h-6" />
                <Typography variant="title-md" className="text-bg-page">
                  Open Lab
                </Typography>
              </motion.button>

              <motion.a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Typography variant="display-md" className="hover:text-text-accent transition-colors">
                  How It Works
                </Typography>
              </motion.a>

              <motion.a
                href="#projects"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Typography variant="display-md" className="hover:text-text-accent transition-colors">
                  Projects
                </Typography>
              </motion.a>

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Typography variant="title-lg" className="text-text-secondary hover:text-text-primary transition-colors">
                  Contact
                </Typography>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
