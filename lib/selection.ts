"use client";

import { useSyncExternalStore } from "react";

// What the visitor picked in "Where to start" (a package and/or single services),
// shared with the inquiry form further down the page. Lives for the page visit only.
let picks: readonly string[] = [];
const listeners = new Set<() => void>();
const EMPTY: readonly string[] = [];

function emit(next: readonly string[]) {
  picks = next;
  listeners.forEach((listener) => listener());
}

export function togglePick(item: string) {
  emit(picks.includes(item) ? picks.filter((p) => p !== item) : [...picks, item]);
}

export function removePick(item: string) {
  emit(picks.filter((p) => p !== item));
}

export function clearPicks() {
  emit([]);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePicks() {
  return useSyncExternalStore(
    subscribe,
    () => picks,
    () => EMPTY,
  );
}
