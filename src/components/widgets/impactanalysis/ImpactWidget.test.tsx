import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ImpactWidget from "./ImpactWidget";
import type { CIAComponent, SecurityLevel } from "../../../types/cia";

describe("ImpactWidget", () => {
  const defaultProps = {
    component: "availability" as CIAComponent,
    level: "Moderate" as SecurityLevel,
  };

  describe("Rendering", () => {
    it("should render with required props", async () => {
      render(<ImpactWidget {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText(/Availability Impact/i)).toBeInTheDocument();
      });
    });

    it("should apply custom className", async () => {
      const { container } = render(
        <ImpactWidget {...defaultProps} className="custom-class" />
      );
      await waitFor(() => {
        expect(container.querySelector(".custom-class")).toBeInTheDocument();
      });
    });

    it("should use custom testId", async () => {
      render(<ImpactWidget {...defaultProps} testId="custom-test-id" />);
      await waitFor(() => {
        expect(screen.getByTestId("widget-container-loading-container-custom-test-id")).toBeInTheDocument();
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
  });

  describe("Data Display", () => {
    it("displays business impact section when available", async () => {
      render(<ImpactWidget {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText("SLA Metrics")).toBeInTheDocument();
      });
      expect(screen.getAllByText(/Business Impact/i).length).toBeGreaterThan(0);
    });

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

  describe("Extended Details", () => {
    it("shows recommendations when showExtendedDetails is true", async () => {
      render(
        <ImpactWidget
          component="integrity"
          level="High"
          showExtendedDetails={true}
        />
      );
      await waitFor(() => {
        expect(screen.getByText("Recommendations")).toBeInTheDocument();
      });
    });

    it("hides recommendations when showExtendedDetails is false", async () => {
      render(
        <ImpactWidget
          component="integrity"
          level="High"
          showExtendedDetails={false}
        />
      );
      await waitFor(() => {
        expect(screen.getByText("Data Integrity Metrics")).toBeInTheDocument();
      });
      expect(screen.queryByText("Recommendations")).not.toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("applies correct color classes for availability", async () => {
      const { container } = render(
        <ImpactWidget component="availability" level="High" />
      );
      await waitFor(() => {
        expect(container.querySelector(".cia-availability")).toBeInTheDocument();
      });
    });

    it("applies correct overflow classes for confidentiality", async () => {
      const { container } = render(
        <ImpactWidget component="confidentiality" level="High" />
      );
      await waitFor(() => {
        expect(container.querySelector(".overflow-visible")).toBeInTheDocument();
      });
    });
  });

  describe("Edge Cases", () => {
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

  describe("Accessibility", () => {
    it("should have proper semantic structure", async () => {
      const { container } = render(<ImpactWidget {...defaultProps} />);
      await waitFor(() => {
        expect(screen.getByText(/Availability Impact/i)).toBeInTheDocument();
      });
      // Widget should render in a container
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
