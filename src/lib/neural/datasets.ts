import { Dataset, TrainingExample } from './types'

const MOCK_COMPLIANCE_DATA: TrainingExample[] = [
  { input: [0.1, 0.8, 0.2], target: [1, 0] }, // High risk -> Reject
  { input: [0.9, 0.1, 0.9], target: [0, 1] }, // Low risk -> Approve
  { input: [0.5, 0.5, 0.5], target: [1, 0] }, // Ambiguous -> Reject (Conservative)
  { input: [0.2, 0.9, 0.1], target: [1, 0] },
  { input: [0.8, 0.2, 0.8], target: [0, 1] },
  { input: [0.3, 0.7, 0.3], target: [1, 0] },
  { input: [0.7, 0.3, 0.7], target: [0, 1] },
  { input: [0.4, 0.6, 0.4], target: [1, 0] },
  { input: [0.6, 0.4, 0.6], target: [0, 1] },
  { input: [0.1, 0.1, 0.1], target: [0, 1] }, // Very low risk
]

export const DATASETS: Record<string, Dataset> = {
  'compliance-v1': {
    id: 'compliance-v1',
    name: 'Regulatory Compliance Alpha',
    description: 'Binary classification of transaction risk factors.',
    examples: MOCK_COMPLIANCE_DATA
  }
}

export function getDataset(id: string): Dataset {
  return DATASETS[id] || DATASETS['compliance-v1']
}

export function shuffleDataset(dataset: Dataset): Dataset {
  const shuffled = [...dataset.examples].sort(() => Math.random() - 0.5)
  return { ...dataset, examples: shuffled }
}

export function batchDataset(dataset: Dataset, batchSize: number): TrainingExample[][] {
  const batches: TrainingExample[][] = []
  for (let i = 0; i < dataset.examples.length; i += batchSize) {
    batches.push(dataset.examples.slice(i, i + batchSize))
  }
  return batches
}
