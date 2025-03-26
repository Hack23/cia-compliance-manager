import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { ComponentImpactBaseProps } from "../../../types/widgets";
import { getSecurityLevelValue } from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import SecurityRiskScore from "../../charts/SecurityRiskScore";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for the Confidentiality Impact Widget
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality settings
 * affect data protection, access controls, and privacy safeguards. 🔒
 */
export interface ConfidentialityImpactWidgetProps
  extends ComponentImpactBaseProps {
  // All required props are inherited from ComponentImpactBaseProps
}

/**
 * Displays confidentiality impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality security levels
 * affect business operations through metrics like data classification, access controls,
 * and encryption methods. The visualization of these metrics supports better decision-making
 * about data protection requirements and privacy investments. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  level, // For backward compatibility
  className = "",
  testId = "widget-confidentiality-impact",
  onLevelChange,
}) => {
  // Use the content service to get component details
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Use the passed level or fallback to confidentialityLevel for backward compatibility
  const effectiveLevel = level || confidentialityLevel || "Moderate";

  // Get component-specific details with proper error handling
  const details = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultConfidentialityDetails(effectiveLevel);
      }

      const componentDetails = ciaContentService.getComponentDetails?.(
        "confidentiality",
        effectiveLevel
      );

      if (isNullish(componentDetails)) {
        return getDefaultConfidentialityDetails(effectiveLevel);
      }

      return componentDetails;
    } catch (err) {
      console.error("Error fetching confidentiality details:", err);
      // Return default values instead of null to prevent UI errors
      return getDefaultConfidentialityDetails(effectiveLevel);
    }
  }, [ciaContentService, effectiveLevel]);

  // Get business impact details with proper error handling
  const businessImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultBusinessImpact(effectiveLevel);
      }

      const impact = ciaContentService.getBusinessImpact?.(
        "confidentiality",
        effectiveLevel
      );

      if (isNullish(impact)) {
        return getDefaultBusinessImpact(effectiveLevel);
      }

      return impact;
    } catch (err) {
      console.error("Error fetching business impact details:", err);
      return getDefaultBusinessImpact(effectiveLevel);
    }
  }, [ciaContentService, effectiveLevel]);

  // Get recommended controls with proper error handling
  const recommendations = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultRecommendations(effectiveLevel);
      }

      const recs = ciaContentService.getRecommendations?.(
        "confidentiality",
        effectiveLevel
      );

      if (isNullish(recs) || recs.length === 0) {
        return getDefaultRecommendations(effectiveLevel);
      }

      return recs;
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return getDefaultRecommendations(effectiveLevel);
    }
  }, [ciaContentService, effectiveLevel]);

  // Calculate overall impact with the current confidentiality level
  const overallImpact = useMemo(() => {
    try {
      if (
        isNullish(ciaContentService) ||
        isNullish(availabilityLevel) ||
        isNullish(integrityLevel)
      ) {
        return effectiveLevel;
      }

      const impact = ciaContentService.calculateBusinessImpactLevel?.(
        availabilityLevel,
        integrityLevel,
        effectiveLevel
      );

      if (isNullish(impact)) {
        return effectiveLevel;
      }

      return impact;
    } catch (err) {
      console.error("Error calculating overall impact:", err);
      return effectiveLevel;
    }
  }, [ciaContentService, availabilityLevel, integrityLevel, effectiveLevel]);

  // Calculate security score as a percentage (0-100)
  const securityScore = getSecurityLevelValue(effectiveLevel) * 25;

  // Handle level change if the callback exists
  const handleLevelChange = (newLevel: SecurityLevel) => {
    if (onLevelChange) {
      onLevelChange(newLevel);
    }
  };

  // Get encryption method based on level
  const encryptionMethod = useMemo(() => {
    if (isNullish(details)) return getDefaultEncryptionMethod(effectiveLevel);

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (detailsAny.encryptionMethod && detailsAny.encryptionMethod !== "N/A") {
      return detailsAny.encryptionMethod;
    }

    return getDefaultEncryptionMethod(effectiveLevel);
  }, [details, effectiveLevel]);

  // Get access control requirements based on level
  const accessControl = useMemo(() => {
    if (isNullish(details)) return getDefaultAccessControl(effectiveLevel);

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (detailsAny.accessControl && detailsAny.accessControl !== "N/A") {
      return detailsAny.accessControl;
    }

    return getDefaultAccessControl(effectiveLevel);
  }, [details, effectiveLevel]);

  // Get data classification requirements
  const dataClassification = useMemo(() => {
    if (isNullish(details)) return getDefaultDataClassification(effectiveLevel);

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (
      detailsAny.dataClassification &&
      detailsAny.dataClassification !== "N/A"
    ) {
      return detailsAny.dataClassification;
    }

    return getDefaultDataClassification(effectiveLevel);
  }, [details, effectiveLevel]);

  return (
    <WidgetContainer
      title={
        WIDGET_TITLES.CONFIDENTIALITY_IMPACT ||
        "Confidentiality Impact Analysis"
      }
      icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT || "🔒"}
      className={`${className} overflow-visible`}
      testId={testId}
      isLoading={isLoading}
      error={serviceError}
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
                <span className="text-purple-600 dark:text-purple-400 font-medium">
                  {overallImpact}
                </span>
              </div>
            )}

            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Security Score: </span>
              <span className="font-bold">{securityScore}%</span>
            </div>
          </div>

          {/* Confidentiality Security Score Visualization */}
          <div className="mb-6 flex items-center justify-center">
            <SecurityRiskScore
              score={securityScore}
              maxScore={100}
              label="Confidentiality Security"
              testId={`${testId}-security-score`}
            />
          </div>

          {/* Impact Description */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">📝</span>Description
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {details?.description || getDefaultDescription(effectiveLevel)}
            </p>
          </div>

          {/* Data Protection & Classification */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">📊</span>Data Protection
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                  Data Classification
                </div>
                <div className="text-lg font-bold">{dataClassification}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Level of data sensitivity
                </div>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                  Encryption Method
                </div>
                <div className="text-lg font-bold">{encryptionMethod}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Data encryption approach
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                  Access Control
                </div>
                <div className="text-lg font-bold">{accessControl}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Authorization approach
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">Authentication:</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {(details as any)?.authenticationMethod ||
                    getDefaultAuthenticationMethod(effectiveLevel)}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Impact */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">🔒</span>Privacy Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">Privacy Impact:</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {(details as any)?.privacyImpact ||
                    getDefaultPrivacyImpact(effectiveLevel)}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">
                  Data Minimization:
                </div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {(details as any)?.dataMinimization ||
                    getDefaultDataMinimization(effectiveLevel)}
                </div>
              </div>
            </div>
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
          <div className="mb-6">
            <h4 className="text-md font-medium mb-2 flex items-center">
              <span className="mr-2">🔧</span>Technical Implementation
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              {details?.technical || getDefaultTechnicalDetails(effectiveLevel)}
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

          {/* Level Selector (if onLevelChange is provided) */}
          {onLevelChange && (
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-md font-medium mb-2">
                Adjust Confidentiality Level
              </h4>
              <div className="flex items-center space-x-2">
                {["None", "Low", "Moderate", "High", "Very High"].map(
                  (secLevel) => (
                    <button
                      key={secLevel}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        effectiveLevel === secLevel
                          ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:bg-opacity-60 dark:text-purple-200"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                      }`}
                      onClick={() =>
                        handleLevelChange(secLevel as SecurityLevel)
                      }
                      data-testid={`${testId}-level-button-${secLevel.toLowerCase()}`}
                    >
                      {secLevel}
                    </button>
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

// Helper functions to provide default values based on security level
function getDefaultConfidentialityDetails(level: SecurityLevel) {
  return {
    description: getDefaultDescription(level),
    technical: getDefaultTechnicalDetails(level),
    businessImpact: "Impact details not available",
    recommendations: getDefaultRecommendations(level),
    encryptionMethod: getDefaultEncryptionMethod(level),
    dataClassification: getDefaultDataClassification(level),
    accessControl: getDefaultAccessControl(level),
    authenticationMethod: getDefaultAuthenticationMethod(level),
    privacyImpact: getDefaultPrivacyImpact(level),
    dataMinimization: getDefaultDataMinimization(level),
    protectionMethod: getDefaultProtectionMethod(level),
  };
}

function getDefaultDescription(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No confidentiality controls. Data is not protected from unauthorized disclosure.";
    case "Low":
      return "Basic confidentiality controls to protect against casual or inadvertent disclosure.";
    case "Moderate":
      return "Standard confidentiality controls to protect sensitive information from unauthorized disclosure.";
    case "High":
      return "Enhanced confidentiality controls to protect highly sensitive information from unauthorized disclosure with strong access controls.";
    case "Very High":
      return "Comprehensive confidentiality controls to protect critical information with strict access controls and advanced encryption.";
    default:
      return "Standard confidentiality controls to protect sensitive information.";
  }
}

function getDefaultTechnicalDetails(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No specific technical controls for confidentiality are implemented.";
    case "Low":
      return "Basic access controls and simple encryption for data at rest.";
    case "Moderate":
      return "Role-based access control, standard encryption for data at rest and in transit.";
    case "High":
      return "Fine-grained access control, strong encryption, data loss prevention controls.";
    case "Very High":
      return "Advanced encryption with hardware security modules, zero trust architecture, comprehensive DLP.";
    default:
      return "Standard confidentiality controls including encryption and access controls.";
  }
}

function getDefaultBusinessImpact(level: SecurityLevel) {
  return {
    summary: `${level} confidentiality provides ${
      level === "None"
        ? "no protection"
        : level === "Low"
        ? "minimal protection"
        : level === "Moderate"
        ? "adequate protection"
        : level === "High"
        ? "strong protection"
        : "extensive protection"
    } against unauthorized data disclosure.`,
    reputational: {
      description: `${
        level === "None"
          ? "High risk of data breaches leading to significant reputational damage."
          : level === "Low"
          ? "Moderate risk of data breaches that could affect reputation."
          : level === "Moderate"
          ? "Protected against common threats that could impact reputation."
          : level === "High"
          ? "Well protected against most threats that could damage reputation."
          : "Comprehensive protection against reputational risks from data breaches."
      }`,
      riskLevel:
        level === "None"
          ? "High Risk"
          : level === "Low"
          ? "Medium Risk"
          : "Low Risk",
    },
    regulatory: {
      description: `${
        level === "None"
          ? "Non-compliant with most data protection regulations."
          : level === "Low"
          ? "May not meet requirements for regulated data."
          : level === "Moderate"
          ? "Meets basic regulatory requirements for most data types."
          : level === "High"
          ? "Compliant with most regulatory frameworks for sensitive data."
          : "Exceeds regulatory requirements for highly sensitive data."
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

function getDefaultRecommendations(level: SecurityLevel): string[] {
  switch (level) {
    case "None":
      return [
        "Implement basic access controls",
        "Add encryption for sensitive data",
        "Develop a data classification policy",
        "Train staff on data handling procedures",
      ];
    case "Low":
      return [
        "Enhance access controls with role-based permissions",
        "Implement standard encryption for all sensitive data",
        "Develop formal data handling procedures",
        "Conduct regular security awareness training",
      ];
    case "Moderate":
      return [
        "Implement data loss prevention controls",
        "Use strong encryption for all sensitive data",
        "Enforce comprehensive access management",
        "Conduct regular security assessments",
      ];
    case "High":
      return [
        "Implement advanced data protection mechanisms",
        "Deploy multi-factor authentication for all sensitive access",
        "Conduct regular penetration testing of security controls",
        "Implement comprehensive data loss prevention",
      ];
    case "Very High":
      return [
        "Deploy hardware security modules for key management",
        "Implement zero trust architecture",
        "Use advanced encryption with proper key rotation",
        "Conduct frequent security validation of controls",
        "Implement rigorous access reviews and monitoring",
      ];
    default:
      return [
        "Implement appropriate access controls",
        "Use encryption for sensitive data",
        "Develop data handling procedures",
        "Conduct security awareness training",
      ];
  }
}

function getDefaultEncryptionMethod(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No encryption required";
    case "Low":
      return "Basic encryption (e.g., password protection)";
    case "Moderate":
      return "Standard encryption (e.g., AES-128)";
    case "High":
      return "Strong encryption (e.g., AES-256)";
    case "Very High":
      return "Multi-layered encryption with hardware security";
    default:
      return "Standard encryption";
  }
}

function getDefaultAccessControl(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No specific access controls";
    case "Low":
      return "Basic authentication";
    case "Moderate":
      return "Role-based access control";
    case "High":
      return "Fine-grained access control";
    case "Very High":
      return "Zero trust architecture";
    default:
      return "Role-based access control";
  }
}

function getDefaultDataClassification(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Public data";
    case "Low":
      return "Internal use only";
    case "Moderate":
      return "Sensitive";
    case "High":
      return "Confidential";
    case "Very High":
      return "Restricted";
    default:
      return "Sensitive";
  }
}

function getDefaultAuthenticationMethod(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "No specific requirements";
    case "Low":
      return "Password authentication";
    case "Moderate":
      return "Strong password policy";
    case "High":
      return "Multi-factor authentication";
    case "Very High":
      return "Advanced MFA with biometrics";
    default:
      return "Strong password policy";
  }
}

function getDefaultPrivacyImpact(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Minimal";
    case "Low":
      return "Low";
    case "Moderate":
      return "Moderate";
    case "High":
      return "Significant";
    case "Very High":
      return "Very High";
    default:
      return "Moderate";
  }
}

function getDefaultDataMinimization(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "Not required";
    case "Low":
      return "Basic";
    case "Moderate":
      return "Standard";
    case "High":
      return "Advanced";
    case "Very High":
      return "Comprehensive";
    default:
      return "Standard";
  }
}

function getDefaultProtectionMethod(level: SecurityLevel): string {
  switch (level) {
    case "None":
      return "None";
    case "Low":
      return "Basic controls";
    case "Moderate":
      return "Standard controls";
    case "High":
      return "Enhanced controls";
    case "Very High":
      return "Comprehensive controls";
    default:
      return "Standard controls";
  }
}

export default ConfidentialityImpactWidget;
