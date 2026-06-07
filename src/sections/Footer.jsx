import { socialImgs } from "@/constants";

const Footer = () => {
  return (
    <footer className="footer border-t border-black-50 pt-10">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p className="cursor-pointer transition-colors duration-300 hover:text-primary-accent">
            Terms & Conditions
          </p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a
              href={socialImg.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon group transition-all duration-300 hover:border-primary-accent">
                <img
                  src={socialImg.imgPath}
                  alt="social icon"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </a>
          ))}
        </div>
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