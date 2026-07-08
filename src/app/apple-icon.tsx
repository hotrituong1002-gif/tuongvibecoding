import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
        }}
      >
        <div
          style={{
            fontSize: 110,
            fontWeight: 700,
            fontFamily: "sans-serif",
            background: "linear-gradient(90deg, #ffd447, #f2b705)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
