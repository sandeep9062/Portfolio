"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <a
                href="https://propertybulbul.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/project5.png"
                  alt="Ryde App Interface"
                  className="cursor-pointer hover:scale-105 transition-all duration-300 "
                />
              </a>
            </div>
            <div className="text-content">
              <h2>PropertyBulbul -The Real Estate Listing Platform</h2>
              <p className="text-white-50 md:text-xl">
                An app built with Next.js, Express, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <a
                  href="https://www.propertybulbul.com/post-requirement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/project2.png"
                    alt="Library Management Platform"
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                </a>
              </div>
              <h2>The Library Management Platform</h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <a
                  href="https://www.propertybulbul.com/post-requirement"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/project3.png"
                    alt="Real Estate Page"
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                </a>
              </div>
              <h2>
                Real Estate Enquiry page using MERN Stack (MongoDB) to record
                enquiries.{" "}
              </h2>
            </div>
          </div>
        </div>

        <div className="showcaselayout mt-10">
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <a
                  href="https://med-assist-omega.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/project1.png"
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                    alt="Realestate Listing Platform"
                  />
                </a>
              </div>
              <h2>
                {" "}
                An AI-powered Medical voice consultation platform using Vapi and
                Next.js
              </h2>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <a
                  href="https://anime-dun-eight.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/images/project4.png"
                    alt="Real Estate Page"
                    className="cursor-pointer hover:scale-105 transition-all duration-300"
                  />
                </a>{" "}
              </div>
              <h2>An Anime Game Platform</h2>
            </div>
          </div>

          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <a
                href="https://vermigrows-client.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/project6.png"
                  alt="Ryde App Interface"
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                />
              </a>{" "}
            </div>
            <div className="text-content">
              <h2>
                An AI-powered E-commerce Store using AI/ML Model and Next.js
              </h2>
              <p className="text-white-50 md:text-xl">
                An app built with Next.js, Express.js, & TailwindCSS for a fast,
                user-friendly experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;