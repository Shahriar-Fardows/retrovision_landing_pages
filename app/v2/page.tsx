import { V2Faq, V2Hero, V2Inquiry, V2Packages, V2Problems, V2Process, V2Services } from "@/components/v2/V2Sections";

// Simple and straightforward: hero → problems → services (pickable) → packages →
// process → FAQ → inquiry. Each section reads in about one screen.
export default function V2Home() {
  return (
    <>
      <V2Hero />
      <V2Problems />
      <V2Services />
      <V2Packages />
      <V2Process />
      <V2Faq />
      <V2Inquiry />
    </>
  );
}
