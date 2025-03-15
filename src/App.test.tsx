import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { APP_TEST_IDS } from "./constants/testIds";

// First fix the CIAClassificationApp mock to use a unique test ID
vi.mock("./application/CIAClassificationApp", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-cia-app">Mock CIA App</div>, // Changed to unique test ID
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("renders the dashboard directly", () => {
    render(<App />);

    // Updated to use the new unique test ID
    expect(screen.getByTestId("mock-cia-app")).toBeInTheDocument();
    expect(screen.getByTestId(APP_TEST_IDS.APP_ROOT)).toBeInTheDocument();
  });
});
