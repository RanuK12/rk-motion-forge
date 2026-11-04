import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Audio,
  staticFile,
} from "remotion";

export const RanukProfitHoloQuantPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color Palette: Deep Obsidian Void, Electric Neon Green, Cyber Cyan, Warning Red
  const BG = "#030712";
  const NEON_GREEN = "#00FF88";
  const CYAN = "#00E5FF";
  const RED = "#FF3366";
  const TEXT_WHITE = "#F9FAFB";
  const CARD_BG = "rgba(7, 16, 32, 0.85)";

  const getSpring = (offset: number, damping = 14, stiffness = 180) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.65, stiffness },
    });
  };

  // Phase Timing:
  // Phase 1: 0 - 95f (0 - 3.2s) -> The Emotion / Latency Agitation Hook
  // Phase 2: 95 - 215f (3.2 - 7.2s) -> 3D Holographic Candlesticks & Live Depth Orderbook
  // Phase 3: 215 - 335f (7.2 - 11.2s) -> Quantitative Proof: 78.4% Win Rate, Sharpe 2.84, <1.5% DD
  // Phase 4: 335 - 450f (11.2 - 15.0s) -> Terminal Climax & Deployment CTA

  const cameraScale = interpolate(
    frame,
    [0, 80, 95, 170, 215, 290, 335, 430],
    [1, 1.04, 1.01, 1.06, 1.02, 1.05, 1.02, 1.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Audio-reactive rhythm pulse emulation (inspired by pdoom-video)
  const beatPulse = 1 + 0.04 * Math.sin(frame * 0.45);

  const hookWords = [
    { text: "STILL", highlight: false },
    { text: "TRADING", highlight: false },
    { text: "WITH", highlight: false },
    { text: "EMOTION", highlight: true, color: RED },
    { text: "AND", highlight: false },
    { text: "500MS", highlight: true, color: RED },
    { text: "LATENCY?", highlight: false },
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
      <Audio src={staticFile("music.mp3")} volume={0.85} />

      {/* ============================================================== */}
      {/* 🌌 BACKGROUND: HOLOGRAPHIC QUANT GRID & AMBIENT AURORA        */}
      {/* ============================================================== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 20%, #062419 0%, #030C16 45%, #02050A 100%)`,
          zIndex: 0,
        }}
      />

      {/* Ambient Neon Glow Spheres */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "25%",
          width: 800,
          height: 500,
          background: `radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)`,
          filter: "blur(70px)",
          transform: `scale(${beatPulse})`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 700,
          height: 500,
          background: `radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* 3D Perspective Ground Grid (Holographic floor) */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          left: "-20%",
          width: "140%",
          height: 600,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 136, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 136, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 40px",
          backgroundPosition: `0px ${(frame * 1.5) % 40}px`,
          transform: "perspective(500px) rotateX(65deg)",
          maskImage: "linear-gradient(to top, black 20%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 95%)",
        }}
      />

      {/* Camera Dynamics Container */}
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
        {/* ⚡ PHASE 1: THE LATENCY & EMOTION HOOK (0 - 95f)               */}
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
            {/* Top Engine Pill */}
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
                    backgroundColor: "rgba(0, 255, 136, 0.12)",
                    border: `1.5px solid ${NEON_GREEN}`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    marginBottom: 36,
                    boxShadow: `0 0 30px rgba(0, 255, 136, 0.35)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>⚡ 📈</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: NEON_GREEN,
                    }}
                  >
                    HIGH-FREQUENCY CRYPTO ALGO ENGINE
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
                const color = word.color || (word.highlight ? NEON_GREEN : TEXT_WHITE);
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

            {/* Tagline Bottom */}
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
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      width: interpolate(frame, [50, 80], [0, 420], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      background: `linear-gradient(to right, transparent, ${NEON_GREEN}, ${CYAN}, transparent)`,
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "rgba(255, 255, 255, 0.9)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    EXECUTE AT THE SPEED OF CODE · ZERO EMOTION
                  </span>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 📊 PHASE 2: 3D CANDLESTICK & LIVE ORDERBOOK DEPTH (95 - 215f)   */}
        {/* ============================================================== */}
        {frame >= 95 && frame < 215 && (
          <div
            style={{
              width: 1600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 50,
            }}
          >
            {/* Left Box: Candlestick Breakout Visualizer */}
            {(() => {
              const chartSpring = getSpring(100);
              const candleCount = 14;

              return (
                <div
                  style={{
                    flex: 1.3,
                    opacity: chartSpring,
                    transform: `translateY(${(1 - chartSpring) * 30}px)`,
                    backgroundColor: CARD_BG,
                    border: `1.5px solid rgba(0, 255, 136, 0.35)`,
                    borderRadius: 20,
                    padding: 32,
                    boxShadow: `0 25px 60px rgba(0,0,0,0.8), 0 0 35px rgba(0, 255, 136, 0.15)`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      paddingBottom: 16,
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: NEON_GREEN,
                          boxShadow: `0 0 12px ${NEON_GREEN}`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 18,
                          fontWeight: 800,
                          color: TEXT_WHITE,
                        }}
                      >
                        BTC / USDT · 1-SECOND WEBSOCKET
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 14,
                        color: NEON_GREEN,
                        fontWeight: 700,
                      }}
                    >
                      TRAILING PROFIT LOCK: +3.84%
                    </div>
                  </div>

                  {/* Candlestick Row Simulation */}
                  <div
                    style={{
                      height: 280,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "20px 0",
                      position: "relative",
                    }}
                  >
                    {/* Trailing stop-loss dotted line */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "38%",
                        left: 0,
                        right: 0,
                        height: 2,
                        borderBottom: `2px dashed ${CYAN}`,
                        opacity: 0.8,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          right: 0,
                          top: -20,
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11,
                          color: CYAN,
                          fontWeight: 800,
                        }}
                      >
                        DYNAMIC TRAILING STOP: $68,240
                      </span>
                    </div>

                    {Array.from({ length: candleCount }).map((_, i) => {
                      const isUp = i > 4; // Bullish breakout
                      const candleSpring = getSpring(105 + i * 4, 12, 190);
                      const baseHeight = 40 + (i * 14) + (isUp ? Math.sin(frame * 0.15 + i) * 15 : 0);
                      const wickHeight = baseHeight + 25;
                      const candleColor = isUp ? NEON_GREEN : RED;

                      return (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            height: "100%",
                            opacity: candleSpring,
                          }}
                        >
                          {/* Upper Wick */}
                          <div
                            style={{
                              width: 2,
                              height: wickHeight,
                              backgroundColor: candleColor,
                              opacity: 0.7,
                            }}
                          />
                          {/* Candle Body */}
                          <div
                            style={{
                              width: "100%",
                              height: baseHeight,
                              backgroundColor: candleColor,
                              borderRadius: 4,
                              boxShadow: isUp ? `0 0 15px ${NEON_GREEN}88` : "none",
                              marginTop: -baseHeight + 10,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Real-time Telemetry Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <span>EXECUTION LATENCY: &lt; 1.8ms</span>
                    <span>SLIPPAGE: 0.00%</span>
                    <span style={{ color: NEON_GREEN }}>100% NON-CUSTODIAL</span>
                  </div>
                </div>
              );
            })()}

            {/* Right Box: Live Depth of Market (DOM) Orderbook */}
            {(() => {
              const domSpring = getSpring(120);
              return (
                <div
                  style={{
                    flex: 0.9,
                    opacity: domSpring,
                    transform: `translateX(${(1 - domSpring) * 35}px)`,
                    backgroundColor: CARD_BG,
                    border: `1.5px solid rgba(0, 229, 255, 0.35)`,
                    borderRadius: 20,
                    padding: 30,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: CYAN,
                      textTransform: "uppercase",
                      marginBottom: 18,
                    }}
                  >
                    // LIVE ORDERBOOK DEPTH STREAM
                  </div>

                  {/* Asks (Red) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                    {[
                      { price: "68,490.50", size: "3.450", pct: 65 },
                      { price: "68,475.00", size: "5.120", pct: 85 },
                      { price: "68,460.20", size: "1.890", pct: 40 },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 13,
                          position: "relative",
                          padding: "6px 8px",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: `${row.pct}%`,
                            backgroundColor: "rgba(255, 51, 102, 0.15)",
                            zIndex: 0,
                          }}
                        />
                        <span style={{ color: RED, fontWeight: 700, zIndex: 1 }}>{row.price}</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", zIndex: 1 }}>{row.size} BTC</span>
                      </div>
                    ))}
                  </div>

                  {/* Spread Indicator */}
                  <div
                    style={{
                      padding: "8px 12px",
                      borderRadius: 8,
                      backgroundColor: "rgba(0, 229, 255, 0.1)",
                      border: `1px solid ${CYAN}44`,
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      fontWeight: 800,
                      color: CYAN,
                      marginBottom: 14,
                    }}
                  >
                    <span>SPREAD: 0.10 USDT</span>
                    <span>TICK RATE: 48,000/s</span>
                  </div>

                  {/* Bids (Green) */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { price: "68,440.00", size: "8.250", pct: 90 },
                      { price: "68,425.80", size: "4.110", pct: 70 },
                      { price: "68,410.00", size: "2.300", pct: 45 },
                    ].map((row, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 13,
                          position: "relative",
                          padding: "6px 8px",
                          borderRadius: 6,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 0,
                            width: `${row.pct}%`,
                            backgroundColor: "rgba(0, 255, 136, 0.15)",
                            zIndex: 0,
                          }}
                        />
                        <span style={{ color: NEON_GREEN, fontWeight: 700, zIndex: 1 }}>{row.price}</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", zIndex: 1 }}>{row.size} BTC</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 🏆 PHASE 3: QUANTITATIVE ALPHA PROOF (215 - 335f)              */}
        {/* ============================================================== */}
        {frame >= 215 && frame < 335 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: 1450,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: CYAN,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // VERIFIED ON-CHAIN & EXCHANGE PERFORMANCE
            </div>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 50,
              }}
            >
              Automated Discipline. Pure Mathematical Alpha.
            </h2>

            {/* 3 Large KPI Hologram Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 40,
                width: "100%",
              }}
            >
              {[
                {
                  from: 40,
                  to: 78.4,
                  decimals: 1,
                  suffix: "%",
                  label: "WIN RATE RATIO",
                  sub: "Last 120 live trading sessions without discretionary bias",
                  color: NEON_GREEN,
                  delay: 220,
                },
                {
                  from: 1.0,
                  to: 2.84,
                  decimals: 2,
                  suffix: "x",
                  label: "SHARPE RATIO",
                  sub: "Market-neutral risk-adjusted returns against benchmark",
                  color: CYAN,
                  delay: 235,
                },
                {
                  from: 5.0,
                  to: 1.45,
                  decimals: 2,
                  prefix: "< ",
                  suffix: "%",
                  label: "MAX DRAWDOWN LOCK",
                  sub: "Strict hard stop-loss circuit breaker triggers instantly",
                  color: "#F59E0B",
                  delay: 250,
                },
              ].map((kpi, idx) => {
                const kSpring = getSpring(kpi.delay, 12, 170);
                const currentVal = interpolate(kSpring, [0, 1], [kpi.from, kpi.to]);

                return (
                  <div
                    key={idx}
                    style={{
                      opacity: kSpring,
                      transform: `translateY(${(1 - kSpring) * 45}px) scale(${0.85 + 0.15 * kSpring})`,
                      backgroundColor: CARD_BG,
                      border: `2px solid ${kpi.color}55`,
                      borderRadius: 24,
                      padding: "40px 30px",
                      boxShadow: `0 20px 50px rgba(0,0,0,0.7), inset 0 0 30px ${kpi.color}15`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 66,
                        fontWeight: 900,
                        color: kpi.color,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        marginBottom: 16,
                        textShadow: `0 0 35px ${kpi.color}66`,
                      }}
                    >
                      {kpi.prefix || ""}
                      {currentVal.toFixed(kpi.decimals || 0)}
                      {kpi.suffix || ""}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 16,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: TEXT_WHITE,
                        marginBottom: 10,
                      }}
                    >
                      {kpi.label}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.65)",
                        lineHeight: 1.4,
                      }}
                    >
                      {kpi.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 🚀 PHASE 4: TERMINAL CLIMAX & DEPLOYMENT CTA (335 - 450f)      */}
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
            {/* Top Wordmark Pill */}
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
                    backgroundColor: "rgba(0, 255, 136, 0.12)",
                    border: `1.5px solid ${NEON_GREEN}`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    marginBottom: 28,
                    boxShadow: `0 0 35px rgba(0, 255, 136, 0.35)`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>⚡</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 15,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      color: NEON_GREEN,
                    }}
                  >
                    AUTONOMOUS TRADING SUITE
                  </span>
                </div>
              );
            })()}

            {/* Title Lockup */}
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
                      background: `linear-gradient(to bottom, #FFFFFF 30%, ${NEON_GREEN} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: `0 10px 40px rgba(0,0,0,0.8)`,
                    }}
                  >
                    Ranuk Profit
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
                    Zero Emotion. 24/7 Binance Execution. Mathematical Alpha.
                  </p>
                </div>
              );
            })()}

            {/* CTA Button */}
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
                      backgroundColor: NEON_GREEN,
                      color: "#030712",
                      padding: "20px 48px",
                      borderRadius: 999,
                      fontSize: 26,
                      fontWeight: 900,
                      letterSpacing: "0.02em",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      boxShadow: `0 0 50px rgba(0, 255, 136, 0.7)`,
                    }}
                  >
                    <span>DEPLOY QUANT BOT</span>
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
                    ranuk.dev/profit · github.com/RanuK12/Ranuk-Profit-Bot
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
