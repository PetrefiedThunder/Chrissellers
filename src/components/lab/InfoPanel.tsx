'use client'

/**
 * Info Panel Component
 *
 * Displays information about the selected neuron/connection and general help.
 */

import { Info, Zap, Target, Users } from 'lucide-react'
import { useSimulationStore } from '../../state/simulationStore'
import {
  STAKEHOLDER_TYPES,
  REGULATION_DOMAINS,
  OUTCOME_METRICS,
} from '../../lib/neural/types'

export default function InfoPanel() {
  const { selectedNeuron, neurons } = useSimulationStore()

  // Find selected neuron
  const neuron = neurons.find((n) => n.id === selectedNeuron)

  return (
    <div className="space-y-4">
      {/* Selected Neuron Info */}
      {neuron ? (
        <section className="lab-panel">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Selected Neuron
          </h3>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-white/60">Type:</span>
              <p className="text-sm text-white capitalize">{neuron.type} Layer</p>
            </div>

            <div>
              <span className="text-xs text-white/60">Label:</span>
              <p className="text-sm text-white">{neuron.label}</p>
            </div>

            <div>
              <span className="text-xs text-white/60">Activation:</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-neural-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${neuron.activation * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white font-mono">
                  {neuron.activation.toFixed(2)}
                </span>
              </div>
            </div>

            {neuron.type === 'input' && neuron.stakeholderType && (
              <div>
                <span className="text-xs text-white/60">Stakeholder Type:</span>
                <p className="text-sm text-white mt-1">
                  Represents {neuron.label} in the regulatory system.
                </p>
              </div>
            )}

            {neuron.type === 'hidden' && neuron.regulationDomain && (
              <div>
                <span className="text-xs text-white/60">Regulation Domain:</span>
                <p className="text-sm text-white mt-1">
                  {
                    REGULATION_DOMAINS.find((d) => d.id === neuron.regulationDomain)
                      ?.description
                  }
                </p>
              </div>
            )}

            {neuron.type === 'output' && neuron.outcomeType && (
              <div>
                <span className="text-xs text-white/60">Outcome Metric:</span>
                <p className="text-sm text-white mt-1">
                  {
                    OUTCOME_METRICS.find((o) => o.id === neuron.outcomeType)
                      ?.name
                  }
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="lab-panel">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Click a Neuron
          </h3>
          <p className="text-sm text-white/70">
            Click on a neuron in the visualization to see detailed information.
          </p>
        </section>
      )}

      {/* About This Simulation */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          About
        </h3>
        <div className="space-y-3 text-sm text-white/70">
          <p>
            This neural network models how regulatory compliance systems learn to
            balance safety, opportunity, and equity.
          </p>
          <p>
            Each neuron represents a stakeholder, regulation, or community outcome.
            Connections show dependencies and trade-offs.
          </p>
        </div>
      </section>

      {/* Legend */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Layer Types
        </h3>

        <div className="space-y-3">
          <div>
            <h4 className="text-xs font-semibold text-white mb-2">Input Layer</h4>
            <div className="space-y-1">
              {STAKEHOLDER_TYPES.slice(0, 3).map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="text-xs text-white/70">{type.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Hidden Layers (Regulations)
            </h4>
            <div className="space-y-1">
              {REGULATION_DOMAINS.slice(0, 3).map((domain) => (
                <div key={domain.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: domain.color }}
                  />
                  <span className="text-xs text-white/70">{domain.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white mb-2">
              Output Layer (Outcomes)
            </h4>
            <div className="space-y-1">
              {OUTCOME_METRICS.map((outcome) => (
                <div key={outcome.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: outcome.color }}
                  />
                  <span className="text-xs text-white/70">{outcome.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="lab-panel">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
          Controls
        </h3>
        <div className="space-y-2 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Rotate</span>
            <span className="text-white/50">Click + Drag</span>
          </div>
          <div className="flex justify-between">
            <span>Zoom</span>
            <span className="text-white/50">Scroll</span>
          </div>
          <div className="flex justify-between">
            <span>Pan</span>
            <span className="text-white/50">Right Click + Drag</span>
          </div>
        </div>
      </section>
    </div>
  )
}
