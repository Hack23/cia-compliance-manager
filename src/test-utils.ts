import { vi } from "vitest";
import { render as testingLibraryRender } from "@testing-library/react";

// Re-export everything from testing library
export * from "@testing-library/react";

// Export Vitest's mocking utilities
export { vi };

// Add any custom render functions here if needed
export const render = testingLibraryRender;

// Helper function for mocking components
export function mockComponent(name: string) {
  return vi.fn().mockImplementation((props) => {
    return (
      <div data-testid={`mocked-${name}`} data-props={JSON.stringify(props)} />
    );
  });
}

// Add any other test helpers here
