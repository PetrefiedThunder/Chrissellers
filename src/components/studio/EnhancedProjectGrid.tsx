'use client'

/**
 * Enhanced Project Grid Component
 *
 * Premium version with better animations and visual polish.
 */

import { ArrowUpRight, Sparkles, Clock, Rocket } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  action: 'lab' | 'external' | 'soon'
  url?: string
  featured?: boolean
  tech?: string[]
}

const projects: Project[] = [
  {
    id: 'neural-lab',
    title: 'Neural Night Sky Lab',
    subtitle: 'Regulatory compliance & social impact network simulator',
    category: 'Interactive Visualization',
    action: 'soon',
    featured: true,
    tech: ['React', 'Three.js', 'TypeScript', 'Neural Networks'],
  },
  {
    id: 'prepchef',
    title: 'PrepChef',
    subtitle: 'Shared kitchen compliance infrastructure',
    category: 'Food Safety Systems',
    action: 'soon',
    tech: ['Compliance', 'Infrastructure', 'Public Health'],
  },
  {
    id: 'supportcarr',
    title: 'SupportCarr',
    subtitle: 'Micromobility resilience & community logistics',
    category: 'Urban Systems',
    action: 'soon',
    tech: ['Logistics', 'Community', 'Equity'],
  },
  {
    id: 'mathforge',
    title: 'MathForge',
    subtitle: 'Collaborative mathematical proof systems',
    category: 'Knowledge Infrastructure',
    action: 'soon',
    tech: ['Mathematics', 'Collaboration', 'Verification'],
  },
]

export default function EnhancedProjectGrid() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const handleProjectClick = (project: Project) => {
    if (project.action === 'external' && project.url) {
      window.open(project.url, '_blank')
    }
  }

  return (
    <section className="studio-section bg-transparent">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="studio-subheading text-studio-ink">Selected Work</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-studio-concrete/20 to-transparent" />
          </div>
          <p className="studio-body max-w-2xl">
            Systems design that delivers measurable value.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative cursor-pointer rounded-2xl glass-panel transition-all duration-500 ${
                hoveredProject === project.id
                  ? 'shadow-xl -translate-y-1 border-studio-sage/40'
                  : 'hover:border-studio-concrete/40'
              }`}
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    {/* Category and status badges */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold tracking-wider uppercase text-studio-concrete">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-studio-sage/20 text-studio-sage text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      {project.action === 'soon' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-studio-concrete/10 text-studio-concrete text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      )}
                      {project.action === 'lab' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-studio-water/20 text-studio-water text-xs font-medium">
                          <Rocket className="w-3 h-3" />
                          Live
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-3xl font-semibold tracking-tight mb-3 transition-all duration-300 text-studio-ink">
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="studio-body mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Tech tags */}
                    {project.tech && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-studio-concrete/10 text-xs font-medium text-studio-concrete border border-studio-concrete/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  {project.action !== 'soon' && (
                    <div
                      className={`flex-shrink-0 transition-all duration-300 ${
                        hoveredProject === project.id
                          ? 'opacity-100 translate-x-0 translate-y-0'
                          : 'opacity-30 -translate-x-2 translate-y-2'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-studio-sage/10 flex items-center justify-center group-hover:bg-studio-sage/20 transition-colors duration-300">
                        <ArrowUpRight className="w-6 h-6 text-studio-sage" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom accent effect */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-studio-sage to-transparent transition-opacity duration-500 rounded-b-2xl ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
