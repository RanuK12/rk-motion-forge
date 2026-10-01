import React from "react";

interface DitherIconProps {
  type?: "database" | "chart" | "terminal" | "bot" | "rocket";
  size?: number;
  accent?: string;
  bg?: string;
}

export const DitherIcon: React.FC<DitherIconProps> = ({
  type = "chart",
  size = 84,
  accent = "#2563EB",
  bg = "#0A0A0A",
}) => {
  if (type === "database") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" rx="14" fill={bg} />
        <circle cx="35" cy="35" r="5" fill="#FFFFFF" />
        <circle cx="65" cy="35" r="5" fill="#FFFFFF" />
        <circle cx="35" cy="65" r="5" fill="#FFFFFF" />
        <circle cx="65" cy="65" r="5" fill="#FFFFFF" />
        <rect x="42" y="42" width="16" height="16" fill={accent} />
      </svg>
    );
  }

  if (type === "terminal") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" rx="14" fill={bg} />
        <path d="M30 40 L45 50 L30 60" stroke={accent} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="52" y1="60" x2="70" y2="60" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "bot") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="20" y="25" width="60" height="50" rx="12" fill={bg} />
        <circle cx="40" cy="48" r="6" fill={accent} />
        <circle cx="60" cy="48" r="6" fill={accent} />
        <rect x="36" y="60" width="28" height="5" rx="2" fill="#FFFFFF" />
        <line x1="50" y1="25" x2="50" y2="15" stroke={bg} strokeWidth="4" />
        <circle cx="50" cy="12" r="5" fill={accent} />
      </svg>
    );
  }

  if (type === "rocket") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" rx="14" fill={bg} />
        <path d="M50 25 C65 35 70 55 70 65 L30 65 C30 55 35 35 50 25 Z" fill="#FFFFFF" />
        <circle cx="50" cy="45" r="8" fill={accent} />
        <path d="M42 65 L50 80 L58 65 Z" fill={accent} />
      </svg>
    );
  }

  // Default: Chart
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="15" y="15" width="70" height="70" rx="14" fill={accent} />
      <rect x="30" y="55" width="10" height="25" fill="#FFFFFF" />
      <rect x="46" y="38" width="10" height="42" fill="#FFFFFF" />
      <rect x="62" y="24" width="10" height="56" fill="#FFFFFF" />
    </svg>
  );
};
