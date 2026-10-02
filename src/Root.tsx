import React from "react";
import { Composition } from "remotion";
import { MotionPromoVideo } from "./compositions/MotionPromoVideo";
import { FeatureWalkthroughVideo } from "./compositions/FeatureWalkthroughVideo";
import { LaunchTeaserVideo } from "./compositions/LaunchTeaserVideo";
import { VerticalPromoVideo } from "./compositions/VerticalPromoVideo";
import datacanvasConfig from "../products/datacanvas.json";
import ranukProfitConfig from "../products/ranuk-profit.json";
import revealConfig from "../products/reveal.json";
import { ProductConfig } from "./types/product";

export const Root: React.FC = () => {
  return (
    <>
      {/* ============================================================== */}
      {/* ARCHETYPE 3: PHOTOREALISTIC FEATURE WALKTHROUGH (24s, 1920x1080) */}
      {/* UI real con zoom, cursor interactivo, drill-down y export PDF   */}
      {/* ============================================================== */}
      <Composition
        id="DataCanvasWalkthrough"
        component={FeatureWalkthroughVideo}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ============================================================== */}
      {/* ARCHETYPE 2: LAUNCH TEASER (12s, 1920x1080)                    */}
      {/* Tipografía masiva, colores planos, cortes ultra-rápidos al beat */}
      {/* ============================================================== */}
      <Composition
        id="DataCanvasLaunchTeaser"
        component={LaunchTeaserVideo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ============================================================== */}
      {/* ARCHETYPE 7: VERTICAL AD 9:16 (15s, 1080x1920)                 */}
      {/* Formato nativo para TikTok, Instagram Reels y YouTube Shorts    */}
      {/* ============================================================== */}
      <Composition
        id="DataCanvasVerticalReels"
        component={VerticalPromoVideo}
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
