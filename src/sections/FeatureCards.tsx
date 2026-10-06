import Image from "next/image";
import { abilities } from "@/constants";

const FeatureCards = () => (
  <section aria-label="Why work with Sandeep Saini" className="w-full padding-x-lg">
    <div className="mx-auto grid-3-cols">
      {abilities.map(({ imgPath, title, desc }) => (
        <article
          key={title}
          className="card-border rounded-xl p-8 flex flex-col gap-4"
        >
          <div className="size-14 flex items-center justify-center rounded-full">
            <Image
              src={imgPath}
              alt={`${title} icon`}
              width={50}
              height={50}
              loading="lazy"
            />
          </div>
          <h3 className="font-display tracking-tight text-foreground text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-muted text-lg">{desc}</p>
        </article>
      ))}
    </div>
  </section>
);

export default FeatureCards;