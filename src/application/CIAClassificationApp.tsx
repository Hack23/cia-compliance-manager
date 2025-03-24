import React, { useCallback, useEffect, useState } from "react";
// Import widgets directly instead of Dashboard
import BusinessImpactAnalysisWidget from "../components/widgets/assessmentcenter/BusinessImpactAnalysisWidget";
import SecurityLevelWidget from "../components/widgets/assessmentcenter/SecurityLevelWidget";
import SecuritySummaryWidget from "../components/widgets/assessmentcenter/SecuritySummaryWidget";
import ComplianceStatusWidget from "../components/widgets/businessvalue/ComplianceStatusWidget";
import CostEstimationWidget from "../components/widgets/businessvalue/CostEstimationWidget";
import ValueCreationWidget from "../components/widgets/businessvalue/ValueCreationWidget";
import AvailabilityImpactWidget from "../components/widgets/impactanalysis/AvailabilityImpactWidget";
import ConfidentialityImpactWidget from "../components/widgets/impactanalysis/ConfidentialityImpactWidget";
import IntegrityImpactWidget from "../components/widgets/impactanalysis/IntegrityImpactWidget";
import SecurityResourcesWidget from "../components/widgets/implementationguide/SecurityResourcesWidget";
import SecurityVisualizationWidget from "../components/widgets/implementationguide/SecurityVisualizationWidget";
import TechnicalDetailsWidget from "../components/widgets/implementationguide/TechnicalDetailsWidget";
import { SecurityLevel } from "../types/cia";

/**
 * Main application component for CIA Classification
 *
 * ## Business Perspective
 *
 * This component serves as the central state manager for security levels
 * across the application, ensuring consistent security posture visualization
 * and providing a unified user experience for security professionals. 🔒
 */
const CIAClassificationApp: React.FC = () => {
  // Use local state with persisted values from localStorage
  const defaultAvailabilityLevel =
    (localStorage.getItem("availabilityLevel") as SecurityLevel) || "Moderate";
  const defaultIntegrityLevel =
    (localStorage.getItem("integrityLevel") as SecurityLevel) || "Moderate";
  const defaultConfidentialityLevel =
    (localStorage.getItem("confidentialityLevel") as SecurityLevel) ||
    "Moderate";
  const defaultDarkMode =
    localStorage.getItem("darkMode") === "true" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Use state with manual localStorage handling
  const [availabilityLevel, setAvailabilityLevelState] =
    useState<SecurityLevel>(defaultAvailabilityLevel);
  const [integrityLevel, setIntegrityLevelState] = useState<SecurityLevel>(
    defaultIntegrityLevel
  );
  const [confidentialityLevel, setConfidentialityLevelState] =
    useState<SecurityLevel>(defaultConfidentialityLevel);
  const [darkMode, setDarkModeState] = useState<boolean>(defaultDarkMode);

  // Custom setters that also persist values to localStorage
  const setAvailabilityLevel = (level: SecurityLevel) => {
    localStorage.setItem("availabilityLevel", level);
    setAvailabilityLevelState(level);
  };

  const setIntegrityLevel = (level: SecurityLevel) => {
    localStorage.setItem("integrityLevel", level);
    setIntegrityLevelState(level);
  };

  const setConfidentialityLevel = (level: SecurityLevel) => {
    localStorage.setItem("confidentialityLevel", level);
    setConfidentialityLevelState(level);
  };

  const setDarkMode = (
    value: boolean | ((prevDarkMode: boolean) => boolean)
  ) => {
    const newValue = typeof value === "function" ? value(darkMode) : value;
    localStorage.setItem("darkMode", String(newValue));
    setDarkModeState(newValue);
  };

  // Log initial values for debugging
  useEffect(() => {
    console.log("CIA App Security Levels:", {
      availability: availabilityLevel,
      integrity: integrityLevel,
      confidentiality: confidentialityLevel,
    });
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Create handler functions
  const handleAvailabilityChange = useCallback((level: SecurityLevel) => {
    console.log("CIAClassificationApp: Setting availability level to:", level);
    setAvailabilityLevel(level);
  }, []);

  const handleIntegrityChange = useCallback((level: SecurityLevel) => {
    console.log("CIAClassificationApp: Setting integrity level to:", level);
    setIntegrityLevel(level);
  }, []);

  const handleConfidentialityChange = useCallback((level: SecurityLevel) => {
    console.log(
      "CIAClassificationApp: Setting confidentiality level to:",
      level
    );
    setConfidentialityLevel(level);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      <div
        className={`min-h-screen ${
          darkMode ? "dark bg-gray-900" : "bg-gray-100"
        } p-4 transition-colors duration-300`}
      >
        {/* App header with theme toggle */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">CIA Compliance Manager</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Container with defined width to ensure grid fits properly */}
        <div className="w-full max-w-[1600px] mx-auto">
          <div
            data-testid="dashboard-grid"
            className="dashboard-grid-container"
          >
            {/* Security Level Widget */}
            <div className="grid-widget-container">
              <SecurityLevelWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                onAvailabilityChange={handleAvailabilityChange}
                onIntegrityChange={handleIntegrityChange}
                onConfidentialityChange={handleConfidentialityChange}
                testId="widget-security-level"
              />
            </div>

            {/* Business Impact Analysis Widget */}
            <div className="grid-widget-container">
              <BusinessImpactAnalysisWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-business-impact"
              />
            </div>

            {/* Security Summary Widget */}
            <div className="grid-widget-container">
              <SecuritySummaryWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-security-summary"
              />
            </div>

            {/* Value Creation Widget */}
            <div className="grid-widget-container">
              <ValueCreationWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-value-creation"
              />
            </div>

            {/* Cost Estimation Widget */}
            <div className="grid-widget-container">
              <CostEstimationWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-cost-estimation"
              />
            </div>

            {/* Compliance Status Widget */}
            <div className="grid-widget-container">
              <ComplianceStatusWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-compliance-status"
              />
            </div>

            {/* Confidentiality Impact Widget */}
            <div className="grid-widget-container">
              <ConfidentialityImpactWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-confidentiality-impact"
              />
            </div>

            {/* Integrity Impact Widget */}
            <div className="grid-widget-container">
              <IntegrityImpactWidget
                level={integrityLevel}
                testId="integrity-impact-widget"
              />
            </div>

            {/* Availability Impact Widget */}
            <div className="grid-widget-container">
              <AvailabilityImpactWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-availability-impact"
              />
            </div>

            {/* Technical Details Widget */}
            <div className="grid-widget-container">
              <TechnicalDetailsWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-technical-details"
              />
            </div>

            {/* Security Visualization Widget */}
            <div className="grid-widget-container">
              <SecurityVisualizationWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="widget-security-visualization"
              />
            </div>

            {/* Security Resources Widget */}
            <div className="grid-widget-container">
              <SecurityResourcesWidget
                availabilityLevel={availabilityLevel}
                integrityLevel={integrityLevel}
                confidentialityLevel={confidentialityLevel}
                testId="security-resources-widget"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
