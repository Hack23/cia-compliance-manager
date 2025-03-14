import { render, screen } from "@testing-library/react";
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
    expect(screen.getByText("Success").className).toContain("text-green");
  });

  it("applies size styling", () => {
    render(<ValueDisplay value="Large Text" size="lg" />);

    // Find the value span and check its class using getByText instead of querySelector
    expect(screen.getByText("Large Text").className).toContain("text-lg");
  });
});
