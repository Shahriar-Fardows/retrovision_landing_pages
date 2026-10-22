"use client";

import { useEffect, useSyncExternalStore } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "rv-theme"; // same key as the inline script in app/layout.tsx

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";

// <html data-theme> is the source of truth; every toggle on the page re-renders
// when it changes.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};

const setTheme = (theme: Theme) => document.documentElement.setAttribute("data-theme", theme);

// Sun/moon switch. The icon is picked by CSS from <html data-theme>, so the server
// render never mismatches; only the accessible label waits for hydration.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => null);

  // Follow the OS setting until the visitor makes their own choice.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const onSystemChange = () => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {}
      setTheme(media.matches ? "light" : "dark");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch colour theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-sm text-fg/85 transition-colors hover:text-fg ${className}`}
    >
      {/* Sun while dark (tap for light), moon while light — switched by the root theme. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        aria-hidden="true"
        className="size-[18px] [:root[data-theme=light]_&]:hidden"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="hidden size-[18px] [:root[data-theme=light]_&]:block"
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  );
}
