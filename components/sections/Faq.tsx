import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { Plus } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { FAQS } from "@/data/content";
import { MAIN_SITE, SECTION_IDS } from "@/data/site";

// "Before you ask": heading on the left over the atmosphere art, glassy accordion
// items on the right. Native <details>, so it works without JavaScript; an open
// item turns its border red like the main site.
export default function Faq() {
  return (
    <section id={SECTION_IDS.faq} aria-labelledby="faq-title" className="relative overflow-hidden bg-quartz pt-20 pb-16 md:pt-24 md:pb-20">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/site/faq-atmosphere.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-left opacity-[0.22] grayscale [mask-image:linear-gradient(90deg,#000_10%,transparent_60%)]"
        />
      </div>
      <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-10" />

      <Container className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>Before you ask</Eyebrow>
          <h2 id="faq-title" className="mt-5 text-3xl leading-[1.1] font-bold tracking-[-0.02em] sm:text-4xl">
            The awkward questions, <span className="highlight-red">answered first.</span>
          </h2>
          <ButtonLink href={`${MAIN_SITE}/faq`} variant="pill" external className="mt-6 h-10">
            Read every answer
          </ButtonLink>
        </div>

        <div className="grid content-start gap-3 lg:col-span-7">
          {FAQS.map((item) => (
            <details
              key={item.q}
              className="group min-w-0 rounded-xl border border-fg/10 bg-paper/75 shadow-[var(--shadow-depth)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 hover:border-accent/60 hover:shadow-[var(--shadow-depth-hover)] open:border-accent-red/60"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 pr-2 font-display text-lg font-bold text-fg/85 group-hover:text-fg md:text-xl">
                  {item.q}
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-md border border-line text-fg/70 transition-transform duration-300 group-open:rotate-45 group-open:border-accent-red/60 group-open:text-accent-red">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-fg-muted md:px-6">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
