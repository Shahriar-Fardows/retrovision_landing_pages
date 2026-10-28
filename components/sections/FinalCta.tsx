import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { PRIMARY_CTA } from "@/data/site";

// Closes the page on the same warrior that opened it — the story comes full circle.
export default function FinalCta() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="final-cta-title"
      className="relative isolate overflow-hidden bg-bg py-28 text-fg md:py-40"
    >
      <Image
        src="/images/retro-vision-hero.png"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[78%_60%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(4_9_20/0.95)_0%,rgb(4_9_20/0.85)_45%,rgb(4_9_20/0.35)_100%)]"
      />
      <Container>
        <Reveal className="max-w-2xl">
          <h2
            id="final-cta-title"
            className="text-[clamp(2.25rem,4.6vw,4rem)] leading-[1.06] font-bold tracking-[-0.02em] text-balance text-fg"
          >
            Your world is ready.{" "}
            <span className="bg-[linear-gradient(90deg,#2aa8ef,#7b5ce0,#e6464f)] bg-clip-text text-transparent">
              Let&apos;s make it impossible to ignore.
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-[1.65] text-fg-muted">
            Positioning, storefront, trailers and campaigns on one thread — so the moment players arrive, they
            understand, wishlist and buy.
          </p>
          <ButtonLink href={PRIMARY_CTA.href} arrow="up-right" className="mt-10">
            {PRIMARY_CTA.label}
          </ButtonLink>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tracking-[0.08em] text-fg-muted uppercase">
            {["No account", "No calendar link", "Scope before commitment"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1.5 bg-accent-red" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
