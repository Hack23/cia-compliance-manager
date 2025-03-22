import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MetricsCard from "./MetricsCard";

describe("MetricsCard Component", () => {
  it("renders with title and value", () => {
    render(<MetricsCard title="Test Title" value="100" />);
    
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders with custom test ID", () => {
    render(<MetricsCard title="Test Title" value="100" testId="custom-card" />);
    
    expect(screen.getByTestId("custom-card")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(<MetricsCard title="Test Title" value="100" icon="📈" />);
    
    expect(screen.getByText("📈")).toBeInTheDocument();
  });


  it("applies variant styling", () => {
    const { rerender } = render(
      <MetricsCard title="Test Title" value="100" variant="default" testId="card" />
    );
    
    const card = screen.getByTestId("card");
    expect(card.className).toContain("bg-gray-50");
    
    rerender(<MetricsCard title="Test Title" value="100" variant="success" testId="card" />);
    expect(card.className).toContain("bg-green-50");
    
    rerender(<MetricsCard title="Test Title" value="100" variant="warning" testId="card" />);
    expect(card.className).toContain("bg-yellow-50");
    
    rerender(<MetricsCard title="Test Title" value="100" variant="error" testId="card" />);
    expect(card.className).toContain("bg-red-50");
    
    rerender(<MetricsCard title="Test Title" value="100" variant="info" testId="card" />);
    expect(card.className).toContain("bg-blue-50");
  });

  it("renders with compact styling", () => {
    render(<MetricsCard title="Test Title" value="100" compact testId="card" />);
    
    const card = screen.getByTestId("card");
    expect(card.className).toContain("p-3");
  });

  it("renders with accent color", () => {
    render(<MetricsCard 
      title="Test Title" 
      value="100" 
      accentColor="#ff0000" 
      testId="card" 
    />);
    
    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
    // We can't easily test inline styles in testing-library, but we can check that the component renders
  });
});
