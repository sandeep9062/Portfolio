/**
 * Shared access to the global Lenis smooth-scroll instance.
 *
 * The instance is created once by <SmoothScrollProvider /> and stored here so
 * any client component (e.g. Button) can trigger smooth, inertia-based
 * scrolling without prop-drilling or context.
 */
import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
