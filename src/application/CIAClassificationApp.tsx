import React, { useCallback, useEffect, lazy, Suspense, useMemo } from "react";
// Import SecurityLevelWidget eagerly - critical for initial user interaction
import SecurityLevelWidget from "../components/widgets/assessmentcenter/SecurityLevelWidget";

// Lazy load all other widgets for better code splitting and faster initial load
// Assessment Center Widgets
const BusinessImpactAnalysisWidget = lazy(
  () => import("../components/widgets/assessmentcenter/BusinessImpactAnalysisWidget")
);
const SecuritySummaryWidget = lazy(
  () => import("../components/widgets/assessmentcenter/SecuritySummaryWidget")
);

// Business Value Widgets
const ComplianceStatusWidget = lazy(
  () => import("../components/widgets/businessvalue/ComplianceStatusWidget")
);
const CostEstimationWidget = lazy(
  () => import("../components/widgets/businessvalue/CostEstimationWidget")
);
const ValueCreationWidget = lazy(
  () => import("../components/widgets/businessvalue/ValueCreationWidget")
);

// Impact Analysis Widgets
const AvailabilityImpactWidget = lazy(
  () => import("../components/widgets/impactanalysis/AvailabilityImpactWidget")
);
const ConfidentialityImpactWidget = lazy(
  () => import("../components/widgets/impactanalysis/ConfidentialityImpactWidget")
);
const IntegrityImpactWidget = lazy(
  () => import("../components/widgets/impactanalysis/IntegrityImpactWidget")
);

// Implementation Guide Widgets (includes Chart.js dependency)
const SecurityResourcesWidget = lazy(
  () => import("../components/widgets/implementationguide/SecurityResourcesWidget")
);
const SecurityVisualizationWidget = lazy(
  () => import("../components/widgets/implementationguide/SecurityVisualizationWidget")
);
const TechnicalDetailsWidget = lazy(
  () => import("../components/widgets/implementationguide/TechnicalDetailsWidget")
);

import WidgetErrorBoundary from "../components/common/WidgetErrorBoundary";
import KeyboardShortcutHelp from "../components/common/KeyboardShortcutHelp";
import { APP_TEST_IDS, UI_TEXT } from "../constants";
import { KEYBOARD_SHORTCUTS } from "../constants/keyboardShortcuts";
import { useSecurityLevelState, useLocalStorage, SecurityLevelState } from "../hooks";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { useKeyboardShortcutContext } from "../contexts/KeyboardShortcutContext";
import { SecurityLevel } from "../types/cia";
import { ShortcutMap } from "../types/keyboard";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
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
  
  // Get keyboard shortcut context
  const { showHelp, setShowHelp } = useKeyboardShortcutContext();

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
  
  // Register keyboard shortcuts
  const shortcuts: ShortcutMap = useMemo(() => ({
    // Show help
    [KEYBOARD_SHORTCUTS.SHOW_HELP.id]: {
      ...KEYBOARD_SHORTCUTS.SHOW_HELP,
      handler: () => setShowHelp(true),
    },
    [KEYBOARD_SHORTCUTS.SHOW_HELP_ALT.id]: {
      ...KEYBOARD_SHORTCUTS.SHOW_HELP_ALT,
      handler: () => setShowHelp(true),
    },
    // Security level selection shortcuts (future enhancement)
    // Navigation shortcuts (future enhancement)
    // Action shortcuts (future enhancement)
  }), [setShowHelp]);
  
  // Use keyboard shortcuts hook
  useKeyboardShortcuts({
    shortcuts,
    enabled: true,
    preventDefault: true,
  });

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
                data-testid={APP_TEST_IDS.APP_LOGO}
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
                  data-testid={APP_TEST_IDS.APP_INDICATOR}
                >
                  ■
                </span>
                <span className="mr-1 version-tag" data-testid={APP_TEST_IDS.APP_VERSION}>
                  v{appVersion}
                </span>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://github.com/Hack23/cia-compliance-manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid={APP_TEST_IDS.SOURCE_LINK}
                >
                  Source
                </a>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://www.hack23.com/cia-compliance-manager-features.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid={APP_TEST_IDS.DOCS_LINK}
                >
                  Doc
                </a>
                <span className="mx-1 nav-separator">•</span>
                <a
                  href="https://hack23.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link"
                  data-testid={APP_TEST_IDS.AUTHOR_LINK}
                >
                  Hack23
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHelp(true)}
              className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded transition-colors"
              title="Keyboard Shortcuts (? or Ctrl+/)"
              data-testid={APP_TEST_IDS.KEYBOARD_SHORTCUTS_BUTTON}
            >
              ⌨️ Shortcuts
            </button>
            <button
              onClick={toggleDarkMode}
              className="theme-toggle-btn"
              data-testid={APP_TEST_IDS.THEME_TOGGLE}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* Container with defined width to ensure grid fits properly */}
        <div className="w-full max-w-[1600px] mx-auto">
          <div
            data-testid={APP_TEST_IDS.DASHBOARD_GRID}
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
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-business-impact" />}>
                  <BusinessImpactAnalysisWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-business-impact"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Security Summary Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Security Summary" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-security-summary" />}>
                  <SecuritySummaryWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-security-summary"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Value Creation Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Value Creation" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-value-creation" />}>
                  <ValueCreationWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-value-creation"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Cost Estimation Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Cost Estimation" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-cost-estimation" />}>
                  <CostEstimationWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-cost-estimation"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Compliance Status Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Compliance Status" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-compliance-status" />}>
                  <ComplianceStatusWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-compliance-status"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Confidentiality Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Confidentiality Impact" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-confidentiality-impact" />}>
                  <ConfidentialityImpactWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-confidentiality-impact"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Integrity Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Integrity Impact" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-integrity-impact" />}>
                  <IntegrityImpactWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="integrity-impact-widget"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Availability Impact Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Availability Impact" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-availability-impact" />}>
                  <AvailabilityImpactWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-availability-impact"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Technical Details Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Technical Details" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-technical-details" />}>
                  <TechnicalDetailsWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="widget-technical-details"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>

            {/* Security Visualization Widget */}
            <div className="grid-widget-container">
              <WidgetErrorBoundary widgetName="Security Visualization" onError={handleWidgetError}>
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-security-visualization" />}>
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
                <Suspense fallback={<LoadingSkeleton lines={5} className="p-4" testId="loading-security-resources" />}>
                  <SecurityResourcesWidget
                    availabilityLevel={levels.availability}
                    integrityLevel={levels.integrity}
                    confidentialityLevel={levels.confidentiality}
                    testId="security-resources-widget"
                  />
                </Suspense>
              </WidgetErrorBoundary>
            </div>
          </div>
        </div>
        
        {/* Keyboard Shortcut Help Modal */}
        <KeyboardShortcutHelp
          isOpen={showHelp}
          onClose={() => setShowHelp(false)}
        />
      </div>
    </div>
  );
};

export default CIAClassificationApp;
