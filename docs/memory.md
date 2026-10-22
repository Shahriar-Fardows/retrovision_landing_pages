---
title: Retro Vision — Memory
product: Retro Vision
type: Memory
status: Draft v2
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — AI Working Memory

## Project Status

| | |
|---|---|
| Phase | 1 (Navbar + Hero) — v3: নতুন headline/copy + WebGL art motion; review বাকি |
| Repo | `F:\Shahriar\retro_vision\retro_vision` |
| Branch | `master` (remote default `main` — DECISION-PENDING) · কিছুই commit হয়নি |
| Stack | Next.js 16.4.2 · React 19.3 · Tailwind v4 (turbopack loader) · TS |
| পরের milestone | Clean art যোগ → visual QA → commit → Phase 2 |

## যেসব উৎস দেখতে হবে

| উৎস | কী আছে | সংঘাতে |
|---|---|---|
| Reference mockup `Downloads/retrovision.png` (1629×819) | Hero-র হুবহু চেহারা | **Hero-র visual-এ এটাই জেতে** |
| Shahriar-এর chat brief (দুটো, 2026-10-22) | Copy, palette, নিয়ম | Product-এ জেতে |
| Obsidian `10 Standards/frontend/` | Design law | পদ্ধতিতে জেতে, কিন্তু brand owner-এর সরাসরি নির্দেশ override করে |
| `docs/design.md` | Token ও মাপ | Implementation-এ |

## Completed Tasks

**2026-10-22 (v1)** — `/docs`, tokens, SVG-plate hero, header, QA।

**2026-10-22 (v3 — copy + motion)**
- Headline "Games Deserve Greatness. / We Make It Happen." (58px, 1.08), নতুন supporting line
- `HeroArtMotion`: WebGL2 warp — cape wind, breath, fog drift; mask `scripts/build-hero-motion-mask.mjs`
- যাচাই: identity ≤1/255, mask-এর বাইরে ০ pixel নড়ে, mobile-এ canvas ও `<img>` pixel-সমান

**2026-10-22 (v2 — reference match)**
- Full-bleed `next/image` background + তিন স্তরের overlay (mobile/tablet/desktop আলাদা)
- Header `absolute` transparent, nav centered, cyan→violet "R" SVG mark
- Plus Jakarta Sans-এ বদল; headline gradient "A Bigger World."
- 1769×889-এ reference-এর সাথে position মাপা — সব element ≤5px-এর মধ্যে
- Mobile header CTA overflow bug ঠিক (`hidden` বনাম `inline-flex`)
- SVG `WorldPlate` মুছে ফেলা

## Current Task

v3 শেষ — Shahriar-এর review-এর অপেক্ষা। Art এসেছে `Downloads/retrovision_hero_bg.png` থেকে।

## Pending Tasks

1. Clean art এলে desktop/tablet/mobile-এ আবার দেখা: warrior কোথায় পড়ে, overlay ঠিক আছে কিনা, text contrast
2. Art 1MB-এর বেশি হলে compress (next/image runtime-এ AVIF/WebP দেয়, কিন্তু source ছোট রাখা ভালো)
3. Shahriar-এর review → commit
4. Logo-র আসল file
5. Phase 2 section

## Open Decisions

| # | বিষয় | বিকল্প | সুপারিশ |
|---|---|---|---|
| O1 | Logo | Mockup থেকে বানানো SVG "R" · আসল file | আসল file পেলে replace |
| O2 | Default branch | `master` · `main` | `main` |
| O3 | Hosting | Vercel · অন্য | Vercel |
| O4 | Inquiry submission | Server Action · Route Handler | Server Action + Resend |
| O5 | Header scroll-এ | এখন `absolute` (scroll-এ চলে যায়) · sticky + tint | Phase 2 section এলে ঠিক করা |

## Important Decisions

| # | সিদ্ধান্ত | কেন |
|---|---|---|
| A1 | Hero art full-bleed `next/image` (`fill`, `priority`, `sizes=100vw`), CSS background নয় | AVIF/WebP + responsive size বিনা খরচে |
| A2 | Mockup নিজে background হিসেবে নয় | ওতে text baked — live text-এর নিচে দ্বিতীয় copy দেখা যেত |
| A3 | Container 1386px (padding সহ) → content edge 1769px-এ ঠিক 240px | Reference-এর মাপ |
| A4 | Header `absolute`, scroll-tint বাদ | Reference-এ নিজস্ব bar নেই |
| A5 | Desktop nav `lg` (1024) থেকে; নিচে hamburger | Centered nav + CTA 1024-এর নিচে ধরে না |
| A6 | Motion শুধু CSS | যথেষ্ট |
| A7 | Missing anchor-এ click no-op | Section না থাকা পর্যন্ত |
| A8 | Gradient text ও AI-generated art ব্যবহার | Shahriar-এর সরাসরি নির্দেশ (v1-এর নিষেধ বাতিল) |
| A9 | Cape motion = mask-driven WebGL warp, আলাদা cape layer নয় | Art flattened; overlay বানালে নিচের আসল cape দেখা যেত (ghosting)। Warp নিজেই pixel সরায়, তাই duplicate নেই |
| A10 | Raw WebGL2, Three.js নয় | একটা full-screen quad-এর জন্য ~600KB library অপ্রয়োজনীয় |
| A11 | Hero centered | Shahriar-এর নির্দেশ (standards-এর centered-hero সতর্কতা জেনেও) |
| A12 | Desktop object-position aspect-ratio দিয়ে (`xl:[@media(min-aspect-ratio:16/9)]`) | Width দিয়ে হয় না: 1440×900 আর 1791×924-এ আলাদা মান লাগে |
| A14 | Pubzi-র code/asset copy নয়, শুধু pattern | Paid Envato template — license ছাড়া copy করা যায় না |
| A15 | Testimonial, client logo, counter, দাম নেই | যাচাইকৃত data নেই (`00 §93–94`); Shahriar: দাম ছাড়া engagement |
| A16 | Inquiry → `INQUIRY_TO_EMAIL=shahriarfardows@gmail.com` | Shahriar-এর উত্তর (2026-10-22) |
| A13 | Castle-এর ঘিঞ্জি ভাব ঠিক করতে shader-এ depth of field, CSS backdrop-blur নয় | Backdrop-blur animating canvas-এর উপর প্রতি frame full-screen repaint; shader-এ mip-blur প্রায় বিনা খরচে ও motion-এর সাথে মেলে |

## Known Issues

| Issue | মাত্রা | নোট |
|---|---|---|
| Resend key/domain নেই → form বলে connected নয় | 🔴 | `.env.local`-এ `RESEND_API_KEY` + verified `INQUIRY_FROM_EMAIL` |
| `NEXT_PUBLIC_SITE_URL` নেই → OG URL localhost, sitemap খালি | 🟡 | Deploy-এর আগে set করো |
| Engagement/FAQ-এর কিছু নীতি-বাক্য Shahriar-এর যাচাই দরকার | 🟡 | `data/content.ts` |
| Budget range অনুমান থেকে | 🟡 | `INQUIRY_BUDGETS` |
| Centered layout-এর জন্য art আদর্শ নয় (castle মাঝখানে) | 🟡 | DOF দিয়ে সামলানো; মাঝখান ফাঁকা রেখে নতুন art হলে সবচেয়ে ভালো |
| Art বদলালে mask আবার trace করতে হবে | 🟡 | `scripts/build-hero-motion-mask.mjs`-এর polygon/zone art-এর pixel-এ বাঁধা |
| Cape-এর পেছনের fog-ও সামান্য টানে (rubber-sheet warp) | 🟢 | নরম fog বলে চোখে পড়ে না; সত্যিকারের আলাদা cloth চাইলে layered PSD/transparent cape লাগবে |
| Reduced-motion path শুধু code-এ যাচাই | 🟢 | Browser pane-এ media emulation নেই |
| Browser pane-এ rAF শুধু screenshot-এর সময় চলে | 🟢 | Motion যাচাই offline shader harness দিয়ে করা |
| Hero art 3.1MB PNG (1774×887) | 🟢 | next/image AVIF/WebP দেয়; 1920+ screen-এ সামান্য upscale |
| Nav ও CTA-র target section নেই | 🟡 | ইচ্ছাকৃত no-op |
| `next dev` CSS পরিবর্তন ধরে না | 🟡 | 2026-10-22-এ restart করে ঠিক; আবার হলে restart |

## Change Log

| তারিখ | পরিবর্তন |
|---|---|
| 2026-10-22 | v1: docs + SVG-plate hero |
| 2026-10-22 | v2: reference-matched full-bleed hero, নতুন palette ও font |
| 2026-10-22 | v3: নতুন headline/copy, WebGL hero art motion |
| 2026-10-22 | v3.1: নতুন ৪-লাইনের paragraph; line 2 বড় করে সমান চওড়া করা হয়েছিল |
| 2026-10-22 | v3.2: Shahriar বাতিল করলেন — দুই line আবার একই size, headline বড় (66px), paragraph 560px |
| 2026-10-22 | v4: সব hero content centered; overlay center-ellipse; object-position aspect-ratio অনুযায়ী (warrior ও cape tip রক্ষা) |
| 2026-10-22 | v4.1: লেখার পেছনে WebGL depth-of-field (castle নরম); reduced-motion-এ স্থির DOF frame |
| 2026-10-22 | v5: পুরো landing page — Pubzi (ex-coders, Envato) থেকে motion pattern নিজের কোডে; GSAP যোগ; inquiry → Resend |

## Notes for future sessions

- **CSS না বদলালে:** dev server restart — turbopack Tailwind loader `globals.css` cache করে। TSX-এর Tailwind class ঠিকমতো আসে, তাই দরকার হলে utility/arbitrary variant ব্যবহার করো
- Reference-এর সাথে মেলাতে: viewport 1769×889, mockup-কে সাময়িক `img.src` বানিয়ে live text রং বদলে overlay করো; মাপ JS `Range.getClientRects()` দিয়ে
- `ButtonLink`-এ `className`-এ `hidden` দিলে কাজ করে না (base-এ `inline-flex`) — wrapper div ব্যবহার করো
- Hero motion যাচাই: page-এ একটা harness inject করে একই shader 1774×887-এ বিভিন্ন `uTime`-এ render → static-এর সাথে diff; mask-এর বাইরে diff ০ হতে হবে
- Headline-এর দুই line সবসময় **একই font size** — "same size" মানে font size, width নয় (Shahriar, 2026-10-22)
- Section id **শুধু** `SECTION_IDS` থেকে
- Fake logo/testimonial/number কখনো নয়
