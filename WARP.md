# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Christopher Sellers portfolio site featuring a dual **Studio + Lab** experience. The Studio showcases projects in a minimal, premium design. The Lab is an interactive neural network visualization (Neural Night Sky Lab) that demonstrates regulatory compliance and social impact modeling using real neural networks and Three.js.

**Tech Stack:** Next.js 14 (App Router), React 18, TypeScript, Three.js (@react-three/fiber), Zustand, Framer Motion, Tailwind CSS, Recharts

## Common Commands

### Development
```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm start         # Start production server
npm run lint      # Run ESLint (Next.js config)
```

### Key Points
- **No test suite exists** - Do not run `npm test`
- **No typecheck script** - Run `npx tsc --noEmit` if type checking is needed
- Always use `npm` (not yarn/pnpm) - package-lock.json is committed

## Architecture Overview

### Dual-View Pattern
The main page (`app/page.tsx`) switches between two distinct views:
- **Studio View**: Landing hero, project grid,How It Works, Impact Metrics, Footer
- **Lab View**: Full-screen interactive neural network simulation

Both views are lazily loaded using React's `lazy()` and `Suspense` for performance. View switching uses Framer Motion's `AnimatePresence` for smooth transitions.

### Component Structure

**app/**
- `layout.tsx` - Root layout with metadata and font setup
- `page.tsx` - Main controller for Studio/Lab view switching
- `globals.css` - Tailwind layers, custom utility classes, accessibility styles

**src/components/**
- `hero/` - Landing hero, animated background, hero visual
- `studio/` - Project grid components (basic and enhanced versions)
- `sections/` - HowItWorks and ImpactMetrics sections
- `lab/` - Lab view, controls, dashboard, info panel, 3D scene (referenced but directory structure may differ)
- `layout/` - Footer, MobileNav, LoadingScreen
- `effects/` - CustomCursor, ScrollReveal

**src/hooks/**
- `useNeuralSimulation.ts` - Main hook controlling neural network training loop, visualization updates, and state sync. Interfaces with Zustand store.

**src/lib/**
- `neural/` - Neural network engine (forward pass, training, datasets, activation functions)
- `policy/` - Scenario data and policy metrics calculation
- `viz/` - Visualization helpers for generating neuron/connection visuals

**src/state/**
- Zustand store (likely `simulationStore.ts`) - Centralized state for neural simulation (architecture, weights, training status, metrics, visualization settings)

### Neural Network Simulation

The Lab features a **real feedforward neural network** (not fake/animated):
- Training loop runs in `useNeuralSimulation` hook with configurable learning rate, batch size, epochs
- Backpropagation with gradient descent
- Multiple datasets available (toggleable in UI)
- Real-time metrics: loss, accuracy, equity score, burden, benefit
- Visualization: neurons and connections update based on activations and weights
- Scenario controls: support level, enforcement level, regulation toggles

**Key Functions:**
- `initializeNetwork()` - Creates weight matrices
- `trainBatch()` - Performs one training iteration
- `forwardPass()` - Computes predictions and activations
- `evaluate()` - Calculates loss and accuracy
- `calculatePolicyMetrics()` - Computes equity/burden/benefit metrics

### State Management with Zustand

State is centralized in a Zustand store (`useSimulationStore`). The store manages:
- Neural network architecture and weights
- Training configuration (learning rate, batch size, epochs)
- Training state (isTraining, isPaused, currentEpoch)
- Visualization data (neurons, connections, activations)
- Scenario parameters (support/enforcement levels, enabled regulations)
- UI state (camera preset, show labels/connections, animation speed)

**When editing state logic:**
- The store is imported from `src/state/simulationStore`
- All training loop logic lives in `useNeuralSimulation` hook
- State updates trigger automatic re-renders and visualization updates

### Three.js Visualization

3D rendering uses `@react-three/fiber` with helpers from `@react-three/drei`:
- Neuron positions calculated in `src/lib/viz/networkLayout.ts`
- Connections (edges) generated from weights matrix
- Activations control node/edge opacity and color intensity
- Camera presets for different viewing angles
- Animation speed controls training visualization rate

**Important:** Three.js components are transpiled via Next.js config (`transpilePackages`). Do not modify webpack config without understanding GLSL shader loading rules.

## Styling System

### Tailwind Configuration

**Custom Color Palette:**
- `studio-paper`, `studio-ink`, `studio-concrete`, `studio-sage`, `studio-clay`, `studio-water`
- `neural-dark`, `neural-accent`, `neural-highlight` (defined in globals.css variables)

**Fluid Typography:**
- Uses `clamp()` for responsive font sizes
- Scales: `fluid-xs` through `fluid-7xl`
- Example: `studio-heading` uses `clamp(2.25rem, 4vw + 1rem, 6rem)`

**Component Classes:**
- `.studio-section` - Full-screen section with responsive padding
- `.studio-heading`, `.studio-subheading`, `.studio-body` - Semantic text styles
- `.glass`, `.glass-dark`, `.glass-panel` - Glassmorphism effects

### CSS Architecture

Global styles in `app/globals.css`:
- Tailwind layers organized as `@layer base`, `@layer components`, `@layer utilities`
- Accessibility defaults: focus-visible styles, reduced motion support
- Custom scrollbar styles, animations, utilities

**When adding styles:**
- Use Tailwind utilities first
- Create component classes in `@layer components` for reusable patterns
- Use CSS variables (in `:root`) for theme colors
- Always test with `prefers-reduced-motion` media query

## File Path Conventions

Path aliases configured in `tsconfig.json`:
```typescript
"paths": { "@/*": ["./*"] }
```

**Import examples:**
```typescript
import Hero from '@/src/components/hero/Hero'
import { useSimulationStore } from '@/src/state/simulationStore'
import { trainBatch } from '@/src/lib/neural/engine'
```

Always use `@/` prefix for absolute imports from project root.

## Code Patterns and Conventions

### TypeScript
- Strict mode enabled
- Prefer explicit types for function parameters and return values
- Use interfaces for component props, not inline types
- State types often defined in `src/lib/neural/types.ts` or similar

### React Patterns
- Functional components with hooks (no class components)
- Use `'use client'` directive for client-side interactive components
- Lazy load heavy components (Lab, ProjectGrid) with `React.lazy()` and `Suspense`
- Animations via Framer Motion (`motion.div`, `AnimatePresence`)
- Custom hooks for complex logic (e.g., `useNeuralSimulation`)

### Naming Conventions
- Components: PascalCase (`EnhancedProjectGrid`)
- Hooks: camelCase with `use` prefix (`useNeuralSimulation`)
- Utility functions: camelCase (`calculatePolicyMetrics`)
- Files: Match component name (`EnhancedProjectGrid.tsx`)

### Performance Considerations
- Current bundle size: ~138KB (target: <100KB)
- Lazy loading critical for Lab view (Three.js is heavy)
- Training loop uses `window.setInterval` with dynamic delay based on animation speed
- Avoid unnecessary re-renders: use `useCallback` for training functions
- Icons from `lucide-react` (tree-shakeable)

## Design and UX Principles

### Visual Design
- **Minimalism**: Generous whitespace, focused content hierarchy
- **Premium feel**: Subtle animations, glassmorphism, gradient accents
- **Dual identity**: Studio (warm, minimal) vs Lab (technical, immersive)
- **Typography scale**: Space Grotesk (display), Inter (body)

### Animation Philosophy
- Subtle micro-interactions on hover
- Staggered animations for list items (use `animationDelay` in inline styles)
- Smooth view transitions (Framer Motion with 500ms duration)
- Training visualization speed controllable (1x to 5x)
- Always respect `prefers-reduced-motion`

### Accessibility Requirements
- All interactive elements have proper focus-visible styles
- Semantic HTML (use `<section>`, `<article>`, `<nav>`, etc.)
- ARIA labels where needed (especially for 3D visualization controls)
- Touch targets minimum 44px × 44px for mobile
- Color contrast ratios meet WCAG AA (AAA is goal)

## Known Issues and Technical Debt

### Store Import Issue
The code references `src/state/simulationStore` but the `src/state/` directory may not exist or may be located elsewhere. If encountering import errors:
1. Search for `*store*.ts` files in the project
2. Check if state is colocated with components or hooks
3. Verify import paths match actual file structure

### Missing Features Referenced in README
- Lab components (`src/components/lab/`) mentioned but may be incomplete or differently structured
- Neural network modules (`src/lib/neural/`) imported but may not all be implemented
- If these imports fail, the features are likely planned but not yet built

### ESLint Configuration
Custom rules in `.eslintrc.json`:
- `react/no-unescaped-entities: off` - Allows apostrophes in JSX
- `react-hooks/exhaustive-deps: warn` - Warns instead of errors
- `@next/next/no-page-custom-font: off` - Allows custom font loading

**When adding code:** Follow Next.js best practices but expect relaxed rules for JSX strings.

## Development Workflow

### Making Changes

1. **Start dev server:** `npm run dev`
2. **Hot reload:** Next.js auto-refreshes on file changes
3. **Check types:** `npx tsc --noEmit` (no npm script exists)
4. **Lint code:** `npm run lint` before committing
5. **Build test:** `npm run build` to verify production build

### Adding Features

**Studio components:**
- Add to `src/components/studio/` or `src/components/sections/`
- Use existing component classes (`.studio-heading`, `.studio-section`)
- Follow lazy loading pattern if heavy

**Lab features:**
- State changes go through Zustand store
- Training logic modifies `useNeuralSimulation` hook
- Visualization changes in `src/lib/viz/` utilities
- Neural network changes in `src/lib/neural/` engine

**Styling:**
- Prefer Tailwind utilities over custom CSS
- Add new color scales to `tailwind.config.cjs`
- Component classes go in `app/globals.css` under `@layer components`

### Testing Strategy

**No automated tests exist.** Manual testing workflow:
1. Visual regression: Check Studio and Lab views in browser
2. Interaction testing: Click through project cards, Lab controls
3. Responsive testing: Test at mobile (375px), tablet (768px), desktop (1440px+)
4. Training verification: Run Lab training loop, verify metrics update
5. Performance check: Lighthouse audit (target 95+ score)

## Deployment and Build

### Build Output
```bash
npm run build   # Creates .next/ directory with optimized build
npm start       # Serves production build on port 3000
```

### Environment
- Node.js 18+ required
- No environment variables used (static site)
- No API routes or backend logic

### Next.js Configuration

From `next.config.js`:
- Three.js packages transpiled (`transpilePackages`)
- GLSL shader support via raw-loader and glslify-loader
- Do not modify webpack config without understanding shader implications

## Documentation References

### Internal Documentation
- `README.md` - User-facing project overview and setup
- `DESIGN_ANALYSIS.md` - Detailed design benchmarking against award-winning sites
- `DESIGN_SCORECARD.md` - Quantitative design assessment
- `IMPLEMENTATION_COMPLETE.md` - GitHub issue templates for improvements
- `.github/ISSUE_TEMPLATE/` - Comprehensive improvement roadmap (7 issues, 108K+ lines)

### External Resources
- Next.js 14 App Router: https://nextjs.org/docs
- Three.js: https://threejs.org/docs
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber
- Zustand: https://docs.pmnd.rs/zustand
- Framer Motion: https://www.framer.com/motion
- Tailwind CSS: https://tailwindcss.com/docs

## Future Improvements (from Issue Templates)

High-priority enhancements documented in `.github/ISSUE_TEMPLATE/`:
1. **Performance Optimization** - Bundle size reduction, lazy loading, Lighthouse 95+
2. **Mobile UX Enhancement** - Touch targets, responsive 3D view, fluid design
3. **Mathematical Soundness** - Neural network validation, gradient verification
4. **Accessibility Excellence** - WCAG AAA compliance, keyboard navigation
5. **Advanced Scroll Interactions** - Parallax, scroll-driven animations
6. **Content Depth** - Case studies, process documentation, storytelling
7. **Visual Polish** - Micro-interactions, magnetic buttons, 3D card effects

**Target:** Reach Tier 1 (world-class) design status, award submission ready.
