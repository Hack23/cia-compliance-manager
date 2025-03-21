import React from "react";
import { act, render } from "@testing-library/react";

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

/**
 * Tracks the history of states in a stateful hook
 * @param useHookFn The hook function to track
 * @param initialProps Initial props to pass to the hook
 * @returns An object with the current result and state history
 */
export function trackHookHistory<TProps, TState>(
  useHookFn: (props?: TProps) => TState,
  initialProps?: TProps
) {
  // Create an array to store state history
  const history: TState[] = [];

  // Create a component that will call the hook with the props
  const TestComponent: React.FC<{ hookProps?: TProps }> = ({ hookProps }) => {
    const result = useHookFn(hookProps);
    // Use simple effect to track state changes
    React.useEffect(() => {
      history.push(result);
    }, [result]);
    return null;
  };

  // Render the test component
  const renderResult = render(<TestComponent hookProps={initialProps} />);

  return {
    // Current history of states
    history,
    // Method to rerender with new props
    rerender: (newProps?: TProps) =>
      renderResult.rerender(<TestComponent hookProps={newProps} />),
    // Method to unmount the component
    unmount: renderResult.unmount,
  };
}

/**
 * Tests a hook that uses state
 *
 * @param useStatefulHookFn Hook that manages state
 * @param initialProps Props for the hook
 * @returns Object with state and updater functions for testing state changes
 */
export function renderStatefulHook<TProps, TState, TUpdater>(
  useStatefulHookFn: (props?: TProps) => [TState, TUpdater],
  initialProps?: TProps
) {
  let stateValue: TState;
  let updateFn: TUpdater;

  // Create a component that will call the hook
  const TestComponent: React.FC<{ hookProps?: TProps }> = ({ hookProps }) => {
    [stateValue, updateFn] = useStatefulHookFn(hookProps);
    return null;
  };

  // Render the component
  const renderResult = render(<TestComponent hookProps={initialProps} />);

  return {
    // Current state value
    get state() {
      return stateValue;
    },
    // Update function returned by the hook
    get update() {
      return updateFn;
    },
    // Method to rerender with new props
    rerender: (newProps?: TProps) =>
      renderResult.rerender(<TestComponent hookProps={newProps as TProps} />),
    unmount: renderResult.unmount,
  };
}

/**
 * Wrapper for React's act function for hook testing
 *
 * @param callback Function to execute within act
 */
export { act };

/**
 * Waits for promises to resolve in tests
 */
export const waitForNextUpdate = async () => {
  await act(() => Promise.resolve());
};
