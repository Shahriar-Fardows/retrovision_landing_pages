import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PACKAGES, PACKAGES_NOTE, SERVICE_CATEGORIES } from "@/data/content";
import { PackagePick, PickSummary, ServiceGrid } from "./ServicePicker";

// The studio's three starting packages, keyed to where a game is in its life, plus
// single services to build your own. Picks travel to the inquiry form below.
// Pricing is scoped per project, so no price tags.
export default function Engagement() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="packages-title"
          label="Where to start"
          title={<>Pick the moment <span className="highlight-red">you are standing in.</span></>}
          intro={PACKAGES_NOTE}
        />

        <Reveal
          stagger
          as="ul"
          className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-3"
        >
          {PACKAGES.map((item) => (
            <li
              key={item.name}
              data-reveal
              className="relative flex flex-col overflow-hidden rounded-xl border border-line-strong bg-surface p-7 transition-[border-color,box-shadow] duration-300 has-[[aria-pressed=true]]:border-accent has-[[aria-pressed=true]]:shadow-[0_0_0_1px_var(--color-accent)] md:p-9"
            >
              {item.highlight && (
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-violet),var(--color-accent-red))]" />
              )}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-accent-ink">{item.duration}</span>
                {item.highlight && (
                  <span className="rounded-xs border border-accent/50 px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-accent-ink uppercase">
                    Most common start
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] text-fg">{item.name}</h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-fg-subtle uppercase">{item.stage}</p>
              <p className="mt-4 leading-[1.65] text-fg-muted">{item.summary}</p>
              <p className="mt-7 border-t border-line pt-6 font-mono text-[11px] tracking-[0.13em] text-fg-subtle uppercase">
                Included scope
              </p>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {item.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-fg">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <PackagePick name={item.name} highlight={item.highlight} />
            </li>
          ))}
        </Reveal>

        <div className="mt-6 rounded-xl border border-line-strong bg-surface p-6 md:p-9">
          <h3 className="text-2xl font-bold tracking-[-0.02em] text-fg">
            Or build your own <span className="highlight-blue">scope.</span>
          </h3>
          <p className="mt-2 max-w-2xl text-fg-muted">Pick only the services you need — add them to a package or use them alone.</p>
          <ServiceGrid categories={SERVICE_CATEGORIES} />
          <PickSummary />
        </div>
      </Container>
    </section>
  );
}
