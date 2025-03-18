import React, { useEffect, useState } from "react";

interface ThemeToggleProps {
  testId?: string;
}

/**
 * Component for toggling between light and dark themes
 *
 * ## Business Perspective
 * Improves user experience by allowing customization of the interface
 * based on personal preference and environmental conditions. 🎨
 */
const ThemeToggle: React.FC<ThemeToggleProps> = ({
  testId = "theme-toggle",
}) => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode

  // Effect to synchronize with browser theme and apply theme
  useEffect(() => {
    // Apply theme class to document root
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.getElementById("root")?.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.getElementById("root")?.classList.remove("dark");
    }

    // Store preference in local storage
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  // Load theme from local storage on initial render
  useEffect(() => {
    const savedPreference = localStorage.getItem("darkMode");
    if (savedPreference) {
      setDarkMode(savedPreference === "true");
    }
  }, []);

  // Toggle theme function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      data-testid={testId}
      onClick={toggleDarkMode}
      className={`px-4 py-2 rounded-md flex items-center transition-all duration-300 ${
        darkMode
          ? "bg-black border border-green-500 hover:border-green-400 hover:bg-gray-900 cyberbutton"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      {darkMode ? (
        <>
          <span className="mr-2 text-green-400">☀️</span>
          <span className="text-green-400 font-mono tracking-wide text-sm uppercase">
            Light Mode
          </span>
        </>
      ) : (
        <>
          <span className="mr-2">🌙</span> Dark Mode
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
