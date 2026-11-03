import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";
import { IndieShowcaseProps, defaultDynamicIslandProps } from "./IndieProductShowcase";

export const IndieProductShowcaseVertical: React.FC<{ customProps?: Partial<IndieShowcaseProps> }> = ({ customProps }) => {
  const props = { ...defaultDynamicIslandProps, ...customProps };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 27s @ 30fps = 810 frames
  const sHook = spring({ frame, fps, config: { damping: 15, stiffness: 180 } });
  const sFeature = spring({ frame: frame - 90, fps, config: { damping: 16, stiffness: 170 } });
  const sSettings = spring({ frame: frame - 330, fps, config: { damping: 16, stiffness: 180 } });
  const sReddit = spring({ frame: frame - 540, fps, config: { damping: 14, stiffness: 190 } });
  const sOutro = spring({ frame: frame - 720, fps, config: { damping: 15, stiffness: 200 } });

  // Scene Opacities with smooth transitions
  const opHook = interpolate(frame, [0, 20, 80, 95], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opFeature = interpolate(frame, [90, 110, 315, 335], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opSettings = interpolate(frame, [330, 350, 525, 545], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opReddit = interpolate(frame, [540, 560, 705, 725], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opOutro = interpolate(frame, [720, 740, 810], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const pillWidth = interpolate(frame, [110, 170, 260, 310], [280, 580, 580, 280], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pillHeight = interpolate(frame, [110, 170, 260, 310], [44, 150, 150, 44], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const waveformPhase = (frame * 12) % 360;

  const sliderWidthPct = interpolate(frame, [380, 470], [20, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.8} />

      {/* Subtle background mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 20%, #FFFFFF 0%, #F1F5F9 60%, #E2E8F0 100%)",
        }}
      />

      {/* ============================================================== */}
      {/* SCENE 1: HOOK & IDENTITY (0-3s)                                */}
      {/* ============================================================== */}
      {frame < 105 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            textAlign: "center",
            opacity: opHook,
            transform: `scale(${interpolate(sHook, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 38,
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              boxShadow: "0 30px 60px -15px rgba(15, 23, 42, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 44,
            }}
          >
            <div
              style={{
                width: 86,
                height: 28,
                borderRadius: 14,
                backgroundColor: props.accentColor,
                boxShadow: `0 0 28px ${props.accentColor}`,
              }}
            />
          </div>

          <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.2em", color: "#64748B", marginBottom: 20, textTransform: "uppercase" }}>
            {props.categoryTag}
          </div>

          <div style={{ fontSize: 72, fontWeight: 900, letterSpacing: "-0.04em", color: "#0F172A", marginBottom: 24, lineHeight: 1.1 }}>
            {props.productName}
          </div>

          <div style={{ fontSize: 32, fontWeight: 500, color: "#64748B", lineHeight: 1.4 }}>
            {props.tagline}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: INTERACTIVE FEATURE ACTION (3-11s)                    */}
      {/* ============================================================== */}
      {frame >= 85 && frame < 345 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            opacity: opFeature,
            transform: `scale(${interpolate(sFeature, [0, 1], [0.94, 1])})`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 16 }}>
              {props.featureTitle}
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: "#64748B", maxWidth: 700 }}>
              {props.featureSubtitle}
            </div>
          </div>

          {/* Device Mockup */}
          <div
            style={{
              width: 960,
              height: 720,
              borderRadius: 32,
              backgroundColor: "#0F172A",
              boxShadow: "0 40px 80px -20px rgba(15, 23, 42, 0.4)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #090D16 0%, #111827 50%, #1E1B4B 100%)" }} />

            {/* Glowing top line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "15%",
                right: "15%",
                height: 3,
                background: `linear-gradient(90deg, transparent, ${props.accentColor}, transparent)`,
              }}
            />

            {/* Dynamic Island Pill */}
            <div
              style={{
                position: "absolute",
                top: 36,
                width: pillWidth,
                height: pillHeight,
                borderRadius: pillHeight / 2,
                backgroundColor: "#000000",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.12) inset",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>🎵</span>
                </div>
                {pillWidth > 350 && (
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 17, fontWeight: 700 }}>Starboy — Daft Punk</div>
                    <div style={{ color: "#94A3B8", fontSize: 13 }}>Spotify SMTC · Win32 Hook</div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[14, 24, 32, 18, 28, 12].map((h, i) => {
                  const animH = Math.max(6, Math.sin((waveformPhase + i * 40) * (Math.PI / 180)) * h);
                  return (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: pillWidth > 350 ? animH : 14,
                        borderRadius: 2,
                        backgroundColor: props.accentColor,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom specs */}
            <div style={{ position: "absolute", bottom: 36, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
              {props.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 22px",
                    borderRadius: 24,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#E2E8F0",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: "#94A3B8", marginRight: 6 }}>{spec.label}:</span>
                  <span style={{ color: props.accentColor }}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: SETTINGS & CONTROLS (11-18s)                          */}
      {/* ============================================================== */}
      {frame >= 325 && frame < 555 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            opacity: opSettings,
            transform: `scale(${interpolate(sSettings, [0, 1], [0.94, 1])})`,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 14 }}>
              Granular Control
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: "#64748B" }}>
              Native settings. Instant haptics. Zero CPU overhead.
            </div>
          </div>

          <div
            style={{
              width: 860,
              borderRadius: 28,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 35px 70px -15px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.06)",
              padding: "40px 48px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 20, borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: props.accentColor }} />
                <span style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>{props.productName} Preferences</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#10B981", backgroundColor: "#ECFDF5", padding: "6px 14px", borderRadius: 14 }}>
                v1.2 Active
              </span>
            </div>

            {props.settingsItems.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1E293B" }}>{item.label}</div>
                  {item.sublabel && <div style={{ fontSize: 15, color: "#64748B", marginTop: 4 }}>{item.sublabel}</div>}
                </div>

                {item.type === "toggle" ? (
                  <div
                    style={{
                      width: 60,
                      height: 34,
                      borderRadius: 17,
                      backgroundColor: item.active ? "#10B981" : "#CBD5E1",
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: item.active ? "flex-end" : "flex-start",
                    }}
                  >
                    <div style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: "#FFFFFF", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }} />
                  </div>
                ) : (
                  <div style={{ width: 240, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: "#E2E8F0", position: "relative", overflow: "hidden" }}>
                      <div style={{ width: `${sliderWidthPct}%`, height: "100%", backgroundColor: props.accentColor, borderRadius: 5 }} />
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", width: 44 }}>
                      {Math.round(sliderWidthPct)}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 4: "HEARD ON REDDIT" SOCIAL PROOF (18-24s)               */}
      {/* ============================================================== */}
      {frame >= 535 && frame < 735 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 40px",
            opacity: opReddit,
            transform: `scale(${interpolate(sReddit, [0, 1], [0.94, 1])})`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "#FF4500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 900,
                boxShadow: "0 10px 25px rgba(255, 69, 0, 0.35)",
              }}
            >
              ●
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A" }}>
              Heard on Reddit
            </div>
          </div>

          <div style={{ width: 920, display: "flex", flexDirection: "column", gap: 20 }}>
            {props.redditComments.slice(0, 3).map((comment, i) => {
              const cardSpring = spring({ frame: frame - 540 - i * 10, fps, config: { damping: 14, stiffness: 180 } });
              const rot = comment.rotation ? comment.rotation * 0.7 : 0;
              const translateY = interpolate(cardSpring, [0, 1], [60, 0]);

              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 24,
                    padding: "28px 36px",
                    boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.05)",
                    transform: `translateY(${translateY}px) rotate(${rot}deg)`,
                    opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#475569" }}>
                        {comment.author.slice(0, 1).toUpperCase()}
                      </div>
                      <span style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>u/{comment.author}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#FF4500", backgroundColor: "#FFF1EB", padding: "3px 10px", borderRadius: 10 }}>
                        {comment.subreddit}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#FF4500", fontSize: 16, fontWeight: 800 }}>
                      <span>▲</span>
                      <span>{comment.upvotes}</span>
                    </div>
                  </div>

                  <div style={{ fontSize: 19, lineHeight: 1.5, color: "#334155" }}>
                    "{comment.text}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 5: OUTRO & CALL TO ACTION (24-27s)                       */}
      {/* ============================================================== */}
      {frame >= 715 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 50px",
            textAlign: "center",
            opacity: opOutro,
            transform: `scale(${interpolate(sOutro, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 34,
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 44,
            }}
          >
            <div style={{ width: 74, height: 24, borderRadius: 12, backgroundColor: props.accentColor, boxShadow: `0 0 24px ${props.accentColor}` }} />
          </div>

          <div style={{ fontSize: 62, fontWeight: 900, letterSpacing: "-0.04em", color: "#0F172A", marginBottom: 18, lineHeight: 1.15 }}>
            Ready to upgrade your desktop?
          </div>

          <div style={{ fontSize: 26, fontWeight: 500, color: "#64748B", marginBottom: 48 }}>
            Free, open-source, and lightweight.
          </div>

          <div
            style={{
              padding: "22px 56px",
              borderRadius: 44,
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 800,
              boxShadow: "0 25px 50px -10px rgba(15, 23, 42, 0.4)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 24,
            }}
          >
            <span>★</span>
            <span>{props.ctaText}</span>
          </div>

          <div style={{ fontSize: 19, fontWeight: 700, color: "#64748B" }}>
            {props.ctaUrl}
          </div>
        </div>
      )}
    </div>
  );
};
