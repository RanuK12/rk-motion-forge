import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Audio,
  Img,
  staticFile,
} from "remotion";

export const GambetaVerticalPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Argentine Football Colors
  const CELESTE = "#74ACDF";
  const GOLD = "#F59E0B";
  const WHITE = "#FFFFFF";
  const PITCH_DARK = "#050B14";
  const ACCENT_GLOW = "rgba(116, 172, 223, 0.4)";

  const getSpring = (offset: number, damping = 14, stiffness = 180) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.65, stiffness },
    });
  };

  // Phase Timing (Total 450 frames = 15s @ 30fps):
  // Phase 1 (0-95f): Mobile Shock Hook
  // Phase 2 (95-215f): Vertical 3D Shields & Clutch Decision HUD
  // Phase 3 (215-335f): Kinetic Stats Columns (7 Países, 16 Categorías, 378 Clubes)
  // Phase 4 (335-450f): Mobile Climax & CTA

  const floodlightAngle = interpolate(frame, [0, 450], [-20, 20]);
  const pitchGridY = (frame * 1.5) % 60;

  const hookWords = [
    { text: "¿CANSADO", highlight: false },
    { text: "DE", highlight: false },
    { text: "CARRERAS", highlight: false },
    { text: "EUROPEAS", highlight: false },
    { text: "SIN", highlight: false },
    { text: "MÍSTICA?", highlight: true },
  ];

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        overflow: "hidden",
        backgroundColor: PITCH_DARK,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: WHITE,
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.85} />

      {/* Stadium Floodlight Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 20%, #0F2642 0%, #06111D 55%, #02060B 100%)`,
          zIndex: 0,
        }}
      />

      {/* Sweeping Floodlight Cones */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "10%",
          width: 500,
          height: 1800,
          background: `linear-gradient(to bottom, rgba(116, 172, 223, 0.22) 0%, transparent 80%)`,
          transform: `rotate(${floodlightAngle}deg)`,
          transformOrigin: "top center",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          right: "10%",
          width: 500,
          height: 1800,
          background: `linear-gradient(to bottom, rgba(245, 158, 11, 0.18) 0%, transparent 80%)`,
          transform: `rotate(${-floodlightAngle * 0.8}deg)`,
          transformOrigin: "top center",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Pitch Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(116, 172, 223, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(116, 172, 223, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          backgroundPosition: `0px ${pitchGridY}px`,
        }}
      />

      {/* Safe Area Container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "160px 60px 200px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          zIndex: 1,
        }}
      >
        {/* ============================================================== */}
        {/* PHASE 1: HOOK (0 - 95f)                                        */}
        {/* ============================================================== */}
        {frame < 95 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Top Badge */}
            {(() => {
              const pSpring = getSpring(0);
              return (
                <div
                  style={{
                    opacity: pSpring,
                    transform: `translateY(${(1 - pSpring) * -30}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    backgroundColor: "rgba(116, 172, 223, 0.15)",
                    border: `2px solid ${CELESTE}`,
                    borderRadius: 999,
                    padding: "14px 34px",
                    marginBottom: 50,
                    boxShadow: `0 0 35px ${ACCENT_GLOW}`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>🇦🇷 ⚽ 🏆</span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: CELESTE,
                    }}
                  >
                    MODO CARRERA SUDAMERICANO
                  </span>
                </div>
              );
            })()}

            {/* Kinetic Words */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "18px 22px",
                maxWidth: 960,
                marginBottom: 50,
              }}
            >
              {hookWords.map((word, idx) => {
                const wSpring = getSpring(10 + idx * 6, 13, 210);
                return (
                  <span
                    key={idx}
                    style={{
                      fontSize: 72,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      opacity: wSpring,
                      transform: `translateY(${(1 - wSpring) * 35}px) scale(${0.8 + 0.2 * wSpring})`,
                      color: word.highlight ? GOLD : WHITE,
                      textShadow: word.highlight
                        ? `0 0 35px rgba(245, 158, 11, 0.7)`
                        : `0 6px 25px rgba(0,0,0,0.8)`,
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>

            {/* Subtitle */}
            {(() => {
              const subSpring = getSpring(48);
              return (
                <div
                  style={{
                    opacity: subSpring,
                    transform: `translateY(${(1 - subSpring) * 25}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 18,
                  }}
                >
                  <div
                    style={{
                      height: 5,
                      width: interpolate(frame, [45, 75], [0, 420], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      background: `linear-gradient(to right, transparent, ${CELESTE}, ${GOLD}, transparent)`,
                      borderRadius: 3,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 30,
                      fontWeight: 700,
                      color: "rgba(255, 255, 255, 0.85)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    EL FÚTBOL REAL SE JUEGA CON MÍSTICA
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* PHASE 2: 3D SHIELDS & DECISION HUD (95 - 215f)                 */}
        {/* ============================================================== */}
        {frame >= 95 && frame < 215 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 36,
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  color: CELESTE,
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                // 378 CLUBES REALES · 7 PAÍSES
              </div>
              <h2
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Del Potrero a la <span style={{ color: GOLD }}>Gloria Continental</span>
              </h2>
            </div>

            {/* 4 Shields Horizontal Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 16,
                width: "100%",
              }}
            >
              {[
                { name: "AFA", file: "gambeta/afa-128.png" },
                { name: "Boca", file: "gambeta/boca-juniors-128.png" },
                { name: "River", file: "gambeta/river-plate-128.png" },
                { name: "Talleres", file: "gambeta/talleres-cba.png" },
              ].map((item, idx) => {
                const sSpring = getSpring(105 + idx * 8, 12, 190);
                return (
                  <div
                    key={idx}
                    style={{
                      opacity: sSpring,
                      transform: `translateY(${(1 - sSpring) * 30}px)`,
                      backgroundColor: "rgba(15, 30, 52, 0.75)",
                      border: "1.5px solid rgba(116, 172, 223, 0.3)",
                      borderRadius: 18,
                      padding: "20px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                    }}
                  >
                    <Img
                      src={staticFile(item.file)}
                      style={{ maxHeight: 72, maxWidth: 72, objectFit: "contain", marginBottom: 8 }}
                    />
                    <span style={{ fontSize: 16, fontWeight: 800 }}>{item.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Decision Card Mobile Mockup */}
            {(() => {
              const cardSpring = getSpring(125, 14, 170);
              const isSelected = frame > 165;
              const pickSpring = getSpring(165, 12, 220);

              return (
                <div
                  style={{
                    width: "100%",
                    opacity: cardSpring,
                    transform: `translateY(${(1 - cardSpring) * 40}px)`,
                    backgroundColor: "rgba(10, 20, 36, 0.9)",
                    border: "2px solid rgba(116, 172, 223, 0.4)",
                    borderRadius: 24,
                    padding: 34,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      paddingBottom: 14,
                      marginBottom: 18,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: "#EF4444",
                          boxShadow: "0 0 10px #EF4444",
                        }}
                      />
                      <span style={{ fontSize: 16, fontWeight: 800, color: "#EF4444" }}>
                        EN VIVO · MINUTO 88'
                      </span>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                      CLÁSICO CALIENTE
                    </span>
                  </div>

                  <div style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.3, marginBottom: 24 }}>
                    Tiro libre al borde del área. ¿Qué le ordenás al 10?
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[
                      { key: "A", text: "Pegarle con comba al palo del arquero", chosen: true },
                      { key: "B", text: "Centro pinchado al segundo palo", chosen: false },
                      { key: "C", text: "Toque corto y sorpresa táctica", chosen: false },
                    ].map((opt, i) => {
                      const isTarget = opt.chosen && isSelected;
                      return (
                        <div
                          key={i}
                          style={{
                            padding: "16px 20px",
                            borderRadius: 14,
                            backgroundColor: isTarget
                              ? "rgba(245, 158, 11, 0.25)"
                              : "rgba(255, 255, 255, 0.06)",
                            border: `2px solid ${isTarget ? GOLD : "rgba(255, 255, 255, 0.12)"}`,
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            transform: isTarget ? `scale(${1 + 0.03 * pickSpring})` : "none",
                          }}
                        >
                          <span
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              backgroundColor: isTarget ? GOLD : "rgba(255,255,255,0.15)",
                              color: isTarget ? "#000" : WHITE,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 900,
                              fontSize: 16,
                            }}
                          >
                            {opt.key}
                          </span>
                          <span style={{ fontSize: 18, fontWeight: 700 }}>{opt.text}</span>
                        </div>
                      );
                    })}
                  </div>

                  {isSelected && (
                    <div
                      style={{
                        marginTop: 22,
                        padding: "14px 18px",
                        borderRadius: 12,
                        backgroundColor: "rgba(16, 185, 129, 0.25)",
                        border: "1.5px solid #10B981",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        opacity: pickSpring,
                      }}
                    >
                      <span style={{ fontSize: 24 }}>⚽🔥</span>
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#10B981" }}>
                        ¡GOLAZO AL ÁNGULO! +3 PUNTOS · MORAL AL 100%
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* PHASE 3: KINETIC STATS (215 - 335f)                            */}
        {/* ============================================================== */}
        {frame >= 215 && frame < 335 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: CELESTE,
                textTransform: "uppercase",
              }}
            >
              // DIMENSIÓN SUDAMERICANA
            </div>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 900,
                textAlign: "center",
                lineHeight: 1.15,
                margin: "0 0 10px 0",
              }}
            >
              Todo el continente en tu bolsillo
            </h2>

            {[
              {
                from: 1,
                to: 7,
                suffix: " PAÍSES",
                label: "SUDAMÉRICA COMPLETA",
                sub: "🇦🇷 🇺🇾 🇨🇱 🇨🇴 🇵🇪 🇵🇾 🇧🇷",
                color: CELESTE,
                delay: 220,
              },
              {
                from: 1,
                to: 16,
                suffix: " CATEGORÍAS",
                label: "EL ASCENSO VIVE ACÁ",
                sub: "Primera, B Nacional, Metro y Federal",
                color: GOLD,
                delay: 235,
              },
              {
                from: 50,
                to: 378,
                suffix: " CLUBES",
                label: "PLANTELES Y MÍSTICA",
                sub: "Presupuestos, ascensos y descensos reales",
                color: "#10B981",
                delay: 250,
              },
            ].map((stat, i) => {
              const sSpring = getSpring(stat.delay, 12, 170);
              const currentVal = Math.round(
                interpolate(sSpring, [0, 1], [stat.from, stat.to])
              );

              return (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    opacity: sSpring,
                    transform: `translateY(${(1 - sSpring) * 35}px)`,
                    backgroundColor: "rgba(12, 24, 44, 0.85)",
                    border: `2px solid ${stat.color}55`,
                    borderRadius: 22,
                    padding: "28px 32px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: WHITE, marginBottom: 4 }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: 16, color: "rgba(255,255,255,0.65)" }}>
                      {stat.sub}
                    </div>
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 54,
                      fontWeight: 900,
                      color: stat.color,
                      letterSpacing: "-0.04em",
                      textShadow: `0 0 25px ${stat.color}66`,
                    }}
                  >
                    {currentVal}
                    <span style={{ fontSize: 24, fontWeight: 700 }}>{stat.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* PHASE 4: CLIMAX & CTA (335 - 450f)                             */}
        {/* ============================================================== */}
        {frame >= 335 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            {/* Logo */}
            {(() => {
              const lSpring = getSpring(338, 12, 170);
              return (
                <div
                  style={{
                    opacity: lSpring,
                    transform: `scale(${0.8 + 0.2 * lSpring})`,
                    width: 160,
                    height: 160,
                    filter: `drop-shadow(0 0 45px rgba(116, 172, 223, 0.8))`,
                  }}
                >
                  <Img
                    src={staticFile("gambeta/gambeta-logo.svg")}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              );
            })()}

            {/* Title */}
            {(() => {
              const tSpring = getSpring(350, 14, 180);
              return (
                <div
                  style={{
                    opacity: tSpring,
                    transform: `translateY(${(1 - tSpring) * 25}px)`,
                  }}
                >
                  <h1
                    style={{
                      fontSize: 88,
                      fontWeight: 900,
                      lineHeight: 1,
                      margin: "0 0 16px 0",
                      background: `linear-gradient(to bottom, #FFFFFF 30%, ${CELESTE} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    GAMBETA
                  </h1>
                  <p style={{ fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: 0 }}>
                    El Modo Carrera Sudamericano
                  </p>
                </div>
              );
            })()}

            {/* CTA Button */}
            {(() => {
              const cSpring = getSpring(365, 12, 200);
              return (
                <div
                  style={{
                    opacity: cSpring,
                    transform: `scale(${0.9 + 0.1 * cSpring}) translateY(${(1 - cSpring) * 20}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    marginTop: 16,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: GOLD,
                      color: "#050B14",
                      padding: "24px 56px",
                      borderRadius: 999,
                      fontSize: 32,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      boxShadow: "0 0 50px rgba(245, 158, 11, 0.7)",
                    }}
                  >
                    <span>JUGAR GRATIS</span>
                    <span style={{ fontSize: 36 }}>➔</span>
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 28,
                      fontWeight: 800,
                      color: CELESTE,
                    }}
                  >
                    gambetafutbol.games
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
