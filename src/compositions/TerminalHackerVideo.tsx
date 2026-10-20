import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const TerminalHackerVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Scene 1 (0-100f): Ghostty Terminal Prompt & Command Typing
  // Scene 2 (100-240f): ASCII Banner & Streaming Multi-Thread Diagnostics
  // Scene 3 (240-360f): 28x Latency Benchmark Bar & Live Stats
  // Scene 4 (360-450f): Terminal Outro & Developer CTA

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 14, mass: 0.6, stiffness: 220 },
    });
  };

  // Typing animation for CLI command
  const fullCommand = "npx ranuk-forge --scan --optimize --target=production";
  const typedLength = Math.min(
    fullCommand.length,
    Math.floor(interpolate(frame, [15, 80], [0, fullCommand.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
  );
  const typedCommand = fullCommand.substring(0, typedLength);

  // Benchmarking bar animation
  const benchBar = interpolate(frame, [260, 320], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const outroSlide = getSpring(360);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#05070B",
        color: "#F8FAFC",
        fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Cyber Subtle CRT Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          zIndex: 30,
        }}
      />

      {/* macOS Terminal Window Container */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          right: 120,
          bottom: 60,
          backgroundColor: "rgba(10, 14, 23, 0.95)",
          borderRadius: 16,
          border: "1px solid rgba(56, 189, 248, 0.25)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Terminal Titlebar */}
        <div
          style={{
            height: 48,
            backgroundColor: "#0E1524",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
            <span style={{ fontSize: 13, color: "#64748B", marginLeft: 14 }}>
              ranuk@mbp: ~/forge/runtime (zsh)
            </span>
          </div>

          <div style={{ fontSize: 12, color: "#38BDF8", fontWeight: 600 }}>
            ⚡ 60 FPS MOTION ENGINE
          </div>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            flex: 1,
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          {/* Prompt & Command */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#10B981", fontWeight: 700 }}>ranuk@macmini</span>
            <span style={{ color: "#64748B" }}>:</span>
            <span style={{ color: "#38BDF8" }}>~</span>
            <span style={{ color: "#F8FAFC" }}>$</span>
            <span style={{ color: "#F8FAFC", fontWeight: 600 }}>{typedCommand}</span>
            {frame < 80 && (frame % 15 < 8) && (
              <span style={{ width: 10, height: 20, backgroundColor: "#38BDF8", display: "inline-block" }} />
            )}
          </div>

          {/* ASCII Banner after frame 85 */}
          {frame >= 85 && (
            <div style={{ color: "#38BDF8", fontSize: 13, lineHeight: 1.2, fontWeight: 700, margin: "10px 0" }}>
              <pre>{`
  ██████╗  █████╗ ███╗   ██╗██╗   ██╗██╗  ██╗
  ██╔══██╗██╔══██╗████╗  ██║██║   ██║██║ ██╔╝
  ██████╔╝███████║██╔██╗ ██║██║   ██║█████╔╝ 
  ██╔══██╗██╔══██║██║╚██╗██║██║   ██║██╔═██╗ 
  ██║  ██║██║  ██║██║ ╚████║╚██████╔╝██║  ██╗
              `}</pre>
            </div>
          )}

          {/* Streaming Log Lines */}
          {frame >= 105 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#10B981" }}>
              <span>✔</span>
              <span style={{ color: "#E2E8F0" }}>Analyzing code tree:</span>
              <span style={{ color: "#94A3B8" }}>184 repositories scanned in 410ms</span>
            </div>
          )}

          {frame >= 130 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#10B981" }}>
              <span>✔</span>
              <span style={{ color: "#E2E8F0" }}>Remotion video compiler:</span>
              <span style={{ color: "#38BDF8" }}>Hardware-accelerated Metal NVENC initialized</span>
            </div>
          )}

          {frame >= 155 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#10B981" }}>
              <span>✔</span>
              <span style={{ color: "#E2E8F0" }}>Autonomous X integration:</span>
              <span style={{ color: "#F59E0B" }}>Profile 2 (emilio@ranuk.dev) verified</span>
            </div>
          )}

          {frame >= 180 && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#10B981" }}>
              <span>✔</span>
              <span style={{ color: "#E2E8F0" }}>Telegram proof dispatcher:</span>
              <span style={{ color: "#34D399" }}>Direct push active (chat_id: 8107555656)</span>
            </div>
          )}

          {/* Scene 3: Latency Benchmark */}
          {frame >= 240 && (
            <div
              style={{
                marginTop: 24,
                padding: "24px 30px",
                borderRadius: 12,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
              }}
            >
              <div style={{ fontSize: 14, color: "#94A3B8", marginBottom: 14, fontWeight: 700 }}>
                PERFORMANCE BENCHMARK: RENDER & DEPLOY SPEED
              </div>

              {/* Legacy Way */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748B" }}>
                  <span>Traditional Cloud Render Farms</span>
                  <span>14,200ms</span>
                </div>
                <div style={{ height: 10, backgroundColor: "#1E293B", borderRadius: 5, marginTop: 6, overflow: "hidden" }}>
                  <div style={{ width: "95%", height: "100%", backgroundColor: "#EF4444" }} />
                </div>
              </div>

              {/* Ranuk Forge */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#38BDF8", fontWeight: 700 }}>
                  <span>⚡ Ranuk Local Motion Forge (Mac Mini M-Series)</span>
                  <span style={{ color: "#10B981" }}>490ms (28x Faster)</span>
                </div>
                <div style={{ height: 10, backgroundColor: "#1E293B", borderRadius: 5, marginTop: 6, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${benchBar * 100}%`,
                      maxWidth: "18%",
                      height: "100%",
                      backgroundColor: "#10B981",
                      boxShadow: "0 0 15px #10B981",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scene 4: Outro CTA (360-450f) */}
      {frame >= 360 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(5, 7, 11, 0.97)",
            zIndex: 60,
            transform: `scale(${interpolate(outroSlide, [0, 1], [0.92, 1])})`,
            opacity: outroSlide,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -1, textAlign: "center" }}>
            Engineered for Builders.
          </div>
          <div style={{ fontSize: 22, color: "#94A3B8", marginTop: 12 }}>
            Autonomous video generation, high-speed scrapers & agent protocols.
          </div>
          <div
            style={{
              marginTop: 32,
              padding: "16px 36px",
              borderRadius: 12,
              backgroundColor: "#38BDF8",
              color: "#05070B",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            github.com/RanuK12
          </div>
          <div style={{ fontSize: 14, color: "#64748B", marginTop: 16 }}>
            Follow @ranuk_dev on X for weekly releases
          </div>
        </div>
      )}
    </div>
  );
};
