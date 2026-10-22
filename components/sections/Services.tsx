import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

// Editorial rows rather than cards: a big index, the promise, then what you get.
export default function Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="py-24 md:py-36">
      <Container>
        <SectionHeading
          id="services-title"
          label="Services"
          title="Three disciplines. One world for your game."
          intro="Use one, or bring us in for all three so your identity, website and launch speak with the same voice."
        />

        <Reveal stagger as="ul" className="mt-14 border-b border-line-strong md:mt-20">
          {SERVICES.map((service) => (
            <li
              key={service.id}
              data-reveal
              className="group relative grid gap-6 border-t border-line-strong py-10 transition-colors duration-300 hover:bg-surface md:grid-cols-12 md:gap-8 md:px-6 md:py-12"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-px w-0 bg-accent transition-[width] duration-500 ease-[var(--ease-out)] group-hover:w-full"
              />
              <span className="font-mono text-sm text-accent-ink md:col-span-1">{service.index}</span>
              <div className="md:col-span-5">
                <h3 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-extrabold tracking-[-0.02em] text-fg">
                  {service.title}
                </h3>
                <p className="mt-3 text-lg text-fg-muted">{service.lead}</p>
              </div>
              <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:col-span-6 md:self-center">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-fg">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent-violet" />
                    {item}
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
