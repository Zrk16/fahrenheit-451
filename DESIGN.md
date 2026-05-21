# Fahrenheit 451 — Design Spec

## Colors
- --bg: #E8E4DC
- --surface: #DEDAD2
- --surface-dark: #252220
- --text: #2C2C2C
- --text-muted: #6B6563
- --text-inverse: #E8E4DC
- --accent: #C4390F
- --accent-warm: #F5A623
- --redact: #1A1A18
- --accent-rgb: 196, 57, 15
Strategy: Drenched (two worlds) — surface is dead ash-gray. Ember-red (#C4390F) appears only on interaction. The palette looks dead in screenshots; it lives when touched.

## Typography
- Display: 'Cormorant Garamond', serif — headlines, pull quotes, hero text, chapter numbers
- Body: 'Space Grotesk', sans-serif — nav links, body copy, labels, UI elements, eyebrows
- Scale: 14px / 16px / 20px / 24px / 32px / 48px / 72px+
- Google Fonts: https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600&display=swap

## Spacing
- --space-xs: 0.5rem
- --space-sm: 1rem
- --space-md: 1.5rem
- --space-lg: 2rem
- --space-xl: 4rem
- --space-2xl: 8rem
- --space-3xl: 12rem

## Radius
- --radius-sm: 2px
- --radius-md: 4px
- --radius-lg: 8px

## Motion
- Reveal easing: cubic-bezier(0.16, 1, 0.3, 1)
- Micro-interaction duration: 200ms
- Reveal duration: 700ms
- Stagger delay: 80ms per element
- Redact bar reveal: 600ms cubic-bezier(0.4, 0, 0.2, 1) via transform scaleX

## Layout Notes
- index.html hero: full-screen near-black (#1A1A18), centered, no background texture
- Characters page: name in giant Cormorant (left, ~40% wide), details right — intentionally breaks card grid
- Themes page: 3 full-bleed sections, alternating left/right text alignment
- Books page: irregular grid — varying card heights to avoid identical repeating cards
- Asymmetric must appear in at least one layout per page

## Background Treatment
- All pages: SVG grain texture overlay via body::after, opacity 0.035
- Dark sections: #252220 (slightly warmer charcoal for visual depth)
- Hero on index.html: no grain — pure isolation

## The Burn Mechanic (Core Interaction)
Wrap text in `.redacted` span. The ::before pseudo-element covers text with a dark bar.
On hover: bar collapses via scaleX(0) with transform-origin right center, revealing text.
Usage: `<span class="redacted">hidden text here</span>`
Touch devices: tap to toggle `.redacted--revealed` class via JS

## Navigation
- Fixed top, full-width
- Logo: "F°451" — Cormorant Garamond, "°" in --accent
- Links: Space Grotesk, 0.7rem, uppercase, letter-spacing 0.18em
- Default: transparent background (pages open with dark hero)
- Scrolled: rgba(37, 34, 32, 0.92) + backdrop-filter blur(16px)
- Hide on scroll down >200px, show on scroll up
- Mobile: hamburger → full-screen overlay

## Premium Features
All pages include:
- Lenis smooth scroll (lerp 0.1)
- Custom cursor (dot + ring, ember-red)
- Custom scrollbar (ember-red thumb)
- Custom selection (ember-red)
- Scroll progress bar (ember-red, 3px, top)

index.html and story.html also include:
- GSAP ScrollTrigger for scroll-pinned reveals
- Word-by-word text splitting for pull quotes

## Pages
1. index.html — Home / The World
2. story.html — The Story (3 Parts)
3. characters.html — Characters
4. themes.html — Themes
5. books.html — The Forbidden Library

## Nav HTML (copy into every page)
```html
<div class="scroll-progress" id="scrollProgress"></div>
<div class="cursor" id="cursor"></div>
<div class="cursor-follower" id="cursorFollower"></div>

<nav class="nav" id="mainNav">
  <a href="index.html" class="nav__logo">F<span>°</span>451</a>
  <ul class="nav__links">
    <li><a href="index.html" class="nav__link">Home</a></li>
    <li><a href="story.html" class="nav__link">The Story</a></li>
    <li><a href="characters.html" class="nav__link">Characters</a></li>
    <li><a href="themes.html" class="nav__link">Themes</a></li>
    <li><a href="books.html" class="nav__link">The Books</a></li>
  </ul>
  <button class="nav__hamburger" id="navHamburger" aria-label="Toggle menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="nav__overlay" id="navOverlay" aria-hidden="true">
  <ul>
    <li><a href="index.html" class="nav__link">Home</a></li>
    <li><a href="story.html" class="nav__link">The Story</a></li>
    <li><a href="characters.html" class="nav__link">Characters</a></li>
    <li><a href="themes.html" class="nav__link">Themes</a></li>
    <li><a href="books.html" class="nav__link">The Books</a></li>
  </ul>
</div>
```

## Footer HTML (copy into every page)
```html
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__left">
      <p class="footer__logo">F<span>°</span>451</p>
      <p class="footer__quote">"A book is a loaded gun<br>in the house next door."</p>
    </div>
    <nav class="footer__nav">
      <a href="index.html" class="footer__link">Home</a>
      <a href="story.html" class="footer__link">The Story</a>
      <a href="characters.html" class="footer__link">Characters</a>
      <a href="themes.html" class="footer__link">Themes</a>
      <a href="books.html" class="footer__link">The Books</a>
    </nav>
    <p class="footer__copy">Fahrenheit 451 — Ray Bradbury, 1953 · Companion Site</p>
  </div>
</footer>
```

## Aesthetic Direction
- Tone: Surveillance-state-breaks-open — clinical gray world that reveals fire through interaction
- Differentiator: The Burn Mechanic — black bars cover text; hover peels them back with smoldering edge
- Anti-references: NOT dark fire website with orange gradients, NOT school-report layout with sidebars, NOT gothic horror
