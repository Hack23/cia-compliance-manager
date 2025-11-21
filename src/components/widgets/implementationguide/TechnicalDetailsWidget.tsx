import React, { useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useTechnicalDetailsData } from "../../../hooks/useTechnicalDetailsData";
import { SecurityLevel } from "../../../types/cia";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";
import { CIAComponentDetails } from "./CIAComponentDetails";

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
   * Optional test ID for testing
   */
  testId?: string;
}

/**
 * Widget that displays detailed technical implementation requirements
 *
 * ## Business Perspective
 *
 * This widget provides technical teams with specific implementation details
 * for achieving the selected security levels. It helps bridge the gap between
 * security requirements and technical implementation by providing concrete
 * guidance on controls, configurations, and technologies. 🛠️
 */
const TechnicalDetailsWidget: React.FC<TechnicalDetailsWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "technical-details-widget",
}) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<
    "confidentiality" | "integrity" | "availability"
  >("confidentiality");

  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Use custom hook for all data and helper functions
  const {
    confidentialityDetails,
    integrityDetails,
    availabilityDetails,
    getTechnicalDescription,
    getTechnicalRequirements,
    getTechnologies,
    getConfigurations,
    getExpertiseRequired,
  } = useTechnicalDetailsData(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    ciaContentService
  );

  return (
    <WidgetErrorBoundary widgetName="Technical Details">
      <WidgetContainer
        title={
          WIDGET_TITLES.TECHNICAL_DETAILS || "Technical Implementation Details"
        }
        icon={WIDGET_ICONS.TECHNICAL_DETAILS || "🛠️"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={error}
      >
      <div className="p-4">
        {/* Technical details description */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget provides technical implementation details for achieving
            your selected security levels. Use these guidelines when designing
            and implementing your security controls.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("confidentiality")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "confidentiality"
                ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="confidentiality-tab"
          >
            <span className="mr-1">🔒</span> Confidentiality
          </button>
          <button
            onClick={() => setActiveTab("integrity")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "integrity"
                ? "border-b-2 border-green-500 text-green-600 dark:text-green-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="integrity-tab"
          >
            <span className="mr-1">✓</span> Integrity
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "availability"
                ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
            data-testid="availability-tab"
          >
            <span className="mr-1">⏱️</span> Availability
          </button>
        </div>

        {/* Confidentiality details */}
        {activeTab === "confidentiality" && (
          <CIAComponentDetails
            component="confidentiality"
            level={confidentialityLevel}
            details={confidentialityDetails}
            ciaContentService={ciaContentService}
            testId={testId}
            getTechnicalDescription={getTechnicalDescription}
            getTechnicalRequirements={getTechnicalRequirements}
            getTechnologies={getTechnologies}
            getConfigurations={getConfigurations}
            getExpertiseRequired={getExpertiseRequired}
          />
        )}

        {/* Integrity details */}
        {activeTab === "integrity" && (
          <CIAComponentDetails
            component="integrity"
            level={integrityLevel}
            details={integrityDetails}
            ciaContentService={ciaContentService}
            testId={testId}
            getTechnicalDescription={getTechnicalDescription}
            getTechnicalRequirements={getTechnicalRequirements}
            getTechnologies={getTechnologies}
            getConfigurations={getConfigurations}
            getExpertiseRequired={getExpertiseRequired}
          />
        )}

        {/* Availability details */}
        {activeTab === "availability" && (
          <CIAComponentDetails
            component="availability"
            level={availabilityLevel}
            details={availabilityDetails}
            ciaContentService={ciaContentService}
            testId={testId}
            getTechnicalDescription={getTechnicalDescription}
            getTechnicalRequirements={getTechnicalRequirements}
            getTechnologies={getTechnologies}
            getConfigurations={getConfigurations}
            getExpertiseRequired={getExpertiseRequired}
          />
        )}

        {/* Implementation considerations */}
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <span className="mr-2">💡</span>Implementation Notes
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Implement these technical controls in a layered approach,
                starting with foundational controls.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Regular testing and validation are required to ensure controls
                are functioning as intended.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Consider integrating with existing security infrastructure to
                maximize effectiveness.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">•</span>
              <span>
                Document all implementation details and maintain up-to-date
                configuration records.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </WidgetContainer>
    </WidgetErrorBoundary>
  );
};

export default TechnicalDetailsWidget;
