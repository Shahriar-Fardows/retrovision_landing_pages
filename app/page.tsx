import About from "@/components/sections/About";
import Engagement from "@/components/sections/Engagement";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Inquiry from "@/components/sections/Inquiry";
import Marquee from "@/components/sections/Marquee";
import Problems from "@/components/sections/Problems";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";

// Rhythm: open hero → tight marquee → open statement → dense problems/services →
// controlled process → image-led work → offer → FAQ → focused form → closing CTA.
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Problems />
      <Services />
      <Process />
      <Work />
      <Engagement />
      <Faq />
      <Inquiry />
      <FinalCta />
    </>
  );
}
