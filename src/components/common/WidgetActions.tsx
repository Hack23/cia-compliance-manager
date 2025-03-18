import React, { ReactNode } from "react";

interface WidgetActionButtonProps {
  onClick: () => void;
  icon?: ReactNode;
  label?: string;
  ariaLabel: string;
  testId?: string;
  className?: string;
}

/**
 * Reusable action button component for widget headers
 */
export const WidgetActionButton: React.FC<WidgetActionButtonProps> = ({
  onClick,
  icon,
  label,
  ariaLabel,
  testId,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      data-testid={testId}
      className={`inline-flex items-center justify-center p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${className}`}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label && <span className="ml-1 text-xs">{label}</span>}
    </button>
  );
};

interface WidgetActionsProps {
  children: ReactNode;
  className?: string;
  testId?: string;
}

/**
 * Container for widget action buttons
 */
const WidgetActions: React.FC<WidgetActionsProps> = ({
  children,
  className = "",
  testId = "widget-actions",
}) => {
  return (
    <div
      className={`flex items-center space-x-1 ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

export default WidgetActions;
