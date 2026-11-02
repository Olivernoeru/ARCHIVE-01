---
name: Editorial Archive / Curated Thrift
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c9c6c5'
  secondary: '#5f5e5b'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfda'
  on-secondary-container: '#63635f'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191d16'
  on-tertiary-container: '#82857c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#e5e2dd'
  secondary-fixed-dim: '#c8c6c1'
  on-secondary-fixed: '#1c1c19'
  on-secondary-fixed-variant: '#474743'
  tertiary-fixed: '#e1e4d9'
  tertiary-fixed-dim: '#c5c8be'
  on-tertiary-fixed: '#191d16'
  on-tertiary-fixed-variant: '#454840'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-hero:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Syne
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Syne
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Syne
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Syne
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.02em
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-xxl: 4rem
---

## Brand & Style

This design system establishes a high-fashion, editorial platform for rare, curated, and preloved archival garments. The visual tone balances clinical gallery minimalism with the raw tension of early-2000s independent streetwear lookbooks.

### Brand Tone & Persona
- **Curated & Authoritative:** The tone avoids typical retail desperation. There are no flash sales, oversized countdown timers, or aggressive badges. Items are presented as singular artifacts with provenance.
- **Product-First Restraint:** Surfaces step back entirely to foreground garment textures, silhouettes, and fabric grain. Whitespace is active, deliberate, and structural.
- **Subtle Y2K Typographic Tension:** The layout pairs tight modern grotesque letterforms with wide-tracked micro-caps, clinical inventory metadata, and precise technical tags.

### Visual Architecture
The aesthetic draws from contemporary lookbooks, combining crisp monochromatic contrast, hairline layout divisions, and frosted micro-surfaces. Shadows and decorative container fills are eliminated in favor of pristine image bounding boxes, stark type hierarchies, and seamless edge-to-edge grids.

## Colors

The palette is anchored in stark monochromatic values and warm mineral neutrals, reflecting archival museum mounts and natural unbleached fabrics. Accent colors are muted down to botanical and stone undertones to avoid clashing with eclectic one-off garments.

### Palette Implementation
- **Pure Black (`#0D0D0D`):** Primary ink for high-contrast headlines, primary button fills, and stark framing hairlines.
- **Deep Charcoal (`#1C1C1C`):** High-emphasis body copy, key active icons, and secondary focus states.
- **Muted Archive Slate (`#767571`):** Secondary metadata, garment condition notes, measurements, and timestamps.
- **Warm Olive Clay (`#8A8D84`):** Restrained editorial accent used exclusively for status chips ('LAST PIECE', 'JUST DROPPED') and archival micro-callouts.
- **Gallery Off-White (`#FAF9F6`):** Primary canvas background. Softens optical glare while preserving paper-like cleanliness.
- **Warm Canvas Tier (`#F5F4F0`):** Secondary surface used for elevated sheets, drawer menus, and subtle surface layering.
- **Hairline Border (`#E5E5E5`):** Structural 1px division line. Invisible at a glance, maintaining structural discipline without creating visual boundaries.
- **Sold-Out Wash (`#E8E6E1`):** Desaturated muted surface token applied over disabled or claimed artifacts.

## Typography

The typographic system relies on three coordinated type families to generate editorial friction:

1. **Display & Headlines (`Syne`):** Avant-garde geometric shapes with modern proportions provide a bold, curated presence. Used for major collection drop titles, piece names, and editorial storytelling.
2. **Editorial Utility & Micro-Labels (`Space Grotesk`):** Fixed-feel geometric sans used for technical garment sizing (e.g., `CHEST 54CM`, `ARCHIVE 2003`), uppercase metadata badges, price tags, and table labels. Set consistently in uppercase with expanded kerning (`0.08em` to `0.14em`).
3. **Primary Body Text (`Inter`):** Neutral, utilitarian sans-serif ensuring legibility for item condition disclosures, material breakdowns, fabric origins, and checkout workflows.

## Layout & Spacing

The layout philosophy follows a high-fashion printed lookbook. Layouts emphasize vertical flow, asymmetric pairings, and generous breathing room around visual assets.

### Grid System
- **Mobile (Base up to 767px):** 2-column or 4-column fluid layout with `margin: 1rem` (16px) and `gutter: 1rem` (16px). Product listings default to a rhythmic alternating grid: 2-across balanced grid transitioning into full-bleed single portrait showcases.
- **Tablet (768px – 1023px):** 6-column grid with `margin: 2rem` (32px) and `gutter: 1.25rem` (20px).
- **Desktop (1024px and up):** 12-column rigid frame with a maximum boundary of `1440px`, centered, with `margin: 3rem` (48px) and `gutter: 1.5rem` (24px).

### Spacing Principles
- Never trap content inside nested cards or dense container blocks. Space is established through `space-xl` and `space-xxl` gaps rather than filled boxes.
- Image assets dictate vertical rhythm. Margins between product imagery and its metadata label are kept tightly paired (`space-xs` to `space-sm`), while gaps between separate items are wide (`space-xl` to `space-xxl`).

## Elevation & Depth

This design system avoids traditional drop shadows and skeuomorphic blur stacks. Depth is achieved through layer flat-stacking, hairline containment, and frosted glass.

### Elevation Levels
- **Level 0 (Flat Surface):** Base application layer in `#FAF9F6`. All cards, copy, and vertical feeds inhabit this planar level.
- **Level 1 (Hairline Containment):** Product containers and segment lines defined strictly by 1px solid borders (`#E5E5E5`). No shadow offset.
- **Level 2 (Floated Navigation Glass):** The bottom floating navigation and micro fly-out filters. Implemented with `backdrop-filter: blur(16px)`, a 75% translucent `#FAF9F6` tint, and a 1px solid border in `rgba(13, 13, 13, 0.08)`.
- **Level 3 (Modal & Editorial Drawers):** Cart overlays and condition check side-sheets. Monolithic sheets sliding in on `#FAF9F6`, separated from the dimmed canvas by a 20% opacity black shroud (`rgba(13, 13, 13, 0.2)`).

## Shapes

The primary shape language is strictly architectural and razor-sharp (`roundedness: 0`), reinforcing brutalist, print-editorial discipline. 

### Corner Geometry
- **Primary Elements (0px):** Product image masks, form input borders, modular category blocks, collection banners, and primary CTA action buttons use hard right angles (`0px`).
- **Interactive Micro-Pills (Intentional Exception):** Floating navigational docks, micro-status tags (`JUST DROPPED`, `LAST PIECE`), and tag chips use full pill radiuses (`9999px`). This stark juxtaposition between hyper-sharp rectangular imagery and soft ergonomic pill controls creates the Y2K digital aesthetic.

## Components

### 1. Floating Bottom Navigation Dock
- **Form Factor:** Pill container floating 24px above viewport bottom, horizontally centered. Maximum width 360px on mobile; adapts to compact fixed console on larger screens.
- **Material:** Ultra-sheer milky backdrop blur (`rgba(250, 249, 246, 0.85)`, `backdrop-filter: blur(20px)`), anchored by a 1px hairline border in `rgba(13, 13, 13, 0.12)`.
- **Items:** 5 tabs (Home, New, Wishlist, Cart, Profile).
- **Active State:** Solid circular 4px dot beneath icon or high-contrast filled micro-pill icon shift. Inactive icons set to `#767571` at 70% opacity.
- **Cart Indicator:** Minimalist numeric superscript in `Space Grotesk` (e.g., `[1]`), avoiding garish red notification dots.

### 2. Editorial Product Cards
- **Aspect Ratio:** Fixed vertical portrait ratios only (`3:4` on listings, `4:5` on dedicated product detail views).
- **Surface:** `#F5F4F0` placeholder background behind clean garment cutouts and street-cast photography. No box shadows.
- **Metadata Block:** Aligned flush left beneath image frame with `space-sm` gap:
  - Top row: Garment Title (`headline-sm`, sentence case, strict `#0D0D0D`).
  - Middle row: Precise Sizing and Category code (`label-mono`, `#767571`, e.g., `SIZE M / ARCHIVE 2002`).
  - Bottom row: Currency Price (`label-mono`, `#0D0D0D`, e.g., `$185.00`).
- **Hover/Tap State:** Secondary image swap (detail/tag shot) via instant cut transition (no sliding carousel animations).

### 3. Inventory State Badges
- **Normal:** Clean price display without badge clutter.
- **'JUST DROPPED':** Micro-pill anchored to top-left of image frame. Translucent off-white core (`rgba(250, 249, 246, 0.9)`), 1px solid `#0D0D0D`, uppercase `label-caps` in `#0D0D0D`.
- **'LAST PIECE':** Subtle micro-capsule badge. Muted tone fill (`#8A8D84`), pure white text, uppercase `label-caps`, communicating scarce vintage inventory without aggressive urgency styling.
- **'SOLD OUT':** Applied directly across the product entity:
  - Entire card drops to `50%` opacity with a CSS `grayscale(100%)` filter.
  - Centered stark rectangular badge across portrait: solid `#0D0D0D` fill, crisp white uppercase `label-caps` with wide letter-spacing: `ARCHIVE SOLD`.

### 4. Buttons & CTAs
- **Primary CTA:** Full-width sharp rectangle (`rounded: 0px`). Solid `#0D0D0D` background, `#FAF9F6` typography (`label-caps`), 52px total height. Hover shifts to `#1C1C1C` with subtle text indent.
- **Secondary / Ghost CTA:** 1px hairline perimeter in `#0D0D0D`, transparent canvas, solid `#0D0D0D` typography.
- **Interactive Micro-Actions (Wishlist Heart / Bag Quick-Add):** Frameless 32x32px hit areas with minimalist 1.25px stroke geometry.

### 5. Input Fields & Form Controls
- **Text Inputs:** Minimalist architectural bottom-border style. 1px solid `#E5E5E5` underline, increasing to 1.5px `#0D0D0D` upon focus. Zero background fills. Text input rendered in `body-lg` with floating label transitioning into `label-caps`.
- **Address & Filter Selectors:** Clean accordion lists segmented by edge-to-edge 1px hairline dividers (`#E5E5E5`). Toggled chevron transitions seamlessly without enclosed dropdown frames.
- **Checkboxes & Radios:** Minimal 16x16px square enclosures (`rounded: 0px`). Checked state is a solid inner black square block with a 2px offset gap, eschewing standard rounded checkmarks.

### 6. Archival Garment Condition Matrix
- Custom component for vintage items: 5-point hairline gauge indicating piece preservation (`Deadstock`, `Mint`, `Gently Used`, `Distressed / Repaired`).
- Rendered as a single horizontal 1px line divided into 4 segments with an active solid black block marker and accompanying condition notes set in `body-sm`.