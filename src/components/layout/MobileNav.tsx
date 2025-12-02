'use client'

/**
 * Mobile Navigation Component
 *
 * Responsive mobile menu with smooth animations
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function MobileNav() {
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

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-studio-concrete/20 shadow-lg md:hidden hover:scale-110 transition-transform duration-200"
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
            className="fixed inset-0 z-40 bg-studio-paper md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
              <motion.a
                href="#studio"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold text-studio-ink hover:text-studio-sage transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Home
              </motion.a>

              <motion.a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold text-studio-ink hover:text-studio-sage transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Work
              </motion.a>

              <motion.a
                href="#impact"
                onClick={() => setIsOpen(false)}
                className="text-3xl font-display font-semibold text-studio-ink hover:text-studio-sage transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Impact
              </motion.a>

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-2xl font-sans text-studio-concrete hover:text-studio-ink transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
