import { ImageResponse } from "next/og";

export const socialPreviewSize = {
  width: 1200,
  height: 630,
};

export const socialPreviewAlt = "Brew with Crew homepage preview";

export function createSocialPreviewImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#050505",
          color: "#f4f1ea",
          display: "flex",
          height: "100%",
          padding: 56,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(244, 241, 234, 0.16)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: 56,
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
              Brew <span style={{ color: "#a7a29a" }}>&nbsp;with&nbsp;</span>Crew
            </div>
            <div
              style={{
                border: "1px solid rgba(244, 241, 234, 0.2)",
                color: "#a7a29a",
                display: "flex",
                fontSize: 22,
                padding: "12px 18px",
              }}
            >
              SaaS / AI / Commerce / Custom Software
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div
              style={{
                color: "#8d8a84",
                display: "flex",
                fontSize: 26,
                letterSpacing: 0,
                textTransform: "uppercase",
              }}
            >
              Technology partner for growing businesses
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 82,
                fontWeight: 800,
                letterSpacing: 0,
                lineHeight: 0.96,
                maxWidth: 900,
              }}
            >
              Serious software, shipped with intent.
            </div>
          </div>

          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 18,
              width: "100%",
            }}
          >
            {["MVPs", "Product teams", "Business platforms"].map((item) => (
              <div
                key={item}
                style={{
                  background: "#f4f1ea",
                  color: "#050505",
                  display: "flex",
                  fontSize: 24,
                  fontWeight: 700,
                  padding: "14px 20px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    socialPreviewSize,
  );
}
