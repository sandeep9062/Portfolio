import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0e0e10",
          color: "#ededf0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            color: "#5eead4",
            marginBottom: 24,
          }}
        >
          SANDEEP SAINI · PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          Full Stack Developer — MERN &amp; Next.js
        </div>
        <div
          style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#9a9aa6" }}
        >
          Selected work · Experience · Skills · Testimonials
        </div>
      </div>
    ),
    { ...size }
  );
}
