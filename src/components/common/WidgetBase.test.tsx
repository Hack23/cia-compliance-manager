import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WidgetBase } from "./WidgetBase";

describe("WidgetBase", () => {
  it("renders with default props", () => {
    render(<WidgetBase>Content</WidgetBase>);
    
    // Should render the children
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with title and description", () => {
    render(
      <WidgetBase title="Test Widget" description="Widget description">
        Content
      </WidgetBase>
    );
    
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByText("Widget description")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<WidgetBase className="custom-class">Content</WidgetBase>);
    
    const widget = screen.getByText("Content").closest(".widget");
    expect(widget).toHaveClass("custom-class");
  });

  it("renders with specified size", () => {
    render(<WidgetBase size="small" testId="sized-widget">Content</WidgetBase>);
    
    const widget = screen.getByTestId("sized-widget");
    expect(widget).toHaveClass("col-span-1"); // Small widgets use col-span-1
  });

  it("renders loading state", () => {
    render(<WidgetBase isLoading>Content</WidgetBase>);
    
    // Content should not be visible in loading state
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    
    // Should show a loading spinner
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("renders error state", () => {
    const testError = new Error("Test error message");
    render(<WidgetBase error={testError}>Content</WidgetBase>);
    
    // Content should not be visible in error state
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
    
    // Should show the error message
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });
});
