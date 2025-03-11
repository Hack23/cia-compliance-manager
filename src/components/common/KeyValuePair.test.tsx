import React from "react";
import { render, screen } from "@testing-library/react";
import KeyValuePair from "./KeyValuePair";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("KeyValuePair Component", () => {
  it("renders with label and value", () => {
    render(<KeyValuePair label="Test Label" value="Test Value" />);
    
    // Just check that the component renders with the right content
    expect(screen.getByTestId("key-value-pair")).toBeInTheDocument();
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("renders with custom test ID", () => {
    render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        testId="custom-key-value"
      />
    );

    expect(screen.getByTestId("custom-key-value")).toBeInTheDocument();
  });

  it("renders with value styling", () => {
    render(
      <KeyValuePair
        label="Status"
        value="Active"
        valueClassName="text-green-600"
      />
    );

    // Check that the component renders with value content
    const keyValuePair = screen.getByTestId("key-value-pair");
    expect(keyValuePair).toBeInTheDocument();
    
    // Check directly if the value text has the applied styling by finding it specifically
    const valueElement = screen.getByText("Active");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement.className).toContain("text-green-600");
  });

  it("renders with label styling", () => {
    render(
      <KeyValuePair
        label="Status"
        value="Active"
        labelClassName="font-bold"
      />
    );

    expect(screen.getByTestId("key-value-pair")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Status").className).toContain("font-bold");
  });

  it("renders with custom style class", () => {
    render(
      <KeyValuePair
        label="Status"
        value="Active"
        className="custom-class"
      />
    );

    const keyValuePair = screen.getByTestId("key-value-pair");
    expect(keyValuePair.className).toContain("custom-class");
  });
});
