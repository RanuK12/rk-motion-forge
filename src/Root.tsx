import React from "react";
import { Composition } from "remotion";
import { MotionPromoVideo } from "./compositions/MotionPromoVideo";
import { FeatureWalkthroughVideo } from "./compositions/FeatureWalkthroughVideo";
import { LaunchTeaserVideo } from "./compositions/LaunchTeaserVideo";
import { VerticalPromoVideo } from "./compositions/VerticalPromoVideo";
import { RanukProfitTeaserVideo } from "./compositions/RanukProfitTeaserVideo";
import { RanukProfitVerticalVideo } from "./compositions/RanukProfitVerticalVideo";
import { RevealTeaserVideo } from "./compositions/RevealTeaserVideo";
import { RevealVerticalVideo } from "./compositions/RevealVerticalVideo";
import { MosaicVideo } from "./compositions/MosaicVideo";
import { FlightRadarVideo } from "./compositions/FlightRadarVideo";
import { AuditBotInspectorVideo } from "./compositions/AuditBotInspectorVideo";
import { TerminalHackerVideo } from "./compositions/TerminalHackerVideo";
import { NextGenPromoVideo } from "./compositions/NextGenPromoVideo";
import { NextGenVerticalVideo } from "./compositions/NextGenVerticalVideo";
import datacanvasConfig from "../products/datacanvas.json";
import ranukProfitConfig from "../products/ranuk-profit.json";
import revealConfig from "../products/reveal.json";
import flightAlertConfig from "../products/flight-alert.json";
import auditBotConfig from "../products/auditbot.json";
import dynamicIslandConfig from "../products/dynamic-island.json";
import { ProductConfig } from "./types/product";

export const Root: React.FC = () => {
  return (
    <>
      {/* ============================================================== */}
      {/* 📊 1/3: DATACANVAS BI (ChatGPT MCP EXTENSION)                   */}
      {/* ============================================================== */}
      <Composition
        id="DataCanvasWalkthrough"
        component={FeatureWalkthroughVideo}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataCanvasLaunchTeaser"
        component={LaunchTeaserVideo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DataCanvasVerticalReels"
        component={VerticalPromoVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ============================================================== */}
      {/* 📈 2/3: RANUK PROFIT (QUANTITATIVE TRADING BOT)                */}
      {/* ============================================================== */}
      <Composition
        id="RanukProfitTeaser"
        component={RanukProfitTeaserVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RanukProfitVertical"
        component={RanukProfitVerticalVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ============================================================== */}
      {/* 🛰️ 3/3: EL REVELADO (SATELLITE MYSTERY TILE GAME)              */}
      {/* ============================================================== */}
      <Composition
        id="RevealTeaser"
        component={RevealTeaserVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="RevealVertical"
        component={RevealVerticalVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ============================================================== */}
      {/* ✈️ 4/5: FLIGHT PRICE ALERT (AUTONOMOUS AIR TRAFFIC RADAR)      */}
      {/* ============================================================== */}
      <Composition
        id="FlightRadar"
        component={FlightRadarVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ============================================================== */}
      {/* 🛡️ 5/5: AUDITBOT (HEADLESS DEVTOOLS WCAG 2.1 INSPECTOR)        */}
      {/* ============================================================== */}
      <Composition
        id="AuditBotInspector"
        component={AuditBotInspectorVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ============================================================== */}
      {/* 💻 DEVELOPER ARCHETYPE: TERMINAL HACKER (CLI / TUI DEMO)       */}
      {/* ============================================================== */}
      <Composition
        id="TerminalHacker"
        component={TerminalHackerVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ============================================================== */}
      {/* ARCHETYPE 1: PRODUCT PROMOS (15s, 1920x1080)                   */}
      {/* Hook, 2 features, mockup, sistema, frase, CTA                 */}
      {/* ============================================================== */}
      <Composition
        id="DataCanvasVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: datacanvasConfig as unknown as ProductConfig,
        }}
      />

      <Composition
        id="RanukProfitVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: ranukProfitConfig as unknown as ProductConfig,
        }}
      />

      <Composition
        id="RevealVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: revealConfig as unknown as ProductConfig,
        }}
      />

      <Composition
        id="FlightAlertVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: flightAlertConfig as unknown as ProductConfig,
        }}
      />

      <Composition
        id="AuditBotVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: auditBotConfig as unknown as ProductConfig,
        }}
      />

      {/* ============================================================== */}
      {/* 🖼️ ARCHETYPE: MOSAIC WALL (20s, 1920x1080)                     */}
      {/* Muro de capturas con zoom out continuo y freeze general        */}
      {/* ============================================================== */}
      <Composition
        id="Mosaic"
        component={MosaicVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          productName: "Ranuk IT Solutions",
          finalPhrase: "366 products. one grid.",
          url: "ranuk.dev",
        }}
      />
      {/* ============================================================== */}
      {/* 🚀 ARCHETYPE NEXTGEN: 2026 DARK OBSIDIAN GLASSMORPHISM (15s)  */}
      {/* Landscape (1920x1080) and Mobile Vertical (1080x1920)         */}
      {/* ============================================================== */}
      {/* DataCanvas BI */}
      <Composition
        id="DataCanvasNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: datacanvasConfig as unknown as ProductConfig }}
      />
      <Composition
        id="DataCanvasNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: datacanvasConfig as unknown as ProductConfig }}
      />

      {/* Ranuk Profit Bot */}
      <Composition
        id="RanukProfitNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: ranukProfitConfig as unknown as ProductConfig }}
      />
      <Composition
        id="RanukProfitNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: ranukProfitConfig as unknown as ProductConfig }}
      />

      {/* Flight Price Alert */}
      <Composition
        id="FlightAlertNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: flightAlertConfig as unknown as ProductConfig }}
      />
      <Composition
        id="FlightAlertNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: flightAlertConfig as unknown as ProductConfig }}
      />

      {/* AuditBot */}
      <Composition
        id="AuditBotNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: auditBotConfig as unknown as ProductConfig }}
      />
      <Composition
        id="AuditBotNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: auditBotConfig as unknown as ProductConfig }}
      />

      {/* El Revelado */}
      <Composition
        id="RevealNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: revealConfig as unknown as ProductConfig }}
      />
      <Composition
        id="RevealNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: revealConfig as unknown as ProductConfig }}
      />
      {/* Dynamic Island for Windows */}
      <Composition
        id="DynamicIslandNextGen"
        component={NextGenPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ config: dynamicIslandConfig as unknown as ProductConfig }}
      />
      <Composition
        id="DynamicIslandNextGenVertical"
        component={NextGenVerticalVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: dynamicIslandConfig as unknown as ProductConfig }}
      />
    </>
  );
};
