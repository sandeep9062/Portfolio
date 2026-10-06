"use client";

import Image from "next/image";
import { testimonials } from "@/constants";
import TitleHeader from "@/components/TitleHeader";
import GlowCard from "@/components/GlowCard";

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-label="Client testimonials and reviews"
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="03 / testimonials"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16">
          {testimonials.map((testimonial, index) => (
            <GlowCard card={testimonial} key={index} index={index}>
              <div className="flex items-center gap-3">
                <div>
                  <Image
                    src={testimonial.imgPath}
                    alt={`Portrait of ${testimonial.name}, client of Sandeep Saini`}
                    width={46}
                    height={46}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-muted">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;