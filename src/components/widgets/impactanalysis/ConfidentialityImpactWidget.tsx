import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for the ConfidentialityImpactWidget
 */
export interface ConfidentialityImpactWidgetProps {
  /**
   * The selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * The selected availability level
   * (for combined impact analysis)
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected integrity level
   * (for combined impact analysis)
   */
  integrityLevel: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;

  /**
   * For legacy support
   */
  level?: SecurityLevel;

  /**
   * Optional level change handler
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

// Update the TechnicalImplementation type definition
interface TechnicalImplementationDetails {
  protectionMethod?: string;
  [key: string]: any;
}

/**
 * Displays confidentiality impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality levels
 * affect data protection and access controls, with visualizations of
 * business impacts and recommended controls. It supports decision-making
 * about data classification and protection mechanisms. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  confidentialityLevel,
  availabilityLevel,
  integrityLevel,
  level, // For backward compatibility
  className = "",
  testId = "widget-confidentiality-impact",
}) => {
  // Use the content service to get component details
  const { ciaContentService } = useCIAContentService();

  // Use the passed level or fallback to confidentialityLevel for backward compatibility
  const effectiveLevel = level || confidentialityLevel;

  // Get component-specific details
  const details = useMemo(() => {
    return ciaContentService.getComponentDetails(
      "confidentiality",
      effectiveLevel
    );
  }, [ciaContentService, effectiveLevel]);

  // Get business impact details
  const businessImpact = useMemo(() => {
    return (
      ciaContentService.getBusinessImpact?.(
        "confidentiality",
        effectiveLevel
      ) || null
    );
  }, [ciaContentService, effectiveLevel]);

  // Get technical implementation
  const technicalImplementation =
    useMemo<TechnicalImplementationDetails | null>(() => {
      return (
        ciaContentService.getTechnicalImplementation?.(
          "confidentiality",
          effectiveLevel
        ) || null
      );
    }, [ciaContentService, effectiveLevel]);

  // Get recommended controls
  const recommendations = useMemo(() => {
    return (
      ciaContentService.getRecommendations?.(
        "confidentiality",
        effectiveLevel
      ) ||
      details?.recommendations ||
      []
    );
  }, [ciaContentService, effectiveLevel, details]);

  // Calculate overall impact with the current confidentiality level
  const overallImpact = useMemo(() => {
    return (
      ciaContentService.calculateBusinessImpactLevel?.(
        availabilityLevel,
        integrityLevel,
        effectiveLevel
      ) || effectiveLevel
    );
  }, [ciaContentService, availabilityLevel, integrityLevel, effectiveLevel]);

  // If details aren't available, show an error state
  if (!details) {
    return (
      <WidgetContainer
        title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
        icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
        className={className}
        testId={testId}
        error={new Error("Confidentiality details not available")}
      >
        <div>Confidentiality details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
      icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
      className={`${className} overflow-visible`}
      testId={testId}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="confidentiality-impact-heading"
        >
          <div className="mb-4">
            <SecurityLevelBadge
              category="Confidentiality"
              level={effectiveLevel}
              colorClass="bg-purple-100 dark:bg-purple-900 dark:bg-opacity-20"
              textClass="text-purple-800 dark:text-purple-300"
              testId={`${testId}-confidentiality-badge`}
            />

            {/* Add overall impact indicator when all levels are available */}
            {availabilityLevel && integrityLevel && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Overall Security Impact: </span>
                <span
                  className={`text-purple-600 dark:text-purple-400 font-medium`}
                >
                  {overallImpact}
                </span>
              </div>
            )}

            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Security Score: </span>
              <span className="font-bold">
                {getSecurityLevelValue(effectiveLevel) * 25}%
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Impact Description */}
            <div>
              <h4 className="text-md font-medium mb-2 flex items-center">
                <span className="mr-2">📝</span>Description
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {details.description || "No description available"}
              </p>
            </div>

            {/* Business Impact */}
            {businessImpact && (
              <BusinessImpactSection
                impact={businessImpact}
                color="purple"
                testId={`${testId}-business-impact`}
              />
            )}

            {/* Technical Implementation */}
            <div>
              <h4 className="text-md font-medium mb-2 flex items-center">
                <span className="mr-2">🔧</span>Technical Implementation
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
                {details.technical || "No technical details available"}
              </p>

              {/* Protection method */}
              {technicalImplementation &&
                technicalImplementation.protectionMethod && (
                  <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg">
                    <h5 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-1">
                      Protection Method
                    </h5>
                    <p className="text-purple-700 dark:text-purple-400">
                      {technicalImplementation.protectionMethod}
                    </p>
                  </div>
                )}
            </div>

            {/* Recommended Controls */}
            {recommendations && recommendations.length > 0 && (
              <div>
                <h4 className="text-md font-medium mb-2 flex items-center">
                  <span className="mr-2">✅</span>Recommended Controls
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                  {recommendations.map((recommendation, index) => (
                    <li
                      key={`recommendation-${index}`}
                      data-testid={`recommendation-${index}`}
                    >
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default ConfidentialityImpactWidget;
