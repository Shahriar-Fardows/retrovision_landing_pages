import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PROBLEMS, PURPOSE } from "@/data/content";

const DOTS = ["bg-accent shadow-[var(--shadow-glow-blue)]", "bg-accent-red shadow-[var(--shadow-glow-red)]", "bg-accent shadow-[var(--shadow-glow-blue)]"];

// "The disconnect": faint greyscale art, three problems in one white card, then the
// rail quote and the dark "Our purpose" note.
export default function Problems() {
  return (
    <section aria-labelledby="problems-title" className="relative overflow-hidden bg-paper py-20 md:py-24">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/site/connected-world.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-right opacity-[0.16] grayscale [mask-image:linear-gradient(90deg,transparent_30%,#000_75%)]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(93%_0.04_235/0.6),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(94%_0.05_25/0.5),transparent_55%)]" />
      </div>
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-15" />

      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>The disconnect</Eyebrow>
            <h2
              id="problems-title"
              className="mt-5 text-4xl leading-[1.02] font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl"
            >
              Even incredible games <br className="hidden sm:block" />
              <span className="highlight-red">can struggle.</span>
            </h2>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-[oklch(93%_0.04_235)] px-3 py-1.5 text-xs font-semibold text-fg lg:self-auto">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            One partner for the whole journey
          </p>
        </div>

        <Reveal
          stagger
          as="ul"
          className="mt-12 grid gap-4 md:grid-cols-3 md:gap-0 md:overflow-hidden md:rounded-xl md:border md:border-line-strong md:bg-paper/80 md:shadow-[var(--shadow-depth)] md:backdrop-blur-md"
        >
          {PROBLEMS.map((item, i) => (
            <li
              key={item.problem}
              data-reveal
              className="rounded-xl border border-line-strong bg-paper/80 px-5 py-5 shadow-[var(--shadow-depth)] backdrop-blur-md md:rounded-none md:border-0 md:bg-transparent md:px-7 md:py-6 md:shadow-none md:backdrop-blur-none md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-line"
            >
              <div className="flex gap-4">
                <span aria-hidden="true" className={`mt-2 size-2.5 shrink-0 rounded-full ${DOTS[i]}`} />
                <div>
                  <h3 className="text-xl font-bold">{item.problem}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">{item.detail}</p>
                </div>
              </div>
            </li>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          <p className="description-rail description-rail-red max-w-xl text-lg leading-relaxed text-fg-muted lg:col-span-7">
            A strong trailer does not guarantee results. More traffic cannot rescue a store page that does not convert.
          </p>
          <div data-theme="dark" className="rounded-xl bg-ink p-6 text-fg shadow-[var(--shadow-depth)] lg:col-span-5">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-accent-red uppercase">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-red" />
              Our purpose
            </p>
            <p className="mt-3 leading-relaxed text-fg/90">{PURPOSE}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
