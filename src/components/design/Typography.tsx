'use client'

import { createElement, ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 
  | 'display-lg' | 'display-md' 
  | 'title-lg' | 'title-md' 
  | 'body-lg' | 'body-md' | 'body-sm' 
  | 'label'

interface TypographyProps {
  variant: Variant
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  children: ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}

const styles: Record<Variant, string> = {
  'display-lg': 'font-display text-display-lg text-text-primary',
  'display-md': 'font-display text-display-md text-text-primary',
  'title-lg':   'font-display text-title-lg text-text-primary',
  'title-md':   'font-display text-title-md text-text-primary',
  'body-lg':    'font-sans text-body-lg text-text-secondary',
  'body-md':    'font-sans text-body-md text-text-secondary',
  'body-sm':    'font-sans text-body-sm text-text-secondary',
  'label':      'font-sans text-label uppercase tracking-widest text-text-accent',
}

export function Typography({ 
  variant, 
  tag, 
  children, 
  className,
  color 
}: TypographyProps) {
  // Default tags based on variant
  const defaultTags: Record<Variant, string> = {
    'display-lg': 'h1',
    'display-md': 'h2',
    'title-lg': 'h3',
    'title-md': 'h4',
    'body-lg': 'p',
    'body-md': 'p',
    'body-sm': 'p',
    'label': 'span'
  }

  const Component = tag || defaultTags[variant]
  
  // Allow color override via props or fallback to variant default
  const colorClass = color ? `text-text-${color}` : ''

  return createElement(
    Component,
    { className: clsx(styles[variant], colorClass, className) },
    children
  )
}
