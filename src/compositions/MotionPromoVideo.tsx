import React from "react";
import { Sequence, Audio, staticFile, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ProductConfig } from "../types/product";
import { Mascot } from "../components/Mascot";
import { DitherIcon } from "../components/DitherIcon";

export interface MotionPromoVideoProps {
  config: ProductConfig;
}

export const MotionPromoVideo: React.FC<MotionPromoVideoProps> = ({ config }) => {
  const accent = config.colors.accent || "#2563EB";

  return (
    <div style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <Audio src={staticFile("music.mp3")} />

      {/* 01: 0–2s (frames 0–60, 4 beats): Hook */}
      <Sequence from={0} durationInFrames={60}>
        <SceneHook config={config} accent={accent} />
      </Sequence>

      {/* 02: 2–5s (frames 60–150, 6 beats): Features */}
      <Sequence from={60} durationInFrames={90}>
        <SceneFeatures config={config} accent={accent} />
      </Sequence>

      {/* 03: 5–8s (frames 150–240, 6 beats): Product Mockup */}
      <Sequence from={150} durationInFrames={90}>
        <SceneProduct config={config} accent={accent} />
      </Sequence>

      {/* 04: 8–11s (frames 240–330, 6 beats): System Grid */}
      <Sequence from={240} durationInFrames={90}>
        <SceneSystem config={config} accent={accent} />
      </Sequence>

      {/* 05: 11–13s (frames 330–390, 4 beats): Phrase */}
      <Sequence from={330} durationInFrames={60}>
        <ScenePhrase config={config} accent={accent} />
      </Sequence>

      {/* 06: 13–15s (frames 390–450, 4 beats): Outro */}
      <Sequence from={390} durationInFrames={60}>
        <SceneOutro config={config} accent={accent} />
      </Sequence>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 1: Hook
// -------------------------------------------------------------
const SceneHook: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mascotSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 180 },
  });
  const mascotX = interpolate(mascotSpring, [0, 1], [650, 0]);

  const framesPart = String(frame % 30).padStart(2, "0");
  const secondsPart = String(Math.floor(frame / 30)).padStart(2, "0");
  const timecode = `00:00:${secondsPart}:${framesPart}`;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#FFFFFF",
        color: "#0A0A0A",
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: 24,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0A0A0A", paddingBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase", backgroundColor: "#0A0A0A", color: "#FFFFFF", padding: "6px 14px", borderRadius: 6 }}>
            {config.hook.label || "// 01 – HOOK"}
          </span>
          <span style={{ fontSize: 28, fontWeight: 700 }}>{config.name}</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 26, fontWeight: 700, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#DC2626", display: "inline-block", opacity: frame % 16 < 8 ? 1 : 0.2 }} />
          <span>REC [TC {timecode}]</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1 }}>
        <div style={{ maxWidth: 1100 }}>
          <div style={{ fontSize: 22, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: accent, marginBottom: 20 }}>
            {config.audience}
          </div>
          <div style={{ fontSize: 82, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", display: "flex", flexWrap: "wrap", gap: "18px 24px" }}>
            {config.hook.words.map((w, idx) => {
              const wordSpring = spring({ frame: frame - idx * 6, fps, config: { damping: 15, mass: 0.6, stiffness: 220 } });
              const translateY = interpolate(wordSpring, [0, 1], [80, 0]);
              const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
              const isAccent = idx >= config.hook.words.length - 2;
              return (
                <span key={idx} style={{ display: "inline-block", transform: `translateY(${translateY}px)`, opacity, color: isAccent ? accent : "#0A0A0A" }}>
                  {w}
                </span>
              );
            })}
          </div>
        </div>

        <div style={{ transform: `translateX(${mascotX}px)`, marginRight: 40 }}>
          <Mascot size={340} mood="smile" accentColor={accent} />
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 18, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600, color: "#4B5563" }}>
        <span>PRODUCT: {config.name.toUpperCase()}</span>
        <span>{config.hook.taglineBottom || "ENGINE POWERED BY RANUK MOTION FORGE"}</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 2: Features
// -------------------------------------------------------------
const SceneFeatures: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const f1 = config.features[0] || { tag: "// FEATURE 01", name: "Core Speed", benefit: "Zero latency runtime", metricLabel: "LATENCY", metricValue: "0ms", iconType: "database" };
  const f2 = config.features[1] || { tag: "// FEATURE 02", name: "Interactive UI", benefit: "Reactive micro-frontends", metricLabel: "FPS", metricValue: "60 FPS", iconType: "chart" };

  const c1Spring = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 180 } });
  const c1Y = interpolate(c1Spring, [0, 1], [300, 0]);
  const c1Rot = interpolate(c1Spring, [0, 1], [-4, -1]);

  const c2Spring = spring({ frame: frame - 25, fps, config: { damping: 13, mass: 0.8, stiffness: 190 } });
  const c2Y = interpolate(c2Spring, [0, 1], [350, 0]);
  const c2Rot = interpolate(c2Spring, [0, 1], [5, 1.5]);

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: accent, color: "#FFFFFF", fontFamily: 'Inter, system-ui, sans-serif', padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid rgba(255,255,255,0.3)", paddingBottom: 24 }}>
        <span style={{ fontSize: 24, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", backgroundColor: "#FFFFFF", color: accent, padding: "6px 14px", borderRadius: 6 }}>
          // 02 – CORE CAPABILITIES
        </span>
        <span style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF" }}>{config.name.toUpperCase()} STACK</span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Card 1 */}
        <div style={{ width: 620, backgroundColor: "#FFFFFF", color: "#0A0A0A", borderRadius: 24, padding: "44px 56px", boxShadow: "0 30px 60px rgba(0,0,0,0.3)", border: "4px solid #0A0A0A", transform: `translateY(${c1Y - 70}px) rotate(${c1Rot}deg)`, position: "absolute", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <DitherIcon type={f1.iconType as any} size={84} accent={accent} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: accent, textTransform: "uppercase", marginBottom: 6 }}>{f1.tag}</div>
              <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>{f1.name}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#4B5563" }}>{f1.benefit}</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#F3F4F6", border: "2px solid #E5E7EB", borderRadius: 14, padding: "16px 28px", textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#6B7280" }}>{f1.metricLabel}</div>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#16A34A" }}>{f1.metricValue}</div>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ width: 1120, backgroundColor: "#FFFFFF", color: "#0A0A0A", borderRadius: 24, padding: "44px 56px", boxShadow: "0 35px 70px rgba(0,0,0,0.35)", border: "4px solid #0A0A0A", transform: `translateY(${c2Y + 80}px) rotate(${c2Rot}deg)`, position: "absolute", zIndex: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <DitherIcon type={f2.iconType as any} size={84} accent={accent} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: accent, textTransform: "uppercase", marginBottom: 6 }}>{f2.tag}</div>
              <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 6 }}>{f2.name}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "#4B5563" }}>{f2.benefit}</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#EFF6FF", border: "2px solid #BFDBFE", borderRadius: 14, padding: "16px 28px", textAlign: "right" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1E40AF" }}>{f2.metricLabel}</div>
            <div style={{ fontSize: 38, fontWeight: 900, color: accent }}>{f2.metricValue}</div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "2px solid rgba(255,255,255,0.3)", paddingTop: 18, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
        <span>FEATURE SUITE VERIFIED</span>
        <span>PRODUCTION GRADE ARCHITECTURE</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 3: Product
// -------------------------------------------------------------
const SceneProduct: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textSpring = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 180 } });
  const textY = interpolate(textSpring, [0, 1], [50, 0]);

  const uiSpring = spring({ frame: frame - 10, fps, config: { damping: 15, mass: 0.9, stiffness: 170 } });
  const uiX = interpolate(uiSpring, [0, 1], [300, 0]);

  const barProgress = spring({ frame: frame - 18, fps, config: { damping: 12, mass: 0.7, stiffness: 160 } });

  const ps = config.productShowcase;
  const kpis = ps.mockup.kpis || [];
  const bars = ps.mockup.chart?.bars || [
    { label: "Alpha", value: 120 },
    { label: "Beta", value: 85 },
    { label: "Gamma", value: 105 },
    { label: "Delta", value: 75 },
    { label: "Omega", value: 115 },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#FFFFFF", color: "#0A0A0A", fontFamily: 'Inter, system-ui, sans-serif', padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0A0A0A", paddingBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase", backgroundColor: "#0A0A0A", color: "#FFFFFF", padding: "6px 14px", borderRadius: 6 }}>
            // 03 – PRODUCT
          </span>
          <span style={{ fontSize: 28, fontWeight: 700 }}>LIVE DEMO</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: accent }}>● ACTIVE ENGINE</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, gap: 60 }}>
        <div style={{ flex: 1, transform: `translateY(${textY}px)` }}>
          <div style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#4B5563", marginBottom: 16 }}>
            {config.tagline}
          </div>
          <div style={{ fontSize: 68, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 32 }}>
            {ps.headlinePrefix}{" "}
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: "italic", fontWeight: 700, color: accent }}>
              {ps.headlineHighlight}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 24, fontWeight: 600, color: "#374151" }}>
            {ps.bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ color: accent, fontSize: 28 }}>✓</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup Window */}
        <div style={{ width: 820, transform: `translateX(${uiX}px)`, backgroundColor: "#171717", borderRadius: 20, border: "3px solid #0A0A0A", boxShadow: "0 30px 60px rgba(0,0,0,0.25)", overflow: "hidden", color: "#FFFFFF" }}>
          <div style={{ backgroundColor: "#262626", padding: "14px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #404040" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ fontSize: 16, fontWeight: 700, marginLeft: 12, color: "#E5E7EB" }}>{ps.mockup.windowTitle}</span>
            </div>
            <div style={{ backgroundColor: accent, fontSize: 14, fontWeight: 800, padding: "6px 14px", borderRadius: 8 }}>
              {ps.mockup.actionBtnText}
            </div>
          </div>

          <div style={{ padding: 26 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${kpis.length || 3}, 1fr)`, gap: 14, marginBottom: 20 }}>
              {kpis.map((k, i) => (
                <div key={i} style={{ backgroundColor: "#262626", padding: 16, borderRadius: 12, border: "1px solid #404040" }}>
                  <div style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 600 }}>{k.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: k.color || "#FFFFFF" }}>{k.value}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{k.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: "#262626", borderRadius: 14, padding: "20px 24px", border: "1px solid #404040" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 14, color: "#9CA3AF" }}>
                <span>{ps.mockup.chart?.title || "Live Performance"}</span>
                <span style={{ color: accent, fontWeight: 700 }}>{ps.mockup.chart?.badge || "Sync 0ms"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", height: 140, gap: 24, paddingBottom: 10, borderBottom: "1px solid #525252" }}>
                {bars.map((item, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <div style={{ width: "100%", height: item.value * barProgress, backgroundColor: accent, borderRadius: "6px 6px 0 0" }} />
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 18, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600, color: "#4B5563" }}>
        <span>NATIVE RUNTIME INTEGRATION</span>
        <span>VERIFIED UX MOCKUP</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 4: System Grid
// -------------------------------------------------------------
const SceneSystem: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cards = config.systemPipeline || [
    { step: "// 01 · INGEST", title: "Data Pipeline", metric: "1,248 items", sub: "Auto-parsed in memory" },
    { step: "// 02 · EXECUTION", title: "Execution Engine", metric: "3.2 ms", sub: "Zero server cost" },
    { step: "// 03 · VISUALS", title: "Dynamic Render", metric: "60 FPS", sub: "Interactive interface" },
    { step: "// 04 · DELIVERABLE", title: "Export Package", metric: "100% READY", sub: "Instant download" },
  ];

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#FFFFFF", color: "#0A0A0A", fontFamily: 'Inter, system-ui, sans-serif', padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0A0A0A", paddingBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 26, fontWeight: 800, textTransform: "uppercase", backgroundColor: "#0A0A0A", color: "#FFFFFF", padding: "6px 14px", borderRadius: 6 }}>
            // 04 – SYSTEM ARCHITECTURE
          </span>
          <span style={{ fontSize: 28, fontWeight: 700 }}>REAL-TIME PIPELINE</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: "#16A34A" }}>● ZERO LATENCY</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, flex: 1, margin: "40px 0" }}>
        {cards.map((c, i) => {
          const done = frame >= i * 22;
          const cardSpring = spring({ frame: frame - i * 6, fps, config: { damping: 14, mass: 0.8, stiffness: 200 } });
          const translateY = interpolate(cardSpring, [0, 1], [30, 0]);

          return (
            <div key={i} style={{ backgroundColor: "#F9FAFB", border: "3px solid #0A0A0A", borderRadius: 20, padding: "36px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between", transform: `translateY(${translateY}px)` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: accent, letterSpacing: "0.08em" }}>{c.step}</span>
                <span style={{ backgroundColor: done ? "#0A0A0A" : "#E5E7EB", color: done ? "#FFFFFF" : "#6B7280", fontWeight: 800, fontSize: 14, padding: "4px 12px", borderRadius: 999 }}>
                  {done ? "✓ COMPLETE" : "RUNNING"}
                </span>
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#4B5563", marginBottom: 6 }}>{c.title}</div>
                <div style={{ fontSize: 52, fontWeight: 900, color: "#0A0A0A", fontFamily: "monospace" }}>{c.metric}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#6B7280", borderTop: "1px solid #E5E7EB", paddingTop: 14 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 18, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600, color: "#4B5563" }}>
        <span>AUTOMATED END-TO-END VERIFICATION</span>
        <span>BENCHMARK GRADE PERFORMANCE</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 5: Phrase
// -------------------------------------------------------------
const ScenePhrase: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const l1Spring = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 200 } });
  const l1Y = interpolate(l1Spring, [0, 1], [40, 0]);

  const l2Spring = spring({ frame: frame - 15, fps, config: { damping: 14, mass: 0.8, stiffness: 200 } });
  const l2Y = interpolate(l2Spring, [0, 1], [40, 0]);

  const mascotSpring = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.7, stiffness: 180 } });
  const mascotScale = interpolate(mascotSpring, [0, 1], [0.8, 1]);

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#0A0A0A", color: "#FFFFFF", fontFamily: 'Inter, system-ui, sans-serif', padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #262626", paddingBottom: 24 }}>
        <span style={{ fontSize: 24, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", backgroundColor: accent, color: "#FFFFFF", padding: "6px 14px", borderRadius: 6 }}>
          // 05 – MISSION
        </span>
        <span style={{ fontSize: 26, fontWeight: 700, color: "#9CA3AF" }}>END-TO-END AUTOMATION</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: 1, padding: "0 40px" }}>
        <div style={{ maxWidth: 1100 }}>
          <div style={{ fontSize: 98, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", transform: `translateY(${l1Y}px)`, marginBottom: 16, color: "#9CA3AF" }}>
            {config.mission.line1}
          </div>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", transform: `translateY(${l2Y}px)`, color: "#FFFFFF" }}>
            {config.mission.line2Prefix}{" "}
            <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: "italic", color: accent }}>
              {config.mission.line2Highlight}
            </span>
          </div>
        </div>

        <div style={{ transform: `scale(${mascotScale})`, marginRight: 60 }}>
          <Mascot size={360} mood="wink" invert={true} accentColor={accent} />
        </div>
      </div>

      <div style={{ borderTop: "2px solid #262626", paddingTop: 18, display: "flex", justifyContent: "space-between", fontSize: 20, fontWeight: 600, color: "#9CA3AF" }}>
        <span>RANUK IT SOLUTIONS · AUTOMATED INTELLIGENCE</span>
        <span>NEXT-GEN DEV ECOSYSTEM</span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// Scene 6: Outro
// -------------------------------------------------------------
const SceneOutro: React.FC<{ config: ProductConfig; accent: string }> = ({ config, accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({ frame, fps, config: { damping: 14, mass: 0.8, stiffness: 190 } });
  const translateY = interpolate(enterSpring, [0, 1], [50, 0]);
  const btnPulse = Math.sin(frame * 0.15) * 2;

  return (
    <div style={{ width: 1080, height: 1920, backgroundColor: "#FFFFFF", color: "#0A0A0A", fontFamily: 'Inter, system-ui, sans-serif', padding: 24, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", textAlign: "center", overflow: "hidden" }}>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0A0A0A", paddingBottom: 20 }}>
        <span style={{ fontSize: 22, fontWeight: 800, textTransform: "uppercase", backgroundColor: "#0A0A0A", color: "#FFFFFF", padding: "6px 14px", borderRadius: 6 }}>
          // 06 – CALL TO ACTION
        </span>
        <span style={{ fontSize: 22, fontWeight: 700, color: accent }}>OFFICIAL RELEASE</span>
      </div>

      <div style={{ transform: `translateY(${translateY}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <Mascot size={190} mood="excited" accentColor={accent} />
        <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: "-0.04em", color: "#0A0A0A", lineHeight: 1 }}>
          {config.outro.wordmark} <span style={{ color: accent }}>{config.outro.wordmarkAccent}</span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 600, color: "#4B5563", maxWidth: 800 }}>
          {config.outro.subtitle}
        </div>
        <div style={{ marginTop: 12, backgroundColor: accent, color: "#FFFFFF", fontSize: 28, fontWeight: 800, padding: "18px 46px", borderRadius: 999, border: "3px solid #0A0A0A", display: "inline-flex", alignItems: "center", gap: 12, transform: `translateY(${btnPulse}px)` }}>
          <span>{config.outro.ctaText}</span>
          <span style={{ fontSize: 32 }}>→</span>
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 32, fontWeight: 800, color: "#0A0A0A", marginTop: 8 }}>
          {config.outro.url}
        </div>
      </div>

      <div style={{ width: "100%", borderTop: "2px solid #0A0A0A", paddingTop: 20, display: "flex", justifyContent: "center", alignItems: "center", fontSize: 22, fontWeight: 700, color: "#374151" }}>
        <span>{config.outro.socialProof}</span>
      </div>
    </div>
  );
};
