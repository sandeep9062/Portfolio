"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const initialText = "Hey Sandeep ! I have a project can we talk?";
  const encodedText = encodeURIComponent(initialText);
  const whatsappLink = "https://wa.me/919729907448?text=" + encodedText;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Card */}
      <div
        className={`transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "opacity-100 translate-y-0 mb-4"
            : "opacity-0 translate-y-4 pointer-events-none"
        } w-80 bg-surface border border-border rounded-xl shadow-xl`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="bg-background text-foreground p-4 flex items-start rounded-t-xl border-b border-border">
          <FaWhatsapp className="text-accent text-3xl mt-1 mr-3" />
          <div className="flex-1">
            <h2 className="font-display tracking-tight text-lg font-semibold">Start a Conversation</h2>
            <p className="text-sm text-muted mt-1 leading-snug">
              Hi! Click on the <strong className="text-foreground">WhatsApp</strong> icon below to chat with
              us.
            </p>
          </div>
        </div>

        {/* Info Text */}
        <div className="bg-surface text-center text-sm text-muted py-2">
          The team typically replies in a few minutes.
        </div>

        {/* WhatsApp Button */}
        <div
          onClick={() => window.open(whatsappLink, "_blank")}
          className="cursor-pointer m-3 rounded-xl bg-background hover:bg-background/70 border border-border hover:border-accent p-3 flex items-center shadow-sm transition"
        >
          <div className="bg-[#25D366]/15 p-3 rounded-full">
            <FaWhatsapp className="text-[#25D366] text-2xl" />
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-semibold text-foreground">
              Sandeep Saini
            </h3>
            <p className="text-xs text-muted">Helpdesk</p>
          </div>
          <div className="ml-auto">
            <FaWhatsapp className="text-[#25D366] text-xl" />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close WhatsApp chat widget" : "Open WhatsApp chat with Sandeep Saini"}
        aria-expanded={isOpen}
        className="bg-accent hover:bg-accent/90 p-4 rounded-full shadow-xl text-accent-foreground transition duration-300"
      >
        {isOpen ? (
          <IoMdClose className="text-accent-foreground text-2xl" />
        ) : (
          <FaWhatsapp className="text-accent-foreground text-2xl" />
        )}
      </button>
    </div>
  );
}