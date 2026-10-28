// Landing-page copy. Source of truth: Retro_Vision's services breakdown and the
// studio's own site (retro-vision-games.lovable.app). No invented clients,
// numbers, awards or testimonials.

export const HERO_COPY =
  "Thousands of great games compete for attention every year. Retro_Vision connects your positioning, your Steam page and your launch so the right players instantly understand, wishlist and buy.";

export const MARQUEE_ITEMS = [
  "Store Audits",
  "Steam Assets",
  "Core Premise",
  "Trailers",
  "Creator Campaigns",
  "Next Fest Strategy",
  "Localization",
  "Community Ops",
] as const;

export const ABOUT_STATEMENT =
  "We connect your positioning, store page and launch so players instantly understand, wishlist and purchase. We treat your launch as the objective, not just another billable account.";

export const ABOUT_PRINCIPLES = [
  { title: "Senior attention", body: "The thinking stays close to the people doing the work." },
  { title: "Connected disciplines", body: "Positioning, production and momentum share one direction." },
  { title: "Fair scope", body: "We define what matters and leave out what does not." },
  { title: "Honest advice", body: "If another intervention matters more, we will say so." },
  { title: "Your work stays yours", body: "Accounts, source files and documentation remain with you." },
] as const;

export const PROBLEMS = [
  {
    problem: "Unclear premise",
    detail:
      "Every clip and screenshot tells a different story, leaving players unsure about the game's selling points or why they should care.",
    pillar: "Positioning",
    solution: "We find the one hook that makes your game click in a sentence, then build every message around it.",
  },
  {
    problem: "Leaky store page",
    detail:
      "Players start landing on your page, whether from press or social, but find no compelling reason to wishlist before leaving.",
    pillar: "Storefronts",
    solution: "We rework capsules, trailer order and page copy so visitors leave with a wishlist.",
  },
  {
    problem: "Release day cliff",
    detail:
      "Years of passion poured into crafting the perfect launch, only for the moment to arrive and release into complete silence.",
    pillar: "Launch",
    solution: "Festivals, demos, press and release day planned as one build-up instead of scattered moments.",
  },
] as const;

export type Service = { name: string; focus: string; variants: readonly string[] };
export type ServiceCategory = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  services: readonly Service[];
};

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
  {
    id: "storefront",
    index: "01",
    title: "Storefront & Conversion",
    tagline: "Give every visit a reason to become a wishlist.",
    services: [
      {
        name: "Store Audit",
        focus: "Line-by-line Steam page teardown scored against direct comparables to deliver a prioritised fix list.",
        variants: ["Full page teardown", "Capsule & screenshot review", "Tag & category audit", "Conversion fix list"],
      },
      {
        name: "Copywriting",
        focus: "Hook-first rewrite across every line of store and press text.",
        variants: ["Short description", "About block", "Feature bullets", "Press kit boilerplate"],
      },
      {
        name: "Steam Assets",
        focus: "Unified capsule, screenshot and key art visual system built to read at thumbnail scale.",
        variants: ["Capsule redesign", "Screenshot direction", "Key art system", "Sale-event variants"],
      },
      {
        name: "Localization",
        focus: "Store copy and key art text localised across eight major Steam markets with native-speaker review.",
        variants: ["Store description packs", "Capsule text variants", "Native review pass", "Regional tag audit"],
      },
    ],
  },
  {
    id: "positioning",
    index: "02",
    title: "Positioning & Strategy",
    tagline: "Find the hook, the audience and the next move.",
    services: [
      {
        name: "Core Premise",
        focus:
          "Uncovering what the game actually means to its core fans; crafting a hook and one-liner your team can rally behind.",
        variants: ["Positioning workshop", "Hook development", "Tagline system", "Pitch one-liner"],
      },
      {
        name: "Audience Intel",
        focus: "Written mapping of specific player communities, creator channels and comparative teardowns.",
        variants: ["Audience mapping", "Competitive teardown", "Community recon", "Segment messaging"],
      },
      {
        name: "Launch Roadmap",
        focus: "Ranked, dated sequence from current build stage to release day, filtered for team bandwidth.",
        variants: ["30-day action list", "Beat calendar", "Milestone planning", "Priority triage"],
      },
      {
        name: "Festival Strategy",
        focus:
          "End-to-end preparation for Steam Next Fest and festival circuits, from demo scope to day-by-day playbooks.",
        variants: ["Next Fest preparation", "Festival submissions", "Demo strategy", "Event playbook"],
      },
    ],
  },
  {
    id: "trailers",
    index: "03",
    title: "Trailers & Motion",
    tagline: "Make the game read in the seconds that matter.",
    services: [
      {
        name: "Storyboarding",
        focus: "Locking concept, script, pacing map and shot list before a single frame is cut.",
        variants: ["Concept & script", "Trailer structure", "Hook mapping", "Capture briefs"],
      },
      {
        name: "Cut & Edit",
        focus:
          "Full-pipeline trailer production (announcement, gameplay, launch) tailored to storefront and social formats.",
        variants: ["Announcement trailer", "Gameplay trailer", "Launch trailer", "Social cutdowns"],
      },
      {
        name: "Gameplay Capture",
        focus: "Directed in-engine capture sessions producing trailer-grade footage and looping GIF kits for social feeds.",
        variants: ["Directed capture", "GIF kit", "Social loops", "Press kit clips"],
      },
      {
        name: "Audio Design",
        focus:
          "Impactful sound design, platform audio mixes and music licensing and supervision to give cuts their emotional weight.",
        variants: ["Sound design", "Music supervision", "Platform mixes", "Trailer critique"],
      },
    ],
  },
  {
    id: "campaigns",
    index: "04",
    title: "Campaigns & Creators",
    tagline: "Connect coverage, community and paid reach around each public beat.",
    services: [
      {
        name: "Outreach",
        focus: "Hand-researched pitching and key distribution targeting press and creators who already play your genre.",
        variants: ["Press outreach", "Creator outreach", "Key distribution", "Coverage reporting"],
      },
      {
        name: "Creator Campaigns",
        focus:
          "Ongoing creator relationships compounded over months, plus concentrated 25-creator tour waves for milestone dates.",
        variants: ["Rolling outreach", "Targeted creator tours", "Activation waves", "Embargo management"],
      },
      {
        name: "Community Ops",
        focus:
          "Discord architecture, authentic devlog ghostwriting, Reddit navigation and release-week war room coverage.",
        variants: ["Discord architecture", "Devlog ghostwriting", "Reddit strategy", "Launch war room"],
      },
      {
        name: "Paid Distribution",
        focus:
          "Measured paid test pilots on select channels, scaling into managed multi-channel campaigns once unit economics prove out.",
        variants: ["Paid pilot", "Launch push", "Multi-channel campaigns", "Performance reporting"],
      },
    ],
  },
];

export const PROCESS = [
  { step: "01", owner: "Your move", title: "Write in", body: "Tell us the stage, the outcome and the range you are working with." },
  {
    step: "02",
    owner: "Our read",
    title: "Project review",
    body: "We look at the page, the build and the constraint before recommending work.",
  },
  {
    step: "03",
    owner: "Your decision",
    title: "Written scope",
    body: "You receive the order of operations, boundaries and price before committing.",
  },
  {
    step: "04",
    owner: "One thread",
    title: "Engagement begins",
    body: "Once accepted, the same direction stays connected from decision to delivery.",
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Steam storefronts",
    body: "Capsules, screenshots, trailer order and page copy reworked so visitors leave with a wishlist.",
    visual: "storefront",
  },
  {
    title: "Trailers & motion",
    body: "Announcement, gameplay and launch trailers built around what makes your game fun to play, not generic hype.",
    visual: "trailer",
  },
  {
    title: "Creator campaigns",
    body: "Your game in front of the creators, communities and players most likely to care, around every public beat.",
    visual: "campaign",
  },
] as const;

export const PACKAGES = [
  {
    name: "Launch Readiness",
    duration: "4–8 weeks",
    stage: "Pre-announce → first public build",
    summary: "Positioning settled, the store page fixed and a dated plan in hand — before the one announcement you get.",
    includes: [
      "Positioning & audience read",
      "Store page diagnosis",
      "30-day priority action list",
      "Trailer & asset critique",
      "Steam capsule redesign",
      "Screenshot direction & retouch",
    ],
    highlight: false,
  },
  {
    name: "Wishlist Growth",
    duration: "12–24 weeks",
    stage: "Announced → 3–12 months from release",
    summary: "An audience engine that runs every month, so the wishlist curve compounds instead of waiting on a lucky post.",
    includes: [
      "Content calendar & devlog system",
      "Creator outreach, rolling",
      "Festival & Next Fest preparation",
      "Discord & community audit",
      "Animated GIF kit",
      "Monthly performance review",
    ],
    highlight: true,
  },
  {
    name: "Momentum Buildup",
    duration: "8–14 weeks",
    stage: "Release week → the quarter after",
    summary:
      "Operators keeping the game visible through release week and the quarter after, so the spike doesn't flatten into silence.",
    includes: [
      "Launch war room",
      "First 30 days post-launch",
      "Community operations",
      "Press & creator activation waves",
      "Platform feature pitches",
      "Three-month sustain extension",
    ],
    highlight: false,
  },
] as const;

export const PACKAGES_NOTE =
  "Not sure? Choose the closest moment. Packages are starting shapes — the intake is not a commitment.";

export const FAQS = [
  {
    q: "Why is there no public price?",
    a: "Two games at the same stage can need very different work. We define the scope first, then put a price against it.",
  },
  {
    q: "Do I have to take a package exactly as listed?",
    a: "No. Packages are useful starting shapes. The intake gives us enough context to recommend a smaller or different scope.",
  },
  {
    q: "Who owns the work?",
    a: "You do. The accounts, source files and documentation stay with your team.",
  },
  {
    q: "Where do you stop?",
    a: "Game development, publishing deals, bought audiences and campaigns for a game that is not ready. We are not the best specialist for every isolated task. We are a deeply invested partner when the whole marketing picture needs one thread.",
  },
  {
    q: "What happens after I submit?",
    a: "A person reads the project and replies within 48 hours. If there is a fit, the next step is a written scope — not a sales-call maze.",
  },
] as const;

export const INQUIRY_SERVICES = [
  "Storefront & conversion",
  "Positioning & strategy",
  "Trailers & motion",
  "Campaigns & creators",
  "Not sure yet",
] as const;

export const INQUIRY_STAGES = [
  "Pre-announce",
  "Announced, release 3–12 months out",
  "Release window",
  "Already launched",
] as const;

export const INQUIRY_BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"] as const;

export const STUDIO_EMAIL = "hello@retrovision.gg";
