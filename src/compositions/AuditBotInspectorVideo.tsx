import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const AuditBotInspectorVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Scene 1 (0-95f): Legal Risk Hook & Accessibility Lawsuit Alert
  // Scene 2 (95-230f): Headless DOM Scanner & 84 WCAG Rule Inspection
  // Scene 3 (230-350f): Live Code Remediation & Health Score Surge (38% -> 98%)
  // Scene 4 (350-450f): Outro CTA & GitHub CI/CD Action

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 14, mass: 0.6, stiffness: 220 },
    });
  };

  // Health Score dial animation (from 38 up to 98)
  const healthScore = Math.round(
    interpolate(frame, [250, 310], [38, 98], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Remediation code diff slide
  const diffSlide = getSpring(235);

  // Outro slide
  const outroSlide = getSpring(350);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#080B11",
        color: "#FFFFFF",
        fontFamily: "'JetBrains Mono', -apple-system, BlinkMacSystemFont, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Subtle DevTools grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Top IDE / DevTools Header Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "#0D1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 36px",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* macOS window controls */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#10B981", marginLeft: 16 }}>
            AUDITBOT HEADLESS INSPECTOR
          </span>
          <span style={{ fontSize: 13, color: "#6E7681" }}>WCAG 2.1 AA / Section 508 Engine</span>
        </div>

        <div style={{ display: "flex", gap: 24, fontSize: 13, color: "#8B949E" }}>
          <div>STATUS: <span style={{ color: frame >= 290 ? "#10B981" : "#EF4444", fontWeight: 700 }}>{frame >= 290 ? "PASSED (0 ISSUES)" : "AUDIT IN PROGRESS"}</span></div>
          <div>RULES: <span style={{ color: "#F0F6FC", fontWeight: 600 }}>84 RULES EVALUATED</span></div>
          <div>SPEED: <span style={{ color: "#38BDF8", fontWeight: 600 }}>820ms EXECUTION</span></div>
        </div>
      </div>

      {/* Main Container */}
      {frame < 360 && (
        <div
          style={{
            position: "absolute",
            inset: "60px 0 0 0",
            display: "flex",
            padding: "36px 60px",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* Left Column: Test Rule Execution Checklist */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {/* Hook Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: frame >= 260 ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                border: frame >= 260 ? "1px solid #10B981" : "1px solid #EF4444",
                color: frame >= 260 ? "#6EE7B7" : "#FCA5A5",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              <span>{frame >= 260 ? "✅ REMEDIATION APPLIED SUCCESSFULLY" : "⚠️ LEGAL COMPLIANCE AUDIT"}</span>
            </div>

            <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.2 }}>
              Automated WCAG 2.1 Scanner
            </div>
            <div style={{ fontSize: 18, color: "#8B949E" }}>
              Scan your production web apps before legal demand letters land.
            </div>

            {/* Checklist of WCAG Rules */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginTop: 8,
              }}
            >
              {[
                { rule: "1.1.1 Non-text Content", desc: "Missing img alt attribute in hero banner", fixed: frame >= 260 },
                { rule: "1.4.3 Contrast (Minimum)", desc: "Text contrast 2.1:1 below 4.5:1 requirement", fixed: frame >= 275 },
                { rule: "2.1.1 Keyboard Accessible", desc: "Non-interactive div used as click target", fixed: frame >= 290 },
                { rule: "4.1.2 Name, Role, Value", desc: "Missing aria-label on checkout submit trigger", fixed: frame >= 305 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    borderRadius: 10,
                    backgroundColor: item.fixed ? "rgba(16, 185, 129, 0.08)" : "rgba(239, 68, 68, 0.08)",
                    border: item.fixed ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: item.fixed ? "#34D399" : "#F87171" }}>
                      {item.rule}
                    </div>
                    <div style={{ fontSize: 12, color: "#8B949E", marginTop: 2 }}>
                      {item.desc}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "4px 12px",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: item.fixed ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                      color: item.fixed ? "#10B981" : "#EF4444",
                    }}
                  >
                    {item.fixed ? "FIXED" : "CRITICAL"}
                  </div>
                </div>
              ))}
            </div>

            {/* Code Diff Remediation Box in Scene 3 */}
            {frame >= 230 && (
              <div
                style={{
                  marginTop: 10,
                  padding: "16px 20px",
                  borderRadius: 10,
                  backgroundColor: "#0D1117",
                  border: "1px solid #30363D",
                  fontSize: 13,
                  opacity: diffSlide,
                }}
              >
                <div style={{ color: "#8B949E", marginBottom: 6, fontSize: 11, fontWeight: 700 }}>
                  AUTO-GENERATED REMEDIATION PATCH:
                </div>
                <div style={{ color: "#F87171", textDecoration: "line-through" }}>
                  - &lt;div class="btn" onclick="submit()"&gt;Submit Order&lt;/div&gt;
                </div>
                <div style={{ color: "#34D399", fontWeight: 600 }}>
                  + &lt;button type="submit" aria-label="Submit Order" role="button"&gt;Submit Order&lt;/button&gt;
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Score Dial & Audit Certificate */}
          <div
            style={{
              width: 520,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            {/* Big Circular Score Display */}
            <div
              style={{
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: `8px solid ${healthScore >= 90 ? "#10B981" : "#EF4444"}`,
                boxShadow: `0 0 50px ${healthScore >= 90 ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                backgroundColor: "rgba(13, 17, 23, 0.9)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.3s ease",
              }}
            >
              <div style={{ fontSize: 14, color: "#8B949E", textTransform: "uppercase", letterSpacing: 2 }}>
                ACCESSIBILITY SCORE
              </div>
              <div
                style={{
                  fontSize: 88,
                  fontWeight: 900,
                  color: healthScore >= 90 ? "#10B981" : "#EF4444",
                  lineHeight: 1,
                  margin: "8px 0",
                }}
              >
                {healthScore}%
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: healthScore >= 90 ? "#34D399" : "#F87171",
                  backgroundColor: healthScore >= 90 ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  padding: "6px 16px",
                  borderRadius: 999,
                }}
              >
                {healthScore >= 90 ? "COMPLIANT • ZERO LEGAL RISK" : "HIGH LAWSUIT EXPOSURE"}
              </div>
            </div>

            {/* PDF Report Badge */}
            <div
              style={{
                width: "100%",
                padding: "18px 24px",
                borderRadius: 14,
                backgroundColor: "rgba(22, 27, 34, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 28 }}>📄</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F0F6FC" }}>
                    Executive Audit Report.pdf
                  </div>
                  <div style={{ fontSize: 12, color: "#8B949E" }}>
                    WCAG 2.1 AA Remediation Certificate
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#38BDF8",
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "1px solid #38BDF8",
                }}
              >
                READY
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scene 4: Outro CTA (350 to 450 frames) */}
      {frame >= 350 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(8, 11, 17, 0.96)",
            zIndex: 50,
            transform: `scale(${interpolate(outroSlide, [0, 1], [0.92, 1])})`,
            opacity: outroSlide,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid #10B981",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: "0 0 50px rgba(16, 185, 129, 0.4)",
              marginBottom: 24,
            }}
          >
            🛡️
          </div>

          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -1, textAlign: "center" }}>
            AuditBot Headless Engine
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#8B949E",
              marginTop: 12,
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Automated WCAG 2.1 accessibility & SEO audits. Run in GitHub Actions before deploying.
          </div>

          <div
            style={{
              marginTop: 36,
              padding: "18px 42px",
              borderRadius: 14,
              backgroundColor: "#10B981",
              color: "#080B11",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 10px 40px rgba(16, 185, 129, 0.4)",
              letterSpacing: 0.5,
            }}
          >
            github.com/RanuK12/AuditBot
          </div>

          <div style={{ fontSize: 14, color: "#6E7681", marginTop: 20 }}>
            Headless CLI • CI/CD Integration • Instant Remediation Diffs
          </div>
        </div>
      )}
    </div>
  );
};
