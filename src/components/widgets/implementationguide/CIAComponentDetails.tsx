import React, { useMemo, useState } from "react";
import { TECHNICAL_DETAILS_WIDGET_IDS } from "../../../constants/testIds";
import { SecurityLevel, CIAComponent } from "../../../types/cia";
import { getImplementationComplexity } from "../../../utils/riskUtils";
import { getPersonnelRequirements } from "../../../utils/resourceUtils";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";

/**
 * Component theme configuration
 */
interface ComponentTheme {
  icon: string;
  colorClass: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  accentClass: string;
  accentBgClass: string;
  title: string;
}

/**
 * Theme configurations for each CIA component
 */
const COMPONENT_THEMES: Record<CIAComponent, ComponentTheme> = {
  confidentiality: {
    icon: "🔒",
    colorClass: "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20",
    textClass: "text-purple-800 dark:text-purple-300",
    bgClass: "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20",
    borderClass: "border-purple-100 dark:border-purple-800",
    accentClass: "text-purple-500",
    accentBgClass: "bg-purple-500 dark:bg-purple-600",
    title: "Confidentiality Controls",
  },
  integrity: {
    icon: "✓",
    colorClass: "bg-green-100 dark:bg-green-900 dark:bg-opacity-20",
    textClass: "text-green-800 dark:text-green-300",
    bgClass: "bg-green-50 dark:bg-green-900 dark:bg-opacity-20",
    borderClass: "border-green-100 dark:border-green-800",
    accentClass: "text-green-500",
    accentBgClass: "bg-green-500 dark:bg-green-600",
    title: "Integrity Controls",
  },
  availability: {
    icon: "⏱️",
    colorClass: "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20",
    textClass: "text-blue-800 dark:text-blue-300",
    bgClass: "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20",
    borderClass: "border-blue-100 dark:border-blue-800",
    accentClass: "text-blue-500",
    accentBgClass: "bg-blue-500 dark:bg-blue-600",
    title: "Availability Controls",
  },
};

/**
 * Props for CIAComponentDetails component
 */
export interface CIAComponentDetailsProps {
  component: CIAComponent;
  level: SecurityLevel;
  details: unknown;
  ciaContentService: unknown;
  testId: string;
  getTechnicalDescription: (component: CIAComponent, level: SecurityLevel) => string;
  getTechnicalRequirements: (component: CIAComponent, level: SecurityLevel) => string[];
  getTechnologies: (component: CIAComponent, level: SecurityLevel) => string;
  getConfigurations: (component: CIAComponent, level: SecurityLevel) => string;
  getExpertiseRequired: (component: CIAComponent, level: SecurityLevel) => string[];
}

/**
 * Reusable component for displaying CIA component details
 * Handles rendering for confidentiality, integrity, or availability
 */
export const CIAComponentDetails: React.FC<CIAComponentDetailsProps> = ({
  component,
  level,
  details,
  testId,
  getTechnicalDescription,
  getTechnicalRequirements,
  getTechnologies,
  getConfigurations,
  getExpertiseRequired,
}) => {
  const theme = COMPONENT_THEMES[component];
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

  // Helper to convert complexity string to numeric value for UI
  const getComplexityValue = (complexity: string): number => {
    const value = getSecurityLevelValue(complexity as SecurityLevel);
    return value * 25;
  };

  // Calculate complexity using existing utility
  const complexity = useMemo(() => {
    const complexityLabel = getImplementationComplexity(level, level, level);
    return {
      value: getComplexityValue(complexityLabel),
      label: complexityLabel,
    };
  }, [level]);

  // Get optional property with fallback
  const getOptionalProperty = (
    obj: unknown,
    property: string,
    fallback: string
  ): string => {
    if (isNullish(obj)) return fallback;
    if (typeof obj === "object" && property in obj) {
      const value = (obj as Record<string, unknown>)[property];
      if (!isNullish(value) && typeof value === "string") return value;
    }
    return fallback;
  };

  return (
    <div className="mb-lg" data-testid={TECHNICAL_DETAILS_WIDGET_IDS.section(component)}>
      <div className="flex items-center mb-md" data-testid={TECHNICAL_DETAILS_WIDGET_IDS.header()}>
        <span className={`text-xl mr-2 ${theme.accentClass}`}>
          {theme.icon}
        </span>
        <h3 className="text-lg font-medium">{theme.title}</h3>
        <div className="ml-auto">
          <SecurityLevelBadge
            category=""
            level={level}
            colorClass={theme.colorClass}
            textClass={theme.textClass}
            testId={`${testId}-${component}-badge`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-sm mb-md">
        {/* Main technical details card */}
        <div
          className={`p-sm ${theme.bgClass} rounded-lg shadow-sm border ${theme.borderClass}`}
        >
          <h4 className={`text-md font-medium ${theme.textClass} mb-md`}>
            Technical Description
          </h4>
          <p
            className="text-sm text-gray-600 dark:text-gray-400"
            data-testid={TECHNICAL_DETAILS_WIDGET_IDS.label('description')}
          >
            {getOptionalProperty(
              details,
              "technical",
              getTechnicalDescription(component, level)
            )}
          </p>

          <div className="mt-md">
            <h5 className={`text-sm font-medium ${theme.textClass} mb-xs`}>
              Implementation Complexity
            </h5>
            <div
              className="flex items-center"
              data-testid={TECHNICAL_DETAILS_WIDGET_IDS.label('development-effort')}
            >
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mr-sm">
                <div
                  className={`h-2 ${theme.accentBgClass} rounded-full`}
                  style={{ width: `${complexity.value}%` }}
                ></div>
              </div>
              <span className="text-xs font-medium">{complexity.label}</span>
            </div>
          </div>

          <div className="mt-md">
            <h5 className={`text-sm font-medium ${theme.textClass} mb-xs`}>
              Personnel Requirements
            </h5>
            <div
              className="flex items-center"
              data-testid={TECHNICAL_DETAILS_WIDGET_IDS.label('maintenance-level')}
            >
              <span className="text-sm">Estimated staffing: </span>
              <span className={`ml-2 text-sm font-medium ${theme.textClass}`}>
                {getPersonnelRequirements(level)}
              </span>
            </div>
          </div>
        </div>

        {/* Implementation requirements card */}
        <div className="p-sm bg-white dark:bg-gray-800 rounded-md shadow-md border border-neutral-light dark:border-neutral-dark">
          <h4
            className="text-md font-medium mb-md"
            data-testid={TECHNICAL_DETAILS_WIDGET_IDS.header('implementation')}
          >
            Implementation Requirements
          </h4>
          <ul
            className="list-disc list-inside space-y-xs text-sm text-gray-600 dark:text-gray-400"
            data-testid={TECHNICAL_DETAILS_WIDGET_IDS.list('implementation-steps')}
          >
            {getTechnicalRequirements(component, level).map((req, index) => (
              <li
                key={`${component}-req-${index}`}
                data-testid={TECHNICAL_DETAILS_WIDGET_IDS.item(`requirement-${index}`)}
              >
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Advanced Details - Collapsible */}
      <div className="mb-sm">
        <button
          onClick={() => setShowAdvancedDetails(!showAdvancedDetails)}
          className="w-full flex items-center justify-between p-sm bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-expanded={showAdvancedDetails}
          aria-controls={`${testId}-${component}-advanced-content`}
          aria-label={`Toggle ${component} advanced details section`}
          data-testid={`${testId}-${component}-toggle-advanced`}
        >
          <span className="text-sm font-medium">
            {showAdvancedDetails ? "Hide" : "Show"} Advanced Details
          </span>
          <span className="text-gray-500">
            {showAdvancedDetails ? "▲" : "▼"}
          </span>
        </button>
        
        {showAdvancedDetails && (
          <div id={`${testId}-${component}-advanced-content`} className="mt-sm space-y-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              {/* Technologies card */}
              <div className="p-sm bg-white dark:bg-gray-800 rounded-md shadow-sm border border-neutral-light dark:border-neutral-dark">
                <h4 className="text-sm font-medium flex items-center mb-sm">
                  <span className={`mr-xs ${theme.accentClass}`}>💻</span>Technologies
                </h4>
                <p className={`text-sm ${theme.textClass}`}>
                  {getOptionalProperty(
                    details,
                    "technologies",
                    getTechnologies(component, level)
                  )}
                </p>
              </div>

              {/* Configurations card */}
              <div className="p-sm bg-white dark:bg-gray-800 rounded-md shadow-sm border border-neutral-light dark:border-neutral-dark">
                <h4 className="text-sm font-medium flex items-center mb-sm">
                  <span className={`mr-xs ${theme.accentClass}`}>⚙️</span>
                  Configurations
                </h4>
                <p className={`text-sm ${theme.textClass}`}>
                  {getOptionalProperty(
                    details,
                    "configurations",
                    getConfigurations(component, level)
                  )}
                </p>
              </div>
            </div>

            {/* Expertise Required card */}
            <div className="p-sm bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium flex items-center mb-sm">
                <span className={`mr-xs ${theme.accentClass}`}>👨‍💻</span>Expertise Required
              </h4>
              <ul
                className="grid grid-cols-1 lg:grid-cols-2 gap-xs"
                data-testid={TECHNICAL_DETAILS_WIDGET_IDS.list('required-expertise')}
              >
                {getExpertiseRequired(component, level).map((expertise, index) => (
                  <li
                    key={`${component}-exp-${index}`}
                    className="flex items-center text-sm"
                  >
                    <span className={`mr-xs ${theme.accentClass}`}>•</span>
                    <span>{expertise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
