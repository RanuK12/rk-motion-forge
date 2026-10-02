import React from "react";
import { Composition } from "remotion";
import { MotionPromoVideo } from "./compositions/MotionPromoVideo";
import datacanvasConfig from "../products/datacanvas.json";
import ranukProfitConfig from "../products/ranuk-profit.json";
import revealConfig from "../products/reveal.json";
import { ProductConfig } from "./types/product";

export const Root: React.FC = () => {
  return (
    <>
      {/* 1. DataCanvas BI */}
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

      {/* 2. Ranuk Profit Trading Bot */}
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

      {/* 3. El Revelado */}
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

      {/* 4. Universal Configurable Composition */}
      <Composition
        id="ForgeCustomVideo"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          config: datacanvasConfig as unknown as ProductConfig,
        }}
      />

      {/* 5. Vertical Composition for TikTok/Shorts/Reels (9:16) */}
      <Composition
        id="ForgeCustomVideoVertical"
        component={MotionPromoVideo as any}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          config: datacanvasConfig as unknown as ProductConfig,
        }}
      />
    </>
  );
};
