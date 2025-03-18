import React from "react";

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
  testId?: string;
}

/**
 * Toggle switch for changing between light and dark mode
 * 
 * ## UI Perspective
 * 
 * Provides an accessible way for users to switch between dark and light modes
 * with visual feedback on the current state. The component maintains consistent
 * styling with the rest of the application.
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle, testId }) => {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-md flex items-center transition-colors ${
        darkMode
          ? "bg-gray-800 text-green-400 border border-green-500 hover:bg-gray-700"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      data-testid={testId}
    >
      {darkMode ? (
        <>
          <span className="mr-2">☀️</span>
          <span className="text-sm font-medium">Light Mode</span>
        </>
      ) : (
        <>
          <span className="mr-2">🌙</span>
          <span className="text-sm font-medium">Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
