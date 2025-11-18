import { ArrowUpRight } from 'lucide-react'

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
    <section className="studio-section bg-white/50">
      <div className="max-w-5xl w-full mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <h2 className="studio-subheading mb-4">Studio / Lab</h2>
          <p className="studio-body max-w-2xl">
            Exploring systems design, regulatory technology, and equitable infrastructure.
          </p>
        </div>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card cursor-pointer"
              onClick={() => handleProjectClick(project)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-xs font-medium tracking-wider uppercase text-studio-stone/60">
                      {project.category}
                    </span>
                    {project.action === 'soon' && (
                      <span className="text-xs font-medium tracking-wider uppercase text-studio-stone/40">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <h3 className="project-card-title">
                    {project.title}
                  </h3>
                  <p className="project-card-subtitle">
                    {project.subtitle}
                  </p>
                </div>

                {project.action !== 'soon' && (
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-6 h-6" />
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
