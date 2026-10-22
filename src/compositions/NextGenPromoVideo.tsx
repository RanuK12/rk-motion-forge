import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";
import { ProductConfig } from "../types/product";
import { CyberGridBackground } from "../components/CyberGridBackground";
import { GlassmorphicWindow } from "../components/GlassmorphicWindow";
import { InteractiveCursor } from "../components/InteractiveCursor";
import { MetricCounter } from "../components/MetricCounter";
import { BenchmarkBar } from "../components/BenchmarkBar";

export interface NextGenPromoVideoProps {
  config: ProductConfig;
}

export const NextGenPromoVideo: React.FC<NextGenPromoVideoProps> = ({ config }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accent = config.colors.accent || "#3B82F6";

  // Phase Breakdown (15s @ 30fps = 450 frames):
  // Phase 1 (0-90f, 0-3s): The Hook / Agitation
  // Phase 2 (90-210f, 3-7s): Interactive Live UI Demo & Drill-down
  // Phase 3 (210-330f, 7-11s): Performance Benchmark & KPI Metrics
  // Phase 4 (330-450f, 11-15s): Executive Outro & Call to Action

  // Spring helper
  const getSpring = (offset: number, damping = 15, stiffness = 190) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.7, stiffness },
    });
  };

  // Camera Dynamics
  const cameraScale = interpolate(
    frame,
    [0, 80, 90, 160, 200, 220, 320, 340, 440],
    [1, 1.05, 1, 1.14, 1.14, 1, 1.04, 1, 1.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cameraPanY = interpolate(
    frame,
    [90, 160, 200, 220],
    [0, -40, -40, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        color: "#FFFFFF",
      }}
    >
      <Audio src={staticFile("music.mp3")} />
      <CyberGridBackground accentColor={accent} glowIntensity={1.2} />

      {/* Main Camera Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraPanY}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ============================================================== */}
        {/* SCENE 1: THE HOOK / AGITATION (0 - 90 frames, 0 - 3s)          */}
        {/* ============================================================== */}
        {frame < 90 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 120px",
              maxWidth: 1400,
            }}
          >
            {/* Tag Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: `1px solid ${accent}66`,
                boxShadow: `0 0 20px ${accent}33`,
                padding: "8px 20px",
                borderRadius: 30,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.18em",
                color: "#FFFFFF",
                textTransform: "uppercase",
                marginBottom: 28,
                opacity: interpolate(frame, [0, 15], [0, 1]),
              }}
            >
              <span style={{ color: accent }}>✦</span>
              {config.hook.label || "// 2026 ARCHITECTURE"}
            </div>

            {/* Kinetic Main Hook Headline */}
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                marginBottom: 28,
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
                      marginRight: 18,
                      opacity: interpolate(wordSpring, [0, 1], [0, 1]),
                      transform: `translateY(${interpolate(wordSpring, [0, 1], [25, 0])}px)`,
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </div>

            {/* Sub-tagline */}
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
        {/* SCENE 2: INTERACTIVE LIVE UI DEMO (90 - 210 frames, 3 - 7s)    */}
        {/* ============================================================== */}
        {frame >= 90 && frame < 210 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Header info bar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 1400,
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28, fontWeight: 800 }}>{config.name}</span>
                <span
                  style={{
                    backgroundColor: `${accent}22`,
                    border: `1px solid ${accent}`,
                    color: accent,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  LIVE INSPECTOR
                </span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255, 255, 255, 0.6)", fontWeight: 500 }}>
                {config.tagline}
              </div>
            </div>

            {/* Window Mockup with 3D tilt */}
            <GlassmorphicWindow
              title={`${config.name} — Execution Engine`}
              badge="RUNNING"
              badgeColor="#10B981"
              width={1400}
              height={700}
              tiltX={2}
              tiltY={-1}
            >
              <div style={{ display: "flex", height: "100%" }}>
                {/* Left: KPIs and Controls */}
                <div
                  style={{
                    width: 440,
                    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                    Performance Telemetry
                  </div>

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
                    subLabel="Client-side WASM execution"
                  />

                  {/* Bullet points */}
                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                    {config.productShowcase.bullets.map((b, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          fontSize: 13,
                          color: "rgba(255,255,255,0.8)",
                          opacity: interpolate(frame, [110 + idx * 15, 125 + idx * 15], [0, 1]),
                        }}
                      >
                        <span style={{ color: accent, fontSize: 16 }}>✓</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Interactive Graphic / Data Visualizer */}
                <div
                  style={{
                    flex: 1,
                    padding: 36,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800 }}>Real-time Distribution</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Dynamic Partition Aggregation</div>
                    </div>
                    <div
                      style={{
                        backgroundColor: "#10B98122",
                        border: "1px solid #10B981",
                        color: "#10B981",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "5px 12px",
                        borderRadius: 6,
                      }}
                    >
                      ● 60 FPS STREAM
                    </div>
                  </div>

                  {/* Bar Chart Visualizer */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 24, height: 280, padding: "0 20px" }}>
                    {config.productShowcase.mockup.chart.bars.map((bar, bIdx) => {
                      const barHeightProg = interpolate(frame, [110 + bIdx * 6, 150 + bIdx * 6], [0, 1], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      });
                      const isTargetBar = bIdx === 2;
                      const isHovered = frame >= 140 && isTargetBar;

                      return (
                        <div
                          key={bIdx}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                            height: "100%",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: `${(bar.value / 140) * 230 * barHeightProg}px`,
                              backgroundColor: isHovered ? accent : "rgba(255, 255, 255, 0.15)",
                              borderRadius: "8px 8px 0 0",
                              boxShadow: isHovered ? `0 0 24px ${accent}` : "none",
                              transition: "all 0.1s ease",
                            }}
                          />
                          <div style={{ fontSize: 12, color: isHovered ? "#FFFFFF" : "rgba(255,255,255,0.5)", fontWeight: isHovered ? 800 : 500 }}>
                            {bar.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Action Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div
                      style={{
                        backgroundColor: frame > 170 ? "#10B981" : accent,
                        color: "#FFFFFF",
                        padding: "12px 28px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: `0 10px 25px ${frame > 170 ? "#10B98155" : `${accent}55`}`,
                        transform: frame >= 170 && frame < 185 ? "scale(0.94)" : "scale(1)",
                        transition: "transform 0.08s ease",
                      }}
                    >
                      {frame > 170 ? "✓ Exported to PDF" : config.productShowcase.mockup.actionBtnText || "Export Report"}
                    </div>
                  </div>
                </div>
              </div>
            </GlassmorphicWindow>

            {/* Virtual Cursor moving to bar and clicking Export button */}
            <InteractiveCursor
              x={interpolate(frame, [100, 140, 165, 172, 200], [1300, 1050, 1580, 1580, 1750])}
              y={interpolate(frame, [100, 140, 165, 172, 200], [450, 520, 810, 810, 850])}
              isClicking={frame >= 170 && frame <= 185}
              clickFrameOffset={frame - 170}
              accentColor={accent}
            />
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 3: BENCHMARK & SYSTEM PIPELINE (210 - 330 frames, 7 - 11s) */}
        {/* ============================================================== */}
        {frame >= 210 && frame < 330 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 1300,
              gap: 40,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: accent, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                // PROVEN ADVANTAGE
              </div>
              <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.03em", marginTop: 8 }}>
                Engineered for Maximum Throughput
              </div>
            </div>

            {/* Benchmark comparison bar */}
            <BenchmarkBar
              label="End-to-End Processing Speed"
              legacyTitle="Manual / Cloud-Dependent Pipeline"
              legacyValue="3,840 ms"
              legacyWidthPercent={85}
              ranukTitle={`${config.name} (WASM In-Client)`}
              ranukValue="0 ms (Instant)"
              ranukWidthPercent={12}
              progress={interpolate(frame, [220, 270], [0, 1])}
              accentColor={accent}
            />

            {/* System 4-step pipeline cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, width: "100%" }}>
              {(Array.isArray(config.systemPipeline) ? config.systemPipeline : []).map((st: any, sIdx: number) => {
                const stepProg = interpolate(frame, [240 + sIdx * 12, 260 + sIdx * 12], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <div
                    key={sIdx}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: 14,
                      padding: 22,
                      opacity: stepProg,
                      transform: `translateY(${interpolate(stepProg, [0, 1], [30, 0])}px)`,
                    }}
                  >
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: accent, fontWeight: 700, marginBottom: 8 }}>
                      {st.step || `0${sIdx + 1}`}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{st.title || st.action}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{st.sub || st.metric}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SCENE 4: EXECUTIVE OUTRO & CALL TO ACTION (330 - 450f, 11 - 15s)*/}
        {/* ============================================================== */}
        {frame >= 330 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: 1100,
            }}
          >
            {/* Mission Statement */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: 24,
                opacity: interpolate(frame, [330, 350], [0, 1]),
              }}
            >
              {(config.mission as any)?.line1
                ? `${(config.mission as any).line1} ${(config.mission as any).line2Prefix || ""} ${(config.mission as any).line2Highlight || ""}`
                : (config.mission as any)?.quote || (config.mission as any)?.label || config.tagline}
            </div>

            {/* Outro Headline */}
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginBottom: 36,
                transform: `scale(${interpolate(getSpring(340), [0, 1], [0.92, 1])})`,
              }}
            >
              {(config.outro as any)?.subtitle || (config.outro as any)?.cta || `${(config.outro as any)?.wordmark || config.name} ${(config.outro as any)?.wordmarkAccent || ""}`}
            </div>

            {/* Action Buttons & Links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                opacity: interpolate(frame, [360, 385], [0, 1]),
              }}
            >
              <div
                style={{
                  backgroundColor: accent,
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: 800,
                  padding: "16px 44px",
                  borderRadius: 12,
                  boxShadow: `0 14px 40px ${accent}66`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span>{(config.outro as any)?.ctaText || (config.outro as any)?.btnText || (config.outro as any)?.cta || "Explore Project"}</span>
                <span>→</span>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: 700,
                  padding: "16px 36px",
                  borderRadius: 12,
                  fontFamily: "monospace",
                }}
              >
                {config.outro?.url || "ranuk.dev"}
              </div>
            </div>

            {/* Footer Tag */}
            <div
              style={{
                marginTop: 48,
                fontSize: 14,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.4)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Ranuk IT Solutions · Open Source & Enterprise Developer Tools
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
