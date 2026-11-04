import ButtonLink from "@/components/ui/ButtonLink";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { PRIMARY_CTA } from "@/data/site";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

// v2: a plain sticky bar — logo, four anchors, theme, one action. No overlay states.
export default function V2Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-6">
        <a href="#top" aria-label="Retro_Vision — back to top" className="flex items-center">
          <Logo priority className="w-[140px] sm:w-[164px]" />
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ButtonLink href={PRIMARY_CTA.href} variant="outline" className="h-9 px-4">
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
