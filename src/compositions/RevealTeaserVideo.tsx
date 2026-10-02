import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const RevealTeaserVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Scene 1: 0 - 80f (0-2.6s) -> Satellite HUD & Enigma Mystery Hook
  // Scene 2: 80 - 240f (2.6-8s) -> Orbital Tile Grid Unveiling & Dynamic Radar Sweep
  // Scene 3: 240 - 350f (8-11.6s) -> Community Speculation Lobby & Countdown Clock
  // Scene 4: 350 - 450f (11.6-15s) -> Kinetic Closing & CTA

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 14, mass: 0.6, stiffness: 220 },
    });
  };

  // Rotating radar angle
  const radarAngle = (frame * 4) % 360;

  // Countdown timer simulation
  const hours = 3;
  const minutes = Math.max(0, 42 - Math.floor(frame / 60));
  const seconds = 59 - (frame % 60);

  // 4x4 satellite tiles (16 total)
  const tiles = Array.from({ length: 16 });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#050811",
        color: "#FFFFFF",
        fontFamily: "'Space Grotesk', 'JetBrains Mono', Inter, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Satellite Scanline Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(225, 29, 72, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(225, 29, 72, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* Global Satellite Telemetry Header HUD */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          borderBottom: "1px solid rgba(225, 29, 72, 0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 48px",
          backgroundColor: "rgba(5, 8, 17, 0.85)",
          backdropFilter: "blur(10px)",
          zIndex: 50,
          fontSize: 15,
          letterSpacing: "0.15em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#E11D48", boxShadow: "0 0 10px #E11D48" }} />
          <span style={{ fontWeight: 800, color: "#E11D48" }}>EL REVELADO</span>
          <span style={{ color: "#64748B" }}>// ORBITAL_SCAN_SAT_09</span>
        </div>
        <div style={{ display: "flex", gap: 32, color: "#94A3B8" }}>
          <span>TARGET: <strong style={{ color: "#38BDF8" }}>28.5721° N, 80.6480° W</strong></span>
          <span>ALTITUDE: <strong style={{ color: "#FACC15" }}>418.2 KM</strong></span>
          <span>STATUS: <strong style={{ color: "#E11D48" }}>ENIGMA ACTIVE</strong></span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SCENE 1: 0 - 80 frames (Mystery Hook & Global Enigma)          */}
      {/* ============================================================== */}
      {frame < 80 && (
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
              padding: "10px 24px",
              backgroundColor: "rgba(225, 29, 72, 0.15)",
              border: "1px solid #E11D48",
              borderRadius: 8,
              color: "#E11D48",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "0.2em",
              marginBottom: 32,
              transform: `scale(${interpolate(getSpring(5), [0, 1], [0.8, 1])})`,
            }}
          >
            <span>🛰️ VIRAL PLANETARY PUZZLE</span>
          </div>

          <h1
            style={{
              fontSize: 120,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              margin: 0,
              transform: `scale(${interpolate(getSpring(10), [0, 1], [0.85, 1])})`,
            }}
          >
            ONE TILE A DAY.
            <br />
            <span style={{ color: "#E11D48" }}>CAN YOU GUESS</span> WHAT LIES BENEATH?
          </h1>

          <div
            style={{
              marginTop: 40,
              fontSize: 32,
              color: "#94A3B8",
              fontWeight: 600,
              opacity: interpolate(frame, [25, 40], [0, 1]),
            }}
          >
            Daily NASA orbital imagery decoded by thousands of players worldwide.
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 2: 80 - 240 frames (Orbital Tile Grid & Radar Sweep)     */}
      {/* ============================================================== */}
      {frame >= 80 && frame < 240 && (
        <div
          style={{
            position: "absolute",
            inset: "80px 48px 48px 48px",
            display: "grid",
            gridTemplateColumns: "1fr 480px",
            gap: 32,
            alignItems: "center",
          }}
        >
          {/* Tile Grid Container */}
          <div
            style={{
              height: "100%",
              backgroundColor: "#0A0F1D",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Grid Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 26, fontWeight: 900, color: "#FFFFFF" }}>SECTOR 07 — ENIGMA MAP</span>
                <span style={{ marginLeft: 16, fontSize: 18, color: "#E11D48", fontWeight: 800 }}>52% UNLOCKED</span>
              </div>
              <div style={{ fontSize: 15, color: "#38BDF8", fontWeight: 700 }}>
                SCAN RESOLUTION: 0.5m / PIXEL
              </div>
            </div>

            {/* 4x4 Tile Matrix */}
            <div
              style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridTemplateRows: "repeat(4, 1fr)",
                gap: 12,
                position: "relative",
              }}
            >
              {tiles.map((_, i) => {
                const isRevealed = i % 2 === 0 || i === 5 || i === 10;
                const tileSpring = spring({
                  frame: frame - (85 + i * 5),
                  fps,
                  config: { damping: 12, stiffness: 220 },
                });

                return (
                  <div
                    key={i}
                    style={{
                      borderRadius: 8,
                      position: "relative",
                      overflow: "hidden",
                      border: isRevealed ? "2px solid #E11D48" : "1px solid rgba(255,255,255,0.1)",
                      backgroundColor: isRevealed ? "#1E1B4B" : "#0F172A",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      transform: `scale(${isRevealed ? interpolate(tileSpring, [0, 1], [0.85, 1]) : 1})`,
                    }}
                  >
                    {isRevealed ? (
                      /* Revealed Satellite Texture */
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: `radial-gradient(circle at ${30 + (i * 10) % 50}% ${40 + (i * 15) % 40}%, #059669 0%, #064E3B 50%, #0F172A 100%)`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "#34D399",
                          fontSize: 14,
                          fontWeight: 800,
                          letterSpacing: "0.1em",
                        }}
                      >
                        TILE #{i + 1}
                      </div>
                    ) : (
                      /* Locked Fog of War */
                      <div
                        style={{
                          color: "#475569",
                          fontSize: 24,
                          fontWeight: 900,
                        }}
                      >
                        🔒
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Rail: Radar & Telemetry Instruments */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Rotating Radar */}
            <div
              style={{
                backgroundColor: "#0A0F1D",
                border: "1px solid rgba(225, 29, 72, 0.3)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 800, color: "#E11D48", marginBottom: 16, letterSpacing: "0.15em" }}>
                ORBITAL RADAR SWEEP
              </div>
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  border: "2px solid rgba(225, 29, 72, 0.4)",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {/* Concentric rings */}
                <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "1px dashed rgba(225,29,72,0.3)" }} />
                <div style={{ position: "absolute", width: 60, height: 60, borderRadius: "50%", border: "1px dashed rgba(225,29,72,0.3)" }} />
                {/* Rotating Beam */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 90,
                    height: 2,
                    background: "linear-gradient(90deg, #E11D48, transparent)",
                    transformOrigin: "left center",
                    transform: `rotate(${radarAngle}deg)`,
                    boxShadow: "0 0 10px #E11D48",
                  }}
                />
              </div>
            </div>

            {/* Live Countdown Instrument */}
            <div
              style={{
                backgroundColor: "#0A0F1D",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.1em" }}>
                NEXT ORBITAL UNLOCK IN:
              </div>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#FACC15", margin: "8px 0" }}>
                0{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <div style={{ fontSize: 14, color: "#34D399", fontWeight: 700 }}>
                PASS CONFIRMED · ZERO SPOILERS
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 3: 240 - 350 frames (Community Speculation Feed)         */}
      {/* ============================================================== */}
      {frame >= 240 && frame < 350 && (
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
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#E11D48",
              marginBottom: 20,
            }}
          >
            GLOBAL SPECULATION LOBBY
          </div>

          <h2
            style={{
              fontSize: 84,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              maxWidth: 1400,
              margin: "0 0 48px 0",
            }}
          >
            14,800+ Explorers guessing in real-time.
            <br />
            <span style={{ color: "#38BDF8" }}>Who will claim the First Solve?</span>
          </h2>

          {/* Floating Community Chat Cards */}
          <div style={{ display: "flex", gap: 24 }}>
            <div style={{ backgroundColor: "#0F172A", border: "1px solid #38BDF8", borderRadius: 12, padding: "16px 28px", fontSize: 20, fontWeight: 700 }}>
              👤 Alex_Dev: <span style={{ color: "#94A3B8" }}>"Looks like the Eye of the Sahara!"</span>
            </div>
            <div style={{ backgroundColor: "#0F172A", border: "1px solid #E11D48", borderRadius: 12, padding: "16px 28px", fontSize: 20, fontWeight: 700 }}>
              👤 GeoHunter: <span style={{ color: "#94A3B8" }}>"Check tile 7, that’s volcanic basalt!"</span>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* SCENE 4: 350 - 450 frames (Kinetic Closing & CTA)              */}
      {/* ============================================================== */}
      {frame >= 350 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#E11D48",
            color: "#FFFFFF",
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
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            UNCOVER THE SECRET MYSTERY
          </div>

          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              marginBottom: 40,
            }}
          >
            EL REVELADO
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              color: "#E11D48",
              padding: "24px 64px",
              borderRadius: 16,
              fontSize: 48,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
            }}
          >
            elrevelado.com
          </div>
        </div>
      )}
    </div>
  );
};
