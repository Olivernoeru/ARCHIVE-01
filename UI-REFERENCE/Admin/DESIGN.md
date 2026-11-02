---
name: Tactile Editorial Admin
colors:
  surface: '#fbf9f2'
  surface-dim: '#dbdad3'
  surface-bright: '#fbf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ed'
  surface-container: '#efeee7'
  surface-container-high: '#e9e8e1'
  surface-container-highest: '#e3e3dc'
  on-surface: '#1b1c18'
  on-surface-variant: '#4a4549'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f2f1ea'
  outline: '#7b7579'
  outline-variant: '#ccc4c9'
  surface-tint: '#605e5f'
  primary: '#1b191a'
  on-primary: '#ffffff'
  primary-container: '#302e2f'
  on-primary-container: '#999596'
  inverse-primary: '#cac5c6'
  secondary: '#615e59'
  on-secondary: '#ffffff'
  secondary-container: '#e4dfd9'
  on-secondary-container: '#65625d'
  tertiary: '#081f06'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d3418'
  on-tertiary-container: '#829e79'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e1e2'
  primary-fixed-dim: '#cac5c6'
  on-primary-fixed: '#1d1b1c'
  on-primary-fixed-variant: '#494647'
  secondary-fixed: '#e7e2dc'
  secondary-fixed-dim: '#cac6c0'
  on-secondary-fixed: '#1d1b18'
  on-secondary-fixed-variant: '#494642'
  tertiary-fixed: '#cdebc1'
  tertiary-fixed-dim: '#b2cfa7'
  on-tertiary-fixed: '#092007'
  on-tertiary-fixed-variant: '#354d2e'
  background: '#fbf9f2'
  on-background: '#1b1c18'
  surface-variant: '#e3e3dc'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system delivers an intentional, restrained soft-neumorphic operational workspace tailored for a curated single-seller thrift boutique. The overarching philosophy embodies the seller's promise: *"Walau Bekas Terasa Seperti Brand New"* (preloved goods delivered with pristine, luxury-grade care). 

The visual style departs from outdated plastic skeuomorphism and excessive blur-heavy neumorphism. Instead, it employs an architectural, tactile aesthetic built directly into an organic, paper-like foundation. It blends warm editorial minimalism with soft physical extrusions, delicate recessed planes, and crisp micro-details. The design evokes calm discipline, quality inspection, and tactile tangibility, eliminating visual fatigue across extended administrative inventory management. 

Strictly scoped to four core inventory and operational views—**Produk**, **Kategori**, **Pesanan**, and **Customer**—the design system eschews frivolous dashboard analytics, high-saturation accents, and decorative charts in favor of clean structured lists, tactile sorting states, and high-legibility typographic hierarchy.

## Colors

The palette is rooted in muted warmth, drawing inspiration from raw linen, unbleached cotton tags, and pressed archival paper. All contrasts are calibrated against the dominant Coconut White canvas to ensure legibility and subtle shadow falloff.

### Surfaces & Neutral Canvas
- **Canvas Base (`#F2F1EA`)**: Warm Coconut White. The global background against which all light highlights and shaded recessions operate.
- **Secondary Surfaces & Boundaries (`#DAD5CF`)**: Stone Gray. Used for divider lines, table headers, inactive badges, and outer soft container boundaries.
- **Surface Highlight (`#FFFFFF`)**: Pure White at varying opacities (`0.7` to `0.9`), generating the soft top-left simulated ambient light.
- **Surface Shadow (`#302E2F` at 8%–12% alpha)**: Graphite tint that anchors elevations and recessed debossings without creating muddy or uncalibrated gradients.

### Typography & High-Contrast Anchors
- **Primary Ink (`#302E2F`)**: Graphite. Delivers primary contrast for headings, data values, active icons, and high-priority states.
- **Muted Ink (`#6E6B68`)**: Softened warm carbon for metadata, SKUs, timestamps, and column labels.
- **Disabled Ink (`#9E9B95`)**: For inactive indicators, placeholder hints, and subtle structural watermarks.

### Functional & Semantic Accents
Semantics are restrained, desaturated, and naturalistic, avoiding bright digital neon tones:
- **Available / Aktif (`#5B7553`)**: Muted Sage Green. Signifies in-stock condition, published status, and completed dispatches.
- **Unavailable / Batal (`#A34836`)**: Terracotta Brick. Denotes sold-out items, cancelled transactions, and critical destructive actions.
- **Processing / Menunggu (`#A67C41`)**: Warm Ochre Amber. Expresses pending payments, items under physical QC, and orders in transit.

## Typography

Typography relies on **Plus Jakarta Sans** across all hierarchies, balancing contemporary geometric construction with soft, humane terminal strokes. This choice mirrors the tactile precision of luxury fashion retail tags.

### Hierarchy & Usage
- **Page Titles (`headline-lg`)**: Strictly reserved for primary screen designations (`Produk`, `Kategori`, `Pesanan`, `Customer`). Rendered in bold Graphite.
- **Section Headers (`headline-md`, `headline-sm`)**: Used for drawer panels, slide-out editing sheets, and modular operational groups.
- **Data Tables & Inventory Body (`body-md`, `body-sm`)**: High clarity at dense information scales. Numbers, SKU strings, and condition grades maintain crisp tabular alignment.
- **Operational Badges & Form Controls (`label-md`, `label-sm`)**: Slightly elevated letter tracking (+0.02em to +0.04em) for uppercase status indicators (`TERJUAL`, `DIPROSES`, `TERSEDIA`) to maximize scannability at small sizes.

## Layout & Spacing

The layout is structured around an anchored sidebar and fluid data stage. The navigation drawer remains locked to 260px wide, while the primary working canvas adapts fluidly to desktop and tablet viewports.

### Architectural Rhythm
- **Fixed Navigation Column**: 260px dedicated sidebar with persistent recessed tracking for the active module.
- **Main Viewport Layout**: Fluid grid spanning full workspace width with a consistent `2rem` outer page margin.
- **Table Density**: Inventory tables utilize a 48px to 56px row height with `1rem` horizontal cell padding to prevent dense thrift records (condition scores, sizing, timestamps) from crowding.
- **Drawer Panels & Modal Layers**: Fixed slide-out drawers (480px) on the right edge for detailed product updates and order inspection, maintaining background context without disruptive page reloads.

## Elevation & Depth

Depth is defined strictly through an asymmetrical dual-shadow system calibrated against the `#F2F1EA` Coconut White surface. Light emanates from the top-left at 135 degrees. No harsh black shadows or glossy gradients are permitted.

### The Tactile Shadow System
1. **Raised Flat (Default Interactive Elements & Cards)**:
   - Primary Dark Shadow: `4px 4px 10px rgba(48, 46, 47, 0.07)`
   - Primary Light Highlight: `-3px -3px 8px rgba(255, 255, 255, 0.85)`
2. **Elevated Action (Hover States & Detached Modals)**:
   - Primary Dark Shadow: `6px 6px 16px rgba(48, 46, 47, 0.09)`
   - Primary Light Highlight: `-4px -4px 12px rgba(255, 255, 255, 0.95)`
3. **Recessed / Sunken (Active Nav, Pressed Controls, Search Bars & Table Cells)**:
   - Inset Dark Shadow: `inset 2px 2px 5px rgba(48, 46, 47, 0.08)`
   - Inset Light Highlight: `inset -2px -2px 5px rgba(255, 255, 255, 0.9)`
4. **Subtle Boundary**:
   - Where soft shadows meet complex image content (like preloved garment thumbnails), a crisp `1px solid rgba(218, 213, 207, 0.6)` border prevents visual bleeding.

## Shapes

The design system adopts a balanced roundedness model (`0.5rem` / `8px` default radius). This curvature provides tangible softness while preserving the architectural rigor expected of an inventory database.

- **Primary Interactive Elements (Buttons, Inputs, Select Boxes)**: `0.5rem` (`8px`).
- **Cards, Table Shells, & Content Panes**: `1rem` (`16px`) for structural grounding.
- **Filter Chips & Status Pills**: Full-pill radius (`9999px`) to visually differentiate metadata tags from operational input controls.

## Components

### Buttons
- **Primary Raised Action**: Surface `#F2F1EA`, Graphite text `#302E2F`, raised dual-shadow. On `:hover`, shadow depth broadens subtly. On `:active` or pressed, shifts to inset dual-shadow with a 0.5px downward translation.
- **Primary Ink Action (High Priority)**: Solid Graphite `#302E2F` background, Coconut White `#F2F1EA` text. Casts a soft dark shadow `2px 4px 12px rgba(48, 46, 47, 0.2)`. Used sparingly for primary submission (e.g., "Terbitkan Produk").
- **Secondary Ghost**: Flat surface, `1px solid #DAD5CF`, zero rest elevation, transitions to subtle raised state on `:hover`.

### Inset Form Inputs & Search
- Inputs (text, number, pricing fields) utilize an explicit debossed / inset visual state:
  - Surface: `#EAE8E0` (half-tone deeper than base canvas).
  - Box Shadow: `inset 2px 2px 5px rgba(48, 46, 47, 0.07), inset -2px -2px 5px rgba(255, 255, 255, 0.8)`.
  - Focus State: Replaces inset shadow edge with a sharp `1.5px solid #302E2F` accent outline without altering the inner depth.

### Navigation Sidebar
- Modules: **Produk**, **Kategori**, **Pesanan**, **Customer**.
- Inactive items: Flat Coconut White surface, muted Graphite icon and text, seamless canvas integration.
- Active item: Immediately sinks into canvas using inset dual-shadow, accompanied by a 3px Graphite vertical indicator tag anchored on the left border.

### Status Indicators (Pills & Chips)
- Fully rounded (`9999px`) badges inset into or resting subtly on top of table rows.
- **Tersedia (Sage Green)**: Background `rgba(91, 117, 83, 0.12)`, text `#5B7553`, subtle dot indicator `#5B7553`.
- **Batal / Habis (Terracotta)**: Background `rgba(163, 72, 54, 0.12)`, text `#A34836`.
- **Menunggu / Proses (Ochre)**: Background `rgba(166, 124, 65, 0.12)`, text `#A67C41`.

### Data Tables (Inventory & Customer Manifests)
- Shell: Resting on a unified `1rem` rounded raised plate (`#F2F1EA`).
- Header: `#DAD5CF` with 40% opacity, crisp `label-sm` uppercase text in Graphite.
- Rows: Clean borders (`1px solid #DAD5CF` at 50% opacity), zero vertical grid lines. Row highlight on `:hover` gently depresses or lifts using light shadow transitions.
- Thumbnail Frame: Preloved garment images rest in a 44x44px recessed frame with a 1px protective perimeter.

### Checkboxes & Segmented Controls
- Checkboxes: 18x18px squares with `4px` rounded corners, inset shadow at rest. Checked state activates a solid Sage Green or Graphite fill with a sharp Coconut White checkmark.
- Segmented Filters (e.g., Condition Grades: "Like New", "Very Good", "Good"): Extruded pill container housing recessed sliding segments.