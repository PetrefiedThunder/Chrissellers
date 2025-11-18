import { ArrowRight, Sparkles } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import HeroVisual from './HeroVisual'

interface HeroProps {
  onOpenLab: () => void
}

export default function Hero({ onOpenLab }: HeroProps) {
  return (
    <section className="studio-section flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Hero visual (right side) */}
      <HeroVisual />

      {/* Content */}
      <div className="max-w-5xl w-full relative z-10">
        {/* Accent badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-neural-accent/10 border border-neural-accent/20 animate-fade-in">
          <Sparkles className="w-4 h-4 text-neural-accent" />
          <span className="text-sm font-medium text-neural-accent">
            Interactive Neural Network Simulator
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="studio-heading mb-8 animate-fade-in animate-delay-100 bg-gradient-to-r from-studio-charcoal via-studio-charcoal to-neural-accent bg-clip-text text-transparent">
          Christopher Sellers
        </h1>

        {/* Subheading */}
        <h2 className="studio-subheading mb-12 text-studio-stone animate-fade-in animate-delay-200">
          Systems & impact designer
        </h2>

        {/* Short description - very minimal */}
        <div className="max-w-2xl space-y-6 mb-16 animate-fade-in animate-delay-300">
          <p className="studio-body leading-relaxed">
            Bridging regulation, equity, and technology through elegant systems design.
          </p>
          <p className="studio-body leading-relaxed">
            Building tools that make complex compliance landscapes accessible and fair.
          </p>
        </div>

        {/* CTA to Lab */}
        <button
          onClick={onOpenLab}
          className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-medium transition-all duration-300 animate-fade-in animate-delay-400 bg-studio-charcoal text-white rounded-lg hover:shadow-2xl hover:shadow-neural-accent/20 hover:-translate-y-0.5"
        >
          <span className="relative z-10">Open Neural Night Sky Lab</span>
          <ArrowRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10"
          />
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neural-accent to-neural-highlight opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
        </button>
      </div>
    </section>
  )
}
