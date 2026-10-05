import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  staticFile,
  Img,
} from "remotion";
import defaultShots from "../data/shots.json";

export interface MosaicVideoProps {
  productName?: string;
  finalPhrase?: string;
  url?: string;
  shots?: string[];
}

export const MosaicVideo: React.FC<MosaicVideoProps> = ({
  productName = "DataCanvas BI",
  finalPhrase = "366 products. one grid.",
  url = "ranuk.dev",
  shots = defaultShots,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 20 seconds @ 30 fps = 600 frames
  // Scene 1: 0 - 90 frames (0-3s) -> Full screen hero capture + label + still cursor
  // Scene 2: 90 - 240 frames (3-8s) -> Zoom out into 4-column grid (gap 8px, bg #f4f4f2)
  // Scene 3: 240 - 480 frames (8-16s) -> Continued smooth zoom out to reveal all 80 captures
  // Scene 4: 480 - 600 frames (16-20s) -> Freeze general shot + bottom black phrase & domain

  // Cap at maximum 80 images as per rules
  const imageList = (shots && shots.length > 0 ? shots : defaultShots).slice(0, 80);
  const heroImage = imageList[0] || "datacanvas_screenshot.png";

  // Grid layout parameters
  const cols = 4;
  const gap = 8;
  const numRows = Math.ceil(imageList.length / cols);

  // Cell aspect ratio 16:10 -> e.g. 400px width x 250px height
  const cellWidth = 440;
  const cellHeight = 275; // 440 * 10 / 16 = 275px (16:10 exact)

  const totalGridWidth = cols * cellWidth + (cols - 1) * gap;
  const totalGridHeight = numRows * cellHeight + (numRows - 1) * gap;

  // Hero cell (cell 0) center in grid coordinates
  const heroCenterX = cellWidth / 2;
  const heroCenterY = cellHeight / 2;

  // Full grid center coordinates
  const fullGridCenterX = totalGridWidth / 2;
  const fullGridCenterY = totalGridHeight / 2;

  // Zoom scales
  // Initial scale: hero cell fills 1920x1080 viewport
  const initialScale = Math.max(width / cellWidth, height / cellHeight); // ~4.36
  // Final scale: all 80 captures visible in viewport with padding for bottom text
  // Target visible grid height ~ 820px out of 1080px
  const targetScale = Math.min(
    (width - 80) / totalGridWidth,
    (height - 240) / totalGridHeight
  ); // ~0.14 - 0.16

  // Smooth continuous zoom out between frame 90 and frame 480 (ease in-out, NO bounce)
  const zoomProgress = interpolate(frame, [90, 480], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentScale = interpolate(
    zoomProgress,
    [0, 1],
    [initialScale, targetScale]
  );

  const currentCenterX = interpolate(
    zoomProgress,
    [0, 1],
    [heroCenterX, fullGridCenterX]
  );

  const currentCenterY = interpolate(
    zoomProgress,
    [0, 1],
    [heroCenterY, fullGridCenterY]
  );

  // Translate grid so that (currentCenterX, currentCenterY) is mapped to screen center
  const screenCenterX = width / 2;
  // In the final scene, shift grid slightly upwards (e.g. -40px) to give space for bottom text
  const screenCenterYShift = interpolate(zoomProgress, [0, 1], [0, -50]);
  const screenCenterY = height / 2 + screenCenterYShift;

  const translateX = screenCenterX - currentCenterX * currentScale;
  const translateY = screenCenterY - currentCenterY * currentScale;

  // Label bottom-left opacity (0-3s, fades out as zoom begins)
  const labelOpacity = interpolate(frame, [0, 10, 85, 95], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor opacity (still cursor 0-3s, fades as zoom starts)
  const cursorOpacity = interpolate(frame, [0, 15, 80, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scene 4 final text opacity (16-20s, frames 480-600)
  const finalTextOpacity = interpolate(frame, [480, 500], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#f4f4f2",
        color: "#0A0A0A",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("music.mp3")} />

      {/* Grid Canvas with smooth zoom-out transform */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: totalGridWidth,
          height: totalGridHeight,
          transformOrigin: "0 0",
          transform: `translate(${translateX}px, ${translateY}px) scale(${currentScale})`,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellWidth}px)`,
          gap: `${gap}px`,
        }}
      >
        {imageList.map((imgName, index) => {
          return (
            <div
              key={index}
              style={{
                width: cellWidth,
                height: cellHeight,
                backgroundColor: "#E5E5E3",
                overflow: "hidden",
                borderRadius: 4,
                position: "relative",
              }}
            >
              <Img
                src={staticFile(`shots/${imgName}`)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Scene 1 (0-3s): Bottom-Left URL Label */}
      {labelOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 56,
            backgroundColor: "rgba(10, 10, 10, 0.85)",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: 8,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.02em",
            backdropFilter: "blur(12px)",
            opacity: labelOpacity,
            zIndex: 40,
          }}
        >
          {url}
        </div>
      )}

      {/* Scene 1 (0-3s): Still Mouse Cursor */}
      {cursorOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            top: 520,
            left: 880,
            opacity: cursorOpacity,
            zIndex: 50,
            pointerEvents: "none",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
          }}
        >
          {/* Crisp SVG macOS pointer cursor */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 3L10.5 21L13.5 13.5L21 10.5L3 3Z"
              fill="#0A0A0A"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Scene 4 (16-20s): Freeze Plano General + Bottom Text in Black */}
      {frame >= 480 && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            opacity: finalTextOpacity,
            zIndex: 60,
          }}
        >
          {/* Main final phrase: clean, solid black, no gradient, no giant logo */}
          <div
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            {finalPhrase}
          </div>

          {/* Domain in clean secondary black / neutral */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#525252",
              letterSpacing: "0.02em",
            }}
          >
            {url}
          </div>
        </div>
      )}
    </div>
  );
};
