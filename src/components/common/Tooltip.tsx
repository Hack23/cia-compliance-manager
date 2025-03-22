import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  /**
   * The content to display inside the tooltip
   */
  content: ReactNode;
  
  /**
   * The element that triggers the tooltip
   */
  children: ReactNode;
  
  /**
   * The position of the tooltip
   */
  position?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Optional CSS classes
   */
  className?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Displays a tooltip when hovering over an element
 * 
 * ## UX Perspective
 * 
 * Provides contextual help and additional information without
 * cluttering the interface, improving the user experience by
 * making complex security concepts more accessible. ℹ️
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
  testId = 'tooltip'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      data-testid={testId}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md shadow-sm whitespace-nowrap ${getPositionClasses()} ${className}`}
          data-testid={`${testId}-content`}
        >
          {content}
          <div 
            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
              position === 'top' ? 'top-full -mt-1 left-1/2 -ml-1' :
              position === 'right' ? 'right-full -mr-1 top-1/2 -mt-1' :
              position === 'bottom' ? 'bottom-full -mb-1 left-1/2 -ml-1' :
              'left-full -ml-1 top-1/2 -mt-1'
            }`}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
