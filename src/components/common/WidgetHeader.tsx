import React, { ReactNode } from "react";

interface WidgetHeaderProps {
  title: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
  [x: string]: any; // For spreading additional props like data-testid
}

const WidgetHeader: React.FC<WidgetHeaderProps> = ({
  title,
  icon,
  actions,
  className = "",
  ...rest
}) => {
  return (
    <div
      className={`widget-header bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg flex justify-between items-center ${className}`}
      {...rest}
    >
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {title}
      </h3>
      {actions && <div className="flex items-center">{actions}</div>}
    </div>
  );
};

export default WidgetHeader;
