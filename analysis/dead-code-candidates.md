# Dead Code Candidates

**Generated:** 2026-01-13
**Project:** chrissellers

---

## Summary

| Category | Count | Status |
|----------|-------|--------|
| Orphan Files (no importers) | 2 | Review Required |
| WIP/Excluded Files | 3 | Intentionally Excluded |
| Unused Exports | 4 | Potential Dead Code |
| Potentially Unreachable Code | 2 | Needs Verification |

---

## Orphan Files

### 1. `src/components/studio/ProjectGrid.tsx`

**Status:** ORPHAN - Not imported anywhere
**Lines:** 110
**Last Modified:** Unknown

**Evidence:**
```typescript
// ProjectGrid.tsx is the simpler version replaced by EnhancedProjectGrid.tsx
// But it's still in the codebase

// app/page.tsx imports only:
const EnhancedProjectGrid = lazy(() => import('@/src/components/studio/EnhancedProjectGrid'))
// ProjectGrid.tsx is never imported
```

**Analysis:**
- `ProjectGrid.tsx` appears to be the original implementation
- `EnhancedProjectGrid.tsx` is an enhanced version with GitHub API integration
- ProjectGrid has NO importers in the codebase

**Recommendation:**
- **DELETE** if EnhancedProjectGrid is the permanent replacement
- **KEEP** if planning to use as fallback for GitHub API failures

---

### 2. `src/components/effects/ScrollReveal.tsx`

**Status:** PARTIALLY USED - Only imported by 3 section components
**Lines:** 58

**Evidence:**
```typescript
// Imported by:
// - src/components/sections/HowItWorks.tsx
// - src/components/sections/ImpactMetrics.tsx
// - src/components/sections/ProfessionalExperience.tsx
```

**Analysis:**
- This is a utility component that IS used
- Not orphan, but could be more widely adopted
- Hero.tsx uses framer-motion directly instead of ScrollReveal

**Recommendation:** KEEP - Consider standardizing all animations through ScrollReveal

---

## WIP/Excluded Files

The following files are in `src/_lab-wip/` and excluded via `tsconfig.json`:

```json
// tsconfig.json:26
"exclude": ["node_modules", "src/_lab-wip"]
```

### 1. `src/_lab-wip/useNeuralSimulation.ts` - 214 lines

**Status:** EXCLUDED FROM BUILD
**Broken Imports:**
```typescript
// Line 22-23 - These paths don't exist
import { calculatePolicyMetrics } from '../lib/policy/metrics'
import { generateNeuronVisuals, generateConnectionVisuals } from '../lib/viz/networkLayout'
```

**Analysis:**
- References `../lib/policy/metrics` - path would resolve to `src/lib/policy/metrics.ts` (doesn't exist)
- References `../lib/viz/networkLayout` - path would resolve to `src/lib/viz/networkLayout.ts` (doesn't exist)
- Also references extended store interface (`store.setWeights`, `store.updateNeurons`, etc.) not in current store

**Recommendation:**
- This appears to be an earlier iteration of the simulation logic
- Current implementation uses simpler approach in `simulationStore.ts`
- **CANDIDATE FOR DELETION** - or move to `/archive/` if preserving for reference

---

### 2. `src/_lab-wip/policy/metrics.ts` - 280 lines

**Status:** EXCLUDED FROM BUILD
**Content:** Policy & Equity metrics calculations

**Evidence:**
```typescript
// Line 10 - Broken import
import { Vector, TrainingExample } from '../neural/types'
// Would resolve to src/_lab-wip/neural/types (doesn't exist)
// Should be ../../lib/neural/types
```

**Analysis:**
- Contains sophisticated policy metrics: burden, benefit, equity, efficiency
- Would be valuable if integrated into main codebase
- Currently unusable due to import path issues

**Recommendation:**
- **MIGRATE** to `src/lib/policy/metrics.ts` with fixed imports
- Or **DELETE** if policy metrics are out of scope

---

### 3. `src/_lab-wip/viz/networkLayout.ts` - 204 lines

**Status:** EXCLUDED FROM BUILD
**Content:** Extended network visualization layout

**Evidence:**
```typescript
// References types that don't exist in current types.ts:
import {
  NetworkArchitecture,
  NetworkWeights,        // NOT IN types.ts
  NeuronVisual,          // NOT IN types.ts
  ConnectionVisual,      // NOT IN types.ts
  Vector,                // NOT IN types.ts
  STAKEHOLDER_TYPES,     // NOT IN types.ts
  REGULATION_DOMAINS,    // NOT IN types.ts
  OUTCOME_METRICS,       // NOT IN types.ts
} from '../neural/types'
```

**Analysis:**
- More elaborate layout system than current `networkLayout.ts`
- Requires type definitions that were removed/never added
- Part of a larger planned feature set

**Recommendation:**
- **DELETE** or **ARCHIVE** - Current implementation in `src/lib/neural/networkLayout.ts` is sufficient
- If features are needed later, rewrite to match current type system

---

## Unused Exports

### 1. `recharts` Package (package.json)

**Status:** INSTALLED BUT UNUSED
**Version:** ^2.10.3

**Evidence:**
```bash
# Grep for recharts usage
grep -r "recharts" --include="*.tsx" --include="*.ts" src/
# Result: No matches found
```

**Recommendation:**
- **REMOVE** from package.json if not planned for future use
- Or implement metrics charts in Lab view

---

### 2. `forwardPass` Export in engine.ts

**Status:** EXPORTED BUT NOT DIRECTLY USED

**Evidence:**
```typescript
// src/lib/neural/engine.ts:70
export function forwardPass(...)

// Only called internally within engine.ts (by trainBatch and evaluate)
// Not imported by any other file
```

**Analysis:**
- `forwardPass` is part of public API but only used internally
- Could be used by future consumers for inference without training

**Recommendation:** KEEP - Part of designed public API

---

### 3. `Script` Import in layout.tsx

**Status:** IMPORTED BUT NOT USED

**Evidence:**
```typescript
// app/layout.tsx:2
import Script from 'next/script'
// Script is never used in the component
```

**Recommendation:** **REMOVE** unused import

---

### 4. `activations` Object Exports (Partial)

**Status:** PARTIALLY USED

**Evidence:**
```typescript
// src/lib/neural/engine.ts:18-27
const activations = {
  sigmoid: (x: number) => ...,
  sigmoidPrime: (x: number) => ...,
  relu: (x: number) => ...,
  reluPrime: (x: number) => ...,
  tanh: (x: number) => ...,      // NEVER USED
  tanhPrime: (x: number) => ..., // NEVER USED
  linear: (x: number) => ...,
  linearPrime: (_x: number) => ...,
}
```

**Recommendation:** KEEP - Supporting full activation function set is appropriate

---

## Potentially Unreachable Code

### 1. ProjectGrid `external` Action Handler

**File:** `src/components/studio/ProjectGrid.tsx`
**Lines:** 49-54

**Evidence:**
```typescript
const handleProjectClick = (project: Project) => {
  if (project.action === 'lab') {
    onOpenLab()
  } else if (project.action === 'external' && project.url) {
    window.open(project.url, '_blank')  // <-- Unreachable
  }
}

// But in the projects array:
const projects: Project[] = [
  { action: 'lab', ... },
  { action: 'soon', ... },
  { action: 'soon', ... },
  { action: 'soon', ... },
]
// No project has action: 'external' !
```

**Recommendation:**
- If file is deleted (orphan), this becomes moot
- If kept, either add `external` projects or remove handler

---

### 2. `adam` Optimizer Support

**File:** `src/lib/neural/types.ts`
**Line:** 18

**Evidence:**
```typescript
// types.ts:18
optimizer: 'sgd' | 'adam'

// But engine.ts only implements SGD:
// engine.ts:208-218 - Only SGD gradient descent
const updatedConnections = newConnections.map(c => ({
  ...c,
  weight: c.weight - lr * (weightGradients.get(c.id) || 0) / batch.length
}))
```

**Recommendation:**
- Remove `'adam'` from type union until implemented
- Or implement Adam optimizer

---

## Size Analysis

| Category | Files | Total Lines | % of Codebase |
|----------|-------|-------------|---------------|
| Active Code | 27 | ~2,100 | 75% |
| WIP/Excluded | 3 | ~700 | 25% |
| Orphan Files | 1 | 110 | 4% |

---

## Cleanup Recommendations

### Immediate Actions

1. **Remove unused import:**
   ```typescript
   // app/layout.tsx - Remove line 2
   - import Script from 'next/script'
   ```

2. **Delete or archive ProjectGrid.tsx:**
   ```bash
   git rm src/components/studio/ProjectGrid.tsx
   # Or: mkdir -p archive && git mv src/components/studio/ProjectGrid.tsx archive/
   ```

3. **Remove recharts if unused:**
   ```bash
   npm uninstall recharts
   ```

### Decision Required

- **_lab-wip directory:** Delete entirely, or migrate useful code?
- **Policy metrics:** Valuable feature - migrate or abandon?

---

## File Tree Summary

```
src/
├── _lab-wip/          [EXCLUDED - 3 files, ~700 lines]
│   ├── policy/
│   │   └── metrics.ts      [DEAD - broken imports]
│   ├── viz/
│   │   └── networkLayout.ts [DEAD - broken imports]
│   └── useNeuralSimulation.ts [DEAD - broken imports]
├── components/
│   └── studio/
│       ├── ProjectGrid.tsx     [ORPHAN - no importers]
│       └── EnhancedProjectGrid.tsx [ACTIVE - replacement]
└── lib/
    └── neural/
        └── engine.ts           [PARTIAL - adam not implemented]
```
