import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export interface RedditComment {
  author: string;
  subreddit: string;
  upvotes: number;
  text: string;
  badge?: string;
  rotation?: number;
}

export interface IndieShowcaseProps {
  productName: string;
  tagline: string;
  accentColor: string;
  categoryTag: string;
  iconSvg?: React.ReactNode;
  featureTitle: string;
  featureSubtitle: string;
  settingsItems: Array<{
    label: string;
    type: "toggle" | "slider";
    value?: string;
    sublabel?: string;
    active?: boolean;
  }>;
  specs: Array<{ label: string; value: string }>;
  redditComments: RedditComment[];
  ctaUrl: string;
  ctaText: string;
}

export const defaultDynamicIslandProps: IndieShowcaseProps = {
  productName: "Dynamic Island",
  tagline: "A floating HUD for Windows 10 & 11.",
  accentColor: "#38BDF8",
  categoryTag: "WINDOWS DESKTOP UTILITY",
  featureTitle: "Expandable Media & Widget Pill",
  featureSubtitle: "Live Spotify, SMTC media controls, and timers right at the top of your screen.",
  settingsItems: [
    { label: "Launch at Startup", type: "toggle", active: true, sublabel: "Runs silently in background" },
    { label: "Haptic & Animation Smoothing", type: "toggle", active: true, sublabel: "60 FPS native rendering" },
    { label: "Pill Sensitivity & Hover Expand", type: "slider", value: "65%", sublabel: "Instant response on cursor touch" },
    { label: "Per-Monitor DPI Awareness", type: "toggle", active: true, sublabel: "100% to 200% dynamic scaling" },
  ],
  specs: [
    { label: "RAM FOOTPRINT", value: "< 18 MB" },
    { label: "FRAME RATE", value: "60 FPS" },
    { label: "PERMISSIONS", value: "Zero Admin" },
    { label: "LICENSE", value: "Open Source" },
  ],
  redditComments: [
    {
      author: "Lopsided-Yam-503",
      subreddit: "r/SideProject",
      upvotes: 142,
      text: "That's seriously slick. The per-monitor DPI handling is what grabbed me, windows scaling gets so janky.",
      rotation: -2,
    },
    {
      author: "Obiwayneone",
      subreddit: "r/Python",
      upvotes: 98,
      text: "Instabuy! Skipping Electron and using native Win32 ctypes keeps it under 18 MB RAM. Silky smooth.",
      rotation: 1.5,
    },
    {
      author: "investigatormaker",
      subreddit: "r/devsarg",
      upvotes: 115,
      text: "El hook con ctypes y SMTC para detectar Spotify sin permisos raros está impecable. Felicitaciones!",
      rotation: -1.2,
    },
    {
      author: "QuanTradin",
      subreddit: "r/selfhosted",
      upvotes: 164,
      text: "Replaced 3 bloated desktop utilities with this single one. Zero telemetry and 100% local.",
      rotation: 2.1,
    },
  ],
  ctaUrl: "github.com/RanuK12/dynamic-island-win",
  ctaText: "Star & Clone on GitHub",
};

export const IndieProductShowcase: React.FC<{ customProps?: Partial<IndieShowcaseProps> }> = ({ customProps }) => {
  const props = { ...defaultDynamicIslandProps, ...customProps };
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 27s @ 30fps = 810 frames
  // Scene 1: Hook & App Identity (0-90f, 0-3.0s)
  // Scene 2: Interactive Feature Action (90-330f, 3.0-11.0s)
  // Scene 3: Native Settings / Control Panel (330-540f, 11.0-18.0s)
  // Scene 4: "Heard on Reddit" Social Proof (540-720f, 18.0-24.0s)
  // Scene 5: Outro & Call to Action (720-810f, 24.0-27.0s)

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

  // Animated Pill expansion for Dynamic Island in Scene 2
  const pillWidth = interpolate(frame, [110, 170, 260, 310], [280, 680, 680, 280], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pillHeight = interpolate(frame, [110, 170, 260, 310], [44, 160, 160, 44], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const waveformPhase = (frame * 12) % 360;

  // Animated slider in Settings (Scene 3)
  const sliderWidthPct = interpolate(frame, [380, 470], [20, 65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.8} />

      {/* Subtle Apple-style clean background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 25%, #FFFFFF 0%, #F1F5F9 70%, #E2E8F0 100%)",
        }}
      />

      {/* ============================================================== */}
      {/* SCENE 1: HOOK & APP IDENTITY (0-3s)                           */}
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
            opacity: opHook,
            transform: `scale(${interpolate(sHook, [0, 1], [0.92, 1])})`,
          }}
        >
          {/* App Icon Container */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 32,
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 36,
            }}
          >
            {/* Minimalist Island Icon SVG */}
            <div
              style={{
                width: 76,
                height: 24,
                borderRadius: 12,
                backgroundColor: props.accentColor,
                boxShadow: `0 0 24px ${props.accentColor}80`,
              }}
            />
          </div>

          {/* Product Category Tag */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#64748B",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            {props.categoryTag}
          </div>

          {/* Product Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0F172A",
              marginBottom: 16,
            }}
          >
            {props.productName}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              color: "#64748B",
              letterSpacing: "-0.01em",
            }}
          >
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
            opacity: opFeature,
            transform: `scale(${interpolate(sFeature, [0, 1], [0.94, 1])})`,
          }}
        >
          {/* Header context */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 12 }}>
              {props.featureTitle}
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#64748B", maxWidth: 780 }}>
              {props.featureSubtitle}
            </div>
          </div>

          {/* Desktop Monitor Screen Frame Mockup */}
          <div
            style={{
              width: 1180,
              height: 580,
              borderRadius: 24,
              backgroundColor: "#0F172A",
              boxShadow: "0 35px 70px -15px rgba(15, 23, 42, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Desktop Wallpaper preview */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #090D16 0%, #111827 50%, #1E1B4B 100%)",
              }}
            />

            {/* Glowing top screen edge */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 2,
                background: `linear-gradient(90deg, transparent, ${props.accentColor}, transparent)`,
                filter: "blur(1px)",
              }}
            />

            {/* The Dynamic Island Floating Pill */}
            <div
              style={{
                position: "absolute",
                top: 24,
                width: pillWidth,
                height: pillHeight,
                borderRadius: pillHeight / 2,
                backgroundColor: "#000000",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.12) inset",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 20px",
                transition: "width 0.1s ease, height 0.1s ease",
                overflow: "hidden",
              }}
            >
              {/* Left element: Album art or Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #1DB954 0%, #191414 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: 16 }}>🎵</span>
                </div>
                {pillWidth > 400 && (
                  <div>
                    <div style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
                      Starboy — Daft Punk
                    </div>
                    <div style={{ color: "#94A3B8", fontSize: 13, fontWeight: 500 }}>
                      Spotify SMTC · Native Win32 Hook
                    </div>
                  </div>
                )}
              </div>

              {/* Right element: Waveform animation */}
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[14, 24, 32, 18, 28, 12].map((h, i) => {
                  const animH = Math.max(6, Math.sin((waveformPhase + i * 40) * (Math.PI / 180)) * h);
                  return (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: pillWidth > 400 ? animH : 14,
                        borderRadius: 2,
                        backgroundColor: props.accentColor,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom floating telemetry badges on the mock desktop */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                display: "flex",
                gap: 16,
              }}
            >
              {props.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#E2E8F0",
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
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
      {/* SCENE 3: NATIVE SETTINGS & CONTROL PANEL (11-18s)              */}
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
            opacity: opSettings,
            transform: `scale(${interpolate(sSettings, [0, 1], [0.94, 1])})`,
          }}
        >
          {/* Section title */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 10 }}>
              Tailored to Your Workflow
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#64748B" }}>
              Granular settings. Instant haptics. Zero background CPU usage.
            </div>
          </div>

          {/* Native Popover Settings Card */}
          <div
            style={{
              width: 740,
              borderRadius: 24,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 30px 60px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.06)",
              padding: "36px 44px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Popover Title Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: props.accentColor }} />
                <span style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>{props.productName} Preferences</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981", backgroundColor: "#ECFDF5", padding: "4px 10px", borderRadius: 12 }}>
                v1.2 Active
              </span>
            </div>

            {/* Settings Items */}
            {props.settingsItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                }}
              >
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: "#1E293B" }}>{item.label}</div>
                  {item.sublabel && <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{item.sublabel}</div>}
                </div>

                {item.type === "toggle" ? (
                  /* Apple-style Toggle Switch */
                  <div
                    style={{
                      width: 52,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: item.active ? "#10B981" : "#CBD5E1",
                      padding: 2,
                      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: item.active ? "flex-end" : "flex-start",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      }}
                    />
                  </div>
                ) : (
                  /* Custom Slider */
                  <div style={{ width: 220, display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#E2E8F0",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${sliderWidthPct}%`,
                          height: "100%",
                          backgroundColor: props.accentColor,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", width: 40 }}>
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
            opacity: opReddit,
            transform: `scale(${interpolate(sReddit, [0, 1], [0.94, 1])})`,
          }}
        >
          {/* Header with Reddit Logo & Trophy */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            {/* Orange Reddit Icon */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: "#FF4500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: 26,
                fontWeight: 900,
                boxShadow: "0 10px 25px rgba(255, 69, 0, 0.3)",
              }}
            >
              ●
            </div>
            <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A" }}>
              Heard on Reddit
            </div>
          </div>

          {/* Staggered Floating Reddit Comment Cards */}
          <div
            style={{
              width: 1280,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {props.redditComments.map((comment, i) => {
              const cardSpring = spring({
                frame: frame - 540 - i * 8,
                fps,
                config: { damping: 14, stiffness: 180 },
              });
              const rot = comment.rotation || 0;
              const translateY = interpolate(cardSpring, [0, 1], [60, 0]);

              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 20,
                    padding: "26px 32px",
                    boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.05)",
                    transform: `translateY(${translateY}px) rotate(${rot}deg)`,
                    opacity: interpolate(cardSpring, [0, 1], [0, 1]),
                  }}
                >
                  {/* Card Header: User, Subreddit, Upvotes */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: "#E2E8F0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#475569",
                        }}
                      >
                        {comment.author.slice(0, 1).toUpperCase()}
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
                        u/{comment.author}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#FF4500", backgroundColor: "#FFF1EB", padding: "2px 8px", borderRadius: 8 }}>
                        {comment.subreddit}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#FF4500", fontSize: 14, fontWeight: 700 }}>
                      <span>▲</span>
                      <span>{comment.upvotes}</span>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <div style={{ fontSize: 17, lineHeight: 1.5, color: "#334155", fontWeight: 400 }}>
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
            opacity: opOutro,
            transform: `scale(${interpolate(sOutro, [0, 1], [0.92, 1])})`,
          }}
        >
          {/* Logo Pill */}
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 26,
              background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
              boxShadow: "0 20px 45px -10px rgba(15, 23, 42, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                width: 54,
                height: 18,
                borderRadius: 9,
                backgroundColor: props.accentColor,
                boxShadow: `0 0 20px ${props.accentColor}`,
              }}
            />
          </div>

          <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.04em", color: "#0F172A", marginBottom: 14 }}>
            Ready to upgrade your desktop?
          </div>

          <div style={{ fontSize: 24, fontWeight: 500, color: "#64748B", marginBottom: 36 }}>
            Free, open-source, and lightweight.
          </div>

          {/* Action CTA Button */}
          <div
            style={{
              padding: "18px 48px",
              borderRadius: 40,
              backgroundColor: "#0F172A",
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: 700,
              boxShadow: "0 20px 40px -10px rgba(15, 23, 42, 0.35)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <span>★</span>
            <span>{props.ctaText}</span>
          </div>

          {/* Direct URL */}
          <div style={{ fontSize: 16, fontWeight: 600, color: "#64748B", letterSpacing: "0.02em" }}>
            {props.ctaUrl}
          </div>
        </div>
      )}
    </div>
  );
};
