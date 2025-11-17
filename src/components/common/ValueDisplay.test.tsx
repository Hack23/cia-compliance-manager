import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ValueDisplay from "./ValueDisplay";

describe("ValueDisplay Component", () => {
  it("renders with value only", () => {
    render(<ValueDisplay value="Test Value" />);

    expect(screen.getByTestId("value-display")).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
  });

  it("renders with label and value", () => {
    render(<ValueDisplay label="Label" value="Value" />);

    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("renders with custom test ID", () => {
    render(<ValueDisplay value="Test Value" testId="custom-value-display" />);

    expect(screen.getByTestId("custom-value-display")).toBeInTheDocument();
  });

  it("applies variant styling", () => {
    render(<ValueDisplay value="Success" variant="success" />);

    // Find the value span and check its class using getByText instead of querySelector
    expect(screen.getByText("Success").className).contain("text-green");
  });

  it("applies size styling", () => {
    render(<ValueDisplay value="Large Text" size="lg" />);

    // Find the value span and check its class using getByText instead of querySelector
    expect(screen.getByText("Large Text").className).contain("text-lg");
  });

  it("renders without label", () => {
    render(<ValueDisplay value="No Label Value" />);

    expect(screen.getByText("No Label Value")).toBeInTheDocument();
  });

  it("applies default variant styling when variant is not specified", () => {
    render(<ValueDisplay value="Default" />);

    const valueElement = screen.getByText("Default");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement.className).toContain("text-blue");
  });

  it("applies default size styling when size is not specified", () => {
    render(<ValueDisplay value="Default Size" />);

    const valueElement = screen.getByText("Default Size");
    expect(valueElement).toBeInTheDocument();
    expect(valueElement.className).toContain("text-base");
  });

  it("applies danger variant styling", () => {
    render(<ValueDisplay value="Danger" variant="danger" />);

    const valueElement = screen.getByText("Danger");
    expect(valueElement.className).toContain("text-red");
  });

  it("applies warning variant styling", () => {
    render(<ValueDisplay value="Warning" variant="warning" />);

    const valueElement = screen.getByText("Warning");
    expect(valueElement.className).toContain("text-yellow");
  });

  it("applies info variant styling", () => {
    render(<ValueDisplay value="Info" variant="info" />);

    const valueElement = screen.getByText("Info");
    expect(valueElement.className).toContain("text-blue");
  });

  it("applies primary variant styling", () => {
    render(<ValueDisplay value="Primary" variant="primary" />);

    const valueElement = screen.getByText("Primary");
    expect(valueElement.className).toContain("text-blue");
  });

  it("applies small size styling", () => {
    render(<ValueDisplay value="Small" size="sm" />);

    const valueElement = screen.getByText("Small");
    expect(valueElement.className).toContain("text-sm");
  });

  it("applies medium size styling", () => {
    render(<ValueDisplay value="Medium" size="md" />);

    const valueElement = screen.getByText("Medium");
    expect(valueElement.className).toContain("text-base");
  });

  it("applies large size styling", () => {
    render(<ValueDisplay value="Large" size="lg" />);

    const valueElement = screen.getByText("Large");
    expect(valueElement.className).toContain("text-lg");
  });

  it("renders with empty string value", () => {
    render(<ValueDisplay value="" />);

    expect(screen.getByTestId("value-display")).toBeInTheDocument();
  });

  it("renders with numeric value", () => {
    render(<ValueDisplay value={12345} />);

    expect(screen.getByText("12345")).toBeInTheDocument();
  });

  it("renders label after value", () => {
    render(<ValueDisplay label="suffix" value="Test Value" />);

    const container = screen.getByTestId("value-display");
    expect(container).toBeInTheDocument();
    expect(screen.getByText("Test Value")).toBeInTheDocument();
    expect(screen.getByText("suffix")).toBeInTheDocument();
  });

  it("renders with combined variant and size props", () => {
    render(<ValueDisplay value="Combined" variant="success" size="lg" />);

    const valueElement = screen.getByText("Combined");
    expect(valueElement.className).toContain("text-green");
    expect(valueElement.className).toContain("text-lg");
  });

  it("applies font-medium class to value", () => {
    render(<ValueDisplay value="Bold Value" />);

    const valueElement = screen.getByText("Bold Value");
    expect(valueElement.className).toContain("font-medium");
  });

  it("applies smaller text and gray color to label", () => {
    render(<ValueDisplay value="Value" label="Label" />);

    const labelElement = screen.getByText("Label");
    expect(labelElement.className).toContain("text-xs");
    expect(labelElement.className).toContain("text-gray");
  });
});
