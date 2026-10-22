import Image from "next/image";

// Code-drawn illustrations for "What we build". Each shows a kind of deliverable,
// made with Retro Vision's own brand and key art — never presented as client work.
// They use theme tokens, so they adapt to light and dark mode.

const ART = "/images/retro-vision-hero.png";

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-[4/5] overflow-hidden rounded-md border border-line-strong bg-surface-2 ${className}`}
    >
      {children}
    </div>
  );
}

function Mark({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 28 32" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#02adff" />
          <stop offset="1" stopColor="#6858f5" />
        </linearGradient>
      </defs>
      <g fill={`url(#${id})`}>
        <path d="M0 0h6v32H0z" />
        <path d="M6 0h9.5a8.5 8.5 0 0 1 0 17H6v-5.5h9.25a3 3 0 0 0 0-6H6z" />
        <path d="M12.6 15.6h6.7L27.5 32h-6.7z" />
      </g>
    </svg>
  );
}

// 01 — a brand board: mark, wordmark, palette and type.
export function IdentityVisual() {
  const swatches = [
    { color: "#02adff", name: "Signal" },
    { color: "#6858f5", name: "Dusk" },
    { color: "#050a14", name: "Night" },
    { color: "#f5f7fb", name: "Moon" },
  ];
  return (
    <Frame>
      <div className="absolute inset-0 grid grid-rows-[1.3fr_auto_1fr] gap-px bg-line-strong">
        <div className="flex flex-col items-center justify-center gap-4 bg-surface transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]">
          <Mark id="cap-mark-identity" className="h-16 w-auto" />
          <p className="text-lg leading-none tracking-[0.01em] text-fg uppercase">
            <span className="font-extrabold">Retro</span>
            <span className="font-medium">Vision</span>
          </p>
        </div>
        <div className="grid grid-cols-4 gap-px">
          {swatches.map((s) => (
            <div key={s.name} className="bg-surface p-2.5">
              <span className="block h-9 rounded-xs border border-line" style={{ background: s.color }} />
              <span className="mt-2 block font-mono text-[10px] text-fg-subtle">{s.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-px">
          <div className="flex flex-col justify-between bg-surface p-4">
            <span className="text-4xl leading-none font-extrabold text-fg">Aa</span>
            <span className="font-mono text-[10px] text-fg-subtle">Jakarta 800</span>
          </div>
          <div className="flex flex-col justify-between bg-surface p-4">
            <span className="font-mono text-4xl leading-none text-fg">Aa</span>
            <span className="font-mono text-[10px] text-fg-subtle">Plex Mono</span>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 02 — a browser window showing a game landing page.
export function WebsiteVisual() {
  return (
    <Frame>
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-sm border border-line-strong bg-surface shadow-[0_24px_48px_-24px_rgb(0_0_0/0.5)] transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1.5">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
          <span className="size-2 rounded-full bg-fg-subtle/50" />
          <span className="size-2 rounded-full bg-fg-subtle/50" />
          <span className="size-2 rounded-full bg-fg-subtle/50" />
          <span className="ml-3 flex-1 truncate rounded-xs bg-surface-2 px-2 py-1 font-mono text-[10px] text-fg-subtle">
            yourgame.com
          </span>
        </div>
        <div data-theme="dark" className="relative flex-[1.4] overflow-hidden bg-bg">
          <Image src={ART} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-[72%_55%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(4_9_20/0.92),rgb(4_9_20/0.2))]" />
          <div className="absolute inset-x-4 top-3 flex items-center justify-between">
            <span className="h-1.5 w-10 rounded-full bg-fg/70" />
            <span className="flex gap-2">
              <span className="h-1 w-6 rounded-full bg-fg/40" />
              <span className="h-1 w-6 rounded-full bg-fg/40" />
              <span className="h-1 w-6 rounded-full bg-fg/40" />
            </span>
          </div>
          <div className="absolute bottom-4 left-4 max-w-[60%]">
            <p className="text-lg leading-tight font-extrabold text-fg">Explore a bigger world.</p>
            <span className="mt-3 inline-block rounded-xs bg-accent px-2.5 py-1.5 text-[10px] font-semibold text-on-accent">
              Wishlist now
            </span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-3">
          {[0, 1, 2].map((n) => (
            <div key={n} className="flex flex-col gap-1.5 rounded-xs bg-surface-2 p-2">
              <span className="h-8 rounded-xs bg-line-strong" />
              <span className="h-1 w-4/5 rounded-full bg-fg-subtle/40" />
              <span className="h-1 w-3/5 rounded-full bg-fg-subtle/30" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// 03 — a launch post on a phone, with the campaign beats beneath it.
export function CampaignVisual() {
  const beats = ["Announce", "Demo", "Launch"];
  return (
    <Frame>
      <div className="absolute inset-x-0 top-6 bottom-20 flex justify-center">
        <div className="relative flex h-full w-[58%] flex-col overflow-hidden rounded-[1.25rem] border-[5px] border-fg/85 bg-surface transition-transform duration-700 ease-[var(--ease-out)] group-hover:-rotate-2">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <Mark id="cap-mark-campaign" className="h-4 w-auto" />
            <span className="h-1.5 w-12 rounded-full bg-fg/60" />
          </div>
          <div data-theme="dark" className="relative flex-1 overflow-hidden bg-bg">
            <Image src={ART} alt="" fill sizes="(min-width: 768px) 18vw, 50vw" className="object-cover object-[80%_60%]" />
            <span className="absolute top-2 left-2 rounded-xs bg-accent px-1.5 py-0.5 font-mono text-[9px] font-medium text-on-accent">
              7 DAYS
            </span>
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-3">
            <span className="h-1.5 w-11/12 rounded-full bg-fg/60" />
            <span className="h-1.5 w-2/3 rounded-full bg-fg-subtle/50" />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-5 bottom-6">
        <div className="relative flex justify-between">
          <span className="absolute inset-x-1 top-[5px] h-px bg-line-strong" />
          {beats.map((beat, i) => (
            <span key={beat} className="relative flex flex-col items-center gap-2">
              <span className={`size-[11px] rotate-45 border border-accent ${i === 2 ? "bg-accent" : "bg-surface-2"}`} />
              <span className="font-mono text-[10px] text-fg-subtle">{beat}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
