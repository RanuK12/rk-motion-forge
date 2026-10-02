import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const RanukProfitTeaserVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Scene 1: 0 - 90 frames (0-3s) -> Kinetic Hook & Volatility Alert
  // Scene 2: 90 - 240 frames (3-8s) -> Live Trading Terminal & Candlestick Instruments
  // Scene 3: 240 - 360 frames (8-12s) -> Dynamic P&L Count & Trailing Stop Engine
  // Scene 4: 360 - 450 frames (12-15s) -> CTA & Execution Ready

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 14, mass: 0.6, stiffness: 220 },
    });
  };

  // Live P&L counter calculation
  const pnlValue = interpolate(frame, [240, 340], [1240, 8940.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated price flicker
  const currentPrice = 64280 + Math.sin(frame * 0.4) * 45 + Math.cos(frame * 0.8) * 20;

  // Candlestick data for SVG chart
  const candles = [
    { open: 64100, close: 64180, high: 64220, low: 64070, isGreen: true },
    { open: 64180, close: 64150, high: 64200, low: 64130, isGreen: false },
    { open: 64150, close: 64230, high: 64260, low: 64140, isGreen: true },
    { open: 64230, close: 64290, high: 64320, low: 64210, isGreen: true },
    { open: 64290, close: 64240, high: 64310, low: 64220, isGreen: false },
    { open: 64240, close: 64350, high: 64390, low: 64230, isGreen: true },
    { open: 64350, close: 64420, high: 64460, low: 64320, isGreen: true },
    { open: 64420, close: 64390, high: 64440, low: 64360, isGreen: false },
    { open: 64390, close: 64480, high: 64520, low: 64370, isGreen: true },
    { open: 64480, close: 64560, high: 64600, low: 64450, isGreen: true },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#070A0F",
        color: "#FFFFFF",
        fontFamily: "'JetBrains Mono', 'SF Pro Display', Inter, monospace, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Cyber Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Global Terminal Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 48px",
          backgroundColor: "rgba(11, 15, 25, 0.8)",
          backdropFilter: "blur(12px)",
          zIndex: 50,
          fontSize: 16,
          letterSpacing: "0.1em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 10px #10B981" }} />
          <span style={{ fontWeight: 800, color: "#10B981" }}>RANUK PROFIT</span>
          <span style={{ color: "#64748B" }}>// QUANT_ENGINE_V4.2</span>
        </div>
        <div style={{ display: "flex", gap: 32, color: "#94A3B8" }}>
          <span>LATENCY: <strong style={{ color: "#00F0FF" }}>1.2ms</strong></span>
          <span>FEED: <strong style={{ color: "#FACC15" }}>BINANCE_WSS</strong></span>
          <span>RISK GUARD: <strong style={{ color: "#10B981" }}>ENGAGED [0.0% DRAWDOWN]</strong></span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCENE 1: 0 - 90 frames (Kinetic Hook & Volatility Alert)       */}
      {/* ============================================================== */}
      {frame < 90 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 28px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #EF4444",
              borderRadius: 8,
              color: "#EF4444",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginBottom: 32,
              transform: `scale(${interpolate(getSpring(5), [0, 1], [0.8, 1])})`,
            }}
          >
            <span>⚠️ VOLATILITY SPIKE DETECTED</span>
          </div>

          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
              transform: `scale(${interpolate(getSpring(12), [0, 1], [0.85, 1])})`,
            }}
          >
            STOP LOSING TO
            <br />
            <span style={{ color: "#EF4444", textDecoration: "line-through", marginRight: 20 }}>EMOTIONS.</span>
            <span style={{ color: "#10B981" }}>LET MATH EXECUTE.</span>
          </h1>

          <div
            style={{
              marginTop: 40,
              fontSize: 32,
              color: "#94A3B8",
              fontWeight: 500,
              opacity: interpolate(frame, [30, 45], [0, 1]),
            }}
          >
            Sub-millisecond high-frequency algorithmic scalper with trailing risk shields.
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: 90 - 240 frames (Full Quantitative Trading Terminal)  */}
      {/* ============================================================== */}
      {frame >= 90 && frame < 240 && (
        <div
          style={{
            position: "absolute",
            inset: "80px 48px 48px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 24,
            transform: `scale(${interpolate(getSpring(92), [0, 1], [0.95, 1])})`,
          }}
        >
          {/* Main Chart Terminal */}
          <div
            style={{
              backgroundColor: "#0D111C",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: 12,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Chart Sub-header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 900, color: "#FFFFFF" }}>BTC / USDT PERP</span>
                <span style={{ marginLeft: 16, fontSize: 32, fontWeight: 900, color: "#10B981" }}>
                  ${currentPrice.toFixed(2)}
                </span>
                <span style={{ marginLeft: 12, fontSize: 18, color: "#10B981", fontWeight: 700 }}>+6.84% (24h)</span>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ padding: "6px 14px", backgroundColor: "rgba(16, 185, 129, 0.2)", color: "#10B981", borderRadius: 6, fontWeight: 800 }}>1m MESA</span>
                <span style={{ padding: "6px 14px", backgroundColor: "#1E293B", color: "#94A3B8", borderRadius: 6, fontWeight: 700 }}>MACD + RSI</span>
              </div>
            </div>

            {/* Candlestick SVG visualization */}
            <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "flex-end" }}>
              <svg width="100%" height="420" viewBox="0 0 1000 420" preserveAspectRatio="none">
                {/* Horizontal price guide lines */}
                <line x1="0" y1="80" x2="1000" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                <line x1="0" y1="280" x2="1000" y2="280" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                {/* Candles rendered with spring offsets */}
                {candles.map((c, i) => {
                  const candleSpring = spring({
                    frame: frame - (95 + i * 8),
                    fps,
                    config: { damping: 12, stiffness: 200 },
                  });
                  if (frame < 95 + i * 8) return null;

                  const x = 50 + i * 90;
                  const candleHeight = Math.abs(c.close - c.open) * 2.2 * candleSpring;
                  const candleY = 400 - (Math.min(c.open, c.close) - 64000) * 0.7 - candleHeight;
                  const wickY1 = 400 - (c.high - 64000) * 0.7;
                  const wickY2 = 400 - (c.low - 64000) * 0.7;
                  const color = c.isGreen ? "#10B981" : "#EF4444";

                  return (
                    <g key={i}>
                      {/* Wick */}
                      <line x1={x + 20} y1={wickY1} x2={x + 20} y2={wickY2} stroke={color} strokeWidth="2.5" />
                      {/* Body */}
                      <rect
                        x={x}
                        y={candleY}
                        width="40"
                        height={Math.max(candleHeight, 6)}
                        fill={color}
                        rx="3"
                        filter={`drop-shadow(0 0 8px ${color})`}
                      />
                    </g>
                  );
                })}

                {/* Live Floating Price Line */}
                <line x1="0" y1="120" x2="1000" y2="120" stroke="#00F0FF" strokeWidth="2" strokeDasharray="6 6" />
                <text x="880" y="112" fill="#00F0FF" fontSize="16" fontWeight="bold">TRIGGER @ $64,560</text>
              </svg>

              {/* Trailing Stop Alert Banner */}
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid #10B981",
                  borderRadius: 8,
                  padding: "16px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  boxShadow: "0 0 30px rgba(16, 185, 129, 0.2)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 24 }}>⚡</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "#10B981" }}>AUTOMATIC TRAILING STOP ACTIVATED</div>
                    <div style={{ fontSize: 14, color: "#94A3B8" }}>Dynamic floor locks +14.2% while riding momentum higher.</div>
                  </div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#FFFFFF", backgroundColor: "#10B981", padding: "6px 16px", borderRadius: 6 }}>
                  ZERO LOSS RISK
                </div>
              </div>
            </div>
          </div>

          {/* Right Instrument Rail: Order Book & Gauges */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Order Book Depth */}
            <div
              style={{
                backgroundColor: "#0D111C",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 800, color: "#94A3B8" }}>
                <span>ORDER BOOK DEPTH</span>
                <span style={{ color: "#10B981" }}>68% BUY WALL</span>
              </div>
              {/* Depth Bars */}
              <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden", gap: 3 }}>
                <div style={{ flex: 68, backgroundColor: "#10B981", boxShadow: "0 0 12px #10B981" }} />
                <div style={{ flex: 32, backgroundColor: "#EF4444" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#64748B" }}>
                <span>Bids: $4.2M</span>
                <span>Asks: $1.8M</span>
              </div>
            </div>

            {/* Volatility Scanner Gauge */}
            <div
              style={{
                backgroundColor: "#0D111C",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 800, color: "#94A3B8" }}>VOLATILITY SCANNER</span>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#FACC15" }}>92.4 <span style={{ fontSize: 18, color: "#94A3B8" }}>/ 100</span></div>
              <div style={{ fontSize: 14, color: "#10B981", fontWeight: 700 }}>HIGH PROFIT EXPANSION ZONE</div>
            </div>

            {/* Risk Guard Widget */}
            <div
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                border: "1px solid #10B981",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: "#10B981" }}>CAPITAL GUARD 24/7</span>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#FFFFFF" }}>Hard Max Loss: 1.5%</div>
              <div style={{ fontSize: 14, color: "#94A3B8" }}>Automatic killswitch on exchange disconnection.</div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: 240 - 360 frames (Monumental Dynamic P&L Count)       */}
      {/* ============================================================== */}
      {frame >= 240 && frame < 360 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
            backgroundColor: "#070A0F",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#10B981",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            REAL-TIME ACCUMULATED P&L
          </div>

          {/* Huge Ticking P&L */}
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#10B981",
              textShadow: "0 0 60px rgba(16, 185, 129, 0.6)",
              transform: `scale(${interpolate(getSpring(242), [0, 1], [0.85, 1])})`,
            }}
          >
            +${pnlValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 48,
              fontSize: 24,
              color: "#94A3B8",
              fontWeight: 700,
            }}
          >
            <div>WIN RATE: <strong style={{ color: "#FFFFFF" }}>84.2%</strong></div>
            <div>AVG TRADE DURATION: <strong style={{ color: "#FFFFFF" }}>42s</strong></div>
            <div>MAX DRAWDOWN: <strong style={{ color: "#10B981" }}>-0.4%</strong></div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 4: 360 - 450 frames (Kinetic Closing & CTA)              */}
      {/* ============================================================== */}
      {frame >= 360 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#10B981",
            color: "#070A0F",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 80,
          }}
        >
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            AUTOMATE YOUR EDGE TODAY
          </div>

          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 40,
            }}
          >
            RANUK PROFIT
          </div>

          <div
            style={{
              backgroundColor: "#070A0F",
              color: "#10B981",
              padding: "24px 64px",
              borderRadius: 16,
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
          >
            ranuk.dev/ranuk-it/trading-bots.html
          </div>
        </div>
      )}
    </div>
  );
};
