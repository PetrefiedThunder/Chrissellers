import { ArrowUpRight } from 'lucide-react'
import { Typography } from '../design/Typography'

interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  action: 'lab' | 'external' | 'soon'
  url?: string
}

const projects: Project[] = [
  {
    id: 'neural-lab',
    title: 'Neural Night Sky Lab',
    subtitle: 'Regulatory compliance & social impact network simulator',
    category: 'Interactive Visualization',
    action: 'lab',
  },
  {
    id: 'prepchef',
    title: 'PrepChef',
    subtitle: 'Shared kitchen compliance infrastructure',
    category: 'Food Safety Systems',
    action: 'soon',
  },
  {
    id: 'supportcarr',
    title: 'SupportCarr',
    subtitle: 'Micromobility resilience & community logistics',
    category: 'Urban Systems',
    action: 'soon',
  },
  {
    id: 'mathforge',
    title: 'MathForge',
    subtitle: 'Collaborative mathematical proof systems',
    category: 'Knowledge Infrastructure',
    action: 'soon',
  },
]

interface ProjectGridProps {
  onOpenLab: () => void
}

export default function ProjectGrid({ onOpenLab }: ProjectGridProps) {
  const handleProjectClick = (project: Project) => {
    if (project.action === 'lab') {
      onOpenLab()
    } else if (project.action === 'external' && project.url) {
      window.open(project.url, '_blank')
    }
  }

  return (
    <section className="py-section-md px-6 md:px-12 lg:px-24 bg-bg-surface/50">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <Typography variant="title-md" className="mb-4">Studio / Lab</Typography>
          <Typography variant="body-lg" className="max-w-2xl">
            Exploring systems design, regulatory technology, and equitable infrastructure.
          </Typography>
        </div>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative py-8 border-t border-border-light cursor-pointer hover:bg-bg-surface transition-colors duration-300"
              onClick={() => handleProjectClick(project)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <Typography variant="label" className="text-text-secondary">
                      {project.category}
                    </Typography>
                    {project.action === 'soon' && (
                      <Typography variant="label" className="text-text-secondary/60">
                        Coming Soon
                      </Typography>
                    )}
                  </div>
                  <Typography variant="title-lg" tag="h3" className="mb-2 group-hover:text-text-accent transition-colors">
                    {project.title}
                  </Typography>
                  <Typography variant="body-md" className="text-text-secondary">
                    {project.subtitle}
                  </Typography>
                </div>

                {project.action !== 'soon' && (
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-6 h-6 text-text-primary" />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
