import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const FeatureWalkthroughVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -------------------------------------------------------------
  // Camera Pan & Zoom Dynamics
  // -------------------------------------------------------------
  // Phase 1 (0-150f, 0-5s): Overview & Prompt Typing
  // Phase 2 (150-360f, 5-12s): Zoom into Live Panel & KPIs
  // Phase 3 (360-540f, 12-18s): Cursor hover, bar click & drill-down
  // Phase 4 (540-660f, 18-22s): Click Export PDF & success toast
  // Phase 5 (660-720f, 22-24s): Smooth zoom out & CTA outro
  // -------------------------------------------------------------

  const zoomProgress = interpolate(frame, [140, 200, 520, 580, 650, 700], [1, 1.15, 1.15, 1.25, 1.25, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panX = interpolate(frame, [140, 200, 520, 580, 650, 700], [0, -180, -180, -280, -280, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const panY = interpolate(frame, [140, 200, 520, 580, 650, 700], [0, -40, -40, -100, -100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Prompt typing animation (0-90 frames)
  const fullPrompt = "Please analyze the Q2 Sales CSV dataset and generate an interactive dashboard with regional KPIs.";
  const typedLength = Math.min(fullPrompt.length, Math.floor(interpolate(frame, [15, 85], [0, fullPrompt.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const currentPromptText = fullPrompt.substring(0, typedLength);

  // ChatGPT response bubble appears at frame 90
  const chatGptAppear = spring({ frame: frame - 90, fps, config: { damping: 14, mass: 0.8, stiffness: 200 } });

  // DataCanvas side panel slides in at frame 110
  const panelSlide = spring({ frame: frame - 110, fps, config: { damping: 15, mass: 0.8, stiffness: 170 } });
  const panelX = interpolate(panelSlide, [0, 1], [300, 0]);

  // Animated KPI numbers counting up
  const kpiCount1 = interpolate(frame, [125, 180], [0, 1.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const kpiCount2 = interpolate(frame, [125, 180], [0, 48.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Bar chart growth
  const barGrowth = spring({ frame: frame - 140, fps, config: { damping: 14, mass: 0.7, stiffness: 160 } });

  // Virtual Mouse Cursor Path
  // Enters at frame 220 -> moves to North bar at frame 300 -> clicks at frame 340
  // moves to Export PDF button at frame 480 -> clicks at frame 540
  const cursorX = interpolate(
    frame,
    [220, 300, 340, 420, 500, 540, 620],
    [1500, 1260, 1260, 1380, 1680, 1680, 1850],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cursorY = interpolate(
    frame,
    [220, 300, 340, 420, 500, 540, 620],
    [900, 620, 620, 550, 180, 180, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const isBarClicked = frame >= 340;
  const isExportClicked = frame >= 540;
  const clickWave1 = Math.max(0, 1 - Math.abs(frame - 340) / 15);
  const clickWave2 = Math.max(0, 1 - Math.abs(frame - 540) / 15);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#0B0F19",
        color: "#FFFFFF",
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Ambient glowing radial orbs in background */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Scalable Desktop Canvas */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoomProgress}) translate(${panX}px, ${panY}px)`,
          transformOrigin: "center center",
          display: "flex",
          flexDirection: "column",
          padding: 40,
          boxSizing: "border-box",
        }}
      >
        {/* Main Application Window */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#111827",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* macOS Browser Chrome */}
          <div
            style={{
              height: 52,
              backgroundColor: "#1F2937",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            {/* Traffic Lights */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
            </div>

            {/* URL Bar */}
            <div
              style={{
                backgroundColor: "#111827",
                borderRadius: 8,
                padding: "6px 28px",
                fontSize: 13,
                fontWeight: 600,
                color: "#9CA3AF",
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#10B981" }}>🔒</span>
              <span>chatgpt.com / c / q2-sales-datacanvas</span>
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#3B82F6" }}>
              OpenAI MCP Active
            </div>
          </div>

          {/* Split Screen Container */}
          <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
            {/* Left 40%: ChatGPT Conversation */}
            <div
              style={{
                width: "42%",
                backgroundColor: "#111827",
                borderRight: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 32,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* User Prompt */}
                <div style={{ display: "flex", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#3B82F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 14,
                    }}
                  >
                    ER
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 700, marginBottom: 4 }}>
                      Emilio Ranucoli
                    </div>
                    <div
                      style={{
                        backgroundColor: "#1F2937",
                        padding: "16px 20px",
                        borderRadius: "4px 16px 16px 16px",
                        fontSize: 16,
                        lineHeight: 1.45,
                        color: "#F3F4F6",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {currentPromptText}
                      {frame < 85 && (
                        <span style={{ display: "inline-block", width: 2, height: 16, backgroundColor: "#3B82F6", marginLeft: 4 }} />
                      )}
                    </div>
                  </div>
                </div>

                {/* ChatGPT Response */}
                {frame >= 90 && (
                  <div style={{ display: "flex", gap: 14, opacity: chatGptAppear }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: "#10B981",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 900,
                        fontSize: 14,
                      }}
                    >
                      GPT
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "#10B981", fontWeight: 700, marginBottom: 4 }}>
                        ChatGPT (DataCanvas Extension)
                      </div>
                      <div
                        style={{
                          backgroundColor: "#1F2937",
                          padding: "16px 20px",
                          borderRadius: "4px 16px 16px 16px",
                          fontSize: 15,
                          lineHeight: 1.45,
                          color: "#E5E7EB",
                          border: "1px solid rgba(16,185,129,0.2)",
                        }}
                      >
                        Dataset parsed: <b>1,248 rows</b>. Launching live DuckDB-WASM dashboard in conversation panel...
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Placeholder */}
              <div
                style={{
                  backgroundColor: "#1F2937",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#6B7280",
                  fontSize: 14,
                }}
              >
                <span>Message ChatGPT...</span>
                <span>⌘K</span>
              </div>
            </div>

            {/* Right 58%: DataCanvas Live Inspector Panel */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#0E131F",
                transform: `translateX(${panelX}px)`,
                display: "flex",
                flexDirection: "column",
                padding: 32,
                gap: 20,
              }}
            >
              {/* DataCanvas Header Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 16,
                      boxShadow: "0 0 16px rgba(37,99,235,0.5)",
                    }}
                  >
                    DC
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                      DataCanvas BI
                    </h2>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Q2 Sales Performance Dashboard</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    style={{
                      backgroundColor: isExportClicked ? "#10B981" : "#2563EB",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 14,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      boxShadow: isExportClicked ? "0 0 20px #10B981" : "0 4px 14px rgba(37,99,235,0.4)",
                      transform: isExportClicked ? "scale(0.97)" : "scale(1)",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>{isExportClicked ? "✓ Generated" : "📄 Export PDF"}</span>
                  </button>
                </div>
              </div>

              {/* 3 Executive KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div
                  style={{
                    backgroundColor: "#161E2E",
                    borderRadius: 14,
                    padding: 20,
                    border: "1px solid rgba(59,130,246,0.3)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>Top Total Sales</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#38BDF8", marginTop: 4 }}>
                    ${kpiCount1.toFixed(2)}M
                  </div>
                  <div style={{ fontSize: 12, color: "#10B981", fontWeight: 700, marginTop: 4 }}>
                    ↑ +12.4% vs Q1
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#161E2E",
                    borderRadius: 14,
                    padding: 20,
                    border: "1px solid rgba(168,85,247,0.3)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>Sales Volume</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#C084FC", marginTop: 4 }}>
                    {kpiCount2.toFixed(1)}k
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>
                    1,248 Transactions
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#161E2E",
                    borderRadius: 14,
                    padding: 20,
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>Avg Order Value</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#F3F4F6", marginTop: 4 }}>
                    $38.30
                  </div>
                  <div style={{ fontSize: 12, color: "#10B981", fontWeight: 700, marginTop: 4 }}>
                    DuckDB WASM
                  </div>
                </div>
              </div>

              {/* Main Interactive Chart Box */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#161E2E",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#E5E7EB" }}>
                    Regional Sales Distribution
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: "rgba(59,130,246,0.2)",
                      color: "#60A5FA",
                      padding: "4px 10px",
                      borderRadius: 6,
                    }}
                  >
                    Live ECharts 5.5
                  </div>
                </div>

                {/* Animated Bars */}
                <div style={{ display: "flex", alignItems: "flex-end", height: 180, gap: 36, padding: "0 20px" }}>
                  {[
                    { label: "North", val: 140, active: isBarClicked },
                    { label: "South", val: 95, active: false },
                    { label: "East", val: 115, active: false },
                    { label: "West", val: 80, active: false },
                    { label: "Central", val: 55, active: false },
                  ].map((bar, idx) => (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                        position: "relative",
                      }}
                    >
                      {/* Active Tooltip above North bar */}
                      {bar.active && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: bar.val * barGrowth + 12,
                            backgroundColor: "#1E293B",
                            border: "1px solid #38BDF8",
                            borderRadius: 8,
                            padding: "6px 12px",
                            fontSize: 12,
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                            boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
                            color: "#38BDF8",
                            zIndex: 10,
                          }}
                        >
                          North: $540,210 (112% Goal)
                        </div>
                      )}

                      <div
                        style={{
                          width: "100%",
                          height: bar.val * barGrowth,
                          backgroundColor: bar.active ? "#38BDF8" : "#2563EB",
                          borderRadius: "8px 8px 0 0",
                          boxShadow: bar.active ? "0 0 20px rgba(56,189,248,0.7)" : "none",
                          transition: "background-color 0.2s, box-shadow 0.2s",
                        }}
                      />
                      <span style={{ fontSize: 13, color: bar.active ? "#38BDF8" : "#9CA3AF", fontWeight: 700 }}>
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Sub-bar */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#9CA3AF",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: 12,
                  }}
                >
                  <span>Client-Side Query: 0ms latency</span>
                  <span style={{ color: "#10B981" }}>● 100% In-Browser Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Mouse Cursor */}
      {frame >= 200 && frame <= 640 && (
        <div
          style={{
            position: "absolute",
            left: cursorX,
            top: cursorY,
            pointerEvents: "none",
            zIndex: 999,
          }}
        >
          {/* Cursor Pointer Arrow */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#FFFFFF"
              stroke="#0A0A0A"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>

          {/* Click Ripple Waves */}
          {clickWave1 > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid #38BDF8",
                transform: `scale(${1 + (1 - clickWave1) * 2}) translate(-50%, -50%)`,
                opacity: clickWave1,
              }}
            />
          )}
          {clickWave2 > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "2px solid #10B981",
                transform: `scale(${1 + (1 - clickWave2) * 2}) translate(-50%, -50%)`,
                opacity: clickWave2,
              }}
            />
          )}
        </div>
      )}

      {/* Outro Overlay in final 2 seconds (frame 660-720) */}
      {frame >= 660 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(11,15,25,0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            zIndex: 1000,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#FFFFFF",
            }}
          >
            DataCanvas <span style={{ color: "#3B82F6" }}>BI</span>
          </div>

          <div style={{ fontSize: 24, color: "#9CA3AF", maxWidth: 700, textAlign: "center" }}>
            The native interactive dashboard extension for ChatGPT.
          </div>

          <div
            style={{
              backgroundColor: "#2563EB",
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 800,
              padding: "16px 40px",
              borderRadius: 999,
              marginTop: 10,
              boxShadow: "0 10px 30px rgba(37,99,235,0.4)",
            }}
          >
            Try DataCanvas Pro →
          </div>

          <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: "#E5E7EB" }}>
            ranuk.dev / datacanvas
          </div>
        </div>
      )}
    </div>
  );
};
