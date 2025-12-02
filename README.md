# Christopher Sellers — The Functionalist Archive

A professional portfolio embodying **Dieter Rams** principles of "Quiet Luxury" design. This single-page experience features a kinetic 3D particle system that morphs through geometric arrangements as you scroll, paired with business-focused messaging that positions systems architecture as strategic value.

Built with **Next.js 14**, **React Three Fiber**, and **Framer Motion** to deliver a museum-quality digital experience.

## Design Philosophy

**Quiet Luxury** — Minimal, timeless, and purposeful. Every element serves function over decoration.

- **Dieter Rams Aesthetic**: Clean lines, earth tones, Swiss typography, matte materials
- **Kinetic Background**: 1,200 particles morphing from Cloud → Grid → Pillar as sections change
- **Business Value**: Revenue multipliers, zero technical debt, global market reach
- **Single-Page Flow**: Scroll-aware sections with seamless transitions

## Key Features

- **Morphing 3D Particle System** — React Three Fiber canvas with smooth interpolation between three geometric states
- **Scroll-Driven State** — Zustand store tracks viewport position to orchestrate background transformations
- **Glassmorphism UI** — Frosted panels float above the 3D layer with subtle backdrop blur
- **Swiss Minimalism** — Grid-based metrics layout with thin borders and uppercase labels
- **Earth-Tone Palette** — Paper (#F4F4F0), Ink (#2B2B2B), Concrete (#9A9A9A), Sage (#8A9A8A)

## Technology Stack

| Layer | Details |
| --- | --- |
| Framework | Next.js 14 (App Router) with TypeScript |
| UI & Styling | React 18, Tailwind CSS (custom Studio palette), Framer Motion |
| 3D Graphics | React Three Fiber, Three.js, @react-three/drei (Environment, SoftShadows) |
| State Management | Zustand (scroll section tracking) |
| Effects | Custom cursor, viewport-aware animations, scroll parallax |
| Typography | Inter (body), Space Grotesk (display), fluid sizing with clamp() |

## Project Structure

```
app/
├── layout.tsx        # Root layout with metadata and font configuration
├── page.tsx          # Single-page scroll controller with section awareness
└── globals.css       # Studio palette, typography classes, glass-panel utility

src/
├── components/
│   ├── canvas/       # KineticBackground (3D particle system with R3F)
│   ├── hero/         # Hero section with "Architect of Value" messaging
│   ├── studio/       # EnhancedProjectGrid with glassmorphism styling
│   ├── sections/     # ImpactMetrics (performance metrics grid)
│   ├── layout/       # Footer, MobileNav, LoadingScreen
│   └── effects/      # CustomCursor, ScrollReveal (viewport animations)
│
└── state/
    └── viewStore.ts  # Zustand store for scroll section tracking

public/               # Static assets
```

## Experience Overview

### Single-Page Scroll Journey

The experience unfolds through four scroll-aware sections, each triggering a unique 3D particle arrangement:

#### 1. **Hero** — Cloud Formation
- **Headline**: "The Architect of Value"
- **Messaging**: Bridging chaotic market forces with elegant systems design
- **3D State**: Organic cloud of particles in random sphere distribution
- **CTA**: "View Work" scroll anchor

#### 2. **Work** — Grid Formation
- **Section**: Enhanced Project Grid with glassmorphism cards
- **Projects**: PrepChef, SupportCarr, MathForge, Neural Night Sky Lab
- **3D State**: Particles arrange into precise 2D grid (structured, organized)
- **Styling**: Frosted panels with Studio palette badges

#### 3. **Impact** — Pillar Formation
- **Section**: Performance Metrics in Swiss grid layout
- **Metrics**: 3.5x Revenue Multiplier, Zero Technical Debt, 12+ Market Reach, 99% Compliance
- **3D State**: Particles form vertical spiral pillar (monumental, aspirational)
- **Design**: Thin borders, uppercase labels, tracking-tighter numbers

#### 4. **Contact** — Footer
- **Content**: Email, GitHub, LinkedIn
- **3D State**: Maintains pillar formation
- **Styling**: Minimal concrete accents

## Technical Implementation

### Kinetic 3D Particle System

The `KineticBackground` component uses **React Three Fiber** to render 1,200 particle instances:

```typescript
// Three position sets calculated with useMemo
Cloud: Random sphere distribution (radius 2-10)
Grid: 2D grid with 0.8 spacing
Pillar: Spiral cylinder with 12 rotations

// Animation loop with useFrame
- Smooth lerp interpolation (factor: 0.03)
- Breathing motion: Math.sin(time + particleIndex * 0.05)
- Per-particle rotation and scale variation
- Section-driven target selection via Zustand store
```

**Rendering Details:**
- `InstancedMesh` for performance (single draw call)
- `IcosahedronGeometry` for matte ceramic aesthetic
- `MeshStandardMaterial` with high roughness (0.8)
- Instance colors: Sage, Clay, Water, Concrete
- Environment preset: "studio"
- SoftShadows (size: 25, samples: 10)
- Fog matching paper background (#F4F4F0)

### Scroll State Management

```typescript
// src/state/viewStore.ts
type Section = 'hero' | 'work' | 'impact' | 'contact'

// Framer Motion viewport triggers in app/page.tsx
<motion.section
  onViewportEnter={() => setSection('hero')}
  viewport={{ amount: 0.3 }}
>
```

### Studio Color Palette

```css
/* tailwind.config.cjs */
studio: {
  paper: '#F4F4F0',      /* Warm off-white background */
  ink: '#2B2B2B',        /* Dark charcoal text */
  concrete: '#9A9A9A',   /* Neutral gray */
  sage: '#8A9A8A',       /* Muted green accents */
  clay: '#B58E7E',       /* Warm earth tone */
  water: '#8DA3B0',      /* Cool blue-gray */
}
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

## Implementation History

This "Functionalist Archive" redesign was completed in **5 programmatic sprints**:

1. **Deconstruction & Foundation** — Removed Neural/Lab branding, established Dieter Rams aesthetic
2. **View State Engine** — Created scroll awareness system with Zustand
3. **Kinetic Background** — Built morphing 3D particle system with R3F
4. **Content & Hard Value** — Replaced social metrics with business-focused messaging
5. **Quiet Luxury Polish** — Added lighting, fog, shadows for museum atmosphere

**Total Changes:**
- Removed 2,572 lines (old neural network code)
- Added ~350 lines (new systems)
- Net reduction: ~2,200 lines

## Contact

**Christopher Sellers**
[hello@chrissellers.com](mailto:hello@chrissellers.com)
Systems for public good.
