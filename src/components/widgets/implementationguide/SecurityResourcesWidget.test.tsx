import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SecurityLevel } from "../../../types/cia";
import SecurityResourcesWidget from "./SecurityResourcesWidget";

// Mock useCIAContentService hook
vi.mock("../../../hooks/useCIAContentService", () => ({
  useCIAContentService: () => ({
    ciaContentService: {
      getSecurityResources: (securityLevel: SecurityLevel) => {
        const baseSampleResources = [
          {
            title: "Basic Security Guide",
            url: "https://example.com/basic",
            description: "Basic security resource",
            category: "Documentation",
            securityLevels: ["Low", "Moderate", "High", "Very High"],
            tags: ["basic", "general"],
            relevance: 0.9,
          },
          {
            title: "Authentication Best Practices",
            url: "https://example.com/auth",
            description: "How to implement authentication",
            category: "Guide",
            securityLevels: ["Moderate", "High", "Very High"],
            tags: ["auth", "security"],
            relevance: 0.8,
          },
          {
            title: "Advanced Encryption Methods",
            url: "https://example.com/encryption",
            description: "Encryption for high security needs",
            category: "Technical",
            securityLevels: ["High", "Very High"],
            tags: ["encryption", "advanced"],
            relevance: 0.7,
          },
          {
            title: "Enterprise Security Framework",
            url: "https://example.com/enterprise",
            description: "Enterprise-level security measures",
            category: "Framework",
            securityLevels: ["Very High"],
            tags: ["enterprise", "advanced"],
            relevance: 0.6,
          },
        ];

        // Return resources appropriate for the requested security level
        return baseSampleResources.filter((resource) =>
          resource.securityLevels.includes(securityLevel)
        );
      },
      getSecurityResourceCategories: () => [
        "All",
        "Documentation",
        "Guide",
        "Technical",
        "Framework",
      ],
    },
    error: null,
    isLoading: false,
  }),
}));

// Mock WidgetContainer component
vi.mock("../../../components/common/WidgetContainer", () => ({
  default: ({
    children,
    title,
    testId,
  }: {
    children: React.ReactNode;
    title: string;
    testId?: string;
  }) => (
    <div data-testid={testId || "widget-container"}>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

describe("SecurityResourcesWidget", () => {
  const defaultProps = {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    testId: "security-resources-widget",
  };

  it("renders without crashing", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    expect(screen.getByTestId("security-resources-widget")).toBeInTheDocument();
  });

  it("renders resources based on security level", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Should show both basic and authentication resources for Moderate level
    expect(screen.getByText("Basic Security Guide")).toBeInTheDocument();
    expect(
      screen.getByText("Authentication Best Practices")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Advanced Encryption Methods")
    ).not.toBeInTheDocument();
  });

  it("filters resources by category", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Initially should show all categories
    expect(screen.getByText("Basic Security Guide")).toBeInTheDocument();
    expect(
      screen.getByText("Authentication Best Practices")
    ).toBeInTheDocument();

    // Find category filters
    const categorySelector = screen.getByLabelText(/Filter by category/i);
    expect(categorySelector).toBeInTheDocument();

    // Select "Documentation" category
    await act(async () => {
      fireEvent.change(categorySelector, {
        target: { value: "Documentation" },
      });
    });

    // Should only show "Basic Security Guide" which is in Documentation category
    expect(screen.getByText("Basic Security Guide")).toBeInTheDocument();
    expect(
      screen.queryByText("Authentication Best Practices")
    ).not.toBeInTheDocument();
  });

  it("allows searching for resources", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Find search input
    const searchInput =
      screen.getByPlaceholderText(/search/i) || screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();

    // Search for "authentication"
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "authentication" } });
    });

    // Should only show authentication resource
    await waitFor(() => {
      expect(
        screen.queryByText("Basic Security Guide")
      ).not.toBeInTheDocument();
      expect(
        screen.getByText("Authentication Best Practices")
      ).toBeInTheDocument();
    });
  });

  it("shows higher security level resources when security level is high", async () => {
    await act(async () => {
      render(
        <SecurityResourcesWidget
          {...defaultProps}
          availabilityLevel="High"
          integrityLevel="High"
          confidentialityLevel="High"
        />
      );
    });

    // Should show all but the highest level resources
    expect(screen.getByText("Basic Security Guide")).toBeInTheDocument();
    expect(
      screen.getByText("Authentication Best Practices")
    ).toBeInTheDocument();
    expect(screen.getByText("Advanced Encryption Methods")).toBeInTheDocument();
    expect(
      screen.queryByText("Enterprise Security Framework")
    ).not.toBeInTheDocument();
  });

  it("allows custom testId", async () => {
    const customTestId = "custom-security-resources";

    await act(async () => {
      render(
        <SecurityResourcesWidget {...defaultProps} testId={customTestId} />
      );
    });

    expect(screen.getByTestId(customTestId)).toBeInTheDocument();
  });

  it("handles different security levels", async () => {
    await act(async () => {
      render(
        <SecurityResourcesWidget
          {...defaultProps}
          availabilityLevel="None"
          integrityLevel="None"
          confidentialityLevel="None"
        />
      );
    });

    // Should show no resources for None security level
    expect(screen.queryByText("Basic Security Guide")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Authentication Best Practices")
    ).not.toBeInTheDocument();
  });

  it("renders the widget with resources", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Should show widget title
    expect(screen.getByText(/security resources/i)).toBeInTheDocument();

    // Should show resource cards
    const resourceCards = screen.getAllByRole("link");
    expect(resourceCards.length).toBeGreaterThan(0);
  });

  it("filters resources by category", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Get category filter
    const categoryFilter = screen.getByLabelText(/filter by category/i);

    // Select Technical category
    await act(async () => {
      fireEvent.change(categoryFilter, { target: { value: "Technical" } });
    });

    // Should filter out resources that aren't in Technical category
    expect(screen.queryByText("Basic Security Guide")).not.toBeInTheDocument();
  });

  it("filters resources by search query", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Get search input
    const searchInput =
      screen.getByPlaceholderText(/search/i) || screen.getByRole("textbox");

    // Search for "encryption"
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "encryption" } });
    });

    // Should not show resources that don't match the search
    await waitFor(() => {
      expect(
        screen.queryByText("Basic Security Guide")
      ).not.toBeInTheDocument();
    });
  });

  it("displays a message when no resources match filters", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    // Get search input
    const searchInput =
      screen.getByPlaceholderText(/search/i) || screen.getByRole("textbox");

    // Search for something that doesn't exist
    await act(async () => {
      fireEvent.change(searchInput, {
        target: { value: "nonexistent resource" },
      });
    });

    // Should show no results message
    await waitFor(() => {
      expect(screen.getByText(/no resources found/i)).toBeInTheDocument();
    });
  });

  it("displays resources filtered by security level", async () => {
    const { rerender } = render(<SecurityResourcesWidget {...defaultProps} />);

    await act(async () => {
      // Wait for initial render
    });

    // Should show moderate level resources
    expect(screen.getByText("Basic Security Guide")).toBeInTheDocument();
    expect(
      screen.getByText("Authentication Best Practices")
    ).toBeInTheDocument();

    // Rerender with higher security level
    await act(async () => {
      rerender(
        <SecurityResourcesWidget
          {...defaultProps}
          availabilityLevel="Very High"
          integrityLevel="Very High"
          confidentialityLevel="Very High"
        />
      );
    });

    // Should now include all resources including highest level
    await waitFor(() => {
      expect(
        screen.getByText("Enterprise Security Framework")
      ).toBeInTheDocument();
    });
  });

  it("displays sorted resources by relevance", async () => {
    await act(async () => {
      render(<SecurityResourcesWidget {...defaultProps} />);
    });

    const resourceLinks = screen.getAllByRole("link");

    // First resource should be the one with highest relevance
    expect(resourceLinks[0]).toHaveTextContent("Basic Security Guide");
  });
});
