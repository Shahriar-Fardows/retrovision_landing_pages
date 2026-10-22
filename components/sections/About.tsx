import Reveal from "@/components/motion/Reveal";
import ScrollFillText from "@/components/motion/ScrollFillText";
import Container from "@/components/ui/Container";
import { ABOUT_PRINCIPLES, ABOUT_STATEMENT } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

export default function About() {
  return (
    <section id={SECTION_IDS.about} aria-labelledby="about-title" className="py-24 md:py-36">
      <Container>
        <p aria-hidden="true" className="flex items-center gap-3.5 font-mono text-xs tracking-[0.13em] text-fg-muted uppercase">
          <span aria-hidden="true" className="h-px w-[1.625rem] shrink-0 bg-accent" />
          About Retro Vision
        </p>
        <h2 id="about-title" className="sr-only">
          About Retro Vision
        </h2>
        <ScrollFillText
          text={ABOUT_STATEMENT}
          className="mt-8 max-w-5xl text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.18] font-bold tracking-[-0.02em] text-balance text-fg"
        />

        <Reveal stagger as="ul" className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {ABOUT_PRINCIPLES.map((item) => (
            <li key={item.title} data-reveal className="border-t border-line-strong pt-6">
              <h3 className="text-lg font-bold text-fg">{item.title}</h3>
              <p className="mt-3 leading-[1.65] text-fg-muted">{item.body}</p>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
