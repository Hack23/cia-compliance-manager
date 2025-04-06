import React from "react";

interface ErrorMessageProps {
  error: string;
  className?: string;
  testId?: string;
}

/**
 * Displays an error message with consistent styling
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  className = "",
  testId = "error-message",
}) => {
  return (
    <div
      className={`text-red-600 dark:text-red-400 p-4 border border-red-200 dark:border-red-700 rounded-md bg-red-50 dark:bg-red-900 dark:bg-opacity-20 ${className}`}
      data-testid={testId}
    >
      <div className="flex items-start">
        <span className="mr-2">⚠️</span>
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
