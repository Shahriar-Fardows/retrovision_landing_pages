"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ButtonLink from "@/components/ui/ButtonLink";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Container from "@/components/ui/Container";
import { NAV_LINKS, PRIMARY_CTA } from "@/data/site";

function Wordmark() {
  return (
    <a href="#top" className="flex h-11 items-center" aria-label="Retro_Vision — back to top">
      <Logo priority className="w-[168px] sm:w-[200px]" />
    </a>
  );
}

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Transparent over the hero art; a tinted bar once the page scrolls.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && closeMenu();

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    // Focus the panel itself: the next Tab reaches the first link, and touch
    // users don't get a focus ring on a link they didn't choose.
    menuRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [isOpen, closeMenu]);

  return (
    // backdrop-filter would become the containing block for the fixed menu panel,
    // so the open state uses a solid surface instead of blur.
    // Over the hero (top of page, menu closed) the bar sits on dark art, so it
    // pins the dark theme; once tinted it follows the visitor's theme.
    <header
      data-theme={!isOpen && !isScrolled ? "dark" : undefined}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        isOpen
          ? "border-line bg-surface"
          : isScrolled
            ? "border-line bg-bg/80 backdrop-blur-md"
            : "border-transparent"
      }`}
    >
      <Container className="relative flex h-[var(--header-h)] items-center justify-between gap-6">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <ul className="flex items-center gap-4 xl:gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative inline-flex h-11 items-center px-2.5 text-[0.9375rem] font-medium text-fg/85 transition-colors duration-200 hover:text-fg"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2.5 bottom-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <ButtonLink
            href={PRIMARY_CTA.href}
            variant="outline"
            arrow="up-right"
          >
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>

        <div className="-mr-2 flex items-center lg:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center text-fg"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ease-[var(--ease-out)] ${
                  isOpen ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] bg-current transition-[transform,width] duration-300 ease-[var(--ease-out)] ${
                  isOpen ? "top-[5px] w-full -rotate-45" : "top-[10px] w-4"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        ref={menuRef}
        id="mobile-menu"
        hidden={!isOpen}
        tabIndex={-1}
        className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto border-t border-line bg-surface outline-none lg:hidden"
      >
        <Container className="flex min-h-full flex-col justify-between gap-12 pt-6 pb-10">
          <nav aria-label="Mobile">
            <ul>
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="border-b border-line">
                  <a
                    href={link.href}
                    onClick={() => closeMenu()}
                    className="flex items-baseline justify-between py-5 text-fg"
                  >
                    <span className="text-[2rem] leading-none font-bold tracking-[-0.03em]">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={PRIMARY_CTA.href}
            arrow="up-right"
            className="w-full"
            onClick={() => closeMenu()}
          >
            {PRIMARY_CTA.label}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
