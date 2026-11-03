import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Inquiry from "@/components/sections/Inquiry";
import Insights from "@/components/sections/Insights";
import Packages from "@/components/sections/Packages";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";

// Same order and rhythm as the main site: ink hero → paper → slate → ink → paper →
// paper → ink → quartz → closing card (with the inquiry form).
export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Services />
      <Packages />
      <Process />
      <Why />
      <Insights />
      <Faq />
      <Inquiry />
    </>
  );
}
