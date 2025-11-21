import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
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
import TechnicalDetailsWidget from "../components/widgets/implementationguide/TechnicalDetailsWidget";

// Lazy load SecurityVisualizationWidget as it includes Chart.js dependency
const SecurityVisualizationWidget = lazy(
  () => import("../components/widgets/implementationguide/SecurityVisualizationWidget")
);

import WidgetErrorBoundary from "../components/common/WidgetErrorBoundary";
import { APP_TEST_IDS, UI_TEXT } from "../constants";
import { useSecurityLevelState, useLocalStorage, SecurityLevelState } from "../hooks";
import { SecurityLevel } from "../types/cia";
import logger from "../utils/logger";

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
  const defaultLevels: SecurityLevelState = {
    availability: "Moderate",
    integrity: "Moderate",
    confidentiality: "Moderate",
  };
  const [savedLevels, setSavedLevels] = useLocalStorage("securityLevels", defaultLevels);

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

  // Error handler for widget error boundaries
  const handleWidgetError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    logger.error('Widget error caught by error boundary', { error, errorInfo });
  }, []);

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
              <WidgetErrorBoundary widgetName="Business Impact Analysis" onError={handleWidgetError}>
                <BusinessImpactAnalysisWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-business-impact"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Security Summary Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Security Summary" onError={handleWidgetError}>
                <SecuritySummaryWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-security-summary"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Value Creation Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Value Creation" onError={handleWidgetError}>
                <ValueCreationWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-value-creation"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Cost Estimation Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Cost Estimation" onError={handleWidgetError}>
                <CostEstimationWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-cost-estimation"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Compliance Status Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Compliance Status" onError={handleWidgetError}>
                <ComplianceStatusWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-compliance-status"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Confidentiality Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Confidentiality Impact" onError={handleWidgetError}>
                <ConfidentialityImpactWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-confidentiality-impact"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Integrity Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Integrity Impact" onError={handleWidgetError}>
                <IntegrityImpactWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="integrity-impact-widget"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Availability Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Availability Impact" onError={handleWidgetError}>
                <AvailabilityImpactWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-availability-impact"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Technical Details Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Technical Details" onError={handleWidgetError}>
                <TechnicalDetailsWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="widget-technical-details"
                />
              </WidgetErrorBoundary>
            </div>

            {/* Security Visualization Widget - Lazy Loaded */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Security Visualization" onError={handleWidgetError}>
                <Suspense fallback={<div className="widget-loading">Loading visualization...</div>}>
                  <SecurityVisualizationWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-security-visualization"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Security Resources Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Security Resources" onError={handleWidgetError}>
                <SecurityResourcesWidget
                  availabilityLevel={levels.availability}
                  integrityLevel={levels.integrity}
                  confidentialityLevel={levels.confidentiality}
                  testId="security-resources-widget"
                />
              </WidgetErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
