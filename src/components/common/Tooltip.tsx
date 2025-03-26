import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: "top" | "right" | "bottom" | "left";
  className?: string;
  [x: string]: any; // For spreading additional props
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  className = "",
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Calculate the position classes based on placement
  const getPositionClasses = () => {
    switch (placement) {
      case "right":
        return "left-full ml-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full mr-2";
      case "top":
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    }
  };

  // Calculate arrow classes based on placement
  const getArrowClasses = () => {
    switch (placement) {
      case "right":
        return "left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2";
      case "bottom":
        return "bottom-full left-1/2 -ml-1 -mb-1";
      case "left":
        return "right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2";
      case "top":
      default:
        return "top-full left-1/2 -ml-1 -mt-1";
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      {...rest}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm whitespace-nowrap ${getPositionClasses()} `}
          data-testid="tooltip-content"
          data-popper-placement={placement}
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${getArrowClasses()}`}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
