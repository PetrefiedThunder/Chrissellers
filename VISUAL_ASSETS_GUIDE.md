# Visual Assets Guide

## High-Quality, Royalty-Free Image Sources

This guide provides recommendations for sourcing professional, high-resolution images to elevate the design to award-winning quality.

---

## 🎨 Recommended Image Sources

### 1. **Unsplash** (Recommended)
- **URL**: https://unsplash.com
- **License**: 100% free, even for commercial use
- **Quality**: Ultra-high resolution (typically 3000px+)
- **Watermarks**: None
- **Best For**: Professional photography, abstract visuals, technology imagery

#### Recommended Searches for This Site:
- "neural network visualization"
- "data abstract dark"
- "technology network"
- "geometric abstract"
- "circuit board macro"
- "particle system"
- "3d abstract gradient"

#### Suggested Specific Images:
1. **Hero Background**: Abstract network/neural visualization
   - Search: "network visualization dark" or "data particles"
   - Size: Minimum 2560x1440px
   - Style: Dark background, blue/purple tones

2. **Project Card Thumbnails**: Technology/abstract themes
   - Search: "technology minimal", "abstract architecture"
   - Size: Minimum 1920x1080px
   - Style: Clean, minimal, high contrast

### 2. **Pexels**
- **URL**: https://pexels.com
- **License**: Free for personal and commercial use
- **Quality**: High resolution
- **Watermarks**: None
- **Best For**: Video backgrounds, motion graphics

#### Recommended Searches:
- "neural network animation"
- "particle background"
- "dark technology"

### 3. **Pixabay**
- **URL**: https://pixabay.com
- **License**: Free for commercial use, no attribution required
- **Quality**: Good to high resolution
- **Watermarks**: None
- **Best For**: Illustrations, vectors, abstract graphics

---

## 📐 Image Specifications

### Hero Section
- **Dimensions**: 2560 x 1440px minimum (4K preferred)
- **Aspect Ratio**: 16:9
- **Format**: WebP (with JPG fallback)
- **File Size**: Optimize to <500KB
- **Style**: Abstract, dark background, neural/network theme

### Project Cards
- **Dimensions**: 1920 x 1080px minimum
- **Aspect Ratio**: 16:9 or 4:3
- **Format**: WebP (with JPG fallback)
- **File Size**: Optimize to <200KB each
- **Style**: Clean, minimal, related to project theme

### Lab Background Enhancements
- **Dimensions**: 3840 x 2160px (4K)
- **Aspect Ratio**: 16:9
- **Format**: WebP
- **File Size**: Optimize to <800KB
- **Style**: Dark, starfield, neural network, particles

---

## 🔧 How to Implement Images

### 1. Download High-Res Images
Visit Unsplash, Pexels, or Pixabay and download images in maximum resolution.

### 2. Optimize Images
Use online tools to convert and compress:
- **Squoosh.app** (Google's image optimizer)
- **TinyPNG.com** (PNG/JPG compression)
- **CloudConvert.com** (Format conversion)

### 3. Place in Project
```bash
# Create assets directory
mkdir -p public/images

# Add images
public/images/
├── hero-background.webp
├── hero-background.jpg (fallback)
├── project-neural-lab.webp
├── project-prepchef.webp
├── project-supportcarr.webp
├── project-mathforge.webp
└── lab-background.webp
```

### 4. Update Components

#### Hero Component (`src/components/hero/HeroVisual.tsx`):
```tsx
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url('/images/hero-background.webp')`,
  }}
>
  <img
    src="/images/hero-background.jpg"
    alt=""
    className="hidden" // Fallback
  />
</div>
```

#### Project Cards:
```tsx
<div className="aspect-video overflow-hidden rounded-lg mb-4">
  <img
    src={`/images/project-${project.id}.webp`}
    alt={project.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
</div>
```

---

## 🎯 Curated Image Recommendations

### For Hero Section:
1. **Unsplash**: "neural network visualization" by NASA/SpaceX imagery team
   - https://unsplash.com/s/photos/neural-network
   - Dark, abstract, high-tech aesthetic

2. **Pexels**: "Digital particle background video"
   - https://www.pexels.com/search/videos/particles/
   - Animated background option

### For Lab Section:
1. **Unsplash**: "Starfield" or "Galaxy" imagery
   - https://unsplash.com/s/photos/starfield
   - Enhances "Neural Night Sky" theme

2. **NASA Image Library** (Public Domain):
   - https://images.nasa.gov
   - 100% free, ultra-high resolution
   - Search: "nebula", "star field", "deep space"

### For Project Cards:
1. **PrepChef**: Kitchen/food tech imagery
2. **SupportCarr**: Urban/transportation imagery
3. **MathForge**: Abstract mathematics/geometry
4. **Neural Lab**: Brain/network visualization

---

## ⚡ Quick Implementation Checklist

- [ ] Download 1 hero background image (2560x1440+)
- [ ] Download 4 project card images (1920x1080+)
- [ ] Download 1 lab background enhancement (3840x2160)
- [ ] Optimize all images to WebP format
- [ ] Add fallback JPG versions
- [ ] Place images in `public/images/`
- [ ] Update component image paths
- [ ] Test loading performance
- [ ] Verify responsive behavior
- [ ] Check accessibility (alt text)

---

## 📱 Responsive Image Strategy

### Use `srcset` for responsive images:
```tsx
<img
  src="/images/hero-background.webp"
  srcSet="
    /images/hero-background-mobile.webp 768w,
    /images/hero-background-tablet.webp 1024w,
    /images/hero-background-desktop.webp 1920w,
    /images/hero-background-4k.webp 3840w
  "
  sizes="(max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 3840px"
  alt="Neural network visualization"
/>
```

---

## 🎨 Color Palette Matching

When selecting images, prioritize visuals that match the site's color scheme:

- **Primary**: #6366f1 (Indigo)
- **Secondary**: #a855f7 (Purple)
- **Accent**: #818cf8 (Light Indigo)
- **Dark**: #0a0a0f (Neural Dark)
- **Highlights**: #c084fc (Light Purple)

Look for images with:
- Dark backgrounds (black, deep blue, dark purple)
- Blue/purple/indigo tones
- High contrast
- Abstract/geometric patterns
- Neural/network aesthetics

---

## ✅ Legal Compliance

All recommended sources provide:
- ✅ Free for commercial use
- ✅ No attribution required (though appreciated)
- ✅ No watermarks
- ✅ High resolution
- ✅ Royalty-free license

**Always verify** the license before use by checking the individual image page.

---

## 🚀 Next-Level Enhancements

### Consider these premium options for maximum impact:

1. **Custom 3D Renders**: Commission original neural network visualizations
2. **Motion Graphics**: Add subtle video backgrounds (Pexels Videos)
3. **Interactive Visuals**: Use Three.js for generative backgrounds
4. **AI-Generated Art**: Midjourney/DALL-E for unique abstract imagery (ensure commercial license)

---

**Questions?** Refer to each platform's license documentation or contact their support teams.
