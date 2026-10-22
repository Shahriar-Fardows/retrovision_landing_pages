import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import CursorRing from "@/components/motion/CursorRing";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Set NEXT_PUBLIC_SITE_URL in production to emit canonical and absolute OG URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "Retro Vision — Creative & Growth Studio for Game Developers";
const description =
  "Visual identity, game websites and launch marketing for indie developers and studios. One team that helps your game find the players it was made for.";

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Retro Vision" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#050a14",
};

// Runs before first paint: saved choice, else the OS preference. Keeps in sync
// with components/ui/ThemeToggle.tsx (same storage key).
const themeScript = `(function(){try{var t=localStorage.getItem("rv-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      id="top"
      data-theme="dark"
      suppressHydrationWarning
      className={`${jakarta.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-bg text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CursorRing />
      </body>
    </html>
  );
}
