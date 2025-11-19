/**
 * Floating Neural Network Control Panel
 *
 * A collapsible panel that floats over the main content,
 * allowing users to explore neural network controls without
 * leaving the main page.
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronUp, ChevronDown, Brain, Play, Pause, RotateCcw } from 'lucide-react'
import { useSimulationStore } from '../../state/simulationStore'
import { datasets } from '../../lib/neural/datasets'

export default function FloatingNeuralPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const {
    isTraining,
    currentDataset,
    currentEpoch,
    config,
    setDataset,
    startTraining,
    stopTraining,
    resetNetwork,
  } = useSimulationStore()

  const trainingProgress = config.epochs > 0 ? currentEpoch / config.epochs : 0
  const scenarioEntries = Object.entries(datasets)

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-br from-dreamy-lavender to-dreamy-mauve shadow-lg hover:shadow-xl transition-all duration-300 group pointer-events-auto"
            aria-label="Open neural network controls"
          >
            <Brain className="w-6 h-6 text-studio-charcoal group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-neural-accent rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-40 w-96 max-h-[80vh] overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-dreamy-slate/20 pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dreamy-slate/20 bg-gradient-to-r from-dreamy-lavender/30 to-dreamy-teal/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/50">
                  <Brain className="w-5 h-5 text-studio-charcoal" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-studio-charcoal">
                    Neural Lab
                  </h3>
                  <p className="text-xs text-studio-stone/60">
                    {isTraining ? 'Training...' : 'Ready'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-studio-stone" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-studio-stone" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4 text-studio-stone" />
                </button>
              </div>
            </div>

            {/* Collapsible content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                    {/* Training controls */}
                    <div>
                      <label className="block text-sm font-medium text-studio-charcoal mb-3">
                        Training Controls
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={isTraining ? stopTraining : startTraining}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                            isTraining
                              ? 'bg-red-100 hover:bg-red-200 text-red-700'
                              : 'bg-gradient-to-r from-dreamy-lavender to-dreamy-mauve text-studio-charcoal hover:shadow-md'
                          }`}
                        >
                          {isTraining ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Train
                            </>
                          )}
                        </button>
                        <button
                          onClick={resetNetwork}
                          className="px-4 py-2.5 rounded-lg bg-dreamy-mist hover:bg-dreamy-slate transition-colors"
                          aria-label="Reset network"
                        >
                          <RotateCcw className="w-4 h-4 text-studio-charcoal" />
                        </button>
                      </div>

                      {/* Progress bar */}
                      {isTraining && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs text-studio-stone/60">
                            <span>Progress</span>
                            <span>{Math.round(trainingProgress * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-dreamy-mist rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${trainingProgress * 100}%` }}
                              className="h-full bg-gradient-to-r from-dreamy-lavender to-neural-accent rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Datasets */}
                    <div>
                      <label className="block text-sm font-medium text-studio-charcoal mb-3">
                        Training Datasets
                      </label>
                      <div className="space-y-2">
                        {scenarioEntries.map(([key, dataset]) => (
                          <button
                            key={key}
                            onClick={() => setDataset(key as any)}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                              currentDataset === key
                                ? 'bg-gradient-to-r from-dreamy-lavender/50 to-dreamy-teal/30 border-2 border-dreamy-purple/30'
                                : 'bg-dreamy-mist/50 hover:bg-dreamy-slate/30 border-2 border-transparent'
                            }`}
                          >
                            <div className="font-medium text-sm text-studio-charcoal capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                            <div className="text-xs text-studio-stone/60 mt-1 line-clamp-2">
                              {dataset.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimal view (when collapsed) */}
            {!isExpanded && (
              <div className="p-4 text-center">
                <p className="text-sm text-studio-stone/60">
                  Click to expand controls
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
