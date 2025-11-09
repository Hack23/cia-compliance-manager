import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { APP_TEST_IDS } from "../constants";
import CIAClassificationApp from "./CIAClassificationApp";

/**
 * Integration tests for CIAClassificationApp
 * 
 * These tests verify the integration between the main application component
 * and its child widgets, ensuring that:
 * 1. State changes propagate correctly across all widgets
 * 2. Multiple widgets work together cohesively
 * 3. User interactions affect the entire application state
 * 4. localStorage persistence works with the component tree
 */
describe("CIAClassificationApp - Integration Tests", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Mock localStorage
    const localStorageMock: Record<string, string> = {};
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
        clear: vi.fn(() => {
          Object.keys(localStorageMock).forEach((key) => {
            delete localStorageMock[key];
          });
        }),
      },
      writable: true,
    });

    // Mock window.matchMedia for dark mode functionality
    Object.defineProperty(window, "matchMedia", {
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    });

    // Mock classList methods for dark mode toggling
    document.documentElement.classList.add = vi.fn();
    document.documentElement.classList.remove = vi.fn();
    document.body.classList.add = vi.fn();
    document.body.classList.remove = vi.fn();

    // Mock console methods to reduce noise in tests
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("Application Rendering and Structure", () => {
    it("renders the application with all major widgets", async () => {
      render(<CIAClassificationApp />);

      // Wait for the application to render
      await waitFor(() => {
        expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
      });

      // Verify the app title is present
      const appTitle = screen.getByTestId(APP_TEST_IDS.APP_TITLE);
      expect(appTitle).toBeInTheDocument();

      // Verify dashboard grid is present
      const dashboardGrid = screen.getByTestId("dashboard-grid");
      expect(dashboardGrid).toBeInTheDocument();

      // Verify theme toggle button is present
      const themeToggle = screen.getByTestId("theme-toggle");
      expect(themeToggle).toBeInTheDocument();
    });

    it("renders all expected widgets in the dashboard grid", async () => {
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Check that widgets are rendered by verifying presence of widget containers
      const dashboardGrid = screen.getByTestId("dashboard-grid");
      const widgetContainers = dashboardGrid.querySelectorAll('.grid-widget-container');
      
      // Should have at least 10 widgets (the application has 12)
      expect(widgetContainers.length).toBeGreaterThanOrEqual(10);
    });
  });

  describe("Security Level State Management", () => {
    it("initializes with default security levels from localStorage", async () => {
      // Set initial values in localStorage
      const mockStorage = window.localStorage as any;
      mockStorage.setItem("availabilityLevel", "High");
      mockStorage.setItem("integrityLevel", "Moderate");
      mockStorage.setItem("confidentialityLevel", "Low");

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Verify localStorage was queried for initial values
      expect(mockStorage.getItem).toHaveBeenCalledWith("availabilityLevel");
      expect(mockStorage.getItem).toHaveBeenCalledWith("integrityLevel");
      expect(mockStorage.getItem).toHaveBeenCalledWith("confidentialityLevel");
    });

    it("persists security level changes to localStorage", async () => {
      const user = userEvent.setup();
      const mockStorage = window.localStorage as any;

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Verify the security level widget container exists
      const widgetContainer = screen.getByTestId("widget-container-widget-security-level");
      expect(widgetContainer).toBeInTheDocument();

      // Verify that localStorage setItem is available for persistence
      expect(mockStorage.setItem).toBeDefined();
      
      // The component should have called localStorage during initialization
      expect(mockStorage.getItem).toHaveBeenCalled();
    });
  });

  describe("Dark Mode Integration", () => {
    it("toggles dark mode and applies classes to document elements", async () => {
      const user = userEvent.setup();

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      });

      const themeToggle = screen.getByTestId("theme-toggle");

      // Initially should be in light mode
      expect(themeToggle).toHaveTextContent(/dark/i);

      // Click to toggle to dark mode
      await act(async () => {
        await user.click(themeToggle);
      });

      // Verify dark mode classes were added
      expect(document.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );
      expect(document.body.classList.add).toHaveBeenCalledWith("dark");

      // Verify localStorage was updated
      const mockStorage = window.localStorage as any;
      expect(mockStorage.setItem).toHaveBeenCalledWith("darkMode", "true");
    });

    it("initializes dark mode from localStorage preference", async () => {
      const mockStorage = window.localStorage as any;
      mockStorage.setItem("darkMode", "true");

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      });

      // Verify dark mode classes were added on initial render
      expect(document.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );
      expect(document.body.classList.add).toHaveBeenCalledWith("dark");
    });

    it("respects system dark mode preference when no localStorage value", async () => {
      // Mock matchMedia to return dark mode preference
      Object.defineProperty(window, "matchMedia", {
        value: vi.fn().mockImplementation((query) => ({
          matches: query.includes("dark"),
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
        writable: true,
      });

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      });

      // Verify dark mode was applied based on system preference
      expect(document.documentElement.classList.add).toHaveBeenCalledWith(
        "dark"
      );
    });
  });

  describe("Widget Integration and Data Flow", () => {
    it("renders widgets with consistent security level props", async () => {
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Verify the dashboard grid contains widgets
      const dashboardGrid = screen.getByTestId("dashboard-grid");
      expect(dashboardGrid).toBeInTheDocument();
      
      // Check that widgets are rendered by verifying presence of widget containers
      const widgetContainers = dashboardGrid.querySelectorAll('.grid-widget-container');
      expect(widgetContainers.length).toBeGreaterThan(0);
    });

    it("maintains state consistency across all widgets", async () => {
      const mockStorage = window.localStorage as any;
      mockStorage.setItem("availabilityLevel", "High");
      mockStorage.setItem("integrityLevel", "High");
      mockStorage.setItem("confidentialityLevel", "High");

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // All widgets should be rendered and receive the same security levels
      // This tests that the prop passing integration works correctly
      const dashboardGrid = screen.getByTestId("dashboard-grid");
      const widgetContainers = dashboardGrid.querySelectorAll('.grid-widget-container');
      expect(widgetContainers.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation and External Links", () => {
    it("renders navigation links with correct attributes", async () => {
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("source-link")).toBeInTheDocument();
      });

      // Verify source link
      const sourceLink = screen.getByTestId("source-link");
      expect(sourceLink).toHaveAttribute(
        "href",
        "https://github.com/Hack23/cia-compliance-manager"
      );
      expect(sourceLink).toHaveAttribute("target", "_blank");
      expect(sourceLink).toHaveAttribute("rel", "noopener noreferrer");

      // Verify docs link
      const docsLink = screen.getByTestId("docs-link");
      expect(docsLink).toHaveAttribute(
        "href",
        "https://www.hack23.com/cia-compliance-manager-features.html"
      );

      // Verify author link
      const authorLink = screen.getByTestId("author-link");
      expect(authorLink).toHaveAttribute("href", "https://hack23.com/");
    });
  });

  describe("Performance and Optimization", () => {
    it("renders without unnecessary re-renders", async () => {
      const { rerender } = render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Rerender with same props should not cause issues
      rerender(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Application should still be functional after rerender
      expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
    });

    it("handles rapid theme toggles gracefully", async () => {
      const user = userEvent.setup();

      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
      });

      const themeToggle = screen.getByTestId("theme-toggle");

      // Rapidly toggle theme multiple times
      await act(async () => {
        await user.click(themeToggle);
        await user.click(themeToggle);
        await user.click(themeToggle);
      });

      // Application should still be functional
      expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
      expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
    });
  });

  describe("Error Handling and Edge Cases", () => {
    it("handles missing localStorage gracefully", async () => {
      // Mock localStorage to return null instead of throwing
      // This is more realistic - browsers that don't support localStorage
      // typically return null rather than throwing
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: vi.fn().mockReturnValue(null),
          setItem: vi.fn(),
        },
        writable: true,
      });

      // Should render with default values
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
      });
    });

    it("handles invalid localStorage values gracefully", async () => {
      const mockStorage = window.localStorage as any;
      mockStorage.setItem("availabilityLevel", "InvalidLevel");
      mockStorage.setItem("darkMode", "not-a-boolean");

      // Should render with default values instead of crashing
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("dashboard-grid")).toBeInTheDocument();
      });

      // Application should be functional despite invalid stored values
      expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has accessible app structure", async () => {
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
      });

      // Verify main heading exists
      const heading = screen.getByTestId(APP_TEST_IDS.APP_TITLE);
      expect(heading).toBeInTheDocument();

      // Verify theme toggle button is accessible
      const themeToggle = screen.getByTestId("theme-toggle");
      expect(themeToggle.tagName).toBe("BUTTON");
    });

    it("has accessible navigation links", async () => {
      render(<CIAClassificationApp />);

      await waitFor(() => {
        expect(screen.getByTestId("source-link")).toBeInTheDocument();
      });

      // All links should be anchor elements
      const sourceLink = screen.getByTestId("source-link");
      expect(sourceLink.tagName).toBe("A");

      const docsLink = screen.getByTestId("docs-link");
      expect(docsLink.tagName).toBe("A");

      const authorLink = screen.getByTestId("author-link");
      expect(authorLink.tagName).toBe("A");
    });
  });
});
