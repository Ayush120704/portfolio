# Ayush Mishra — Portfolio

A cutting-edge 3D portfolio website built with Next.js, React Three Fiber, GSAP, and Tailwind CSS v4.

**Live:** [ayush-12-portfolio.netlify.app](https://ayush-12-portfolio.netlify.app/)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| 3D | React Three Fiber + drei + Three.js + postprocessing |
| Animation | GSAP ScrollTrigger + Framer Motion |
| Styling | Tailwind CSS v4 |
| State | Zustand |
| Language | TypeScript (strict) |

## Features

- **Interactive 3D Hero** — Three.js scene with 2000 GPU particles, floating wireframe geometry, bloom, chromatic aberration, and vignette
- **Cursor Spotlight Lighting** — Radial gradient that follows your mouse across the entire page
- **3D Tilt Cards** — Project and skill cards that rotate in 3D with glare reflections on hover
- **Typewriter Effect** — Terminal-style self-typing title in the hero section
- **Animated Counters** — Stats count up with easing when scrolled into view
- **Infinite Marquee** — Auto-scrolling tech stack ticker at the bottom of the hero
- **Magnetic Buttons** — CTA buttons that follow your cursor with spring physics
- **GSAP ScrollTrigger** — Section headings and cards animate in as you scroll
- **Custom Cursor** — Dual-layer cursor (dot + ring) with variant states for links/buttons
- **Dark/Light Theme** — Toggle with full color system and glassmorphism
- **Netlify Forms** — Contact form with validation, honeypot spam protection, and loading states
- **Full-Screen Mobile Menu** — Animated overlay navigation on mobile
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **SEO Optimized** — Open Graph, Twitter cards, JSON-LD structured data
- **Loading Screen** — Animated progress bar with gradient effects

## Getting Started

```bash
cd portfolio-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Static output is generated in the `out/` directory.

## Deployment (Netlify)

| Setting | Value |
|---------|-------|
| Base directory | `portfolio-website` |
| Build command | `npx next build` |
| Publish directory | `portfolio-website/out` |

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Theme vars, Tailwind v4, animations
│   ├── layout.tsx           # SEO metadata, JSON-LD, fonts
│   ├── page.tsx             # Server component entry
│   └── global-error.tsx     # Error boundary
├── components/
│   ├── 3d/
│   │   ├── HeroScene.tsx        # R3F canvas + postprocessing
│   │   ├── ParticleField.tsx    # 2000 GPU particles
│   │   ├── FloatingGeometry.tsx # Wireframe shapes
│   │   └── SkillsOrb.tsx        # 3D skill tags
│   ├── sections/
│   │   ├── HeroSection.tsx      # Typewriter + counters + marquee
│   │   ├── AboutSection.tsx     # Bio + tilt info cards
│   │   ├── ProjectsSection.tsx  # 7 GitHub-linked project cards
│   │   ├── SkillsSection.tsx    # 6 category skill grids
│   │   ├── ExperienceSection.tsx# Timeline with glow dots
│   │   ├── ContactSection.tsx   # Netlify form + contact links
│   │   └── Footer.tsx           # Social links + credits
│   ├── ui/
│   │   ├── Navbar.tsx           # Glass nav + mobile overlay
│   │   ├── MouseTracker.tsx     # Custom dual-layer cursor
│   │   ├── SpotlightEffect.tsx  # Global mouse-tracking light
│   │   ├── TiltCard.tsx         # 3D tilt + glare wrapper
│   │   ├── AnimatedCounter.tsx  # Count-up animation
│   │   ├── MarqueeText.tsx      # Infinite scrolling text
│   │   ├── MagneticButton.tsx   # Spring-physics button
│   │   ├── LoadingScreen.tsx    # Animated loader
│   │   └── CursorProvider.tsx   # Cursor context
│   └── PortfolioPage.tsx        # Client wrapper + GSAP setup
├── hooks/
│   └── useMousePosition.ts      # Smoothed mouse tracking
└── lib/
    ├── data.ts                  # All content & config
    └── store.ts                 # Zustand global state
```

## Customization

Edit `src/lib/data.ts` to update:
- Personal info (name, email, phone, bio)
- Projects (GitHub URLs, descriptions, technologies)
- Skills (categories and items)
- Experience (timeline entries)
- Stats (animated counters)
- Social links (LinkedIn, Twitter — add URLs to `personalInfo`)

## Contact

**Ayush Mishra** — [aayumishra2024@gmail.com](mailto:aayumishra2024@gmail.com)

- [GitHub](https://github.com/Ayush120704)
- [LeetCode](https://leetcode.com/u/ayushmishra12345/)
