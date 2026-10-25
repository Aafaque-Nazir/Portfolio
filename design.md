# Design System & Engineering Editorial Guidelines
### Nazir Aafaque Sufiyan · Portfolio & Publication Standards

> **Core Philosophy**: True craftsmanship is quiet, deliberate, and confident. High-end engineering publications (Stripe Press, Linear Method, Vercel Blog, Paco Coursey, Lee Robinson) rely on exquisite typography, intentional whitespace, and crisp monochromatic contrast — never flashy neon gimmicks or AI-generated design slop.

---

## 1. Strictly Prohibited: AI Slop & Cheap Gimmicks ("Chapri" Anti-Patterns)

The following anti-patterns are strictly banned across this entire codebase:

| Banned Element | Why It Looks Cheap / AI-Generated | Replacement Standard |
|---|---|---|
| **Pulsing / Blinking Dots** (`animate-pulse`) | Classic cookie-cutter AI landing page template trope. | Static, quiet typographic hierarchy. No blinking lights. |
| **Pill / Capsule Overload ("Pattiya")** | Encasing every piece of metadata in rounded border capsules clutters the visual field. | Quiet text with natural typographic separators (`·` or `/`) and muted colors (`text-zinc-500`). |
| **Neon Glows & Radiative Shadows** (`shadow-[0_0_35px_...]`) | Looks like a low-tier crypto / Web3 token site. | Clean 1px borders (`border-zinc-850` or `border-white/10`) with subtle backdrop-blur or natural ambient depth. |
| **AI Sparkle Icons** (`RiSparklingFill` on summaries) | Instantly screams "ChatGPT generated this summary box". | Elegant editorial labeling: "Key Takeaways" or "Executive Summary" with quiet, clean serif/sans typography. |
| **Loud Primary-Colored Badges** (Red, Yellow, Cyan pills everywhere) | Visual noise that destroys reading flow. | Monochromatic base with subtle semantic accents only where strictly functional. |
| **Over-sized Neon CTA Buttons** (`bg-cyan-400 text-black font-black uppercase`) | Disrupts editorial reading; looks like an aggressive popup ad. | Minimal inline text links with hover transitions or quiet ghost/secondary buttons. |
| **Rainbow Node Diagrams** | Nodes colored in bright red, green, blue, yellow like a kindergarten chart. | Monochromatic, architectural wireframe style: matte dark cards with crisp 1px borders and neutral typography. |

---

## 2. The Editorial Design Principles

### A. Typography as Interface
- **Primary Typeface**: Monospace accents for technical precision (`font-mono`), balanced with clean, high-legibility sans for prose.
- **Prose Measure**: Keep article body width constrained (`max-w-2xl` to `max-w-3xl`, 65–75 characters per line). Long line lengths cause eye fatigue.
- **Rhythm & Hierarchy**:
  - H1: `text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-100`
  - H2: `text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100 mt-12 mb-4`
  - H3: `text-lg font-medium text-zinc-200 mt-8 mb-3`
  - Body: `text-zinc-300 text-base leading-relaxed font-normal`
  - Metadata: `text-zinc-500 font-mono text-xs tracking-normal`

### B. Color Palette: The Obsidian Scale
- **Background Base**: Pure Black `#000000` / Obsidian `#09090b`
- **Surface Elevation 1**: `#0f0f12` (Card and panel backgrounds)
- **Surface Elevation 2**: `#18181b` (Hover states, subtle controls)
- **Borders**: `rgba(255, 255, 255, 0.08)` or `#27272a` (1px, crisp, hairline)
- **Text Primary**: `#fafafa` (Headings, titles, high-emphasis)
- **Text Secondary**: `#a1a1aa` (Body text, readable contrast)
- **Text Muted**: `#71717a` (Timestamps, tags, secondary metadata)
- **Technical Accent (Sparse & Intentional)**: Soft Cyan `#38bdf8` or Emerald `#34d399` used *only* for active interactive highlights and critical indicators.

### C. Layout Architecture

#### Blog Index (`/blog`)
- Clean, uncluttered header with a quiet editorial subtitle.
- **Category Filter**: Minimalist text tabs with an active underline or soft white state — no rounded plastic capsules.
- **Featured Article**: Prominent through scale, typography, and layout — not through neon borders or giant buttons.
- **Article Grid / Feed**: Clean rows or cards where the title, excerpt, and timestamp breathe.
- **Search**: Integrated, quiet search input with subtle borders.

#### Blog Post Detail (`/blog/[slug]`)
- **Header**: Quiet breadcrumbs, title with real editorial gravity, author attribution, date, and reading time.
- **Executive Summary / Quick Answer**: A clean, matte callout with a subtle left accent line — no AI sparkles.
- **Code Blocks**: Clean terminal with dark neutral background, quiet chrome, unobtrusive copy button.
- **Architecture Diagrams**: Clean wireframe flowchart styling with neutral nodes, crisp connector arrows, and readable monospace labels.
- **Table of Contents**: Unobtrusive sticky or in-page navigation that guides the reader without screaming for attention.
- **Callouts**: Minimal blockquote-inspired callouts with subtle tonal separation.

---

## 3. Implementation Checklist for Every Component

- [ ] Does this look like an engineer or designer built it for humans, or does it look like an AI template?
- [ ] Are there any pulsing animations, neon dropshadows, or sparkle emojis? If yes, remove them.
- [ ] Is metadata formatted cleanly without unnecessary border capsules?
- [ ] Is contrast WCAG AA compliant with dark mode background?
- [ ] Does typography have intentional breathing room (`margin`, `padding`, `line-height`)?
- [ ] Is the reading width comfortable on desktop and mobile?
