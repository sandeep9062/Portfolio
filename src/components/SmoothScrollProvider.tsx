"use client";

import { useEffect } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import { setLenis } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

/**
 * Page-wide smooth (inertia) scrolling powered by Lenis.
 *
 * - Wheel/trackpad scrolling gets a fluid, weighted glide.
 * - Same-page anchor links (#hero, #work, ...) are intercepted and scrolled
 *   smoothly by Lenis.
 * - The Lenis RAF loop is driven by the GSAP ticker and ScrollTrigger is
 *   updated on every scroll event, so all existing scroll-linked animations
 *   stay perfectly in sync.
 * - Gestures that start on the 3D <canvas> elements are left to Three.js
 *   OrbitControls, exactly like the native behaviour before Lenis.
 * - `prefers-reduced-motion` is honoured by Lenis (smoothing disabled).
 */
const SmoothScrollProvider = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // lower = floatier glide (0.05 - 0.15 feels premium)
      smoothWheel: true,
      anchors: true, // smooth-scroll to same-page #hash links
      // Keep wheel/touch gestures that begin on a canvas with the 3D scenes
      // (OrbitControls handles them) instead of scrolling the page.
      prevent: (node) => node.tagName === "CANVAS",
    });

    setLenis(lenis);

    // Keep GSAP ScrollTrigger animations in sync with Lenis' scroll position.
    const unsubscribe = lenis.on("scroll", () => ScrollTrigger.update());

    // Drive Lenis from the GSAP ticker so both run on a single RAF loop.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      unsubscribe();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
};

export default SmoothScrollProvider;
