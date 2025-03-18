import React, { useMemo } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  testId?: string;
}

/**
 * Displays a formatted code block with syntax highlighting
 * 
 * ## Business Perspective
 * 
 * This component enables the display of implementation examples in a technical format
 * that is familiar to developers, bridging the gap between security requirements and
 * their practical implementation. This helps accelerate the adoption of security
 * controls by providing clear, ready-to-use code examples. 💻
 * 
 * @param props Component props
 * @returns React Element
 */
function CodeBlock({
  code,
  language = "plaintext",
  className = "",
  testId,
}: CodeBlockProps): React.ReactElement {
  // Clean up code by removing excessive indentation
  const formattedCode = useMemo(() => {
    if (!code) return "";
    
    // Split into lines
    const lines = code.split("\n");
    
    // Find minimum indentation (ignoring empty lines)
    const nonEmptyLines = lines.filter(line => line.trim().length > 0);
    const minIndent = nonEmptyLines.reduce((min, line) => {
      const indent = line.search(/\S/);
      return indent >= 0 && indent < min ? indent : min;
    }, Infinity);
    
    // Remove common indentation
    const cleanedLines = lines.map(line => {
      if (line.trim().length === 0) return "";
      return line.substring(minIndent < Infinity ? minIndent : 0);
    });
    
    return cleanedLines.join("\n");
  }, [code]);

  // Language-specific styling
  const languageClass = useMemo(() => {
    switch(language.toLowerCase()) {
      case "javascript":
      case "js":
        return "language-javascript";
      case "typescript":
      case "ts":
        return "language-typescript";
      case "python":
      case "py":
        return "language-python";
      case "java":
        return "language-java";
      case "csharp":
      case "cs":
        return "language-csharp";
      case "php":
        return "language-php";
      case "go":
        return "language-go";
      case "rust":
        return "language-rust";
      case "shell":
      case "bash":
      case "sh":
        return "language-shell";
      case "json":
        return "language-json";
      case "xml":
        return "language-xml";
      case "html":
        return "language-html";
      case "css":
        return "language-css";
      case "sql":
        return "language-sql";
      default:
        return "language-plaintext";
    }
  }, [language]);

  return (
    <div className={`${className} overflow-hidden rounded-b-md`} data-testid={testId}>
      <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm">
        <code className={languageClass}>{formattedCode}</code>
      </pre>
    </div>
  );
}

export { CodeBlock };
export default CodeBlock;
