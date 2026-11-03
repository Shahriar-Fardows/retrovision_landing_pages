import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { INSIGHTS } from "@/data/content";
import { MAIN_SITE, SECTION_IDS } from "@/data/site";

// "Read our insights": one feature article and three rows, all linking to the
// main site's editorial.
export default function Insights() {
  const [feature, ...rest] = INSIGHTS;
  return (
    <section
      id={SECTION_IDS.insights}
      data-theme="dark"
      aria-labelledby="insights-title"
      className="relative overflow-hidden bg-ink py-20 text-fg md:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(62%_0.16_235/0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(62%_0.22_25/0.14),transparent_55%)]" />

      <Container className="relative">
        <SectionHeading
          id="insights-title"
          label="Read our insights"
          title={
            <>
              Useful thinking from the studio,{" "}
              <span className="text-anaglyph">whether or not you are buying.</span>
            </>
          }
          railTone="paper"
          aside={
            <>
              Practical guides and analysis for teams bringing games to market.
              <span className="mt-3 block">
                <ButtonLink href={`${MAIN_SITE}/editorial`} variant="text" external>
                  Explore Editorial
                </ButtonLink>
              </span>
            </>
          }
        />

        <Reveal stagger className="mt-12 grid gap-5 lg:grid-cols-2">
          <a
            data-reveal
            href={`${MAIN_SITE}${feature.path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[420px] items-end overflow-hidden rounded-2xl border border-line bg-ink/60 shadow-[var(--shadow-card-hover)] transition duration-500 motion-safe:hover:-translate-y-1 hover:border-accent/50 hover:shadow-[var(--shadow-card-glow-blue)]"
          >
            <Image
              src={`/images/site/${feature.image}.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="relative p-6 md:p-9">
              <p className="font-mono text-[10px] tracking-[0.18em] text-fg/70 uppercase">
                {feature.kind} · {feature.minutes} min read
              </p>
              <h3 className="mt-3 max-w-xl text-3xl leading-tight font-bold md:text-4xl">{feature.title}</h3>
              <p className="mt-3 max-w-xl text-sm text-fg/75">{feature.body}</p>
            </div>
          </a>

          <ul data-reveal className="grid gap-4">
            {rest.map((item) => (
              <li key={item.title}>
                <a
                  href={`${MAIN_SITE}${item.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-xl border border-line bg-paper/5 p-3 transition duration-500 hover:border-accent/50 hover:shadow-[var(--shadow-card-glow-blue)] sm:p-4"
                >
                  <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-36">
                    <Image
                      src={`/images/site/${item.image}.jpg`}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 self-center">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-fg/60 uppercase">
                      {item.kind} · {item.minutes} min read
                    </p>
                    <h3 className="mt-1.5 text-lg leading-snug font-bold group-hover:text-accent-ink">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-fg/65">{item.body}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
