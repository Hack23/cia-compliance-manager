import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResourceCard from "./ResourceCard";
import { SecurityResource } from "../../types/securityResources";

describe("ResourceCard", () => {
  const mockResource: SecurityResource = {
    title: "Test Resource",
    description: "This is a test resource description",
    url: "https://example.com",
    type: "Guide",
    component: "TestComponent",
    source: "TestSource",
    level: "High",
    tags: ["tag1", "tag2"],
  };

  it("renders the component", () => {
    render(<ResourceCard resource={mockResource} />);
    expect(screen.getByText("Test Resource")).toBeInTheDocument();
    expect(screen.getByText("This is a test resource description")).toBeInTheDocument();
    expect(screen.getByText("Guide")).toBeInTheDocument();
    expect(screen.getByText("Component: TestComponent")).toBeInTheDocument();
    expect(screen.getByText("Source: TestSource")).toBeInTheDocument();
    expect(screen.getByText("Level: High")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
    expect(screen.getByText("tag2")).toBeInTheDocument();
  });

  it("handles click event", () => {
    const handleClick = vi.fn();
    render(<ResourceCard resource={mockResource} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledWith(mockResource);
  });

  it("truncates text correctly", () => {
    const longDescription = "This is a very long description that should be truncated when it exceeds the maximum length allowed for display in the ResourceCard component.";
    const resourceWithLongDescription = { ...mockResource, description: longDescription };
    render(<ResourceCard resource={resourceWithLongDescription} />);
    expect(screen.getByText(/This is a very long description that should be truncated/i)).toBeInTheDocument();
    expect(screen.queryByText(longDescription)).not.toBeInTheDocument();
  });
});
