import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const VerticalPromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1080x1920 @ 30fps (15s = 450 frames)
  // Safe margins for TikTok/Reels UI: Top 160px, Bottom 260px, Sides 60px

  const barProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 180 },
  });

  const kpiCount = interpolate(frame, [30, 90], [0, 48920], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnPulse = Math.sin(frame * 0.15) * 4;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#0B0F19",
        color: "#FFFFFF",
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: "160px 60px 260px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Top Background Glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header & Hook */}
      <div style={{ textAlign: "center", width: "100%", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(37,99,235,0.2)",
            border: "1px solid #3B82F6",
            padding: "8px 20px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 800,
            color: "#60A5FA",
            marginBottom: 24,
          }}
        >
          <span>⚡ NEW CHATGPT MCP EXTENSION</span>
        </div>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Still waiting on{" "}
          <span style={{ color: "#EF4444", textDecoration: "line-through" }}>
            matplotlib
          </span>
          <br />
          <span style={{ color: "#38BDF8" }}>in ChatGPT?</span>
        </h1>
      </div>

      {/* Centerpiece: Mobile Phone Mockup with Real Live Dashboard UI */}
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          backgroundColor: "#161E2E",
          borderRadius: 36,
          border: "3px solid rgba(255,255,255,0.15)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
          padding: 36,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Panel Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: 22,
              }}
            >
              DC
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>DataCanvas Live</div>
              <div style={{ fontSize: 18, color: "#9CA3AF" }}>Interactive DuckDB WASM</div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#10B981",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 800,
              padding: "8px 16px",
              borderRadius: 10,
            }}
          >
            ACTIVE
          </div>
        </div>

        {/* 2 Big KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            style={{
              backgroundColor: "#1F2937",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          >
            <div style={{ fontSize: 18, color: "#9CA3AF", fontWeight: 600 }}>Total Volume</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#38BDF8", marginTop: 6 }}>
              ${Math.floor(kpiCount).toLocaleString()}
            </div>
            <div style={{ fontSize: 16, color: "#10B981", fontWeight: 700, marginTop: 4 }}>
              ↑ 100% Parsed
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#1F2937",
              borderRadius: 20,
              padding: 24,
              border: "1px solid rgba(168,85,247,0.3)",
            }}
          >
            <div style={{ fontSize: 18, color: "#9CA3AF", fontWeight: 600 }}>Engine Latency</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#C084FC", marginTop: 6 }}>
              0 ms
            </div>
            <div style={{ fontSize: 16, color: "#9CA3AF", marginTop: 4 }}>
              Zero Server Cost
            </div>
          </div>
        </div>

        {/* Live Animated Chart Box */}
        <div
          style={{
            backgroundColor: "#1F2937",
            borderRadius: 24,
            padding: 28,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 22, fontWeight: 700 }}>Regional Breakdown</span>
            <span style={{ fontSize: 18, color: "#38BDF8", fontWeight: 700 }}>60 FPS WASM</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", height: 260, gap: 24, paddingBottom: 10 }}>
            {[
              { label: "Norte", h: 220 },
              { label: "Sur", h: 150 },
              { label: "Este", h: 190 },
              { label: "Oeste", h: 130 },
              { label: "Latam", h: 240 },
            ].map((bar, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: "100%",
                    height: bar.h * barProgress,
                    backgroundColor: "#2563EB",
                    borderRadius: "10px 10px 0 0",
                    boxShadow: "0 0 16px rgba(37,99,235,0.4)",
                  }}
                />
                <span style={{ fontSize: 18, color: "#9CA3AF", fontWeight: 700 }}>{bar.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Block (TikTok/Reels Tap Sticker) */}
      <div style={{ width: "100%", textAlign: "center", zIndex: 10 }}>
        <div
          style={{
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            fontSize: 34,
            fontWeight: 900,
            padding: "24px 60px",
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 16px 40px rgba(37,99,235,0.5)",
            transform: `translateY(${btnPulse}px)`,
          }}
        >
          <span>Pruébalo Gratis en ChatGPT</span>
          <span style={{ fontSize: 40 }}>→</span>
        </div>

        <div
          style={{
            fontFamily: "monospace",
            fontSize: 28,
            fontWeight: 800,
            color: "#9CA3AF",
            marginTop: 20,
          }}
        >
          ranuk.dev / datacanvas
        </div>
      </div>
    </div>
  );
};
