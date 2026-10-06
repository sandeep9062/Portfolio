import Image from "next/image";
import { socialImgs } from "@/constants";

const Footer = () => {
  return (
    <footer className="footer border-t border-border pt-10" aria-label="Footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p className="cursor-pointer transition-colors duration-300 hover:text-accent">
            Terms & Conditions
          </p>
          <p className="text-muted text-sm mt-2">
            Full Stack Developer — MERN, Next.js, Node.js · Tricity, India
          </p>
        </div>
        <nav className="socials" aria-label="Social media profiles">
          {socialImgs.map((socialImg, index) => (
            <a
              href={socialImg.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`Sandeep Saini on ${socialImg.name} (opens in a new tab)`}
            >
              <div className="icon group transition-all duration-300 hover:border-accent">
                <Image
                  src={socialImg.imgPath}
                  alt={`${socialImg.name} profile icon`}
                  width={20}
                  height={20}
                  loading="lazy"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>
          ))}
        </nav>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Sandeep Saini. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;