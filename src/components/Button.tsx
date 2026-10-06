"use client";

import Image from "next/image";

import { getLenis } from "@/lib/smoothScroll";

interface ButtonProps {
  text: string;
  className?: string;
  id?: string;
}

const Button = ({ text, className, id }: ButtonProps) => {
  return (
    <a
      href="#counter"
      onClick={(e) => {
        e.preventDefault();
        // Prevent Lenis' global anchor handler from re-scrolling without our
        // custom offset — this component owns the scroll for this link.
        e.stopPropagation();

        const target = document.getElementById("counter");

        if (target && id) {
          const offset = window.innerHeight * 0.15;
          const lenis = getLenis();

          if (lenis) {
            lenis.scrollTo(target, { offset: -offset });
          } else {
            const top =
              target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }}
      aria-label={`${text} — view portfolio statistics`}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" aria-hidden="true" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper" aria-hidden="true">
          <Image src="/images/icon-arrow-down.svg" alt="" width={18} height={18} loading="lazy" unoptimized />
        </div>
      </div>
    </a>
  );
};

export default Button;