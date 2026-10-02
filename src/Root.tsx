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
import datacanvasConfig from "../products/datacanvas.json";
import ranukProfitConfig from "../products/ranuk-profit.json";
import revealConfig from "../products/reveal.json";
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
    </>
  );
};
