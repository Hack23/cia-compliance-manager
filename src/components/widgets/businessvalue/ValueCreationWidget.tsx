import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { VALUE_CREATION_TEST_IDS } from "../../../constants/testIds";
import withSecurityLevelState from "../../../hoc/withSecurityLevelState";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { createBusinessImpactService } from "../../../services/businessImpactService";
import { createCIAContentService } from "../../../services/ciaContentService";
import { SecurityLevel } from "../../../types/cia";
import { calculateOverallSecurityLevel } from "../../../utils/securityLevelUtils";
import MetricsCard from "../../common/MetricsCard";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for ValueCreationWidget component
 */
interface ValueCreationWidgetProps {
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

  // Removed redundant securityLevel prop
}

/**
 * Value Creation Widget demonstrates business value of security investments
 *
 * ## Business Perspective
 *
 * This widget quantifies the business value and return on investment from
 * security controls, providing executives with financial justification for
 * security investments and demonstrating the risk reduction benefits. 💰
 */
const ValueCreationWidget: React.FC<ValueCreationWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-value-creation",
}) => {
  console.log("ValueCreationWidget rendering with levels:", {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  });

  // Calculate overall security level from individual components
  const securityLevel = useMemo(() => {
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Create services
  const ciaService = useMemo(() => createCIAContentService(), []);
  const ciaOptions = useCIAOptions(); // Add this line to get ciaOptions
  const businessImpactService = useMemo(() => {
    // Create a minimal data provider with required structure
    const dataProvider = {
      availabilityOptions: ciaOptions.availabilityOptions,
      integrityOptions: ciaOptions.integrityOptions,
      confidentialityOptions: ciaOptions.confidentialityOptions,
      roiEstimates: ciaOptions.ROI_ESTIMATES,
    };
    return createBusinessImpactService(dataProvider);
  }, [ciaOptions]);

  // Get ROI estimate
  const roiData = useMemo(() => {
    // Now we can use the calculated securityLevel
    return (
      ciaService.getROIEstimate?.(securityLevel) || {
        returnRate: "0%",
        value: "0%",
        description: "ROI information not available",
      }
    );
  }, [ciaService, securityLevel]);

  // Get value creation points
  const valuePoints = useMemo(() => {
    return ciaService.getValuePoints(securityLevel);
  }, [ciaService, securityLevel]);

  // Get business impact descriptions
  const availabilityBusinessImpact = useMemo(() => {
    return businessImpactService.getBusinessImpactDescription(
      "availability",
      availabilityLevel
    );
  }, [businessImpactService, availabilityLevel]);

  const integrityBusinessImpact = useMemo(() => {
    return businessImpactService.getBusinessImpactDescription(
      "integrity",
      integrityLevel
    );
  }, [businessImpactService, integrityLevel]);

  const confidentialityBusinessImpact = useMemo(() => {
    return businessImpactService.getBusinessImpactDescription(
      "confidentiality",
      confidentialityLevel
    );
  }, [businessImpactService, confidentialityLevel]);

  // Calculate estimated risk reduction percentage
  const riskReductionPercentage = useMemo(() => {
    const securityLevelMap = {
      None: 0,
      Low: 30,
      Moderate: 60,
      High: 85,
      "Very High": 95,
    };

    return `${securityLevelMap[securityLevel]}%`;
  }, [securityLevel]);

  // Calculate ROI
  const roi = useMemo(() => {
    // Implementation logic
    return "100-200%"; // Example value
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate risk reduction
  const riskReduction = useMemo(() => {
    // Implementation logic
    return "Up to 85%"; // Example value
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.VALUE_CREATION}
      icon={WIDGET_ICONS.VALUE_CREATION}
      className={className}
      testId={testId}
    >
      <div data-testid="value-creation-content">
        <p className="mb-4">
          This analysis demonstrates the business value and return on investment
          from implementing security controls at your selected security levels.
        </p>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Return on Investment</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
              <div className="text-sm font-medium mb-1">ROI Estimate</div>
              <div className="text-lg font-bold">{roi}</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
              <div className="text-sm font-medium mb-1">Risk Reduction</div>
              <div className="text-lg font-bold">{riskReduction}</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded border">
              <div className="text-sm font-medium mb-1">Security Level</div>
              <div className="text-lg font-bold">Moderate</div>
            </div>
          </div>
        </div>

        {/* ROI Section */}
        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-md">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">
            Return on Investment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricsCard
              title="ROI Estimate"
              value={roiData.value || "N/A"}
              testId="value-creation-widget-roi"
            />
            <MetricsCard
              title="Risk Reduction"
              value="Up to 85%"
              testId="value-creation-widget-risk"
            />
            <MetricsCard
              title="Security Level"
              value={securityLevel}
              testId="value-creation-widget-level"
            />
          </div>
        </div>

        {/* Business Impact Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">Business Impact</h3>
          <div className="space-y-3">
            <div className="p-2 rounded bg-sky-50 dark:bg-sky-950">
              <h4 className="font-medium text-blue-600 dark:text-blue-400">
                Availability Value
              </h4>
              <p
                className="text-sm"
                data-testid={VALUE_CREATION_TEST_IDS.AVAILABILITY_IMPACT}
              >
                {availabilityBusinessImpact}
              </p>
            </div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950">
              <h4 className="font-medium text-emerald-600 dark:text-emerald-400">
                Integrity Value
              </h4>
              <p
                className="text-sm"
                data-testid={VALUE_CREATION_TEST_IDS.INTEGRITY_IMPACT}
              >
                {integrityBusinessImpact}
              </p>
            </div>
            <div className="p-2 rounded bg-purple-50 dark:bg-purple-950">
              <h4 className="font-medium text-purple-600 dark:text-purple-400">
                Confidentiality Value
              </h4>
              <p
                className="text-sm"
                data-testid={VALUE_CREATION_TEST_IDS.CONFIDENTIALITY_IMPACT}
              >
                {confidentialityBusinessImpact}
              </p>
            </div>
          </div>
        </div>

        {/* Value Creation Points */}
        <div>
          <h3 className="text-lg font-medium mb-2">Key Value Points</h3>
          <ul
            className="list-disc list-inside space-y-2"
            data-testid={VALUE_CREATION_TEST_IDS.VALUE_POINTS}
          >
            {valuePoints.map((point, index) => (
              <li
                key={index}
                className="text-sm"
                data-testid={`${VALUE_CREATION_TEST_IDS.VALUE_POINT}-${index}`}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export with security level state management
export default withSecurityLevelState(ValueCreationWidget);
