'use client'

/**
 * Dashboard Component
 *
 * Displays training metrics and policy analysis charts.
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useNeuralSimulation } from '../../hooks/useNeuralSimulation'

export default function Dashboard() {
  const { trainingHistory, latestMetrics } = useNeuralSimulation()

  // Prepare chart data
  const chartData = trainingHistory.map((m) => ({
    epoch: m.epoch,
    loss: m.loss,
    accuracy: m.accuracy * 100,
    equity: m.equityScore * 100,
    benefit: m.benefit * 100,
    burden: m.burden * 100,
  }))

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Metrics Summary */}
      {latestMetrics && (
        <div className="lab-panel">
          <div className="grid grid-cols-5 gap-4">
            <MetricCard
              label="Loss"
              value={latestMetrics.loss.toFixed(4)}
              color="#ef4444"
            />
            <MetricCard
              label="Accuracy"
              value={`${(latestMetrics.accuracy * 100).toFixed(1)}%`}
              color="#22c55e"
            />
            <MetricCard
              label="Equity"
              value={`${(latestMetrics.equityScore * 100).toFixed(1)}%`}
              color="#a855f7"
            />
            <MetricCard
              label="Benefit"
              value={`${(latestMetrics.benefit * 100).toFixed(1)}%`}
              color="#3b82f6"
            />
            <MetricCard
              label="Burden"
              value={`${(latestMetrics.burden * 100).toFixed(1)}%`}
              color="#f59e0b"
            />
          </div>
        </div>
      )}

      {/* Charts */}
      <div className="lab-panel flex-1 min-h-0">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Loss & Accuracy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
              Training Progress
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis
                  dataKey="epoch"
                  stroke="#ffffff60"
                  style={{ fontSize: '10px' }}
                />
                <YAxis stroke="#ffffff60" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1917',
                    border: '1px solid #ffffff20',
                    borderRadius: '4px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="loss"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Policy Metrics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">
              Policy & Equity
            </h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis
                  dataKey="epoch"
                  stroke="#ffffff60"
                  style={{ fontSize: '10px' }}
                />
                <YAxis stroke="#ffffff60" style={{ fontSize: '10px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1917',
                    border: '1px solid #ffffff20',
                    borderRadius: '4px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="benefit"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="burden"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// Metric card component
function MetricCard({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-white/60 mb-1">{label}</span>
      <span className="text-lg font-mono font-semibold" style={{ color }}>
        {value}
      </span>
    </div>
  )
}
