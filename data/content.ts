// Landing-page copy. Everything here describes what Retro Vision does and how —
// no client names, numbers, awards or testimonials until real ones exist.

export const MARQUEE_ITEMS = [
  "Visual Identity",
  "Game Websites",
  "Launch Marketing",
  "Creative Direction",
  "Digital Experiences",
  "Player Growth",
] as const;

export const ABOUT_STATEMENT =
  "We are a creative and growth studio built only for games. Identity, website and marketing come from one team, so your game reaches players as one clear world, not three disconnected vendors.";

export const ABOUT_PRINCIPLES = [
  {
    title: "Games only",
    body: "We don't split our attention between banks and burger chains. Every brief we take is a game, so we already speak the language of builds, wishlists and launch windows.",
  },
  {
    title: "One team, one world",
    body: "The person shaping your visual identity sits next to the person planning your launch. Nothing gets lost in hand-offs between agencies.",
  },
  {
    title: "Built to be found",
    body: "Beautiful work that nobody sees doesn't help you. Everything we make is designed to earn attention from the players most likely to love your game.",
  },
] as const;

export const PROBLEMS = [
  {
    problem: "Your game looks different everywhere it appears.",
    solution:
      "We build one visual identity — logo, key art direction, colour and type — and apply it to your store page, site and socials so players recognise it instantly.",
  },
  {
    problem: "Your website is an afterthought built the week before launch.",
    solution:
      "We design and build a fast, mobile-ready game site that tells your story, collects wishlists and newsletter sign-ups, and is easy for your team to update.",
  },
  {
    problem: "You post updates, but they don't reach the right players.",
    solution:
      "We plan the launch around the players who already love games like yours, then create the campaigns, assets and timing that put your game in front of them.",
  },
] as const;

export const SERVICES = [
  {
    id: "identity",
    index: "01",
    title: "Visual Identity",
    lead: "Make your game recognisable at a glance.",
    deliverables: ["Logo and wordmark", "Key art direction", "Colour and type system", "Store page and social templates"],
  },
  {
    id: "digital",
    index: "02",
    title: "Digital Experiences",
    lead: "A home for your game that works as hard as you do.",
    deliverables: ["Game and studio websites", "Press kit pages", "Wishlist and newsletter flows", "Fast, accessible front-end builds"],
  },
  {
    id: "marketing",
    index: "03",
    title: "Strategic Marketing",
    lead: "Reach the players your game was made for.",
    deliverables: ["Audience and positioning", "Launch and update campaigns", "Social and community content", "Trailer and announcement planning"],
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Discover",
    body: "We play your build, read your design docs and learn who you're making the game for.",
  },
  {
    step: "02",
    title: "Define the world",
    body: "We agree on positioning, the visual direction and a plan with clear deliverables and dates.",
  },
  {
    step: "03",
    title: "Build",
    body: "Identity, website and campaign assets are designed and produced together, with reviews at every stage.",
  },
  {
    step: "04",
    title: "Launch and grow",
    body: "We ship, measure what works and keep refining while your game finds its players.",
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Identity systems",
    body: "Logos, wordmarks and the visual rules that keep every screen, store page and post consistent.",
    visual: "identity",
  },
  {
    title: "Game websites",
    body: "Story-led sites with trailers, wishlist calls to action and press resources, built to load fast.",
    visual: "website",
  },
  {
    title: "Launch campaigns",
    body: "Announcement, demo and release beats planned around your audience, with the assets to match.",
    visual: "campaign",
  },
] as const;

export const ENGAGEMENTS = [
  {
    name: "Single project",
    fit: "For a specific deliverable with a clear finish line.",
    includes: ["One defined scope, such as an identity or a website", "Timeline and milestones agreed up front", "Revision rounds set out in the plan"],
  },
  {
    name: "Launch sprint",
    fit: "For the months around an announcement, demo or release.",
    includes: ["Identity, website and campaign assets together", "Launch plan with dates and channels", "Regular check-ins through launch"],
  },
  {
    name: "Growth partner",
    fit: "For studios that want ongoing creative and marketing support.",
    includes: ["Monthly creative and campaign capacity", "Update and event content", "Regular review of what's working"],
  },
] as const;

export const ENGAGEMENT_NOTE =
  "Every project is quoted after a scoping conversation, so you only pay for what your game needs.";

export const FAQS = [
  {
    q: "Do you only work with games?",
    a: "Yes. We work exclusively with game developers, studios and gaming companies, from solo indie developers to established teams.",
  },
  {
    q: "We're a small indie team. Is this for us?",
    a: "Yes. We shape the scope around your stage and budget, whether that's a focused identity project or a complete launch sprint.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. After our first conversation we send a plan with clear milestones and dates before any work begins.",
  },
  {
    q: "How is pricing decided?",
    a: "Every project is quoted individually after we understand your game, your goals and your timeline. The quote lists exactly what is included before anything starts.",
  },
  {
    q: "Can you work with studios outside our time zone?",
    a: "Yes. We work with developers worldwide and plan check-ins around the overlap in our working hours.",
  },
  {
    q: "What do you need from us to get started?",
    a: "A short description of your game, where it is in development, what you need help with, and any deadlines you're working towards. The inquiry form below covers all of it.",
  },
] as const;

export const INQUIRY_SERVICES = ["Visual identity", "Website", "Marketing", "Not sure yet"] as const;

export const INQUIRY_BUDGETS = [
  "Under $5k",
  "$5k – $15k",
  "$15k – $40k",
  "$40k+",
  "Not sure yet",
] as const;

export const INQUIRY_TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"] as const;
