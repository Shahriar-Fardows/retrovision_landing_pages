import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/data/content";

// Native <details>: keyboard and screen-reader accessible with no JavaScript.
export default function Faq() {
  return (
    <section aria-labelledby="faq-title" className="py-24 md:py-32">
      <Container className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <SectionHeading id="faq-title" label="FAQ" title="Questions studios ask us first." />
        </div>
        <div className="border-b border-line-strong md:col-span-8">
          {FAQS.map((item) => (
            <details key={item.q} className="group border-t border-line-strong">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-semibold text-fg transition-colors hover:text-accent-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-px before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-px after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0"
                />
              </summary>
              <p className="max-w-2xl pb-7 leading-[1.7] text-fg-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
