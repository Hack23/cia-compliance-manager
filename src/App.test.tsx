import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import App from "./App";
import { APP_TEST_IDS } from "./constants/testIds";

// Mock CIAClassificationApp component
vi.mock("./application/CIAClassificationApp", () => ({
  default: () => <div data-testid="mocked-cia-app">Mock CIA App</div>,
}));

describe("App", () => {
  it("renders the dashboard directly", () => {
    render(<App />);

    // Check that app container exists
    const appContainer = screen.getByTestId(APP_TEST_IDS.APP_CONTAINER);
    expect(appContainer).toBeInTheDocument();

    // Check that it contains the mocked CIA app
    const mockedApp = screen.getByTestId("mocked-cia-app");
    expect(mockedApp).toBeInTheDocument();
    expect(mockedApp).toHaveTextContent("Mock CIA App");
  });
});
