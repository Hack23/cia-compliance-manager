import React, { ReactNode } from 'react';

interface WidgetActionsProps {
  /**
   * The action buttons or other elements
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
}

/**
 * Container for widget action buttons in widget headers
 * 
 * ## UX Perspective
 * 
 * Provides a consistent layout for widget actions, ensuring good spacing
 * and alignment between action buttons in widget headers. 🎛️
 */
const WidgetActions: React.FC<WidgetActionsProps> = ({ 
  children, 
  className = '',
  testId = 'widget-actions'
}) => {
  return (
    <div 
      className={`flex items-center space-x-2 ${className}`}
      data-testid={testId}
    >
      {children}
    </div>
  );
};

interface WidgetActionButtonProps {
  /**
   * Click handler for the button
   */
  onClick: () => void;
  
  /**
   * Icon to display in the button
   */
  icon: ReactNode;
  
  /**
   * Accessible label for the button
   */
  ariaLabel: string;
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
  
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
}

/**
 * Standard action button for widget headers
 * 
 * ## UX Perspective
 * 
 * Provides a consistent, accessible button style for widget actions,
 * with appropriate hover and focus states for good user feedback. 🔘
 */
export const WidgetActionButton: React.FC<WidgetActionButtonProps> = ({
  onClick,
  icon,
  ariaLabel,
  className = '',
  testId,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      data-testid={testId}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export default WidgetActions;
