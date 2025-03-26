import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { getRiskLevelFromSecurityLevel } from "../../../utils/riskUtils";
import { isNullish } from "../../../utils/typeGuards";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Base props shared by all CIA component impact widgets
 */
interface ComponentImpactBaseProps {
  /**
   * Security level to display impact for
   */
  level: SecurityLevel;

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
 * Props for IntegrityImpactWidget component
 */
export interface IntegrityImpactWidgetProps extends ComponentImpactBaseProps {
  /**
   * Flag to show extended details (optional)
   */
  showExtendedDetails?: boolean;
}

/**
 * Widget that displays the impact of selected integrity level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand the business impact of
 * integrity controls, including how data accuracy and validation
 * mechanisms protect business operations and decision-making. 📊
 */
const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  level,
  className = "",
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
  showExtendedDetails = false,
}) => {
  // Get CIA content service
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Calculate risk level based on security level
  const riskLevel = useMemo(
    () => getRiskLevelFromSecurityLevel(level),
    [level]
  );

  // Get integrity details from service if available
  const integrityDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultIntegrityDetails(level);
      }

      // Safely check if the method exists before calling it
      // Using type assertion with unknown first for better type safety
      const service = ciaContentService as unknown as {
        getIntegrityDetails?: (level: SecurityLevel) => any;
        getComponentDetails?: (component: string, level: SecurityLevel) => any;
      };

      if (typeof service.getIntegrityDetails === "function") {
        const details = service.getIntegrityDetails(level);
        return isNullish(details) ? getDefaultIntegrityDetails(level) : details;
      }

      if (typeof service.getComponentDetails === "function") {
        const details = service.getComponentDetails("integrity", level);
        return isNullish(details) ? getDefaultIntegrityDetails(level) : details;
      }

      return getDefaultIntegrityDetails(level);
    } catch (err) {
      console.error("Error getting integrity details:", err);
      return getDefaultIntegrityDetails(level);
    }
  }, [ciaContentService, level]);

  // Get business impact data from service if available
  const businessImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultBusinessImpact(level);
      }

      if (typeof ciaContentService.getBusinessImpact === "function") {
        const impact = ciaContentService.getBusinessImpact("integrity", level);
        return isNullish(impact) ? getDefaultBusinessImpact(level) : impact;
      }

      return getDefaultBusinessImpact(level);
    } catch (err) {
      console.error("Error getting integrity business impact:", err);
      return getDefaultBusinessImpact(level);
    }
  }, [ciaContentService, level]);

  // Get recommendations for integrity level
  const recommendations = useMemo(() => {
    try {
      if (
        isNullish(ciaContentService) ||
        isNullish(integrityDetails) ||
        isNullish(integrityDetails.recommendations)
      ) {
        return getDefaultRecommendations(level);
      }

      return integrityDetails.recommendations;
    } catch (err) {
      console.error("Error getting recommendations:", err);
      return getDefaultRecommendations(level);
    }
  }, [ciaContentService, integrityDetails, level]);

  // Format risk description
  const formatBusinessRisk = (risk: string, component: string): string => {
    const riskDescriptions: Record<string, string> = {
      "Critical Risk": `Critical risk to ${component} means data may be completely unusable or unreliable, potentially causing severe business impact.`,
      "High Risk": `High risk to ${component} means data accuracy is significantly compromised, likely leading to harmful business decisions.`,
      "Medium Risk": `Medium risk to ${component} means some data validation controls are in place, but gaps may allow errors to occur occasionally.`,
      "Low Risk": `Low risk to ${component} means good data validation controls are in place, with occasional minor errors possible.`,
      "Minimal Risk": `Minimal risk to ${component} means comprehensive data validation and protection mechanisms are in place.`,
    };

    return (
      riskDescriptions[risk] || `Unknown risk level for ${component} integrity.`
    );
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.INTEGRITY_IMPACT || "Integrity Impact Analysis"}
      icon={WIDGET_ICONS.INTEGRITY_IMPACT || "✓"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Integrity impact summary */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget analyzes the business impact of your chosen integrity
            level, including data accuracy requirements, validation controls,
            and potential consequences of data corruption.
          </p>
        </div>

        {/* Security level indicator */}
        <div className="mb-4">
          <SecurityLevelBadge
            category="Integrity"
            level={level}
            colorClass="bg-green-100 dark:bg-green-900 dark:bg-opacity-20"
            textClass="text-green-800 dark:text-green-300"
            testId={`${testId}-integrity-badge`}
          />
        </div>

        {/* Integrity risk level */}
        <div
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={`${testId}-risk-level`}
        >
          <h3 className="text-lg font-medium mb-2">Risk Assessment</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Risk Level:
            </span>
            <span
              className={`${
                riskLevel.includes("Critical") || riskLevel.includes("High")
                  ? "text-red-600 dark:text-red-400"
                  : riskLevel.includes("Medium")
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-green-600 dark:text-green-400"
              } font-medium`}
            >
              {riskLevel}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {formatBusinessRisk(riskLevel, "integrity")}
          </div>
        </div>

        {/* Technical Details */}
        <div
          className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          data-testid={`${testId}-description`}
        >
          <h3 className="text-lg font-medium mb-2">Technical Description</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {integrityDetails?.description || getDefaultDescription(level)}
          </p>
        </div>

        {/* Data Integrity metrics */}
        <div
          className="mb-4 p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
          data-testid={`${testId}-metrics`}
        >
          <h3 className="text-lg font-medium mb-2 text-green-800 dark:text-green-300">
            Data Integrity Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Data Validation Controls:
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {(integrityDetails as any)?.validationLevel ||
                  getDefaultValidationLevel(level)}
              </div>
            </div>
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-sm font-medium mb-1">
                Acceptable Error Rate:
              </div>
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {(integrityDetails as any)?.errorRate ||
                  getDefaultErrorRate(level)}
              </div>
            </div>
          </div>
        </div>

        {/* Additional metrics */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">🔍</span>
              Validation Methods
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-sm font-medium mb-1">
                  Validation Method:
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {(integrityDetails as any)?.validationMethod ||
                    getDefaultValidationMethod(level)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  Data Quality Checks:
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {(integrityDetails as any)?.dataQualityChecks ||
                    getDefaultDataQualityChecks(level)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">🛡️</span>
              Protection Mechanisms
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <div>
                <div className="text-sm font-medium mb-1">
                  Change Detection:
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {(integrityDetails as any)?.changeDetection ||
                    getDefaultChangeDetection(level)}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  Digital Signatures:
                </div>
                <div className="text-green-600 dark:text-green-400">
                  {(integrityDetails as any)?.digitalSignatures ||
                    getDefaultDigitalSignatures(level)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business impact */}
        <div className="mt-4" data-testid={`${testId}-business-impact`}>
          {businessImpact && (
            <BusinessImpactSection
              impact={businessImpact}
              color="green"
              testId={`${testId}-business-impact`}
            />
          )}
        </div>

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div
            className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={`${testId}-recommendations`}
          >
            <h3 className="text-lg font-medium mb-2">Recommendations</h3>
            <ul className="space-y-2 text-sm">
              {recommendations.map((recommendation: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start"
                  data-testid={`${testId}-recommendation-${index}`}
                >
                  <span className="mr-2 text-green-500">✓</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
};

// Default details to use when service data is not available
function getDefaultIntegrityDetails(level: SecurityLevel) {
  return {
    description: getDefaultDescription(level),
    technical: getDefaultTechnicalDetails(level),
    businessImpact: "Default business impact description",
    recommendations: getDefaultRecommendations(level),
    validationLevel: getDefaultValidationLevel(level),
    errorRate: getDefaultErrorRate(level),
    validationMethod: getDefaultValidationMethod(level),
    dataQualityChecks: getDefaultDataQualityChecks(level),
    changeDetection: getDefaultChangeDetection(level),
    digitalSignatures: getDefaultDigitalSignatures(level),
  };
}

// Default description based on security level
function getDefaultDescription(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No integrity controls implemented. Data can be modified without detection, potentially leading to incorrect information being used in business processes.";
    case "Low":
      return "Basic integrity controls implemented. Some validation of data inputs, but limited protections against unauthorized modifications.";
    case "Moderate":
      return "Standard integrity controls implemented. Data validation for most inputs and some detection capabilities for unauthorized modifications.";
    case "High":
      return "Enhanced integrity controls implemented. Comprehensive data validation and robust controls to detect and prevent unauthorized modifications.";
    case "Very High":
      return "Comprehensive integrity controls implemented. Advanced validation mechanisms, cryptographic protections, and extensive monitoring for data corruption or tampering.";
    default:
      return "Standard integrity controls to validate data inputs and detect modifications.";
  }
}

// Default technical details based on security level
function getDefaultTechnicalDetails(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No specific technical controls for maintaining data integrity are implemented.";
    case "Low":
      return "Basic input validation and database constraints to prevent simple errors.";
    case "Moderate":
      return "Input validation, database constraints, and checksums to detect modifications.";
    case "High":
      return "Comprehensive input validation, digital signatures, access controls, and audit logging.";
    case "Very High":
      return "Advanced cryptographic techniques including digital signatures, hash verification, blockchain for critical data, and real-time monitoring.";
    default:
      return "Standard integrity controls including input validation and change detection.";
  }
}

// Default business impact based on security level
function getDefaultBusinessImpact(level: SecurityLevel) {
  return {
    summary: `${level} integrity provides ${
      level === "None"
        ? "no protection"
        : level === "Low"
        ? "minimal protection"
        : level === "Moderate"
        ? "adequate protection"
        : level === "High"
        ? "strong protection"
        : "comprehensive protection"
    } against data corruption and unauthorized modifications.`,
    operational: {
      description: `${
        level === "None"
          ? "High risk of operational disruptions due to data corruption."
          : level === "Low"
          ? "Significant risk of operational issues from corrupted data."
          : level === "Moderate"
          ? "Moderate risk of operational impact from data integrity issues."
          : level === "High"
          ? "Low risk of operational impact from data integrity issues."
          : "Minimal risk of operational impact from data integrity issues."
      }`,
      riskLevel:
        level === "None"
          ? "High Risk"
          : level === "Low"
          ? "Medium Risk"
          : "Low Risk",
    },
    financial: {
      description: `${
        level === "None"
          ? "High risk of financial losses due to decisions based on incorrect data."
          : level === "Low"
          ? "Significant risk of financial impact from data integrity issues."
          : level === "Moderate"
          ? "Moderate risk of financial impact from data integrity issues."
          : level === "High"
          ? "Low risk of financial impact from data integrity issues."
          : "Minimal risk of financial impact from data integrity issues."
      }`,
      riskLevel:
        level === "None"
          ? "High Risk"
          : level === "Low"
          ? "Medium Risk"
          : "Low Risk",
    },
  };
}

// Default recommendations based on security level
function getDefaultRecommendations(level: SecurityLevel): string[] {
  switch (level) {
    case "None":
      return [
        "Implement basic input validation",
        "Add database constraints",
        "Establish data quality standards",
        "Implement basic access controls",
      ];
    case "Low":
      return [
        "Enhance input validation with more comprehensive rules",
        "Implement checksums for critical data",
        "Add basic change detection mechanisms",
        "Develop data quality management processes",
      ];
    case "Moderate":
      return [
        "Implement comprehensive data validation framework",
        "Use digital signatures for critical records",
        "Deploy change detection and alerting",
        "Establish data quality monitoring",
      ];
    case "High":
      return [
        "Implement cryptographic protection for data integrity",
        "Deploy advanced data validation with business rule engines",
        "Establish comprehensive audit logging and monitoring",
        "Implement automated data quality controls",
      ];
    case "Very High":
      return [
        "Deploy blockchain or similar technology for critical data",
        "Implement hardware-based integrity controls",
        "Use advanced cryptographic techniques for all data",
        "Establish real-time integrity monitoring and alerts",
        "Implement automated recovery mechanisms",
      ];
    default:
      return [
        "Implement appropriate data validation controls",
        "Establish data quality monitoring",
        "Use cryptographic techniques for critical data",
        "Develop comprehensive data integrity policies",
      ];
  }
}

// Default validation level based on security level
function getDefaultValidationLevel(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Minimal";
    case "Low":
      return "Basic";
    case "Moderate":
      return "Standard";
    case "High":
      return "Comprehensive";
    case "Very High":
      return "Exhaustive";
    default:
      return "Standard";
  }
}

// Default error rate based on security level
function getDefaultErrorRate(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Not measured";
    case "Low":
      return "< 5%";
    case "Moderate":
      return "< 1%";
    case "High":
      return "< 0.1%";
    case "Very High":
      return "< 0.01%";
    default:
      return "< 1%";
  }
}

// Default validation method based on security level
function getDefaultValidationMethod(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No formal validation";
    case "Low":
      return "Basic format validation";
    case "Moderate":
      return "Format and reference validation";
    case "High":
      return "Comprehensive validation with business rules";
    case "Very High":
      return "Multi-layer validation with AI/ML assistance";
    default:
      return "Format and reference validation";
  }
}

// Default data quality checks based on security level
function getDefaultDataQualityChecks(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "None";
    case "Low":
      return "Manual spot checks";
    case "Moderate":
      return "Regular sampling and review";
    case "High":
      return "Automated quality monitoring";
    case "Very High":
      return "Real-time quality assurance";
    default:
      return "Regular sampling and review";
  }
}

// Default change detection based on security level
function getDefaultChangeDetection(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "None";
    case "Low":
      return "Basic logging";
    case "Moderate":
      return "Change logging and alerting";
    case "High":
      return "Checksums and digital signatures";
    case "Very High":
      return "Cryptographic verification";
    default:
      return "Change logging and alerting";
  }
}

// Default digital signatures based on security level
function getDefaultDigitalSignatures(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Not used";
    case "Low":
      return "Limited use";
    case "Moderate":
      return "Used for critical data";
    case "High":
      return "Used for most data";
    case "Very High":
      return "Used for all data";
    default:
      return "Used for critical data";
  }
}

export default IntegrityImpactWidget;
