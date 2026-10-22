import { cacheLife } from "next/cache";
import Container from "@/components/ui/Container";
import { NAV_LINKS, PRIMARY_CTA } from "@/data/site";

// Cached so the page can still prerender statically; refreshes daily.
async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="border-t border-line bg-bg">
      <Container className="grid gap-12 py-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className="text-2xl leading-none tracking-[0.01em] text-fg uppercase">
            <span className="font-extrabold">Retro</span>
            <span className="font-medium">Vision</span>
          </p>
          <p className="mt-5 max-w-sm leading-[1.65] text-fg-muted">
            A creative and growth studio for indie developers, ambitious studios and the next generation of games.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="font-mono text-xs tracking-[0.13em] text-fg-subtle uppercase">Explore</p>
          <ul className="mt-5 grid gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-fg-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="font-mono text-xs tracking-[0.13em] text-fg-subtle uppercase">Work with us</p>
          <a href={PRIMARY_CTA.href} className="mt-5 inline-block text-fg transition-colors hover:text-accent-ink">
            {PRIMARY_CTA.label} ↗
          </a>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-line py-6 text-sm text-fg-subtle sm:flex-row sm:justify-between">
        <p>© {year} Retro Vision. All rights reserved.</p>
        <a href="#top" className="transition-colors hover:text-fg">
          Back to top ↑
        </a>
      </Container>
    </footer>
  );
}
