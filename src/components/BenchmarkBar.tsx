import React from "react";
import { interpolate } from "remotion";

interface BenchmarkBarProps {
  label: string;
  legacyTitle: string;
  legacyValue: string;
  legacyWidthPercent: number;
  ranukTitle: string;
  ranukValue: string;
  ranukWidthPercent: number;
  progress: number; // 0 to 1
  accentColor?: string;
}

export const BenchmarkBar: React.FC<BenchmarkBarProps> = ({
  label,
  legacyTitle,
  legacyValue,
  legacyWidthPercent,
  ranukTitle,
  ranukValue,
  ranukWidthPercent,
  progress,
  accentColor = "#10B981",
}) => {
  const currentProgress = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        borderRadius: 14,
        padding: "20px 24px",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.55)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>

      {/* Legacy Row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
          <span>{legacyTitle}</span>
          <span style={{ fontFamily: "monospace", color: "#EF4444" }}>{legacyValue}</span>
        </div>
        <div style={{ height: 10, width: "100%", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 5, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${legacyWidthPercent * currentProgress}%`,
              backgroundColor: "#EF444499",
              borderRadius: 5,
            }}
          />
        </div>
      </div>

      {/* Ranuk Instant Row */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: accentColor }}>✦</span> {ranukTitle}
          </span>
          <span style={{ fontFamily: "monospace", color: accentColor, fontWeight: 800 }}>{ranukValue}</span>
        </div>
        <div style={{ height: 12, width: "100%", backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 6, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${ranukWidthPercent * currentProgress}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 16px ${accentColor}`,
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </div>
  );
};
