import React, { useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { TECHNICAL_DETAILS_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for TechnicalDetailsWidget
 */
interface TechnicalDetailsWidgetProps {
  /**
   * Selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * Selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Technical Details Widget provides implementation specifics for security levels
 *
 * ## Business Perspective
 *
 * This widget helps technical teams understand the specific implementation
 * requirements for the selected security levels, providing detailed technical
 * guidance, expertise requirements, and implementation considerations to support
 * successful security control deployment. 🔧
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-technical-details",
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<
    "availability" | "integrity" | "confidentiality"
  >("availability");

  // Get the content service
  const { ciaContentService } = useCIAContentService();

  // Helper function to get component-specific technical details
  const getTechnicalDetails = (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ) => {
    return (
      ciaContentService.getTechnicalImplementation?.(component, level) || {
        description: "No technical details available",
        expertiseLevel: "Standard",
        implementationSteps: [],
        developmentEffort: "Medium",
        maintenanceLevel: "Medium",
      }
    );
  };

  // Get details for each component
  const availabilityDetails = getTechnicalDetails(
    "availability",
    availabilityLevel
  );
  const integrityDetails = getTechnicalDetails("integrity", integrityLevel);
  const confidentialityDetails = getTechnicalDetails(
    "confidentiality",
    confidentialityLevel
  );

  // Get the active details based on the active tab
  const activeDetails =
    activeTab === "availability"
      ? availabilityDetails
      : activeTab === "integrity"
      ? integrityDetails
      : confidentialityDetails;

  // Get the active level based on the active tab
  const activeLevel =
    activeTab === "availability"
      ? availabilityLevel
      : activeTab === "integrity"
      ? integrityLevel
      : confidentialityLevel;

  // Helper function to render expertise level badge
  const renderExpertiseBadge = (level: string) => {
    const levelMap: Record<string, { color: string; icon: string }> = {
      Basic: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300",
        icon: "👨‍💻",
      },
      Standard: {
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300",
        icon: "👨‍💻👨‍💻",
      },
      Advanced: {
        color:
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-20 dark:text-purple-300",
        icon: "👨‍💻👨‍💻👨‍💻",
      },
      Expert: {
        color:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300",
        icon: "👨‍💻👨‍💻👨‍💻👨‍💻",
      },
    };

    const { color, icon } = levelMap[level] || levelMap["Standard"];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {icon} {level}
      </span>
    );
  };

  // Helper function to render effort level badge
  const renderEffortBadge = (level: string) => {
    const levelMap: Record<string, { color: string; icon: string }> = {
      Low: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300",
        icon: "⏱️",
      },
      Medium: {
        color:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:bg-opacity-20 dark:text-blue-300",
        icon: "⏱️⏱️",
      },
      High: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-20 dark:text-yellow-300",
        icon: "⏱️⏱️⏱️",
      },
      "Very High": {
        color:
          "bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-20 dark:text-red-300",
        icon: "⏱️⏱️⏱️⏱️",
      },
    };

    const { color, icon } = levelMap[level] || levelMap["Medium"];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
      >
        {icon} {level}
      </span>
    );
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.TECHNICAL_DETAILS}
      icon={WIDGET_ICONS.TECHNICAL_DETAILS}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        {/* Tabs navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "availability"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("availability")}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.AVAILABILITY_TAB}
          >
            <span className="flex items-center">
              <span className="mr-2">⏱️</span>
              Availability
            </span>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "integrity"
                ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("integrity")}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.INTEGRITY_TAB}
          >
            <span className="flex items-center">
              <span className="mr-2">✓</span>
              Integrity
            </span>
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "confidentiality"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("confidentiality")}
            data-testid={TECHNICAL_DETAILS_TEST_IDS.CONFIDENTIALITY_TAB}
          >
            <span className="flex items-center">
              <span className="mr-2">🔒</span>
              Confidentiality
            </span>
          </button>
        </div>

        {/* Security level badge */}
        <div className="mb-4">
          <SecurityLevelBadge
            category={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            level={activeLevel}
            colorClass={
              activeTab === "availability"
                ? "bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
                : activeTab === "integrity"
                ? "bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
                : "bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
            }
            textClass={
              activeTab === "availability"
                ? "text-blue-800 dark:text-blue-300"
                : activeTab === "integrity"
                ? "text-green-800 dark:text-green-300"
                : "text-purple-800 dark:text-purple-300"
            }
          />
        </div>

        {/* Technical details content */}
        <div className="space-y-6">
          {/* Technical Description */}
          <div>
            <h3
              className="text-lg font-medium mb-2"
              data-testid={TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_HEADER}
            >
              Technical Implementation
            </h3>
            <p
              className="text-gray-600 dark:text-gray-300"
              data-testid={TECHNICAL_DETAILS_TEST_IDS.TECHNICAL_DESCRIPTION}
            >
              {activeDetails.description}
            </p>
          </div>

          {/* Implementation Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Development Effort</div>
              <div
                className="font-medium"
                data-testid={TECHNICAL_DETAILS_TEST_IDS.DEVELOPMENT_EFFORT}
              >
                {renderEffortBadge(activeDetails.developmentEffort)}
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Maintenance Level</div>
              <div
                className="font-medium"
                data-testid={TECHNICAL_DETAILS_TEST_IDS.MAINTENANCE_LEVEL}
              >
                {renderEffortBadge(activeDetails.maintenanceLevel)}
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">Required Expertise</div>
              <div
                className="font-medium"
                data-testid={TECHNICAL_DETAILS_TEST_IDS.REQUIRED_EXPERTISE}
              >
                {renderExpertiseBadge(activeDetails.expertiseLevel)}
              </div>
            </div>
          </div>

          {/* Implementation Steps */}
          {activeDetails.implementationSteps &&
            activeDetails.implementationSteps.length > 0 && (
              <div>
                <h3
                  className="text-lg font-medium mb-2"
                  data-testid={TECHNICAL_DETAILS_TEST_IDS.IMPLEMENTATION_HEADER}
                >
                  Implementation Steps
                </h3>
                <ol
                  className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300"
                  data-testid={TECHNICAL_DETAILS_TEST_IDS.IMPLEMENTATION_STEPS}
                >
                  {activeDetails.implementationSteps.map((step, index) => (
                    <li
                      key={index}
                      data-testid={`implementation-step-${index}`}
                      className="pl-1"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

          {/* Technology Stack Recommendations */}
          {activeDetails.recommendedTechStack && (
            <div>
              <h3 className="text-lg font-medium mb-2">
                Recommended Technology Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(activeDetails.recommendedTechStack).map(
                  ([category, technologies], index) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="text-sm font-medium mb-1">{category}</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        {Array.isArray(technologies)
                          ? technologies.join(", ")
                          : String(technologies || "")}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default TechnicalDetailsWidget;
