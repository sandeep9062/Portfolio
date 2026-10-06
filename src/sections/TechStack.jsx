"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "@/components/TitleHeader";
import { techStackImgs } from "@/constants";

const TechStack = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  return (
    <section
      id="skills"
      aria-label="Technical skills and technology stack"
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackImgs.map((techStackIcon, index) => (
            <div
              key={index}
              className="card-border tech-card overflow-hidden group rounded-lg"
            >
              <div className="tech-card-animated-bg" aria-hidden="true" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  <Image
                    src={techStackIcon.imgPath}
                    alt={`${techStackIcon.name} logo`}
                    width={144}
                    height={144}
                    loading="lazy"
                    className="h-auto w-auto max-h-full max-w-full"
                  />
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;