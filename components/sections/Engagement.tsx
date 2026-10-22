import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ENGAGEMENTS, ENGAGEMENT_NOTE } from "@/data/content";
import { PRIMARY_CTA } from "@/data/site";

// Ways to work together. Pricing is quoted per project, so there are no price
// tags here and no "most popular" badge we couldn't back up.
export default function Engagement() {
  return (
    <section aria-labelledby="engagement-title" className="bg-surface py-24 md:py-32">
      <Container>
        <SectionHeading
          id="engagement-title"
          label="Working together"
          title="Pick the shape that fits your game."
          intro={ENGAGEMENT_NOTE}
        />

        <Reveal stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:mt-20 md:grid-cols-3">
          {ENGAGEMENTS.map((item) => (
            <li key={item.name} data-reveal className="flex flex-col bg-surface p-7 md:p-9">
              <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-fg">{item.name}</h3>
              <p className="mt-3 text-fg-muted">{item.fit}</p>
              <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-7">
                {item.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-fg">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
              <ButtonLink href={PRIMARY_CTA.href} variant="ghost" arrow="up-right" className="mt-9 w-full">
                Discuss this option
              </ButtonLink>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
