"use client";

import { HeroUIProvider } from "@heroui/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useEffect } from "react";

let posthogInitialized = false;

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || posthogInitialized) return;

    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!apiKey || !apiHost) return;

    posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (client) => {
        if (process.env.NODE_ENV === "development") {
          client.debug();
        }
      },
    });

    // Avoid duplicate init under React Strict Mode in development.
    posthogInitialized = true;
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <HeroUIProvider>{children}</HeroUIProvider>
      </NextThemesProvider>
    </AnalyticsProvider>
  );
}
