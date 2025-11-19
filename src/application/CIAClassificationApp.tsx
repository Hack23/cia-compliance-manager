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
import { APP_TEST_IDS, UI_TEXT } from "../constants";
import { useSecurityLevelState, useLocalStorage } from "../hooks";
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
  const appVersion = APP_VERSION;

  // Use custom hooks for security level state management with localStorage persistence
  const [savedLevels, setSavedLevels] = useLocalStorage("securityLevels", {
    availability: "Moderate" as SecurityLevel,
    integrity: "Moderate" as SecurityLevel,
    confidentiality: "Moderate" as SecurityLevel,
  });

  // Initialize security level state with saved values
  const { levels, setLevel } = useSecurityLevelState(savedLevels);

  // Persist security levels to localStorage whenever they change
  useEffect(() => {
    setSavedLevels(levels);
  }, [levels, setSavedLevels]);

  // Use custom hook for dark mode persistence
  const defaultDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", defaultDarkMode);

  // Log initial values for debugging
  useEffect(() => {
    console.log("CIA App Security Levels:", {
      availability: levels.availability,
      integrity: levels.integrity,
      confidentiality: levels.confidentiality,
    });
  }, [levels]);

  // Create handler functions using the hook's setLevel method
  const handleAvailabilityChange = useCallback(
    (level: SecurityLevel) => {
      console.log("CIAClassificationApp: Setting availability level to:", level);
      setLevel("availability", level);
    },
    [setLevel]
  );

  const handleIntegrityChange = useCallback(
    (level: SecurityLevel) => {
      console.log("CIAClassificationApp: Setting integrity level to:", level);
      setLevel("integrity", level);
    },
    [setLevel]
  );

  const handleConfidentialityChange = useCallback(
    (level: SecurityLevel) => {
      console.log(
        "CIAClassificationApp: Setting confidentiality level to:",
        level
      );
      setLevel("confidentiality", level);
    },
    [setLevel]
  );

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
        {/* Ultra-compact app header with horizontal layout */}
        <div className="mb-2 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-lg shadow-md flex justify-between items-center app-header">
          <div className="flex items-center">
            <div className="w-5 h-5 flex items-center justify-center overflow-hidden mr-1.5">
              <img
                src="./icon-192.png"
                alt="CIA Compliance Manager Logo"
                style={{ transform: "scale(0.2)" }}
                data-testid="app-logo"
              />
            </div>
            <div className="flex flex-row items-center">
              <h1
                data-testid={APP_TEST_IDS.APP_TITLE}
                className="text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-300 mr-2"
              >
                {UI_TEXT.APP_TITLE}
              </h1>
              <div className="cyber-nav flex items-center flex-wrap">
                <span
                  className="inline-block pulse-dot mr-1"
                  data-testid="app-indicator"
                >
                  ■
                </span>
                <span className="mr-1 version-tag" data-testid="app-version">
                  v{appVersion}
                </span>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://github.com/Hack23/cia-compliance-manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid="source-link"
                >
                  Source
                </a>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://www.hack23.com/cia-compliance-manager-features.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid="docs-link"
                >
                  Doc
                </a>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://hack23.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid="author-link"
                >
                  Hack23
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            data-testid="theme-toggle"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
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
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                onAvailabilityChange={handleAvailabilityChange}
                onIntegrityChange={handleIntegrityChange}
                onConfidentialityChange={handleConfidentialityChange}
                testId="widget-security-level"
              />
            </div>

            {/* Business Impact Analysis Widget */}
            <div className="grid-widget-container">
              <BusinessImpactAnalysisWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-business-impact"
              />
            </div>

            {/* Security Summary Widget */}
            <div className="grid-widget-container">
              <SecuritySummaryWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-security-summary"
              />
            </div>

            {/* Value Creation Widget */}
            <div className="grid-widget-container">
              <ValueCreationWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-value-creation"
              />
            </div>

            {/* Cost Estimation Widget */}
            <div className="grid-widget-container">
              <CostEstimationWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-cost-estimation"
              />
            </div>

            {/* Compliance Status Widget */}
            <div className="grid-widget-container">
              <ComplianceStatusWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-compliance-status"
              />
            </div>

            {/* Confidentiality Impact Widget */}
            <div className="grid-widget-container">
              <ConfidentialityImpactWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-confidentiality-impact"
              />
            </div>

            {/* Integrity Impact Widget */}
            <div className="grid-widget-container">
              <IntegrityImpactWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="integrity-impact-widget"
              />
            </div>

            {/* Availability Impact Widget */}
            <div className="grid-widget-container">
              <AvailabilityImpactWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-availability-impact"
              />
            </div>

            {/* Technical Details Widget */}
            <div className="grid-widget-container">
              <TechnicalDetailsWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-technical-details"
              />
            </div>

            {/* Security Visualization Widget */}
            <div className="grid-widget-container">
              <SecurityVisualizationWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
                testId="widget-security-visualization"
              />
            </div>

            {/* Security Resources Widget */}
            <div className="grid-widget-container">
              <SecurityResourcesWidget
                availabilityLevel={levels.availability}
                integrityLevel={levels.integrity}
                confidentialityLevel={levels.confidentiality}
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
