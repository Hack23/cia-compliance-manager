import { render, RenderOptions } from "@testing-library/react";
import React, { ComponentType, ReactElement } from "react";

/**
 * Renders a component with test configuration
 * @param ui The component to render
 * @param options Render options
 * @returns Rendered component
 */
export function renderWithTestConfig(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, options);
}

/**
 * Wraps a component with a data-testid for testing
 * @param Component The component to wrap
 * @param testId The test ID to apply
 * @returns Wrapped component
 */
export function withTestId<P extends object>(
  Component: ComponentType<P>,
  testId: string
): React.FC<P & { "data-testid"?: string }> {
  return (props: P & { "data-testid"?: string }) => {
    const { "data-testid": dataTestId, ...restProps } = props;
    return (
      <Component data-testid={dataTestId || testId} {...(restProps as P)} />
    );
  };
}

/**
 * Creates a test container with theme support
 * @param theme Theme to apply
 * @returns Test container element
 */
export function createTestContainer(theme: "light" | "dark" = "light") {
  const container = document.createElement("div");
  container.setAttribute("data-theme", theme);
  document.body.appendChild(container);

  return {
    container,
    cleanup: () => {
      document.body.removeChild(container);
    },
  };
}
