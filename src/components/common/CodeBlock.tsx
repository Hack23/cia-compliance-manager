import React, { useState } from "react";
import { CodeBlockProps } from "../../types/componentPropExports";

/**
 * Simple syntax highlighting for common tokens
 * No external libraries - just basic regex-based highlighting
 * 
 * Uses single-pass tokenizer approach to avoid matching keywords inside
 * comments or strings. The combined regex matches all patterns at once,
 * and the replacement function decides how to highlight each match.
 */
const highlightCode = (code: string, language?: string): string => {
  let highlighted = code;

  // Escape HTML
  highlighted = highlighted
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply syntax highlighting based on language using single-pass tokenizer
  if (language === "typescript" || language === "javascript" || language === "jsx" || language === "tsx") {
    // Combined pattern matches comments, strings, keywords, and numbers in one pass
    const tsPattern = /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b(?:const|let|var|function|return|if|else|for|while|class|interface|type|import|export|from|default|async|await|try|catch|throw|new|this|extends|implements|public|private|protected|static|readonly)\b)|(\b\d+\b)/gm;
    
    highlighted = highlighted.replace(
      tsPattern,
      (match: string, comment: string, str: string, keyword: string, num: string): string => {
        if (comment) {
          return `<span class="text-gray-500 dark:text-gray-400 italic">${comment}</span>`;
        }
        if (str) {
          return `<span class="text-green-600 dark:text-green-400">${str}</span>`;
        }
        if (keyword) {
          return `<span class="text-purple-600 dark:text-purple-400">${keyword}</span>`;
        }
        if (num) {
          return `<span class="text-blue-600 dark:text-blue-400">${num}</span>`;
        }
        return match;
      }
    );
  } else if (language === "python") {
    // Combined pattern for Python
    const pythonPattern = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield|raise|pass|break|continue|True|False|None)\b)/gm;
    
    highlighted = highlighted.replace(
      pythonPattern,
      (match: string, comment: string, str: string, keyword: string): string => {
        if (comment) {
          return `<span class="text-gray-500 dark:text-gray-400 italic">${comment}</span>`;
        }
        if (str) {
          return `<span class="text-green-600 dark:text-green-400">${str}</span>`;
        }
        if (keyword) {
          return `<span class="text-purple-600 dark:text-purple-400">${keyword}</span>`;
        }
        return match;
      }
    );
  } else if (language === "bash" || language === "shell") {
    // Combined pattern for Bash
    const bashPattern = /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:if|then|else|elif|fi|for|do|done|while|case|esac|function|return|exit|cd|ls|mkdir|rm|cp|mv|echo|cat|grep|sed|awk)\b)/gm;
    
    highlighted = highlighted.replace(
      bashPattern,
      (match: string, comment: string, str: string, keyword: string): string => {
        if (comment) {
          return `<span class="text-gray-500 dark:text-gray-400 italic">${comment}</span>`;
        }
        if (str) {
          return `<span class="text-green-600 dark:text-green-400">${str}</span>`;
        }
        if (keyword) {
          return `<span class="text-purple-600 dark:text-purple-400">${keyword}</span>`;
        }
        return match;
      }
    );
  }

  return highlighted;
};

/**
 * CodeBlock component - displays code with optional syntax highlighting and copy functionality
 * 
 * ## Business Perspective
 * 
 * Provides clear, readable code examples to technical teams implementing
 * security controls, improving comprehension and reducing implementation errors.
 * Critical for effective knowledge transfer and documentation. 📝
 * 
 * ## Technical Perspective
 * 
 * This component provides theme-aware code display without external dependencies.
 * It uses simple regex-based syntax highlighting for common languages (TypeScript,
 * JavaScript, Python, Bash). Supports copy-to-clipboard functionality and optional
 * line numbers.
 * 
 * **Security Note**: The 'code' prop should only contain trusted content. This
 * component uses dangerouslySetInnerHTML for syntax highlighting with HTML spans.
 * While HTML characters are escaped (&, <, >) before processing, the code input
 * should not come from untrusted user sources to prevent potential XSS risks.
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

  const highlightedCode = highlightCode(code, language);
  const highlightedLines = highlightedCode.split("\n");

  return (
    <div
      className={`relative rounded-md overflow-hidden ${className}`}
      data-testid={testId}
    >
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-lg py-md bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {language || "code"}
        </span>
        {copyable && (
          <button
            onClick={handleCopy}
            className="text-xs px-md py-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            data-testid={`${testId}-copy-button`}
            aria-label="Copy code to clipboard"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className="bg-gray-50 dark:bg-gray-900 overflow-x-auto">
        <pre className="p-lg text-sm">
          <code className="font-mono">
            {showLineNumbers ? (
              <table className="w-full border-collapse">
                <tbody>
                  {highlightedLines.map((line, index) => (
                    <tr key={index}>
                      <td className="pr-lg text-right text-gray-400 dark:text-gray-600 select-none align-top">
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
