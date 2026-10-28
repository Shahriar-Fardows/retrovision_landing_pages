import InquiryForm from "@/components/forms/InquiryForm";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SECTION_IDS } from "@/data/site";

const NEXT_STEPS = [
  "A person reads your project and replies within 48 hours — including “not us” if that is the useful answer.",
  "If there is a fit, you get a written scope with the order of operations, boundaries and price.",
  "No account, no calendar link. Nothing starts until you accept the scope.",
] as const;

export default function Inquiry() {
  return (
    <section id={SECTION_IDS.projectInquiry} aria-labelledby="inquiry-title" className="bg-surface py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="inquiry-title"
            label="Start a project"
            title="What does your game need next?"
            intro="Send the stage, the outcome and the range you are working with."
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
