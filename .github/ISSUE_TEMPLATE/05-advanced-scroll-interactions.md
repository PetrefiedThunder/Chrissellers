---
name: ✨ Advanced Scroll Interactions
about: Implement futuristic scroll-driven animations and storytelling
title: '[SCROLL] '
labels: animation, interaction, scroll, enhancement
assignees: ''
---

## 🎯 Objective
Create world-class scroll-driven interactions using physics-based animations, parallax effects, and narrative storytelling techniques.

## 📊 Mathematical Foundation

### Scroll Progress Model
```typescript
/**
 * Scroll progress function
 * p(s) = (s - s_start) / (s_end - s_start)
 * where:
 *   p ∈ [0, 1] = normalized scroll progress
 *   s = current scroll position
 *   s_start = element start position
 *   s_end = element end position
 */

interface ScrollProgress {
  progress: number        // [0, 1]
  velocity: number        // px/s
  direction: 1 | -1      // up or down
  isInView: boolean
}
```

### Easing Functions (Mathematical Curves)
```typescript
/**
 * Standard easing functions
 * All functions map [0, 1] → [0, 1]
 */

// Linear: y = x
const linear = (t: number) => t

// Ease-in-out (smooth): y = -cos(πx)/2 + 0.5
const easeInOutSine = (t: number) => 
  -(Math.cos(Math.PI * t) - 1) / 2

// Ease-out cubic: y = 1 - (1-x)³
const easeOutCubic = (t: number) => 
  1 - Math.pow(1 - t, 3)

// Ease-in-out cubic: bezier curve
const easeInOutCubic = (t: number) =>
  t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2

// Spring physics: damped harmonic oscillator
const spring = (t: number, stiffness = 100, damping = 10) => {
  const omega = Math.sqrt(stiffness)
  const zeta = damping / (2 * Math.sqrt(stiffness))
  
  if (zeta < 1) {
    // Underdamped
    const omegaD = omega * Math.sqrt(1 - zeta * zeta)
    return 1 - Math.exp(-zeta * omega * t) * 
      (Math.cos(omegaD * t) + (zeta * omega / omegaD) * Math.sin(omegaD * t))
  }
  return 1 - Math.exp(-omega * t) * (1 + omega * t)
}
```

## ✅ Implementation Tasks

### Phase 1: Scroll Progress Tracking
- [ ] **Custom useScroll Hook**
  ```typescript
  interface ScrollState {
    scrollY: number
    scrollYProgress: number  // [0, 1] for entire page
    velocity: number
    direction: 'up' | 'down'
  }
  
  const useScroll = (): ScrollState => {
    const [state, setState] = useState<ScrollState>({
      scrollY: 0,
      scrollYProgress: 0,
      velocity: 0,
      direction: 'down'
    })
    
    useEffect(() => {
      let lastScrollY = window.scrollY
      let lastTimestamp = Date.now()
      
      const updateScroll = () => {
        const currentScrollY = window.scrollY
        const currentTime = Date.now()
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        
        const velocity = (currentScrollY - lastScrollY) / (currentTime - lastTimestamp)
        const direction = currentScrollY > lastScrollY ? 'down' : 'up'
        
        setState({
          scrollY: currentScrollY,
          scrollYProgress: currentScrollY / maxScroll,
          velocity,
          direction
        })
        
        lastScrollY = currentScrollY
        lastTimestamp = currentTime
      }
      
      window.addEventListener('scroll', updateScroll, { passive: true })
      return () => window.removeEventListener('scroll', updateScroll)
    }, [])
    
    return state
  }
  ```

- [ ] **Element-Specific Scroll Progress**
  ```typescript
  const useScrollProgress = (ref: RefObject<HTMLElement>) => {
    const [progress, setProgress] = useState(0)
    
    useEffect(() => {
      const element = ref.current
      if (!element) return
      
      const updateProgress = () => {
        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementHeight = rect.height
        const windowHeight = window.innerHeight
        
        // Element enters at bottom of viewport, exits at top
        const scrollStart = elementTop - windowHeight
        const scrollEnd = elementTop + elementHeight
        const scrollRange = scrollEnd - scrollStart
        
        const currentScroll = window.scrollY
        const elementProgress = (currentScroll - scrollStart) / scrollRange
        
        setProgress(Math.max(0, Math.min(1, elementProgress)))
      }
      
      window.addEventListener('scroll', updateProgress, { passive: true })
      updateProgress()
      
      return () => window.removeEventListener('scroll', updateProgress)
    }, [ref])
    
    return progress
  }
  ```

### Phase 2: Parallax Effects
- [ ] **Multi-Layer Parallax**
  ```typescript
  /**
   * Parallax depth model
   * displacement = baseSpeed × depth × scrollY
   * where depth ∈ [-1, 1]:
   *   -1 = moves twice as fast (foreground)
   *    0 = moves with scroll (normal)
   *   +1 = moves half as fast (background)
   */
  
  const ParallaxLayer = ({ 
    depth = 0,
    children 
  }: { 
    depth?: number
    children: ReactNode 
  }) => {
    const { scrollY } = useScroll()
    
    const transform = useMemo(() => {
      const speed = -depth * 0.5
      return `translateY(${scrollY * speed}px)`
    }, [scrollY, depth])
    
    return (
      <div style={{ transform, willChange: 'transform' }}>
        {children}
      </div>
    )
  }
  
  // Usage:
  <ParallaxLayer depth={-0.5}>
    <h1>Foreground (moves faster)</h1>
  </ParallaxLayer>
  <ParallaxLayer depth={0.5}>
    <div>Background (moves slower)</div>
  </ParallaxLayer>
  ```

- [ ] **3D Perspective Parallax**
  ```typescript
  /**
   * 3D parallax using CSS transforms
   * perspective × translateZ creates depth illusion
   */
  
  const Parallax3D = ({ 
    children,
    distance = 0  // Distance from camera (-1 to 1)
  }) => {
    return (
      <div
        style={{
          transform: `translateZ(${distance * 100}px) scale(${1 - distance * 0.3})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
    )
  }
  
  // Container:
  <div style={{ 
    perspective: '1000px',
    perspectiveOrigin: '50% 50%',
    transformStyle: 'preserve-3d'
  }}>
    <Parallax3D distance={0.5}>{/* Background */}</Parallax3D>
    <Parallax3D distance={0}>{/* Normal */}</Parallax3D>
    <Parallax3D distance={-0.3}>{/* Foreground */}</Parallax3D>
  </div>
  ```

### Phase 3: Scroll-Triggered Animations
- [ ] **Fade In on Scroll**
  ```typescript
  const FadeInOnScroll = ({ children, threshold = 0.2 }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { 
      once: true,
      amount: threshold 
    })
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuad
        }}
      >
        {children}
      </motion.div>
    )
  }
  ```

- [ ] **Stagger Children Animation**
  ```typescript
  const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    
    const containerVariants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2
        }
      }
    }
    
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    }
    
    return (
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {React.Children.map(children, child => (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    )
  }
  ```

- [ ] **Scale and Rotate on Scroll**
  ```typescript
  const ScrollAnimatedCard = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null)
    const progress = useScrollProgress(ref)
    
    // Map progress to rotation: 0° → 360°
    const rotate = useTransform(
      useMotionValue(progress), 
      [0, 1], 
      [0, 360]
    )
    
    // Map progress to scale: 0.8 → 1.2
    const scale = useTransform(
      useMotionValue(progress),
      [0, 0.5, 1],
      [0.8, 1, 1.2]
    )
    
    return (
      <motion.div
        ref={ref}
        style={{ rotate, scale }}
      >
        {children}
      </motion.div>
    )
  }
  ```

### Phase 4: Horizontal Scroll Sections
- [ ] **Horizontal Scroll Gallery**
  ```typescript
  /**
   * Transform vertical scroll into horizontal motion
   * x = -scrollProgress × totalWidth
   */
  
  const HorizontalScrollSection = ({ items }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"]
    })
    
    const x = useTransform(
      scrollYProgress,
      [0, 1],
      [0, -(items.length - 1) * 100]
    )
    
    return (
      <div ref={ref} style={{ height: `${items.length * 100}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <motion.div
            style={{ 
              x: `${x}%`,
              display: 'flex',
              width: `${items.length * 100}vw`
            }}
          >
            {items.map((item, i) => (
              <div key={i} style={{ width: '100vw', height: '100vh' }}>
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    )
  }
  ```

### Phase 5: Smooth Scroll Implementation
- [ ] **Lenis Smooth Scroll Integration**
  ```typescript
  import Lenis from '@studio-freight/lenis'
  
  const useSmoothScroll = () => {
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2
      })
      
      const raf = (time: number) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      
      requestAnimationFrame(raf)
      
      return () => {
        lenis.destroy()
      }
    }, [])
  }
  ```

- [ ] **Scroll to Section with Easing**
  ```typescript
  const scrollToSection = (elementId: string, duration = 1000) => {
    const element = document.getElementById(elementId)
    if (!element) return
    
    const start = window.scrollY
    const end = element.offsetTop
    const distance = end - start
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-in-out cubic
      const ease = progress < 0.5
        ? 4 * progress ** 3
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      
      window.scrollTo(0, start + distance * ease)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }
  ```

### Phase 6: Scroll-Linked Hero Effects
- [ ] **Hero Text Reveal**
  ```typescript
  const HeroReveal = () => {
    const { scrollYProgress } = useScroll()
    
    // Fade out hero as user scrolls
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
    const y = useTransform(scrollYProgress, [0, 0.3], [0, -100])
    
    return (
      <motion.div
        style={{ opacity, scale, y }}
        className="hero-section"
      >
        <h1>Christopher Sellers</h1>
        <p>Neural Network Visualization</p>
      </motion.div>
    )
  }
  ```

- [ ] **Navbar Background on Scroll**
  ```typescript
  const StickyNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50)
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
      <motion.nav
        animate={{
          backgroundColor: isScrolled 
            ? 'rgba(10, 10, 15, 0.9)' 
            : 'rgba(10, 10, 15, 0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50"
      >
        {/* Nav content */}
      </motion.nav>
    )
  }
  ```

### Phase 7: Story-Driven Scroll Sections
- [ ] **Section Progress Indicators**
  ```typescript
  const ScrollProgress = () => {
    const { scrollYProgress } = useScroll()
    
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neural-accent origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    )
  }
  ```

- [ ] **Chapter Navigation**
  ```typescript
  const chapters = [
    { id: 'hero', title: 'Introduction' },
    { id: 'lab', title: 'Neural Lab' },
    { id: 'projects', title: 'Projects' },
    { id: 'impact', title: 'Impact' }
  ]
  
  const ChapterNav = () => {
    const [activeChapter, setActiveChapter] = useState(0)
    
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2
        
        chapters.forEach((chapter, index) => {
          const element = document.getElementById(chapter.id)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveChapter(index)
            }
          }
        })
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
        {chapters.map((chapter, i) => (
          <button
            key={chapter.id}
            onClick={() => scrollToSection(chapter.id)}
            className={i === activeChapter ? 'active' : ''}
            aria-label={`Navigate to ${chapter.title}`}
          >
            <span className="dot" />
            <span className="label">{chapter.title}</span>
          </button>
        ))}
      </nav>
    )
  }
  ```

## 📈 Performance Considerations

### Optimization Strategies
```typescript
/**
 * Performance budget for scroll animations:
 * - Target: 60fps (16.67ms per frame)
 * - Budget per frame: ~10ms for scroll handlers
 * - Use: transform and opacity (GPU-accelerated)
 * - Avoid: layout properties (width, height, top, left)
 */

// Throttle scroll events
const useThrottledScroll = (callback: () => void, delay = 16) => {
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) return
      
      timeoutRef.current = setTimeout(() => {
        callback()
        timeoutRef.current = undefined
      }, delay)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [callback, delay])
}

// Use CSS containment
const ScrollSection = styled.div`
  contain: layout style paint;
  will-change: transform;
`
```

## 📊 Success Metrics

### Performance Targets
```
Metric                    Target
─────────────────────────────────
Scroll FPS                60fps constant
Jank-free scroll          99%+ frames
Input latency             <16ms
Animation smoothness      100%
CPU usage during scroll   <50%
```

### User Engagement
```
Metric                    Target
─────────────────────────────────
Average scroll depth      >70%
Time on page              >2 min
Bounce rate               <25%
Return visitor rate       >40%
```

## 🎯 Definition of Done
- [ ] Smooth 60fps scrolling maintained
- [ ] Parallax effects implemented on key sections
- [ ] Scroll-triggered animations on all major components
- [ ] Horizontal scroll gallery (if applicable)
- [ ] Smooth scroll library integrated
- [ ] Chapter navigation working
- [ ] Progress indicator visible
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Performance budget maintained (<50% CPU)
- [ ] Tested on low-end devices

## 📚 References
- [Framer Motion Scroll Animations](https://www.framer.com/motion/scroll-animations/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [CSS Tricks: Scroll-Linked Animations](https://css-tricks.com/scroll-linked-animations/)

## 🔗 Related Issues
- Performance optimization (maintain 60fps)
- Accessibility (respect reduced motion)
- Mobile UX (touch-based scroll)
