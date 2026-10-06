"use client";

import Image from "next/image";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

interface GlowCardProps {
  card: { review: string };
  index?: number;
  children?: ReactNode;
}

const GlowCard = ({ card, index = 0, children }: GlowCardProps) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove =
    (index: number) => (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      card.style.setProperty("--start", String(angle + 60));
    };

  return (
    <div
      ref={(el) => {
        cardRefs.current[index] = el;
      }}
      onMouseMove={handleMouseMove(index)}
      className="card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column"
    >
      <div className="glow" aria-hidden="true"></div>
      <div className="flex items-center gap-1 mb-5" aria-label="Rated 5 out of 5 stars" role="img">
        {Array.from({ length: 5 }, (_, i) => (
          <Image key={i} src="/images/icon-rating-star.png" alt="" width={22} height={20} loading="lazy" className="size-5" unoptimized />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;