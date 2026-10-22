import React from "react";

interface GlassmorphicWindowProps {
  title?: string;
  badge?: string;
  badgeColor?: string;
  width?: number | string;
  height?: number | string;
  tiltX?: number;
  tiltY?: number;
  scale?: number;
  panX?: number;
  panY?: number;
  children: React.ReactNode;
}

export const GlassmorphicWindow: React.FC<GlassmorphicWindowProps> = ({
  title = "Terminal — 60 FPS",
  badge,
  badgeColor = "#10B981",
  width = 1200,
  height = 700,
  tiltX = 0,
  tiltY = 0,
  scale = 1,
  panX = 0,
  panY = 0,
  children,
}) => {
  return (
    <div
      style={{
        width,
        height,
        transform: `perspective(1200px) translate3d(${panX}px, ${panY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
        borderRadius: 16,
        background: "rgba(13, 17, 23, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: `
          0 30px 80px rgba(0, 0, 0, 0.7),
          0 0 1px rgba(255, 255, 255, 0.2),
          inset 0 1px 1px rgba(255, 255, 255, 0.15)
        `,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Window Titlebar */}
      <div
        style={{
          height: 48,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          userSelect: "none",
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EF4444", boxShadow: "0 0 8px rgba(239,68,68,0.5)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#F59E0B", boxShadow: "0 0 8px rgba(245,158,11,0.5)" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.5)" }} />
        </div>

        {/* Window Title */}
        <div
          style={{
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.65)",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </div>

        {/* Optional Status Badge */}
        <div>
          {badge ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: `1px solid ${badgeColor}44`,
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: badgeColor,
                  boxShadow: `0 0 8px ${badgeColor}`,
                }}
              />
              {badge}
            </div>
          ) : (
            <div style={{ width: 40 }} />
          )}
        </div>
      </div>

      {/* Window Body */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
};
