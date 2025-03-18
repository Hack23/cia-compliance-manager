import React, { ReactNode } from "react";
import { WIDGET_ICONS } from "../../constants/appConstants";

interface WidgetHeaderProps {
  title: string;
  iconKey?: keyof typeof WIDGET_ICONS | string;
  actions?: ReactNode;
  className?: string;
  testId?: string;
  compact?: boolean; // Add compact mode option
}

/**
 * Common header component for widgets with improved height efficiency
 *
 * @param props - Component properties
 * @returns A consistent widget header
 */
const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  iconKey,
  actions,
  className = "",
  testId,
  compact = false, // Default to standard size
}) => {
  // Determine the icon to display
  let iconToDisplay = "";
  if (iconKey) {
    // If iconKey is a key in WIDGET_ICONS, use the corresponding value
    if (iconKey in WIDGET_ICONS) {
      iconToDisplay = WIDGET_ICONS[iconKey as keyof typeof WIDGET_ICONS];
    } else {
      // Otherwise, assume iconKey is already an emoji string
      iconToDisplay = iconKey;
    }
  }

  // Use compact styling when needed
  const heightClass = compact ? "py-1" : "py-2";
  const fontSizeClass = compact ? "text-sm" : "text-base";

  return (
    <div
      className={`flex items-center justify-between ${heightClass} mb-2 border-b border-gray-200 dark:border-gray-700 ${className}`}
      data-testid={testId}
    >
      <h3
        className={`flex items-center ${fontSizeClass} font-semibold text-gray-800 dark:text-gray-200`}
      >
        {iconToDisplay && (
          <span className="mr-2 text-base" aria-hidden="true">
            {iconToDisplay}
          </span>
        )}
        <span className="truncate max-w-[280px]">{title}</span>
      </h3>
      {actions && <div className="flex items-center space-x-2">{actions}</div>}
    </div>
  );
};

export default WidgetHeader;
