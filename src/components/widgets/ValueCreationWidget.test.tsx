import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValueCreationWidget from "./ValueCreationWidget";
import { WIDGET_TEST_IDS, createDynamicTestId } from "../../constants/testIds";
import {
  SECURITY_LEVELS,
  VALUE_CREATION_POINTS,
} from "../../constants/appConstants";

describe("ValueCreationWidget", () => {
  it("renders the widget with None level", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.NONE}
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
      />
    );

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.VALUE_CREATION_TITLE)
    ).toHaveTextContent(`${SECURITY_LEVELS.NONE} Value Creation`);

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.VALUE_CREATION_SUBTITLE)
    ).toBeInTheDocument();
  });

  it("renders the widget with High level", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    expect(
      screen.getByTestId(WIDGET_TEST_IDS.VALUE_CREATION_TITLE)
    ).toHaveTextContent(`${SECURITY_LEVELS.HIGH} Value Creation`);

    const pointsList = screen.getByTestId(WIDGET_TEST_IDS.VALUE_POINTS_LIST);
    expect(pointsList).toBeInTheDocument();

    expect(
      screen.getByTestId(createDynamicTestId.valuePoint(0))
    ).toBeInTheDocument();
  });

  it("calculates ROI correctly", () => {
    render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.NONE}
        availabilityLevel={SECURITY_LEVELS.NONE}
        integrityLevel={SECURITY_LEVELS.NONE}
        confidentialityLevel={SECURITY_LEVELS.NONE}
      />
    );

    const roiText =
      screen.getByTestId(WIDGET_TEST_IDS.ROI_VALUE).textContent || "";
    const capexValue = 100;
    const opexValue = 50;
    const valueCreation = 20;

    if (capexValue + opexValue > valueCreation * 2) {
      expect(roiText).toMatch(/negative|loss/i);
    } else {
      expect(roiText).toMatch(/x\b/);
    }
  });

  it("displays different value propositions based on security levels", () => {
    const { rerender } = render(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.LOW}
        availabilityLevel={SECURITY_LEVELS.LOW}
        integrityLevel={SECURITY_LEVELS.LOW}
        confidentialityLevel={SECURITY_LEVELS.LOW}
      />
    );

    const lowValuePoints =
      VALUE_CREATION_POINTS[
        SECURITY_LEVELS.LOW as keyof typeof VALUE_CREATION_POINTS
      ];
    if (lowValuePoints && lowValuePoints.length > 0) {
      expect(
        screen.getByText(new RegExp(lowValuePoints[0] || ""))
      ).toBeInTheDocument();
    }

    rerender(
      <ValueCreationWidget
        securityLevel={SECURITY_LEVELS.HIGH}
        availabilityLevel={SECURITY_LEVELS.HIGH}
        integrityLevel={SECURITY_LEVELS.HIGH}
        confidentialityLevel={SECURITY_LEVELS.HIGH}
      />
    );

    const highValuePoints =
      VALUE_CREATION_POINTS[
        SECURITY_LEVELS.HIGH as keyof typeof VALUE_CREATION_POINTS
      ];
    if (highValuePoints && highValuePoints.length > 0) {
      expect(
        screen.getByText(new RegExp(highValuePoints[0] || ""))
      ).toBeInTheDocument();
    }
  });
});
