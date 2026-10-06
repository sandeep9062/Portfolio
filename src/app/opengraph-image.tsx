import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function OgImage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0e0e10",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, #1c2a4a 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0e3a4a 0%, transparent 50%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 28,
          letterSpacing: 4,
          color: "#62e0ff",
          marginBottom: 24,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 32,
          fontSize: 30,
          color: "#d9ecff",
        }}
      >
        Sandeep Saini — Full Stack Developer · MERN · Next.js
      </div>
    </div>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    <OgImage
      title="Shaping Ideas into Real Projects that Deliver Results"
      subtitle="SANDEEP SAINI · PORTFOLIO"
    />,
    { ...size }
  );
}
