/**
 * Loading Screen Component
 *
 * Premium loading experience with animated logo and progress indicator.
 */

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-studio-cream flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Animated logo/title */}
        <div className="relative">
          <h1 className="text-6xl font-display font-bold bg-gradient-to-r from-studio-charcoal via-neural-accent to-neural-highlight bg-clip-text text-transparent animate-pulse">
            CS
          </h1>

          {/* Rotating circle */}
          <div className="absolute -inset-8 border-2 border-neural-accent/20 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-neural-accent rounded-full" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-studio-stone">
            Loading Neural Night Sky...
          </p>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-studio-stone/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-neural-accent to-neural-highlight animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}
