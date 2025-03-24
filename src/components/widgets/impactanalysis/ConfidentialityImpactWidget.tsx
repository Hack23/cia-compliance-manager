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
  const effectiveLevel = level || confidentialityLevel;

  // Get component-specific details with proper error handling
  const details = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        throw new Error("Content service unavailable");
      }

      const componentDetails = ciaContentService.getComponentDetails?.(
        "confidentiality",
        effectiveLevel
      );

      if (isNullish(componentDetails)) {
        throw new Error("Unable to fetch confidentiality details");
      }

      return componentDetails;
    } catch (err) {
      console.error("Error fetching confidentiality details:", err);
      // Return default values instead of null to prevent UI errors
      return {
        description: "Details not available",
        technical: "Technical details not available",
        businessImpact: "Business impact details not available",
        recommendations: [],
        // Add confidentiality-specific properties with defaults
        encryptionMethod: "N/A",
        dataClassification: "N/A",
        accessControl: "N/A",
        authenticationMethod: "N/A",
        privacyImpact: "N/A",
        dataMinimization: "N/A",
        protectionMethod: "N/A",
      };
    }
  }, [ciaContentService, effectiveLevel]);

  const detailsAsAny = details as any;

  // Get business impact details with proper error handling
  const businessImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return null;
      }

      return ciaContentService.getBusinessImpact?.(
        "confidentiality",
        effectiveLevel
      );
    } catch (err) {
      console.error("Error fetching business impact details:", err);
      return null;
    }
  }, [ciaContentService, effectiveLevel]);

  // Get recommended controls with proper error handling
  const recommendations = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return [];
      }

      return (
        ciaContentService.getRecommendations?.(
          "confidentiality",
          effectiveLevel
        ) || []
      );
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      return [];
    }
  }, [ciaContentService, effectiveLevel]);

  // Calculate overall impact with the current confidentiality level
  const overallImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return effectiveLevel;
      }

      return (
        ciaContentService.calculateBusinessImpactLevel?.(
          availabilityLevel,
          integrityLevel,
          effectiveLevel
        ) || effectiveLevel
      );
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
    if (!details) return "No encryption requirements";

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (detailsAny.encryptionMethod !== "N/A") {
      return detailsAny.encryptionMethod;
    }

    // Fallback values based on level
    switch (effectiveLevel) {
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
  }, [details, effectiveLevel]);

  // Get access control requirements based on level
  const accessControl = useMemo(() => {
    if (!details) return "No access control requirements";

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (detailsAny.accessControl !== "N/A") {
      return detailsAny.accessControl;
    }

    // Fallback values based on level
    switch (effectiveLevel) {
      case "None":
        return "No specific access controls";
      case "Low":
        return "Basic authentication";
      case "Moderate":
        return "Role-based access control";
      case "High":
        return "Multi-factor authentication & fine-grained access control";
      case "Very High":
        return "Zero trust architecture & continuous authorization";
      default:
        return "Role-based access control";
    }
  }, [details, effectiveLevel]);

  // Get data classification requirements
  const dataClassification = useMemo(() => {
    if (!details) return "Unclassified";

    // Use type assertion to access the property
    const detailsAny = details as any;
    if (detailsAny.dataClassification !== "N/A") {
      return detailsAny.dataClassification;
    }

    // Fallback values based on level
    switch (effectiveLevel) {
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
  }, [details, effectiveLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.CONFIDENTIALITY_IMPACT}
      icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT}
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
              {details.description || "No description available"}
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
                  effectiveLevel === "None"
                    ? "No specific requirements"
                    : effectiveLevel === "Low"
                    ? "Password authentication"
                    : effectiveLevel === "Moderate"
                    ? "Strong password policy"
                    : effectiveLevel === "High"
                    ? "Multi-factor authentication"
                    : "Advanced MFA with biometrics"}
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
                  {(details as any)?.privacyImpact || effectiveLevel === "None"
                    ? "Minimal"
                    : effectiveLevel === "Low"
                    ? "Low"
                    : effectiveLevel === "Moderate"
                    ? "Moderate"
                    : effectiveLevel === "High"
                    ? "Significant"
                    : "Very High"}
                </div>
              </div>
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">
                  Data Minimization:
                </div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {(details as any)?.dataMinimization ||
                  effectiveLevel === "None"
                    ? "Not required"
                    : effectiveLevel === "Low"
                    ? "Basic"
                    : effectiveLevel === "Moderate"
                    ? "Standard"
                    : effectiveLevel === "High"
                    ? "Advanced"
                    : "Comprehensive"}
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

export default ConfidentialityImpactWidget;
