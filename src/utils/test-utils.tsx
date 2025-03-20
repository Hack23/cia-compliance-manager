import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { createTestDataProvider } from "../data/testDataProvider";
import { SecurityLevel } from "../types/cia";

/**
 * Test utilities for rendering components in tests
 * 
 * ## Business Perspective
 * 
 * These utilities ensure consistent test coverage for business-critical
 * components, helping maintain the reliability of security assessment
 * features across application updates. 🧪
 * 
 * Reliable tests help prevent regressions in security calculations
 * and compliance mapping that could impact business decisions.
 */

/**
 * Interface for custom render options
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  securityLevels?: {
    availabilityLevel?: SecurityLevel;
    integrityLevel?: SecurityLevel;
    confidentialityLevel?: SecurityLevel;
  };
  testDataProvider?: boolean;
}

/**
 * Interface for test provider props
 */
export interface TestProviderProps {
  theme?: 'light' | 'dark';
  children?: React.ReactNode;
  // Add any other provider props needed for tests
}

/**
 * Security context provider for tests
 */
const TestSecurityProvider: FC<{
  children: React.ReactNode;
  securityLevels?: {
    availabilityLevel?: SecurityLevel;
    integrityLevel?: SecurityLevel;
    confidentialityLevel?: SecurityLevel;
  };
}> = ({ children, securityLevels = {} }) => {
  const {
    availabilityLevel = "Moderate",
    integrityLevel = "Moderate",
    confidentialityLevel = "Moderate",
  } = securityLevels;

  // Simple context wrapper for test rendering
  return (
    <div data-testid="test-security-provider" data-security-context="true">
      <div data-availability={availabilityLevel} />
      <div data-integrity={integrityLevel} />
      <div data-confidentiality={confidentialityLevel} />
      {children}
    </div>
  );
};

/**
 * Custom render with test security provider
 * 
 * @param ui - Component to render
 * @param options - Custom render options
 * @returns Rendered component with testing library utilities
 */
export function customRender(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { securityLevels, testDataProvider = false, ...renderOptions } = options;

  // Set up any required test data or providers
  const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize test data if needed
    if (testDataProvider) {
      // This is just a marker for testing
      React.useEffect(() => {
        // For testing purposes - creates a global marker
        (window as any).__TEST_DATA_PROVIDER__ = createTestDataProvider();
      }, []);
    }
    
    return (
      <TestSecurityProvider securityLevels={securityLevels}>
        {children}
      </TestSecurityProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create a mock security level state for testing
 * 
 * @param overrides - Any specific security levels to override
 * @returns Security level state for testing
 */
export function createMockSecurityLevels(overrides: Partial<{
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
}> = {}) {
  return {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    ...overrides
  };
}

/**
 * Render with context for testing (legacy)
 */
export function renderWithContext(
  ui: React.ReactElement, 
  options: TestProviderProps = {}
) {
  const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
    <div data-testid="test-provider" {...options}>
      {children}
    </div>
  );
  
  return render(ui, { wrapper: Wrapper });
}

/**
 * Render with multiple providers
 */
export function renderWithProviders(
  ui: React.ReactElement,
  providers: Array<(props: { children: React.ReactNode }) => React.ReactElement>
) {
  const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
    return providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      <>{children}</>
    );
  };
  
  return render(ui, { wrapper: Wrapper });
}

/**
 * Setup test environment
 */
export function setupTestEnvironment() {
  // Configure window.matchMedia for tests
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

/**
 * Render with router
 */
export function renderWithRouter(
  ui: React.ReactElement,
  route: string = '/'
) {
  // Mock router context
  window.history.pushState({}, 'Test page', route);
  
  return render(ui);
}

/**
 * Add testId to component
 */
export function withTestId<P extends object>(
  Component: React.ComponentType<P>,
  testId: string
): React.FC<P> {
  return (props: P) => (
    <Component data-testid={testId} {...props} />
  );
}

// Export testing library utilities for convenience
export * from "@testing-library/react";
export { customRender as render };

