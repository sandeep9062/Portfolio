import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Sandeep Portfolio</h2>
          <p className="text-sm">
            Web Developer passionate about creating modern websites and
            applications with clean UI and smooth user experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#home" className="hover:text-blue-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="#about" className="hover:text-blue-300">
                About
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-blue-300">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
          <ul className="space-y-2 text-sm">
            <a
              href="mailto:sandeep@example.com"
              className="text-white hover:text--900 font-medium underline underline-offset-2 transition-colors duration-200"
            >
              <li className="flex items-center gap-2">
                <Mail size={16} /> sandeep2001saini01@gmail.com
              </li>
            </a>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://www.linkedin.com/in/sandeep-saini-a6309924a/"
              target="_blank"
            >
              <Linkedin className="hover:text-blue-400 cursor-pointer" />
            </Link>
            <Link href="https://github.com/sandeep9062" target="_blank">
              <Github className="hover:text-gray-400 cursor-pointer" />
            </Link>
            <Link
              href="https://www.instagram.com/sandeep01saini?igsh=Z3l2bmltZmM3cm9m"
              target="_blank"
            >
              <Instagram className="hover:text-pink-400 cursor-pointer" />
            </Link>
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="hover:text-blue-500 cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-900 text-center py-4 text-sm">
        © {new Date().getFullYear()} Sandeep Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
