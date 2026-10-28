import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import CursorRing from "@/components/motion/CursorRing";
import "./globals.css";

// Brand type: Space Grotesk (display), Inter (body), JetBrains Mono (labels).
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"], display: "swap" });

// Set NEXT_PUBLIC_SITE_URL in production to emit canonical and absolute OG URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const title = "Retro_Vision — Full-service marketing for games";
const description =
  "Positioning, Steam storefronts, trailers and creator campaigns for ambitious game developers. One partner connecting your hook, your store page and your launch.";

export const metadata: Metadata = {
  ...(siteUrl && { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } }),
  title,
  description,
  openGraph: { title, description, type: "website", siteName: "Retro_Vision" },
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
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
