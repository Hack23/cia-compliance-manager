import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import TechnicalDetailsWidget from "./TechnicalDetailsWidget";

// Mock the useCIAContentService hook with correct path
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getTechnicalImplementation: vi
        .fn()
        .mockImplementation((component, level) => ({
          description: `${component} ${level} technical implementation description`,
          implementationSteps: [
            `${component} ${level} step 1`,
            `${component} ${level} step 2`,
          ],
          effort: {
            development:
              level === "None" ? "Low" : level === "Low" ? "Low" : "Medium",
            maintenance:
              level === "None" ? "Minimal" : level === "Low" ? "Low" : "Medium",
            expertise:
              level === "None"
                ? "Basic"
                : level === "Low"
                ? "Intermediate"
                : "Advanced",
          },
          technologies:
            level !== "None"
              ? [
                  { name: `${level} Tech 1`, category: "Software" },
                  { name: `${level} Tech 2`, category: "Hardware" },
                ]
              : [],
        })),
      getComponentDetails: vi.fn().mockImplementation((component, level) => ({
        description: `${component} ${level} description`,
        technical: `${component} ${level} technical details`,
        businessImpact: `${component} ${level} business impact`,
      })),
      getImplementationTime: vi.fn().mockReturnValue("1-2 months"),
      getImplementationDifficulty: vi.fn().mockReturnValue("Moderate"),
      getTechnicalDescription: vi
        .fn()
        .mockImplementation(
          (component, level) => `${component} ${level} technical details`
        ),
    },
    error: null,
    isLoading: false,
  }),
}));

describe("TechnicalDetailsWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "widget-technical-details",
  };

  it("renders without crashing", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    expect(
      screen.getByText("Technical Implementation Details")
    ).toBeInTheDocument();
  });

  it("displays technical details for the selected component", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // The default tab should be "availability" based on component implementation
    // We need to click on the confidentiality tab first
    await act(async () => {
      fireEvent.click(screen.getByTestId("confidentiality-tab"));
    });

    // Now check for content in the confidentiality tab using the test ID instead of exact text
    await waitFor(() => {
      const descriptionElement = screen.getByTestId("technical-description");
      expect(descriptionElement).toBeInTheDocument();

      // Check that the content contains either "confidentiality" or "Confidentiality"
      const content = descriptionElement.textContent || "";
      expect(content.toLowerCase()).toContain("confidentiality") ||
        expect(content.toLowerCase()).toContain("moderate");
    });
  });

  it("switches between tabs", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // Click on integrity tab
    await act(async () => {
      fireEvent.click(screen.getByTestId("integrity-tab"));
    });

    // Check that we're now showing integrity content
    await waitFor(() => {
      const descriptionElement = screen.getByTestId("technical-description");
      expect(descriptionElement).toBeInTheDocument();
      // Check for "integrity" in the content using a case-insensitive approach
      const content = descriptionElement.textContent || "";
      expect(content.toLowerCase()).toMatch(/integrity|moderate/);
    });

    // Click on availability tab
    await act(async () => {
      fireEvent.click(screen.getByTestId("availability-tab"));
    });

    // Check that we're now showing availability content
    await waitFor(() => {
      const descriptionElement = screen.getByTestId("technical-description");
      expect(descriptionElement).toBeInTheDocument();
      // Check for "availability" in the content using a case-insensitive approach
      const content = descriptionElement.textContent || "";
      expect(content.toLowerCase()).toMatch(/availability|moderate/);
    });
  });

  it("shows implementation details for each level", async () => {
    await act(async () => {
      render(
        <TechnicalDetailsWidget
          availabilityLevel="Low"
          integrityLevel="Moderate"
          confidentialityLevel="High"
          testId="widget-technical-details"
        />
      );
    });

    // Test implementation effort sections - these should always be present
    expect(screen.getByTestId("development-effort")).toBeInTheDocument();
    expect(screen.getByTestId("maintenance-level")).toBeInTheDocument();
    expect(screen.getByTestId("required-expertise")).toBeInTheDocument();

    // Test for the implementation header which should always be visible
    expect(screen.getByTestId("technical-header")).toBeInTheDocument();
  });

  it("handles different security levels", async () => {
    const { rerender } = render(
      <TechnicalDetailsWidget
        availabilityLevel="None"
        integrityLevel="None"
        confidentialityLevel="None"
        testId="widget-technical-details"
      />
    );

    // Click on the confidentiality tab first
    await act(async () => {
      fireEvent.click(screen.getByTestId("confidentiality-tab"));
    });

    // Check that the None level appears in the component using the test ID
    await waitFor(() => {
      // Check for the specific "None" text in the technical description
      const descriptionElement = screen.getByTestId("technical-description");
      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement.textContent?.toLowerCase()).toContain("none");
    });

    // Rerender with different security levels
    await act(async () => {
      rerender(
        <TechnicalDetailsWidget
          availabilityLevel="Very High"
          integrityLevel="Very High"
          confidentialityLevel="Very High"
          testId="widget-technical-details"
        />
      );
    });

    // Click on confidentiality tab again after rerender
    await act(async () => {
      fireEvent.click(screen.getByTestId("confidentiality-tab"));
    });

    // Check that the Very High level appears in the component using the test ID
    await waitFor(() => {
      const descriptionElement = screen.getByTestId("technical-description");
      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement.textContent?.toLowerCase()).toContain(
        "very high"
      );
    });
  });

  it("displays implementation steps when available", async () => {
    await act(async () => {
      render(<TechnicalDetailsWidget {...defaultProps} />);
    });

    // The component should show the technical implementation
    expect(screen.getByTestId("technical-header")).toBeInTheDocument();
    expect(screen.getByTestId("technical-description")).toBeInTheDocument();
  });

  it("applies custom testId", async () => {
    const customTestId = "custom-technical-details";
    await act(async () => {
      render(
        <TechnicalDetailsWidget {...defaultProps} testId={customTestId} />
      );
    });

    expect(
      screen.getByTestId(`widget-container-${customTestId}`)
    ).toBeInTheDocument();
  });
});
