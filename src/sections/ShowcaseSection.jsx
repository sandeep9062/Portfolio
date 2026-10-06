"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "PropertyBulbul",
    subtitle: "Real estate listing platform",
    description:
      "A fast, user-friendly experience for browsing and posting property listings.",
    image: "/images/projects/project-propertybulbul.png",
    url: "https://propertybulbul.com/",
    domain: "propertybulbul.com",
    tags: ["Next.js", "Express", "Tailwind CSS"],
    featured: true,
  },

  {
    title: "InkofMemories",
    subtitle: "printing and gifting platform, multivendor marketplace",
    description:
      "platform for printing and gifting, allowing users to create personalized gifts and print materials.",
    image: "/images/projects/project-inkofmemories.png",
    url: "https://inkofmemories.com/",
    domain: "inkofmemories.com",
    tags: ["Next.js", "Express","Nodejs", "Tailwind CSS"],
    featured: true,
  },

  {
    title: "Post Mark",
    subtitle: "AI-powered social media post generator",
    description: "Generate engaging social media posts with AI assistance.Send posts on whatsapp, email, or download them for later use.",
    image: "/images/projects/project-postmark-ai.png",
    url: "#",
    domain: "postmark.com",
    tags: ["Next.js", "React"],
    featured: true,
  },


 {
    title: "Social MatchMate Flutter App",
    subtitle: "a matchmaker platform for people having similar schedule and interests",
    description: " A mobile application built with Flutter that connects users based on shared schedules and interests, facilitating meaningful connections.",
    image: "/images/projects/project-social-matchmate-app.png",
    url: " https://play.google.com/store/apps/details?id=com.socialmatchmate.app",
    domain: "play.google.com/store/apps/details?id=com.socialmatchmate.app",
    tags: [ "Flutter", "Firebase", "Dart","Nodejs", "Express"],
    featured: true,
  },







  // {
  //   title: "Dental Tourism Clinics India",
  //   subtitle: "dental tourism and clinic platform with multivendor marketplace ",
  //   description:
  //     "A platform for dental tourism and clinics, allowing users to find and book dental services in India.",
  //   image: "/images/projects/project-dental-tourism-india.png",
  //   url: "https://dentaltourismclinicsindia.com/",
  //   domain: "dentaltourismclinicsindia.com",
  //   tags: ["Next.js", "Express","Nodejs", "Tailwind CSS", "MongoDB" ,"Cloudinary"],
  //   featured: true,
  // },






  {
    title: "VermiGrows",
    subtitle: "AI-powered e-commerce store",
    description: "ML-assisted shopping experience for a sustainable goods store.",
    image: "/images/projects/project-vermigrows.png",
    url: "https://vermigrows-client.vercel.app/",
    domain: "vermigrows-client.vercel.app",
    tags: ["Next.js", "Express.js", "AI/ML", "Tailwind CSS"],
    featured: true,
  },
  {
    title: "Post a Requirement",
    subtitle: "Requirement intake flow",
    description: "Streamlined form for posting new property requirements.",
    image: "/images/projects/project-post-requirement.png",
    url: "https://www.propertybulbul.com/post-requirement",
    domain: "propertybulbul.com/post-requirement",
    tags: ["Next.js", "Tailwind CSS"],
  },
  // {
  //   title: "Enquiry Records",
  //   subtitle: "Real estate enquiry tracking",
  //   description: "MERN-stack enquiry capture backed by MongoDB.",
  //   image: "/images/projects/project-post-requirement.png",
  //   url: "https://www.propertybulbul.com/post-requirement",
  //   domain: "propertybulbul.com",
  //   tags: ["MongoDB", "Express", "React", "Node.js"],
  // },
  {
    title: "MedAssist",
    subtitle: "AI voice consultation",
    description: "Voice-driven medical consultation platform powered by Vapi.",
    image: "/images/projects/project-medassist.png",
    url: "https://med-assist-omega.vercel.app/",
    domain: "med-assist-omega.vercel.app",
    tags: ["Next.js", "Vapi", "AI"],
  },
  {
    title: "Anime Arena",
    subtitle: "Anime game platform",
    description: "A platform for anime enthusiasts to play games and engage with the community.",
    image: "/images/projects/project-anime-arena.png",
    url: "https://anime-dun-eight.vercel.app/",
    domain: "anime-dun-eight.vercel.app",
    tags: ["Next.js", "Tailwind CSS"],
  },


];

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      cardRefs.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: (index % 3) * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=80",
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-label="Selected work and projects"
      className="app-showcase"
    >
      <div className="app-showcase__inner">
        <p className="app-showcase__eyebrow">~/selected-work</p>
        <h2 className="app-showcase__heading">Things I&apos;ve shipped</h2>
        <p className="sr-only">
          Selected web development projects by Sandeep Saini, including
          PropertyBulbul, InkofMemories, VermiGrows and client work built with
          Next.js, React, Node.js and Flutter.
        </p>

        <div className="showcase-grid">
          {PROJECTS.map((project, index) => (
            <a
              key={project.title}
              ref={addCardRef}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} — ${project.subtitle}. Opens in a new tab.`}
              className={`showcase-card ${
                project.featured ? "showcase-card--featured" : ""
              }`}
            >
              <div className="showcase-card__frame">
                <div className="showcase-card__chrome" aria-hidden="true">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                  <span className="showcase-card__url">{project.domain}</span>
                </div>
                <div className="showcase-card__image-wrapper">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.subtitle} interface preview`}
                    className="showcase-card__image"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="showcase-card__overlay" aria-hidden="true">
                    <span className="showcase-card__visit">Visit site ↗</span>
                  </div>
                </div>
              </div>

              <div className="showcase-card__body">
                <h3 className="showcase-card__title">{project.title}</h3>
                {project.subtitle && (
                  <p className="showcase-card__subtitle">{project.subtitle}</p>
                )}
                {project.description && (
                  <p className="showcase-card__description">
                    {project.description}
                  </p>
                )}
                {project.tags && (
                  <ul className="showcase-card__tags">
                    {project.tags.map((tag) => (
                      <li key={tag} className="showcase-card__tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;