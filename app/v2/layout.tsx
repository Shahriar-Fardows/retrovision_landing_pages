import type { Metadata } from "next";
import type { ReactNode } from "react";
import V2Footer from "@/components/v2/V2Footer";
import V2Header from "@/components/v2/V2Header";

// Version 2 — the simpler build for comparison with "/". Kept out of search so
// the two versions don't compete.
export const metadata: Metadata = {
  title: "Retro_Vision — Full-service marketing for games (v2)",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <V2Header />
      <main id="main">{children}</main>
      <V2Footer />
    </>
  );
}
