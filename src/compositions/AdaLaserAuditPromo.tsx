import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Audio,
  staticFile,
} from "remotion";

export const AdaLaserAuditPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color Palette: Cyber Obsidian, Laser Emerald, Cyber Cyan, Warning Coral
  const BG = "#070A10";
  const EMERALD = "#00F5A0";
  const CYAN = "#00D8F6";
  const CORAL = "#FF455B";
  const TEXT_WHITE = "#F1F5F9";
  const CODE_BG = "rgba(10, 15, 26, 0.85)";

  const getSpring = (offset: number, damping = 14, stiffness = 180) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.65, stiffness },
    });
  };

  // Phase Timing:
  // Phase 1: 0 - 95f (0 - 3.2s) -> Lawsuit / Compliance Agitation
  // Phase 2: 95 - 215f (3.2 - 7.2s) -> Interactive Laser Scan & Auto-Diff Remediation
  // Phase 3: 215 - 335f (7.2 - 11.2s) -> Metric Dial: 42% -> 99.6% AAA Certified
  // Phase 4: 335 - 450f (11.2 - 15.0s) -> DevTools Outro & GitHub / Web CTA

  const cameraScale = interpolate(
    frame,
    [0, 80, 95, 170, 215, 290, 335, 430],
    [1, 1.03, 1.01, 1.05, 1.01, 1.04, 1.02, 1.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const hookWords = [
    { text: "IS", highlight: false },
    { text: "YOUR", highlight: false },
    { text: "WEB", highlight: false },
    { text: "APP", highlight: false },
    { text: "COMPLIANT", highlight: true },
    { text: "BEFORE", highlight: false },
    { text: "A", highlight: false },
    { text: "LAWSUIT", highlight: true, color: CORAL },
    { text: "LANDS?", highlight: false },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        backgroundColor: BG,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: TEXT_WHITE,
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.8} />

      {/* ============================================================== */}
      {/* 💻 BACKGROUND LAYER: SCANLINES & OBSIDIAN MATRIX GRID          */}
      {/* ============================================================== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 20%, #0D1C2E 0%, #070A10 65%)`,
          zIndex: 0,
        }}
      />

      {/* Hex Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 245, 160, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 245, 160, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          backgroundPosition: `0px ${(frame * 0.8) % 48}px`,
        }}
      />

      {/* Subtle CRT Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0) 50%, rgba(0,0,0,0.25) 50%)`,
          backgroundSize: "100% 4px",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* Camera Scale Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {/* ============================================================== */}
        {/* ⚠️ PHASE 1: THE LAWSUIT RISK HOOK (0 - 95f)                     */}
        {/* ============================================================== */}
        {frame < 95 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            {/* Top Threat Pill */}
            {(() => {
              const pillSpring = getSpring(0);
              return (
                <div
                  style={{
                    opacity: pillSpring,
                    transform: `translateY(${(1 - pillSpring) * -25}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "rgba(255, 69, 91, 0.12)",
                    border: `1.5px solid ${CORAL}`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    marginBottom: 36,
                    boxShadow: `0 0 30px rgba(255, 69, 91, 0.35)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>🛡️ ⚠️</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: CORAL,
                    }}
                  >
                    WCAG 2.1 & ADA COMPLIANCE RISK
                  </span>
                </div>
              );
            })()}

            {/* Kinetic Typography */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "18px 24px",
                maxWidth: 1350,
                marginBottom: 36,
              }}
            >
              {hookWords.map((word, idx) => {
                const wSpring = getSpring(10 + idx * 5, 13, 200);
                const color = word.color || (word.highlight ? EMERALD : TEXT_WHITE);
                return (
                  <span
                    key={idx}
                    style={{
                      fontSize: 66,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      opacity: wSpring,
                      transform: `translateY(${(1 - wSpring) * 35}px) scale(${0.85 + 0.15 * wSpring})`,
                      color,
                      textShadow: word.highlight
                        ? `0 0 35px ${color}88`
                        : "0 4px 20px rgba(0,0,0,0.8)",
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>

            {/* Subtitle Stat Alert */}
            {(() => {
              const subSpring = getSpring(50);
              return (
                <div
                  style={{
                    opacity: subSpring,
                    transform: `translateY(${(1 - subSpring) * 20}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: "12px 24px",
                  }}
                >
                  <span style={{ fontSize: 20 }}>⚖️</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.85)",
                    }}
                  >
                    4,600+ Federal ADA web lawsuits filed this year alone.
                  </span>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 🔬 PHASE 2: LASER SCANNER & AUTO-REMEDIATION DIFF (95 - 215f)  */}
        {/* ============================================================== */}
        {frame >= 95 && frame < 215 && (
          <div
            style={{
              width: 1560,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 50,
            }}
          >
            {/* Left Column: Code Window with Laser Sweep */}
            {(() => {
              const codeSpring = getSpring(100);
              // Laser beam progress 0 to 1 across frames 105 to 195
              const laserProgress = interpolate(frame, [105, 175], [0, 100], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const isRemediated = frame > 160;

              return (
                <div
                  style={{
                    flex: 1.3,
                    opacity: codeSpring,
                    transform: `translateY(${(1 - codeSpring) * 30}px)`,
                    backgroundColor: CODE_BG,
                    border: `1.5px solid rgba(0, 245, 160, 0.35)`,
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0, 245, 160, 0.15)`,
                    position: "relative",
                  }}
                >
                  {/* Terminal Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 24px",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FF5F56" }} />
                      <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#FFBD2E" }} />
                      <span style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27C93F" }} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 13,
                        color: CYAN,
                        letterSpacing: "0.08em",
                      }}
                    >
                      AuditBot // Headless DOM Inspector · WCAG 2.1 AA
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: EMERALD,
                        fontWeight: 700,
                      }}
                    >
                      LIVE RUN
                    </div>
                  </div>

                  {/* Code Lines with Laser Beam */}
                  <div
                    style={{
                      padding: "28px 32px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 17,
                      lineHeight: 1.8,
                      position: "relative",
                    }}
                  >
                    {/* Laser Line Beam */}
                    <div
                      style={{
                        position: "absolute",
                        top: `${laserProgress}%`,
                        left: 0,
                        right: 0,
                        height: 3,
                        backgroundColor: EMERALD,
                        boxShadow: `0 0 25px ${EMERALD}, 0 0 10px #FFFFFF`,
                        pointerEvents: "none",
                        transition: "top 0.1s linear",
                        zIndex: 10,
                      }}
                    />

                    <div>
                      <span style={{ color: "#64748B" }}>01</span>{" "}
                      <span style={{ color: CYAN }}>&lt;form</span>{" "}
                      <span style={{ color: "#F59E0B" }}>id=</span>
                      <span style={{ color: "#A7F3D0" }}>"checkout-flow"</span>&gt;
                    </div>

                    {/* Line 2: Violating vs Auto-fixed */}
                    <div
                      style={{
                        backgroundColor: isRemediated ? "rgba(0, 245, 160, 0.12)" : "rgba(255, 69, 91, 0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        margin: "4px 0",
                      }}
                    >
                      <span style={{ color: isRemediated ? EMERALD : CORAL }}>02</span>{" "}
                      {isRemediated ? (
                        <span>
                          <span style={{ color: EMERALD }}>+ </span>
                          <span style={{ color: CYAN }}>&lt;button</span>{" "}
                          <span style={{ color: EMERALD }}>aria-label=</span>
                          <span style={{ color: "#A7F3D0" }}>"Confirm Payment"</span>{" "}
                          <span style={{ color: EMERALD }}>role=</span>
                          <span style={{ color: "#A7F3D0" }}>"button"</span>&gt;
                        </span>
                      ) : (
                        <span>
                          <span style={{ color: CORAL }}>- </span>
                          <span style={{ color: CYAN }}>&lt;button</span>{" "}
                          <span style={{ color: CORAL }}>class=</span>
                          <span style={{ color: "#FECDD3" }}>"pay-btn"</span>&gt;{" "}
                          <span style={{ color: CORAL, fontSize: 13 }}>/* Missing ARIA name */</span>
                        </span>
                      )}
                    </div>

                    {/* Line 3: Image element */}
                    <div
                      style={{
                        backgroundColor: isRemediated ? "rgba(0, 245, 160, 0.12)" : "rgba(255, 69, 91, 0.12)",
                        padding: "2px 8px",
                        borderRadius: 6,
                        margin: "4px 0",
                      }}
                    >
                      <span style={{ color: isRemediated ? EMERALD : CORAL }}>03</span>{" "}
                      {isRemediated ? (
                        <span>
                          <span style={{ color: EMERALD }}>+ </span>
                          <span style={{ color: CYAN }}>&lt;img</span>{" "}
                          <span style={{ color: "#F59E0B" }}>src=</span>
                          <span style={{ color: "#A7F3D0" }}>"hero.webp"</span>{" "}
                          <span style={{ color: EMERALD }}>alt=</span>
                          <span style={{ color: "#A7F3D0" }}>"Product Dashboard View"</span> /&gt;
                        </span>
                      ) : (
                        <span>
                          <span style={{ color: CORAL }}>- </span>
                          <span style={{ color: CYAN }}>&lt;img</span>{" "}
                          <span style={{ color: "#F59E0B" }}>src=</span>
                          <span style={{ color: "#A7F3D0" }}>"hero.webp"</span> /&gt;{" "}
                          <span style={{ color: CORAL, fontSize: 13 }}>/* WCAG 1.1.1 Fail */</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <span style={{ color: "#64748B" }}>04</span>{" "}
                      <span style={{ color: CYAN }}>&lt;/form&gt;</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Right Column: Violation Alert Cards & Auto-Fix Notification */}
            {(() => {
              const rightSpring = getSpring(115);
              const isFixed = frame > 165;
              const fixSpring = getSpring(165, 12, 190);

              return (
                <div
                  style={{
                    flex: 0.9,
                    opacity: rightSpring,
                    transform: `translateX(${(1 - rightSpring) * 35}px)`,
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: isFixed ? EMERALD : CORAL,
                      textTransform: "uppercase",
                    }}
                  >
                    {isFixed ? "// AUTOMATED REMEDIATION READY" : "// 3 CRITICAL VIOLATIONS DETECTED"}
                  </div>

                  {[
                    {
                      rule: "WCAG 1.1.1 (Level A)",
                      title: "Non-text Content",
                      desc: "Image element lacks valid accessible description",
                    },
                    {
                      rule: "WCAG 4.1.2 (Level A)",
                      title: "Name, Role, Value",
                      desc: "Interactive button lacks discernable ARIA name",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.75)",
                        border: `1.5px solid ${isFixed ? "rgba(0, 245, 160, 0.4)" : "rgba(255, 69, 91, 0.4)"}`,
                        borderRadius: 14,
                        padding: "18px 22px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 12,
                            fontWeight: 700,
                            color: isFixed ? EMERALD : CORAL,
                          }}
                        >
                          {item.rule}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: 6,
                            backgroundColor: isFixed ? "rgba(0, 245, 160, 0.2)" : "rgba(255, 69, 91, 0.2)",
                            color: isFixed ? EMERALD : CORAL,
                          }}
                        >
                          {isFixed ? "FIXED ✓" : "VIOLATION"}
                        </span>
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: TEXT_WHITE }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                        {item.desc}
                      </div>
                    </div>
                  ))}

                  {isFixed && (
                    <div
                      style={{
                        opacity: fixSpring,
                        transform: `scale(${0.95 + 0.05 * fixSpring})`,
                        backgroundColor: "rgba(0, 245, 160, 0.15)",
                        border: `1.5px solid ${EMERALD}`,
                        borderRadius: 12,
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <span style={{ fontSize: 22 }}>⚡</span>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: EMERALD }}>
                          Git Pull Request Ready
                        </div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                          2 lines modified · 0 build regressions
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 📊 PHASE 3: COMPLIANCE DIAL 42% -> 99.6% (215 - 335f)          */}
        {/* ============================================================== */}
        {frame >= 215 && frame < 335 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 80,
              width: 1400,
            }}
          >
            {/* Massive Circular Compliance Score Dial */}
            {(() => {
              const dialSpring = getSpring(220, 12, 160);
              const score = interpolate(dialSpring, [0, 1], [42, 99.6], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const strokeDashoffset = interpolate(dialSpring, [0, 1], [440, 20]);

              return (
                <div
                  style={{
                    opacity: dialSpring,
                    transform: `scale(${0.8 + 0.2 * dialSpring})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <svg width={340} height={340} viewBox="0 0 340 340">
                    <circle
                      cx={170}
                      cy={170}
                      r={140}
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={18}
                    />
                    <circle
                      cx={170}
                      cy={170}
                      r={140}
                      fill="none"
                      stroke={EMERALD}
                      strokeWidth={18}
                      strokeDasharray={880}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      transform="rotate(-90 170 170)"
                      style={{
                        filter: `drop-shadow(0 0 20px ${EMERALD})`,
                      }}
                    />
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 64,
                        fontWeight: 900,
                        color: EMERALD,
                        lineHeight: 1,
                      }}
                    >
                      {score.toFixed(1)}%
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        letterSpacing: "0.15em",
                        color: "rgba(255,255,255,0.7)",
                        marginTop: 8,
                        textTransform: "uppercase",
                      }}
                    >
                      WCAG 2.1 AAA
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Right Telemetry Column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                width: 600,
              }}
            >
              {[
                {
                  label: "DOM SCAN VELOCITY",
                  val: "< 12s",
                  sub: "Headless Chromium testing every client-rendered route",
                  delay: 230,
                },
                {
                  label: "COVERAGE MATRIX",
                  val: "84 RULES",
                  sub: "Color contrast, ARIA landmarks, focus traps & screen-reader keys",
                  delay: 245,
                },
                {
                  label: "EXECUTIVE REPORTING",
                  val: "PDF & PR",
                  sub: "Instant boardroom audit summary + code PR with diffs",
                  delay: 260,
                },
              ].map((kpi, idx) => {
                const kSpring = getSpring(kpi.delay, 12, 180);
                return (
                  <div
                    key={idx}
                    style={{
                      opacity: kSpring,
                      transform: `translateX(${(1 - kSpring) * 35}px)`,
                      backgroundColor: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(0, 245, 160, 0.25)",
                      borderRadius: 16,
                      padding: "20px 28px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        fontWeight: 700,
                        color: CYAN,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {kpi.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 36,
                        fontWeight: 900,
                        color: TEXT_WHITE,
                        margin: "4px 0",
                      }}
                    >
                      {kpi.val}
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)" }}>
                      {kpi.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 🚀 PHASE 4: DEVTOOLS OUTRO & REPO / WEB CTA (335 - 450f)       */}
        {/* ============================================================== */}
        {frame >= 335 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Outro Badge */}
            {(() => {
              const bSpring = getSpring(338, 12, 170);
              return (
                <div
                  style={{
                    opacity: bSpring,
                    transform: `translateY(${(1 - bSpring) * -25}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "rgba(0, 245, 160, 0.12)",
                    border: `1.5px solid ${EMERALD}`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    marginBottom: 28,
                    boxShadow: `0 0 35px rgba(0, 245, 160, 0.35)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>🛡️</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: EMERALD,
                    }}
                  >
                    AUTOMATED WCAG 2.1 INSPECTOR
                  </span>
                </div>
              );
            })()}

            {/* Main Wordmark */}
            {(() => {
              const titleSpring = getSpring(350, 14, 180);
              return (
                <div
                  style={{
                    opacity: titleSpring,
                    transform: `translateY(${(1 - titleSpring) * 25}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1
                    style={{
                      fontSize: 84,
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      margin: "0 0 16px 0",
                      background: `linear-gradient(to bottom, #FFFFFF 30%, ${EMERALD} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: `0 10px 40px rgba(0,0,0,0.8)`,
                    }}
                  >
                    AuditBot
                  </h1>

                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.85)",
                      maxWidth: 900,
                      margin: "0 0 38px 0",
                    }}
                  >
                    Zero Lawsuits. Full WCAG 2.1 AA Compliance In Seconds.
                  </p>
                </div>
              );
            })()}

            {/* Action CTA Box */}
            {(() => {
              const ctaSpring = getSpring(365, 12, 200);
              return (
                <div
                  style={{
                    opacity: ctaSpring,
                    transform: `scale(${0.9 + 0.1 * ctaSpring}) translateY(${(1 - ctaSpring) * 20}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: EMERALD,
                      color: "#070A10",
                      padding: "20px 48px",
                      borderRadius: 999,
                      fontSize: 26,
                      fontWeight: 900,
                      letterSpacing: "0.02em",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      boxShadow: `0 0 50px rgba(0, 245, 160, 0.7)`,
                    }}
                  >
                    <span>AUDITAR MI SITIO AHORA</span>
                    <span style={{ fontSize: 30 }}>➔</span>
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 22,
                      fontWeight: 700,
                      color: CYAN,
                      letterSpacing: "0.05em",
                    }}
                  >
                    github.com/RanuK12/AuditBot · ranuk.dev
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
