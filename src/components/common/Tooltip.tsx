import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
  testId?: string;
}

/**
 * Reusable tooltip component for displaying help text and additional information
 *
 * Provides consistent tooltip styling and behavior across the application
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  className = "",
  testId = "tooltip",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Position classes
  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1",
    bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1",
    left: "right-full top-1/2 transform -translate-x-2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 transform translate-x-2 -translate-y-1/2 ml-1",
  };

  // Arrow position classes
  const arrowClasses = {
    top: "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-t-gray-800 dark:border-t-gray-600 border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full border-b-gray-800 dark:border-b-gray-600 border-l-transparent border-r-transparent border-t-transparent",
    left: "right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-l-gray-800 dark:border-l-gray-600 border-t-transparent border-b-transparent border-r-transparent",
    right:
      "left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-r-gray-800 dark:border-r-gray-600 border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className={`inline-block relative ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      data-testid={testId}
    >
      {/* Tooltip trigger */}
      <div className="cursor-help">{children}</div>

      {/* Tooltip content */}
      <div
        className={`absolute z-50 whitespace-nowrap max-w-xs ${
          positionClasses[position]
        } px-3 py-2 bg-gray-800 dark:bg-gray-600 text-white rounded shadow-lg text-sm ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity duration-200`}
        data-testid={`${testId}-content`}
      >
        {content}

        {/* Arrow */}
        <div
          className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
        ></div>
      </div>
    </div>
  );
};

export default Tooltip;
