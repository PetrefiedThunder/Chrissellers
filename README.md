# Christopher Sellers — Neural Night Sky Lab

The flagship site for **chrissellers.com** blends a minimal studio portfolio with an immersive neural network laboratory that explores how regulation, equity, and technology intersect. The experience is powered by **Next.js 16**, **React 18**, and a custom Three.js simulation that renders an interpretable "Neural Night Sky."

## Highlights

- Dual **studio + lab** experience with smooth animated transitions and a shared navigation/cursor system.
- **Studio landing** that introduces the work, explains the lab, and showcases projects in a premium project grid.
- **Neural Night Sky Lab** featuring an interactive neural simulation, scenario controls, dataset toggles, and live training metrics.
- **Immersive motion system** powered by Framer Motion plus a bespoke pointer for tactile hover/scroll states.
- **Performance-aware loading** via Suspense/lazy loading for the lab canvas and project grid.
- **Mathematically sound** neural network with Xavier initialization, proper backpropagation, and gradient clipping.
- **Accessible** with skip-to-content links, focus trapping, and keyboard navigation.

## Technology Stack

| Layer | Details |
| --- | --- |
| Framework | Next.js 16 (App Router) with TypeScript |
| UI & Styling | React 18, Tailwind CSS, clsx, custom cursor + motion effects |
| Visualization | Three.js via `@react-three/fiber` and helpers from `@react-three/drei` |
| State & Data | Zustand store for the neural simulation; bespoke neural + policy utilities in `src/lib` |
| Charts | Recharts for burden/benefit/equity and training readouts |
| Testing | Jest + React Testing Library |
| CI/CD | GitHub Actions |

## Project Structure

```
app/
├── layout.tsx        # Root layout with metadata, fonts, and skip link
├── page.tsx          # Studio/Lab controller with animated view switching
└── globals.css       # Tailwind layers, typography, cursor styles, accessibility

src/
├── components/
│   ├── hero/         # Landing hero with CTA into the lab
│   ├── studio/       # Enhanced project grid and supporting UI
│   ├── sections/     # How it works + Impact metrics sections
│   ├── lab/          # Lab view, controls, dashboard, info panel, and 3D scene
│   │   └── shaders/  # GLSL shaders for energy beam effects
│   ├── layout/       # Footer, mobile nav, loading screen, typography system
│   └── effects/      # Custom cursor and interaction helpers
├── lib/
│   └── neural/       # Feedforward network, datasets, and math utilities
│       ├── engine.ts        # Forward/backward pass, training
│       ├── types.ts         # TypeScript interfaces
│       ├── datasets.ts      # Training datasets
│       └── networkLayout.ts # Neuron positioning
└── state/
    └── simulationStore.ts   # Zustand store for simulation

.github/
└── workflows/
    └── ci.yml        # CI/CD pipeline

__tests__/
├── neural/           # Neural network unit tests
│   └── engine.test.ts
└── components/      # Component tests
    └── HeroVisual.test.tsx
```

## Experience Overview

### Studio
- **Hero** introduces Christopher Sellers with a CTA that opens the Lab view.
- **How It Works** and **Impact Metrics** sections explain the regulatory/safety framing.
- **Enhanced Project Grid** features tagged case studies, a highlighted Lab entry point, and responsive hover animations.

### Neural Night Sky Lab
- **Lab layout** combines a control sidebar, real-time 3D network visualization, metrics dashboard, and contextual info panel.
- **Simulation controls** manage architecture presets, learning rate/batch size/epochs, activation choice, and dataset selection.
- **Scenario tuning** adjusts support/enforcement levels and toggles regulation categories to see burden/benefit/equity shifts.
- **Visualization options** include camera presets, label/connection toggles, and animation speed controls.

## Development

### Prerequisites

- Node.js 18+
- npm (comes with Node)

### Setup

```bash
npm install
```

### Local Development

```bash
npm run dev
# open http://localhost:3000
```

### Production Build

```bash
npm run build
npm run start
```

> Note: Production builds use Webpack for GLSL shader support. Use `npm run build:turbopack` for Turbopack builds.

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Linting

```bash
npm run lint
```

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Test job**: Runs lint and tests with coverage on every push/PR
- **Build job**: Creates production build (runs after tests pass)

View the workflow at `.github/workflows/ci.yml`.

## Neural Network Implementation

The lab features a mathematically sound feedforward neural network:

- **Xavier/Glorot** weight initialization
- **Activation functions**: ReLU, Leaky ReLU, Sigmoid, Tanh, Linear
- **Proper backpropagation** with correct pre-activation (z) values for derivatives
- **Gradient clipping** to prevent exploding gradients
- **Numerical stability guards** to prevent NaN/Infinity

See `src/lib/neural/engine.ts` for implementation details.

## Accessibility

The site includes accessibility features:

- Skip-to-content link for keyboard users
- Focus trapping in mobile navigation
- ARIA attributes on interactive elements
- Keyboard navigation support (Escape to close modals)
- Reduced motion support via `prefers-reduced-motion`

## Contact

**Christopher Sellers**
[hello@chrissellers.com](mailto:hello@chrissellers.com)

&copy; 2025 Christopher Sellers. All rights reserved.
