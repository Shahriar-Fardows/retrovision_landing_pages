import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_CATEGORIES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";
import ServiceFlight from "./ServiceFlight";

// The four disciplines as a scroll-driven flight path (see ServiceFlight).
export default function Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="overflow-x-clip py-24 md:py-36">
      <Container>
        <SectionHeading
          id="services-title"
          label="What we do"
          title={<>Built for games ready to get <span className="highlight-blue">a real shot.</span></>}
          intro="Four disciplines, sixteen services. Use one, or let us connect them around every public beat."
        />

        <ServiceFlight categories={SERVICE_CATEGORIES} />
      </Container>
    </section>
  );
}
