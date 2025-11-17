import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ResourceCard from "./ResourceCard";
import { SecurityResource } from "../../types/securityResources";

describe("ResourceCard Component", () => {
  const mockResource: SecurityResource = {
    id: "test-1",
    title: "Test Resource",
    description: "This is a test resource description",
    url: "https://example.com",
    type: "Guide",
    component: "availability",
    source: "NIST",
    level: "Moderate",
    tags: ["tag1", "tag2", "tag3"],
  };

  it("renders without crashing", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByTestId("resource-item")).toBeInTheDocument();
    expect(screen.getByText("Test Resource")).toBeInTheDocument();
  });

  it("displays resource title", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText("Test Resource")).toBeInTheDocument();
  });

  it("displays resource description", () => {
    render(<ResourceCard resource={mockResource} />);

    if (mockResource.description) {
      expect(screen.getByText(mockResource.description)).toBeInTheDocument();
    }
  });

  it("displays resource type", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText("Guide")).toBeInTheDocument();
  });

  it("displays component information when available", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText(/Component: availability/i)).toBeInTheDocument();
  });

  it("displays source information when available", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText(/Source: NIST/i)).toBeInTheDocument();
  });

  it("displays level information when available", () => {
    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText(/Level: Moderate/i)).toBeInTheDocument();
  });

  it("displays all tags", () => {
    render(<ResourceCard resource={mockResource} />);

    mockResource.tags?.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("opens URL in new tab when clicked without custom onClick", () => {
    const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ResourceCard resource={mockResource} />);

    const card = screen.getByTestId("resource-item");
    fireEvent.click(card);

    expect(windowOpenSpy).toHaveBeenCalledWith(
      mockResource.url,
      "_blank",
      "noopener,noreferrer"
    );

    windowOpenSpy.mockRestore();
  });

  it("calls custom onClick handler when provided", () => {
    const mockOnClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);

    const card = screen.getByTestId("resource-item");
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it("handles keyboard Enter key", () => {
    const mockOnClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);

    const card = screen.getByTestId("resource-item");
    fireEvent.keyDown(card, { key: "Enter" });

    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it("handles keyboard Space key", () => {
    const mockOnClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);

    const card = screen.getByTestId("resource-item");
    fireEvent.keyDown(card, { key: " " });

    expect(mockOnClick).toHaveBeenCalledWith(mockResource);
  });

  it("does not trigger action on other keyboard keys", () => {
    const mockOnClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={mockOnClick} />);

    const card = screen.getByTestId("resource-item");
    fireEvent.keyDown(card, { key: "a" });

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("truncates long descriptions", () => {
    const longDescription = "a".repeat(150);
    const resourceWithLongDesc: SecurityResource = {
      ...mockResource,
      description: longDescription,
    };

    render(<ResourceCard resource={resourceWithLongDesc} />);

    // Check that the description was truncated by looking for the ellipsis
    const descriptionElement = screen.getByText(/\.\.\.$/);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.textContent?.length).toBeLessThanOrEqual(103); // 100 chars + "..."
  });

  it("applies custom className", () => {
    render(<ResourceCard resource={mockResource} className="custom-class" />);

    const card = screen.getByTestId("resource-item");
    expect(card.className).toContain("custom-class");
  });

  it("uses custom testId when provided", () => {
    render(<ResourceCard resource={mockResource} testId="custom-test-id" />);

    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });

  it("handles missing description gracefully", () => {
    const resourceWithoutDesc: SecurityResource = {
      ...mockResource,
      description: undefined,
    };

    render(<ResourceCard resource={resourceWithoutDesc} />);

    expect(screen.getByTestId("resource-item")).toBeInTheDocument();
  });

  it("handles empty description", () => {
    const resourceWithEmptyDesc: SecurityResource = {
      ...mockResource,
      description: "",
    };

    render(<ResourceCard resource={resourceWithEmptyDesc} />);

    expect(screen.getByTestId("resource-item")).toBeInTheDocument();
  });

  it("displays General type when type is missing", () => {
    const resourceWithoutType: SecurityResource = {
      ...mockResource,
      type: undefined,
    };

    render(<ResourceCard resource={resourceWithoutType} />);

    expect(screen.getByText("General")).toBeInTheDocument();
  });

  it("does not display component info when not available", () => {
    const resourceWithoutComponent: SecurityResource = {
      ...mockResource,
      component: undefined,
    };

    render(<ResourceCard resource={resourceWithoutComponent} />);

    expect(screen.queryByText(/Component:/)).not.toBeInTheDocument();
  });

  it("does not display source info when not available", () => {
    const resourceWithoutSource: SecurityResource = {
      ...mockResource,
      source: undefined,
    };

    render(<ResourceCard resource={resourceWithoutSource} />);

    expect(screen.queryByText(/Source:/)).not.toBeInTheDocument();
  });

  it("does not display level info when not available", () => {
    const resourceWithoutLevel: SecurityResource = {
      ...mockResource,
      level: undefined,
    };

    render(<ResourceCard resource={resourceWithoutLevel} />);

    expect(screen.queryByText(/Level:/)).not.toBeInTheDocument();
  });

  it("handles resources without tags", () => {
    const resourceWithoutTags: SecurityResource = {
      ...mockResource,
      tags: undefined,
    };

    render(<ResourceCard resource={resourceWithoutTags} />);

    expect(screen.getByTestId("resource-item")).toBeInTheDocument();
  });

  it("handles resources with empty tags array", () => {
    const resourceWithEmptyTags: SecurityResource = {
      ...mockResource,
      tags: [],
    };

    render(<ResourceCard resource={resourceWithEmptyTags} />);

    expect(screen.getByTestId("resource-item")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<ResourceCard resource={mockResource} />);

    const card = screen.getByTestId("resource-item");
    expect(card).toHaveAttribute("role", "button");
    expect(card).toHaveAttribute("tabIndex", "0");
  });
});
