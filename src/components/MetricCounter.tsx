import React from "react";
import { interpolate } from "remotion";

interface MetricCounterProps {
  label: string;
  fromValue: number;
  toValue: number;
  progress: number; // 0 to 1
  decimals?: number;
  prefix?: string;
  suffix?: string;
  subLabel?: string;
  accentColor?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  label,
  fromValue,
  toValue,
  progress,
  decimals = 0,
  prefix = "",
  suffix = "",
  subLabel,
  accentColor = "#3B82F6",
}) => {
  const currentNum = interpolate(progress, [0, 1], [fromValue, toValue], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const formattedNum = decimals > 0 ? currentNum.toFixed(decimals) : Math.round(currentNum).toLocaleString();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 12,
        padding: "16px 22px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "Inter, -apple-system, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.5)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "JetBrains Mono, Menlo, monospace",
          fontSize: 32,
          fontWeight: 800,
          color: accentColor,
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {prefix}
        {formattedNum}
        {suffix}
      </div>

      {subLabel && (
        <div
          style={{
            fontFamily: "Inter, -apple-system, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.65)",
            marginTop: 8,
          }}
        >
          {subLabel}
        </div>
      )}
    </div>
  );
};
