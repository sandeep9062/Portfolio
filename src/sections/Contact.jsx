"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createMessage } from "@/lib/actions/messageActions";
import { sendContactEmail } from "@/lib/actions/emailActions";

import TitleHeader from "@/components/TitleHeader";
import ContactExperience from "@/components/models/contact/ContactExperience";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    contactno: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object from form state
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);
    formData.append("contactno", formState.contactno);

    // Save message to database
    const dbResult = await createMessage(formData);

    // Send email notification
    const emailResult = await sendContactEmail(formData);

    setLoading(false);

    if (dbResult.success) {
      toast.success(dbResult.message);
      setFormState({ name: "", email: "", message: "", contactno: "" });
    } else {
      toast.error(dbResult.error);
    }

    // Log email result (don't show to user to avoid confusion)
    if (!emailResult.success) {
      console.warn("Email notification failed:", emailResult.error);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />
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
                  <label htmlFor="contactno">Your Contact Number</label>
                  <input
                    type="tel"
                    id="contactno"
                    name="contactno"
                    value={formState.contactno}
                    onChange={handleChange}
                    placeholder="What's your contact number?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
