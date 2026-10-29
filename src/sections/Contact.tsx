"use client";

import Image from "next/image";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { createMessage } from "@/lib/actions/messageActions";
import { sendContactEmail } from "@/lib/actions/emailActions";
import { COUNTRIES, DEFAULT_COUNTRY_ISO } from "@/lib/Countrycodes";

import TitleHeader from "@/components/TitleHeader";
import ContactExperience from "@/components/models/contact/ContactExperience";

interface FormState {
  name: string;
  email: string;
  message: string;
  contactno: string; // local number only (digits), without country code
}

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  contactno: "",
};

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);

  const selectedCountry =
    COUNTRIES.find((c) => c.iso === countryIso) ?? COUNTRIES[0];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Phone: allow digits only
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setFormState((prev) => ({ ...prev, contactno: digits }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Full number stored as "+91 9876543210"
    const fullContactNo = `${selectedCountry.dial} ${formState.contactno}`;

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);
    formData.append("contactno", fullContactNo);

    try {
      // Save message to database
      const dbResult = await createMessage(formData);

      // Send email notification
      const emailResult = await sendContactEmail(formData);

      if (dbResult.success) {
        toast.success(dbResult.message ?? "Message sent successfully!");
        setFormState(initialState);
        setCountryIso(DEFAULT_COUNTRY_ISO);
      } else {
        toast.error(dbResult.error ?? "Failed to send message");
      }

      // Log email result (don't show to user to avoid confusion)
      if (!emailResult.success) {
        console.warn("Email notification failed:", emailResult.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Sandeep Saini"
      className="flex-center section-padding"
    >
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Get in Touch – Let's Connect" sub="04 / contact" />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contactno">Your Contact Number *</label>
                  <div className="flex gap-2">
                    <select
                      id="countrycode"
                      name="countrycode"
                      aria-label="Country code"
                      value={countryIso}
                      onChange={(e) => setCountryIso(e.target.value)}
                      className="w-28 shrink-0 cursor-pointer rounded-md px-2 py-3 text-sm"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.iso} ({c.dial}) – {c.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="tel"
                      id="contactno"
                      name="contactno"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      value={formState.contactno}
                      onChange={handlePhoneChange}
                      placeholder="Phone number"
                      minLength={6}
                      maxLength={15}
                      pattern="[0-9]{6,15}"
                      title="Enter 6 to 15 digits"
                      className="min-w-0 flex-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows={5}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Send contact message to Sandeep Saini"
                >
                  <div className="cta-button group">
                    <div className="bg-circle" aria-hidden="true" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper" aria-hidden="true">
                      <Image
                        src="/images/icon-arrow-down.svg"
                        alt=""
                        width={18}
                        height={18}
                        loading="lazy"
                        unoptimized
                      />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-surface border border-border w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
