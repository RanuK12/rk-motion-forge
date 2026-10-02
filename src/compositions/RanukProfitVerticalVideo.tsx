import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const RanukProfitVerticalVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1080x1920 @ 30fps (15s = 450 frames)
  // Safe margins for TikTok/Reels UI: Top 160px, Bottom 260px, Sides 60px

  const pnlCounter = interpolate(frame, [40, 180], [420.5, 4890.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const btnPulse = Math.sin(frame * 0.15) * 5;

  const currentPrice = 64280 + Math.sin(frame * 0.4) * 45;

  const candles = [
    { open: 64100, close: 64180, high: 64220, low: 64070, isGreen: true },
    { open: 64180, close: 64150, high: 64200, low: 64130, isGreen: false },
    { open: 64150, close: 64230, high: 64260, low: 64140, isGreen: true },
    { open: 64230, close: 64290, high: 64320, low: 64210, isGreen: true },
    { open: 64290, close: 64240, high: 64310, low: 64220, isGreen: false },
    { open: 64240, close: 64380, high: 64410, low: 64230, isGreen: true },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#070A0F",
        color: "#FFFFFF",
        fontFamily: "'JetBrains Mono', 'SF Pro Display', Inter, monospace, sans-serif",
        padding: "160px 60px 260px 60px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Cyber Glow Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.25) 0%, rgba(0,0,0,0) 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top Header & Hook */}
      <div style={{ textAlign: "center", width: "100%", zIndex: 10 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(16,185,129,0.15)",
            border: "1px solid #10B981",
            padding: "8px 24px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 800,
            color: "#10B981",
            marginBottom: 24,
          }}
        >
          <span>⚡ ALGORITHMIC TRADING TERMINAL</span>
        </div>

        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Stop trading manual.
          <br />
          <span style={{ color: "#10B981" }}>Automate your edge.</span>
        </h1>
      </div>

      {/* Centerpiece: Quantitative Mobile Terminal Card */}
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          backgroundColor: "#0D111C",
          borderRadius: 32,
          border: "2px solid rgba(16,185,129,0.4)",
          padding: 36,
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Terminal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, color: "#94A3B8", fontWeight: 700 }}>BTC / USDT PERPETUAL</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#10B981" }}>
              ${currentPrice.toFixed(2)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ backgroundColor: "rgba(16,185,129,0.2)", color: "#10B981", padding: "6px 14px", borderRadius: 8, fontSize: 16, fontWeight: 800 }}>
              LIVE FEED 1.2ms
            </span>
          </div>
        </div>

        {/* Candlestick SVG */}
        <div style={{ width: "100%", height: 260, backgroundColor: "#070A0F", borderRadius: 16, padding: 16, boxSizing: "border-box", position: "relative" }}>
          <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="none">
            {candles.map((c, i) => {
              const x = 30 + i * 75;
              const candleHeight = Math.abs(c.close - c.open) * 1.8;
              const candleY = 180 - (Math.min(c.open, c.close) - 64000) * 0.45 - candleHeight;
              const color = c.isGreen ? "#10B981" : "#EF4444";
              return (
                <g key={i}>
                  <line x1={x + 15} y1={candleY - 15} x2={x + 15} y2={candleY + candleHeight + 15} stroke={color} strokeWidth="2" />
                  <rect x={x} y={candleY} width="30" height={Math.max(candleHeight, 6)} fill={color} rx="2" />
                </g>
              );
            })}
          </svg>
          <div style={{ position: "absolute", bottom: 12, right: 16, fontSize: 14, color: "#00F0FF", fontWeight: 700 }}>
            ⚡ TRAILING STOP +14.2% LOCKED
          </div>
        </div>

        {/* Big P&L Display */}
        <div style={{ backgroundColor: "#070A0F", borderRadius: 20, padding: 24, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 18, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>
            REAL-TIME PROFIT TODAY
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#10B981", textShadow: "0 0 30px rgba(16,185,129,0.5)" }}>
            +${pnlCounter.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: 18, color: "#94A3B8", marginTop: 8 }}>
            Win Rate: <strong style={{ color: "#FFFFFF" }}>84.2%</strong> · Drawdown: <strong style={{ color: "#10B981" }}>0.0%</strong>
          </div>
        </div>
      </div>

      {/* Bottom CTA Button / Pulsing Sticker */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          zIndex: 10,
          transform: `scale(${1 + btnPulse * 0.01})`,
        }}
      >
        <div
          style={{
            backgroundColor: "#10B981",
            color: "#070A0F",
            padding: "24px 40px",
            borderRadius: 24,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            boxShadow: "0 20px 50px rgba(16,185,129,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>🚀 ACTIVAR TRADING BOT</span>
          <span>→</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 22, color: "#94A3B8", fontWeight: 700 }}>
          ranuk.dev/ranuk-it/trading-bots.html
        </div>
      </div>
    </div>
  );
};
