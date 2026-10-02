import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const RevealVerticalVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1080x1920 @ 30fps (15s = 450 frames)
  // Safe margins for TikTok/Reels UI: Top 160px, Bottom 260px, Sides 60px

  const btnPulse = Math.sin(frame * 0.15) * 5;

  // Countdown timer simulation
  const hours = 3;
  const minutes = Math.max(0, 42 - Math.floor(frame / 60));
  const seconds = 59 - (frame % 60);

  const tiles = Array.from({ length: 16 });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        backgroundColor: "#050811",
        color: "#FFFFFF",
        fontFamily: "'Space Grotesk', 'JetBrains Mono', Inter, sans-serif",
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

      {/* Crimson Glow Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(225,29,72,0.25) 0%, rgba(0,0,0,0) 70%)",
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
            backgroundColor: "rgba(225,29,72,0.15)",
            border: "1px solid #E11D48",
            padding: "8px 24px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 800,
            color: "#E11D48",
            marginBottom: 24,
          }}
        >
          <span>🛰️ ENIGMA SATELITAL DIARIO</span>
        </div>

        <h1
          style={{
            fontSize: 68,
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Una baldosa al día.
          <br />
          <span style={{ color: "#E11D48" }}>¿Adivinas qué hay debajo?</span>
        </h1>
      </div>

      {/* Centerpiece: Orbital 4x4 Grid Container */}
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          backgroundColor: "#0A0F1D",
          borderRadius: 32,
          border: "2px solid rgba(225,29,72,0.4)",
          padding: 36,
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 24,
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 18, color: "#94A3B8", fontWeight: 700 }}>SECTOR 09 · PASO ORBITAL</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#FFFFFF" }}>52% DESPEJADO</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ backgroundColor: "rgba(225,29,72,0.2)", color: "#E11D48", padding: "6px 14px", borderRadius: 8, fontSize: 16, fontWeight: 800 }}>
              8,920 ONLINE
            </span>
          </div>
        </div>

        {/* 4x4 Tile Matrix */}
        <div
          style={{
            width: "100%",
            height: 380,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {tiles.map((_, i) => {
            const isRevealed = i % 2 === 0 || i === 5 || i === 10;
            const tileSpring = spring({
              frame: frame - (20 + i * 4),
              fps,
              config: { damping: 12, stiffness: 220 },
            });

            return (
              <div
                key={i}
                style={{
                  borderRadius: 10,
                  border: isRevealed ? "2px solid #E11D48" : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: isRevealed ? "#1E1B4B" : "#0F172A",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  transform: `scale(${isRevealed ? interpolate(tileSpring, [0, 1], [0.85, 1]) : 1})`,
                  overflow: "hidden",
                }}
              >
                {isRevealed ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `radial-gradient(circle at 40% 40%, #059669 0%, #064E3B 50%, #0F172A 100%)`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#34D399",
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    #{i + 1}
                  </div>
                ) : (
                  <div style={{ color: "#475569", fontSize: 20 }}>🔒</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Countdown Bar */}
        <div style={{ backgroundColor: "#050811", borderRadius: 20, padding: 20, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 16, color: "#94A3B8", fontWeight: 700, marginBottom: 4 }}>
            PRÓXIMO DESBLOQUEO EN
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#FACC15" }}>
            0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
            backgroundColor: "#E11D48",
            color: "#FFFFFF",
            padding: "24px 40px",
            borderRadius: 24,
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            boxShadow: "0 20px 50px rgba(225,29,72,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>🛰️ DESTAPAR MI BALDOSA</span>
          <span>→</span>
        </div>
        <div style={{ marginTop: 16, fontSize: 22, color: "#94A3B8", fontWeight: 700 }}>
          elrevelado.com
        </div>
      </div>
    </div>
  );
};
