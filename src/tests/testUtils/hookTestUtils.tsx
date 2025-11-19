import React from "react";
import { render } from "@testing-library/react";

/**
 * Simple hook testing utility for components
 */
export function renderHook<TProps, TResult>(
  useHookFn: (props?: TProps) => TResult,
  initialProps?: TProps
) {
  let result: TResult;

  // TestComponent to use the hook and capture the result
  const TestComponent = ({ hookProps }: { hookProps?: TProps }) => {
    result = useHookFn(hookProps);
    return null;
  };

  // Render the test component with the provider
  const renderResult = render(<TestComponent hookProps={initialProps} />);

  return {
    result: {
      get current() {
        return result as TResult;
      },
    },
    rerender: (newProps?: TProps) =>
      renderResult.rerender(<TestComponent hookProps={newProps} />),
    unmount: renderResult.unmount,
  };
}
