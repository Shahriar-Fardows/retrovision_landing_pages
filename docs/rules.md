---
title: Retro Vision — Rules
product: Retro Vision
type: Rules
status: Draft v1
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — Rules

## 0. Framework gotchas (Next.js 16.4 · Tailwind v4)

কোড লেখার আগে `node_modules/next/dist/docs/` দেখো (`AGENTS.md`)।

| বিষয় | ভুল (পুরনো) | সঠিক (এই project) |
|---|---|---|
| Middleware | `middleware.ts` | `proxy.ts` |
| Route params | `params.slug` | `const { slug } = await params` (Promise) |
| Layout props type | হাতে লেখা type | global `LayoutProps<"/">` / `PageProps<"/">` |
| Tailwind config | `tailwind.config.js` | নেই — token `app/globals.css`-এর `@theme`-এ |
| Tailwind build | `postcss.config.mjs` | `next.config.ts`-এ `@tailwindcss/turbopack` loader |
| Caching | `export const dynamic` | `cacheComponents: true` — `"use cache"` directive |
| Fonts | `<link>` Google Fonts | `next/font/google`, variable `--font-*` |

## 1. Coding Standards

- Page → Sections → UI → Data (`10 Standards/frontend/12`)
- Server component default; `"use client"` শুধু state/effect লাগলে (এখন শুধু `SiteHeader`)
- Section copy বড় হলে `data/`-তে; nav ও anchor id **শুধু** `data/site.ts` থেকে
- Hard-coded hex নয় — `@theme` token (`bg-bg`, `text-fg-muted`, `text-accent` …)

## 2. Naming Conventions

| জিনিস | Convention | উদাহরণ |
|---|---|---|
| Component | PascalCase | `SiteHeader`, `WorldPlate` |
| Component file | PascalCase.tsx | `ButtonLink.tsx` |
| Data/const file | camelCase.ts | `site.ts` |
| Constant | SCREAMING_SNAKE | `SECTION_IDS`, `NAV_LINKS` |
| Boolean | is/has prefix | `isOpen`, `isScrolled` |
| Section id | kebab-case | `project-inquiry` |
| CSS token | `--color-*`, `--font-*`, `--ease-*` | `--color-fg-muted` |

## 3. File Organization

- `components/layout` — header/footer · `components/sections` — page section · `components/ui` — primitive · `components/visuals` — art
- Import order: react/next → `@/components` → `@/data` → relative
- Alias: `@/*` → project root

## 4. Component Structure

```tsx
import Container from "@/components/ui/Container";
import { SECTION_IDS } from "@/data/site";

export default function Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="…">
      <Container>
        <h2 id="services-title">…</h2>
      </Container>
    </section>
  );
}
```

নিয়ম: প্রতিটা section `<section id aria-labelledby>`; `Container` দিয়ে gutter; default export।

## 5. Preferred Libraries

| কাজ | কী |
|---|---|
| Hover / entrance | CSS |
| জটিল React-state motion (দরকার হলে) | Motion — আগে জিজ্ঞেস করো |
| Icons (একাধিক লাগলে) | Lucide React |
| Image | `next/image` |

## 6. Libraries to Avoid

| কী | কেন |
|---|---|
| UI kit-এর demo styling (shadcn default theme ইত্যাদি) | Brand-এর নয় (`00 §90`) |
| Lenis / Three.js | Native scroll যথেষ্ট; hero-র WebGL raw, Three.js লাগে না |
| GSAP-এর পাশে আরেকটা animation lib | GSAP আছে (`03 §26` — এক property, এক engine) |
| Icon library mix | Consistency (`06 §62`) |

## 7. Error Handling

এখন runtime error surface নেই। Phase 4 form: server-side validation, user-friendly message, PII log করা নিষেধ।

## 8. Security Rules

1. কোনো secret repo-তে নয়; `.env*` gitignored
2. Server-only key কখনো `NEXT_PUBLIC_` prefix নয়
3. Form input server-এ validate (Phase 4)

## 9. Performance Guidelines

- Hero-তে raster image নয়; SVG art inline, decorative বলে `aria-hidden`
- Animation শুধু `transform`/`opacity`
- Font: দুটো family, `display: swap`
- Cache: এখন static; form response cache করা নিষেধ

## 10. Testing Guidelines

- প্রতিটা section: desktop (1440) + tablet (768) + mobile (375) visual QA, overflow check, console error ০
- `npm run lint` ও `npm run build` পাস না করলে merge নয়
- Keyboard-only walk-through (Tab order, focus ring, Escape)

## 11. Git Rules

- Branch: `feat/<section>` · Commit: `feat(hero): …` (conventional)
- Default branch `main`; local branch এখন `master` — DECISION-PENDING

## 12. AI Development Rules

**সবসময়:**
- কাজ শুরুর আগে `/docs` ও `web-design-standards` skill
- বিদ্যমান component খুঁজে reuse (`ButtonLink`, `Container`)
- আশেপাশের কোডের style
- কাজ শেষে `phases.md` ও `memory.md` update

**কখনো না:**
- কাজ করছে এমন কোড না বলে rewrite
- Architecture বদল জিজ্ঞেস না করে
- জিজ্ঞেস না করে dependency যোগ
- Fake testimonial, client logo, statistic, award (`00 §93–94`)
- Placeholder দিয়ে "শেষ" বলা
- সম্পর্কহীন file "ঠিক" করা
