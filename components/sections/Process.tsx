import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { PRIMARY_CTA } from "@/data/site";
import ProcessTimeline from "./ProcessTimeline";

export default function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-surface py-24 md:py-32">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="process-title"
            label="What happens next"
            title={<>A short path from question to <span className="highlight-blue">a clear decision.</span></>}
            intro="No obligation until you accept the scope."
          />
          <ButtonLink href={PRIMARY_CTA.href} variant="ghost" arrow className="self-start md:self-auto">
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>

        <ProcessTimeline />
      </Container>
    </section>
  );
}
