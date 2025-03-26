/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import "@testing-library/jest-dom";

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveTextContent(text: string | RegExp): R;
  toHaveAttribute(attr: string, value?: string): R;
  toBeDisabled(): R;
  toBeEnabled(): R;
  toBeRequired(): R;
  toBeValid(): R;
  toBeInvalid(): R;
  toBeChecked(): R;
  toBeVisible(): R;
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersInterface extends CustomMatchers {}
  }

  namespace Chai {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatcherInterface extends CustomMatchers {}
  }
}
