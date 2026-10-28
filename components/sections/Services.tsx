import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICE_CATEGORIES } from "@/data/content";
import { SECTION_IDS } from "@/data/site";
import ServiceTabs from "./ServiceTabs";

export default function Services() {
  return (
    <section id={SECTION_IDS.services} aria-labelledby="services-title" className="py-24 md:py-36">
      <Container>
        <SectionHeading
          id="services-title"
          label="What we do"
          title="Built for games ready to get a real shot."
          intro="Four disciplines, sixteen services. Use one, or let us connect them around every public beat."
        />
        <ServiceTabs categories={SERVICE_CATEGORIES} />
      </Container>
    </section>
  );
}
