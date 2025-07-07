import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { Toaster } from 'sonner';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MY Portfolio App",
  description: "To Showcase my Skills and Projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Navbar/>
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: "#e0f2fe", // light blue bg
              color: "#0c4a6e",     // deep blue text
              border: "1px solid #38bdf8", // blue border
              borderRadius: "8px",
            },
            className: "shadow-lg font-medium",
          }}
        />
        {children}

<Footer/>

      </body>
    </html>
  );
}
