import React from "react";

interface TabProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  testId?: string;
}

/**
 * Displays a tab for navigation within a tabbed interface
 * 
 * ## Business Perspective
 * 
 * This component enables efficient organization of complex security information
 * into logical categories, reducing cognitive load and improving the usability 
 * of security dashboards. The contextual tabs help users quickly access specific
 * aspects of security information without overwhelming them with all details at once. 🧩
 * 
 * @param props Component props
 * @returns React Element
 */
function Tab({
  active,
  onClick,
  label,
  icon,
  className = "",
  testId,
}: TabProps): React.ReactElement {
  const activeClass = active
    ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600";

  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 border-b-2 font-medium text-sm focus:outline-none ${activeClass} ${className}`}
      data-testid={testId}
      role="tab"
      aria-selected={active}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
    </button>
  );
}

export { Tab };
export default Tab;
