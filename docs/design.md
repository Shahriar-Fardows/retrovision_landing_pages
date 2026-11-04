---
title: Retro Vision — Design
product: Retro Vision
type: Design
status: Draft v2
source: "Shahriar-এর reference mockup (2026-10-22, Downloads/retrovision.png) — source of truth · Obsidian → 10 Standards/frontend/00, 01, 05, 06, 09, 16"
created: 2026-10-22
updated: 2026-10-22
---

# Retro Vision — Design System

> Marketing surface — `16`-এর interim নিয়ম প্রযোজ্য, **`13` (dashboard system) নয়**।
>
> **v2 (2026-10-22):** Shahriar-এর reference mockup-এর সাথে মেলানো। v1-এর SVG "plate", Archivo width-axis headline ও "gradient text নিষেধ" নিয়ম বাদ — brand owner-এর সরাসরি নির্দেশ।

## 1. Brand Identity

| | |
|---|---|
| Personality বাক্য | **একটা fantasy game campaign-এর key art — বিশাল জগৎ, একা যোদ্ধা, আত্মবিশ্বাসী headline।** |
| Adjective | Cinematic · epic · confident · premium |
| Logo | Cyan→violet "R" mark (SVG, `SiteHeader.tsx → LogoMark`) + **RETRO**VISION wordmark — mockup থেকে পুনর্নির্মিত। আসল logo file এলে replace (DECISION-PENDING) |
| Design principles | ১. Art পুরো screen জুড়ে, text বাঁয়ে · ২. Cyan = action, violet = gradient-এর শেষ প্রান্ত · ৩. Sharp-ish corner (4–6px) · ৪. Text কখনো warrior ঢাকবে না |

### Art direction

| দিক | সিদ্ধান্ত |
|---|---|
| Typography | Plus Jakarta Sans (800 headline, 400 body, 500–600 UI) · IBM Plex Mono (eyebrow, microcopy) |
| Layout | Full-bleed hero, **সব content মাঝখানে (text-center)** — Shahriar-এর নির্দেশ, 2026-10-22। (`01 §05`-এ centered hero AI-formula তালিকায় আছে; brand owner-এর সিদ্ধান্তে override) |
| Image direction | একটাই full-bleed key art: `public/images/retro-vision-hero.png` (AI-generated fantasy scene, Shahriar-এর দেওয়া) |
| Overlay | Mobile: উপর→নিচ · Tablet/desktop: মাঝখানে ellipse (text-এর পেছনে ঘন, কিনারায় হালকা) — যোদ্ধা ডানে উজ্জ্বল থাকে |
| Motion | Text-এর staggered rise, art-এর ধীর scale-settle, আর art-এর ভেতরে WebGL warp: cape বাতাসে, ১px শ্বাস, fog drift (§13) |

## 2. Color Palette

```css
@theme {
  --color-bg: #050a14;            /* page */
  --color-surface: #0a1120;       /* mobile menu panel */
  --color-surface-2: #111a2c;     /* raised */
  --color-line: rgb(148 163 184 / 0.18);        /* divider */
  --color-line-strong: rgb(148 163 184 / 0.35); /* subtle border */
  --color-fg: #f5f7fb;            /* primary text */
  --color-fg-muted: #a8b6cc;      /* paragraph, eyebrow */
  --color-fg-subtle: #8492a9;     /* microcopy */
  --color-accent: #02adff;        /* cyan — action */
  --color-accent-violet: #6858f5; /* violet — gradient end */
  --color-on-accent: #03101c;     /* text on cyan */
}
```

Overlay: `rgb(4 9 20)` বিভিন্ন alpha-তে (Hero.tsx)।

| Semantic | Token | এখন |
|---|---|---|
| Success / warning / error | DECISION-PENDING | Phase 4 form-এ লাগবে |

## 3. Themes

Dark (default) ও light — `<html data-theme>`-এ। `app/layout.tsx`-এর inline script paint-এর আগে `localStorage["rv-theme"]` বা OS preference পড়ে বসায় (flash নেই)। Toggle: `components/ui/ThemeToggle.tsx` (header-এ, desktop ও mobile)।

| Token | Dark | Light |
|---|---|---|
| `bg` | `#050a14` | `#f4f6fa` |
| `surface` | `#0a1120` | `#ffffff` |
| `surface-2` | `#111a2c` | `#e9eef6` |
| `fg` | `#f5f7fb` | `#0b1220` (17:1) |
| `fg-muted` | `#a8b6cc` | `#44526a` (7.3:1) |
| `fg-subtle` | `#8492a9` | `#5b6880` (5.2:1) |
| `accent-ink` (accent রঙের **লেখা**) | `#02adff` | `#0369a1` (5.5:1) |
| `danger` | `#ff8a8a` | `#c53030` (5.1:1) |
| `accent` (fill) | `#02adff` | `#02adff` |

নিয়ম: cyan `accent` শুধু fill/rule/marker — light-এ লেখা হিসেবে 2.3:1, তাই লেখায় সবসময় `accent-ink`।
Hero ও Final CTA রাতের art-এর উপর, তাই `data-theme="dark"`-এ pinned; header hero-র উপরে থাকা অবস্থায় dark, scroll-এর পর visitor-এর theme।

## 4. Typography (1769px-এ reference-এর সাথে মাপা)

| Role | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 (দুই line, **একই font size**) | Jakarta | mobile `clamp(2.125rem, 9.4vw, 2.625rem)` → md `clamp(2.25rem, 4vw, 4rem)` (≈1600+ এ 64px) | 800 | 1.08 | -0.02em |
| H1 line 1 | `#f1f5f9` | | | | |
| H1 line 2 | `linear-gradient(90deg, #02adff, #8b5cf6)` | | | | |
| Paragraph | Jakarta, max 560px | 17px → md `clamp(1.0625rem, 1.08vw, 1.1875rem)` | 400 | 1.65 | 0 · `text-pretty` |

> দুই line আলাদা size করে সমান চওড়া করা চেষ্টা করা হয়েছিল — Shahriar বাতিল করেছেন। দুই line সবসময় একই size।
| Nav link | Jakarta | 15px | 500 | — | 0 |
| Button | Jakarta | 15px | 600 | — | 0 |
| Wordmark | Jakarta | 24px | 800 / 500 | 1 | 0.01em |
| Eyebrow | Plex Mono | 12px (mobile 11px) | 400 | — | 0.13em |
| Microcopy | Plex Mono | 12px | 400 | 1.9 | 0.07em |

Paragraph `max-width: 500px` · microcopy `max-width: 27rem`।

## 5. Spacing

| কী | মান |
|---|---|
| Container | `max-w-[1386px]` + `px-5 md:px-8 xl:px-12` → content 1290px |
| Header height | `--header-h: 5.625rem` (90px) |
| Eyebrow → H1 | 24 / 28px |
| H1 → paragraph | 16px |
| Paragraph → buttons | 32px |
| Buttons → divider | 36px · divider → microcopy 24px |
| Hero | `min-h-svh`, desktop-এ content vertically centered; mobile-এ উপরে, নিচে `34svh` art-এর জন্য |

## 6. Border Radius

| Token | px | ব্যবহার |
|---|---|---|
| `--radius-xs` | 2 | focus ring |
| `--radius-sm` | 4 | hero button |
| `--radius-md` | 6 | navbar CTA |

## 7. Shadows

নেই। Depth আসে art ও overlay থেকে।

## 8. Icons

Inline SVG arrow (`ArrowIcon.tsx`), 1.75 stroke, button-এ 14px। ↗ = start · → = in-page।

## 9. Buttons (`ButtonLink.tsx`, সব 54px উঁচু)

| Variant | চেহারা | কোথায় |
|---|---|---|
| `primary` | solid cyan, dark text, 4px | Hero "Start a Project" — page-এ একটাই |
| `outline` | 1px cyan border, 6px | Navbar CTA |
| `ghost` | 1px `fg/55` border, white text, 4px | "Explore Our Work" |

Hover: primary → white bg · outline → cyan fill · ghost → border সাদা + হালকা fill। Arrow 2–4px সরে।

## 10. Forms

Phase 4 — DECISION-PENDING।

## 11. Components

| Component | নিয়ম |
|---|---|
| Header | `absolute`, transparent, art-এর উপর; nav desktop-এ ঠিক মাঝখানে; `< 1024`-এ hamburger |
| Mobile menu | Full-height `surface` panel, বড় link, নিচে primary CTA |
| Divider | 1px `line`, শুরুতে 32px cyan segment |

## 12. Responsive

| Breakpoint | Layout |
|---|---|
| < 768 | Centered text উপরে, CTA stack (full width), art নিচে (`object-[80%_100%]` → warrior) |
| 768–1279 | Centered, `object-[68%_50%]` (1024×768-এ cape-এর শেষ ~26px কাটা যায় — 4:3-এ দুটো একসাথে রাখা যায় না) |
| ≥ 1280, aspect < 16:9 | `object-[60%_50%]` (1440×900, 1680×1050, 1280×800) |
| ≥ 1280, aspect ≥ 16:9 | `object-[40%_50%]` (1280×720, 1366, 1536, 1791×924, 1920×1080) |

> Framing নিয়ম: headline-এর ডান কিনারা যোদ্ধার কাঁধ (art x≈1318) থেকে ≥25px দূরে, আর cape tip (art x≈1615) viewport-এর ভেতরে। 2026-10-22-এ ৯টা screen size-এ মাপা।

## 13. Animations

| কী | মান |
|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover | 200ms |
| Text entrance | `rise` 900ms, stagger 70–90ms |
| Art | `settle` 1800ms (scale 1.05 → 1, fade in) |

### Hero art motion (`components/visuals/HeroArtMotion.tsx`)

Art একটাই flattened PNG — আলাদা layer নেই। তাই WebGL2 একই image আবার আঁকে এবং **শুধু mask যেখানে বলে সেখানে** pixel সরায়। Mask (`public/images/hero-motion-mask.png`) artwork-এর নিজের pixel space-এ hand-traced, `scripts/build-hero-motion-mask.mjs` দিয়ে বানানো।

| Channel | কী নড়ে | কীভাবে | Cycle |
|---|---|---|---|
| R | Cape — কাঁধে 0, tip-এ সর্বোচ্চ | Shoulder→tip travelling wave (≤6.5px) + flutter (≤1.8px) + noise + ধীর gust envelope | ~4s · ~2.8s · ~2.4s |
| G | নরম fog ও মেঘ (detail-filter দিয়ে textured terrain বাদ) | fbm drift (≤3.5px) + আলোর ±4% ঢেউ | ~20–40s অনুভূতি |
| B | মাথা ও কাঁধ | ১px উপরে-নিচে | ~5.2s |
| — | Sunset glow | ±3.5% উজ্জ্বলতা | ~27s |
| — | **Depth of field** (md+) | `[data-hero-focus]` block-এর পেছনে (চওড়া = headline × 1.2, উঁচু = copy × 1.15) mip-blur, lod ≤ 2.6; কিনারায় smoothstep 0.4→1 — যোদ্ধা, চাঁদ, spire sharp | স্থির |

যাচাই (2026-10-22): motion শূন্যে output ও মূল image-এর পার্থক্য ≤1/255; চার frame জুড়ে ~19.6k pixel নড়ে, **mask-এর বাইরে ০টা** — moon, castle, island, শরীর, পা স্থির।

নিয়ম: 30fps · DPR ≤2 ও ≤3.6MP · hero offscreen হলে বন্ধ · WebGL2 না থাকলে static `<img>` · প্রথম 2.5s-এ amplitude 0→1।

`prefers-reduced-motion` → motion বন্ধ; canvas একটা স্থির frame আঁকে (শুধু depth of field), resize-এ আবার আঁকে। WebGL2 না থাকলে static `<img>` + overlay।

> কেন DOF: art বাঁ দিকে লেখার জন্য বানানো, centered লেখার ঠিক পেছনে castle পড়ে (Shahriar: "লেখা ঘিঞ্জি")। ছবি সরানোর জায়গা নেই (cover-এ ১৭৯১px-এ মাত্র ৫৭px বাড়তি)। স্থায়ী সমাধান: মাঝখান ফাঁকা রেখে নতুন art।

## 14. Accessibility

- Contrast (bg-এর উপর): fg ≈ 18:1 · fg-muted ≈ 9:1 · fg-subtle ≈ 6:1 · on-accent/accent ≈ 8:1 — art-এর উপর overlay এগুলো রক্ষা করে, কিন্তু **আসল art এলে আবার মাপতে হবে**
- Art decorative (`alt=""`) · focus ring সব control-এ · tap target ≥ 44px · skip link

## 14b. Landing page motion (Pubzi থেকে নেওয়া pattern, নিজের কোডে)

| Pattern | কোথায় | কীভাবে |
|---|---|---|
| Split-letter rise (rotateX −70° → 0, 26ms stagger) | Hero H1 | `SplitChars` + CSS `.split-char` |
| Light glints on hairline | Hero-র নিচের রেখা | CSS `.glint`, 3.2s, ৪টা offset |
| Bobbing scroll cue | Hero নিচে (md+) | CSS `.bob` 2.8s |
| Two-row marquee (solid + outlined, বিপরীত দিকে) | Hero-র পরে | CSS `.marquee-track` 48s |
| Scroll-filled statement (0.18 → 1, scrub) | About | GSAP ScrollTrigger |
| Section reveal (y 28, 0.8s, stagger 0.1) | প্রতিটা section | `Reveal` (once) |
| Cursor ring (32px, link-এ 1.8×) | Desktop, fine pointer | `CursorRing` |
| ❌ Counters (500+ ইত্যাদি) | — | যাচাইকৃত সংখ্যা নেই, তাই বাদ |

Section rhythm: hero OPEN → marquee TIGHT → about OPEN → problems/services DENSE → process → work (image-led) → engagement → FAQ → form (focused) → CTA। Background পালাক্রমে `bg` / `surface`।

Error color: `--color-danger: #ff8a8a` (form)।

## 15. যা কখনো করা যাবে না

1. Fake client logo, testimonial, statistic, award
2. Hero art-কে card / frame / ছোট illustration বানানো
3. Text দিয়ে warrior ঢাকা
4. Glassmorphism card, random particle/grid
5. Split-character text animation
6. Stock photo বা অসম্পর্কিত gaming screenshot

## v7 (2026-10-29) — আসল brand

> এই অংশ উপরের পুরনো মানগুলোকে override করে।

| কী | মান | উৎস |
|---|---|---|
| Logo | `public/images/retro-vision-logo.png` (3D চশমা + `RETRO_ViSiON`), `components/ui/Logo.tsx`; favicon = চশমা (`app/icon.png`) | Shahriar-এর দেওয়া file |
| Display font | Space Grotesk (h1–h3, marquee, tabs) | Heinzsauce-এর পাঠানো তালিকা |
| Body font | Inter | ঐ |
| Mono | JetBrains Mono | ঐ |
| `accent` (fill) | `#0092d7` — logo-র নীল লেন্স; button-এ dark text 5.6:1 | Logo |
| `accent-red` | `#e6464f` — logo-র লাল লেন্স; marker ও gradient | Logo |
| `accent-violet` | `#7b5ce0` — নীল→লাল gradient-এর মাঝখান | Logo frame |
| `accent-ink` | dark `#2aa8ef` (7.5:1) · light `#006aa3` (5.4:1) | মাপা |
| Brand gradient | `#2aa8ef → #7b5ce0 → #e6464f` (hero line 2, final CTA, package highlight) | Logo frame + লাইভ site |

নাম সবসময় `Retro_Vision` (underscore সহ), tagline: "Making games impossible to ignore."

## v8 (2026-11-03) — main site-এর হুবহু design system

> **এটাই এখন source of truth।** উপরের v1–v7-এর যেখানে অমিল, এই অংশ জেতে। Reference: retro-vision-games.lovable.app (Shahriar: "এটাই আমাদের main website")।

**Theme:** শুধু light page; hero, packages, insights, CTA card, footer আর কিছু card `data-theme="dark"` (ink panel)। Toggle বাদ।

| Token | মান | কোথায় |
|---|---|---|
| `bg` | `oklch(98.5% .003 240)` | page |
| `surface` / `paper` | `oklch(100% 0 0)` | card, problems/process/why |
| `slate` | `oklch(92.5% .012 235)` | services |
| `quartz` | `oklch(93% .009 240)` | FAQ |
| `surface-2` (muted) | `oklch(96% .008 240)` | CTA wrapper |
| `ink` | `oklch(16% .02 245)` | dark panel |
| `fg-muted` | `oklch(48% .02 245)` — 6.5:1 paper | body |
| `accent` | `oklch(62% .16 235)` brand blue | dot, rule, highlight |
| `accent-strong` | `oklch(52% .15 238)` — সাদা লেখা 5.2:1 | button (main site-এর রঙ সাদা লেখায় 3.4:1, তাই সামান্য গাঢ়) |
| `accent-red` | `oklch(62% .22 25)` | marker square, red highlight |
| Anaglyph | `linear-gradient(135deg, blue, oklch(55% .2 280), red)` | `.text-anaglyph` |

**Signature pattern (`app/globals.css`):** `.highlight-blue/-red` (নিচের 40%-এ 22% রঙ) · `.text-anaglyph` · `.description-rail(-red/-paper)` · `.card-signal` (hover-এ কোণ থেকে আলো) · `.bg-grain` · `.bg-plus-grid` · `.bg-line-field`। Radius: button 10px, card 12px, navbar/CTA pill। Shadow: `--shadow-card`, `--shadow-depth`, glow-blue/red।

**Section ক্রম:** Hero (ink) → Problems (paper) → Services + full scope tabs (slate) → Packages (ink) → Process (paper) → Why (paper) → Insights (ink) → FAQ (quartz) → CTA card + form (muted) → Footer (ink)।

**ছবি:** `public/images/site/` — main site থেকে ১৮টা (Shahriar-এর অনুমতিতে, 2026-11-03)।

**Motion:** hero art-এর ধীর drift (24s), veil sheen (16s), content-এর fade-up, section reveal (GSAP)। Split-letter, marquee, cursor ring, cape WebGL বাদ — main site-এ নেই।

## v9 (2026-11-03) — Ad landing page (free marketing audit)

> Shahriar: "design system same type হবে, কিন্তু পুরো website copy নয় — ad run-এর জন্য better landing page লাগবে।" v8-এর **token ও pattern** থাকছে; **layout, section, copy** এখন ad conversion-এর জন্য নতুন। Standard: `00`, `16` (marketing — `13` নয়), `01`, `09`, `15` (§7 async button, §9 disabled নয়)।

**Offer:** Free marketing audit · **Audience:** pre-launch indie dev · **Navbar:** logo + একটাই CTA (menu নেই)।

```
Hero (ink, OPEN)   copy বাঁয়ে 7col · request slip (paper, data-theme="light") ডানে 5col — form above the fold
Pains (paper, TIGHT)        ৩টা worry — card নয়, ruled list
Audit report (slate, OPEN)  deliverable-টাই দেখানো: paper report, 01–04 area × 3 check
Steps (paper+plus-grid)     ৩ ধাপ, blue→violet→red rule
Fit (paper, DENSE)          "A good fit" / "Probably not yet" split
FAQ (quartz)                audit-নির্দিষ্ট ৫টা প্রশ্ন
Final CTA (ink, FOCUSED)    "Your launch only happens once." → #free-audit
Footer (ink, compact)       email · main site · privacy
```

**Brand-নির্দিষ্ট দিক:** content presentation (audit = report document) · request slip (dashed header, mono label) · navigation (শুধু CTA) · anaglyph typography।
**Conversion:** সব CTA `#free-audit`-এ; UTM tag hidden field হয়ে email-এ যায়; submit button `aria-disabled` + guard (disabled নয়); success-এ form → receipt।
**বাদ:** services tabs, packages, insights, why, process — ad visitor-এর সিদ্ধান্তে লাগে না।

## v10 (2026-11-03) — v7 page ফেরত + main site-এর রঙ ও pattern

> Shahriar: "1st-এর landing page-টাই better ছিল, শুধু কিছু change লাগত — main site-এর মতো navbar বা bg image কেন?" v8/v9 বাতিল। **e402120 (v7)-এর layout, navbar, warrior hero art + cape motion, light/dark toggle, services tabs, inquiry form** ফেরত। Main site থেকে **শুধু রঙ, font আর design pattern** নেওয়া।

| নেওয়া | কোথায় |
|---|---|
| Ink/paper palette (oklch) দুই theme-এ | `app/globals.css` — dark = ink `oklch(16% .02 245)`, light = paper `oklch(98.5% .003 240)` |
| Brand blue `#0092d7` (= logo blue), red `#ee343b`, violet `#6159e1` | accent token, hero gradient, capability visual |
| Red-square eyebrow | `SectionHeading`, About, hero (sm+) |
| Marker highlight (`.highlight-blue/-red`) | প্রতিটা section title-এর key phrase |
| Anaglyph gradient (`.text-anaglyph`) | Inquiry ও Final CTA heading |
| Description rail | SectionHeading intro (left-aligned) |
| Radius md 10px | button/card |

**নেওয়া হয়নি:** main site-এর navbar, hero image, section ক্রম, copy।
**Contrast (মাপা):** button 5.6:1 · muted 10.2 (dark) / 6.8 (light) · subtle 6.9 / 5.7।

## v10.1 (2026-11-04) — What we do board, service picker, main-site buttons

| বদল | বিস্তারিত |
|---|---|
| **What we do** | Tabs বাদ (১২টা service লুকানো থাকত)। এখন 2×2 discipline board — প্রতিটায় index, blue/red marker, title, tagline, ৪টা service (নাম + focus)। Variant chip বাদ। |
| **Where to start** | Package card-এ "Select this package" toggle (`aria-pressed`, card border নীল হয় `:has()` দিয়ে)। নিচে "Or build your own scope" — ১৬টা service toggle chip, discipline অনুযায়ী। Summary bar: কতগুলো বাছা হয়েছে + Clear + "Continue to inquiry"। |
| **Form** | "What do you need help with?" checkbox বাদ। "Your selection" — বাছাইগুলো removable chip + hidden `services` input; কিছু না বাছলে Where to start-এর link। Action শুধু `PICKABLE` (৩ package + ১৬ service) গ্রহণ করে। |
| **Selection state** | `lib/selection.ts` — module store + `useSyncExternalStore`; page visit পর্যন্ত থাকে, success হলে clear। |
| **Buttons** | Main site-এর মতো: 10px radius, `accent-strong` নীল + সাদা লেখা (5.2:1), navbar-এ নীল pill, dark art-এ paper button (19.4:1), সব arrow → ডানে। Submit button `aria-disabled` + guard (disabled নয়)। |
