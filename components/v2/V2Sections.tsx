import type { CSSProperties } from "react";
import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/motion/Reveal";
import { PackagePick, PickSummary } from "@/components/sections/ServicePicker";
import ButtonLink from "@/components/ui/ButtonLink";
import { FAQS, HERO_COPY, PACKAGES, PACKAGES_NOTE, PROBLEMS, PROCESS, SERVICE_CATEGORIES } from "@/data/content";
import { PRIMARY_CTA, SECTION_IDS } from "@/data/site";
import ServiceChips from "./ServiceChips";

// v2 follows Heinzsauce's brief: simple and straightforward like the market
// leaders, each section readable in about one screen, only quiet motion,
// personality from the key art and the brand's own marks. Same content as v1.

const wrap = "mx-auto max-w-7xl px-5 sm:px-6";

// Hero copy rises in once on load (CSS .enter); sections fade up once as they
// scroll into view (Reveal). Both switch off under reduced motion.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.13em] text-fg-subtle uppercase">
      <span aria-hidden="true" className="size-2 bg-accent-red" />
      {children}
    </p>
  );
}

function Heading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-3 text-3xl leading-tight font-bold tracking-[-0.02em] text-fg md:text-4xl">
      {children}
    </h2>
  );
}

export function V2Hero() {
  return (
    <section aria-labelledby="v2-hero-title" className="border-b border-line">
      <div className={`${wrap} grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12`}>
        <div className="lg:col-span-7">
          <div className="enter" style={delay(60)}>
            <Label>Full-service marketing for games</Label>
          </div>
          <h1 id="v2-hero-title" style={delay(140)} className="enter mt-5 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.025em] text-fg">
            Games deserve greatness.
            <br />
            <span className="text-anaglyph">We make it happen.</span>
          </h1>
          <p className="enter mt-5 max-w-xl text-lg leading-relaxed text-fg-muted" style={delay(260)}>
            {HERO_COPY}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={delay(360)}>
            <ButtonLink href={PRIMARY_CTA.href} arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="#services" variant="ghost">
              See the services
            </ButtonLink>
          </div>
          <ul style={delay(460)} className="enter mt-10 grid gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-xs tracking-[0.06em] text-fg-subtle uppercase sm:flex">
            <li>16 services · 4 disciplines</li>
            <li>Human reply within 48 hours</li>
            <li>Your work stays yours</li>
          </ul>
        </div>
        <figure className="enter-backdrop relative overflow-hidden rounded-xl border border-line-strong lg:col-span-5">
          <Image
            src="/images/retro-vision-hero.png"
            alt="A lone warrior on a cliff edge looking out over a glowing fantasy world — Retro_Vision key art."
            width={1774}
            height={887}
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/3] w-full object-cover object-[78%_60%] lg:aspect-[4/5]"
          />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-md bg-ink/80 px-3 py-2 font-mono text-[11px] tracking-[0.08em] text-white/85 uppercase backdrop-blur-sm">
            For indie developers and ambitious studios
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function V2Problems() {
  return (
    <section aria-labelledby="v2-problems-title" className="py-16 md:py-20">
      <div className={wrap}>
        <Label>The disconnect</Label>
        <Heading id="v2-problems-title">
          Even incredible games can <span className="highlight-red">struggle.</span>
        </Heading>
        <Reveal stagger as="ul" className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {PROBLEMS.map((item) => (
            <li key={item.problem} data-reveal className="flex flex-col bg-bg p-6">
              <p className="font-mono text-xs tracking-[0.1em] text-fg-subtle uppercase">{item.pillar}</p>
              <h3 className="mt-2 text-xl font-bold text-fg">{item.problem}</h3>
              <p className="mt-2 flex-1 text-fg-muted">{item.detail}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm text-fg">
                <span className="font-semibold text-accent-ink">Our fix: </span>
                {item.solution}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function V2Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="v2-services-title" className="bg-surface py-16 md:py-20">
      <div className={wrap}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Label>What we do</Label>
            <Heading id="v2-services-title">
              Four disciplines, <span className="highlight-blue">sixteen services.</span>
            </Heading>
          </div>
          <p className="max-w-sm text-fg-muted">Tap any service to add it to your inquiry. Use one, or connect them all.</p>
        </div>
        <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category, i) => (
            <article key={category.id} data-reveal className="flex flex-col rounded-xl border border-line bg-bg p-5 transition-[translate,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_18px_36px_-24px_rgb(0_0_0/0.45)]">
              <p className="flex items-center gap-2 font-mono text-xs text-fg-subtle">
                <span aria-hidden="true" className={`size-2 ${i % 2 ? "bg-accent-red" : "bg-accent"}`} />
                {category.index}
              </p>
              <h3 className="mt-3 text-lg leading-snug font-bold text-fg">{category.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{category.tagline}</p>
              <ServiceChips services={category.services} />
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function V2Packages() {
  return (
    <section id="packages" aria-labelledby="v2-packages-title" className="py-16 md:py-20">
      <div className={wrap}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Label>Where to start</Label>
            <Heading id="v2-packages-title">
              Pick the moment <span className="highlight-red">you are standing in.</span>
            </Heading>
          </div>
          <p className="max-w-sm text-fg-muted">{PACKAGES_NOTE}</p>
        </div>
        <Reveal stagger as="ul" className="mt-10 grid gap-4 lg:grid-cols-3">
          {PACKAGES.map((item) => (
            <li
              key={item.name}
              data-reveal
              className="flex flex-col rounded-xl border border-line-strong bg-surface p-6 transition-[translate,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 has-[[aria-pressed=true]]:border-accent has-[[aria-pressed=true]]:shadow-[0_0_0_1px_var(--color-accent)]"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-accent-ink">
                {item.duration}
                {item.highlight && (
                  <span className="rounded-xs border border-accent/50 px-1.5 py-0.5 text-[10px] tracking-[0.1em] uppercase">
                    Most common start
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-fg">{item.name}</h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.06em] text-fg-subtle uppercase">{item.stage}</p>
              <p className="mt-3 text-fg-muted">{item.summary}</p>
              <ul className="mt-5 grid flex-1 content-start gap-x-4 gap-y-2 border-t border-line pt-5 text-sm text-fg sm:grid-cols-2">
                {item.includes.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-[0.45rem] size-1.5 shrink-0 rotate-45 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <PackagePick name={item.name} highlight={item.highlight} />
            </li>
          ))}
        </Reveal>
        <PickSummary />
      </div>
    </section>
  );
}

export function V2Process() {
  return (
    <section id="process" aria-labelledby="v2-process-title" className="border-y border-line bg-surface py-16 md:py-20">
      <div className={wrap}>
        <Label>What happens next</Label>
        <Heading id="v2-process-title">
          A short path to <span className="highlight-blue">a clear decision.</span>
        </Heading>
        <Reveal stagger as="ol" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((item) => (
            <li key={item.step} data-reveal className="rounded-xl border border-line bg-bg p-5 transition-[translate,border-color,box-shadow] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-[0_18px_36px_-24px_rgb(0_0_0/0.45)]">
              <p className="font-mono text-xs text-accent-ink uppercase">
                {item.step} · {item.owner}
              </p>
              <h3 className="mt-2 text-lg font-bold text-fg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-6 text-sm text-fg-muted">No obligation until you accept the scope.</p>
      </div>
    </section>
  );
}

export function V2Faq() {
  return (
    <section id="faq" aria-labelledby="v2-faq-title" className="py-16 md:py-20">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Label>FAQ</Label>
          <Heading id="v2-faq-title">
            Questions studios <span className="highlight-red">ask us first.</span>
          </Heading>
        </div>
        <Reveal className="divide-y divide-line border-y border-line lg:col-span-8">
          {FAQS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 font-semibold text-fg transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="text-xl leading-none text-fg-subtle transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-fg-muted">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function V2Inquiry() {
  return (
    <section id={SECTION_IDS.projectInquiry} aria-labelledby="v2-inquiry-title" className="bg-surface py-16 md:py-20">
      <div className={`${wrap} grid gap-10 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <Label>Start a project</Label>
          <Heading id="v2-inquiry-title">
            What does your game <span className="text-anaglyph">need next?</span>
          </Heading>
          <p className="mt-4 text-fg-muted">
            Send the stage, the outcome and the range. A person replies within 48 hours — including “not us” if that is
            the useful answer.
          </p>
        </div>
        <Reveal className="rounded-xl border border-line-strong bg-bg p-5 sm:p-7 lg:col-span-8">
          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
