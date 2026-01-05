import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CodeBlock from "./CodeBlock";

describe("CodeBlock", () => {
  const sampleCode = `const hello = "world";\nconsole.log(hello);`;

  it("renders code block with code content", () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByTestId("code-block")).toBeInTheDocument();
    expect(screen.getByText(/const/)).toBeInTheDocument();
  });

  it("displays language label", () => {
    render(<CodeBlock code={sampleCode} language="typescript" />);
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("displays default 'code' label when no language specified", () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("shows copy button by default", () => {
    render(<CodeBlock code={sampleCode} />);
    expect(screen.getByTestId("code-block-copy-button")).toBeInTheDocument();
  });

  it("hides copy button when copyable is false", () => {
    render(<CodeBlock code={sampleCode} copyable={false} />);
    expect(screen.queryByTestId("code-block-copy-button")).not.toBeInTheDocument();
  });

  it("copies code to clipboard when copy button is clicked", async () => {
    const user = userEvent.setup();
    
    // Mock clipboard API
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    render(<CodeBlock code={sampleCode} />);
    
    const copyButton = screen.getByTestId("code-block-copy-button");
    await user.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith(sampleCode);
    expect(screen.getByText("Copied!")).toBeInTheDocument();

    // Wait for "Copied!" to change back to "Copy"
    await waitFor(() => {
      expect(screen.getByText("Copy")).toBeInTheDocument();
    }, { timeout: 2500 });
  });

  it("handles clipboard copy failure gracefully", async () => {
    const user = userEvent.setup();
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    // Mock clipboard API to fail
    const writeTextMock = vi.fn().mockRejectedValue(new Error("Clipboard error"));
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    render(<CodeBlock code={sampleCode} />);
    
    const copyButton = screen.getByTestId("code-block-copy-button");
    await user.click(copyButton);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to copy code:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("shows line numbers when showLineNumbers is true", () => {
    render(<CodeBlock code={sampleCode} showLineNumbers={true} />);
    
    // Line numbers should be present
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not show line numbers by default", () => {
    const { container } = render(<CodeBlock code={sampleCode} />);
    
    // Line numbers table should not be present
    const lineNumberTable = container.querySelector("table");
    expect(lineNumberTable).not.toBeInTheDocument();
  });

  it("applies syntax highlighting for TypeScript", () => {
    const { container } = render(
      <CodeBlock code={sampleCode} language="typescript" />
    );
    
    // Check that some highlighting was applied
    const highlightedElements = container.querySelectorAll("span");
    expect(highlightedElements.length).toBeGreaterThan(0);
  });

  it("applies syntax highlighting for Python", () => {
    const pythonCode = 'def hello():\n    print("world")';
    const { container } = render(
      <CodeBlock code={pythonCode} language="python" />
    );
    
    // Check that some highlighting was applied
    const highlightedElements = container.querySelectorAll("span");
    expect(highlightedElements.length).toBeGreaterThan(0);
  });

  it("applies syntax highlighting for Bash", () => {
    const bashCode = 'echo "hello"\nls -la';
    const { container } = render(
      <CodeBlock code={bashCode} language="bash" />
    );
    
    // Check that some highlighting was applied
    const highlightedElements = container.querySelectorAll("span");
    expect(highlightedElements.length).toBeGreaterThan(0);
  });

  it("handles empty code gracefully", () => {
    render(<CodeBlock code="" />);
    expect(screen.getByTestId("code-block")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<CodeBlock code={sampleCode} className="custom-class" />);
    const codeBlock = screen.getByTestId("code-block");
    expect(codeBlock).toHaveClass("custom-class");
  });

  it("applies custom testId", () => {
    render(<CodeBlock code={sampleCode} testId="custom-test-id" />);
    expect(screen.getByTestId("custom-test-id")).toBeInTheDocument();
  });

  it("escapes HTML in code content", () => {
    const htmlCode = '<div>Hello</div>';
    const { container } = render(<CodeBlock code={htmlCode} />);
    
    // HTML should be escaped, not rendered as actual HTML
    expect(container.querySelector("div[data-testid='code-block']")).toBeInTheDocument();
    expect(container.innerHTML).toContain("&lt;div&gt;");
  });

  it("handles multi-line code correctly", () => {
    const multiLineCode = "line1\nline2\nline3";
    render(<CodeBlock code={multiLineCode} showLineNumbers={true} />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("preserves whitespace in code", () => {
    const codeWithSpaces = "  indented code\n    more indented";
    const { container } = render(<CodeBlock code={codeWithSpaces} />);
    
    // Check that pre tag is present to preserve whitespace
    expect(container.querySelector("pre")).toBeInTheDocument();
  });
});
