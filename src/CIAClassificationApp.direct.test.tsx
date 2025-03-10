import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CIAClassificationApp from "./CIAClassificationApp";
import { APP_TEST_IDS, SECURITY_LEVEL_TEST_IDS } from "./constants/testIds";
import { SECURITY_LEVELS } from "./constants/appConstants";

// Mock the ROI_ESTIMATES to prevent errors
vi.mock("./hooks/useCIAOptions", () => {
  return {
    __esModule: true,
    useCIAOptions: () => ({
      availabilityOptions: {
        None: { capex: 0, opex: 0 },
        Low: { capex: 5, opex: 2 },
        Moderate: { capex: 10, opex: 5 },
        High: { capex: 15, opex: 8 },
        "Very High": { capex: 20, opex: 10 },
      },
      integrityOptions: {
        None: { capex: 0, opex: 0 },
        Low: { capex: 5, opex: 2 },
        Moderate: { capex: 10, opex: 5 },
        High: { capex: 15, opex: 8 },
        "Very High": { capex: 20, opex: 10 },
      },
      confidentialityOptions: {
        None: { capex: 0, opex: 0 },
        Low: { capex: 5, opex: 2 },
        Moderate: { capex: 10, opex: 5 },
        High: { capex: 15, opex: 8 },
        "Very High": { capex: 20, opex: 10 },
      },
      ROI_ESTIMATES: {
        NONE: {
          returnRate: "0%",
          description: "No security investment means no return",
          potentialSavings: "$0",
          breakEvenPeriod: "N/A",
        },
        LOW: {
          returnRate: "100%",
          description: "Basic security provides minimal return",
          potentialSavings: "$10,000",
          breakEvenPeriod: "24 months",
        },
        MODERATE: {
          returnRate: "200%",
          description: "Standard security provides good value",
          potentialSavings: "$50,000",
          breakEvenPeriod: "18 months",
        },
        HIGH: {
          returnRate: "350%",
          description: "Advanced security provides significant protection",
          potentialSavings: "$250,000",
          breakEvenPeriod: "12 months",
        },
        VERY_HIGH: {
          returnRate: "500%",
          description: "Maximum security provides optimal protection",
          potentialSavings: "$500,000",
          breakEvenPeriod: "6 months",
        },
      },
    }),
    availabilityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    integrityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    confidentialityOptions: {
      None: { capex: 0, opex: 0 },
      Low: { capex: 5, opex: 2 },
      Moderate: { capex: 10, opex: 5 },
      High: { capex: 15, opex: 8 },
      "Very High": { capex: 20, opex: 10 },
    },
    ROI_ESTIMATES: {
      NONE: {
        returnRate: "0%",
        description: "No security investment means no return",
        potentialSavings: "$0",
        breakEvenPeriod: "N/A",
      },
      LOW: {
        returnRate: "100%",
        description: "Basic security provides minimal return",
        potentialSavings: "$10,000",
        breakEvenPeriod: "24 months",
      },
      MODERATE: {
        returnRate: "200%",
        description: "Standard security provides good value",
        potentialSavings: "$50,000",
        breakEvenPeriod: "18 months",
      },
      HIGH: {
        returnRate: "350%",
        description: "Advanced security provides significant protection",
        potentialSavings: "$250,000",
        breakEvenPeriod: "12 months",
      },
      VERY_HIGH: {
        returnRate: "500%",
        description: "Maximum security provides optimal protection",
        potentialSavings: "$500,000",
        breakEvenPeriod: "6 months",
      },
    },
  };
});

// Mock all the widget components
vi.mock("./components/widgets/SecurityLevelWidget", () => ({
  default: () => (
    <div data-testid="mock-security-level">Security Level Widget</div>
  ),
}));

// Add mocks for other widgets (similar to CIAClassificationApp.test.tsx)
// ...

describe("CIAClassificationApp Component Direct Tests", () => {
  it("renders basic structure correctly", () => {
    render(<CIAClassificationApp />);
    expect(screen.getByTestId(APP_TEST_IDS.APP_CONTAINER)).toBeInTheDocument();
    expect(screen.getByTestId(APP_TEST_IDS.APP_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId(APP_TEST_IDS.THEME_TOGGLE)).toBeInTheDocument();
  });

  it("shows security level section", () => {
    render(<CIAClassificationApp />);
    const securityLevelWidget = screen.getByTestId("mock-security-level");
    expect(securityLevelWidget).toBeInTheDocument();
  });
});
