import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { STUDIO_EMAIL } from "@/data/content";

// v2: one compact row — who, how to reach us, and the way back to version 1.
export default function V2Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-fg-muted sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Logo className="w-[132px]" />
          <p>Full-service marketing for games.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${STUDIO_EMAIL}`} className="hover:text-fg">
            {STUDIO_EMAIL}
          </a>
          <Link href="/" className="hover:text-fg">
            Compare with version 1
          </Link>
        </div>
      </div>
    </footer>
  );
}
