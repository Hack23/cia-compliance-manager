import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SecurityResourcesWidget from "./SecurityResourcesWidget";

// Mock the ciaContentService instead of the data file
vi.mock("../../services/ciaContentService", () => ({
  default: {
    getSecurityResources: vi.fn().mockImplementation(() => [
      {
        title: "NIST Cybersecurity Framework",
        description:
          "Guidelines, standards, and best practices to manage cybersecurity-related risk",
        url: "https://www.nist.gov/cyberframework",
        category: "Framework",
        tags: ["framework", "guidelines", "risk-management"],
        relevantLevels: ["Low", "Moderate", "High", "Very High"],
        relevanceScore: 90,
        type: "Documentation",
      },
      {
        title: "OWASP Top Ten",
        description: "Top 10 most critical web application security risks",
        url: "https://owasp.org/www-project-top-ten/",
        category: "Web Security",
        tags: ["web-security", "vulnerabilities", "best-practices"],
        relevantLevels: ["Low", "Moderate", "High", "Very High"],
        relevanceScore: 85,
        type: "Standard",
      },
    ]),
  },
}));

describe("SecurityResourcesWidget", () => {
  // Fix the test to use the correct testId
  it("renders without crashing", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="Moderate"
        availabilityLevel="Moderate"
        integrityLevel="Moderate"
        confidentialityLevel="Moderate"
      />
    );

    // Changed to match the actual testId used in the component
    expect(screen.getByTestId("security-resources-widget")).toBeInTheDocument();
    expect(screen.getByText("Security Resources")).toBeInTheDocument();
  });

  it("displays resources relevant to the security level", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check for the titles from our mock data
    expect(
      screen.getByText("NIST Cybersecurity Framework")
    ).toBeInTheDocument();
    expect(screen.getByText("OWASP Top Ten")).toBeInTheDocument();

    // Using getAllByText to handle multiple occurrences of "Framework"
    expect(screen.getAllByText("Framework")[0]).toBeInTheDocument();
    expect(screen.getByText("framework")).toBeInTheDocument();
    expect(screen.getByText("guidelines")).toBeInTheDocument();
  });

  it("displays security training resources", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check for the resources we know exist in the mocked data
    expect(
      screen.getByText("NIST Cybersecurity Framework")
    ).toBeInTheDocument();
    expect(screen.getByText("OWASP Top Ten")).toBeInTheDocument();
  });

  it("displays external resources", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Check for the external resources from our mock data
    expect(
      screen.getByText("NIST Cybersecurity Framework")
    ).toBeInTheDocument();
    expect(screen.getByText("OWASP Top Ten")).toBeInTheDocument();
  });

  it("allows filtering resources by category", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Select a category from the dropdown
    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "Framework" } });

    // The Framework resource should be visible
    expect(
      screen.getByText("NIST Cybersecurity Framework")
    ).toBeInTheDocument();

    // The Web Security resource should not be visible
    expect(screen.queryByText("OWASP Top Ten")).not.toBeInTheDocument();
  });

  it("allows searching for resources", () => {
    render(
      <SecurityResourcesWidget
        securityLevel="High"
        availabilityLevel="High"
        integrityLevel="High"
        confidentialityLevel="High"
      />
    );

    // Get the search input
    const searchInput = screen.getByPlaceholderText("Search resources...");

    // Search for "NIST"
    fireEvent.change(searchInput, { target: { value: "NIST" } });

    // Since the component has a network activity simulation, we need to wait for it
    // Add a timeout to handle the asynchronous nature of search
    // Using findByText instead of getByText
    return screen.findByText("NIST Cybersecurity Framework").then((element) => {
      expect(element).toBeInTheDocument();
      expect(screen.queryByText("OWASP Top Ten")).not.toBeInTheDocument();
    });
  });
});
