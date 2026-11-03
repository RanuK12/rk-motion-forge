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
  tagline: "A fluid, floating HUD for Windows 10 & 11.",
  accentColor: "#38BDF8",
  categoryTag: "WINDOWS DESKTOP UTILITY",
  featureTitle: "Expandable Media & Widget Pill",
  featureSubtitle: "Live Spotify SMTC media, Pomodoro timer & system alerts at the top of your screen.",
  settingsItems: [
    { label: "Launch at Windows Startup", type: "toggle", active: true, sublabel: "Runs silently with zero window focus theft" },
    { label: "Hardware-Accelerated 60 FPS", type: "toggle", active: true, sublabel: "Smooth CustomTkinter spring interpolation" },
    { label: "Pill Sensitivity & Expansion", type: "slider", value: "75%", sublabel: "Instant response on cursor hover or hotkey" },
    { label: "Per-Monitor DPI Scaling", type: "toggle", active: true, sublabel: "Native crisp rendering from 100% to 200% DPI" },
  ],
  specs: [
    { label: "RAM FOOTPRINT", value: "< 18 MB" },
    { label: "FRAME RATE", value: "60 FPS" },
    { label: "PERMISSIONS", value: "Zero Admin" },
    { label: "RUNTIME", value: "Pure Python" },
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
  // Scene 1: Hook & Identity (0-90f, 0-3.0s)
  // Scene 2: Realistic Windows 11 Desktop with Live Fluid Island (90-330f, 3.0-11.0s)
  // Scene 3: Windows 11 Fluent Settings Panel (330-540f, 11.0-18.0s)
  // Scene 4: "Heard on Reddit" Social Proof (540-720f, 18.0-24.0s)
  // Scene 5: Outro & GitHub Call to Action (720-810f, 24.0-27.0s)

  const sHook = spring({ frame, fps, config: { damping: 15, stiffness: 180 } });
  const sFeature = spring({ frame: frame - 90, fps, config: { damping: 16, stiffness: 170 } });
  const sSettings = spring({ frame: frame - 330, fps, config: { damping: 16, stiffness: 180 } });
  const sReddit = spring({ frame: frame - 540, fps, config: { damping: 14, stiffness: 190 } });
  const sOutro = spring({ frame: frame - 720, fps, config: { damping: 15, stiffness: 200 } });

  // Transitions
  const opHook = interpolate(frame, [0, 20, 80, 95], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opFeature = interpolate(frame, [90, 110, 315, 335], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opSettings = interpolate(frame, [330, 350, 525, 545], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opReddit = interpolate(frame, [540, 560, 705, 725], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opOutro = interpolate(frame, [720, 740, 810], [0, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 2 Expansion Dynamics (Compact Pill -> Expands to Spotify -> Switches to Pomodoro)
  const isExpanded = frame >= 140 && frame < 305;
  const isPomodoro = frame >= 225 && frame < 305;

  const expandSpring = spring({
    frame: frame - 140,
    fps,
    config: { damping: 15, stiffness: 160 },
  });

  const currentPillWidth = interpolate(expandSpring, [0, 1], [320, 740], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentPillHeight = interpolate(expandSpring, [0, 1], [46, 175], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Waveform animation
  const waveformPhase = (frame * 14) % 360;

  // Settings slider animation
  const sliderWidthPct = interpolate(frame, [380, 480], [25, 75], {
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
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable', 'Segoe UI', 'Inter', system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.8} />

      {/* Subtle modern Apple/Minimalist background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 25%, #FFFFFF 0%, #F1F5F9 70%, #E2E8F0 100%)",
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
            opacity: opHook,
            transform: `scale(${interpolate(sHook, [0, 1], [0.92, 1])})`,
          }}
        >
          {/* Windows-styled Dynamic Island Icon */}
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 36,
              background: "linear-gradient(135deg, #0B0F19 0%, #1A2234 100%)",
              boxShadow: "0 30px 60px -15px rgba(11, 15, 25, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.12) inset",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 36,
              position: "relative",
            }}
          >
            {/* Illuminated glowing pill */}
            <div
              style={{
                width: 82,
                height: 26,
                borderRadius: 13,
                backgroundColor: props.accentColor,
                boxShadow: `0 0 30px ${props.accentColor}`,
              }}
            />
          </div>

          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: "0.22em",
              color: "#64748B",
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            {props.categoryTag}
          </div>

          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "#0F172A",
              marginBottom: 18,
            }}
          >
            {props.productName}
          </div>

          <div
            style={{
              fontSize: 30,
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
      {/* SCENE 2: REALISTIC WINDOWS 11 DESKTOP & FLUID ISLAND (3-11s)   */}
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
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 10 }}>
              {props.featureTitle}
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#64748B", maxWidth: 840 }}>
              {props.featureSubtitle}
            </div>
          </div>

          {/* Windows 11 PC Monitor Frame Mockup */}
          <div
            style={{
              width: 1240,
              height: 640,
              borderRadius: 24,
              backgroundColor: "#0B0E14",
              boxShadow: "0 35px 80px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Windows 11 Bloom Dark Wallpaper */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(1200px 600px at 50% 120%, #1E3A8A 0%, #0F172A 50%, #020617 100%)",
              }}
            />

            {/* Bloom Flowing Gradient Light */}
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "30%",
                width: 500,
                height: 400,
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(99, 102, 241, 0.1) 40%, transparent 70%)",
                filter: "blur(50px)",
              }}
            />

            {/* SCREEN TOP BEZEL / ISLAND ANCHOR */}
            <div
              style={{
                position: "relative",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: 18,
                zIndex: 10,
              }}
            >
              {/* THE FLUID DYNAMIC ISLAND PILL */}
              <div
                style={{
                  width: currentPillWidth,
                  height: currentPillHeight,
                  borderRadius: currentPillHeight > 100 ? 32 : currentPillHeight / 2,
                  backgroundColor: "#000000",
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.14) inset",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: currentPillHeight > 100 ? "space-between" : "center",
                  padding: currentPillHeight > 100 ? "20px 26px" : "0 22px",
                  overflow: "hidden",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                }}
              >
                {/* COMPACT VIEW (Frame < 140) */}
                {!isExpanded && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#10B981", boxShadow: "0 0 10px #10B981" }} />
                      <span style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em" }}>
                        🎵 Starboy — Daft Punk
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      {[12, 20, 26, 16, 22, 10].map((h, i) => {
                        const animH = Math.max(5, Math.sin((waveformPhase + i * 45) * (Math.PI / 180)) * h);
                        return (
                          <div
                            key={i}
                            style={{
                              width: 3,
                              height: animH,
                              borderRadius: 1.5,
                              backgroundColor: props.accentColor,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EXPANDED VIEW 1: SPOTIFY RICH MEDIA (Frame 140 - 225) */}
                {isExpanded && !isPomodoro && (
                  <>
                    {/* Top subheader inside pill */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#1DB954", boxShadow: "0 0 12px #1DB954" }} />
                        <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          Spotify SMTC · Native Win32
                        </span>
                      </div>
                      <span style={{ color: "#64748B", fontSize: 12, fontWeight: 600 }}>02:14 / 03:50</span>
                    </div>

                    {/* Middle: Album Art + Meta + Waveform */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {/* High-def Album Art representation */}
                        <div
                          style={{
                            width: 68,
                            height: 68,
                            borderRadius: 14,
                            background: "linear-gradient(135deg, #EF4444 0%, #7C3AED 50%, #06B6D4 100%)",
                            boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontSize: 28,
                          }}
                        >
                          ⚡
                        </div>
                        <div>
                          <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>
                            Starboy
                          </div>
                          <div style={{ color: "#94A3B8", fontSize: 14, fontWeight: 500, marginTop: 2 }}>
                            The Weeknd ft. Daft Punk
                          </div>
                        </div>
                      </div>

                      {/* Playback Controls & Waveform */}
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        <div style={{ display: "flex", gap: 14, fontSize: 18, color: "#FFFFFF" }}>
                          <span style={{ cursor: "pointer", opacity: 0.8 }}>⏮</span>
                          <span style={{ cursor: "pointer", color: props.accentColor, fontWeight: 900 }}>⏸</span>
                          <span style={{ cursor: "pointer", opacity: 0.8 }}>⏭</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          {[14, 28, 42, 22, 36, 16, 32, 20].map((h, i) => {
                            const animH = Math.max(6, Math.sin((waveformPhase + i * 35) * (Math.PI / 180)) * h);
                            return (
                              <div
                                key={i}
                                style={{
                                  width: 4,
                                  height: animH,
                                  borderRadius: 2,
                                  backgroundColor: props.accentColor,
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Progress Bar */}
                    <div style={{ width: "100%", height: 5, borderRadius: 3, backgroundColor: "#1E293B", overflow: "hidden" }}>
                      <div style={{ width: "58%", height: "100%", backgroundColor: props.accentColor, borderRadius: 3 }} />
                    </div>
                  </>
                )}

                {/* EXPANDED VIEW 2: POMODORO FOCUS WIDGET (Frame 225 - 305) */}
                {isExpanded && isPomodoro && (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: "#38BDF8", boxShadow: "0 0 12px #38BDF8" }} />
                        <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                          Focus Widget · Python Plugin
                        </span>
                      </div>
                      <span style={{ color: "#10B981", fontSize: 13, fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.15)", padding: "2px 8px", borderRadius: 8 }}>
                        Deep Work
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        {/* Circular Timer Ring */}
                        <div style={{ width: 68, height: 68, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg viewBox="0 0 68 68" width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="34" cy="34" r="28" stroke="#1E293B" strokeWidth="5" fill="none" />
                            <circle cx="34" cy="34" r="28" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="44" fill="none" />
                          </svg>
                          <span style={{ position: "absolute", color: "#FFFFFF", fontSize: 15, fontWeight: 800 }}>18:42</span>
                        </div>
                        <div>
                          <div style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 800 }}>Pomodoro Session #3</div>
                          <div style={{ color: "#94A3B8", fontSize: 14, fontWeight: 500, marginTop: 2 }}>25 min focus · 5 min break</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 10 }}>
                        <div style={{ padding: "8px 18px", borderRadius: 12, backgroundColor: "#0284C7", color: "#FFFFFF", fontSize: 14, fontWeight: 700 }}>
                          Pause
                        </div>
                        <div style={{ padding: "8px 18px", borderRadius: 12, backgroundColor: "#1E293B", color: "#94A3B8", fontSize: 14, fontWeight: 600 }}>
                          Reset
                        </div>
                      </div>
                    </div>

                    <div style={{ width: "100%", height: 5, borderRadius: 3, backgroundColor: "#1E293B", overflow: "hidden" }}>
                      <div style={{ width: "75%", height: "100%", backgroundColor: "#38BDF8", borderRadius: 3 }} />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Windows 11 Center Bottom Taskbar */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 52,
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {/* Centered Windows 11 Taskbar Icons */}
              {["⊞", "🔍", "🗂️", "🌐", "⚙️", "💬"].map((icon, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: idx === 0 ? props.accentColor : "#E2E8F0",
                    backgroundColor: idx === 0 ? "rgba(56, 189, 248, 0.12)" : "transparent",
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>

            {/* Telemetry pill specs on desktop */}
            <div
              style={{
                position: "absolute",
                bottom: 68,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 16,
              }}
            >
              {props.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 18,
                    backgroundColor: "rgba(15, 23, 42, 0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#E2E8F0",
                    fontSize: 13,
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
      {/* SCENE 3: NATIVE SETTINGS & PREFERENCES (11-18s)                */}
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
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em", color: "#0F172A", marginBottom: 10 }}>
              Tailored to Your Workflow
            </div>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#64748B" }}>
              Granular settings. Instant haptics. Zero background CPU overhead.
            </div>
          </div>

          {/* Windows 11 Fluent Settings Card */}
          <div
            style={{
              width: 760,
              borderRadius: 24,
              backgroundColor: "#FFFFFF",
              boxShadow: "0 30px 60px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.06)",
              padding: "36px 44px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #F1F5F9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: props.accentColor }} />
                <span style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>{props.productName} Preferences</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981", backgroundColor: "#ECFDF5", padding: "4px 10px", borderRadius: 12 }}>
                v1.2 Active
              </span>
            </div>

            {props.settingsItems.map((item, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: "#1E293B" }}>{item.label}</div>
                  {item.sublabel && <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{item.sublabel}</div>}
                </div>

                {item.type === "toggle" ? (
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
                    }}
                  >
                    <div style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#FFFFFF", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }} />
                  </div>
                ) : (
                  <div style={{ width: 220, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: "#E2E8F0", position: "relative", overflow: "hidden" }}>
                      <div style={{ width: `${sliderWidthPct}%`, height: "100%", backgroundColor: props.accentColor, borderRadius: 4 }} />
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
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
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

          <div style={{ width: 1280, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {props.redditComments.map((comment, i) => {
              const cardSpring = spring({ frame: frame - 540 - i * 8, fps, config: { damping: 14, stiffness: 180 } });
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
                      <span style={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>u/{comment.author}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#FF4500", backgroundColor: "#FFF1EB", padding: "2px 8px", borderRadius: 8 }}>
                        {comment.subreddit}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#FF4500", fontSize: 14, fontWeight: 700 }}>
                      <span>▲</span>
                      <span>{comment.upvotes}</span>
                    </div>
                  </div>

                  <div style={{ fontSize: 17, lineHeight: 1.5, color: "#334155" }}>
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
            <div style={{ width: 54, height: 18, borderRadius: 9, backgroundColor: props.accentColor, boxShadow: `0 0 20px ${props.accentColor}` }} />
          </div>

          <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: "-0.04em", color: "#0F172A", marginBottom: 14 }}>
            Ready to upgrade your desktop?
          </div>

          <div style={{ fontSize: 24, fontWeight: 500, color: "#64748B", marginBottom: 36 }}>
            Free, open-source, and lightweight.
          </div>

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

          <div style={{ fontSize: 16, fontWeight: 600, color: "#64748B", letterSpacing: "0.02em" }}>
            {props.ctaUrl}
          </div>
        </div>
      )}
    </div>
  );
};
