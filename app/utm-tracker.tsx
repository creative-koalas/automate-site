"use client";

import { useEffect, useState } from "react";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmInfo = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  first_landing_url?: string;
  first_landing_time?: string;
};

const STORAGE_KEY = "utm_info";

function parseUtmFromUrl(): UtmInfo | null {
  if (typeof window === "undefined") return null;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  let hasUtm = false;
  const utmData: UtmInfo = {};

  UTM_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) {
      hasUtm = true;
      utmData[key] = value;
    }
  });

  if (!hasUtm) return null;

  utmData.first_landing_url = window.location.href;
  utmData.first_landing_time = new Date().toISOString();

  return utmData;
}

export default function UtmTracker() {
  const [utm, setUtm] = useState<UtmInfo | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setUtm(JSON.parse(saved));
      }

      const fromUrl = parseUtmFromUrl();
      if (fromUrl) {
        // console.log("[UTM Tracker] Parsed UTM from URL:", fromUrl);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
        setUtm(fromUrl);

        (async () => {
          try {
            await fetch("/api/utm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ utm: fromUrl }),
            });
          } catch (e) {
            console.error("Failed to send UTM to server:", e);
          }
        })();
      }
    } catch (e) {
      console.error("Error handling UTM info:", e);
    }
  }, []);

  if (!utm) return null;

  return null;
}
