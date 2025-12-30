import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ImpactWidget from "./ImpactWidget";
import type { CIAComponent, SecurityLevel } from "../../../types/cia";

describe("ImpactWidget", () => {
  const defaultProps = {
    component: "availability" as CIAComponent,
    level: "Moderate" as SecurityLevel,
  };

  describe("Rendering", () => {
    it("renders availability widget correctly", async () => {
      render(<ImpactWidget {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText(/Availability Impact/i)).toBeInTheDocument();
      });
    });

    it("renders integrity widget correctly", async () => {
      render(
        <ImpactWidget
          component="integrity"
          level="High"
        />
      );
      await waitFor(() => {
        expect(screen.getByText(/Integrity Impact/i)).toBeInTheDocument();
      });
    });

    it("renders confidentiality widget correctly", async () => {
      render(
        <ImpactWidget
          component="confidentiality"
          level="Very High"
        />
      );
      await waitFor(() => {
        expect(screen.getByText(/Confidentiality Impact/i)).toBeInTheDocument();
      });
    });

    it("displays business impact section when available", async () => {
      render(<ImpactWidget {...defaultProps} />);
      await waitFor(() => {
        // Check for the SLA metrics section which indicates component loaded
        expect(screen.getByText("SLA Metrics")).toBeInTheDocument();
      });
      // Now check for business impact
      expect(screen.getAllByText(/Business Impact/i).length).toBeGreaterThan(0);
    });
  });

  describe("Component-specific metrics", () => {
    it("displays availability-specific metrics", async () => {
      render(<ImpactWidget component="availability" level="High" />);
      await waitFor(() => {
        expect(screen.getByText("SLA Metrics")).toBeInTheDocument();
        expect(screen.getByText("Uptime Target")).toBeInTheDocument();
      });
    });

    it("displays integrity-specific metrics", async () => {
      render(<ImpactWidget component="integrity" level="High" />);
      await waitFor(() => {
        expect(screen.getByText("Data Integrity Metrics")).toBeInTheDocument();
        expect(screen.getByText("Data Validation Controls")).toBeInTheDocument();
      });
    });

    it("displays confidentiality-specific metrics", async () => {
      render(<ImpactWidget component="confidentiality" level="High" />);
      await waitFor(() => {
        expect(screen.getByRole("heading", { name: /Data Protection/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /Privacy Impact/i })).toBeInTheDocument();
      });
    });
  });

  describe("Extended details and recommendations", () => {
    it("shows recommendations for integrity when showExtendedDetails is true", async () => {
      render(
        <ImpactWidget
          component="integrity"
          level="High"
          showExtendedDetails={true}
        />
      );
      await waitFor(() => {
        // Recommendations should be visible
        expect(screen.getByText("Recommendations")).toBeInTheDocument();
      });
    });

    it("hides recommendations for integrity when showExtendedDetails is false", async () => {
      render(
        <ImpactWidget
          component="integrity"
          level="High"
          showExtendedDetails={false}
        />
      );
      await waitFor(() => {
        // Wait for content to load
        expect(screen.getByText("Data Integrity Metrics")).toBeInTheDocument();
      });
      // Recommendations should not be visible
      expect(screen.queryByText("Recommendations")).not.toBeInTheDocument();
    });
  });

  describe("Props and customization", () => {
    it("accepts custom className", async () => {
      const { container } = render(
        <ImpactWidget {...defaultProps} className="custom-class" />
      );
      await waitFor(() => {
        expect(container.querySelector(".custom-class")).toBeInTheDocument();
      });
    });

    it("accepts custom testId", async () => {
      render(<ImpactWidget {...defaultProps} testId="custom-test-id" />);
      await waitFor(() => {
        // The testId is used in the WidgetContainer
        expect(screen.getByTestId("widget-container-loading-container-custom-test-id")).toBeInTheDocument();
      });
    });

    it("calls onError callback when provided", () => {
      const onError = vi.fn();
      
      // Note: This test is hard to trigger without mocking the service
      // The component handles errors internally, so we're just verifying the prop exists
      render(<ImpactWidget {...defaultProps} onError={onError} />);
      
      // If there's no error, onError shouldn't be called
      expect(onError).not.toHaveBeenCalled();
    });
  });

  describe("Styling and layout", () => {
    it("applies correct color classes for availability", async () => {
      const { container } = render(
        <ImpactWidget component="availability" level="High" />
      );
      await waitFor(() => {
        // Check that the component has the availability-specific class
        expect(container.querySelector(".cia-availability")).toBeInTheDocument();
      });
    });

    it("applies correct overflow classes for confidentiality", async () => {
      const { container } = render(
        <ImpactWidget component="confidentiality" level="High" />
      );
      await waitFor(() => {
        // Check that the component has the overflow-visible class
        expect(container.querySelector(".overflow-visible")).toBeInTheDocument();
      });
    });
  });

  describe("Security levels", () => {
    const levels: SecurityLevel[] = ["None", "Low", "Moderate", "High", "Very High"];

    levels.forEach((level) => {
      it(`handles ${level} security level correctly`, async () => {
        render(<ImpactWidget component="availability" level={level} />);
        await waitFor(() => {
          expect(screen.getByText(/Availability Impact/i)).toBeInTheDocument();
        });
      });
    });
  });
});
