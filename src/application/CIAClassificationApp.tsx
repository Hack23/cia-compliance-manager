import React, { useCallback, useEffect, useMemo, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import ThemeToggle from "../components/ThemeToggle";
import SecurityLevelWidget from "../components/widgets/SecurityLevelWidget";
import { APP_TEST_IDS } from "../constants/testIds";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SecurityLevel } from "../types/cia";

/**
 * Main CIA Classification Application
 * 
 * ## Business Perspective
 * 
 * This is the entry point for the CIA Compliance Manager application.
 * It manages the overall application state including security levels 
 * and theme preferences. The component orchestrates the dashboard
 * display and widget rendering based on security configuration. 💼
 * 
 * The app provides a central interface for security officers to assess,
 * visualize, and plan their security controls across the CIA triad.
 */
const CIAClassificationApp: React.FC = () => {
  // Theme state management
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", true);

  // Security level state management for CIA triad
  const [availabilityLevel, setAvailabilityLevel] = useLocalStorage<SecurityLevel>(
    "availabilityLevel",
    "Moderate" // Change default value from "None" to "Moderate"
  );
  const [integrityLevel, setIntegrityLevel] = useLocalStorage<SecurityLevel>(
    "integrityLevel",
    "Moderate" // Change default value from "None" to "Moderate"
  );
  const [confidentialityLevel, setConfidentialityLevel] = useLocalStorage<SecurityLevel>(
    "confidentialityLevel",
    "Moderate" // Change default value from "None" to "Moderate"
  );

  // Set overall security level based on CIA components
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>("Moderate");

  // Add debugging for security level state
  useEffect(() => {
    console.log("CIA App Security Levels:", { 
      availabilityLevel, 
      integrityLevel, 
      confidentialityLevel 
    });
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Handlers for level changes
  const handleAvailabilityChange = useCallback((level: SecurityLevel) => {
    console.log("App handling availability change:", level);
    setAvailabilityLevel(level);
  }, [setAvailabilityLevel]);

  const handleIntegrityChange = useCallback((level: SecurityLevel) => {
    console.log("App handling integrity change:", level);
    setIntegrityLevel(level);
  }, [setIntegrityLevel]);

  const handleConfidentialityChange = useCallback((level: SecurityLevel) => {
    console.log("App handling confidentiality change:", level);
    setConfidentialityLevel(level);
  }, [setConfidentialityLevel]);

  const handleSecurityLevelChange = useCallback((level: SecurityLevel) => {
    setSecurityLevel(level);
  }, []);

  // Handle theme toggle
  const toggleTheme = useCallback(() => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      
      // Update document class immediately
      if (newDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      return newDarkMode;
    });
  }, [setDarkMode]);

  // Apply dark mode class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Prepare shared props for dashboard widgets
  const dashboardProps = useMemo(() => ({
    availability: availabilityLevel,
    integrity: integrityLevel,
    confidentiality: confidentialityLevel,
    useRegistry: true, // Use the widget registry
  }), [availabilityLevel, integrityLevel, confidentialityLevel]);

  return (
    <div 
      className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      data-testid={APP_TEST_IDS.APP_CONTAINER}
    >
      {/* Header with title and theme toggle */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-gray-900 dark:text-white"
            data-testid={APP_TEST_IDS.APP_TITLE}
          >
            CIA Compliance Manager
          </h1>
          <ThemeToggle
            darkMode={darkMode}
            onToggle={toggleTheme}
            testId={APP_TEST_IDS.THEME_TOGGLE}
          />
        </div>
      </header>

      {/* Main content area with dashboard */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Dashboard
          useRegistry={true}
          availability={availabilityLevel}
          integrity={integrityLevel}
          confidentiality={confidentialityLevel}
        >
          {/* Security level configuration widget with handlers */}
          <SecurityLevelWidget
            availabilityLevel={availabilityLevel}
            integrityLevel={integrityLevel}
            confidentialityLevel={confidentialityLevel}
            setAvailability={setAvailabilityLevel}
            setIntegrity={setIntegrityLevel}
            setConfidentiality={setConfidentialityLevel}
            onAvailabilityChange={handleAvailabilityChange}
            onIntegrityChange={handleIntegrityChange}
            onConfidentialityChange={handleConfidentialityChange}
          />
        </Dashboard>
      </main>
    </div>
  );
};

export default CIAClassificationApp;
