---
title: Retro Vision — PRD
product: Retro Vision
type: PRD
status: Draft v1
source: "Shahriar-এর chat brief (2026-10-22) — 'Section 01: Navbar + Hero'। Vault-এ এখনো কোনো Retro Vision note নেই"
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — Product Requirements

## 1. Project Overview

| | |
|---|---|
| নাম | **Retro Vision** |
| কী | Indie game developer, game studio ও gaming company-র জন্য premium creative ও digital growth agency |
| এই repo | Agency-র marketing landing page (single page, ১১টা section) |
| উদ্দেশ্য | প্রথম দেখাতেই দক্ষতা বোঝানো → visitor-কে **project inquiry** শুরু করানো |
| Vision | "Your Game Deserves A Bigger World." — game-এর জগৎকে বড় audience-এর কাছে নিয়ে যাওয়া |
| Core philosophy | Independent thinking · unforgettable execution |

## 2. Goals & Objectives

| ID | Goal | মাপকাঠি |
|---|---|---|
| G1 | Premium, cinematic, স্বতন্ত্র প্রথম impression | Human Design Test পাস (`10 Standards/frontend/00`) |
| G2 | Project inquiry শুরু করানো | Primary CTA "Start a Project" প্রথম screen-এ দৃশ্যমান |
| G3 | কাজের নমুনা দেখতে উৎসাহ দেওয়া | Secondary CTA "Explore Our Work" → `#work` |

## 3. Target Users

| Persona | প্রেক্ষাপট | কী চায় | সমস্যা |
|---|---|---|---|
| Indie developer | ১–১০ জনের team, সীমিত marketing budget | Visual identity, store page, launch marketing | Game ভালো কিন্তু কেউ জানে না |
| Ambitious studio | Mid-size, একাধিক title | Campaign, website, growth partner | In-house creative capacity কম |
| Gaming company | Publisher / platform | Brand system, digital experience | Generic agency gaming বোঝে না |

কোনো login বা user role নেই — public marketing site।

## 4. Problem Statement

Game market-এ discoverability সবচেয়ে বড় বাধা। Generic agency gaming culture বোঝে না, আর gaming-specialist agency-র site প্রায়ই template বা wallpaper-এর মতো দেখায়। Retro Vision-এর site নিজেই প্রমাণ হতে হবে যে তারা art direction বোঝে।

## 5. Core Features (landing page sections)

| # | Section | Anchor | Phase | অবস্থা |
|---|---|---|---|---|
| 1 | Navbar + Hero | — | 1 | ✅ বানানো হয়েছে |
| 2 | Services marquee (trust bar-এর বদলে — যাচাইকৃত logo/number নেই) | — | 2 | ✅ |
| 3 | About / Why Retro Vision (scroll-fill statement + ৩ নীতি) | `#about` | 2 | ✅ |
| 4 | Problem → Solution | — | 2 | ✅ |
| 5 | Services | `#services` | 2 | ✅ |
| 6 | Process (৪ ধাপ) | — | 2 | ✅ |
| 7 | What we build (capabilities — client work নয়, স্পষ্ট label) | `#work` | 2 | ✅ |
| 8 | Engagement models (দাম ছাড়া) | — | 2 | ✅ |
| 9 | FAQ | — | 2 | ✅ |
| 10 | Project Inquiry Form (Resend) | `#project-inquiry` | 2 | ✅ |
| 11 | Final CTA · Footer | — | 2 | ✅ |
| — | Case studies · Testimonials | — | পরে | ⬜ আসল data এলে |

## 6. Optional Features

- Case study detail page (`/work/[slug]`)
- Blog / insights

## 7. User Flow

```
Visitor lands
   │
   ▼
Hero ── headline + description পড়ে
   │
   ├── "Start a Project ↗" ───────────► #project-inquiry ──► form submit (Phase 4)
   │
   └── "Explore Our Work" ──► #work ──► case study ──► Start a Project
```

## 8. Functional Requirements

### FR-1 Navbar
- FR-1.1 — বাঁয়ে Retro Vision wordmark, click করলে page top (`#top`)
- FR-1.2 — Links: Services `#services` · Work `#work` · About `#about` · Contact `#project-inquiry`
- FR-1.3 — ডানে "Start a Project" CTA → `#project-inquiry`, arrow icon সহ
- FR-1.4 — Header hero art-এর উপর transparent overlay (`absolute`), নিজস্ব bar নেই
- FR-1.5 — `< 1024px`-এ hamburger: `aria-expanded`, `aria-controls`, Escape-এ বন্ধ, link click-এ বন্ধ, বন্ধ হলে focus toggle-এ ফেরে, খোলা অবস্থায় body scroll lock
- FR-1.6 — সব interactive element-এ visible `:focus-visible` ring
- FR-1.7 — Anchor id গুলো একটাই উৎস থেকে আসে (`data/site.ts → SECTION_IDS`); target section না থাকলে click no-op (page jump করে না)

### FR-2 Hero
- FR-2.1 — Eyebrow: "INDEPENDENT THINKING. UNFORGETTABLE EXECUTION."
- FR-2.2 — `<h1>` দুই line: "Games Deserve Greatness." / "We Make It Happen." — দ্বিতীয় line #02ADFF→#8B5CF6 gradient; দুই line একই font size (desktop 66px)
- FR-2.3 — Supporting text: "Retro Vision is a creative and growth studio for game developers. We shape the visual identity, build the website, and run the marketing that turns a great game into one players find, remember, and can't wait to play."
- FR-2.4 — Primary CTA "Start a Project ↗" → `#project-inquiry`; Secondary "Explore Our Work" → `#work`
- FR-2.5 — Microcopy: "FOR INDIE DEVELOPERS, AMBITIOUS STUDIOS, AND THE NEXT GENERATION OF GAMES."
- FR-2.6 — Full-bleed key art (`public/images/retro-vision-hero.png`, Shahriar-এর দেওয়া) navbar ও পুরো hero-র পেছনে; বাঁয়ে dark overlay; warrior text-এ ঢাকা পড়বে না
- FR-2.7 — Desktop (≥1280×720)-এ headline ও primary CTA প্রথম screen-এ
- FR-2.8 — Entrance animation: eyebrow → headline → description → CTA → visual; `prefers-reduced-motion`-এ সব বন্ধ
- FR-2.9 — Hero art-এ সূক্ষ্ম motion: cape বাতাসে ওড়ে (কাঁধ স্থির), ১px শ্বাস, fog drift; moon, castle, শরীর স্থির; reduced-motion-এ static

## 9. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | LCP < 2.0s (desktop, local prod build) · CLS < 0.05 · hero art next/image (AVIF/WebP, priority) · নতুন runtime dependency ০ |
| Accessibility | WCAG 2.2 AA contrast · keyboard-only navigation · tap target ≥ 44px · reduced motion |
| Responsive | 360px থেকে 1920px — horizontal overflow নেই |
| Security | Secret/API key নেই; form ও backend এই phase-এ নয় |

## 10. Success Criteria

| Metric | Target |
|---|---|
| Hero → inquiry click-through | DECISION-PENDING (analytics ঠিক হলে) |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Performance (desktop) | ≥ 90 |

## 11. Future Improvements

- আসল logo asset পেলে wordmark replace (`00 §95`)
- আসল portfolio artwork পেলে hero visual-এ ব্যবহার বিবেচনা

## 12. Product Summary

| | |
|---|---|
| Type | Single-page marketing site |
| Audience | Indie dev · studio · gaming company |
| Primary conversion | Project inquiry |
| Stack | Next.js 16.4 · React 19.3 · Tailwind v4 · TypeScript |
| Backend | এখন নেই (Phase 4-এ Resend দিয়ে form) |
