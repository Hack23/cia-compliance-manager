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
export interface AvailabilityImpactWidgetProps {
  // Use consistent naming pattern for levels
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  // Legacy support for older implementations
  level?: SecurityLevel;
  className?: string;
  testId?: string;
  onLevelChange?: (level: SecurityLevel) => void;
}

/**
 * Displays availability impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how availability security levels
 * affect business operations through metrics like uptime, recovery time, and
 * business impact. The visualization of these metrics supports better decision-making
 * about availability requirements and resilience investments. 📊
 */
const AvailabilityImpactWidget: React.FC<AvailabilityImpactWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  level, // For backward compatibility
  className = "",
  testId = "widget-availability-impact",
}) => {
  // Use the content service to get component details
  const { ciaContentService } = useCIAContentService();

  // Use the passed level or fallback to availabilityLevel for backward compatibility
  const effectiveLevel = level || availabilityLevel;
  
  // Get component-specific details
  const details = useMemo(() => {
    return ciaContentService.getComponentDetails("availability", effectiveLevel);
  }, [ciaContentService, effectiveLevel]);

  // Get business impact details
  const businessImpact = useMemo(() => {
    return ciaContentService.getBusinessImpact?.("availability", effectiveLevel) || null;
  }, [ciaContentService, effectiveLevel]);

  // Get recommended controls
  const recommendations = useMemo(() => {
    return (
      ciaContentService.getRecommendations?.("availability", effectiveLevel) ||
      details?.recommendations ||
      []
    );
  }, [ciaContentService, effectiveLevel, details]);

  // Calculate overall impact with the current availability level
  const overallImpact = useMemo(() => {
    return ciaContentService.calculateBusinessImpactLevel?.(
      effectiveLevel,
      integrityLevel,
      confidentialityLevel
    ) || effectiveLevel;
  }, [ciaContentService, effectiveLevel, integrityLevel, confidentialityLevel]);

  // If details aren't available, show an error state
  if (!details) {
    return (
      <WidgetContainer
        title={WIDGET_TITLES.AVAILABILITY_IMPACT}
        icon={WIDGET_ICONS.AVAILABILITY_IMPACT}
        className={className}
        testId={testId}
        error={new Error("Availability details not available")}
      >
        <div>Availability details not available</div>
      </WidgetContainer>
    );
  }

  // Calculate security score as a percentage (0-100)
  const securityScore = getSecurityLevelValue(effectiveLevel) * 25;

  // Render the widget with available details
  return (
    <WidgetContainer
      title={WIDGET_TITLES.AVAILABILITY_IMPACT}
      icon={WIDGET_ICONS.AVAILABILITY_IMPACT}
      className={`${className} overflow-visible`}
      testId={testId}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="availability-impact-heading"
        >
          {/* Replace custom badge with SecurityLevelBadge */}
          <div className="mb-4">
            <SecurityLevelBadge
              category="Availability"
              level={effectiveLevel}
              colorClass="bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20"
              textClass="text-blue-800 dark:text-blue-300"
              testId={`${testId}-availability-badge`}
            />
            
            {/* Add overall impact indicator when all levels are available */}
            {integrityLevel && confidentialityLevel && (
              <div className="mt-2 text-sm">
                <span className="font-medium">Overall Security Impact: </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {overallImpact}
                </span>
              </div>
            )}
            
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Security Score: </span>
              <span className="font-bold">{securityScore}%</span>
            </div>
          </div>

          {/* Impact Description */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">📝</span>Description
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {details.description || "No description available"}
            </p>
          </div>

          {/* Availability Metrics */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">📊</span>Availability Metrics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                  Uptime
                </div>
                <div className="text-lg font-bold">
                  {details.uptime || "N/A"}
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                  Recovery Time Objective
                </div>
                <div className="text-lg font-bold">{details.rto || "N/A"}</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                  Recovery Point Objective
                </div>
                <div className="text-lg font-bold">{details.rpo || "N/A"}</div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                <div className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                  Mean Time To Recover
                </div>
                <div className="text-lg font-bold">
                  {details.mttr || "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Business Impact */}
          {businessImpact && (
            <BusinessImpactSection 
              impact={businessImpact}
              color="blue"
              testId={`${testId}-business-impact`}
            />
          )}

          {/* Technical Implementation */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">🔧</span>Technical Implementation
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {details.technical || "No technical details available"}
            </p>
          </div>

          {/* Recommended Controls */}
          {recommendations && recommendations.length > 0 && (
            <div className="mb-4">
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
    </WidgetContainer>
  );
};

// Export the component wrapped with security level state management
export default withSecurityLevelState(AvailabilityImpactWidget);
