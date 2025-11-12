import "@testing-library/jest-dom/vitest";

// Polyfills for jsdom environment
if (typeof window !== "undefined") {
  // matchMedia
  if (!window.matchMedia) {
    // @ts-ignore
    window.matchMedia = () => ({
      matches: false,
      media: "",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
}

class MockIntersectionObserver {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

// @ts-ignore
if (typeof globalThis.IntersectionObserver === "undefined") {
  // @ts-ignore
  globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
