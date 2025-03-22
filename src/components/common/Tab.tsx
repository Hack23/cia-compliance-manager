import React from 'react';

interface TabProps {
  /**
   * Whether the tab is currently active
   */
  active: boolean;
  
  /**
   * Click handler for the tab
   */
  onClick: () => void;
  
  /**
   * Icon to display in the tab (emoji or character)
   */
  icon?: string;
  
  /**
   * Label text for the tab
   */
  label: string;
  
  /**
   * Test ID for automated testing
   */
  testId?: string;
}

/**
 * Tab component for tabbed interfaces
 * 
 * ## UX Perspective
 * 
 * Provides an accessible, consistent tabbed navigation pattern
 * throughout the application, allowing users to switch between
 * different views of related content. 🧩
 */
export const Tab: React.FC<TabProps> = ({
  active,
  onClick,
  icon,
  label,
  testId
}) => {
  const activeClass = active 
    ? 'border-b-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium' 
    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';

  return (
    <button
      className={`py-2 px-3 ${activeClass} focus:outline-none`}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      data-testid={testId}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </button>
  );
};
