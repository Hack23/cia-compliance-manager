import { render, RenderOptions } from "@testing-library/react";
import React, { ComponentType, ReactElement } from "react";

// Add the TestProviderProps interface
export interface TestProviderProps {
  theme?: "light" | "dark";
  // Add other context options as needed
}

// Custom wrapper with theme provider
const TestProvider: React.FC<{
  children: React.ReactNode;
  options?: TestProviderProps;
}> = ({ children, options = { theme: "light" } }) => {
  return <div data-theme={options.theme}>{children}</div>;
};

// Custom wrapper if needed in the future
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// Add the renderWithContext function
export function renderWithContext(
  ui: ReactElement,
  options?: TestProviderProps,
  renderOptions?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, {
    wrapper: (props) => <TestProvider options={options} {...props} />,
    ...renderOptions,
  });
}

// Add the renderWithProviders function
export function renderWithProviders(
  ui: ReactElement,
  providers: Array<React.FC<{ children: React.ReactNode }>>,
  renderOptions?: Omit<RenderOptions, "wrapper">
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return providers.reduce(
      (acc, Provider) => <Provider>{acc}</Provider>,
      <>{children}</>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Add the renderWithRouter function
export function renderWithRouter(ui: ReactElement, route: string = "/") {
  // Simple mock for router context
  window.history.pushState({}, "Test page", route);
  return render(ui);
}

// Fix the withTestId HOC implementation
export function withTestId<P extends object>(
  Component: ComponentType<P>,
  testId: string
): ComponentType<P & { "data-testid"?: string }> {
  const WithTestId = (props: P & { "data-testid"?: string }) => {
    const { "data-testid": dataTestId, ...restProps } = props;
    return (
      <Component data-testid={dataTestId || testId} {...(restProps as P)} />
    );
  };

  WithTestId.displayName = `WithTestId(${
    Component.displayName || Component.name || "Component"
  })`;
  return WithTestId;
}

// Fix setupTestEnvironment function to ensure it uses window.matchMedia
export function setupTestEnvironment() {
  // Mock window.matchMedia with implementation that will be detected
  window.matchMedia =
    window.matchMedia ||
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

  // Add more environment setup as needed
  return {
    cleanup: () => {
      // Clean up any mocks if needed
    },
  };
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
