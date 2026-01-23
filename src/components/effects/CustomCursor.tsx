'use client'

/**
 * Custom Cursor Component
 *
 * Premium cursor effect for desktop users.
 */

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    // Only show on desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsHidden(false)

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      )
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      {/* Main cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 1,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      />

      {/* Cursor trail */}
      <div
        className="custom-cursor-trail"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isHidden ? 0 : 0.3,
          transform: `translate(-50%, -50%) scale(${isPointer ? 2 : 1.5})`,
        }}
      />

      <style>{`
        .custom-cursor,
        .custom-cursor-trail {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.15s ease-out, opacity 0.15s;
        }

        .custom-cursor {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        }

        .custom-cursor-trail {
          width: 32px;
          height: 32px;
          border: 1px solid white;
          border-radius: 50%;
          transition: transform 0.3s ease-out, opacity 0.15s;
        }

        @media (max-width: 768px) {
          .custom-cursor,
          .custom-cursor-trail {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .custom-cursor,
          .custom-cursor-trail {
            transition: none !important;
          }
        }

        /* Hide default cursor only on desktop - scoped to body for better performance */
        @media (min-width: 769px) {
          body {
            cursor: none;
          }
          a, button, [role="button"], input, select, textarea {
            cursor: none;
          }
        }
      `}</style>
    </>
  )
}
