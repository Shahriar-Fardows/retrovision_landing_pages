import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROBLEMS } from "@/data/content";

export default function Problems() {
  return (
    <section aria-labelledby="problems-title" className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          id="problems-title"
          label="The disconnect"
          title="Even incredible games can struggle."
          intro="A strong trailer does not guarantee results. More traffic cannot rescue a store page that does not convert."
        />

        <Reveal stagger as="ol" className="mt-14 md:mt-20">
          {PROBLEMS.map((item, i) => (
            <li
              key={item.problem}
              data-reveal
              className="grid gap-4 border-t border-line-strong py-8 md:grid-cols-12 md:gap-8 md:py-10"
            >
              <span className="font-mono text-xs text-fg-subtle md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-5">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.13em] text-fg-subtle uppercase">
                  <span aria-hidden="true" className="size-1.5 bg-accent-red" />
                  The problem
                </p>
                <h3 className="mt-2 text-2xl leading-snug font-bold text-fg">{item.problem}</h3>
                <p className="mt-3 leading-[1.65] text-fg-muted">{item.detail}</p>
              </div>
              <div className="md:col-span-6 md:self-end">
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.13em] text-accent-ink uppercase">
                  <span aria-hidden="true" className="size-1.5 bg-accent" />
                  {item.pillar}
                </p>
                <p className="mt-2 text-lg leading-[1.6] text-fg">{item.solution}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
