/**
 * Shared access to the global Lenis smooth-scroll instance.
 *
 * The instance is created once by <SmoothScrollProvider /> and stored here so
 * any client component (e.g. Button) can trigger smooth, inertia-based
 * scrolling without prop-drilling or context.
 */
let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}
