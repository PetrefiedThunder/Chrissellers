'use client'

/**
 * Mobile Navigation Component
 *
 * Responsive mobile menu with smooth animations
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

interface MobileNavProps {
  onOpenLab: () => void
}

export default function MobileNav({ onOpenLab }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

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

  const handleOpenLab = () => {
    setIsOpen(false)
    onOpenLab()
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-studio-stone/20 shadow-lg md:hidden hover:scale-110 transition-transform duration-200"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-studio-cream md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              <motion.a
                href="#studio"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold hover:text-gradient transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Studio
              </motion.a>

              <motion.button
                onClick={handleOpenLab}
                className="group flex items-center gap-3 px-8 py-4 text-2xl font-display font-semibold bg-studio-charcoal text-white rounded-lg hover:shadow-2xl hover:shadow-neural-accent/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-6 h-6" />
                Open Lab
              </motion.button>

              <motion.a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold hover:text-gradient transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                How It Works
              </motion.a>

              <motion.a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold hover:text-gradient transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Projects
              </motion.a>

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-sans text-studio-stone hover:text-studio-charcoal transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Contact
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
