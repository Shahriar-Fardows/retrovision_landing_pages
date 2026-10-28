import Image from "next/image";

// Code-drawn illustrations for "What we build". Each shows a kind of deliverable,
// made with Retro_Vision's own key art and brand — never presented as client work.
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

// The logo's 3D glasses, small enough for an avatar.
function Glasses({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 18" className={className}>
      <rect x="1" y="1" width="38" height="13" rx="1.5" fill="#f8fafc" stroke="var(--color-line-strong)" />
      <rect x="4" y="4" width="12" height="7" fill="#0092d7" />
      <rect x="24" y="4" width="12" height="7" fill="#e6464f" />
      <path d="M17 14l3-4 3 4" fill="#f8fafc" />
    </svg>
  );
}

// 01 — a game store page: capsule, tags, wishlist call to action, screenshots.
export function StorefrontVisual() {
  const tags = ["Action RPG", "Open World", "Atmospheric"];
  const shots = ["20% 40%", "62% 45%", "88% 70%"];
  return (
    <Frame>
      <div className="absolute inset-4 flex flex-col overflow-hidden rounded-sm border border-line-strong bg-surface transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1.5">
        <div data-theme="dark" className="relative aspect-[460/215] shrink-0 overflow-hidden bg-bg">
          <Image src={ART} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-[70%_45%]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(4_9_20/0.85),transparent_70%)]" />
          <p className="absolute bottom-3 left-3 font-display text-base leading-tight font-bold text-fg">
            Your Game
            <span className="block font-mono text-[9px] font-normal tracking-[0.12em] text-fg-muted uppercase">
              Capsule · v2
            </span>
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-xs bg-surface-2 px-1.5 py-0.5 font-mono text-[9px] text-fg-muted">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="h-1.5 w-full rounded-full bg-fg-subtle/40" />
            <span className="h-1.5 w-11/12 rounded-full bg-fg-subtle/40" />
            <span className="h-1.5 w-3/5 rounded-full bg-fg-subtle/30" />
          </div>
          <span className="self-start rounded-xs bg-accent px-2.5 py-1.5 text-[10px] font-semibold text-on-accent">
            + Add to wishlist
          </span>
          <div className="mt-auto grid grid-cols-3 gap-1.5">
            {shots.map((pos) => (
              <div key={pos} data-theme="dark" className="relative aspect-video overflow-hidden rounded-xs bg-bg">
                <Image src={ART} alt="" fill sizes="10vw" className="object-cover" style={{ objectPosition: pos }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// 02 — a trailer edit: preview, timecode and a timeline built around the hook.
export function TrailerVisual() {
  const clips = [
    { label: "Hook", width: "22%", tone: "bg-accent" },
    { label: "Gameplay", width: "48%", tone: "bg-accent-violet" },
    { label: "CTA", width: "18%", tone: "bg-accent-red" },
  ];
  const wave = [3, 6, 4, 8, 5, 9, 7, 4, 6, 10, 8, 5, 7, 9, 6, 4, 8, 6, 5, 7, 9, 5, 4, 6];
  return (
    <Frame>
      <div className="absolute inset-4 flex flex-col gap-3">
        <div
          data-theme="dark"
          className="relative flex-1 overflow-hidden rounded-sm border border-line-strong bg-bg transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.02]"
        >
          <Image src={ART} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover object-[78%_55%]" />
          <div className="absolute inset-0 bg-bg/25" />
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fg/60 bg-bg/50">
            <span className="ml-1 size-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-fg" />
          </span>
          <span className="absolute bottom-2 left-2 rounded-xs bg-bg/70 px-1.5 py-0.5 font-mono text-[10px] text-fg">
            0:07 / 1:24
          </span>
          <span className="absolute top-2 left-2 rounded-xs bg-accent-red px-1.5 py-0.5 font-mono text-[9px] font-medium text-white">
            LAUNCH CUT
          </span>
        </div>
        <div className="relative rounded-sm border border-line-strong bg-surface p-2.5">
          <div className="flex gap-1">
            {clips.map((clip) => (
              <span
                key={clip.label}
                className={`flex h-6 items-center rounded-xs px-1.5 font-mono text-[9px] font-medium text-white ${clip.tone}`}
                style={{ width: clip.width }}
              >
                {clip.label}
              </span>
            ))}
          </div>
          <div className="mt-2 flex h-6 items-center gap-[3px]">
            {wave.map((h, i) => (
              <span key={i} className="w-full rounded-full bg-fg-subtle/50" style={{ height: `${h * 9}%` }} />
            ))}
          </div>
          <span className="absolute top-1.5 bottom-1.5 left-[30%] w-px bg-fg" />
        </div>
      </div>
    </Frame>
  );
}

// 03 — a launch post on a phone, with the campaign beats beneath it.
export function CampaignVisual() {
  const beats = ["Announce", "Next Fest", "Launch"];
  return (
    <Frame>
      <div className="absolute inset-x-0 top-6 bottom-20 flex justify-center">
        <div className="relative flex h-full w-[58%] flex-col overflow-hidden rounded-[1.25rem] border-[5px] border-fg/85 bg-surface transition-transform duration-700 ease-[var(--ease-out)] group-hover:-rotate-2">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <Glasses className="h-3.5 w-auto" />
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
              <span className={`size-[11px] rotate-45 border border-accent ${i === 2 ? "bg-accent-red" : "bg-surface-2"}`} />
              <span className="font-mono text-[10px] text-fg-subtle">{beat}</span>
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}
