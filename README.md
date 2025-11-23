# Christopher Sellers — Neural Night Sky Lab

The flagship site for **chrissellers.com** blends a minimal studio portfolio with an immersive neural network laboratory that explores how regulation, equity, and technology intersect. The experience is powered by **Next.js 14**, **React 18**, and a custom Three.js simulation that renders an interpretable "Neural Night Sky."

## Highlights

- Dual **studio + lab** experience with smooth animated transitions and a shared navigation/cursor system.
- **Studio landing** that introduces the work, explains the lab, and showcases projects in a premium project grid.
- **Neural Night Sky Lab** featuring an interactive neural simulation, scenario controls, dataset toggles, and live training metrics.
- **Immersive motion system** powered by Framer Motion plus a bespoke pointer for tactile hover/scroll states.
- **Performance-aware loading** via Suspense/lazy loading for the lab canvas and project grid.

## Technology Stack

| Layer | Details |
| --- | --- |
| Framework | Next.js 14 (App Router) with TypeScript |
| UI & Styling | React 18, Tailwind CSS, clsx, custom cursor + motion effects |
| Visualization | Three.js via `@react-three/fiber` and helpers from `@react-three/drei` |
| State & Data | Zustand store for the neural simulation; bespoke neural + policy utilities in `src/lib` |
| Charts | Recharts for burden/benefit/equity and training readouts |

## Project Structure

```
app/
├── layout.tsx        # Root layout with metadata and global font setup
├── page.tsx          # Studio/Lab controller with animated view switching
└── globals.css       # Tailwind layers, typography, and cursor styles
src/
├── components/
│   ├── hero/         # Landing hero with CTA into the lab
│   ├── studio/       # Enhanced project grid and supporting UI
│   ├── sections/     # How it works + Impact metrics sections
│   ├── lab/          # Lab view, controls, dashboard, info panel, and 3D scene
│   ├── layout/       # Footer, mobile nav, loading screen, typography system
│   └── effects/      # Custom cursor and interaction helpers
├── hooks/            # Shared hooks for viewport/motion
├── lib/
│   ├── neural/       # Feedforward network, datasets, and math utilities
│   ├── policy/       # Scenario data and copy for lab overlays
│   └── viz/          # Formatting helpers for canvas + charts
└── state/            # Zustand store for simulation state and controls
public/               # Static assets
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
npm run start # or npm run preview if using a preview workflow
```

### Linting

```bash
npm run lint
```

## Contact

**Christopher Sellers**
[hello@chrissellers.com](mailto:hello@chrissellers.com)

© 2025 Christopher Sellers. All rights reserved.
