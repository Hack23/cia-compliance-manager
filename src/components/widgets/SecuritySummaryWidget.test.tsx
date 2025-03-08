import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SecuritySummaryWidget from "./SecuritySummaryWidget";
import { SECURITY_LEVELS } from "../../constants/appConstants";
import {
  SECURITY_SUMMARY_TITLES,
  SECURITY_RECOMMENDATIONS,
  UI_ICONS,
  ROI_ESTIMATES,
  TEST_MATCHERS,
} from "../../constants/appConstants";
import { BusinessKeyBenefits } from "../../types/businessImpact";
import { vi } from "vitest";
import { SUMMARY_TEST_IDS, WIDGET_TEST_IDS } from "../../constants/testIds";

// Helper function to ensure an item is always treated as an array
const ensureArray = <T,>(item: T | T[]): T[] => {
  return Array.isArray(item) ? item : [item];
};

// Mock the BusinessKeyBenefits to ensure consistent test data
vi.mock("../../types/businessImpact", async () => {
  const actual = await vi.importActual("../../types/businessImpact");
  return {
    ...actual,
    BusinessKeyBenefits: {
      NONE: [],
      LOW: [
        "Cost-effective solution for non-critical systems",
        "Minimal maintenance overhead",
      ],
      MODERATE: [
        "Good balance of security vs. cost",
        "Meets regulatory requirements",
        "Suitable for most business applications",
      ],
      HIGH: [
        "Robust protection for sensitive data",
        "Compliance with stringent requirements",
        "Minimizes risk of security incidents",
      ],
      VERY_HIGH: [
        "Maximum protection for critical systems",
        "Suitable for highly regulated environments",
        "Comprehensive security guarantees",
      ],
    },
  };
});

// Create wrapper components instead of mocking React.useState
const TechnicalExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget
    securityLevel="Moderate"
    availabilityLevel="High"
    integrityLevel="Moderate"
    confidentialityLevel="High"
  />
);

const BusinessImpactExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget
    securityLevel="High"
    availabilityLevel="High"
    integrityLevel="High"
    confidentialityLevel="High"
  />
);

const MetricsExpandedWrapper: React.FC = () => (
  <SecuritySummaryWidget
    securityLevel="Moderate"
    availabilityLevel="Moderate"
    integrityLevel="Moderate"
    confidentialityLevel="Moderate"
  />
);

describe("SecuritySummaryWidget", () => {
  it("renders with proper security level", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    // ...existing code...
  });

  it("renders None level summary correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="None"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Use a custom matcher that can handle the title format
    const titleElement = screen.getByTestId(
      WIDGET_TEST_IDS.SECURITY_SUMMARY_TITLE
    );
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(SECURITY_SUMMARY_TITLES.NONE);

    // Use test matcher for description
    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Low level summary correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Low"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.LOW)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_LOW_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Moderate level summary correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.MODERATE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_MODERATE_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders High level summary correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("renders Very High level summary correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Very High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.VERY_HIGH)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_VERY_HIGH_PATTERN)
    ).toBeInTheDocument();
  });

  it("displays appropriate security level icon", () => {
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel="Low"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toHaveTextContent(UI_ICONS.SECURITY_LOW);

    rerender(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toHaveTextContent(UI_ICONS.SECURITY_MODERATE);

    rerender(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toHaveTextContent(UI_ICONS.SECURITY_HIGH);

    rerender(
      <SecuritySummaryWidget
        securityLevel="Very High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toHaveTextContent(UI_ICONS.SECURITY_VERY_HIGH);

    rerender(
      <SecuritySummaryWidget
        securityLevel="None"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(
      screen.getByTestId(SUMMARY_TEST_IDS.SECURITY_ICON)
    ).toHaveTextContent(UI_ICONS.SECURITY_NONE);
  });

  it("falls back to None when invalid security level is provided", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Invalid"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const titleElement = screen.getByText((content, element) => {
      return (
        element !== null &&
        element.className.includes("text-lg") &&
        content.includes(SECURITY_SUMMARY_TITLES.NONE)
      );
    });
    expect(titleElement).toBeInTheDocument();

    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_NONE_PATTERN)
    ).toBeInTheDocument();
  });

  // New tests to improve coverage

  it("renders with mixed CIA security levels and generates composite description", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="High"
        integrityLevel="Low"
        confidentialityLevel="Very High"
      />
    );

    // Check that it displays mixed security profile text
    expect(screen.getByText(/Mixed security profile/i)).toBeInTheDocument();
    expect(screen.getByText(/High Availability/i)).toBeInTheDocument();
    expect(screen.getByText(/Low Integrity/i)).toBeInTheDocument();
    expect(screen.getByText(/Very High Confidentiality/i)).toBeInTheDocument();
  });

  it("handles Basic security level correctly", () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Basic"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Use the testid to find the specific element instead of generic text search
    expect(screen.getByTestId("security-summary-title")).toHaveTextContent(
      "Basic Security"
    );

    // Should use Low description
    expect(
      screen.getByText(TEST_MATCHERS.SECURITY_LOW_PATTERN)
    ).toBeInTheDocument();
    // Should use the Basic icon
    expect(screen.getByTestId("security-icon")).toHaveTextContent(
      UI_ICONS.BASIC_COMPLIANCE
    );
  });

  it("displays key benefits based on security level", async () => {
    // Render with Moderate security level
    render(
      <SecuritySummaryWidget
        securityLevel={SECURITY_LEVELS.MODERATE}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Get the key benefits list
    const benefitsList = screen.getByTestId("key-benefits-list");
    expect(benefitsList).toBeInTheDocument();

    // Get the benefits for MODERATE level - fix type safety
    const normalizedLevel = SECURITY_LEVELS.MODERATE.toUpperCase().replace(
      /\s+/g,
      "_"
    ) as keyof typeof BusinessKeyBenefits;
    const moderateBenefits = BusinessKeyBenefits[normalizedLevel] || [];

    // Check that we have benefits defined in our mock
    expect(moderateBenefits.length).toBeGreaterThan(0);

    // Check for the presence of each benefit
    moderateBenefits.forEach((benefit) => {
      const benefitText = typeof benefit === "string" ? benefit : benefit.title;
      const benefitItems = screen.getAllByTestId(/^key-benefit-/);

      // Check if any of the benefit items contain our text
      const foundBenefit = benefitItems.some((item) => {
        return item.textContent?.includes(benefitText);
      });

      expect(foundBenefit).toBe(true);
    });

    // Change to a different security level and verify benefits update
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Check for HIGH level benefits - fix type safety
    const highNormalizedLevel = SECURITY_LEVELS.HIGH.toUpperCase().replace(
      /\s+/g,
      "_"
    ) as keyof typeof BusinessKeyBenefits;
    const highBenefits = BusinessKeyBenefits[highNormalizedLevel] || [];
    expect(highBenefits.length).toBeGreaterThan(0);

    // Check that at least one HIGH benefit is shown
    rerender(
      <SecuritySummaryWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Get the updated benefit items
    const highBenefitItems = screen.getAllByTestId(/^key-benefit-/);

    // Check if any high benefit is present - ensure highBenefits[0] exists
    if (highBenefits.length > 0) {
      const highBenefitText =
        typeof highBenefits[0] === "string"
          ? highBenefits[0]
          : highBenefits[0]?.title ?? "Unknown";

      const foundHighBenefit = highBenefitItems.some((item) =>
        item.textContent?.includes(highBenefitText)
      );

      expect(foundHighBenefit).toBe(true);
    }
  });

  it("displays ROI estimates based on security level", async () => {
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Now checking the exposed ROI summary instead of the hidden section
    expect(screen.getByTestId("roi-estimate-summary")).toHaveTextContent(
      ROI_ESTIMATES.HIGH
    );

    rerender(
      <SecuritySummaryWidget
        securityLevel="Low"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(screen.getByTestId("roi-estimate-summary")).toHaveTextContent(
      ROI_ESTIMATES.LOW
    );
  });

  it("expands technical section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="High"
        integrityLevel="Moderate"
        confidentialityLevel="High"
      />
    );

    // Find and click the technical section header
    const technicalHeader = screen.getByTestId(
      SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE
    );
    fireEvent.click(technicalHeader);

    // Use waitFor instead of setTimeout
    await waitFor(() => {
      expect(
        screen.getByTestId(SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(SUMMARY_TEST_IDS.AVAILABILITY_TECH_HEADING)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(SUMMARY_TEST_IDS.INTEGRITY_TECH_HEADING)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_HEADING)
      ).toBeInTheDocument();
    });
  });

  it("expands business impact section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Find and click the business impact section header
    const businessHeader = screen.getByTestId("business-impact-toggle");
    fireEvent.click(businessHeader);

    // Use waitFor
    await waitFor(() => {
      expect(screen.getByTestId("business-impact-section")).toBeInTheDocument();
      expect(
        screen.getByTestId("availability-impact-heading")
      ).toBeInTheDocument();
    });
  });

  it("expands metrics section when clicked", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Find and click the metrics section header
    const metricsHeader = screen.getByTestId("metrics-toggle");
    fireEvent.click(metricsHeader);

    // Use waitFor
    await waitFor(() => {
      expect(screen.getByTestId("metrics-section")).toBeInTheDocument();
    });
  });

  it("displays recommendations based on security level", () => {
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel="None"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    expect(screen.getByTestId("recommendation-heading")).toBeInTheDocument();
    expect(screen.getByTestId("security-recommendation")).toBeInTheDocument();

    // Check for recommendation badges with specific testids
    expect(screen.getByTestId("badge-high-risk")).toBeInTheDocument();
    expect(screen.getByTestId("badge-not-recommended")).toBeInTheDocument();

    // Test different security level badges
    rerender(
      <SecuritySummaryWidget
        securityLevel="High"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );
    expect(screen.getByText(/Strong Protection/i)).toBeInTheDocument();
    expect(screen.getByText(/Sensitive Data Ready/i)).toBeInTheDocument();
  });

  // Adding additional test cases to improve coverage

  it("handles expandable sections correctly with keyboard interaction", async () => {
    render(
      <SecuritySummaryWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    const technicalSectionButton = screen.getByTestId(
      "technical-section-toggle"
    );

    // Use userEvent instead of fireEvent for more realistic interaction
    const user = userEvent.setup();
    await user.click(technicalSectionButton);

    // Wait for the section to expand
    await waitFor(
      () => {
        expect(
          screen.getByTestId("technical-details-section")
        ).toBeInTheDocument();
      },
      { timeout: 1500 }
    ); // Increase timeout for slower test environments

    // Test closing the section
    await user.click(technicalSectionButton);

    // Wait for the section to close
    await waitFor(
      () => {
        expect(
          screen.queryByTestId("technical-details-section")
        ).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    ); // Increase timeout for slower test environments
  });

  it("applies the correct variant for different security levels", () => {
    const { rerender } = render(
      <SecuritySummaryWidget
        securityLevel="None"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // We'll check for the value content instead of class since ValueDisplay uses different classes
    expect(screen.getByTestId("roi-estimate-summary-value")).toHaveTextContent(
      ROI_ESTIMATES.NONE
    );

    const levels = ["None", "Low", "Moderate", "High", "Very High"];

    levels.forEach((level) => {
      rerender(
        <SecuritySummaryWidget
          securityLevel={level}
          availabilityLevel="Moderate"
          integrityLevel="Moderate"
          confidentialityLevel="Moderate"
        />
      );

      // For each level, check that the correct ROI message is shown
      const keyForROI = level
        .toUpperCase()
        .replace(/\s+/g, "_") as keyof typeof ROI_ESTIMATES;
      const expectedROI = ROI_ESTIMATES[keyForROI] || "Unknown";

      expect(
        screen.getByTestId("roi-estimate-summary-value")
      ).toHaveTextContent(expectedROI);
    });
  });

  // ... rest of the existing code ...
});
