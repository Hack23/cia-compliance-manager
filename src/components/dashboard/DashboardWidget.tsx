import React, { ReactNode } from 'react';
import { SecurityLevel } from '../../types/cia';

// Define component props interface
interface DashboardWidgetProps {
  title: string;
  icon?: string | ReactNode;
  children: ReactNode;
  testId?: string;
  className?: string;
  // Add security level props to ensure they can be passed through
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel; 
  confidentialityLevel?: SecurityLevel;
}

// Add a type definition for child component props
interface ChildComponentProps {
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  // Add other common props as needed
  [key: string]: any; // This allows for dynamic props
}

/**
 * A container for dashboard widgets with consistent styling
 */
export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  title,
  icon,
  children,
  testId = "dashboard-widget",
  className = "",
  // Include security level props in destructuring
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  ...rest
}) => {
  // Forward security level props to children
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child,
        {
          availabilityLevel,
          integrityLevel,
          confidentialityLevel,
          // ...other props
        } as ChildComponentProps // Cast to the defined type
      );
    }
    return child;
  });

  return (
    <div 
      className={`bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden ${className}`}
      data-testid={testId}
      {...rest}
    >
      <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h3>
      </div>
      <div className="widget-content">
        {childrenWithProps}
      </div>
    </div>
  );
};

export default DashboardWidget;
