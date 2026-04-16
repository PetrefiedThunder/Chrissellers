import { render } from '@testing-library/react'
import HeroVisual from '../../src/components/hero/HeroVisual'

describe('HeroVisual', () => {
  it('renders without crashing', () => {
    const { container } = render(<HeroVisual />)
    expect(container).toBeTruthy()
  })

  it('renders floating shapes', () => {
    const { container } = render(<HeroVisual />)
    const shapes = container.querySelectorAll('.blur-3xl')
    expect(shapes.length).toBe(5)
  })

  it('shapes have stable positions across re-renders', () => {
    const { container, rerender } = render(<HeroVisual />)
    
    const firstRenderShapes = Array.from(container.querySelectorAll('.blur-3xl')).map(el => ({
      width: el.style.width,
      height: el.style.height,
      left: el.style.left,
      top: el.style.top,
    }))

    rerender(<HeroVisual />)
    
    const secondRenderShapes = Array.from(container.querySelectorAll('.blur-3xl')).map(el => ({
      width: el.style.width,
      height: el.style.height,
      left: el.style.left,
      top: el.style.top,
    }))

    expect(firstRenderShapes).toEqual(secondRenderShapes)
  })

  it('renders SVG grid pattern', () => {
    const { container } = render(<HeroVisual />)
    const svg = container.querySelector('svg')
    expect(svg).toBeTruthy()
    
    const gridPattern = container.querySelector('#grid')
    expect(gridPattern).toBeTruthy()
  })

  it('renders gradient overlay', () => {
    const { container } = render(<HeroVisual />)
    const gradient = container.querySelector('#fadeGradient')
    expect(gradient).toBeTruthy()
  })

  it('has placeholder text for adding image', () => {
    const { getByText } = render(<HeroVisual />)
    expect(getByText(/Add Hero Image Here/)).toBeTruthy()
  })

  it('shapes have animation delays', () => {
    const { container } = render(<HeroVisual />)
    const shapes = container.querySelectorAll('.animate-pulse-slow')
    expect(shapes.length).toBe(5)
  })
})
