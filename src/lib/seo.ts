// Central SEO configuration for the portfolio.
// Canonical domain: https://sandeep-saini.vercel.app
// Override with NEXT_PUBLIC_SITE_URL if the domain ever changes.

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sandeep-saini.vercel.app";

export const siteUrl = rawSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "Sandeep Saini",
  siteName: "Sandeep Saini — Portfolio",
  defaultTitle: "Sandeep Saini | Full Stack Developer (MERN, Next.js)",
  titleTemplate: "%s | Sandeep Saini",
  description:
    "Sandeep Saini is a Full Stack Developer based in Tricity (Chandigarh, Mohali, Panchkula) specialising in MERN stack, Next.js, Node.js and modern web apps. View selected work, experience, skills and client testimonials.",
  keywords: [
    "Sandeep Saini",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer in Tricity",
    "Web Developer in Chandigarh",
    "Freelance Web Developer India",
    "Portfolio",
  ],
  locale: "en_IN",
  type: "website",
  author: "Sandeep Saini",
  socials: {
    instagram: "https://www.instagram.com/sandeep01saini",
    linkedin: "https://www.linkedin.com/in/sandeep-saini-a6309924a/",
    github: "https://github.com/sandeep9062",
  },
  ogImageAlt:
    "Sandeep Saini — Full Stack Developer (MERN, Next.js) based in Tricity, India",
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sandeep Saini",
    url: siteUrl,
    image: `${siteUrl}/images/sandeep-saini-portrait.png`,
    jobTitle: "Full Stack Developer",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tricity",
      addressRegion: "Chandigarh",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Panjab University, Chandigarh",
    },
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "JavaScript",
      "Tailwind CSS",
      "Flutter",
      "REST APIs",
    ],
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.linkedin,
      siteConfig.socials.github,
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteUrl,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "Sandeep Saini",
    },
    inLanguage: "en-IN",
  };
}
