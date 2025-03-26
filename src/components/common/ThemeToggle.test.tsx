import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();

    // Reset DOM classes before each test
    document.documentElement.classList.remove("light");
    document.documentElement.classList.remove("dark");
  });

  it("renders correctly with default props", () => {
    render(<ThemeToggle />);

    const toggle = screen.getByTestId("theme-toggle");
    expect(toggle).toBeInTheDocument();
  });

  it("toggles theme from light to dark", () => {
    // Ensure we start in light mode
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");

    render(<ThemeToggle />);

    const toggle = screen.getByTestId("theme-toggle");
    fireEvent.click(toggle);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "dark");
  });

  it("toggles theme from dark to light", () => {
    // Explicitly ensure we start in dark mode
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");

    // Need to set the initial state to dark
    localStorageMock.getItem.mockReturnValueOnce("dark");

    render(<ThemeToggle />);

    const toggle = screen.getByTestId("theme-toggle");
    fireEvent.click(toggle);

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
  });

  it("initializes with system preference when no localStorage value", () => {
    render(<ThemeToggle />);

    // Assuming system preference is light (from our matchMedia mock)
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("initializes with localStorage theme value when available", () => {
    localStorageMock.getItem.mockReturnValue("dark");

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
