/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { projects } from "@/projectList/projects";
import { toast } from "sonner";

const Portfolio = () => {
  const fileName = "Sandeep_Resume.pdf";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 4000,
      });
      form.reset();
    } else {
      toast.error("Failed to send message.", {
        description: "Please try again or check your connection.",
      });
    }

    setLoading(false);
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = `/${fileName}`;
    link.download = fileName;
    link.click();

    toast.success(`Downloading ${fileName}`);
  };

  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <Image src="/sandeepsaini.jpg" alt="sandeep saini" width={200} height={200} className="rounded-2xl mb-4 shadow-md border-4 border-blue-100 transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-300" />

        <h1 className="text-5xl mb-8 md:text-6xl font-bold mb-4">
          Hi, I am <span className="text-blue-600">Sandeep Saini</span>
        </h1>
        <p className="text-xl mb-6">Full Stack Developer | MERN | Next.js | React</p>

        <div className="flex space-x-6">
          <Link href="#projects" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">View Projects</Link>
          <Link href="#contact" className="px-6 py-2 border border-blue-600 rounded-md hover:bg-blue-100">Contact Me</Link>
        </div>

        <div className="flex space-x-4 mt-6">
          <Link href="https://github.com/sandeep9062" target="_blank"><Github className="hover:text-blue-600" /></Link>
          <Link href="https://www.linkedin.com/in/sandeep-saini-a6309924a/" target="_blank"><Linkedin className="hover:text-blue-600" /></Link>
          <Link href="mailto:sandeep2001saini01@gmail.com"><Mail className="hover:text-blue-600" /></Link>
        </div>

        <Button onClick={downloadResume} className="px-4 py-2 mt-12 bg-blue-50 text-black rounded-md hover:bg-blue-100" variant="outline">
          Download Resume !
        </Button>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-6 text-center">About Me</h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          I am a passionate and results-driven <span className="text-blue-600 font-medium">Full Stack Developer</span> specializing in the <span className="text-blue-600 font-medium">MERN stack</span> (MongoDB, Express.js, React.js, Node.js) with hands-on experience in building <span className="text-blue-600 font-medium">responsive web applications</span>, <span className="text-blue-600 font-medium">RESTful APIs</span>, and <span className="text-blue-600 font-medium">authentication systems</span>. I have completed a <span className="text-blue-600 font-medium">6-month internship</span> as a MERN Stack Developer, where I worked on real-world projects involving <span className="text-blue-600 font-medium">API development</span>, <span className="text-blue-600 font-medium">file uploads</span>, Nodemailer, Twilio, and JWT authentication.
        </p>
        <p className="text-lg text-center max-w-3xl mx-auto mt-6">
          I hold an <span className="text-blue-600 font-medium">MCA in Computer Science</span> and have completed various certifications including <span className="text-blue-600 font-medium">Google’s Digital Marketing</span> course, <span className="text-blue-600 font-medium">Sigma Web Development</span>, and <span className="text-blue-600 font-medium">Backend Development</span> by JavaScript Mastery. I am skilled in modern technologies like <span className="text-blue-600 font-medium">Next.js</span>, <span className="text-blue-600 font-medium">Tailwind CSS</span>, <span className="text-blue-600 font-medium">Arcjet</span>, and <span className="text-blue-600 font-medium">Upstash</span>.
        </p>
        <p className="text-lg text-center max-w-3xl mx-auto mt-6">
          My approach focuses on <span className="text-blue-600 font-medium">clean code</span>, <span className="text-blue-600 font-medium">scalability</span>, and optimizing <span className="text-blue-600 font-medium">user experiences</span>. I am committed to <span className="text-blue-600 font-medium">continuous learning</span> and enjoy working on <span className="text-blue-600 font-medium">innovative projects</span> that solve real-world problems.
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-blue-50 px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-800">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div key={project.name} className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="h-48 relative">
                <Image src={project.image} alt={project.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">{project.name}</h3>
                <p className="text-sm mb-4 text-gray-600">{project.description}</p>
                <Link href={project.link} className="text-blue-600 hover:underline text-sm">View Project →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {["HTML", "CSS", "JavaScript", "React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"].map((skill) => (
            <div key={skill} className="p-6 border rounded-xl hover:bg-blue-50 transition">
              <p className="text-lg font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-blue-50 px-6 py-20">
        <h2 className="text-4xl font-bold mb-6 text-center">Contact Me</h2>
        <p className="text-center mb-10">Have a project in mind or just want to connect? Reach out!</p>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="text" name="name" placeholder="Your Name" className="border p-3 rounded-md" required />
            <input type="email" name="email" placeholder="Your Email" className="border p-3 rounded-md" required />
            <textarea name="message" rows="5" placeholder="Your Message" className="border p-3 rounded-md" required></textarea>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
