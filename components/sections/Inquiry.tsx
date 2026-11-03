import Image from "next/image";
import InquiryForm from "@/components/forms/InquiryForm";
import { Check } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/data/site";

const PROMISES = ["No account", "No calendar link", "Scope before commitment"] as const;

// The main site's closing "Start a project" card — here it carries the working
// inquiry form, so the page's call to action lands somewhere real.
export default function Inquiry() {
  return (
    <section
      id={SECTION_IDS.projectInquiry}
      aria-labelledby="inquiry-title"
      className="relative overflow-hidden bg-surface-2 px-4 pt-6 pb-16 md:px-6 md:pt-8 md:pb-24"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-quartz to-transparent md:h-32" />

      <div className="relative mx-auto max-w-7xl">
        <div
          data-theme="dark"
          className="relative overflow-hidden rounded-2xl bg-ink px-5 py-12 text-fg shadow-[var(--shadow-depth)] sm:px-8 md:px-12 md:py-16"
        >
          <Image
            src="/images/site/origin-story.jpg"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover object-right opacity-[0.2] saturate-75 [mask-image:linear-gradient(90deg,transparent_25%,#000_80%)]"
          />
          <div aria-hidden="true" className="absolute -right-[8%] -bottom-24 size-72 rounded-full bg-accent/25 blur-3xl" />
          <div aria-hidden="true" className="absolute -top-24 right-[28%] size-56 rounded-full bg-accent-red/20 blur-3xl" />
          <div aria-hidden="true" className="bg-grain absolute inset-0 opacity-20" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow>Start a project</Eyebrow>
              <h2 id="inquiry-title" className="mt-5 text-4xl leading-none font-bold tracking-[-0.02em] md:text-6xl">
                What does your game
                <br />
                <span className="text-anaglyph whitespace-nowrap">need next?</span>
              </h2>
            </div>
            <p className="description-rail description-rail-paper max-w-md text-lg leading-relaxed text-fg/70 lg:col-span-4">
              Send the stage, the outcome and the range. A human reply within 48 hours—including “not us” if that is the
              useful answer.
            </p>
          </div>

          <div className="relative mt-10 rounded-xl border border-line bg-ink/70 p-5 backdrop-blur-md sm:p-7 md:mt-12">
            <InquiryForm />
          </div>

          <ul className="relative mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-fg/70">
            {PROMISES.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check className="size-3.5 text-accent-ink" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
