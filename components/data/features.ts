export type CoreFeature = { title: string; desc: string; icon: string; key: string };
export const CORE_FEATURES: CoreFeature[] = [
  { key: "ease", title: "省心", desc: "无需指导，长时间连续工作，自主解决环境配置、API接入等问题。", icon: "🧠" },
  { key: "understand", title: "懂你", desc: "自研类脑记忆系统，在工作中持续进化，逐渐与你心有灵犀。", icon: "🤝" },
  { key: "natural", title: "自然", desc: "人类级交互体验，会发飞书、发邮件，甚至能联系你的领导。", icon: "💬" },
];

export type Slide =
  | { kind: "feature"; key: string; title: string; desc: string; icon: string }
  | { kind: "interstitial"; key: string }
  | { kind: "final"; key: string; title: string; desc: string; icon: string };

export const SCROLLER_SLIDES: Slide[] = [
  { kind: "feature", ...CORE_FEATURES[0] },
  { kind: "feature", ...CORE_FEATURES[1] },
  { kind: "feature", ...CORE_FEATURES[2] },
  { kind: "interstitial", key: "omg" },
  { kind: "final", key: "automate", title: "不是一个 AI，而是一群 AI", desc: "AutoMate...s：人管AI、AI管AI、AI也能提醒人。", icon: "∞" },
];
