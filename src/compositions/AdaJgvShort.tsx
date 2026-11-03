import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

/**
 * Short vertical 1080x1920 - Auditoría ADA JGV Estudio Jurídico.
 * Datos REALES de ~/Desktop/Oficina_Ranuk/auditorias/ADA-JGV-Estudio-Juridico-2026-11-02.md
 *  - 2 elementos H1 en la home (debería haber 1)
 *  - 9 de 9 imágenes sin atributo alt
 */

const BG = "#0B1220";
const ACCENT = "#FF3B30";
const OK = "#00E5A0";
const TXT = "#F5F7FA";
const MUTED = "#8A97AB";

const FONT =
  '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const fadeUp = (frame: number, delay: number, dur = 18) =>
  interpolate(frame - delay, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const Slide: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: BG,
      fontFamily: FONT,
      padding: "150px 80px",
      justifyContent: "center",
    }}
  >
    {children}
  </AbsoluteFill>
);

const Tag: React.FC<{ text: string; color?: string }> = ({ text, color = ACCENT }) => (
  <div
    style={{
      display: "inline-block",
      border: `3px solid ${color}`,
      color,
      borderRadius: 999,
      padding: "14px 34px",
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: 2,
      marginBottom: 44,
    }}
  >
    {text}
  </div>
);

// ---------- Escena 1: HOOK (0-4.5s) ----------
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <Slide>
      <Tag text="AUDITORÍA WEB · 60 SEGUNDOS" />
      <div
        style={{
          color: TXT,
          fontSize: 104,
          fontWeight: 900,
          lineHeight: 1.05,
          transform: `scale(${0.92 + s * 0.08})`,
          opacity: s,
        }}
      >
        Un sitio
        <br />
        jurídico
        <br />
        <span style={{ color: ACCENT }}>inaccesible</span>
        <br />
        es riesgo legal.
      </div>
      <div
        style={{
          color: MUTED,
          fontSize: 42,
          marginTop: 48,
          opacity: fadeUp(frame, 26),
          lineHeight: 1.35,
        }}
      >
        Si tu cliente no puede leer tu web,
        <br />
        no puede contratarte.
      </div>
    </Slide>
  );
};

// ---------- Escena 2: HALLAZGO 1 ----------
const Finding1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Slide>
      <Tag text="HALLAZGO 01" />
      <div style={{ color: TXT, fontSize: 76, fontWeight: 800, lineHeight: 1.15, opacity: fadeUp(frame, 0) }}>
        La home tiene
        <br />
        <span style={{ color: ACCENT, fontSize: 190, fontWeight: 900 }}>2</span>
        <br />
        encabezados H1
      </div>
      <div style={{ color: MUTED, fontSize: 40, marginTop: 52, opacity: fadeUp(frame, 22), lineHeight: 1.4 }}>
        Debería haber uno solo.
        <br />
        Los lectores de pantalla
        <br />
        no saben qué título es el real.
      </div>
    </Slide>
  );
};

// ---------- Escena 3: HALLAZGO 2 ----------
const Finding2: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Slide>
      <Tag text="HALLAZGO 02" />
      <div style={{ color: TXT, fontSize: 76, fontWeight: 800, lineHeight: 1.15, opacity: fadeUp(frame, 0) }}>
        <span style={{ color: ACCENT, fontSize: 190, fontWeight: 900 }}>9/9</span>
        <br />
        imágenes
        <br />
        sin texto alt
      </div>
      <div style={{ color: MUTED, fontSize: 40, marginTop: 52, opacity: fadeUp(frame, 22), lineHeight: 1.4 }}>
        Ninguna imagen tiene descripción.
        <br />
        Un cliente ciego no recibe
        <br />
        <span style={{ color: TXT, fontWeight: 700 }}>ninguna</span> información visual.
      </div>
    </Slide>
  );
};

// ---------- Escena 4: CTA ----------
const Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  return (
    <Slide>
      <div style={{ opacity: s, transform: `translateY(${(1 - s) * 40}px)` }}>
        <Tag text="QUÉ HACEMOS" color={OK} />
        <div style={{ color: TXT, fontSize: 72, fontWeight: 800, lineHeight: 1.2 }}>
          Auditoría ADA
          <br />
          completa en
          <br />
          <span style={{ color: OK }}>48 horas</span>
        </div>
        <div
          style={{
            marginTop: 64,
            background: OK,
            color: "#04120C",
            borderRadius: 24,
            padding: "38px 44px",
            fontSize: 52,
            fontWeight: 900,
            textAlign: "center",
          }}
        >
          $29 · Informe PDF
        </div>
        <div style={{ color: MUTED, fontSize: 36, marginTop: 40, lineHeight: 1.4 }}>
          WCAG 2.2 AA · evidencia real
          <br />
          con capturas y prioridades
          <br />
          <br />
          <span style={{ color: TXT, fontWeight: 700 }}>ranuk.dev</span>
        </div>
      </div>
    </Slide>
  );
};

export const AdaJgvShort: React.FC = () => {
  const { fps } = useVideoConfig();
  const d = (sec: number) => Math.round(sec * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Sequence durationInFrames={d(10)}>
        <Hook />
      </Sequence>
      <Sequence from={d(10)} durationInFrames={d(13)}>
        <Finding1 />
      </Sequence>
      <Sequence from={d(23)} durationInFrames={d(13)}>
        <Finding2 />
      </Sequence>
      <Sequence from={d(36)} durationInFrames={d(24)}>
        <Cta />
      </Sequence>
    </AbsoluteFill>
  );
};
