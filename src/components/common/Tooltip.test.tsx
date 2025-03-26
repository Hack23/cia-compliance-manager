import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Tooltip from "./Tooltip";

describe("Tooltip Component", () => {
  it("renders children correctly", () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    expect(button).toBeInTheDocument();
  });

  it("shows tooltip on mouseenter", async () => {
    render(
      <Tooltip content="Tooltip content" data-testid="tooltip">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });
  });

  it("hides tooltip on mouseleave", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      expect(screen.getByText("Tooltip content")).toBeInTheDocument();
    });

    fireEvent.mouseLeave(button);

    await waitFor(() => {
      expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
    });
  });

  it("applies custom placement", async () => {
    render(
      <Tooltip content="Tooltip content" placement="right">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      const tooltip = screen
        .getByText("Tooltip content")
        .closest('[role="tooltip"]');
      expect(tooltip).toHaveAttribute("data-popper-placement", "right");
    });
  });

  it("applies default placement when not specified", async () => {
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const button = screen.getByText("Hover me");
    fireEvent.mouseEnter(button);

    await waitFor(() => {
      const tooltip = screen
        .getByText("Tooltip content")
        .closest('[role="tooltip"]');
      expect(tooltip).toHaveAttribute("data-popper-placement", "top");
    });
  });
});
