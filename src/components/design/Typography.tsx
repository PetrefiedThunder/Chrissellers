'use client'

import { createElement, ReactNode, ElementType } from 'react'
import clsx from 'clsx'

type Variant = 'display-lg' | 'display-md' | 'title-lg' | 'title-md' | 'body-lg' | 'body-md' | 'body-sm' | 'label'

const config: Record<Variant, { tag: ElementType; style: string }> = {
  'display-lg': { tag: 'h1', style: 'font-display text-display-lg text-text-primary' },
  'display-md': { tag: 'h2', style: 'font-display text-display-md text-text-primary' },
  'title-lg':   { tag: 'h3', style: 'font-display text-title-lg text-text-primary' },
  'title-md':   { tag: 'h4', style: 'font-display text-title-md text-text-primary' },
  'body-lg':    { tag: 'p',  style: 'font-sans text-body-lg text-text-secondary' },
  'body-md':    { tag: 'p',  style: 'font-sans text-body-md text-text-secondary' },
  'body-sm':    { tag: 'p',  style: 'font-sans text-body-sm text-text-secondary' },
  'label':      { tag: 'span', style: 'font-sans text-label uppercase tracking-widest text-text-accent' },
}

export function Typography({ 
  variant, 
  tag, 
  children, 
  className, 
  color 
}: {
  variant: Variant
  tag?: ElementType
  children: ReactNode
  className?: string
  color?: 'primary' | 'secondary' | 'accent'
}) {
  const { tag: defaultTag, style } = config[variant]
  
  return createElement(
    tag || defaultTag,
    { className: clsx(style, color && `text-text-${color}`, className) },
    children
  )
}
