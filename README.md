# Christopher Sellers

> Systems & impact designer. Bridging regulation, equity, and technology through elegant systems design.

## About

This is the flagship site for **chrissellers.com**, featuring the **Neural Night Sky Lab** — an interactive visualization that demonstrates how neural networks can model regulatory compliance and social impact systems.

The site combines:

- **Studio-quality landing** inspired by minimal design aesthetics
- **Immersive 3D neural network visualization** using Three.js
- **Real-time training simulation** with policy metrics
- **Interactive controls** for exploring different regulatory scenarios

## Features

### Studio Landing

- Minimal, elegant design with strong typography
- Project showcase grid
- Smooth transitions between Studio and Lab modes

### Neural Night Sky Lab

The Lab is an interactive neural network simulator that models how regulatory compliance systems learn to balance:

- **Safety** (regulatory compliance)
- **Economic Opportunity** (access for operators)
- **Inclusion** (equity across populations)
- **Sustainability** (environmental impact)

#### Technical Features

- **3D Visualization**: Real-time rendering of neural network with Three.js
- **Training Engine**: Custom backpropagation implementation
- **Policy Metrics**: Fairness, burden, and benefit calculations
- **Scenarios**: Multiple datasets representing different regulatory approaches
- **Interactive Controls**: Adjust hyperparameters, support levels, and enforcement

## Architecture

### Tech Stack

- **React 18** + **TypeScript**
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Three.js** via `@react-three/fiber` for 3D rendering
- **Zustand** for state management
- **Recharts** for data visualization

### Project Structure

```
src/
├── components/
│   ├── hero/          # Landing page hero section
│   ├── studio/        # Project grid and studio components
│   ├── lab/           # Neural network lab components
│   └── layout/        # Footer and layout components
├── lib/
│   ├── neural/        # Neural network engine
│   ├── policy/        # Policy-specific metrics
│   └── viz/           # Visualization utilities
├── hooks/             # React hooks
├── state/             # Zustand stores
└── App.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Neural Network Implementation

### Architecture

The neural network uses a fully-connected feedforward architecture:

- **Input Layer**: 8 neurons (stakeholder features)
- **Hidden Layers**: Configurable (default: 12, 8 neurons)
- **Output Layer**: 4 neurons (outcome metrics)

### Training

- **Algorithm**: Stochastic Gradient Descent with Backpropagation
- **Loss Function**: Mean Squared Error
- **Activation Functions**: ReLU, Leaky ReLU, Sigmoid, Tanh
- **Initialization**: He initialization for better convergence

### Policy Metrics

Custom metrics designed for regulatory systems:

- **Burden**: Compliance cost for operators
- **Benefit**: Community outcome improvement
- **Equity**: Fairness across vulnerable vs. general populations
- **Efficiency**: Benefit/burden ratio

### Datasets

Four scenarios representing different regulatory approaches:

1. **Baseline**: Standard enforcement with moderate support
2. **Targeted Support**: Enhanced assistance for vulnerable populations
3. **High Enforcement**: Punitive approach with minimal support
4. **Coordinated Ecosystem**: Aligned incentives and comprehensive support

## Conceptual Foundation

This project demonstrates how neural networks can model complex sociotechnical systems:

- **Stakeholders** (input): Small businesses, workers, regulators, community organizations
- **Regulations** (hidden layers): Food safety, accessibility, labor, environmental, equity
- **Outcomes** (output): Safety, economic opportunity, inclusion, sustainability

The network learns optimal pathways through constraint spaces — a metaphor for turning bureaucratic complexity into accessible, fair systems.

## Design Philosophy

The visual design draws inspiration from studio portfolio sites:

- Lots of whitespace
- Strong typography with minimal copy
- Confident, quiet aesthetic
- Clear focus on the work

Combined with:

- Dark, immersive Lab experience
- "Neural Night Sky" aesthetic with particle effects
- Smooth transitions between modes
- Accessible, thoughtful interactions

## Contact

**Christopher Sellers**
[hello@chrissellers.com](mailto:hello@chrissellers.com)

## License

© 2025 Christopher Sellers. All rights reserved
