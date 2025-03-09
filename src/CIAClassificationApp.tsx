import React, { useState, useMemo, useEffect } from "react";
import {
  availabilityOptions,
  integrityOptions,
  confidentialityOptions,
} from "./hooks/useCIAOptions";
import { SECURITY_LEVELS, UI_TEXT } from "./constants/appConstants";
import { WIDGET_TITLES, WIDGET_ICONS } from "./constants/coreConstants";
import { APP_TEST_IDS, WIDGET_TEST_IDS } from "./constants/testIds";
import Dashboard, { DashboardWidget } from "./components/Dashboard";
import SecurityLevelWidget from "./components/widgets/SecurityLevelWidget";
import RadarChart from "./components/RadarChart";
import CostEstimationWidget from "./components/widgets/CostEstimationWidget";
import SecuritySummaryWidget from "./components/widgets/SecuritySummaryWidget";
import ValueCreationWidget from "./components/widgets/ValueCreationWidget";
import ComplianceStatusWidget from "./components/widgets/ComplianceStatusWidget";
// Import the new widgets
import IntegrityImpactWidget from "./components/widgets/IntegrityImpactWidget";
import ConfidentialityImpactWidget from "./components/widgets/ConfidentialityImpactWidget";
import AvailabilityImpactWidget from "./components/widgets/AvailabilityImpactWidget";
import SecurityResourcesWidget from "./components/widgets/SecurityResourcesWidget";
import TechnicalDetailsWidget from "./components/widgets/TechnicalDetailsWidget";
import BusinessImpactAnalysisWidget from "./components/widgets/BusinessImpactAnalysisWidget";
import { SecurityLevel } from "./types/cia";
import { typeAdapters } from "./types/widgets";

/**
 * Main component for the CIA Classification App
 */
const CIAClassificationApp: React.FC = () => {
  // State for security levels
  const [availability, setAvailability] = useState<string>(
    SECURITY_LEVELS.NONE
  );
  const [integrity, setIntegrity] = useState<string>(SECURITY_LEVELS.NONE);
  const [confidentiality, setConfidentiality] = useState<string>(
    SECURITY_LEVELS.NONE
  );

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const testEventHandler = (e: Event) => {
      if (
        e instanceof CustomEvent &&
        e.type === "test:set-values" &&
        e.detail
      ) {
        const { availability: a, integrity: i, confidentiality: c } = e.detail;
        if (a) setAvailability(a);
        if (i) setIntegrity(i);
        if (c) setConfidentiality(c);
      }
    };

    document.addEventListener(
      "test:set-values",
      testEventHandler as EventListener
    );

    return () => {
      document.removeEventListener(
        "test:set-values",
        testEventHandler as EventListener
      );
    };
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      typeof window.matchMedia === "function"
    ) {
      try {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(prefersDark);

        if (prefersDark) {
          document.documentElement.classList.add("dark");
          document.getElementById("root")?.classList.add("dark");
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "test") {
          console.error("Error detecting color scheme preference:", error);
        }
      }
    }
  }, []);

  // Calculate total costs
  const totalCapex =
    (availabilityOptions[availability as SecurityLevel]?.capex || 0) +
    (integrityOptions[integrity as SecurityLevel]?.capex || 0) +
    (confidentialityOptions[confidentiality as SecurityLevel]?.capex || 0);

  const totalOpex =
    (availabilityOptions[availability as SecurityLevel]?.opex || 0) +
    (integrityOptions[integrity as SecurityLevel]?.opex || 0) +
    (confidentialityOptions[confidentiality as SecurityLevel]?.opex || 0);

  // Calculate overall security level
  const overallSecurityLevel = useMemo(() => {
    const levels = [
      SECURITY_LEVELS.NONE,
      SECURITY_LEVELS.LOW,
      SECURITY_LEVELS.MODERATE,
      SECURITY_LEVELS.HIGH,
      SECURITY_LEVELS.VERY_HIGH,
    ];
    const availabilityIndex = levels.indexOf(availability as SecurityLevel);
    const integrityIndex = levels.indexOf(integrity as SecurityLevel);
    const confidentialityIndex = levels.indexOf(
      confidentiality as SecurityLevel
    );

    const avgIndex = Math.round(
      (availabilityIndex + integrityIndex + confidentialityIndex) / 3
    );
    return levels[avgIndex] || SECURITY_LEVELS.NONE;
  }, [availability, integrity, confidentiality]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Apply dark mode class to HTML element (more standard approach)
      if (newMode) {
        document.documentElement.classList.add("dark");
        document.getElementById("root")?.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.getElementById("root")?.classList.remove("dark");
      }
      return newMode;
    });
  };

  // Determine if we're dealing with a small solution for UI adaptation
  const isSmallSolution = totalCapex <= 60;

  // Prepare dynamic cost estimates based on solution size
  const capexEstimate = isSmallSolution ? "$5,000" : "$50,000";
  const opexEstimate = isSmallSolution ? "$500" : "$50,000";

  // Prepare adapter functions for options
  const adaptedIntegrityOptions = Object.entries(integrityOptions).reduce(
    (acc, [key, value]) => {
      acc[key] = typeAdapters.toIntegrityDetail(value);
      return acc;
    },
    {} as Record<string, any>
  );

  const adaptedConfidentialityOptions = Object.entries(
    confidentialityOptions
  ).reduce((acc, [key, value]) => {
    acc[key] = typeAdapters.toConfidentialityDetail(value);
    return acc;
  }, {} as Record<string, any>);

  const adaptedAvailabilityOptions = Object.entries(availabilityOptions).reduce(
    (acc, [key, value]) => {
      acc[key] = typeAdapters.toAvailabilityDetail(value);
      return acc;
    },
    {} as Record<string, any>
  );

  return (
    <div
      className={`app-container ${darkMode ? "dark bg-pattern" : ""}`}
      data-testid={APP_TEST_IDS.APP_CONTAINER}
    >
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
        <div className="w-full mx-auto">
          {/* App title and theme toggle */}
          <div className="app-title shadow-lg rounded-xl transition-colors duration-300">
            <h1
              data-testid={APP_TEST_IDS.APP_TITLE}
              className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300 flex items-center"
            >
              <img
                src="/icon-192.png"
                alt="CIA Compliance Manager Logo"
                style={{ height: "48px" }}
                className="w-auto mr-1"
              />
              {UI_TEXT.APP_TITLE}
            </h1>
            <button
              data-testid={APP_TEST_IDS.THEME_TOGGLE}
              onClick={toggleDarkMode}
              className={`px-4 py-2 rounded-md flex items-center transition-all duration-300 ${
                darkMode
                  ? "bg-black border border-green-500 hover:border-green-400 hover:bg-gray-900"
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
          </div>

          {/* Main dashboard */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-6 transition-colors duration-300">
            <Dashboard>
              {/* Security Level Selection */}
              <DashboardWidget
                title={WIDGET_TITLES.SECURITY_LEVEL}
                icon="SECURITY_LEVEL"
                testId="widget-security-level-selection"
              >
                <SecurityLevelWidget
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                  setAvailability={setAvailability}
                  setIntegrity={setIntegrity}
                  setConfidentiality={setConfidentiality}
                />
              </DashboardWidget>

              {/* Security Visualization */}
              <DashboardWidget
                title={WIDGET_TITLES.SECURITY_VISUALIZATION}
                icon="SECURITY_VISUALIZATION"
                testId="widget-radar-chart"
              >
                <RadarChart
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Security Summary */}
              <DashboardWidget
                title={WIDGET_TITLES.SECURITY_SUMMARY}
                icon="SECURITY_SUMMARY"
                testId="widget-security-summary"
              >
                <SecuritySummaryWidget
                  securityLevel={overallSecurityLevel}
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Cost Estimation */}
              <DashboardWidget
                title={WIDGET_TITLES.COST_ESTIMATION}
                icon="COST_ESTIMATION"
                testId="widget-cost-estimation"
              >
                <CostEstimationWidget
                  totalCapex={totalCapex}
                  totalOpex={totalOpex}
                  capexEstimate={capexEstimate}
                  opexEstimate={opexEstimate}
                  isSmallSolution={isSmallSolution}
                />
              </DashboardWidget>

              {/* Compliance Status */}
              <DashboardWidget
                title={WIDGET_TITLES.COMPLIANCE_STATUS}
                icon="COMPLIANCE_STATUS"
                testId="widget-compliance-status"
              >
                <ComplianceStatusWidget
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Value Creation */}
              <DashboardWidget
                title={WIDGET_TITLES.VALUE_CREATION}
                icon="VALUE_CREATION"
                testId="widget-value-creation"
              >
                <ValueCreationWidget
                  securityLevel={overallSecurityLevel}
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Integrity Impact - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.INTEGRITY_IMPACT}
                icon="INTEGRITY_IMPACT"
                testId="widget-integrity-impact-container"
              >
                <IntegrityImpactWidget
                  integrityLevel={integrity}
                  availabilityLevel={availability}
                  confidentialityLevel={confidentiality}
                  options={adaptedIntegrityOptions}
                />
              </DashboardWidget>

              {/* Confidentiality Impact - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
                icon="CONFIDENTIALITY_IMPACT"
                testId="widget-confidentiality-impact-container"
              >
                <ConfidentialityImpactWidget
                  confidentialityLevel={confidentiality}
                  integrityLevel={integrity}
                  availabilityLevel={availability}
                  options={adaptedConfidentialityOptions}
                />
              </DashboardWidget>

              {/* Availability Impact - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.AVAILABILITY_IMPACT}
                icon="AVAILABILITY_IMPACT"
                testId="widget-availability-impact-container"
              >
                <AvailabilityImpactWidget
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                  options={adaptedAvailabilityOptions}
                />
              </DashboardWidget>

              {/* Security Resources - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.SECURITY_RESOURCES}
                icon="SECURITY_RESOURCES"
                testId="widget-security-resources-container"
              >
                <SecurityResourcesWidget
                  securityLevel={overallSecurityLevel}
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Technical Details - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.TECHNICAL_IMPLEMENTATION}
                icon="TECHNICAL_IMPLEMENTATION"
                testId="widget-technical-details-container"
              >
                <TechnicalDetailsWidget
                  availabilityLevel={availability}
                  integrityLevel={integrity}
                  confidentialityLevel={confidentiality}
                />
              </DashboardWidget>

              {/* Business Impact Analysis - New Widget */}
              <DashboardWidget
                title={WIDGET_TITLES.BUSINESS_IMPACT}
                icon="BUSINESS_IMPACT"
                testId="widget-business-impact-container"
              >
                <BusinessImpactAnalysisWidget
                  availabilityLevel={availability as SecurityLevel}
                  integrityLevel={integrity as SecurityLevel}
                  confidentialityLevel={confidentiality as SecurityLevel}
                  securityLevel={overallSecurityLevel}
                />
              </DashboardWidget>
            </Dashboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CIAClassificationApp;
