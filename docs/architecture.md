---
title: Retro Vision — Architecture
product: Retro Vision
type: Architecture
status: Draft v1
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — Architecture

## 1. System Architecture

```
Browser
  │
  ▼
Next.js 16 App Router (static, cacheComponents)
  │
  ├── app/layout.tsx      fonts · <SiteHeader/> · <main>
  └── app/page.tsx        sections একের পর এক
          │
          ├── components/sections/*   (server components)
          ├── components/layout/*     (header — client, mobile menu state)
          ├── components/ui/*         (Container, ButtonLink, ArrowIcon)
          ├── public/images/*        (hero key art, next/image)
          └── data/site.ts            nav + SECTION_IDS (একক উৎস)

Phase 4:  app/api/inquiry/route.ts ──► Resend   (এখনো নেই)
```

## 2. Application Flow

Static page। কোনো data fetch নেই। Client JS: header (mobile menu, missing-anchor guard) ও `HeroArtMotion` (WebGL, 30fps, offscreen-এ বন্ধ)।

## 3. Folder Structure

```
retro_vision/
├── app/
│   ├── layout.tsx        root layout, next/font, header
│   ├── page.tsx          section composition
│   └── globals.css       Tailwind v4 @theme tokens + base + motion
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx   fixed navbar, tint on scroll + mobile menu ("use client")
│   │   └── SiteFooter.tsx   footer; year via "use cache" (cacheComponents)
│   ├── forms/
│   │   └── InquiryForm.tsx      useActionState, honeypot, inline errors ("use client")
│   ├── motion/
│   │   ├── SplitChars.tsx       hero headline letter split (CSS animation, server)
│   │   ├── Reveal.tsx           GSAP ScrollTrigger section entrance ("use client")
│   │   ├── ScrollFillText.tsx   scrubbed word fill for the About statement
│   │   └── CursorRing.tsx       desktop pointer ring (idles when settled)
│   ├── sections/
│   │   ├── Hero · Marquee · About · Problems · Services
│   │   └── Process · Work · Engagement · Faq · Inquiry · FinalCta
│   ├── ui/
│   │   ├── Container.tsx
│   │   ├── ButtonLink.tsx   primary / outline / ghost variants
│   │   ├── ArrowIcon.tsx
│   │   ├── SectionHeading.tsx
│   │   └── ThemeToggle.tsx      light/dark switch (useSyncExternalStore on <html data-theme>)
│   └── visuals/
│       ├── HeroArtMotion.tsx   WebGL2 warp layer over the hero art ("use client")
│       └── CapabilityVisuals.tsx  code-drawn brand board, website and campaign mock-ups
├── app/actions/inquiry.ts   server action → Resend REST (no SDK)
├── app/robots.ts · app/sitemap.ts · app/opengraph-image.jpg
├── lib/gsap.ts           GSAP + ScrollTrigger + useGSAP registration
├── data/
│   ├── site.ts           SECTION_IDS, NAV_LINKS, PRIMARY_CTA
│   └── content.ts        সব section-এর copy (এক জায়গায়)
├── docs/                 এই ছয়টা ফাইল
├── assets/art/retro-vision-hero-source.png   মূল art (ship হয় না)
├── scripts/
│   ├── grade-hero-art.mjs           source → public art: বাঁ দিকের shadow lift
│   └── build-hero-motion-mask.mjs   art থেকে motion mask বানায় (sharp) — grade-এর পরে চালাও
└── public/images/        retro-vision-hero.png (key art) · hero-motion-mask.png (R cape · G fog · B breath)
```

> Project-এ `src/` নেই — `create-next-app` root layout রাখা হয়েছে, `@/*` alias root-এ।

## 4. Technology Stack

| Layer | কী | কেন |
|---|---|---|
| Framework | Next.js 16.4.2 (App Router, Turbopack) | বিদ্যমান project |
| UI | React 19.3 | বিদ্যমান |
| Styling | Tailwind v4 (`@tailwindcss/turbopack` loader) + CSS variables | বিদ্যমান; token `@theme`-এ |
| Fonts | `next/font/google` — Plus Jakarta Sans, IBM Plex Mono | self-hosted, layout shift নেই |
| Motion | CSS keyframes (hero letters, marquee, glints) + GSAP 3.15 ScrollTrigger (reveals, scroll-fill) + raw WebGL2 (hero art) | Flattened image-এর নির্দিষ্ট অংশ warp করা CSS-এ সম্ভব নয়; Three.js ছাড়া ~250 লাইন, নতুন dependency নেই (`04 §38–39`) |
| Icons | Inline SVG (একটা arrow) | একটা icon-এর জন্য Lucide dependency অপ্রয়োজনীয় |
| State | React `useState` | শুধু menu |
| Hosting | DECISION-PENDING (Vercel সম্ভাব্য) | |

## 5. Database Design

নেই।

## 6. API Architecture

এখন নেই। Phase 4:

Inquiry: `app/actions/inquiry.ts` (Server Action) → `POST https://api.resend.com/emails`। Server-side validation, honeypot; key না থাকলে visitor-কে স্পষ্ট বলে যে পাঠানো হয়নি — কখনো ভুয়া success নয়।

## 7. Authentication

নেই (public site)।

## 8. Deployment

| Env | কী |
|---|---|
| Development | `npm run dev` → http://localhost:3000 |
| Production | `npm run build && npm start` |
| Env vars | `.env.example` দেখো: `NEXT_PUBLIC_SITE_URL` (canonical/OG/sitemap) · `RESEND_API_KEY` · `INQUIRY_TO_EMAIL` · `INQUIRY_FROM_EMAIL` (Resend-verified domain) |

## 9. Third-Party Services

| Service | Phase | কোথায় |
|---|---|---|
| Google Fonts (build-time self-host) | 1 | `app/layout.tsx` |
| Resend | 4 | DECISION-PENDING |

## 10. Scalability

| চাপ | আজ | পরে |
|---|---|---|
| Section সংখ্যা বাড়া | প্রতিটা section আলাদা file, id `SECTION_IDS` থেকে | Content `data/`-তে |
| Portfolio image | নেই | `next/image`, AVIF/WebP, `sizes` |
