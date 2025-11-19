# Christopher Sellers — Neural Night Sky Lab

The flagship site for **chrissellers.com** blends a minimal studio portfolio with an immersive neural network laboratory that explores how regulation, equity, and technology intersect. The experience is powered by **Next.js 14**, **React 18**, and a custom Three.js simulation that renders an interpretable "Neural Night Sky".

## Highlights

- **Studio landing** with rich typography, curated project grid, and scroll-triggered storytelling.
- **Neural Night Sky Lab** that simulates regulatory systems with live metrics for safety, equity, opportunity, and sustainability.
- **Seamless studio ↔ lab transition** managed through animated view states, lazy loading, and shared global UI elements.
- **Interactive instrumentation** including adjustable hyperparameters, scenario presets, and policy impact readouts.
- **Custom motion + cursor system** using Framer Motion and a bespoke pointer experience for a tactile, premium feel.

## Technology Stack

| Layer | Details |
| --- | --- |
| Framework | Next.js 14 (App Router) with TypeScript |
| UI & Styling | React 18, Tailwind CSS, clsx, custom cursor + motion effects |
| Visualization | Three.js via `@react-three/fiber` and helpers from `@react-three/drei` |
| State & Data | Zustand store for lab state, bespoke neural + policy utilities in `src/lib` |
| Charts | Recharts for burden/benefit/equity readouts |

## Project Structure

```
.
├── app/
│   ├── layout.tsx        # Root layout, metadata, and global providers
│   └── page.tsx          # Studio/Lab controller with animated view switching
├── app/globals.css       # Global Tailwind layer overrides and cursor styles
├── src/
│   ├── components/
│   │   ├── hero/         # Studio hero + call to action
│   │   ├── studio/       # Project grid, cards, tags, filter controls
│   │   ├── lab/          # Neural Lab canvas, controls, metrics, overlays
│   │   ├── sections/     # How it works + Impact metrics sections
│   │   ├── layout/       # Footer, navigation, loading screen, cursor
│   │   └── effects/      # Interaction enhancements (custom cursor)
│   ├── hooks/            # Shared hooks for motion, viewport, and lab logic
│   ├── lib/
│   │   ├── neural/       # Feedforward network + training utilities
│   │   ├── policy/       # Scenario data, burden/equity metrics
│   │   └── viz/          # Helper math + formatting for the 3D canvas
│   └── state/            # Zustand stores for lab + UI state
└── public/               # Static assets
```

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
npm run start # or npm run preview if using a preview workflow
```

### Linting

```bash
npm run lint
```

## Neural Night Sky Lab

The Lab renders a configurable, fully connected neural network that ingests stakeholder + policy features and predicts outcomes across four pillars:

- **Safety** — Regulatory compliance and public health.
- **Economic Opportunity** — Accessibility and operational latitude for small businesses.
- **Inclusion** — Equity measures across vulnerable populations.
- **Sustainability** — Environmental and long-term resilience markers.

### Implementation Notes

- **Architecture**: Input layer (8 nodes) → configurable hidden layers (defaults: 12 + 8 nodes) → 4-node output layer.
- **Training**: Custom SGD + backprop implementation with He initialization, ReLU/Leaky ReLU hidden activations, and sigmoid/tanh outputs.
- **Scenarios**: Baseline, Targeted Support, High Enforcement, and Coordinated Ecosystem; each supplies datasets, enforcement/support sliders, and qualitative annotations.
- **Metrics**: Burden, benefit, equity, and efficiency calculations drive the Recharts visualizations and UI badges.
- **Performance**: Heavy 3D + analytics panels are lazy loaded to keep the studio landing lightweight.

## Contact

**Christopher Sellers**  
[hello@chrissellers.com](mailto:hello@chrissellers.com)

© 2025 Christopher Sellers. All rights reserved.
