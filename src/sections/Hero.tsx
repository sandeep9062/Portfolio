"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "@/components/AnimatedCounter";
import Button from "@/components/Button";
import { words } from "@/constants";
import HeroExperience from "@/components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute top-0 left-0 z-10">
        <Image
          src="/images/hero-background.png"
          alt=""
          width={418}
          height={327}
          priority
        />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <Image
                          src={word.imgPath}
                          alt={`${word.text} icon`}
                          width={48}
                          height={48}
                          priority={index === 0}
                          loading={index === 0 ? undefined : "lazy"}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-surface border border-border"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <p aria-hidden="true" className="hero-continuation">
                into Real Projects
              </p>
              <p aria-hidden="true" className="hero-continuation">
                that Deliver Results
              </p>
            </div>

            <p className="text-foreground md:text-xl relative z-10 pointer-events-none">
              Hi, I&apos;m Sandeep Saini, a Full Stack Developer based in
              Tricity with a passion for code.
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: 3D Model or Visual */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;