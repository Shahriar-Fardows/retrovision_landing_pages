import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_CATEGORIES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

// The four disciplines as one board — every service visible at once, no tabs to
// click through. Markers alternate blue and red, the two lenses of the logo.
export default function Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="py-24 md:py-36">
      <Container>
        <SectionHeading
          id="services-title"
          label="What we do"
          title={<>Built for games ready to get <span className="highlight-blue">a real shot.</span></>}
          intro="Four disciplines, sixteen services. Use one, or let us connect them around every public beat."
        />

        <Reveal
          stagger
          as="ol"
          className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line-strong bg-line-strong md:mt-20 lg:grid-cols-2"
        >
          {SERVICE_CATEGORIES.map((category, i) => (
            <li
              key={category.id}
              data-reveal
              className="group/card flex flex-col bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-8 xl:p-10"
            >
              <div className="flex items-center justify-between gap-4 font-mono text-xs">
                <span className="flex items-center gap-3 text-fg-subtle">
                  <span aria-hidden="true" className={`size-2.5 ${i % 2 ? "bg-accent-red" : "bg-accent"}`} />
                  {category.index}
                </span>
                <span className="text-fg-subtle">{category.services.length} services</span>
              </div>
              <h3 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-bold tracking-[-0.02em] text-fg">
                {category.title}
              </h3>
              <p className="mt-2 max-w-md text-fg-muted">{category.tagline}</p>

              <ul className="mt-8 border-t border-line">
                {category.services.map((service) => (
                  <li key={service.name} className="grid gap-1 border-b border-line py-4 last:border-b-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <span className="font-semibold text-fg">{service.name}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-fg-muted">{service.focus}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
