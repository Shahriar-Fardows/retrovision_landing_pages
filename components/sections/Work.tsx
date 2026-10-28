import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CampaignVisual, StorefrontVisual, TrailerVisual } from "@/components/visuals/CapabilityVisuals";
import { CAPABILITIES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";

const VISUALS = { storefront: StorefrontVisual, trailer: TrailerVisual, campaign: CampaignVisual } as const;

// No client portfolio is published yet, so this shows the kinds of things we make,
// each drawn with Retro Vision's own brand — and labelled as such, never as client work.
export default function Work() {
  return (
    <section id={SECTION_IDS.work} aria-labelledby="work-title" className="bg-surface py-24 md:py-36">
      <Container>
        <SectionHeading
          id="work-title"
          label="What we build"
          title="Built around what makes your game fun to play."
          intro="Case studies are on the way. Until then, here is the kind of work we put in front of players."
        />

        <Reveal stagger as="ul" className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {CAPABILITIES.map((item, i) => {
            const Visual = VISUALS[item.visual];
            return (
              <li key={item.title} data-reveal className="group">
                <Visual />
                <p className="mt-6 font-mono text-xs text-accent-ink">0{i + 1}</p>
                <h3 className="mt-2 text-xl font-bold text-fg">{item.title}</h3>
                <p className="mt-2 leading-[1.65] text-fg-muted">{item.body}</p>
              </li>
            );
          })}
        </Reveal>

        <p className="mt-10 font-mono text-[11px] tracking-[0.1em] text-fg-subtle uppercase">
          Illustrations made with Retro_Vision&apos;s own key art — not client projects.
        </p>
      </Container>
    </section>
  );
}
