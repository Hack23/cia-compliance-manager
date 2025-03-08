import React from "react";
import { render, screen } from "@testing-library/react";
import SecurityResourcesWidget from "./SecurityResourcesWidget";
import { SECURITY_LEVELS } from "../../constants/appConstants";

describe("SecurityResourcesWidget", () => {
  it("renders without crashing", () => {
    render(<SecurityResourcesWidget securityLevel="None" />);
    expect(screen.getByTestId("widget-security-resources")).toBeInTheDocument();
    expect(screen.getByText("Security Resources")).toBeInTheDocument();
  });

  it("displays resources relevant to the security level", () => {
    render(<SecurityResourcesWidget securityLevel="High" />);
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
    render(<SecurityResourcesWidget securityLevel="High" />);
    expect(screen.getByText("Security Training")).toBeInTheDocument();
    expect(screen.getByText("Security Awareness Training")).toBeInTheDocument();
    expect(
      screen.getByText("Incident Response Procedures")
    ).toBeInTheDocument();
  });

  it("displays external resources", () => {
    render(<SecurityResourcesWidget securityLevel="High" />);
    expect(screen.getByText("External Resources")).toBeInTheDocument();
    expect(screen.getByText("Industry Security Standards")).toBeInTheDocument();
    expect(
      screen.getByText("Regulatory Compliance Guides")
    ).toBeInTheDocument();
  });
});
