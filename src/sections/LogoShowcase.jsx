"use client";

import Image from "next/image";
import { logoIconsList } from "@/constants";

const LogoIcon = ({ icon, label, hidden }) => {
  return (
    <div className="flex-none flex-center marquee-item" aria-hidden={hidden || undefined}>
      <Image
        src={icon.imgPath}
        alt={hidden ? "" : label}
        width={280}
        height={64}
        loading="lazy"
        className="h-auto w-full"
      />
    </div>
  );
};

const LogoShowcase = () => (
  <section aria-label="Trusted by companies and clients" className="md:my-20 my-10 relative">
    <h2 className="sr-only">Companies and clients Sandeep Saini has worked with</h2>
    <div className="gradient-edge" aria-hidden="true" />
    <div className="gradient-edge" aria-hidden="true" />

    <div className="marquee h-52">
      <div className="marquee-box md:gap-12 gap-5">
        {logoIconsList.map((icon, index) => (
          <LogoIcon
            key={`a-${index}`}
            icon={icon}
            label={`Client or company logo ${index + 1}`}
          />
        ))}

        {logoIconsList.map((icon, index) => (
          <LogoIcon
            key={`b-${index}`}
            icon={icon}
            label=""
            hidden
          />
        ))}
      </div>
    </div>
  </section>
);

export default LogoShowcase;