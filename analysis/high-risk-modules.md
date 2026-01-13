# High-Risk Modules Analysis

**Generated:** 2026-01-13
**Project:** chrissellers

---

## Risk Assessment Methodology

Modules are ranked by:
1. **Coupling Score** (0-100): Number of imports + importers
2. **Blast Radius**: Transitive dependents affected by changes
3. **Complexity**: Lines of code, cyclomatic complexity
4. **Side Effects**: Global state mutations, DOM manipulation

---

## Risk Rankings

### CRITICAL (Score 75+)

#### 1. `app/page.tsx` - Coupling Score: 85

**Risk Level:** CRITICAL
**Blast Radius:** Entire application
**Lines:** 105

**Evidence:**
```typescript
// app/page.tsx:3-12 - 10 internal imports
import Hero from '@/src/components/hero/Hero'
import Footer from '@/src/components/layout/Footer'
import LoadingScreen from '@/src/components/layout/LoadingScreen'
import CustomCursor from '@/src/components/effects/CustomCursor'
import MobileNav from '@/src/components/layout/MobileNav'
import HowItWorks from '@/src/components/sections/HowItWorks'
import ImpactMetrics from '@/src/components/sections/ImpactMetrics'
import ProfessionalExperience from '@/src/components/sections/ProfessionalExperience'
const EnhancedProjectGrid = lazy(() => import('@/src/components/studio/EnhancedProjectGrid'))
const LabView = lazy(() => import('@/src/components/lab/LabView'))
```

**Issues:**
- Hub file anti-pattern: Imports 10 modules directly
- Any change to imported components may affect this file
- Single point of failure for the entire application

**Side Effects:**
```typescript
// app/page.tsx:35-36, 40-41 - window mutations
window.scrollTo({ top: 0, behavior: 'smooth' })
```

**Recommendations:**
1. Extract view switching logic into a custom hook
2. Consider route-based code splitting instead of conditional rendering
3. Move scroll behavior to a dedicated navigation utility

---

#### 2. `src/components/design/Typography.tsx` - Coupling Score: 75

**Risk Level:** HIGH
**Blast Radius:** 10 components
**Lines:** 40

**Importers (10):**
- `src/components/hero/Hero.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/LoadingScreen.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/ImpactMetrics.tsx`
- `src/components/sections/ProfessionalExperience.tsx`
- `src/components/studio/ProjectGrid.tsx`
- `src/components/studio/EnhancedProjectGrid.tsx`
- `src/components/lab/LabView.tsx`

**Evidence:**
```typescript
// src/components/design/Typography.tsx:8-17 - Variant config
const config: Record<Variant, { tag: ElementType; style: string }> = {
  'display-lg': { tag: 'h1', style: 'font-display text-display-lg text-text-primary' },
  'display-md': { tag: 'h2', style: 'font-display text-display-md text-text-primary' },
  // ...
}
```

**Issues:**
- Breaking change to variant names affects 10 files
- Style string changes propagate to entire UI
- No runtime validation of variant prop

**Recommendations:**
1. Add exhaustive type checking with `satisfies` keyword
2. Consider CSS-in-JS or CSS modules for style isolation
3. Add unit tests for all variants
4. Document breaking change process

---

### HIGH (Score 60-74)

#### 3. `src/state/simulationStore.ts` - Coupling Score: 70

**Risk Level:** HIGH
**Blast Radius:** 4 direct + 4 lib modules
**Lines:** 147

**Evidence:**
```typescript
// src/state/simulationStore.ts:1-11 - Heavy imports
import { create } from 'zustand'
import { NetworkArchitecture, Neuron, Connection, TrainingConfig, TrainingMetrics } from '../lib/neural/types'
import { initializeNetwork, trainBatch, evaluate } from '../lib/neural/engine'
import { layoutNeurons } from '../lib/neural/networkLayout'
import { getDataset, batchDataset, shuffleDataset } from '../lib/neural/datasets'
```

**Importers (4):**
- `src/components/lab/LabView.tsx`
- `src/components/lab/NeuralGalaxy.tsx`
- `src/components/lab/StarNeuron.tsx`
- `src/components/lab/ConstellationConnection.tsx`

**Issues:**
- Central nervous system for Lab feature
- State mutations affect visualization in real-time
- Training loop runs in component effect (memory leak risk)

**Side Effects:**
```typescript
// src/state/simulationStore.ts:95-144 - Complex step() function
step: () => {
  // 50 lines of training logic with side effects
  // Mutates neurons, connections, metrics
}
```

**Recommendations:**
1. Extract training logic into separate module
2. Add cleanup for training intervals
3. Consider Web Worker for training computation
4. Add state selectors for performance optimization

---

#### 4. `src/lib/neural/types.ts` - Coupling Score: 60

**Risk Level:** HIGH
**Blast Radius:** 6 modules
**Lines:** 62

**Importers (6):**
- `src/state/simulationStore.ts`
- `src/lib/neural/engine.ts`
- `src/lib/neural/networkLayout.ts`
- `src/lib/neural/datasets.ts`
- `src/components/lab/StarNeuron.tsx`
- `src/components/lab/ConstellationConnection.tsx`

**Issues:**
- Type changes cascade to all neural network code
- No versioning strategy for API changes
- Position tuple `[number, number, number]` could benefit from type alias

**Recommendations:**
1. Add JSDoc comments for all interfaces
2. Consider `Vector3` type alias for position
3. Mark experimental types with `@experimental` tag
4. Add type tests to catch breaking changes

---

### MEDIUM (Score 40-59)

#### 5. `src/components/lab/LabView.tsx` - Coupling Score: 55

**Risk Level:** MEDIUM
**Blast Radius:** N/A (leaf component)
**Lines:** 133

**Issues:**
- 4 external package imports (@react-three/*)
- Complex Three.js setup with post-processing
- Training loop managed via useEffect

**Evidence:**
```typescript
// src/components/lab/LabView.tsx:28-36 - Training loop in effect
useEffect(() => {
  let interval: NodeJS.Timeout
  if (isTraining) {
    interval = setInterval(() => {
      step()
    }, 100)
  }
  return () => clearInterval(interval)
}, [isTraining, step])
```

**Recommendations:**
1. Consider extracting Canvas setup into dedicated component
2. Move training loop to store or custom hook
3. Add error boundary for Three.js failures

---

#### 6. `src/components/lab/ConstellationConnection.tsx` - Coupling Score: 45

**Risk Level:** MEDIUM
**Lines:** 76

**Issues:**
- Complex quaternion math for connection orientation
- Shader material import with side effects
- Multiple useMemo calls with complex dependencies

**Evidence:**
```typescript
// src/components/lab/ConstellationConnection.tsx:7
import './shaders/EnergyBeamMaterial' // Register shader - SIDE EFFECT
```

**Recommendations:**
1. Document the shader registration side effect
2. Consider extracting geometry calculations to utility

---

### LOW (Score < 40)

Remaining modules have low coupling and isolated functionality:

| Module | Score | Notes |
|--------|-------|-------|
| Hero.tsx | 35 | 3 internal deps, well-contained |
| NeuralGalaxy.tsx | 35 | Thin wrapper component |
| StarNeuron.tsx | 35 | Single responsibility |
| HowItWorks.tsx | 30 | Section component |
| ImpactMetrics.tsx | 30 | Section component |
| ProfessionalExperience.tsx | 30 | Section component |
| engine.ts | 30 | Pure functions, complex but isolated |
| ScrollReveal.tsx | 25 | Reusable utility |
| networkLayout.ts | 25 | Pure functions |
| EnhancedProjectGrid.tsx | 25 | Contains fetch to GitHub |
| MobileNav.tsx | 20 | Self-contained nav |

---

## Blast Radius Matrix

| File Changed | Direct Impact | Transitive Impact | Affected Tests |
|--------------|---------------|-------------------|----------------|
| types.ts | 6 files | 10 files | Neural tests |
| Typography.tsx | 10 files | 10 files | All UI tests |
| simulationStore.ts | 4 files | 4 files | Lab tests |
| engine.ts | 1 file | 5 files | Training tests |
| page.tsx | 0 files | 0 files | E2E tests |

---

## Action Items

### Immediate (This Sprint)
- [ ] Add error boundary around LabView Three.js Canvas
- [ ] Document Typography variant API
- [ ] Add cleanup verification for training intervals

### Short-term (Next 2 Sprints)
- [ ] Extract page.tsx view logic into custom hook
- [ ] Add unit tests for Typography component
- [ ] Create type tests for neural/types.ts

### Long-term
- [ ] Consider Web Worker for training computation
- [ ] Evaluate route-based splitting for Lab feature
- [ ] Add architecture decision records (ADRs)
