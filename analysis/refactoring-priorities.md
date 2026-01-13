# Refactoring Priorities

**Generated:** 2026-01-13
**Project:** chrissellers

---

## Executive Summary

Technical debt items ranked by:
1. **Impact:** How much the change improves maintainability
2. **Risk:** Likelihood of causing bugs if not addressed
3. **Effort:** Estimated complexity to fix

---

## Priority Matrix

| Priority | Issue | Impact | Risk | Effort |
|----------|-------|--------|------|--------|
| P0 | Remove unused import in layout.tsx | Low | None | 1 min |
| P1 | Delete orphan ProjectGrid.tsx | Medium | Low | 5 min |
| P1 | Remove/migrate _lab-wip directory | Medium | Low | 30 min |
| P2 | Extract page.tsx view logic | High | Medium | 2 hrs |
| P2 | Add error boundary for Three.js | High | High | 1 hr |
| P3 | Web Worker for training | Medium | Low | 4 hrs |
| P3 | Route-based code splitting | Medium | Low | 3 hrs |

---

## P0: Immediate (< 5 minutes)

### 1. Remove Unused Import

**File:** `app/layout.tsx`
**Line:** 2
**Effort:** 1 minute

```diff
  import type { Metadata } from 'next'
- import Script from 'next/script'
  import './globals.css'
```

**Impact:** Cleaner bundle, removes dead code warning
**Risk:** None

---

## P1: Quick Wins (< 1 hour)

### 2. Delete Orphan ProjectGrid.tsx

**File:** `src/components/studio/ProjectGrid.tsx`
**Effort:** 5 minutes

```bash
git rm src/components/studio/ProjectGrid.tsx
git commit -m "chore: remove unused ProjectGrid component (replaced by EnhancedProjectGrid)"
```

**Impact:** 110 lines of dead code removed
**Risk:** Low - verify EnhancedProjectGrid covers all use cases

---

### 3. Clean Up _lab-wip Directory

**Files:** `src/_lab-wip/*`
**Effort:** 30 minutes

**Option A: Delete entirely**
```bash
rm -rf src/_lab-wip
git commit -m "chore: remove deprecated lab-wip experimental code"
```

**Option B: Archive for reference**
```bash
mkdir -p docs/archive
mv src/_lab-wip docs/archive/lab-wip-deprecated
git commit -m "chore: archive deprecated lab-wip code"
```

**Option C: Migrate policy/metrics.ts**

If policy metrics are valuable, migrate to active codebase:

```bash
# Create new directory
mkdir -p src/lib/policy

# Copy and fix imports
# src/lib/policy/metrics.ts:
# Change: import { Vector, TrainingExample } from '../neural/types'
# To use existing types or add new ones
```

**Recommendation:** Option A (delete) unless policy metrics are planned feature

---

## P2: High Impact (1-4 hours)

### 4. Extract Page View Logic to Custom Hook

**File:** `app/page.tsx`
**Effort:** 2 hours
**Impact:** High - reduces hub file complexity

**Current State:**
```typescript
// app/page.tsx - 105 lines with view state, effects, handlers
export default function Home() {
  const [currentView, setCurrentView] = useState<View>('studio')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { /* loading timer */ }, [])

  const handleOpenLab = () => { /* scroll + state */ }
  const handleCloseLab = () => { /* scroll + state */ }
  // ... render logic
}
```

**Proposed Refactor:**

Create `src/hooks/useViewNavigation.ts`:
```typescript
import { useState, useEffect, useCallback } from 'react'

type View = 'studio' | 'lab'

interface UseViewNavigationReturn {
  currentView: View
  isLoading: boolean
  openLab: () => void
  closeLab: () => void
}

export function useViewNavigation(): UseViewNavigationReturn {
  const [currentView, setCurrentView] = useState<View>('studio')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openLab = useCallback(() => {
    setCurrentView('lab')
    scrollToTop()
  }, [scrollToTop])

  const closeLab = useCallback(() => {
    setCurrentView('studio')
    scrollToTop()
  }, [scrollToTop])

  return { currentView, isLoading, openLab, closeLab }
}
```

Updated `app/page.tsx`:
```typescript
'use client'

import { lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useViewNavigation } from '@/src/hooks/useViewNavigation'
// ... component imports

export default function Home() {
  const { currentView, isLoading, openLab, closeLab } = useViewNavigation()

  if (isLoading) return <LoadingScreen />

  return (
    <>
      <CustomCursor />
      <MobileNav onOpenLab={openLab} />
      {/* ... rest of render */}
    </>
  )
}
```

**Benefits:**
- Testable view navigation logic
- Cleaner page component
- Reusable navigation pattern

---

### 5. Add Error Boundary for Three.js

**Files:** Create `src/components/lab/LabErrorBoundary.tsx`
**Effort:** 1 hour
**Impact:** High - prevents entire app crash on WebGL errors

**Implementation:**

```typescript
// src/components/lab/LabErrorBoundary.tsx
'use client'

import { Component, ReactNode } from 'react'
import { Typography } from '../design/Typography'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class LabErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lab visualization error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen bg-neural-dark flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <Typography variant="display-md" className="text-white mb-4">
              Visualization Error
            </Typography>
            <Typography variant="body-md" className="text-white/70 mb-6">
              Unable to render the Neural Night Sky. This may be due to WebGL
              not being available in your browser.
            </Typography>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-neural-accent text-white rounded-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

**Usage in page.tsx:**
```typescript
import { LabErrorBoundary } from '@/src/components/lab/LabErrorBoundary'

// In render:
<Suspense fallback={<LoadingScreen />}>
  <LabErrorBoundary>
    <LabView />
  </LabErrorBoundary>
</Suspense>
```

---

## P3: Strategic Improvements (4+ hours)

### 6. Web Worker for Neural Network Training

**Files:** Create `src/workers/training.worker.ts`
**Effort:** 4 hours
**Impact:** Medium - prevents UI jank during training

**Current Problem:**
```typescript
// src/state/simulationStore.ts:95-144
// Training runs on main thread, blocking UI
step: () => {
  for (const batch of batches) {
    const result = trainBatch(...)  // Blocks main thread
  }
}
```

**Proposed Architecture:**
```
Main Thread                    Worker Thread
     │                              │
     │  postMessage(trainConfig)    │
     │ ─────────────────────────────>
     │                              │
     │                         trainBatch()
     │                         trainBatch()
     │                              │
     │  onmessage(results)          │
     │ <─────────────────────────────
     │                              │
  updateStore(results)              │
```

**Implementation Outline:**
1. Move `engine.ts` functions to be Worker-compatible
2. Create Worker wrapper with message protocol
3. Update store to use async training
4. Add loading states for training operations

---

### 7. Route-Based Code Splitting

**Effort:** 3 hours
**Impact:** Medium - better initial load time

**Current Structure:**
```
app/
└── page.tsx  (loads everything, splits Lab lazily)
```

**Proposed Structure:**
```
app/
├── page.tsx           (Studio only)
├── lab/
│   └── page.tsx       (Lab only - separate route)
└── layout.tsx
```

**Benefits:**
- Lab code not loaded until navigated to
- Better caching (Studio and Lab cached separately)
- Cleaner URL structure (`/lab` vs conditional render)

**Migration Steps:**
1. Create `app/lab/page.tsx` with LabView
2. Update navigation to use `router.push('/lab')`
3. Move Lab-specific components to `app/lab/_components/`
4. Remove lazy loading from main page.tsx

---

## Technical Debt Backlog

### Low Priority (Future Sprints)

| Item | Description | Effort |
|------|-------------|--------|
| TypeScript strict mode | Enable `strictNullChecks` | 2 hrs |
| Test coverage | Add unit tests for lib/neural | 4 hrs |
| Storybook | Component documentation | 8 hrs |
| Accessibility audit | WCAG 2.1 AA compliance | 4 hrs |
| Performance monitoring | Add Core Web Vitals tracking | 2 hrs |

---

## Anti-Pattern Summary

| Anti-Pattern | Files Affected | Severity |
|--------------|----------------|----------|
| Hub File | app/page.tsx | Medium |
| God Module | lib/neural/engine.ts (253 lines) | Low |
| Dead Code | ProjectGrid.tsx, _lab-wip/* | Low |
| Missing Error Boundary | LabView.tsx | High |
| Main Thread Blocking | simulationStore.ts | Medium |

---

## Recommended Sprint Plan

### Sprint 1: Cleanup & Safety
- [x] P0: Remove unused import
- [ ] P1: Delete ProjectGrid.tsx
- [ ] P1: Remove _lab-wip directory
- [ ] P2: Add error boundary

### Sprint 2: Architecture
- [ ] P2: Extract useViewNavigation hook
- [ ] P3: Evaluate route-based splitting

### Sprint 3: Performance
- [ ] P3: Implement Web Worker training
- [ ] Add performance monitoring
