import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from "remotion";

export const FlightRadarVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 15s @ 30fps = 450 frames
  // Scene 1 (0-90f): Air Traffic Radar Sweep & Global Airport Grid
  // Scene 2 (90-230f): Live Fare Drop Meter & Autonomous Scraper Daemon
  // Scene 3 (230-350f): Instant Telegram Push Notification
  // Scene 4 (350-450f): Open Source Outro & GitHub CTA

  const getSpring = (offset: number) => {
    return spring({
      frame: frame - offset,
      fps,
      config: { damping: 14, mass: 0.6, stiffness: 220 },
    });
  };

  // Rotating radar angle (360 deg sweep)
  const radarAngle = (frame * 5) % 360;

  // Animated airplane flight progress along arc (0 to 1)
  const flightProgress = interpolate(frame, [30, 220], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Price drop counter from $1280 down to $419
  const currentPrice = Math.round(
    interpolate(frame, [110, 170], [1280, 419], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Scraper counter: flights scanned
  const flightsScanned = Math.floor(
    interpolate(frame, [0, 450], [1420, 9840], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Telegram notification slide-in spring
  const tgSlide = getSpring(230);
  const tgY = interpolate(tgSlide, [0, 1], [-180, 0]);

  // Outro spring
  const outroSlide = getSpring(350);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#030712",
        color: "#FFFFFF",
        fontFamily: "'JetBrains Mono', 'SF Pro Display', -apple-system, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Cockpit / Radar Dark Grid Texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 70%), linear-gradient(rgba(14, 165, 233, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Top HUD Telemetry Bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          borderBottom: "1px solid rgba(6, 182, 212, 0.2)",
          backgroundColor: "rgba(3, 7, 18, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          zIndex: 40,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#10B981",
              boxShadow: "0 0 12px #10B981",
            }}
          />
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 2, color: "#06B6D4" }}>
            FLIGHT RADAR ENGINE
          </span>
          <span style={{ fontSize: 13, color: "#64748B", marginLeft: 8 }}>v2.4.0 • AUTONOMOUS</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28, fontSize: 14, color: "#94A3B8" }}>
          <div>
            DAEMON: <span style={{ color: "#10B981", fontWeight: 600 }}>ONLINE</span>
          </div>
          <div>
            CARRIERS: <span style={{ color: "#F8FAFC", fontWeight: 600 }}>48 AIRLINES</span>
          </div>
          <div>
            ROUTES CHECKED: <span style={{ color: "#38BDF8", fontWeight: 700 }}>{flightsScanned.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Scene 1 & 2: Center Flight Radar & Route Trajectory (0 to 350 frames) */}
      {frame < 360 && (
        <div
          style={{
            position: "absolute",
            inset: "64px 0 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px 80px",
          }}
        >
          {/* Left Column: Rotating Aviation Radar */}
          <div
            style={{
              position: "relative",
              width: 640,
              height: 640,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Concentric Radar Rings */}
            {[160, 320, 480, 620].map((size, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: "50%",
                  border: "1px dashed rgba(6, 182, 212, 0.25)",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Radar Crosshairs */}
            <div style={{ position: "absolute", width: 620, height: 1, backgroundColor: "rgba(6, 182, 212, 0.15)" }} />
            <div style={{ position: "absolute", height: 620, width: 1, backgroundColor: "rgba(6, 182, 212, 0.15)" }} />

            {/* Rotating Radar Sweep Cone */}
            <div
              style={{
                position: "absolute",
                width: 310,
                height: 310,
                top: 10,
                left: 320,
                transformOrigin: "0% 100%",
                transform: `rotate(${radarAngle}deg)`,
                background: "conic-gradient(from 0deg at 0% 100%, rgba(6, 182, 212, 0.35) 0deg, rgba(6, 182, 212, 0) 60deg)",
                pointerEvents: "none",
              }}
            />

            {/* Airport Nodes on Radar */}
            {/* EZE (Buenos Aires) */}
            <div
              style={{
                position: "absolute",
                top: 440,
                left: 180,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#06B6D4",
                  boxShadow: "0 0 16px #06B6D4",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#E2E8F0", marginTop: 6 }}>EZE (BUE)</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>Origin</span>
            </div>

            {/* MAD (Madrid) */}
            <div
              style={{
                position: "absolute",
                top: 180,
                left: 450,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 16px #10B981",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981", marginTop: 6 }}>MAD (MADRID)</span>
              <span style={{ fontSize: 11, color: "#64748B" }}>Target Alert</span>
            </div>

            {/* JFK */}
            <div style={{ position: "absolute", top: 160, left: 220, opacity: 0.5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#64748B" }} />
              <span style={{ fontSize: 10, color: "#64748B" }}>JFK</span>
            </div>

            {/* NRT */}
            <div style={{ position: "absolute", top: 380, left: 520, opacity: 0.5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#64748B" }} />
              <span style={{ fontSize: 10, color: "#64748B" }}>NRT</span>
            </div>

            {/* Glowing SVG Flight Arc from EZE to MAD */}
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id="flightGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.9" />
                </linearGradient>
              </defs>
              <path
                d="M 187 447 Q 260 220 457 187"
                fill="none"
                stroke="url(#flightGlow)"
                strokeWidth="3.5"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Animated Plane Icon along arc */}
            {(() => {
              // Quadratic bezier approximation
              const t = flightProgress;
              const px = (1 - t) * (1 - t) * 187 + 2 * (1 - t) * t * 260 + t * t * 457;
              const py = (1 - t) * (1 - t) * 447 + 2 * (1 - t) * t * 220 + t * t * 187;
              return (
                <div
                  style={{
                    position: "absolute",
                    left: px - 14,
                    top: py - 14,
                    width: 28,
                    height: 28,
                    backgroundColor: "#FFFFFF",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px #38BDF8, 0 0 40px #10B981",
                    transform: "rotate(35deg)",
                  }}
                >
                  <span style={{ fontSize: 14 }}>✈️</span>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Live Price Drop Card & Scanner Status */}
          <div
            style={{
              width: 780,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {/* Hook Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: frame >= 120 ? "rgba(239, 68, 68, 0.18)" : "rgba(6, 182, 212, 0.15)",
                border: frame >= 120 ? "1px solid #EF4444" : "1px solid #06B6D4",
                color: frame >= 120 ? "#FCA5A5" : "#38BDF8",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              <span>{frame >= 120 ? "🚨 AIRLINE FARE DROP DETECTED" : "📡 MONITORING 48 AIRLINE APIS"}</span>
            </div>

            {/* Main Flight Route Header */}
            <div>
              <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, lineHeight: 1.2 }}>
                Buenos Aires ➔ Madrid
              </div>
              <div style={{ fontSize: 20, color: "#94A3B8", marginTop: 6 }}>
                Roundtrip • Non-stop • Iberia / LEVEL Airlines
              </div>
            </div>

            {/* Live Pricing Box */}
            <div
              style={{
                padding: "32px 40px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 14, color: "#64748B", textTransform: "uppercase", letterSpacing: 1.5 }}>
                  Historic Average
                </div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: 700,
                    color: "#64748B",
                    textDecoration: "line-through",
                    marginTop: 4,
                  }}
                >
                  $1,280 USD
                </div>
              </div>

              {/* Price Drop Arrow */}
              <div
                style={{
                  fontSize: 32,
                  color: "#10B981",
                  fontWeight: 900,
                  transform: "scale(1.2)",
                }}
              >
                ➔
              </div>

              <div>
                <div style={{ fontSize: 14, color: "#10B981", textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>
                  Found by Radar Bot
                </div>
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 900,
                    color: "#10B981",
                    textShadow: "0 0 30px rgba(16, 185, 129, 0.4)",
                    lineHeight: 1,
                    marginTop: 4,
                  }}
                >
                  ${currentPrice} <span style={{ fontSize: 24, fontWeight: 600 }}>USD</span>
                </div>
              </div>

              <div
                style={{
                  padding: "10px 18px",
                  borderRadius: 12,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid #10B981",
                  color: "#10B981",
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                -67% OFF
              </div>
            </div>

            {/* Telegram Notification Slide Down in Scene 3 (frame 230+) */}
            <div
              style={{
                transform: `translateY(${tgY}px)`,
                opacity: tgSlide,
                padding: "20px 24px",
                borderRadius: 16,
                backgroundColor: "rgba(30, 41, 59, 0.95)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 16px 36px rgba(0, 0, 0, 0.6)",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: "#0284C7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                ✈️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#38BDF8" }}>Flight Price Alert • Telegram</span>
                  <span style={{ fontSize: 12, color: "#64748B" }}>now</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#F8FAFC", marginTop: 2 }}>
                  ⚡ CHEAP FLIGHT ALERT: EZE to MAD for $419!
                </div>
                <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                  3 seats left at this fare. Roundtrip departing Nov 12. Tap to book direct on airline.
                </div>
              </div>
            </div>

            {/* Scraper Terminal Line at Bottom */}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                color: "#64748B",
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                padding: "10px 18px",
                borderRadius: 8,
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <span style={{ color: "#10B981" }}>➜ daemon:</span> Querying Google Flights & ITA Matrix API (cycle #842) • Latency: 284ms • Captchas: 0
            </div>
          </div>
        </div>
      )}

      {/* Scene 4: Outro CTA (350 to 450 frames) */}
      {frame >= 350 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(3, 7, 18, 0.96)",
            zIndex: 50,
            transform: `scale(${interpolate(outroSlide, [0, 1], [0.92, 1])})`,
            opacity: outroSlide,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid #06B6D4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              boxShadow: "0 0 50px rgba(6, 182, 212, 0.4)",
              marginBottom: 24,
            }}
          >
            ✈️
          </div>

          <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -1, textAlign: "center" }}>
            Flight Price Alert
          </div>

          <div
            style={{
              fontSize: 24,
              color: "#94A3B8",
              marginTop: 12,
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Never pay full price for airline tickets again. Run your own 24/7 background flight radar.
          </div>

          <div
            style={{
              marginTop: 36,
              padding: "18px 42px",
              borderRadius: 14,
              backgroundColor: "#0284C7",
              color: "#FFFFFF",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 10px 40px rgba(2, 132, 199, 0.5)",
              letterSpacing: 0.5,
            }}
          >
            github.com/RanuK12/Flight-Price-Alert
          </div>

          <div style={{ fontSize: 14, color: "#64748B", marginTop: 20 }}>
            100% Free & Open Source • Self-Hosted • Instant Telegram Alerts
          </div>
        </div>
      )}
    </div>
  );
};
