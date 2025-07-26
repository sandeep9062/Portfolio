"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Sandeep Portfolio</h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Full Stack Developer passionate about building modern websites and apps
            with clean UI, interactive features, and strong backend logic.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {["home", "about", "projects", "contact"].map((section) => (
              <li key={section}>
                <Link
                  href={`#${section}`}
                  className="hover:text-blue-400 transition-colors duration-200"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect with Me</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a
                href="mailto:sandeep2001saini01@gmail.com"
                className="hover:text-blue-400 underline underline-offset-2"
              >
                sandeep2001saini01@gmail.com
              </a>
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <Link
              href="https://www.linkedin.com/in/sandeep-saini-a6309924a/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="hover:text-blue-400 transition-colors" />
            </Link>
            <Link
              href="https://github.com/sandeep9062"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="hover:text-gray-400 transition-colors" />
            </Link>
            <Link
              href="https://www.instagram.com/sandeep01saini?igsh=Z3l2bmltZmM3cm9m"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram className="hover:text-pink-400 transition-colors" />
            </Link>
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook">
              <Facebook className="hover:text-blue-500 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-900 text-center py-4 text-sm text-gray-300 border-t border-blue-800">
        © {new Date().getFullYear()} Sandeep Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
