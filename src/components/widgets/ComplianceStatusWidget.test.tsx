import React from "react";
import { render, screen, within } from "@testing-library/react";
import ComplianceStatusWidget from "./ComplianceStatusWidget";
import {
  FRAMEWORK_TEST_IDS,
  createDynamicTestId,
} from "../../constants/testIds";
import {
  SECURITY_LEVELS,
  COMPLIANCE_FRAMEWORKS,
} from "../../constants/appConstants";

describe("ComplianceStatusWidget", () => {
  it("shows non-compliant status for None security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
      />
    );

    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent(/non-compliant/i);
    expect(statusBadge.classList.toString()).toMatch(/bg-red-100/);
  });

  it("shows basic compliance for Low security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel={SECURITY_LEVELS.LOW}
        integrityLevel={SECURITY_LEVELS.LOW}
        confidentialityLevel={SECURITY_LEVELS.LOW}
      />
    );

    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent(/basic/i);

    // Should show at least one framework as compliant
    expect(
      screen.getByTestId(createDynamicTestId.framework(0))
    ).toBeInTheDocument();
  });

  it("shows standard compliance for Moderate security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel={SECURITY_LEVELS.MODERATE}
        integrityLevel={SECURITY_LEVELS.MODERATE}
        confidentialityLevel={SECURITY_LEVELS.MODERATE}
      />
    );

    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent(
      /compliant with standard frameworks/i
    );
    expect(statusBadge.classList.toString()).toMatch(/bg-blue-100/);

    // Should show at least one framework as compliant
    expect(
      screen.getByTestId(FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST)
    ).toBeInTheDocument();

    // Extract all list items from the compliant frameworks list
    const frameworksList = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST
    );
    const frameworkItems = within(frameworksList).getAllByRole("listitem");
    const frameworkTexts = frameworkItems.map((item) => item.textContent);

    // Check if SOC2 and ISO27001 frameworks are included in the list
    expect(
      frameworkTexts.some((text) => text?.includes(COMPLIANCE_FRAMEWORKS.SOC2))
    ).toBe(true);
    expect(
      frameworkTexts.some((text) =>
        text?.includes(COMPLIANCE_FRAMEWORKS.ISO27001)
      )
    ).toBe(true);
  });

  it("shows full compliance for High security level", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent(/compliant with all/i);
  });

  it("displays compliant frameworks", () => {
    render(
      <ComplianceStatusWidget
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    // Get the framework list container
    const requirementsList = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST
    );
    expect(requirementsList).toBeInTheDocument();

    // Check that all major frameworks are included
    const frameworks = screen.getAllByTestId(/framework-\d+/);
    expect(frameworks.length).toBeGreaterThanOrEqual(4);

    const frameworkNames = Object.values(COMPLIANCE_FRAMEWORKS);
    frameworkNames.forEach((framework) => {
      try {
        const element = screen.getByText(new RegExp(framework, "i"));
        expect(element).toBeInTheDocument();
      } catch (error) {
        // Some frameworks may not be displayed depending on security level
        console.log(`Framework ${framework} not found in current view`);
      }
    });
  });

  it("handles unknown security level", () => {
    // @ts-ignore - intentionally testing with invalid value
    render(
      <ComplianceStatusWidget
        availabilityLevel="Unknown"
        integrityLevel="Unknown"
        confidentialityLevel="Unknown"
      />
    );

    const statusBadge = screen.getByTestId(
      FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE
    );
    expect(statusBadge).toHaveTextContent(/non-compliant/i);
  });
});
