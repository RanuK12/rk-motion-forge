import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, Video, staticFile } from "remotion";
import { ProductConfig } from "../types/product";
import { CyberGridBackground } from "../components/CyberGridBackground";
import { GlassmorphicWindow } from "../components/GlassmorphicWindow";
import { MetricCounter } from "../components/MetricCounter";
import { BenchmarkBar } from "../components/BenchmarkBar";

export interface NextGenVerticalVideoProps {
  config: ProductConfig;
}

export const NextGenVerticalVideo: React.FC<NextGenVerticalVideoProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = config.colors.accent || "#3B82F6";

  const getSpring = (offset: number, damping = 15, stiffness = 190) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.7, stiffness },
    });
  };

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        color: "#FFFFFF",
      }}
    >
      <Audio src={staticFile("music.mp3")} />
      <CyberGridBackground accentColor={accent} glowIntensity={1.4} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "100px 60px",
          boxSizing: "border-box",
          zIndex: 1,
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: `1px solid ${accent}66`,
            boxShadow: `0 0 24px ${accent}44`,
            padding: "10px 24px",
            borderRadius: 30,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [0, 15], [0, 1]),
          }}
        >
          <span style={{ color: accent }}>✦</span>
          {config.name}
        </div>

        {/* ============================================================== */}
        {/* SCENE 1: MOBILE KINETIC HOOK (0 - 90 frames, 0 - 3s)           */}
        {/* ============================================================== */}
        {frame < 90 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              margin: "auto 0",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginBottom: 36,
                transform: `scale(${interpolate(getSpring(6), [0, 1], [0.92, 1])})`,
              }}
            >
              {config.hook.words.map((word, wIdx) => {
                const wordSpring = getSpring(10 + wIdx * 4);
                return (
                  <span
                    key={wIdx}
                    style={{
                      display: "inline-block",
                      marginRight: 14,
                      opacity: interpolate(wordSpring, [0, 1], [0, 1]),
                      transform: `translateY(${interpolate(wordSpring, [0, 1], [25, 0])}px)`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.65)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                opacity: interpolate(frame, [40, 60], [0, 1]),
              }}
            >
              {config.hook.taglineBottom || "ENTERPRISE GRADE · ZERO LATENCY"}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 2: MOBILE UI MOCKUP & TELEMETRY (90 - 210 frames, 3 - 7s) */}
        {/* ============================================================== */}
        {frame >= 90 && frame < 210 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              margin: "auto 0",
              gap: 36,
            }}
          >
            <GlassmorphicWindow
              title={`${config.name} — Live HUD`}
              badge="● 60 FPS"
              badgeColor="#10B981"
              width={960}
              height={980}
            >
              <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 32, height: "100%", boxSizing: "border-box" }}>
                <div style={{ fontSize: 28, fontWeight: 800 }}>{config.productShowcase.headlinePrefix} <span style={{ color: accent }}>{config.productShowcase.headlineHighlight}</span></div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <MetricCounter
                    label="Active Nodes"
                    fromValue={0}
                    toValue={1248}
                    progress={interpolate(frame, [100, 160], [0, 1])}
                    suffix=" PARSED"
                    accentColor={accent}
                  />

                  <MetricCounter
                    label="Query Latency"
                    fromValue={240}
                    toValue={0}
                    progress={interpolate(frame, [105, 150], [0, 1])}
                    suffix=" ms"
                    accentColor="#10B981"
                    subLabel="Instant"
                  />
                </div>

                {/* Live Display: Video for dynamic-island, or Vertical Bar Chart */}
                {config.id === "dynamic-island" ? (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#0d1117",
                      borderRadius: 16,
                      border: `1px solid ${accent}44`,
                      boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 30px ${accent}22`,
                      overflow: "hidden",
                      margin: "12px 0",
                    }}
                  >
                    <Video
                      src={staticFile("dynamic-island-promo.mp4")}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 24, padding: "20px 0" }}>
                    {config.productShowcase.mockup.chart?.bars.map((bar, bIdx) => {
                      const barHeightProg = interpolate(frame, [110 + bIdx * 6, 150 + bIdx * 6], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      });
                      const isTargetBar = bIdx === 2;
                      return (
                        <div key={bIdx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                          <div
                            style={{
                              width: "100%",
                              height: `${(bar.value / 140) * 320 * barHeightProg}px`,
                              backgroundColor: isTargetBar ? accent : "rgba(255, 255, 255, 0.15)",
                              borderRadius: "8px 8px 0 0",
                              boxShadow: isTargetBar ? `0 0 24px ${accent}` : "none",
                            }}
                          />
                          <div style={{ fontSize: 16, color: isTargetBar ? "#FFFFFF" : "rgba(255,255,255,0.5)", fontWeight: isTargetBar ? 800 : 500 }}>
                            {bar.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div
                  style={{
                    backgroundColor: frame > 170 ? "#10B981" : accent,
                    color: "#FFFFFF",
                    padding: "18px 32px",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 20,
                    textAlign: "center",
                    boxShadow: `0 10px 30px ${accent}55`,
                  }}
                >
                  {frame > 170 ? "✓ Exported to PDF" : config.productShowcase.mockup.actionBtnText || "Export Report"}
                </div>
              </div>
            </GlassmorphicWindow>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3: BENCHMARK SPEED ADVANTAGE (210 - 330f, 7 - 11s)       */}
        {/* ============================================================== */}
        {frame >= 210 && frame < 330 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              margin: "auto 0",
              gap: 40,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                // BENCHMARK RESULTS
              </div>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 12 }}>
                Speed Demonstration
              </div>
            </div>

            <BenchmarkBar
              label="End-to-End Processing Speed"
              legacyTitle="Legacy Cloud Architecture"
              legacyValue="3,840 ms"
              legacyWidthPercent={85}
              ranukTitle={`${config.name} (Instant)`}
              ranukValue="0 ms (Real-time)"
              ranukWidthPercent={12}
              progress={interpolate(frame, [220, 270], [0, 1])}
              accentColor={accent}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              {config.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div style={{ fontSize: 14, color: accent, fontWeight: 700 }}>{feat.tag}</div>
                  <div style={{ fontSize: 24, fontWeight: 800, margin: "6px 0" }}>{feat.name}</div>
                  <div style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>{feat.benefit}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 4: MOBILE OUTRO & CTA (330 - 450f, 11 - 15s)             */}
        {/* ============================================================== */}
        {frame >= 330 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              margin: "auto 0",
              gap: 36,
            }}
          >
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>
              {(config.mission as any)?.line1
                ? `${(config.mission as any).line1} ${(config.mission as any).line2Prefix || ""} ${(config.mission as any).line2Highlight || ""}`
                : (config.mission as any)?.quote || (config.mission as any)?.label || config.tagline}
            </div>

            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                transform: `scale(${interpolate(getSpring(340), [0, 1], [0.92, 1])})`,
              }}
            >
              {(config.outro as any)?.subtitle || (config.outro as any)?.cta || `${(config.outro as any)?.wordmark || config.name} ${(config.outro as any)?.wordmarkAccent || ""}`}
            </div>

            <div
              style={{
                backgroundColor: accent,
                color: "#FFFFFF",
                fontSize: 26,
                fontWeight: 800,
                padding: "22px 60px",
                borderRadius: 16,
                boxShadow: `0 16px 50px ${accent}66`,
              }}
            >
              {(config.outro as any)?.ctaText || (config.outro as any)?.btnText || (config.outro as any)?.cta || "Explore"} →
            </div>

            <div
              style={{
                fontSize: 22,
                fontFamily: "monospace",
                color: "rgba(255,255,255,0.9)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                padding: "12px 28px",
                borderRadius: 10,
              }}
            >
              {config.outro?.url || "ranuk.dev"}
            </div>
          </div>
        )}

        {/* Bottom Footer watermark */}
        <div style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Ranuk IT Solutions · 2026
        </div>
      </div>
    </div>
  );
};
