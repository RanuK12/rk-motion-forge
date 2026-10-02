import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const LaunchTeaserVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 12s @ 30fps = 360 frames
  // Beat markers at ~14 frames per beat (~130 BPM)
  // Cut 1 (0-60f, 0-2s): STOP PARSING CSV
  // Cut 2 (60-120f, 2-4s): IN STATIC CODE
  // Cut 3 (120-210f, 4-7s): INTRODUCING DATACANVAS BI
  // Cut 4 (210-290f, 7-9.6s): REALTIME WASM IN CHATGPT
  // Cut 5 (290-360f, 9.6-12s): LOGO REVEAL & CTA

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 16, mass: 0.7, stiffness: 240 },
    });
  };

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* ---------------- CUT 1: 0 - 60 frames (Black on Electric Yellow) ---------------- */}
      {frame < 60 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FACC15",
            color: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
              opacity: interpolate(frame, [0, 15], [0, 1]),
            }}
          >
            // 2026 WORKFLOW ALERT
          </div>

          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              transform: `scale(${interpolate(getSpring(8), [0, 1], [0.85, 1])})`,
            }}
          >
            STOP PARSING
            <br />
            <span style={{ backgroundColor: "#0A0A0A", color: "#FACC15", padding: "0 24px" }}>
              CSVS BY HAND.
            </span>
          </div>
        </div>
      )}

      {/* ---------------- CUT 2: 60 - 120 frames (White on Deep Black) ---------------- */}
      {frame >= 60 && frame < 120 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0A0A0A",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 40,
              color: "#EF4444",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            NO MORE STATIC IMAGES
          </div>

          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              transform: `scale(${interpolate(getSpring(65), [0, 1], [0.9, 1])})`,
            }}
          >
            No more ugly
            <br />
            <span style={{ color: "#EF4444", textDecoration: "line-through" }}>
              matplotlib PNGs.
            </span>
          </div>
        </div>
      )}

      {/* ---------------- CUT 3: 120 - 210 frames (Electric Blue on White) ---------------- */}
      {frame >= 120 && frame < 210 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "0.2em",
              backgroundColor: "#FFFFFF",
              color: "#2563EB",
              padding: "8px 24px",
              borderRadius: 8,
              marginBottom: 30,
            }}
          >
            OPENAI APIS APPROVED
          </div>

          <div
            style={{
              fontSize: 150,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              transform: `scale(${interpolate(getSpring(128), [0, 1], [0.85, 1])})`,
            }}
          >
            DATACANVAS
            <br />
            <span style={{ color: "#93C5FD" }}>BI ENGINE.</span>
          </div>
        </div>
      )}

      {/* ---------------- CUT 4: 210 - 290 frames (High Voltage Grid) ---------------- */}
      {frame >= 210 && frame < 290 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#0F172A",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 40,
              width: 1400,
            }}
          >
            <div
              style={{
                backgroundColor: "#1E293B",
                border: "4px solid #38BDF8",
                borderRadius: 24,
                padding: "60px 40px",
                transform: `translateY(${interpolate(getSpring(215), [0, 1], [60, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#38BDF8" }}>
                DUCKDB-WASM
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, marginTop: 10 }}>
                0ms LAG
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#1E293B",
                border: "4px solid #10B981",
                borderRadius: 24,
                padding: "60px 40px",
                transform: `translateY(${interpolate(getSpring(225), [0, 1], [60, 0])}px)`,
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 700, color: "#10B981" }}>
                INTERACTIVE
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, marginTop: 10 }}>
                60 FPS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CUT 5: 290 - 360 frames (Logo & Call To Action) ---------------- */}
      {frame >= 290 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFFFF",
            color: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 36,
              color: "#FFFFFF",
              marginBottom: 20,
              transform: `scale(${interpolate(getSpring(295), [0, 1], [0.5, 1])})`,
            }}
          >
            DC
          </div>

          <div
            style={{
              fontSize: 90,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              marginBottom: 12,
              transform: `translateY(${interpolate(getSpring(300), [0, 1], [30, 0])}px)`,
            }}
          >
            DataCanvas <span style={{ color: "#2563EB" }}>BI</span>
          </div>

          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "#4B5563",
              marginBottom: 36,
            }}
          >
            Transform ChatGPT into an executive analytics powerhouse.
          </div>

          <div
            style={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontSize: 32,
              fontWeight: 900,
              padding: "20px 60px",
              borderRadius: 999,
              letterSpacing: "-0.01em",
              boxShadow: "0 14px 30px rgba(37,99,235,0.35)",
            }}
          >
            GET ACCESS NOW →
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: 36,
              fontWeight: 800,
              marginTop: 24,
              color: "#0A0A0A",
            }}
          >
            ranuk.dev / datacanvas
          </div>
        </div>
      )}
    </div>
  );
};
