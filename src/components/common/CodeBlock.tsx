import React from 'react';

interface CodeBlockProps {
  /**
   * The code to display
   */
  code: string;
  
  /**
   * Programming language for syntax highlighting
   */
  language: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
}

/**
 * Displays a formatted code block with syntax highlighting
 * 
 * ## Technical Perspective
 * 
 * Provides a standardized way to present code examples for implementation
 * guidance, making technical requirements more accessible to security
 * engineers and developers. 💻
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  testId
}) => {
  return (
    <div 
      className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto"
      data-testid={testId}
    >
      <pre className="whitespace-pre-wrap">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};
