import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KeyValuePair from "./KeyValuePair";
import { COMMON_COMPONENT_TEST_IDS } from "../../constants/testIds";

describe("KeyValuePair Component", () => {
  it("renders with label and value", () => {
    render(<KeyValuePair label="Test Label" value="Test Value" />);

    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_LABEL)
    ).toHaveTextContent("Test Label");
    expect(
      screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_VALUE)
    ).toHaveTextContent("Test Value");
  });

  it("renders with custom test ID", () => {
    const customTestId = "custom-kv-pair";
    render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        testId={customTestId}
      />
    );

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("renders with variant styling", () => {
    render(
      <KeyValuePair
        label="Status"
        value="Active"
        valueClassName="text-green-600"
      />
    );

    const valueElement = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KV_VALUE);
    expect(valueElement.className).toContain("text-green");
  });

  it("renders with custom layout", () => {
    render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        className="flex-col"
      />
    );

    const kvPair = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR);
    expect(kvPair.className).toContain("flex-col");
  });

  it("renders with custom style class", () => {
    // Using className instead of non-existent variant prop
    render(
      <KeyValuePair
        label="Test Label"
        value="Test Value"
        className="highlighted-pair"
      />
    );
    const kvPair = screen.getByTestId(COMMON_COMPONENT_TEST_IDS.KEY_VALUE_PAIR);
    expect(kvPair.className).toContain("highlighted-pair");
  });
});
