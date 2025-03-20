import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../constants/appConstants";
import withSecurityLevelState from '../../hoc/withSecurityLevelState';
import { useCIAContentService } from "../../hooks/useCIAContentService";
import { SecurityLevel } from "../../types/cia";
import { getSecurityLevelValue } from "../../utils/securityLevelUtils";
import BusinessImpactSection from "../common/BusinessImpactSection";
import SecurityLevelBadge from "../common/SecurityLevelBadge";
import WidgetContainer from "../common/WidgetContainer";

// Define component props
export interface IntegrityImpactWidgetProps {
  /**
   * The selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * The selected availability level
   * (for combined impact analysis)
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected confidentiality level
   * (for combined impact analysis)
   */
  confidentialityLevel: SecurityLevel;

  /**
   * For legacy support
   */
  level?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;
  
  /**
   * Optional level change handler
   */
  onLevelChange?: (level: SecurityLevel) => void;
}

// Add the interface for technical implementation
interface TechnicalImplementationDetails {
  validationMethod?: string;
  [key: string]: any;
}

/**
 * Displays integrity impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how integrity security levels
 * affect data validation and protection against unauthorized changes.
 * It provides clear explanations of the business impacts and technical
 * implementations for different integrity levels. 🔒
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  integrityLevel,
  availabilityLevel,
  confidentialityLevel,
  level, // For backward compatibility
  className = "",
  testId = "widget-integrity-impact",
}) => {
  // Use the content service to get component details
  const { ciaContentService } = useCIAContentService();

  // Use the passed level or fallback to integrityLevel for backward compatibility
  const effectiveLevel = level || integrityLevel;
  
  // Get component-specific details
  const details = useMemo(() => {
    return ciaContentService.getComponentDetails("integrity", effectiveLevel);
  }, [ciaContentService, effectiveLevel]);

  // Get business impact details
  const businessImpact = useMemo(() => {
    return ciaContentService.getBusinessImpact?.("integrity", effectiveLevel) || null;
  }, [ciaContentService, effectiveLevel]);

  // Get technical implementation
  const technicalImplementation = useMemo<TechnicalImplementationDetails | null>(() => {
    return ciaContentService.getTechnicalImplementation?.("integrity", effectiveLevel) || null;
  }, [ciaContentService, effectiveLevel]);

  // Get recommended controls
  const recommendations = useMemo(() => {
    return (
      ciaContentService.getRecommendations?.("integrity", effectiveLevel) ||
      details?.recommendations ||
      []
    );
  }, [ciaContentService, effectiveLevel, details]);

  // Calculate overall impact with the current integrity level
  const overallImpact = useMemo(() => {
    return ciaContentService.calculateBusinessImpactLevel?.(
      availabilityLevel,
      effectiveLevel,
      confidentialityLevel
    ) || effectiveLevel;
  }, [ciaContentService, availabilityLevel, effectiveLevel, confidentialityLevel]);

  // If details aren't available, show an error state
  if (!details) {
    return (
      <WidgetContainer
        title={WIDGET_TITLES.INTEGRITY_IMPACT}
        icon={WIDGET_ICONS.INTEGRITY_IMPACT}
        className={className}
        testId={testId}
        error={new Error("Integrity details not available")}
      >
        <div>Integrity details not available</div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title={WIDGET_TITLES.INTEGRITY_IMPACT}
      icon={WIDGET_ICONS.INTEGRITY_IMPACT}
      className={`${className} overflow-visible`}
      testId={testId}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="integrity-impact-heading"
        >
          <div className="mb-4">
            <SecurityLevelBadge
              category="Integrity"
              level={effectiveLevel}
              colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
              textClass="text-green-800 dark:text-green-300"
              testId={`${testId}-integrity-badge`}
            />
            
            {/* Add overall impact indicator when all levels are available */}
            {availabilityLevel && confidentialityLevel && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Overall Security Impact: </span>
                <span className={`text-green-600 dark:text-green-400 font-medium`}>
                  {overallImpact}
                </span>
              </div>
            )}
            
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Security Score: </span>
              <span className="font-bold">{getSecurityLevelValue(effectiveLevel) * 25}%</span>
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
                color="green"
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
              
              {/* Validation method */}
              {technicalImplementation && technicalImplementation.validationMethod && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                  <h5 className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">
                    Validation Method
                  </h5>
                  <p className="text-green-700 dark:text-green-400">
                    {technicalImplementation.validationMethod}
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

// Export the component wrapped with security level state management
export default withSecurityLevelState(IntegrityImpactWidget);
