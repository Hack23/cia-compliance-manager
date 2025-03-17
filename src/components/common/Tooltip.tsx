import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  testId?: string;
}

/**
 * Tooltip component that shows content on hover
 *
 * @param content - Content to display in the tooltip
 * @param children - Element that triggers the tooltip on hover
 * @param position - Position of tooltip relative to children
 * @param className - Additional CSS classes
 * @param testId - Test ID for component
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className = "",
  testId,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate position classes
  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-1";
      case "left":
        return "right-full mr-1";
      case "right":
        return "left-full ml-1";
      case "top":
      default:
        return "bottom-full mb-1";
    }
  };

  return (
    <div className={`relative inline-block ${className}`} data-testid={testId}>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="inline-block"
      >
        {children}
      </div>

      {showTooltip && (
        <div
          className={`absolute z-50 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded py-1 px-2 left-1/2 transform -translate-x-1/2 w-max max-w-xs shadow-md ${getPositionClasses()}`}
          role="tooltip"
        >
          {content}
          <div
            className={`tooltip-arrow absolute ${
              position === "bottom"
                ? "bottom-full"
                : position === "top"
                ? "top-full"
                : "top-1/2 -translate-y-1/2"
            } left-1/2 transform -translate-x-1/2 border-4 border-transparent ${
              position === "bottom"
                ? "border-b-gray-800 dark:border-b-gray-700"
                : position === "top"
                ? "border-t-gray-800 dark:border-t-gray-700"
                : position === "left"
                ? "border-l-gray-800 dark:border-l-gray-700 left-auto right-0"
                : "border-r-gray-800 dark:border-r-gray-700 left-0 right-auto"
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
