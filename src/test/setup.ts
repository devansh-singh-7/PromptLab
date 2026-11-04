import "@testing-library/jest-dom/vitest";

class TestIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  configurable: true,
  writable: true,
  value: TestIntersectionObserver,
});
