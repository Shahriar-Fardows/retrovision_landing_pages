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
          label="Why games get missed"
          title="Great games get lost every day. Not because they aren't good."
          intro="Most launches stumble on the same three gaps. Each one is something we fix."
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
                <p className="font-mono text-[11px] tracking-[0.13em] text-fg-subtle uppercase">The problem</p>
                <p className="mt-2 text-xl leading-snug font-semibold text-fg-muted">{item.problem}</p>
              </div>
              <div className="md:col-span-6">
                <p className="font-mono text-[11px] tracking-[0.13em] text-accent-ink uppercase">What we do</p>
                <p className="mt-2 leading-[1.65] text-fg">{item.solution}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
