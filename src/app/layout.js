import "./globals.css";

export const metadata = {
  title: "Sandeep Saini — Portfolio",
  description:
    "Hi, I'm Sandeep Saini, a developer based in TRICITY with a passion for code. Shaping Ideas, Concepts, Designs & Code into Real Projects that Deliver Results.",
  icons: {
    icon: "/images/fav.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
