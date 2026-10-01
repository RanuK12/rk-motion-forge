export interface ProductConfig {
  id: string;
  name: string;
  tagline: string;
  audience: string;
  colors: {
    background: string;
    accent: string;
    text: string;
    cardBg?: string;
  };
  mascot?: {
    mood?: "smile" | "wink" | "excited";
  };
  hook: {
    label?: string;
    words: string[];
    taglineBottom?: string;
  };
  features: Array<{
    tag: string;
    name: string;
    benefit: string;
    metricLabel: string;
    metricValue: string;
    iconType?: "database" | "chart" | "terminal" | "bot" | "rocket";
  }>;
  productShowcase: {
    headlinePrefix: string;
    headlineHighlight: string;
    bullets: string[];
    mockup: {
      windowTitle: string;
      actionBtnText: string;
      kpis: Array<{
        label: string;
        value: string;
        sub: string;
        color?: string;
      }>;
      chart?: {
        title: string;
        badge: string;
        bars: Array<{ label: string, value: number }>;
      };
    };
  };
  systemPipeline: Array<{
    step: string;
    title: string;
    metric: string;
    sub: string;
  }>;
  mission: {
    line1: string;
    line2Prefix: string;
    line2Highlight: string;
  };
  outro: {
    wordmark: string;
    wordmarkAccent: string;
    subtitle: string;
    ctaText: string;
    url: string;
    socialProof: string;
  };
}
