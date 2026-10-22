import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface CyberGridBackgroundProps {
  accentColor?: string;
  glowIntensity?: number;
  showGrid?: boolean;
}

export const CyberGridBackground: React.FC<CyberGridBackgroundProps> = ({
  accentColor = "#3B82F6",
  glowIntensity = 1,
  showGrid = true,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing glow
  const pulse = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.75 * glowIntensity, 1.15 * glowIntensity]
  );

  // Slow subtle grid drift
  const gridOffsetY = (frame * 0.5) % 40;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#07090E",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Radial ambient glow in the product accent color */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1400,
          height: 900,
          background: `radial-gradient(circle, ${accentColor}33 0%, ${accentColor}11 40%, transparent 75%)`,
          filter: "blur(60px)",
          opacity: pulse,
          pointerEvents: "none",
        }}
      />

      {/* Secondary accent glow bottom-right for chromatic depth */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: 800,
          height: 600,
          background: `radial-gradient(circle, #8B5CF622 0%, transparent 70%)`,
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle blueprint grid */}
      {showGrid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            backgroundPosition: `0px ${gridOffsetY}px`,
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
          }}
        />
      )}

      {/* Vignette edge shading */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.85)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
