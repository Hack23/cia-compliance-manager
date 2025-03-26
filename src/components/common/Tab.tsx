import React, { ReactNode } from "react";

interface TabProps {
  id: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const Tab: React.FC<TabProps> = ({
  id,
  label,
  active = false,
  onClick,
  className = "",
  children,
}) => {
  return (
    <button
      role="tab"
      id={id}
      aria-selected={active}
      className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 
        ${
          active
            ? "bg-primary-50 text-primary-700"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
        } 
        ${className}`}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  );
};

export default Tab;
