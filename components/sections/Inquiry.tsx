import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/data/site";

const NEXT_STEPS = [
  "We read your inquiry and reply by email.",
  "A short call to understand your game and goals.",
  "A written plan with scope, timeline and quote.",
] as const;

export default function Inquiry() {
  return (
    <section id={SECTION_IDS.projectInquiry} aria-labelledby="inquiry-title" className="bg-surface py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="inquiry-title"
            label="Start a project"
            title="Tell us about your game."
            intro="Share where you are and what you need. There's no commitment until you've seen a plan you're happy with."
          />
          <ol className="mt-10 grid gap-5">
            {NEXT_STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-4 text-fg">
                <span className="font-mono text-xs leading-6 text-accent-ink">0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="rounded-md border border-line-strong bg-bg p-6 sm:p-8 lg:col-span-7">
          <InquiryForm />
        </Reveal>
      </Container>
    </section>
  );
}
