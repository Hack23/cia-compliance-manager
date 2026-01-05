import React, { useState } from "react";

/**
 * Props for the CodeBlock component
 */
export interface CodeBlockProps {
  /**
   * The programming language for syntax highlighting
   * @example "typescript", "javascript", "python", "bash"
   */
  language?: string;

  /**
   * The code content to display
   */
  code: string;

  /**
   * Whether to show line numbers
   * @default false
   */
  showLineNumbers?: boolean;

  /**
   * Whether to show a copy button
   * @default true
   */
  copyable?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testId?: string;
}

/**
 * Simple syntax highlighting for common tokens
 * No external libraries - just basic regex-based highlighting
 */
const highlightCode = (code: string, language?: string): string => {
  let highlighted = code;

  // Escape HTML
  highlighted = highlighted
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply syntax highlighting based on language
  if (language === "typescript" || language === "javascript" || language === "jsx" || language === "tsx") {
    // Keywords
    highlighted = highlighted.replace(
      /\b(const|let|var|function|return|if|else|for|while|class|interface|type|import|export|from|default|async|await|try|catch|throw|new|this|extends|implements|public|private|protected|static|readonly)\b/g,
      '<span class="text-purple-600 dark:text-purple-400">$1</span>'
    );
    
    // Strings
    highlighted = highlighted.replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
      '<span class="text-green-600 dark:text-green-400">$1</span>'
    );
    
    // Comments
    highlighted = highlighted.replace(
      /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
      '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>'
    );
    
    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+)\b/g,
      '<span class="text-blue-600 dark:text-blue-400">$1</span>'
    );
  } else if (language === "python") {
    // Keywords
    highlighted = highlighted.replace(
      /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield|raise|pass|break|continue|True|False|None)\b/g,
      '<span class="text-purple-600 dark:text-purple-400">$1</span>'
    );
    
    // Strings
    highlighted = highlighted.replace(
      /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      '<span class="text-green-600 dark:text-green-400">$1</span>'
    );
    
    // Comments
    highlighted = highlighted.replace(
      /(#.*$)/gm,
      '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>'
    );
  } else if (language === "bash" || language === "shell") {
    // Commands and keywords
    highlighted = highlighted.replace(
      /\b(if|then|else|elif|fi|for|do|done|while|case|esac|function|return|exit|cd|ls|mkdir|rm|cp|mv|echo|cat|grep|sed|awk)\b/g,
      '<span class="text-purple-600 dark:text-purple-400">$1</span>'
    );
    
    // Strings
    highlighted = highlighted.replace(
      /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      '<span class="text-green-600 dark:text-green-400">$1</span>'
    );
    
    // Comments
    highlighted = highlighted.replace(
      /(#.*$)/gm,
      '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>'
    );
  }

  return highlighted;
};

/**
 * CodeBlock component - displays code with optional syntax highlighting and copy functionality
 * 
 * This component provides theme-aware code display without external dependencies.
 * It uses simple regex-based syntax highlighting for common languages.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <CodeBlock
 *   language="typescript"
 *   code={`const hello = "world";\nconsole.log(hello);`}
 *   showLineNumbers={true}
 *   copyable={true}
 * />
 * ```
 */
const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  showLineNumbers = false,
  copyable = true,
  className = "",
  testId = "code-block",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const lines = code.split("\n");
  const highlightedCode = highlightCode(code, language);
  const highlightedLines = highlightedCode.split("\n");

  return (
    <div
      className={`relative rounded-md overflow-hidden ${className}`}
      data-testid={testId}
    >
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {language || "code"}
        </span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            data-testid={`${testId}-copy-button`}
            aria-label="Copy code to clipboard"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="bg-gray-50 dark:bg-gray-900 overflow-x-auto">
        <pre className="p-4 text-sm">
          <code className="font-mono">
            {showLineNumbers ? (
              <table className="w-full border-collapse">
                <tbody>
                  {highlightedLines.map((line, index) => (
                    <tr key={index}>
                      <td className="pr-4 text-right text-gray-400 dark:text-gray-600 select-none align-top">
                        {index + 1}
                      </td>
                      <td
                        className="text-gray-800 dark:text-gray-200"
                        dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div
                className="text-gray-800 dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
