import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS } from "@/data/content";
import { PRIMARY_CTA } from "@/data/site";

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-surface py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="process-title" label="How we work" title="From first build to launch day." />
          <ButtonLink href={PRIMARY_CTA.href} variant="ghost" arrow="up-right" className="self-start md:self-auto">
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>

        {/* A timeline: one rule runs through every step's marker. */}
        <Reveal stagger as="ol" className="relative mt-14 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          <span aria-hidden="true" className="absolute top-[5px] left-0 hidden h-px w-full bg-line-strong md:block" />
          <span aria-hidden="true" className="absolute top-0 left-[5px] h-full w-px bg-line-strong md:hidden" />
          {PROCESS.map((item) => (
            <li key={item.step} data-reveal className="relative pl-8 md:pl-0">
              <span aria-hidden="true" className="absolute top-0 left-0 size-[11px] rotate-45 border border-accent bg-bg md:static md:block" />
              <p className="font-mono text-xs text-accent-ink md:mt-7">Step {item.step}</p>
              <h3 className="mt-2 text-xl font-bold text-fg">{item.title}</h3>
              <p className="mt-3 leading-[1.65] text-fg-muted">{item.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
