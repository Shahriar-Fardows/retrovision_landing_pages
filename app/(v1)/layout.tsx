import type { ReactNode } from "react";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import CursorRing from "@/components/motion/CursorRing";

// Version 1 — the full creative build at "/".
export default function V1Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <CursorRing />
    </>
  );
}
