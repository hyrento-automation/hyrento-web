# CarRental.digital — Master Development & Design System Prompt
### A Product of **Maruti Digital India**
**Version 2.0 | Full Technical + Design + Automation Blueprint**

---

> **Parent Company:** Maruti Digital India
> **Product:** CarRental.digital
> **Tagline:** The Complete Operating System for Car Rental Businesses
> **Markets:** United States & Europe
> **Document Purpose:** Complete developer + designer reference covering tech stack, design system, responsiveness, automation, mega menus, download section, and future feature roadmap.

---

---

# PART 1 — PARENT COMPANY & BRANDING HIERARCHY

---

## 1.1 Company Identity

**Maruti Digital India** is the parent technology company behind CarRental.digital. This relationship should be reflected across the website as follows:

- **Footer bottom bar (small text):** "CarRental.digital is a product of **Maruti Digital India** — Building Digital Infrastructure for Global Industries."
- **About Page:** Dedicate a sub-section titled "The Company Behind the Product" with a brief introduction to Maruti Digital India, its mission, and its portfolio of digital products. Include a link to the Maruti Digital India corporate website.
- **Legal pages (Privacy Policy, Terms of Service):** Use "Maruti Digital India" as the legal operating entity name.
- **Favicon + Logo:** CarRental.digital has its own logo. Maruti Digital India logo appears only in the footer and About page — not in the main nav.
- **Meta tags:** Include `<meta name="author" content="Maruti Digital India">` on all pages.
- **Trust Signal:** On the About page and Contact page, add the badge: *"Backed by Maruti Digital India — Trusted Technology from India, Built for the World."*

---

---

# PART 2 — COMPLETE TECH STACK

---

## 2.1 Frontend Framework

**Primary:** Next.js 14+ (App Router)
- Use React Server Components (RSC) where possible for performance
- Pages directory ONLY for legacy compatibility if needed — prefer App Router
- Use `next/image` for all images and GIFs (automatic WebP conversion, lazy loading)
- Use `next/font` to load Inter and DM Sans with zero layout shift
- Use `next/link` for all internal navigation (prefetching built-in)

**Why Next.js:** Server-side rendering (SSR) for SEO, static generation (SSG) for marketing pages, incremental static regeneration (ISR) for blog/CMS-driven content, and edge functions for geolocation-based language routing.

---

## 2.2 Styling System

**Primary CSS Framework:** Tailwind CSS v3.4+
- Configure full custom design tokens in `tailwind.config.js` (colors, fonts, spacing, shadows — see Part 3)
- Use `@layer components` for reusable component classes
- Never use inline styles; all styling via Tailwind utility classes or component layer

**Component Library:** shadcn/ui (built on Radix UI primitives)
- Use for: Accordion (FAQ), Dialog (modals), Tabs (feature sections), DropdownMenu (nav), Sheet (mobile menu), Tooltip, Switch (pricing toggle)
- Fully headless — styled with Tailwind, matches the design system exactly

**Animation Library:** Framer Motion
- Page transitions, scroll-triggered animations, tab switching animations
- Mega menu open/close with smooth easing
- Hero GIF entrance animation
- Staggered card reveals on scroll

**Icon Library:** Lucide React
- Consistent 24×24 stroke icons throughout
- Supplement with custom SVG icons for feature tabs and trust badges

---

## 2.3 Backend & API Layer

**Runtime:** Node.js 20 LTS
**API Framework:** Next.js API Routes (built-in) for simple endpoints + tRPC for type-safe internal API calls

**Form Handling:**
- React Hook Form + Zod for validation
- All contact forms, demo booking forms, and newsletter forms
- On submission → POST to internal API route → forward to CRM

**CRM Integration:**
- Primary: HubSpot (via HubSpot REST API v3)
- Fallback/Alternative: Pipedrive
- Every form submission creates a contact + deal in the CRM pipeline automatically
- Tag contacts by: source page, fleet size, plan interest, country

**Email Autoresponder:**
- Trigger: On CRM contact creation
- Service: SendGrid or Resend (Resend preferred for Next.js)
- Templates: Branded HTML email with CarRental.digital logo, welcome text, and "Book Your Demo" CTA
- Sequences: 3-email welcome sequence (Day 0, Day 2, Day 5)

**Live Chat:**
- Crisp Chat (preferred) or Intercom
- Embed script in `<head>` via Next.js Script component with `strategy="afterInteractive"`
- Route to WhatsApp Business as fallback during off-peak hours
- Configure auto-messages: "Hi! Need a demo or have questions about CarRental.digital?" triggered after 30 seconds on any page

---

## 2.4 CMS (Content Management)

**Headless CMS:** Sanity.io v3
- Use for: Blog posts, FAQ items, Testimonials, Team members, Case studies, Feature descriptions, Brochure PDF uploads (for Download section)
- Sanity Studio hosted at `/studio` route (protected, admin-only)
- Use Sanity's CDN for image delivery (GROQ queries)
- No developer needed to update blog, testimonials, or download files

**Content Types to define in Sanity:**
1. `blogPost` — title, slug, category, author, body (Portable Text), SEO fields, publishedAt
2. `testimonial` — name, company, country, quote, photo, rating
3. `faqItem` — question, answer, category (General / Pricing / Technical)
4. `teamMember` — name, title, photo, bio, linkedIn
5. `caseStudy` — companyName, fleetSize, country, challenge, solution, result, logo
6. `brochure` — title, description, fileURL (PDF), language (EN/DE/FR/ES/NL), uploadedAt, thumbnailImage
7. `featureSection` — tabName, headline, bodyText, gifURL, bulletPoints, planBadge

---

## 2.5 Database (for SaaS App Features — future)

**Primary Database:** PostgreSQL (via Supabase)
- Supabase gives: Postgres DB + Auth + Realtime + Storage + Row-Level Security (RLS)
- Tables: users, plans, subscriptions, audit_logs

**ORM:** Prisma (type-safe, works perfectly with Next.js + PostgreSQL)

**Caching Layer:** Redis (via Upstash — serverless Redis)
- Cache: pricing data, feature lists, blog post lists
- TTL: 1 hour for most content; 5 minutes for live-updating stats

---

## 2.6 Authentication (Admin/Login)

**Auth Provider:** NextAuth.js v5 (Auth.js)
- Google OAuth + Email/Password
- Role-based: `admin`, `staff`, `viewer`
- JWT sessions stored in HTTP-only cookies

---

## 2.7 Payments (for subscription management — future)

**Payment Processor:** Stripe
- Products: Starter (€160/q), Professional, Enterprise plans
- Billing: Quarterly + Yearly subscriptions
- Stripe Customer Portal for self-serve plan changes, invoice downloads
- Webhooks: `invoice.paid`, `customer.subscription.deleted`, `payment_intent.failed` → update Supabase subscription status

---

## 2.8 Hosting & Deployment

**Frontend / Marketing Site:** Vercel
- Enable Edge Network for global CDN
- Configure: US (iad1) + Europe (fra1) regions for low latency
- Automatic preview deployments on every PR
- Environment variables managed via Vercel dashboard

**Database:** Supabase (EU region: `eu-central-1` Frankfurt for GDPR; US region: `us-east-1` for US users)

**CMS:** Sanity.io CDN (global)

**File/Asset Storage:** Cloudflare R2 (S3-compatible, zero egress fees)
- Store: GIFs, brochure PDFs, team photos, case study images

**Domain & DNS:** Cloudflare
- DNSSEC enabled
- DDoS protection
- WAF (Web Application Firewall) rules

---

## 2.9 SEO & Analytics Stack

**SEO:**
- Next.js Metadata API (`generateMetadata`) for dynamic page meta
- `next-sitemap` for automatic XML sitemap generation
- `schema-dts` for structured data (Organization, SoftwareApplication, FAQ, Review schemas)
- Canonical URLs on all pages
- Open Graph + Twitter Card meta on every page
- Hreflang tags for all 5 language variants (en, de, fr, es, nl)

**Analytics:**
- Google Analytics 4 (via `@next/third-parties/google`)
- Microsoft Clarity (heatmaps + session recordings) — loaded with `strategy="lazyOnload"`
- Custom event tracking: `demo_booked`, `trial_started`, `pricing_viewed`, `brochure_downloaded`, `chat_opened`

**Cookie Consent:**
- CookieYes or Cookiebot (GDPR-compliant)
- Blocks GA4 and Clarity scripts until user consents
- Banner appears on first visit with: "Accept All" / "Manage Preferences"

---

## 2.10 Internationalisation (i18n)

**Library:** `next-intl`
- Locale routes: `/en`, `/de`, `/fr`, `/es`, `/nl`
- Auto-detect browser language → redirect to matching locale
- Translation files: JSON in `/messages/{locale}.json`
- Language switcher in nav header (right side) and footer

---

## 2.11 Performance Tools

- `next/image` with `priority` flag on hero image/GIF
- GIF optimization: convert all GIFs to `.webm`/`.mp4` video loops using `ffmpeg` (90% smaller file size, same visual effect) — use `<video autoplay loop muted playsinline>` tags
- Font: load Inter + DM Sans via `next/font/google` (zero layout shift, preloaded)
- Bundle analysis: `@next/bundle-analyzer`
- Lazy load below-fold sections with `react-intersection-observer`
- Prefetch demo/pricing pages on hover

---

## 2.12 Dev Tools & Workflow

**Version Control:** GitHub (private repository)
**CI/CD:** GitHub Actions → Vercel (automatic on push to `main`)
**Code Quality:** ESLint + Prettier + Husky pre-commit hooks
**Type Safety:** TypeScript (strict mode)
**Testing:** Playwright (E2E) + Vitest (unit tests)
**Error Monitoring:** Sentry (Next.js SDK)
**Package Manager:** pnpm (faster than npm/yarn)

---

---

# PART 3 — COMPLETE COLOUR SYSTEM

---

## 3.1 Primary Brand Palette

> **Design Rule:** The website uses a LIGHT BACKGROUND system throughout. Dark navy is used ONLY for accent bands, footers, and CTA sections — never as a page background.

| Token Name | Hex Code | Usage |
|---|---|---|
| `brand-navy` | `#0A1628` | Footer, dark CTA bands, hero text, logo |
| `brand-blue` | `#2563EB` | Primary links, icon accents, active states, tab underlines |
| `brand-blue-light` | `#3B82F6` | Button hover states, gradient starts |
| `brand-blue-pale` | `#EFF6FF` | Card backgrounds, feature section tints, mega menu backgrounds |
| `brand-green` | `#16A34A` | ALL primary CTA buttons, success states, checkmarks, badges |
| `brand-green-hover` | `#15803D` | Green button hover state |
| `brand-green-pale` | `#F0FDF4` | Trust badge backgrounds, plan card highlights |

---

## 3.2 Neutral / Background Palette

| Token Name | Hex Code | Usage |
|---|---|---|
| `bg-base` | `#FFFFFF` | Primary page background (all pages) |
| `bg-soft` | `#F8FAFC` | Section alternating backgrounds, card surfaces |
| `bg-subtle` | `#F1F5F9` | Input fields, table rows, hover backgrounds |
| `bg-border` | `#E2E8F0` | Dividers, card borders, table lines |
| `text-primary` | `#0F172A` | Main body text, headings |
| `text-secondary` | `#475569` | Subheadings, captions, helper text |
| `text-muted` | `#94A3B8` | Placeholder text, disabled states |
| `text-inverse` | `#FFFFFF` | Text on dark navy backgrounds |

---

## 3.3 Semantic / Status Colours

| Token Name | Hex Code | Usage |
|---|---|---|
| `status-success` | `#16A34A` | Checkmark icons, "included" items |
| `status-error` | `#DC2626` | "Not included" items, error states |
| `status-warning` | `#D97706` | Alerts, notices |
| `status-info` | `#2563EB` | Info banners, links |
| `online-dot` | `#22C55E` | Live chat "online" indicator |

---

## 3.4 Gradient Definitions

```
Hero section gradient overlay (left to right, subtle):
  from: #FFFFFF → to: #EFF6FF (white to pale blue)

Dark CTA band background:
  from: #0A1628 → to: #0F2144 (deep navy, slight gradient)

Pricing "Most Popular" card border:
  from: #2563EB → to: #16A34A (blue to green diagonal gradient stroke)

Feature tab active underline:
  from: #2563EB → to: #3B82F6

Stats number text (large counters):
  from: #2563EB → to: #16A34A (left to right)
```

---

## 3.5 Shadow Definitions

```
card-shadow-sm:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)
card-shadow-md:  0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)
card-shadow-lg:  0 10px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.05)
card-shadow-blue: 0 8px 32px rgba(37,99,235,0.15)   ← for highlighted/active cards
mega-menu-shadow: 0 20px 60px rgba(0,0,0,0.12)
button-shadow:    0 4px 14px rgba(22,163,74,0.35)   ← green CTA buttons
```

---

---

# PART 4 — TYPOGRAPHY SYSTEM

---

## 4.1 Font Families

**Heading Font:** DM Sans (Google Fonts)
- Weights loaded: 500 (Medium), 600 (SemiBold), 700 (Bold)
- Use for: H1, H2, H3, nav items, pricing numbers, stat counters

**Body Font:** Inter (Google Fonts)
- Weights loaded: 400 (Regular), 500 (Medium)
- Use for: Body paragraphs, bullet points, captions, form labels, footer

**Monospace (code/API docs only):** JetBrains Mono
- Use for: API documentation page code blocks only

**Load via `next/font/google`:**
```js
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})
```

---

## 4.2 Type Scale

| Element | Font | Size (desktop) | Size (mobile) | Weight | Letter Spacing | Line Height |
|---|---|---|---|---|---|---|
| H1 Hero | DM Sans | 64px / 4rem | 36px / 2.25rem | 700 Bold | -0.03em | 1.10 |
| H1 Page | DM Sans | 52px / 3.25rem | 32px / 2rem | 700 Bold | -0.025em | 1.15 |
| H2 Section | DM Sans | 40px / 2.5rem | 28px / 1.75rem | 600 SemiBold | -0.02em | 1.2 |
| H3 Card Title | DM Sans | 24px / 1.5rem | 20px / 1.25rem | 600 SemiBold | -0.01em | 1.3 |
| H4 Sub | DM Sans | 18px / 1.125rem | 16px / 1rem | 500 Medium | 0 | 1.4 |
| Body Large | Inter | 18px / 1.125rem | 16px / 1rem | 400 Regular | 0 | 1.7 |
| Body Default | Inter | 16px / 1rem | 15px / 0.9375rem | 400 Regular | 0 | 1.65 |
| Body Small | Inter | 14px / 0.875rem | 13px / 0.8125rem | 400 Regular | 0 | 1.6 |
| Caption | Inter | 12px / 0.75rem | 12px / 0.75rem | 500 Medium | 0.02em | 1.5 |
| Nav Link | DM Sans | 15px / 0.9375rem | — | 500 Medium | 0 | 1 |
| Pricing Number | DM Sans | 48px / 3rem | 36px / 2.25rem | 700 Bold | -0.03em | 1 |
| Stats Counter | DM Sans | 56px / 3.5rem | 36px / 2.25rem | 700 Bold | -0.04em | 1 |
| Button Text | DM Sans | 15px / 0.9375rem | 14px / 0.875rem | 600 SemiBold | 0.01em | 1 |
| Badge/Label | Inter | 12px / 0.75rem | 12px / 0.75rem | 500 Medium | 0.05em UPPERCASE | 1 |

---

## 4.3 Typography Rules

1. **Headings are always dark navy `#0F172A`** on light backgrounds, and white `#FFFFFF` on dark navy backgrounds.
2. **Never use pure black `#000000`** — use `#0F172A` (near-black) instead.
3. **Maximum line width (measure):** 70 characters / `max-w-2xl` for body paragraphs. Never let body text span full 1200px width.
4. **Tight letter-spacing on all headings** — this is critical for the premium feel. Always use negative letter-spacing values on H1 and H2.
5. **Subheadings (under section H2):** Always `text-secondary` (`#475569`), `body-large` size, max `max-w-xl` centered.
6. **Bold statements (key phrases within paragraphs):** Use `font-semibold text-primary` — never use a different colour for bold within text.

---

---

# PART 5 — DESIGN SYSTEM & VISUAL LANGUAGE

---

## 5.1 Overall Aesthetic Philosophy

**The website should feel like:** Stripe meets Notion meets a premium European SaaS product.
**Comparable references:** Stripe.com, Linear.app, Vercel.com, Cal.com
**What it is NOT:** Cluttered SaaS dashboards, overused gradients, dark-mode heavy, or startup-gimmicky.

**Core Visual Principles:**
- **Light always.** Page backgrounds are white or `#F8FAFC` (off-white). No dark backgrounds on page content — only on footer and accent CTA bands.
- **Whitespace is a feature.** Sections breathe. Generous padding (80px–120px vertical on desktop, 48px–64px on mobile).
- **One focal point per section.** Every section has ONE thing the user's eye lands on first — a headline, a GIF, a stat, or a CTA button.
- **Motion earns its place.** Animations serve communication, not decoration. Every animation should tell the user something (this element is important, this data is live, this feature is active).
- **Professional confidence.** No cheesy stock photos of smiling people at computers. Use real product screenshots, real GIFs of the system, real data visualisations.

---

## 5.2 Spacing System (8px base grid)

```
4px   = xs   (tight padding, icon margins)
8px   = sm   (between related elements)
12px  = md   (card internal padding row gap)
16px  = lg   (standard element spacing)
24px  = xl   (between card components)
32px  = 2xl  (between small sections)
48px  = 3xl  (mobile section padding)
64px  = 4xl  (section padding, desktop medium)
80px  = 5xl  (standard section vertical padding)
96px  = 6xl  (large section padding)
120px = 7xl  (hero and major section padding)
```

---

## 5.3 Border Radius System

```
rounded-sm:   4px   (tags, badges, input borders)
rounded-md:   8px   (buttons, small cards)
rounded-lg:   12px  (standard cards, mega menu panels)
rounded-xl:   16px  (large feature cards, GIF mockup frames)
rounded-2xl:  20px  (pricing cards, hero mockup)
rounded-full: 9999px (pill buttons, avatar images, online dot)
```

---

## 5.4 Button System

**Primary CTA (Green — most important action):**
```
Background:    #16A34A
Hover:         #15803D
Text:          #FFFFFF / DM Sans 600 / 15px
Padding:       14px 28px
Border Radius: 8px (rounded-md) for standard, 9999px for pill variant
Shadow:        0 4px 14px rgba(22,163,74,0.35)
Transition:    all 0.2s ease
Icon (optional): Arrow right, 16px, ml-2
```

**Secondary (Outlined Blue):**
```
Background:    transparent
Border:        1.5px solid #2563EB
Text:          #2563EB / DM Sans 600 / 15px
Hover bg:      #EFF6FF
Padding:       14px 28px
Border Radius: 8px
```

**Ghost (Outlined White — on dark navy backgrounds):**
```
Background:    transparent
Border:        1.5px solid rgba(255,255,255,0.5)
Text:          #FFFFFF
Hover bg:      rgba(255,255,255,0.08)
Padding:       14px 28px
Border Radius: 8px
```

**Login Button (ghost minimal):**
```
Background:    transparent
Border:        1.5px solid #E2E8F0
Text:          #475569 / DM Sans 500
Hover bg:      #F8FAFC
Padding:       10px 20px
Border Radius: 8px
```

---

## 5.5 Card System

**Standard Content Card:**
```
Background: #FFFFFF
Border:     1px solid #E2E8F0
Border Radius: 12px
Shadow:     card-shadow-sm
Padding:    24px
Hover:      shadow lifts to card-shadow-md, border #CBD5E1
Transition: all 0.25s ease
```

**Highlighted / Active Card (e.g., "Most Popular" pricing):**
```
Background: #FFFFFF
Border:     2px solid (gradient: #2563EB → #16A34A)
Border Radius: 12px
Shadow:     card-shadow-blue
Scale:      scale(1.03) on desktop
Badge:      "Most Popular" pill badge, #2563EB background, white text, top of card
```

**Feature GIF Card:**
```
Background: #F8FAFC
Border: 1px solid #E2E8F0
Border Radius: 16px
Overflow: hidden
GIF fills top 60% of card
Bottom 40%: label + description + 1-line feature summary
Shadow: card-shadow-md
```

---

## 5.6 GIF / Video Mockup Display

All system GIFs should be displayed inside a **browser chrome mockup frame:**
- Frame: Light grey (`#F1F5F9`) rounded rectangle
- Top bar: 3 coloured dots (red, yellow, green) + fake URL bar with `app.carrental.digital`
- Frame border radius: `rounded-2xl` (20px)
- Drop shadow: `card-shadow-lg`
- GIFs sit inside the frame, slightly inset
- On mobile: scale down to full width, remove excessive outer padding

**Implementation note:** Convert `.gif` files to `.mp4` + `.webm` using ffmpeg. Use:
```html
<video autoPlay loop muted playsInline className="w-full rounded-xl">
  <source src="/features/fleet-view.webm" type="video/webm" />
  <source src="/features/fleet-view.mp4" type="video/mp4" />
</video>
```

---

---

# PART 6 — MEGA MENU DESIGN SPECIFICATIONS

---

## 6.1 Overall Mega Menu System

The mega menu is one of the most important UI elements on this website. It must feel like a premium product — not a generic dropdown. Study references: Vercel.com, Framer.com, Linear.app navigation.

**Trigger:** Hover on desktop / Tap on mobile (opens full-screen panel)
**Animation:** Slide down + fade in (Framer Motion: `y: -8 → 0`, `opacity: 0 → 1`, duration 0.2s, ease `easeOut`)
**Close:** Mouse leave the nav area (with 150ms delay to prevent accidental closes)

---

## 6.2 Mega Menu Container Specifications

```
Background:     #FFFFFF
Width:          100vw (full viewport width)
Max Content:    1200px centered (same as page container)
Top:            Flush with bottom of sticky header
Border:         none on top; bottom border: 1px solid #E2E8F0
Box Shadow:     0 20px 60px rgba(0,0,0,0.12)
Padding:        40px 0 48px 0
Z-index:        1000
Border Radius:  0 0 16px 16px (only bottom corners rounded)
```

---

## 6.3 Mega Menu Internal Layout

Each mega menu is divided into a **content area** (columns) + **footer bar**:

**Content area:** CSS Grid or Flexbox columns with `gap-8` between columns.
**Column dividers:** 1px solid `#F1F5F9` lines between columns (subtle, not heavy).
**Footer bar:** Light grey background `#F8FAFC`, full-width strip at bottom of mega menu. Contains the tagline and CTA button.

---

## 6.4 Mega Menu Item Design

Each item inside the mega menu (feature link) should be:

```
Layout:         Horizontal row — [Icon Box] [Text Group]
Icon Box:       32×32px, background #EFF6FF, border-radius 6px, icon 16px blue #2563EB
Text Group:     Title (DM Sans 500, 14px, #0F172A) + Optional subtitle (Inter 400, 12px, #94A3B8)
Hover state:    Entire row gets background #F8FAFC, border-radius 8px, title turns #2563EB
Padding:        10px 12px
Transition:     all 0.15s ease
```

**Column header labels** (e.g., "Core System", "Business Tools"):
```
Font:           Inter 500, 11px, UPPERCASE
Color:          #94A3B8 (muted)
Letter spacing: 0.08em
Margin bottom:  12px
```

---

## 6.5 Mega Menu Footer Strip

```
Background:    #F8FAFC
Border top:    1px solid #E2E8F0
Padding:       16px 40px
Layout:        space-between (tagline left, CTA button right)
Tagline:       Inter 400, 13px, #475569 (italic optional)
CTA Button:    Green primary button, pill shape, text "See Full Feature List →"
```

---

## 6.6 Mega Menu — Platform (3 Columns)

```
Column 1 header: "Core System" — 6 items with icons
Column 2 header: "Business Tools" — 6 items with icons
Column 3 header: "Growth & Operations" — 6 items with icons
Footer: "Everything your rental business needs. One login. Zero data loss." + CTA
```

**Column 3 visual accent:** Add a small "Live" green dot next to "Real-Time Reporting & Analytics" to signal it's live data — this is a micro-detail that conveys premium quality.

---

## 6.7 Mega Menu — Solutions (2 Columns)

```
Column 1 header: "By Business Size" — 3 items, each with an emoji icon + subtitle
Column 2 header: "By Business Type" — 6 items, no subtitle needed
Footer: "Whether you manage 20 cars or 2,000 — CarRental.digital scales with you." + CTA
```

**Special design for "By Business Size" items:**
Each item has a small fleet-size tag pill (e.g., "20–50 vehicles") in `#EFF6FF` text `#2563EB`. This makes the sizes scannable at a glance.

---

## 6.8 Mega Menu — Features (Single Wide Column)

```
Layout:     2-column CSS grid of feature items (not a single column — too long)
Items:      Icon (emoji or Lucide) + Feature name only (no subtitle needed here)
Footer:     "Watch a 2-Minute Demo →" CTA in green, prominent
```

Add a subtle label tag "New" (green badge, 10px text) next to 1–2 features to add freshness.

---

## 6.9 Mega Menu — Pricing (3 Plan Preview Cards)

```
Layout:         3 mini cards side by side
Card design:    Simplified plan card — just plan name, price, fleet size, top 3 features, and CTA link
"Professional" card: Slightly highlighted with blue border, "Most Popular" badge
Background:     White cards on white mega menu (use border + shadow to distinguish)
Footer:         "Compare All Plans →" CTA
```

---

## 6.10 Mobile Navigation (below 768px)

On mobile, the mega menu transforms into a **full-screen slide-in drawer** (Radix UI Sheet component):

```
Trigger:        Hamburger icon (top right, 40×40px tap target)
Animation:      Slide in from right, 0.3s ease
Background:     #FFFFFF full screen
Layout:         Accordion-style — tap "Platform" → expands to show all items
Close:          X button top right
CTA at bottom:  "Start Free Trial" green button (full width) + "Login" ghost button
Language:       Flag icons row at bottom of drawer
```

---

---

# PART 7 — RESPONSIVE DESIGN INSTRUCTIONS

---

## 7.1 Breakpoint System

Use Tailwind's default breakpoints, extended with one custom:

```
xs:   320px   (very small phones — fallback, rarely targeted)
sm:   640px   (large phones, small tablets — portrait)
md:   768px   (tablets — landscape, small laptops)
lg:   1024px  (laptops, desktop)
xl:   1280px  (large desktop)
2xl:  1536px  (ultra-wide — cap content width)
```

**Max content width:** `max-w-7xl` (1280px) with `mx-auto px-4 sm:px-6 lg:px-8`

---

## 7.2 Responsive Grid Rules

| Layout | Desktop (lg+) | Tablet (md) | Mobile (sm-) |
|---|---|---|---|
| Problem band table | 3-column | 1 full column (stacked rows) | 1 full column, scrollable |
| Feature tabs | Tab row + content below | Tab row scrollable horizontally + content below | Stacked accordion (no tabs) |
| Pricing cards | 3 side by side | 1 per row, stacked | 1 per row, stacked |
| Testimonials | 3 per row | 1 per row, swipeable carousel | 1 per row, swipeable carousel |
| GIF showcase | 3×2 grid | 2×3 grid | 1-column list |
| Hero | 50/50 split (text left, GIF right) | 50/50 split | Text stacked above GIF |
| Footer | 4 columns | 2 columns | 1 column, stacked |
| Mega menu | Full width dropdown | Full width dropdown | Full-screen drawer |
| FAQ accordion | 2-column layout | 1 column | 1 column |
| Stats row | 4 in a row | 2×2 grid | 2×2 grid |

---

## 7.3 Mobile-Specific Design Rules

1. **Touch targets minimum 44×44px** for all tappable elements (buttons, nav items, accordions).
2. **Hero H1 never wraps beyond 3 lines** on mobile — reduce font size before allowing 4-line wrap.
3. **Sticky header on mobile** collapses to: Logo (left) + "Trial" pill button (right, green, 32px height) + Hamburger icon.
4. **Feature GIFs on mobile:** Full width, `rounded-xl`, no browser chrome frame (too small to be legible) — just the bare GIF/video.
5. **Pricing cards on mobile:** Remove the scale transform on "Most Popular" — stack flat, but keep the blue border highlight.
6. **CTA buttons on mobile:** Minimum width 280px, or `w-full` if inside a card.
7. **Mega menu on mobile** = full-screen drawer (see 6.10).
8. **Horizontal scrolling is forbidden** — test at 320px viewport width on every page.
9. **Font sizes do NOT go below 14px** on any viewport (accessibility).
10. **Sticky bottom bar on mobile** (optional but recommended): Thin bar at bottom of screen on homepage — "Start Free Trial" green button + "Chat Now" icon. This is a conversion booster.

---

## 7.4 Tablet-Specific Rules

1. Navigation on tablet (md, 768px): Keep desktop nav if viewport allows, otherwise switch to mobile drawer.
2. Feature tabs on tablet: Allow horizontal scroll on the tab row with a subtle right fade indicating more content.
3. Mega menu on tablet: Show as a simplified 2-column dropdown (not full mega menu). Reduce padding.
4. Hero: Keep 50/50 split layout if possible; if viewport < 900px, stack vertically.

---

## 7.5 Responsive Testing Checklist

Before launch, test every page on these exact viewports:
- [ ] iPhone SE (375×667)
- [ ] iPhone 14 Pro (393×852)
- [ ] Samsung Galaxy S21 (360×800)
- [ ] iPad (768×1024)
- [ ] iPad Pro (1024×1366)
- [ ] MacBook 13" (1280×800)
- [ ] Desktop 1440×900
- [ ] Ultra-wide 1920×1080

---

---

# PART 8 — DOWNLOAD / BROCHURE SECTION

---

## 8.1 Section Location

The Download section appears in TWO places:
1. **Standalone page:** `/downloads` (linked from footer and Resources mega menu)
2. **Homepage section** (between FAQ and Footer CTA band): A compact 3-card row showing the 3 most popular downloads

---

## 8.2 Full Downloads Page (`/downloads`)

**Page Heading:** "Free Resources. Download and Share."
**Subheading:** "Everything you need to understand, present, and decide on CarRental.digital — packaged as professional PDF brochures. Available in 5 languages."

---

## 8.3 Download Card Design

Each brochure/resource is displayed as a card:

```
Layout:         Horizontal row — [PDF Thumbnail Left] [Info Right]
Thumbnail:      120×160px, PDF cover preview image, rounded-lg, shadow-md
Info block:     Title (H4), 2-line description, language badges (EN DE FR ES NL pills), file size, Upload date
CTA:            "Download PDF" green button (with download icon) + "Preview" ghost button (opens PDF in new tab)
Background:     White card, border #E2E8F0, hover shadow lift
```

---

## 8.4 Brochure Documents to Create

The following brochures should be created and uploaded to Sanity CMS → R2 Storage:

| # | Brochure Title | Description | Pages | Priority |
|---|---|---|---|---|
| 1 | CarRental.digital — Product Overview | Full system overview, all features, screenshots | 8–10 | High |
| 2 | Platform Features Deep Dive | Detailed breakdown of every feature module | 12–16 | High |
| 3 | Pricing Guide | All plans, comparison table, FAQs | 4–6 | High |
| 4 | Small Fleet Starter Guide | Targeted at 20–50 vehicle operators | 4–6 | Medium |
| 5 | Enterprise Solutions Guide | For 200+ fleets, multi-brand, API | 6–8 | Medium |
| 6 | How to Migrate Your Rental Business | Step-by-step migration from old system | 4 | Medium |
| 7 | ROI Calculator Workbook | Printable worksheet to calculate savings | 2 | Low |
| 8 | GDPR Compliance Summary | Data security and EU compliance | 2 | Low |

---

## 8.5 Download Tracking

**Every PDF download must fire a custom GA4 event:**
```js
gtag('event', 'brochure_download', {
  brochure_title: 'Platform Features Deep Dive',
  language: 'EN',
  source_page: '/downloads'
});
```

**Lead capture (optional gate):** For the Enterprise and Pricing brochures only, show a lightweight email capture modal before download:
```
"Where should we send it?"
[Email field] [Download Now →]
"We'll also send you occasional product updates. Unsubscribe anytime."
```
→ Submit email to Sanity + HubSpot/Resend list.

---

## 8.6 Homepage Compact Download Bar

A horizontal 3-card strip between the FAQ section and the footer CTA band:

**Heading:** "Download Our Brochures"
**Style:** Light grey `#F8FAFC` background strip, 64px vertical padding, 3 smaller cards side by side
**Each mini card:** PDF icon (red) + Title + Language tags + "Download" button
**On mobile:** Horizontal scroll carousel with snap points

---

---

# PART 9 — WEBSITE FEEL & UX PHILOSOPHY

---

## 9.1 The Emotional Experience

The visitor should feel THREE things in the first 10 seconds:

1. **"This is a serious, professional product."**
   — Achieved through: Clean layout, tight typography, real system screenshots (not illustrations), specific numbers (€160/quarter, 48 hours setup, 99.98% uptime), and professional copy.

2. **"This was built for people like me."**
   — Achieved through: The Solutions page and Solutions mega menu that speaks directly to small fleet operators, luxury fleets, airport operators — each feeling personally addressed.

3. **"I want to see this working."**
   — Achieved through: GIFs embedded inline, "Watch 2-Minute Demo" CTA prominently placed, and system screenshots that look like a real working product.

---

## 9.2 Scroll Experience

- **Sections animate in on scroll** (Framer Motion + IntersectionObserver): Elements slide up + fade in with a 0.4s ease. Stagger children 0.1s apart.
- **Progress is felt:** Each section answers a logical question: Problem → Solution → Features → Proof → Price → Start. The visitor should never feel lost.
- **No jarring layout shifts.** No pop-up modals until exit intent. No auto-playing audio. No unexpected scroll hijacking.
- **Horizontal feature tab section:** As the user scrolls into the feature section, the tab row sticks below the header so the user can switch tabs without scrolling back up. Use `position: sticky; top: 64px;` on the tab row.

---

## 9.3 Trust Architecture

Trust is built through layered signals, each one building on the last:

| Layer | Element | Placement |
|---|---|---|
| 1 | "Maruti Digital India" parent company | Footer + About |
| 2 | Trust badges (Cloud, Support, Uptime, Security) | Hero section |
| 3 | Stat counters (500+ businesses, 2M+ bookings) | Social proof section |
| 4 | Testimonials with photos, names, real countries | Social proof section |
| 5 | Real system GIFs (not stock illustrations) | Feature sections |
| 6 | GDPR badge, data security language | Pricing section, footer |
| 7 | 24/7 support live chat widget | Global, always visible |
| 8 | "No card needed" on free trial CTA | Every CTA instance |

---

## 9.4 Conversion Flow Design

Every page leads to one of three conversion actions:
1. **Start Free Trial** (primary — green button)
2. **Book a Demo** (secondary — works for hesitant prospects)
3. **Chat with Support** (always available — bottom right widget)

**Rules:**
- Every page has a green CTA button visible above the fold.
- Every section that describes a feature ends with a CTA — never leave the user hanging.
- The pricing section should have CTAs both above and below the plan cards.
- The FAQ section's last item should end with a soft CTA: "Still have questions? Chat with our team →"

---

---

# PART 10 — AUTOMATION ROADMAP

---

## 10.1 Phase 1 Automation (Launch — Built-In)

These automations must be live on day one:

| Trigger | Action | Tool |
|---|---|---|
| Contact form submitted | Create HubSpot contact + deal, send welcome email | HubSpot API + Resend |
| Demo booking confirmed | Send confirmation email + calendar invite + internal Slack notification | Calendly webhook + Resend + Slack API |
| "Start Free Trial" clicked | Redirect to onboarding flow, create lead record | Stripe + Supabase |
| Live chat message received | Route to agent queue + send auto-greeting | Crisp |
| Page exit detected | Trigger exit-intent popup (after 30s on site) | Custom JS / Hotjar |

---

## 10.2 Phase 2 Automation (3–6 months post-launch)

| Automation | Description | Tools |
|---|---|---|
| Lead scoring | Score leads by: pages visited, time on site, fleet size entered, plan viewed | HubSpot workflows |
| Email nurture sequences | 7-email sequence for trial users who haven't converted after 7 days | Resend + HubSpot |
| Churn risk alert | If a trial user hasn't logged in for 5 days → alert sales team | Supabase + Slack webhook |
| Review request | 30 days after subscription start → auto email asking for G2/Trustpilot review | Resend |
| Renewal reminder | 30 days before quarterly renewal → send renewal email with early-pay discount | Stripe webhook + Resend |

---

## 10.3 Phase 3 Automation (6–12 months — Advanced)

| Automation | Description | Tools |
|---|---|---|
| AI chat assistant | Replace/supplement human chat with Claude API powered assistant trained on CarRental.digital docs | Anthropic Claude API + Crisp |
| Personalised landing pages | Dynamic hero copy based on UTM source (`?source=google-ads-smallfleet`) | Next.js middleware + Sanity |
| A/B testing | Test different hero headlines, CTA colours, pricing page layouts | Vercel Edge Config + PostHog |
| Webinar automation | Auto-register leads for monthly "Getting Started" webinar | Zoom API + HubSpot |
| Affiliate tracking | Track referral sources, auto-calculate and pay affiliate commissions | Rewardful or Tapfiliate |
| Auto-translation updates | When EN content updated in Sanity → trigger translation job for DE/FR/ES/NL | DeepL API + Sanity webhooks |

---

## 10.4 Internal Notification Automation (Team)

```
Every new demo booking     → Slack #demos channel notification
Every new trial signup     → Slack #growth channel notification
Every new enterprise lead  → Slack #enterprise + email to sales lead
Every support ticket >1hr  → Escalation alert to support manager
Every churned customer     → Slack #retention + HubSpot task created
```

---

---

# PART 11 — FUTURE FEATURES ROADMAP (Technical Preparation)

---

Prepare the codebase for these features even if not built at launch:

| Feature | Preparation Required | Timeline |
|---|---|---|
| Customer Dashboard (login area) | Auth system (NextAuth.js) must be set up from day 1 | Phase 2 |
| Affiliate / Partner Portal | Separate `/partner` route, RLS in Supabase | Phase 2 |
| API Documentation Page | `/api-docs` route with Swagger/Redoc embed | Phase 2 |
| Mobile App (React Native) | Design tokens must match web (shared Tailwind config exported to RN) | Phase 3 |
| AI Fleet Recommendations | Claude API integration — suggest optimal pricing/fleet allocation | Phase 3 |
| Multi-Tenant SaaS App | Supabase RLS policies, tenant_id on all tables | Phase 3 |
| Marketplace / Integrations Page | `/integrations` listing all connected services | Phase 2 |
| Status Page | `/status` — live system uptime, historical incidents | Phase 1 |
| Webinar Pages | `/events` — registration + recordings | Phase 2 |

---

---

# PART 12 — ADDITIONAL DEVELOPER INSTRUCTIONS

---

## 12.1 File / Folder Structure

```
/app
  /(marketing)         — All public pages
    /page.tsx          — Homepage
    /features/page.tsx
    /solutions/page.tsx
    /pricing/page.tsx
    /about/page.tsx
    /contact/page.tsx
    /demo/page.tsx
    /downloads/page.tsx   ← NEW
    /blog/[slug]/page.tsx
  /(auth)              — Login / signup
  /(dashboard)         — Future customer dashboard
/components
  /ui                  — shadcn/ui base components
  /marketing           — Page-specific components (HeroSection, MegaMenu, PricingCard, etc.)
  /layout              — Header, Footer, MegaMenu
  /shared              — TrustBadges, GifMockup, DownloadCard, SectionWrapper
/lib
  /sanity.ts           — Sanity client + GROQ queries
  /analytics.ts        — GA4 event helpers
  /hubspot.ts          — HubSpot API calls
/messages              — i18n translation files (en.json, de.json, etc.)
/public
  /gifs                — Converted .mp4 and .webm files
  /icons               — Custom SVG icons
```

---

## 12.2 Environment Variables Required

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# HubSpot
HUBSPOT_API_KEY=

# Resend (Email)
RESEND_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_ID=

# Live Chat (Crisp)
NEXT_PUBLIC_CRISP_WEBSITE_ID=

# Cloudflare R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_PUBLIC_URL=
```

---

## 12.3 Performance Targets

| Metric | Target | Tool to Measure |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | Google PageSpeed Insights |
| Cumulative Layout Shift (CLS) | < 0.1 | Core Web Vitals |
| First Input Delay (FID) | < 100ms | Core Web Vitals |
| Time to First Byte (TTFB) | < 600ms | WebPageTest |
| Lighthouse Score | 90+ all categories | Chrome DevTools |
| GIF/Video weight | < 2MB per file | Squoosh / ffmpeg |

---

*End of Master Development & Design System Prompt*
*Document: CarRentalDigital_Master_Dev_Prompt.md*
*Product of Maruti Digital India*
*Version 2.0 — Prepared for Development Team*
