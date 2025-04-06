import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
  className?: string;
  testId?: string;
}

/**
 * Displays a loading spinner with configurable size
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color,
  className = "",
  testId = "loading-spinner",
}) => {
  const sizeClass = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  }[size];

  const colorClass = color || "border-blue-500";

  return (
    <div
      className={`animate-spin rounded-full ${sizeClass} border-b-2 ${colorClass} ${className}`}
      data-testid={testId}
    />
  );
};

export default LoadingSpinner;
