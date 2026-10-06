export default function manifest() {
  return {
    name: "Sandeep Saini — Full Stack Developer Portfolio",
    short_name: "Sandeep Saini",
    description:
      "Portfolio of Sandeep Saini, Full Stack Developer specialising in MERN stack, Next.js and modern web applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    orientation: "portrait",
    scope: "/",
    lang: "en",
    categories: ["portfolio", "developer", "business"],
    icons: [
      {
        src: "/images/sandeep-saini-portrait.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
