'use client'

/**
 * Control Panel Component
 *
 * UI controls for network configuration, training, and scenario settings.
 */

import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { useNeuralSimulation } from '../../hooks/useNeuralSimulation'
import { DatasetKey } from '../../lib/neural/datasets'

export default function ControlPanel() {
  const sim = useNeuralSimulation()

  return (
    <div className="space-y-4">
      {/* Training Controls */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Training
        </h3>

        <div className="flex gap-2 mb-4">
          {!sim.isTraining ? (
            <button onClick={sim.start} className="lab-button flex-1 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Start
            </button>
          ) : (
            <button onClick={sim.pause} className="lab-button flex-1 flex items-center justify-center gap-2">
              <Pause className="w-4 h-4" />
              {sim.isPaused ? 'Resume' : 'Pause'}
            </button>
          )}

          <button onClick={sim.reset} className="lab-button-secondary flex items-center justify-center px-3">
            <RotateCcw className="w-4 h-4" />
          </button>

          <button onClick={sim.stepOnce} className="lab-button-secondary flex items-center justify-center px-3" disabled={sim.isTraining && !sim.isPaused}>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/60 block mb-1">
              Epoch: {sim.currentEpoch} / {sim.config.epochs}
            </label>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-neural-accent h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(sim.currentEpoch / sim.config.epochs) * 100}%`,
                }}
              />
            </div>
          </div>

          {sim.latestMetrics && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-white/60">Loss:</span>
                <span className="ml-2 text-white font-mono">
                  {sim.latestMetrics.loss.toFixed(4)}
                </span>
              </div>
              <div>
                <span className="text-white/60">Accuracy:</span>
                <span className="ml-2 text-white font-mono">
                  {(sim.latestMetrics.accuracy * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hyperparameters */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Hyperparameters
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/60 block mb-1">
              Learning Rate: {sim.config.learningRate.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.001"
              max="0.1"
              step="0.001"
              value={sim.config.learningRate}
              onChange={(e) => sim.setLearningRate(parseFloat(e.target.value))}
              className="w-full"
              disabled={sim.isTraining}
            />
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-1">
              Batch Size: {sim.config.batchSize}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={sim.config.batchSize}
              onChange={(e) => sim.setBatchSize(parseInt(e.target.value))}
              className="w-full"
              disabled={sim.isTraining}
            />
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-1">
              Epochs: {sim.config.epochs}
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={sim.config.epochs}
              onChange={(e) => sim.setEpochs(parseInt(e.target.value))}
              className="w-full"
              disabled={sim.isTraining}
            />
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-2">
              Activation Function
            </label>
            <select
              value={sim.config.activationFunction}
              onChange={(e) => sim.setActivationFunction(e.target.value as any)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white"
              disabled={sim.isTraining}
            >
              <option value="relu">ReLU</option>
              <option value="leaky_relu">Leaky ReLU</option>
              <option value="sigmoid">Sigmoid</option>
              <option value="tanh">Tanh</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-1">
              Speed: {sim.animationSpeed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={sim.animationSpeed}
              onChange={(e) => sim.setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Scenario */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Scenario
        </h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-white/60 block mb-2">Dataset</label>
            <select
              value={sim.currentDataset}
              onChange={(e) => sim.setDataset(e.target.value as DatasetKey)}
              className="w-full bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-white"
              disabled={sim.isTraining}
            >
              <option value="baseline">Baseline Compliance</option>
              <option value="targeted_support">Targeted Support</option>
              <option value="high_enforcement">High Enforcement</option>
              <option value="coordinated">Coordinated Ecosystem</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-1">
              Support Level: {(sim.supportLevel * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sim.supportLevel}
              onChange={(e) => sim.setSupportLevel(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs text-white/60 block mb-1">
              Enforcement: {(sim.enforcementLevel * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sim.enforcementLevel}
              onChange={(e) => sim.setEnforcementLevel(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Regulation Domains */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Active Regulations
        </h3>

        <div className="space-y-2">
          {Object.entries(sim.enabledRegulations).map(([key, enabled]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => sim.toggleRegulation(key as any)}
                className="rounded"
              />
              <span className="text-sm text-white/80 capitalize">
                {key.replace('_', ' ')}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  )
}
