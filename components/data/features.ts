export type CoreFeature = { title: string; desc: string; icon: string; key: string };
export const CORE_FEATURES: CoreFeature[] = [
  { key: "ease", title: "省心", desc: "不用教它怎么配环境、怎么开始，交代完就行了。", icon: "🧠" },
  { key: "understand", title: "懂你", desc: "每个 AI 牛马都有独立记忆，用得越多，它越了解你的习惯和偏好。", icon: "🤝" },
  { key: "natural", title: "自然", desc: "它会发飞书、发邮件，也能帮你联系同事。", icon: "💬" },
];

export type Slide =
  | { kind: "hero"; key: string }
  | { kind: "feature"; key: string; title: string; desc: string; icon: string }
  | { kind: "interstitial"; key: string }
  | { kind: "final"; key: string; title: string; desc: string; icon: string }
  | { kind: "voices"; key: string }
  | { kind: "footer"; key: string };

export const IMMERSIVE_SLIDES: Slide[] = [
  { kind: "hero", key: "hero" },
  { kind: "feature", ...CORE_FEATURES[0] },
  { kind: "feature", ...CORE_FEATURES[1] },
  { kind: "feature", ...CORE_FEATURES[2] },
  { kind: "interstitial", key: "omg" },
  { kind: "final", key: "automate", title: "不是一个 AI，是一群 AI 牛马", desc: "PsyGo：帮你把事做完，不只是帮你聊天。", icon: "∞" },
  { kind: "voices", key: "voices" },
  { kind: "footer", key: "footer" },
];
