---
title: Retro Vision — Phases
product: Retro Vision
type: Roadmap
status: Draft v1
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — Phases

## অবস্থার সারসংক্ষেপ

| Phase | কী | Status |
|---|---|---|
| 0 | Foundation | 🟡 সিদ্ধান্ত বাকি (logo, hosting, branch) |
| 1 | Navbar + Hero | 🟡 v3 (copy + art motion) — review বাকি |
| 2 | পুরো landing page (Pubzi-style motion) | ✅ বানানো — review বাকি |
| 3 | Case studies · testimonials (আসল data লাগবে) | ⬜ |
| 4 | Resend key + domain, production URL — **MVP এখানে শেষ** | ⬜ |
| 5 | Testing · optimization · deployment | ⬜ |

## Phase 0 — Foundation

- [x] `/docs` ছয়টা ফাইল
- [x] Design tokens (`app/globals.css` `@theme`)
- [x] Fonts (`next/font`: Plus Jakarta Sans + IBM Plex Mono)
- [x] `data/site.ts` — SECTION_IDS, NAV_LINKS
- [ ] Logo asset (DECISION-PENDING)
- [ ] Hosting ঠিক করা
- [ ] Default branch `master` বনাম `main` ঠিক করা

## Phase 1 — Navbar + Hero

- [x] `SiteHeader` — sticky, scroll tint, mobile menu
- [x] `Hero` — copy, CTA, microcopy
- [x] Full-bleed hero (reference mockup অনুযায়ী, v2)
- [x] `public/images/retro-vision-hero.png` যোগ ও আসল art-এ visual QA
- [x] নতুন headline ও supporting copy (v3)
- [x] Hero art motion — cape, breath, fog (WebGL, reduced-motion-এ static)
- [x] Entrance motion + reduced motion
- [x] Visual QA desktop / tablet / mobile
- [ ] Shahriar-এর review

## Phase 2

- [ ] Trust / Credibility bar — **শুধু যাচাইকৃত তথ্য** (client logo/number না থাকলে section ছোট করো বা বাদ দাও)
- [ ] Featured Work `#work` — আসল project asset লাগবে
- [ ] Services `#services`

## Phase 3

- [ ] Selected Projects / Case Studies
- [ ] Our Process
- [ ] Why Retro Vision `#about`
- [ ] FAQ

## Phase 4 — MVP শেষ

- [ ] Project Inquiry Form `#project-inquiry` + Resend
- [ ] Final CTA
- [ ] Footer
- [x] Missing-anchor no-op guard সরানো (সব target তখন থাকবে)

## Phase 5

- [ ] Lighthouse (Perf ≥ 90, A11y ≥ 95)
- [ ] OG image, metadata
- [ ] Deploy

## জানা ঝুঁকি

| ঝুঁকি | প্রভাব | কী করব |
|---|---|---|
| Portfolio/case study asset নেই | 🔴 | Phase 2-এর আগে Shahriar-এর কাছ থেকে নেওয়া; fake নয় |
| Logo নেই | 🟡 | Text wordmark এখন; asset এলে replace |
| Trust bar-এর যাচাইকৃত তথ্য নেই | 🟡 | Section বাদ বা অন্য রূপ |

## Phase 2 (2026-10-22) — বানানো

- [x] Marquee · About · Problems · Services · Process · Work · Engagement · FAQ · Inquiry · Final CTA · Footer
- [x] Inquiry server action (validation, honeypot, key ছাড়া সৎ "not connected")
- [x] SEO metadata, OG image, robots, sitemap (`NEXT_PUBLIC_SITE_URL` সাপেক্ষে)
- [x] 360–1920px overflow ০; form, FAQ, mobile menu যাচাই
- [ ] Resend key ও verified sender domain
- [ ] Lighthouse
- [ ] Shahriar-এর copy review (Engagement ও FAQ-এর নীতি-বাক্য)

## 2026-10-22 — v6

- [x] Hero art-এর বাঁ দিক lift (source আলাদা রাখা, script দিয়ে grade)
- [x] Light / dark theme + toggle, flash ছাড়া
- [x] "What we build" — তিনটা আলাদা code-drawn visual
