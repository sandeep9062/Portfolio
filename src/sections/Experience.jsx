import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Animate each timeline card from the left, fading in as it enters the viewport.
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    // Create a vertical line that scales up as the user scrolls,
    // visually connecting the experience sections.
    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    // Animate text elements, moving them from the left and fading them in.
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Education & Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-32 relative">
          {/* Vertical timeline line with a gradient for a modern feel */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent top-0 hidden md:block" />

          <div className="relative z-50 space-y-20 md:space-y-32">
            {expCards.map((card, index) => (
              <div
                key={card.title}
                className={`flex items-center relative z-20 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col`}
              >
                {/* Image/GlowCard on one side */}
                <div className="md:w-1/2 w-full p-4 flex justify-center">
                  <GlowCard card={card}>
                    <div className="w-full h-auto">
                      <img
                        src={card.imgPath}
                        alt="experience-img"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  </GlowCard>
                </div>

                {/* Timeline dot with glowing animation */}
                <div className="absolute hidden md:block w-4 h-4 rounded-full bg-blue-500 timeline-dot left-1/2 -translate-x-1/2">
                  <div className="w-full h-full rounded-full bg-blue-500 blur-sm animate-pulse" />
                </div>
                
                {/* Text content on the other side */}
                <div
                  className={`md:w-1/2 w-full p-4 ${
                    index % 2 === 0 ? "md:pr-16 text-right" : "md:pl-16 text-left"
                  }`}
                >
                  <h1 className="font-semibold text-3xl mb-2">{card.title}</h1>
                  <p className="my-5 text-white-50">🗓️&nbsp;{card.date}</p>
                  <p className="text-[#839CB5] italic mb-3">Responsibilities</p>
                  <ul className="list-disc ms-5 flex flex-col gap-3 text-white-50 text-left">
                    {card.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="text-lg">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;