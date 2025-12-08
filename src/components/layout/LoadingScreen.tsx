import { Typography } from '../design/Typography'

/**
 * Loading Screen Component
 *
 * Premium loading experience with animated logo and progress indicator.
 */

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-bg-page flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Animated logo/title */}
        <div className="relative">
          <Typography variant="display-lg" tag="h1" className="animate-pulse">
            CS
          </Typography>

          {/* Rotating circle */}
          <div className="absolute -inset-8 border-2 border-text-accent/20 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-text-accent rounded-full" />
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <Typography variant="body-sm" className="font-medium text-text-secondary">
            Loading Neural Night Sky...
          </Typography>

          {/* Progress bar */}
          <div className="w-64 h-1 bg-text-secondary/10 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-text-accent animate-loading-bar" />
          </div>
        </div>
      </div>
    </div>
  )
}
