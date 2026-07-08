import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 20,
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
