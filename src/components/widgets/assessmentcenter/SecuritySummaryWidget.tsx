import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import {
  calculateOverallSecurityLevel,
  getRiskLevelFromSecurityLevel,
  getSecurityLevelDescription,
  getSecurityLevelValue,
} from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for SecuritySummaryWidget component
 */
export interface SecuritySummaryWidgetProps {
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
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Tab options for the summary widget
 */
type SecuritySummaryTab =
  | "overview"
  | "business"
  | "implementation"
  | "compliance";

// Interface for business impact content to address TypeScript errors
interface BusinessImpactContent {
  description?: string;
  riskLevel?: string;
  // Add other potential properties that might be needed
  [key: string]: any;
}

// Interface for business impact by component
interface BusinessImpactByComponent {
  availability?: BusinessImpactContent;
  integrity?: BusinessImpactContent;
  confidentiality?: BusinessImpactContent;
  combined?: BusinessImpactContent;
}

// Interface for compliance status to use with proper typing
interface ComplianceStatusType {
  status?: string;
  complianceScore?: number;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks?: string[];
  remediationSteps?: string[];
  [key: string]: any;
}

/**
 * Displays a comprehensive summary of the security posture with key metrics
 *
 * ## Business Perspective
 *
 * This widget provides executives and security officers with an at-a-glance view
 * of the organization's security posture across the CIA triad. It highlights key
 * metrics, risk scores, and potential business value to support decision-making
 * and communicate security status effectively. 📊
 */
const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_SUMMARY_TEST_IDS.WIDGET,
}) => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<SecuritySummaryTab>("overview");

  // Get CIA content service for additional data
  const { ciaContentService, error, isLoading } = useCIAContentService();

  // Calculate overall security level
  const overallSecurityLevel = useMemo(
    () =>
      calculateOverallSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Get security level description for overall level
  const securityLevelDescription = useMemo(
    () => getSecurityLevelDescription(overallSecurityLevel),
    [overallSecurityLevel]
  );

  // Calculate security score (0-100) with improved calculation
  const securityScore = useMemo(() => {
    const availabilityValue = getSecurityLevelValue(availabilityLevel);
    const integrityValue = getSecurityLevelValue(integrityLevel);
    const confidentialityValue = getSecurityLevelValue(confidentialityLevel);

    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;
    const maxPossibleValue = 12; // 3 components x maximum value of 4
    return Math.round((totalValue / maxPossibleValue) * 100);
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Calculate risk level based on security score
  const riskLevel = useMemo(() => {
    if (securityScore >= 80) return "Low Risk";
    if (securityScore >= 60) return "Medium Risk";
    if (securityScore >= 40) return "High Risk";
    return "Critical Risk";
  }, [securityScore]);

  // Get security classification based on overall level
  const securityClassification = useMemo(() => {
    if (!isNullish(ciaContentService)) {
      try {
        // Use safe type checking with 'as any' to access potential methods
        if (
          typeof (ciaContentService as any).getSecurityClassification ===
          "function"
        ) {
          const classification = (
            ciaContentService as any
          ).getSecurityClassification(overallSecurityLevel);
          if (!isNullish(classification)) return classification;
        }
      } catch (err) {
        console.error("Error fetching security classification:", err);
      }
    }

    // Fallback to local classification
    switch (overallSecurityLevel) {
      case "None":
        return "Minimal Security";
      case "Low":
        return "Basic Security";
      case "Moderate":
        return "Standard Security";
      case "High":
        return "Enhanced Security";
      case "Very High":
        return "Maximum Security";
      default:
        return "Unknown Security Level";
    }
  }, [ciaContentService, overallSecurityLevel]);

  // Data protection classification based on confidentiality level
  const dataProtectionClass = useMemo(() => {
    if (
      !isNullish(ciaContentService) &&
      typeof ciaContentService.getInformationSensitivity === "function"
    ) {
      try {
        const sensitivity =
          ciaContentService.getInformationSensitivity(confidentialityLevel);
        if (!isNullish(sensitivity)) return sensitivity;
      } catch (err) {
        console.error("Error fetching information sensitivity:", err);
      }
    }

    // Fallback to local classification
    switch (confidentialityLevel) {
      case "None":
        return "Public Data";
      case "Low":
        return "Internal Data";
      case "Moderate":
        return "Confidential Data";
      case "High":
        return "Restricted Data";
      case "Very High":
        return "Classified Data";
      default:
        return "Unclassified Data";
    }
  }, [ciaContentService, confidentialityLevel]);

  // Get implementation complexity based on security levels
  const implementationComplexity = useMemo(() => {
    if (
      !isNullish(ciaContentService) &&
      typeof (ciaContentService as any).getImplementationComplexity ===
        "function"
    ) {
      try {
        const complexity = (
          ciaContentService as any
        ).getImplementationComplexity(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(complexity)) return complexity;
      } catch (err) {
        console.error("Error fetching implementation complexity:", err);
      }
    }

    // Fallback to local calculation
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    const availabilityValue = levelValues[availabilityLevel] || 0;
    const integrityValue = levelValues[integrityLevel] || 0;
    const confidentialityValue = levelValues[confidentialityLevel] || 0;

    const totalValue =
      availabilityValue + integrityValue + confidentialityValue;

    if (totalValue <= 3) return "Low";
    if (totalValue <= 6) return "Moderate";
    if (totalValue <= 9) return "High";
    return "Very High";
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Helper function to determine appropriate status variant
  const getStatusVariant = (level: string): StatusType => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === "none") return "error";
    if (normalizedLevel === "low") return "warning";
    if (normalizedLevel === "moderate") return "info";
    if (normalizedLevel === "high") return "success";
    if (normalizedLevel === "very high") return "purple";
    return "neutral";
  };

  // Business impact details from service with improved error handling and typing
  const businessImpact = useMemo((): BusinessImpactByComponent | null => {
    try {
      if (isNullish(ciaContentService)) return null;

      const impact: BusinessImpactByComponent = {};

      // Get availability business impact
      if (typeof ciaContentService.getBusinessImpact === "function") {
        impact.availability = ciaContentService.getBusinessImpact(
          "availability",
          availabilityLevel
        ) as BusinessImpactContent;

        impact.integrity = ciaContentService.getBusinessImpact(
          "integrity",
          integrityLevel
        ) as BusinessImpactContent;

        impact.confidentiality = ciaContentService.getBusinessImpact(
          "confidentiality",
          confidentialityLevel
        ) as BusinessImpactContent;
      }

      // Get combined business impact if method exists
      if (
        typeof (ciaContentService as any).getCombinedBusinessImpact ===
        "function"
      ) {
        impact.combined = (ciaContentService as any).getCombinedBusinessImpact(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        ) as BusinessImpactContent;
      }

      return impact;
    } catch (err) {
      console.error("Error fetching business impact data:", err);
      return null;
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Implementation details with improved error handling
  const implementationDetails = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) return null;

      return {
        availability: ciaContentService.getComponentDetails?.(
          "availability",
          availabilityLevel
        ),
        integrity: ciaContentService.getComponentDetails?.(
          "integrity",
          integrityLevel
        ),
        confidentiality: ciaContentService.getComponentDetails?.(
          "confidentiality",
          confidentialityLevel
        ),
        timeToImplement:
          typeof (ciaContentService as any).getImplementationTime === "function"
            ? (ciaContentService as any).getImplementationTime(
                availabilityLevel,
                integrityLevel,
                confidentialityLevel
              )
            : null,
        resources:
          typeof (ciaContentService as any).getRequiredResources === "function"
            ? (ciaContentService as any).getRequiredResources(
                availabilityLevel,
                integrityLevel,
                confidentialityLevel
              )
            : null,
      };
    } catch (err) {
      console.error("Error fetching implementation details:", err);
      return null;
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Compliance status information with improved error handling
  const complianceStatus = useMemo((): ComplianceStatusType | null => {
    try {
      if (isNullish(ciaContentService)) return null;

      if (
        typeof (ciaContentService as any).getComplianceStatus === "function"
      ) {
        const status = (ciaContentService as any).getComplianceStatus(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );

        // Ensure we have at least empty arrays if they're missing
        if (status) {
          return {
            ...status,
            compliantFrameworks: status.compliantFrameworks || [],
            partiallyCompliantFrameworks:
              status.partiallyCompliantFrameworks || [],
            nonCompliantFrameworks: status.nonCompliantFrameworks || [],
          };
        }
      }

      // Return default structure if we can't get it from the service
      return {
        status: "Unknown",
        complianceScore: 0,
        compliantFrameworks: [],
        partiallyCompliantFrameworks: [],
      };
    } catch (err) {
      console.error("Error fetching compliance status:", err);
      return null;
    }
  }, [
    ciaContentService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get the appropriate risk color class
  const getRiskColorClass = (risk: string): string => {
    if (risk.includes("Low")) return "text-green-600 dark:text-green-400";
    if (risk.includes("Medium")) return "text-yellow-600 dark:text-yellow-400";
    if (risk.includes("High")) return "text-orange-600 dark:text-orange-400";
    if (risk.includes("Critical")) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  // Calculate business maturity level based on the security score
  const businessMaturityLevel = useMemo(() => {
    if (securityScore >= 80) return "Strategic";
    if (securityScore >= 60) return "Advanced";
    if (securityScore >= 40) return "Standard";
    return "Basic";
  }, [securityScore]);

  // Get business maturity description
  const getBusinessMaturityDescription = useMemo(() => {
    switch (businessMaturityLevel) {
      case "Strategic":
        return "Enables competitive advantage and innovation";
      case "Advanced":
        return "Supports business growth and trusted partnerships";
      case "Standard":
        return "Maintains core business operations securely";
      case "Basic":
        return "Enables fundamental business activities";
      default:
        return "Unknown business maturity level";
    }
  }, [businessMaturityLevel]);

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={error}
    >
      <div className="p-4">
        {/* Security Classification Banner */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border-l-4 border-blue-500 dark:border-blue-400 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 pulse-dot"></span>
                {securityClassification}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {securityLevelDescription}
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Security Score
              </div>
              <div className="font-bold text-xl text-blue-600 dark:text-blue-400">
                {securityScore}%
              </div>
              <div
                className={`text-sm font-medium ${getRiskColorClass(
                  riskLevel
                )}`}
                data-testid={`${testId}-risk-level`}
              >
                {riskLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
          <nav
            className="flex flex-wrap -mb-px gap-2"
            aria-label="Security Summary Tabs"
          >
            {[
              { id: "overview", label: "Overview" },
              { id: "business", label: "Business Value" },
              { id: "implementation", label: "Implementation" },
              { id: "compliance", label: "Compliance" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id as SecuritySummaryTab)}
                data-testid={`${testId}-tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab - Simplified and focused on key metrics */}
          {activeTab === "overview" && (
            <div
              data-testid={`${testId}-content-overview`}
              className="space-y-4"
            >
              {/* Core Security Metrics - Clean, visual summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Security Components
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Confidentiality Card */}
                  <div
                    className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800"
                    data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2 text-purple-500 dark:text-purple-400">
                        🔒
                      </span>
                      <h4 className="font-medium text-purple-700 dark:text-purple-300">
                        Confidentiality
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <SecurityLevelIndicator level={confidentialityLevel} />
                      <StatusBadge
                        status={getStatusVariant(
                          getRiskLevelFromSecurityLevel(confidentialityLevel)
                        )}
                        size="sm"
                      >
                        {getRiskLevelFromSecurityLevel(confidentialityLevel)}
                      </StatusBadge>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Classification:{" "}
                      <span className="font-medium">{dataProtectionClass}</span>
                    </div>
                  </div>

                  {/* Integrity Card */}
                  <div
                    className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800"
                    data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2 text-green-500 dark:text-green-400">
                        ✓
                      </span>
                      <h4 className="font-medium text-green-700 dark:text-green-300">
                        Integrity
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <SecurityLevelIndicator level={integrityLevel} />
                      <StatusBadge
                        status={getStatusVariant(
                          getRiskLevelFromSecurityLevel(integrityLevel)
                        )}
                        size="sm"
                      >
                        {getRiskLevelFromSecurityLevel(integrityLevel)}
                      </StatusBadge>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Data Quality:{" "}
                      <span className="font-medium">
                        {implementationDetails?.integrity?.validationLevel ||
                          (integrityLevel === "None"
                            ? "Unverified"
                            : integrityLevel === "Low"
                            ? "Basic Validation"
                            : integrityLevel === "Moderate"
                            ? "Validated"
                            : integrityLevel === "High"
                            ? "Cryptographically Verified"
                            : "Immutable")}
                      </span>
                    </div>
                  </div>

                  {/* Availability Card */}
                  <div
                    className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800"
                    data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2 text-blue-500 dark:text-blue-400">
                        ⏱️
                      </span>
                      <h4 className="font-medium text-blue-700 dark:text-blue-300">
                        Availability
                      </h4>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <SecurityLevelIndicator level={availabilityLevel} />
                      <StatusBadge
                        status={getStatusVariant(
                          getRiskLevelFromSecurityLevel(availabilityLevel)
                        )}
                        size="sm"
                      >
                        {getRiskLevelFromSecurityLevel(availabilityLevel)}
                      </StatusBadge>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Uptime Target:{" "}
                      <span className="font-medium">
                        {implementationDetails?.availability?.uptime ||
                          (availabilityLevel === "None"
                            ? "No guarantee"
                            : availabilityLevel === "Low"
                            ? "~95%"
                            : availabilityLevel === "Moderate"
                            ? "~99%"
                            : availabilityLevel === "High"
                            ? "~99.9%"
                            : "~99.99%")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Complexity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Implementation Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Implementation Complexity
                    </div>
                    <div className="text-lg font-bold">
                      {implementationComplexity}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Based on combined security levels
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Security Profile
                    </div>
                    <div className="text-lg font-bold">
                      {availabilityLevel === integrityLevel &&
                      integrityLevel === confidentialityLevel
                        ? `${availabilityLevel} (Balanced)`
                        : "Mixed Levels"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {availabilityLevel === integrityLevel &&
                      integrityLevel === confidentialityLevel
                        ? "Uniform security across all components"
                        : "Varied security levels across components"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Value Tab */}
          {activeTab === "business" && (
            <div
              data-testid={`${testId}-content-business`}
              className="space-y-4"
            >
              {/* Business Value content */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
                <p className="text-sm">
                  This section shows the business impact and value of your
                  selected security levels across the CIA triad, highlighting
                  benefits and considerations for executives and stakeholders.
                </p>
              </div>

              {/* Business Impact Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Business Impact Summary
                </h3>

                {!businessImpact ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Business impact information is not available.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Combined impact summary if available */}
                    {businessImpact.combined && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm">
                          {businessImpact.combined.description ||
                            "The selected security levels provide appropriate protection for your business needs."}
                        </p>
                        {businessImpact.combined.riskLevel && (
                          <div className="mt-2">
                            <StatusBadge
                              status={getStatusVariant(
                                businessImpact.combined.riskLevel.split(
                                  " "
                                )[0] || "Neutral"
                              )}
                              size="sm"
                            >
                              {businessImpact.combined.riskLevel}
                            </StatusBadge>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Individual component impacts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Confidentiality impact */}
                      {businessImpact.confidentiality && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                          <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                            Confidentiality Impact
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {businessImpact.confidentiality.description ||
                              "Impact description not available"}
                          </p>
                          {businessImpact.confidentiality.riskLevel && (
                            <div className="mt-2">
                              <StatusBadge
                                status={getStatusVariant(
                                  businessImpact.confidentiality.riskLevel.split(
                                    " "
                                  )[0] || "Neutral"
                                )}
                                size="sm"
                              >
                                {businessImpact.confidentiality.riskLevel}
                              </StatusBadge>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Integrity impact */}
                      {businessImpact.integrity && (
                        <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800">
                          <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                            Integrity Impact
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {businessImpact.integrity.description ||
                              "Impact description not available"}
                          </p>
                          {businessImpact.integrity.riskLevel && (
                            <div className="mt-2">
                              <StatusBadge
                                status={getStatusVariant(
                                  businessImpact.integrity.riskLevel.split(
                                    " "
                                  )[0] || "Neutral"
                                )}
                                size="sm"
                              >
                                {businessImpact.integrity.riskLevel}
                              </StatusBadge>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Availability impact */}
                      {businessImpact.availability && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                            Availability Impact
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {businessImpact.availability.description ||
                              "Impact description not available"}
                          </p>
                          {businessImpact.availability.riskLevel && (
                            <div className="mt-2">
                              <StatusBadge
                                status={getStatusVariant(
                                  businessImpact.availability.riskLevel.split(
                                    " "
                                  )[0] || "Neutral"
                                )}
                                size="sm"
                              >
                                {businessImpact.availability.riskLevel}
                              </StatusBadge>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Business Value Metrics */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Business Value Metrics
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* ROI Estimation */}
                  <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-300">
                      Estimated ROI
                    </h4>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">
                      {securityScore >= 80
                        ? "300-500%"
                        : securityScore >= 60
                        ? "200-300%"
                        : securityScore >= 40
                        ? "150-200%"
                        : "50-100%"}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {securityScore >= 80
                        ? "Premium return through competitive advantage"
                        : securityScore >= 60
                        ? "Strong return through business enablement"
                        : securityScore >= 40
                        ? "Balanced return through operational improvements"
                        : "Basic return through risk reduction"}
                    </p>
                  </div>

                  {/* Business Enablement */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Business Enablement
                    </h4>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                      {businessMaturityLevel}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {getBusinessMaturityDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Implementation Tab */}
          {activeTab === "implementation" && (
            <div
              data-testid={`${testId}-content-implementation`}
              className="space-y-4"
            >
              {/* Implementation content */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
                <p className="text-sm">
                  This section provides an overview of implementation
                  considerations for your selected security levels across the
                  CIA triad.
                </p>
              </div>

              {/* Implementation Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Implementation Overview
                </h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-md font-medium">
                      Implementation Complexity:
                    </div>
                    <div className="font-medium">
                      {implementationComplexity}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        implementationComplexity === "Low"
                          ? "w-1/4 bg-green-500"
                          : implementationComplexity === "Moderate"
                          ? "w-2/4 bg-yellow-500"
                          : implementationComplexity === "High"
                          ? "w-3/4 bg-orange-500"
                          : "w-full bg-red-500"
                      }`}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {implementationComplexity === "Low"
                      ? "Basic security controls with straightforward implementation"
                      : implementationComplexity === "Moderate"
                      ? "Standard security measures with moderate implementation effort"
                      : implementationComplexity === "High"
                      ? "Advanced security controls requiring significant implementation effort"
                      : "Comprehensive security framework requiring extensive resources"}
                  </p>
                </div>

                {!implementationDetails ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Implementation details are not available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {/* Implementation time and resources */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Implementation Time */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                          Implementation Timeline
                        </h4>
                        <div className="text-lg font-bold">
                          {implementationDetails.timeToImplement ||
                            (implementationComplexity === "Low"
                              ? "1-3 months"
                              : implementationComplexity === "Moderate"
                              ? "3-6 months"
                              : implementationComplexity === "High"
                              ? "6-12 months"
                              : "12+ months")}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Estimated time for complete implementation
                        </p>
                      </div>

                      {/* Resource Requirements */}
                      <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h4 className="font-medium text-gray-800 dark:text-gray-100 mb-2">
                          Resource Requirements
                        </h4>
                        <div className="text-lg font-bold">
                          {implementationDetails.resources ||
                            (implementationComplexity === "Low"
                              ? "Minimal"
                              : implementationComplexity === "Moderate"
                              ? "Standard"
                              : implementationComplexity === "High"
                              ? "Significant"
                              : "Extensive")}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Personnel, budget, and equipment needs
                        </p>
                      </div>
                    </div>

                    {/* Component implementation details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {/* Confidentiality Implementation */}
                      {implementationDetails.confidentiality && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                          <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                            Confidentiality Implementation
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {implementationDetails.confidentiality.technical ||
                              "No technical implementation details available"}
                          </p>
                        </div>
                      )}

                      {/* Integrity Implementation */}
                      {implementationDetails.integrity && (
                        <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800">
                          <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                            Integrity Implementation
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {implementationDetails.integrity.technical ||
                              "No technical implementation details available"}
                          </p>
                        </div>
                      )}

                      {/* Availability Implementation */}
                      {implementationDetails.availability && (
                        <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                            Availability Implementation
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {implementationDetails.availability.technical ||
                              "No technical implementation details available"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Implementation Considerations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Implementation Considerations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-300">
                      Resource Requirements
                    </h4>
                    <p className="mt-2 text-sm">
                      {implementationComplexity === "Low"
                        ? "Minimal resources required. Can be implemented with existing team."
                        : implementationComplexity === "Moderate"
                        ? "Moderate resources required. May need additional expertise."
                        : implementationComplexity === "High"
                        ? "Significant resources required. Dedicated team recommended."
                        : "Extensive resources required. Specialized team essential."}
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Implementation Timeline
                    </h4>
                    <p className="mt-2 text-sm">
                      {implementationComplexity === "Low"
                        ? "Short timeline: 1-3 months for complete implementation."
                        : implementationComplexity === "Moderate"
                        ? "Medium timeline: 3-6 months for complete implementation."
                        : implementationComplexity === "High"
                        ? "Extended timeline: 6-12 months for complete implementation."
                        : "Long-term project: 12+ months for complete implementation."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === "compliance" && (
            <div
              data-testid={`${testId}-content-compliance`}
              className="space-y-4"
            >
              {/* Compliance content */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
                <p className="text-sm">
                  This section shows how your security selections align with
                  common regulatory frameworks and compliance requirements.
                </p>
              </div>

              {/* Compliance Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Compliance Status
                </h3>

                {!complianceStatus ? (
                  <div className="text-center py-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      Compliance status information is not available.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-medium mb-1">
                          Overall Compliance
                        </div>
                        <div className="text-sm">
                          {complianceStatus.status || "Status not available"}
                        </div>
                      </div>
                      <div>
                        <StatusBadge
                          status={
                            (complianceStatus.complianceScore ?? 0) >= 80
                              ? "success"
                              : (complianceStatus.complianceScore ?? 0) >= 50
                              ? "warning"
                              : "error"
                          }
                          size="md"
                        >
                          {complianceStatus.complianceScore || 0}% Compliant
                        </StatusBadge>
                      </div>
                    </div>

                    {/* Compliance gauge */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                      <div
                        className={`h-2.5 rounded-full bg-${
                          (complianceStatus.complianceScore ?? 0) >= 80
                            ? "green"
                            : (complianceStatus.complianceScore ?? 0) >= 50
                            ? "yellow"
                            : "red"
                        }-500`}
                        style={{
                          width: `${complianceStatus.complianceScore || 0}%`,
                        }}
                      ></div>
                    </div>

                    {/* Frameworks */}
                    {complianceStatus.compliantFrameworks &&
                      complianceStatus.compliantFrameworks.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-md font-medium mb-2">
                            Compliant Frameworks
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {complianceStatus.compliantFrameworks.map(
                              (framework: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-300 rounded text-xs"
                                >
                                  {framework}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Partial frameworks */}
                    {complianceStatus.partiallyCompliantFrameworks &&
                      complianceStatus.partiallyCompliantFrameworks.length >
                        0 && (
                        <div className="mb-4">
                          <h4 className="text-md font-medium mb-2">
                            Partially Compliant Frameworks
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {complianceStatus.partiallyCompliantFrameworks.map(
                              (framework: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-300 rounded text-xs"
                                >
                                  {framework}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>

              {/* Component Compliance Requirements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Component Compliance Requirements
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm">
                      Component compliance information is{" "}
                      {complianceStatus ? "available" : "not available"} based
                      on your selected security levels.
                    </p>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Confidentiality compliance */}
                      <div className="p-2 border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
                        <h5 className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                          Confidentiality
                        </h5>
                        <p className="text-xs">
                          {confidentialityLevel === "None"
                            ? "Does not meet basic compliance requirements"
                            : confidentialityLevel === "Low"
                            ? "Meets minimal compliance requirements"
                            : confidentialityLevel === "Moderate"
                            ? "Meets standard compliance requirements"
                            : confidentialityLevel === "High"
                            ? "Meets strict compliance requirements"
                            : "Exceeds most compliance requirements"}
                        </p>
                      </div>

                      {/* Integrity compliance */}
                      <div className="p-2 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
                        <h5 className="text-sm font-medium mb-1 text-green-700 dark:text-green-300">
                          Integrity
                        </h5>
                        <p className="text-xs">
                          {integrityLevel === "None"
                            ? "Does not meet basic compliance requirements"
                            : integrityLevel === "Low"
                            ? "Meets minimal compliance requirements"
                            : integrityLevel === "Moderate"
                            ? "Meets standard compliance requirements"
                            : integrityLevel === "High"
                            ? "Meets strict compliance requirements"
                            : "Exceeds most compliance requirements"}
                        </p>
                      </div>

                      {/* Availability compliance */}
                      <div className="p-2 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
                        <h5 className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                          Availability
                        </h5>
                        <p className="text-xs">
                          {availabilityLevel === "None"
                            ? "Does not meet basic compliance requirements"
                            : availabilityLevel === "Low"
                            ? "Meets minimal compliance requirements"
                            : availabilityLevel === "Moderate"
                            ? "Meets standard compliance requirements"
                            : availabilityLevel === "High"
                            ? "Meets strict compliance requirements"
                            : "Exceeds most compliance requirements"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
