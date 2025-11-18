/**
 * Hero Visual Component
 *
 * Placeholder for high-quality hero image with sophisticated overlay effects.
 *
 * RECOMMENDED IMAGES (Unsplash - Free, High-Res, No Watermark):
 * - https://unsplash.com/photos/abstract-network-visualization
 * - https://unsplash.com/photos/data-visualization-dark
 * - Search: "neural network visualization", "data abstract", "technology dark"
 *
 * ALTERNATIVE SOURCES:
 * - Pexels.com (100% free, high-resolution)
 * - Pixabay.com (free for commercial use)
 */

export default function HeroVisual() {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-studio-cream/50 to-studio-cream z-10" />

      {/* Image placeholder with abstract pattern */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Abstract geometric pattern as placeholder */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="#57534e" opacity="0.3" />
              </pattern>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#fadeGradient)" />
          </svg>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-neural-accent/20 to-neural-highlight/10 blur-3xl animate-pulse-slow"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
              }}
            />
          ))}
        </div>

        {/* Image placeholder text */}
        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center p-8 bg-white/90 backdrop-blur-sm rounded-lg">
            <p className="text-sm text-studio-stone font-medium mb-2">
              Add Hero Image Here
            </p>
            <p className="text-xs text-studio-stone/60 max-w-xs">
              Recommended: High-res abstract visualization from Unsplash, Pexels, or Pixabay.
              Search "neural network", "data visualization", or "abstract technology"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
