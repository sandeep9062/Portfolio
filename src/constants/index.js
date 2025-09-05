const navLinks = [
  {
    name: "Work",
    link: "#work",
  },
  {
    name: "Experience",
    link: "#experience",
  },
  {
    name: "Skills",
    link: "#skills",
  },
  {
    name: "Testimonials",
    link: "#testimonials",
  },
];

const words = [
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
  { text: "Ideas", imgPath: "/images/ideas.svg" },
  { text: "Concepts", imgPath: "/images/concepts.svg" },
  { text: "Designs", imgPath: "/images/designs.svg" },
  { text: "Code", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 60, suffix: "+", label: "Satisfied Clients" },
  { value: 78, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "MERN Stack",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Node.js Backend",
    imgPath: "/images/logos/Nodejs.svg",
  },
  {
    name: "Next.js",
    imgPath: "/images/logos/Nextjs.svg",
  },
  {
    name: "TailwindCSS",
    imgPath: "/images/logos/tailwind-css.svg",
  },

  // {
  //   name: "Three.js",
  //   imgPath: "/images/logos/Threejs.svg",
  // },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "During my Master's in Computer Applications, I gained strong foundations in software engineering, programming, and system design. This academic journey allowed me to combine theoretical knowledge with practical projects that shaped my technical expertise.",
    imgPath: "/images/exp1.png",
    logoPath: "/images/logo1.png",
    title: "Masters of Computer Applications",
    date: "June 2023 - July 2025",
    responsibilities: [
      "Completed advanced coursework in software development, databases, networking, and cloud computing.",
      "Developed academic and real-world projects applying modern web and mobile technologies.",
      "Collaborated with peers and faculty on research-driven projects and case studies.",
    ],
  },
  {
    review:
      "As a Full Stack Developer at Space Window, I played a key role in designing and building scalable applications, delivering high-performance solutions that met business and user needs.",
    imgPath: "/images/exp2.png",
    logoPath: "/images/logo2.png",
    title: "Full Stack Developer",
    date: "January 2025 - Present",
    responsibilities: [
      "Developed and maintained full-stack applications using modern frameworks and technologies.",
      "Integrated frontend and backend systems with RESTful and GraphQL APIs.",
      "Ensured scalability, performance, and security of deployed applications.",
    ],
  },
  {
    review:
      "I worked as a Backend Developer, focusing on building robust APIs and enhancing system performance. My contributions ensured reliability and efficiency for end-users.",
    imgPath: "/images/exp3.png",
    logoPath: "/images/logo3.png",
    title: "Backend Developer",
    date: "March 2022 - June 2023",
    responsibilities: [
      "Designed and implemented REST APIs to support mobile and web applications.",
      "Optimized database queries and backend services to improve application performance.",
      "Collaborated with frontend and mobile teams to deliver seamless product features.",
    ],
  },
];

const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Priyanka Sharma",
    mentions: "@priyankasharma01",
    review:
      "I can’t say enough good things about Sandeep Saini. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
    imgPath: "/images/client1.png",
  },
  {
    name: "Medul",
    mentions: "@medul_himachal",
    review:
      "Working with Sandeep Saini was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.",
    imgPath: "/images/client3.png",
  },
  {
    name: "Vikram Singh",
    mentions: "@vikram_singh_87",
    review:
      "Collaborating with Sandeep Saini was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. Sandeep Saini's enthusiasm for every facet of development truly stands out. If you're seeking to elevate your website and elevate your brand, Sandeep Saini is the ideal partner.",
    imgPath: "/images/client2.png",
  },
  {
    name: "Gurjinder Singh",
    mentions: "@guri__91_t",
    review:
      "Sandeep Saini was a pleasure to work with. He turned our outdated website into a fresh, intuitive platform that’s both modern and easy to navigate. Fantastic work overall.",
    imgPath: "/images/client5.png",
  },
  {
    name: "Charanjeet Kaur",
    mentions: "@charan_saini_23",
    review:
      "Sandeep Saini’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional!",
    imgPath: "/images/client4.png",
  },
  {
    name: "Ankita Rana",
    mentions: "@ankita._rana",
    review:
      "Sandeep Saini was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend and backend dev are top-notch.",
    imgPath: "/images/client6.png",
  },
];

const socialImgs = [
  {
    name: "insta",
    imgPath: "/images/insta.png",
  },
  {
    name: "fb",
    imgPath: "/images/fb.png",
  },
  {
    name: "x",
    imgPath: "/images/x.png",
  },
  {
    name: "linkedin",
    imgPath: "/images/linkedin.png",
  },
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
