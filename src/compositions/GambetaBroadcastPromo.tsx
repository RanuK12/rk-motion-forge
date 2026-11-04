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

export const GambetaBroadcastPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color Palette: Deep Argentine Night, Celeste Albiceleste, Sun Gold, Pitch Emerald
  const CELESTE = "#74ACDF";
  const GOLD = "#F59E0B";
  const WHITE = "#FFFFFF";
  const PITCH_DARK = "#050B14";
  const ACCENT_GLOW = "rgba(116, 172, 223, 0.4)";

  // Helper spring
  const getSpring = (offset: number, damping = 14, stiffness = 180) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping, mass: 0.65, stiffness },
    });
  };

  // Phase Timing (Total 450 frames = 15s @ 30fps):
  // Phase 1: 0 - 95f (0 - 3.2s) -> The Argentine / Passion Hook
  // Phase 2: 95 - 215f (3.2 - 7.2s) -> 3D Club Crests & Real Decision Engine
  // Phase 3: 215 - 335f (7.2 - 11.2s) -> Kinetic Scale Stats: 7 Países, 16 Categorías, 378 Clubes
  // Phase 4: 335 - 450f (11.2 - 15.0s) -> Stadium Climax & Outro Lockup

  // Dynamic Camera & Floodlight Pan
  const cameraScale = interpolate(
    frame,
    [0, 80, 95, 170, 215, 290, 335, 430],
    [1, 1.04, 1.02, 1.06, 1.01, 1.05, 1.02, 1.06],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const floodlightAngle = interpolate(frame, [0, 450], [-25, 25]);
  const pitchGridY = (frame * 1.2) % 60;

  // Words for Phase 1 Hook
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
        width: 1920,
        height: 1080,
        position: "relative",
        overflow: "hidden",
        backgroundColor: PITCH_DARK,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: WHITE,
      }}
    >
      <Audio src={staticFile("music.mp3")} volume={0.85} />

      {/* ============================================================== */}
      {/* 🏟️ BACKGROUND LAYER: STADIUM FLOODLIGHTS & SOCCER PITCH DEPTH */}
      {/* ============================================================== */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 15%, #0F2642 0%, #06111D 50%, #02060B 100%)`,
          zIndex: 0,
        }}
      />

      {/* Floodlight beams (dynamic sweeping cones) */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: "20%",
          width: 600,
          height: 1400,
          background: `linear-gradient(to bottom, rgba(116, 172, 223, 0.25) 0%, transparent 80%)`,
          transform: `rotate(${floodlightAngle}deg)`,
          transformOrigin: "top center",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -200,
          right: "20%",
          width: 600,
          height: 1400,
          background: `linear-gradient(to bottom, rgba(245, 158, 11, 0.18) 0%, transparent 80%)`,
          transform: `rotate(${-floodlightAngle * 0.8}deg)`,
          transformOrigin: "top center",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Perspective Soccer Pitch Grid Lines */}
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
          maskImage: "radial-gradient(ellipse at 50% 60%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 60%, black 20%, transparent 85%)",
        }}
      />

      {/* Floating Stadium Ambient Particles (Deterministic) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const seed = i * 47.12;
        const posX = ((seed * 19) % 1920);
        const startY = (seed * 29) % 1080;
        const speed = 0.4 + (i % 5) * 0.25;
        const curY = (startY - frame * speed + 1080) % 1080;
        const size = 3 + (i % 4) * 2;
        const pOpacity = 0.2 + 0.4 * Math.sin(frame * 0.05 + i);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: posX,
              top: curY,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? CELESTE : GOLD,
              opacity: pOpacity,
              filter: "blur(1px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Main Perspective Container */}
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
        {/* ⚽ PHASE 1: THE HOOK / AGITATION (0 - 95 frames)                */}
        {/* ============================================================== */}
        {frame < 95 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 100px",
            }}
          >
            {/* Top Broadcast Pill */}
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
                    backgroundColor: "rgba(116, 172, 223, 0.12)",
                    border: `1.5px solid ${CELESTE}`,
                    borderRadius: 999,
                    padding: "10px 28px",
                    marginBottom: 36,
                    boxShadow: `0 0 25px ${ACCENT_GLOW}`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>🇦🇷 ⚽ 🏆</span>
                  <span
                    style={{
                      fontSize: 16,
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

            {/* Kinetic Typography Hook Words */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "18px 26px",
                maxWidth: 1400,
                marginBottom: 36,
              }}
            >
              {hookWords.map((word, idx) => {
                const wSpring = getSpring(10 + idx * 6, 13, 210);
                return (
                  <span
                    key={idx}
                    style={{
                      fontSize: 68,
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                      opacity: wSpring,
                      transform: `translateY(${(1 - wSpring) * 35}px) scale(${0.8 + 0.2 * wSpring})`,
                      color: word.highlight ? GOLD : WHITE,
                      textShadow: word.highlight
                        ? `0 0 35px rgba(245, 158, 11, 0.6)`
                        : `0 4px 20px rgba(0,0,0,0.8)`,
                    }}
                  >
                    {word.text}
                  </span>
                );
              })}
            </div>

            {/* Animated Dribble Arc Line & Subtitle */}
            {(() => {
              const subSpring = getSpring(48);
              return (
                <div
                  style={{
                    opacity: subSpring,
                    transform: `translateY(${(1 - subSpring) * 20}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      width: interpolate(frame, [45, 75], [0, 380], {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }),
                      background: `linear-gradient(to right, transparent, ${CELESTE}, ${GOLD}, transparent)`,
                      borderRadius: 2,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.8)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    EL FÚTBOL REAL SE JUEGA CON PASIÓN Y ASCENSO
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 🛡️ PHASE 2: 3D CLUB CRESTS & REAL DECISION ENGINE (95 - 215f) */}
        {/* ============================================================== */}
        {frame >= 95 && frame < 215 && (
          <div
            style={{
              width: 1600,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 60,
              padding: "0 40px",
            }}
          >
            {/* Left Column: 3D Shield Cards Carousel */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: "0.2em",
                  color: CELESTE,
                  textTransform: "uppercase",
                  marginBottom: -8,
                }}
              >
                // 378 CLUBES REALES · 7 PAÍSES
              </div>
              <h2
                style={{
                  fontSize: 46,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Desde la Bombonera hasta el{" "}
                <span style={{ color: GOLD }}>Ascenso Profundo</span>
              </h2>

              {/* 3D Shield Floating Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 18,
                  marginTop: 16,
                }}
              >
                {[
                  { name: "AFA Oficial", file: "gambeta/afa-128.png", sub: "Liga Profesional" },
                  { name: "Boca Juniors", file: "gambeta/boca-juniors-128.png", sub: "Primera División" },
                  { name: "River Plate", file: "gambeta/river-plate-128.png", sub: "Primera División" },
                  { name: "Talleres (Cba)", file: "gambeta/talleres-cba.png", sub: "Interior Caliente" },
                ].map((item, idx) => {
                  const cardSpring = getSpring(105 + idx * 8, 12, 190);
                  const tiltY = Math.sin(frame * 0.08 + idx) * 8;
                  const tiltX = Math.cos(frame * 0.08 + idx) * 6;

                  return (
                    <div
                      key={idx}
                      style={{
                        opacity: cardSpring,
                        transform: `
                          translateY(${(1 - cardSpring) * 35}px)
                          perspective(800px)
                          rotateY(${tiltY}deg)
                          rotateX(${tiltX}deg)
                        `,
                        backgroundColor: "rgba(15, 30, 52, 0.75)",
                        border: "1.5px solid rgba(116, 172, 223, 0.25)",
                        borderRadius: 16,
                        padding: "24px 16px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <div
                        style={{
                          width: 86,
                          height: 86,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 14,
                        }}
                      >
                        <Img
                          src={staticFile(item.file)}
                          style={{
                            maxHeight: 76,
                            maxWidth: 76,
                            objectFit: "contain",
                            filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.6))",
                          }}
                        />
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: WHITE }}>
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.5)",
                          marginTop: 4,
                        }}
                      >
                        {item.sub}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Decision Clutch Engine */}
            {(() => {
              const hudSpring = getSpring(125, 14, 170);
              const decisionSelected = frame > 165;
              const choiceSpring = getSpring(165, 12, 220);

              return (
                <div
                  style={{
                    width: 580,
                    opacity: hudSpring,
                    transform: `translateX(${(1 - hudSpring) * 45}px)`,
                    backgroundColor: "rgba(10, 20, 36, 0.85)",
                    border: "1.5px solid rgba(116, 172, 223, 0.35)",
                    borderRadius: 20,
                    padding: 36,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(116, 172, 223, 0.05)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                      paddingBottom: 16,
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#EF4444",
                          boxShadow: "0 0 10px #EF4444",
                        }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.1em", color: "#EF4444" }}>
                        EN VIVO · MINUTO 88'
                      </span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>
                      CLÁSICO CALIENTE
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      lineHeight: 1.35,
                      color: WHITE,
                      marginBottom: 24,
                    }}
                  >
                    Tiro libre al borde del área. La hinchada ruge. ¿Qué le ordenás al 10?
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { key: "A", text: "Pegarle con comba al palo del arquero", chosen: true },
                      { key: "B", text: "Centro pinchado al segundo palo", chosen: false },
                      { key: "C", text: "Jugada preparada y toque corto", chosen: false },
                    ].map((opt, i) => {
                      const isTarget = opt.chosen && decisionSelected;
                      return (
                        <div
                          key={i}
                          style={{
                            padding: "14px 18px",
                            borderRadius: 12,
                            backgroundColor: isTarget
                              ? "rgba(245, 158, 11, 0.25)"
                              : "rgba(255, 255, 255, 0.05)",
                            border: `1.5px solid ${isTarget ? GOLD : "rgba(255, 255, 255, 0.1)"}`,
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            transform: isTarget ? `scale(${1 + 0.03 * choiceSpring})` : "none",
                            boxShadow: isTarget ? "0 0 25px rgba(245, 158, 11, 0.4)" : "none",
                          }}
                        >
                          <span
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              backgroundColor: isTarget ? GOLD : "rgba(255,255,255,0.15)",
                              color: isTarget ? "#000" : WHITE,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 900,
                              fontSize: 14,
                            }}
                          >
                            {opt.key}
                          </span>
                          <span style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {decisionSelected && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: "12px 16px",
                        borderRadius: 10,
                        backgroundColor: "rgba(16, 185, 129, 0.2)",
                        border: "1px solid #10B981",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        opacity: choiceSpring,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>⚽🔥</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "#10B981" }}>
                        ¡GOLAZO AL ÁNGULO! +3 PUNTOS · MORAL AL MÁXIMO
                      </span>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* 📊 PHASE 3: KINETIC SCALE & RÉCORD STATS (215 - 335f)          */}
        {/* ============================================================== */}
        {frame >= 215 && frame < 335 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              width: 1400,
            }}
          >
            {/* Header Tag */}
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: CELESTE,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              // DIMENSIÓN Y PROFUNDIDAD INIGUALABLE
            </div>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: 50,
              }}
            >
              El único juego con todo el continente conectado
            </h2>

            {/* 3 Massive Kinetic Spring Stat Boxes */}
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
                  label: "ASCENSO REAL Y PROFUNDO",
                  sub: "Primera, B Nacional, Metro, Federal",
                  color: GOLD,
                  delay: 235,
                },
                {
                  from: 50,
                  to: 378,
                  suffix: " CLUBES",
                  label: "PLANTELES Y MÍSTICA",
                  sub: "Planteles, presupuestos y clásicos",
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
                      opacity: sSpring,
                      transform: `translateY(${(1 - sSpring) * 45}px) scale(${0.85 + 0.15 * sSpring})`,
                      backgroundColor: "rgba(12, 24, 44, 0.8)",
                      border: `2px solid ${stat.color}55`,
                      borderRadius: 24,
                      padding: "44px 30px",
                      boxShadow: `0 20px 50px rgba(0,0,0,0.6), inset 0 0 30px ${stat.color}15`,
                      backdropFilter: "blur(14px)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 68,
                        fontWeight: 900,
                        color: stat.color,
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        marginBottom: 16,
                        textShadow: `0 0 35px ${stat.color}66`,
                      }}
                    >
                      {currentVal}
                      <span style={{ fontSize: 32, fontWeight: 700 }}>
                        {stat.suffix}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: WHITE,
                        marginBottom: 8,
                      }}
                    >
                      {stat.label}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "rgba(255, 255, 255, 0.65)",
                      }}
                    >
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 🏆 PHASE 4: STADIUM CLIMAX & OUTRO LOCKUP (335 - 450f)          */}
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
            {/* Gambeta Emblem Logo with Burst Glow */}
            {(() => {
              const logoSpring = getSpring(338, 12, 170);
              const logoScale = 0.8 + 0.2 * logoSpring;
              const glowPulse = 0.8 + 0.2 * Math.sin(frame * 0.15);

              return (
                <div
                  style={{
                    opacity: logoSpring,
                    transform: `scale(${logoScale}) translateY(${(1 - logoSpring) * -30}px)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: 24,
                  }}
                >
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      filter: `drop-shadow(0 0 ${40 * glowPulse}px rgba(116, 172, 223, 0.8))`,
                    }}
                  >
                    <Img
                      src={staticFile("gambeta/gambeta-logo.svg")}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </div>
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
                      background: `linear-gradient(to bottom, #FFFFFF 30%, ${CELESTE} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textShadow: `0 10px 40px rgba(0,0,0,0.8)`,
                    }}
                  >
                    GAMBETA
                  </h1>

                  <p
                    style={{
                      fontSize: 28,
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.85)",
                      maxWidth: 800,
                      margin: "0 0 36px 0",
                    }}
                  >
                    El Modo Carrera de Fútbol Sudamericano Definitivo
                  </p>
                </div>
              );
            })()}

            {/* Big Web Link Call to Action */}
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
                      backgroundColor: GOLD,
                      color: "#050B14",
                      padding: "20px 48px",
                      borderRadius: 999,
                      fontSize: 28,
                      fontWeight: 900,
                      letterSpacing: "0.02em",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      boxShadow: "0 0 50px rgba(245, 158, 11, 0.7)",
                    }}
                  >
                    <span>JUGAR GRATIS AHORA</span>
                    <span style={{ fontSize: 32 }}>➔</span>
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 24,
                      fontWeight: 700,
                      color: CELESTE,
                      letterSpacing: "0.05em",
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
