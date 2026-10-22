import React from "react";
import { interpolate } from "remotion";

interface InteractiveCursorProps {
  x: number;
  y: number;
  isClicking?: boolean;
  clickFrameOffset?: number; // relative frame since click started (0 to ~15)
  accentColor?: string;
}

export const InteractiveCursor: React.FC<InteractiveCursorProps> = ({
  x,
  y,
  isClicking = false,
  clickFrameOffset = 0,
  accentColor = "#3B82F6",
}) => {
  // Click ripple expansion
  const rippleScale = interpolate(clickFrameOffset, [0, 15], [0.3, 2.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rippleOpacity = interpolate(clickFrameOffset, [0, 15], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate(-2px, -2px) scale(${isClicking ? 0.88 : 1})`,
        transition: "transform 0.08s ease-out",
      }}
    >
      {/* Click ripple animation */}
      {isClicking && clickFrameOffset >= 0 && clickFrameOffset <= 15 && (
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            width: 32,
            height: 32,
            borderRadius: "50%",
            transform: `translate(-50%, -50%) scale(${rippleScale})`,
            border: `2px solid ${accentColor}`,
            backgroundColor: `${accentColor}22`,
            opacity: rippleOpacity,
          }}
        />
      )}

      {/* Modern Cursor SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))",
        }}
      >
        <path
          d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
          fill="#FFFFFF"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
