'use client'

/**
 * Enhanced Project Grid Component
 *
 * Premium version with better animations and visual polish.
 */

import { ArrowUpRight, Sparkles, Clock, Rocket } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

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

// Base curated projects (kept minimal). GitHub repos are fetched dynamically below.
const baseProjects: Project[] = [
  {
    id: 'neural-lab',
    title: 'Neural Night Sky Lab',
    subtitle: 'Regulatory compliance & social impact network simulator',
    category: 'Interactive Visualization',
    action: 'lab',
    featured: true,
    tech: ['React', 'Three.js', 'TypeScript', 'Neural Networks'],
  },
]

interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  fork: boolean
  html_url: string
  language: string | null
  topics?: string[]
}

function mapRepoToProject(repo: GitHubRepo): Project {
  const name = repo.name
  const title = name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
  const categoryMap: Record<string, string> = {
    Prep: 'Food Safety Systems',
    SupportCarr: 'Urban Systems',
    RegEngine: 'Compliance Systems',
    PopFact: 'Data Analysis',
    'GrannScraperV1-BIG': 'Data Engineering',
    Chrissellers: 'Personal Site',
  }
  const category = categoryMap[name] ?? 'GitHub Repo'
  const tech = [repo.language ?? 'Code']
  return {
    id: name.toLowerCase(),
    title,
    subtitle: repo.description ?? 'Open-source repository',
    category,
    action: 'external',
    url: repo.html_url,
    tech,
  }
}

interface EnhancedProjectGridProps {
  onOpenLab: () => void
}

export default function EnhancedProjectGrid({ onOpenLab }: EnhancedProjectGridProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [repos, setRepos] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let cancelled = false
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/PetrefiedThunder/repos?per_page=100&type=owner&sort=updated', {
          headers: { Accept: 'application/vnd.github+json' },
        })
        const data: GitHubRepo[] = await res.json()
        if (cancelled) return
        const projects = data
          .filter((r) => !r.fork)
          .map(mapRepoToProject)
          // de-duplicate any that might overlap with curated IDs
          .filter((p) => !baseProjects.some((bp) => bp.id === p.id))
        setRepos(projects)
      } catch (e) {
        // Fail silently; show just curated projects
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchRepos()
    return () => {
      cancelled = true
    }
  }, [])

  const projects: Project[] = useMemo(() => {
    return [...baseProjects, ...repos]
  }, [repos])

  const handleProjectClick = (project: Project) => {
    if (project.action === 'lab') {
      onOpenLab()
    } else if (project.action === 'external' && project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section className="studio-section bg-gradient-to-b from-white/50 to-white/30">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="studio-subheading">Creative & Technical Work</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-studio-stone/20 to-transparent" />
          </div>
          <p className="studio-body max-w-2xl">
            Open-source projects exploring systems design, regulatory technology, and equitable infrastructure. 
            Each repository represents an experiment in making complex systems more accessible and human-centered.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`group relative cursor-pointer rounded-2xl border transition-all duration-500 ${
                hoveredProject === project.id
                  ? 'border-neural-accent/40 shadow-xl shadow-neural-accent/10 -translate-y-1'
                  : 'border-studio-stone/10 hover:border-studio-stone/30'
              } ${
                project.featured
                  ? 'bg-gradient-to-br from-neural-dark/5 via-white to-white'
                  : 'bg-white/80 backdrop-blur-sm'
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
                      <span className="text-xs font-semibold tracking-wider uppercase text-studio-stone/60">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neural-accent/10 text-neural-accent text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                      {project.action === 'soon' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-studio-stone/10 text-studio-stone/60 text-xs font-medium">
                          <Clock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      )}
                      {project.action === 'lab' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                          <Rocket className="w-3 h-3" />
                          Live
                        </span>
                      )}
                    </div>

                    {/* Title with gradient effect on hover */}
                    <h3
                      className={`font-display text-3xl font-semibold tracking-tight mb-3 transition-all duration-300 ${
                        hoveredProject === project.id && project.action !== 'soon'
                          ? 'text-gradient'
                          : 'text-studio-charcoal'
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="studio-body text-studio-stone/80 mb-4 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Tech tags */}
                    {project.tech && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-studio-stone/5 text-xs font-medium text-studio-stone/70 border border-studio-stone/10"
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
                      <div className="w-12 h-12 rounded-full bg-neural-accent/10 flex items-center justify-center group-hover:bg-neural-accent/20 transition-colors duration-300">
                        <ArrowUpRight className="w-6 h-6 text-neural-accent" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom shine effect */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neural-accent via-neural-highlight to-neural-accent transition-opacity duration-500 rounded-b-2xl ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </article>
          ))}

          {/* Loading state (only shown until repos load) */}
          {loading && (
            <div className="text-sm text-studio-stone/60">Loading GitHub repositories…</div>
          )}
        </div>
      </div>
    </section>
  )
}
