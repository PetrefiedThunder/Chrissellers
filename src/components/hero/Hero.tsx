import { ArrowRight } from 'lucide-react'

interface HeroProps {
  onOpenLab: () => void
}

export default function Hero({ onOpenLab }: HeroProps) {
  return (
    <section className="studio-section flex items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Main heading */}
        <h1 className="studio-heading mb-8 animate-fade-in">
          Christopher Sellers
        </h1>

        {/* Subheading */}
        <h2 className="studio-subheading mb-12 text-studio-stone animate-fade-in animate-delay-100">
          Systems & impact designer
        </h2>

        {/* Short description - very minimal */}
        <div className="max-w-2xl space-y-6 mb-16 animate-fade-in animate-delay-200">
          <p className="studio-body">
            Bridging regulation, equity, and technology through elegant systems design.
          </p>
          <p className="studio-body">
            Building tools that make complex compliance landscapes accessible and fair.
          </p>
        </div>

        {/* CTA to Lab */}
        <button
          onClick={onOpenLab}
          className="group inline-flex items-center gap-3 text-lg font-medium transition-all duration-300 animate-fade-in animate-delay-300"
        >
          <span className="studio-link">Open Neural Night Sky Lab</span>
          <ArrowRight
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  )
}
