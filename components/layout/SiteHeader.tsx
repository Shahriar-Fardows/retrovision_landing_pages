"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import { Close, Menu } from "@/components/ui/Icons";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, PRIMARY_CTA } from "@/data/site";

// The main site's floating pill navbar: logo, underscore-suffixed links, blue pill CTA.
// On phones the links fold into a panel that drops below the pill.
export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && closeMenu();
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    menuRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isOpen, closeMenu]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-50 flex flex-col items-center px-3 sm:top-4 sm:px-4">
      <header className="pointer-events-auto w-full max-w-6xl rounded-full border border-line/70 bg-bg/90 shadow-[var(--shadow-card-hover)] backdrop-blur-md">
        <div className="flex h-12 items-center justify-between gap-2 px-2.5 sm:h-14 sm:px-5">
          <a href="#top" className="flex items-center rounded-md pl-1.5 sm:pl-2" aria-label="Retro_Vision — back to top">
            <Logo priority className="w-[132px] sm:w-[150px]" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center rounded-lg py-2 pr-5 pl-3 text-sm font-medium text-fg/70 transition-colors hover:text-fg"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-fg/30 transition-colors group-hover:text-accent-red">
                      _
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <span className="hidden sm:block">
              <ButtonLink href={PRIMARY_CTA.href} variant="pill">
                {PRIMARY_CTA.label}
              </ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
            >
              {isOpen ? <Close className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!isOpen}
        className="pointer-events-auto mt-2 w-full max-w-6xl rounded-2xl border border-line/70 bg-bg/95 p-3 shadow-[var(--shadow-card-hover)] backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="grid">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => closeMenu()}
                  className="flex items-center justify-between rounded-lg px-3 py-3 font-display text-lg font-bold text-fg hover:bg-surface-2"
                >
                  <span>
                    {link.label}
                    <span aria-hidden="true" className="text-accent-red">
                      _
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href={PRIMARY_CTA.href} onClick={() => closeMenu()} className="mt-2 w-full">
          {PRIMARY_CTA.label}
        </ButtonLink>
      </div>
    </div>
  );
}
