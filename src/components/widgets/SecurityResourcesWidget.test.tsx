import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SecurityResourcesWidget from "./SecurityResourcesWidget";

describe("SecurityResourcesWidget", () => {
  it("renders correctly with default props", () => {
    render(<SecurityResourcesWidget />);

    expect(screen.getByTestId("widget-security-resources")).toBeInTheDocument();
    expect(screen.getByText("Security Resources")).toBeInTheDocument();
  });

  it("displays documentation resources", () => {
    render(<SecurityResourcesWidget />);

    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(
      screen.getByText("Security Implementation Guide")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Compliance Reporting Templates")
    ).toBeInTheDocument();
    expect(screen.getByText("Risk Assessment Framework")).toBeInTheDocument();
  });

  it("displays security training resources", () => {
    render(<SecurityResourcesWidget />);

    expect(screen.getByText("Security Training")).toBeInTheDocument();
    expect(screen.getByText("Security Awareness Training")).toBeInTheDocument();
    expect(
      screen.getByText("Incident Response Procedures")
    ).toBeInTheDocument();
  });

  it("displays external resources", () => {
    render(<SecurityResourcesWidget />);

    expect(screen.getByText("External Resources")).toBeInTheDocument();
    expect(screen.getByText("Industry Security Standards")).toBeInTheDocument();
    expect(
      screen.getByText("Regulatory Compliance Guides")
    ).toBeInTheDocument();
  });
});
