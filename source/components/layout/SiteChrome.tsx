"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

/**
 * Routes rendered as single-goal funnel pages. They carry their own minimal
 * header and footer, so the site-wide navbar and footer are suppressed.
 */
export const FUNNEL_PATHS = ["/industries/restaurants", "/industries/real-estate", "/industries/cleaning"];

export function isFunnelPath(pathname: string | null): boolean {
  if (!pathname) return false;
  const clean = pathname.replace(/\/+$/, "") || "/";
  return FUNNEL_PATHS.includes(clean);
}

/**
 * True when the rendered page has marked itself as a funnel with
 * `data-funnel-page`. This covers previews served from a different URL,
 * where the pathname check alone would bring the site chrome back after
 * hydration. On the server there is no document, so it is false there.
 */
function hasFunnelMarker(): boolean {
  if (typeof document === "undefined") return false;
  return document.querySelector("[data-funnel-page]") !== null;
}

/**
 * Re-evaluates the marker whenever the page content under <main> changes,
 * so leaving a funnel page by browser navigation brings the chrome back.
 */
function subscribeToPageSwaps(onChange: () => void): () => void {
  const root = document.querySelector("main") ?? document.body;
  const observer = new MutationObserver(onChange);
  observer.observe(root, { childList: true, subtree: true });
  return () => observer.disconnect();
}

/** Renders its children everywhere except on funnel routes. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const marker = useSyncExternalStore(subscribeToPageSwaps, hasFunnelMarker, hasFunnelMarker);
  if (isFunnelPath(pathname) || marker) return null;
  return <>{children}</>;
}
