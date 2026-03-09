'use client'

/**
 * About / Origin Story Section
 *
 * The polymath through-line: connects disaster response, government, tech,
 * and regulatory AI into a single coherent narrative. This is the section
 * that answers "why does this combination of skills make sense?"
 */

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../effects/ScrollReveal'
import { Typography } from '../design/Typography'

const chapters = [
  {
    label: 'Origins',
    headline: 'Learning to build in the wreckage',
    body: 'I started my career deploying to disaster zones with AmeriCorps—places where the rulebook is gone and the only thing that matters is whether the system you build right now actually works for the people in front of you. I learned that resilience isn\'t a trait, it\'s an architecture decision.',
  },
  {
    label: 'Power',
    headline: 'Translating urgency into policy',
    body: 'As a Personal Aide to U.S. Senator Jeff Merkley, I operated at the intersection of constituent need and legislative action. Three years crossing 36 Oregon counties taught me how decisions made in marble hallways land on kitchen tables—and why the feedback loop between the two is almost always broken.',
  },
  {
    label: 'Scale',
    headline: 'Proving systems at velocity',
    body: 'At SeatGeek and RadarFirst, I saw what happens when systems serve millions of users under real-time pressure. I held 100% retention across enterprise accounts, translated privacy law into product value, and helped drive a $100M exit. Speed without trust is chaos; I learned to build both.',
  },
  {
    label: 'Synthesis',
    headline: 'Building the infrastructure I wished existed',
    body: 'Every role revealed the same gap: regulation is the operating system of society, and it runs on legacy code. RegEngine is my answer—graph-based regulatory infrastructure that makes compliance computable, auditable, and fair. The "Stripe for Regulation."',
  },
]

export default function AboutNarrative() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      ref={containerRef}
      className="relative py-section-md px-6 md:px-12 lg:px-24 bg-bg-page overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <Typography variant="label" className="text-text-accent mb-4 block">
            The Through-Line
          </Typography>
          <Typography variant="display-md" tag="h2" className="mb-6 max-w-4xl">
            From disaster zones to the Senate floor to building regulatory AI—every role taught me how systems break under pressure, and how to build ones that don&apos;t.
          </Typography>
        </ScrollReveal>

        {/* Progress bar */}
        <div className="relative h-px bg-border-light/30 mb-16">
          <motion.div
            className="absolute top-0 left-0 h-full bg-text-accent"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Chapters */}
        <div className="space-y-24">
          {chapters.map((chapter, index) => (
            <ScrollReveal
              key={chapter.label}
              delay={index * 0.05}
              direction={index % 2 === 0 ? 'left' : 'right'}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Label column */}
                <div className="md:col-span-3">
                  <div className="flex items-center gap-3 md:flex-col md:items-start">
                    <span className="text-5xl font-display font-bold text-text-accent/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <Typography variant="label" className="text-text-accent uppercase tracking-widest">
                      {chapter.label}
                    </Typography>
                  </div>
                </div>

                {/* Content column */}
                <div className="md:col-span-9">
                  <Typography variant="title-lg" tag="h3" className="mb-4">
                    {chapter.headline}
                  </Typography>
                  <Typography variant="body-lg" className="text-text-secondary leading-relaxed">
                    {chapter.body}
                  </Typography>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Closing statement */}
        <ScrollReveal delay={0.2} className="mt-24">
          <div className="p-8 md:p-12 rounded-2xl bg-bg-surface border border-border-light">
            <Typography variant="body-lg" className="max-w-3xl">
              I&apos;m not a developer who reads about policy, or a policy person who dabbles in code. I&apos;ve operated at the center of both—under pressure, at scale, with real consequences. That&apos;s the foundation everything I build stands on.
            </Typography>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
