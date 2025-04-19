import React, { useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { useSecurityMetricsService } from "../../../hooks/useSecurityMetricsService";
import { SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import {
  calculateImplementationCost,
  calculateOperationalCost,
  calculateROIEstimate,
} from "../../../utils/businessValueUtils";
import {
  calculateOverallSecurityLevel,
  getRiskLevelFromSecurityLevel,
  getSecurityLevelDescription,
  getSecurityLevelValue,
} from "../../../utils/securityLevelUtils";
import { isNullish } from "../../../utils/typeGuards";
import RadarChart from "../../charts/RadarChart";
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

// Interface for business impact content
interface BusinessValueContent {
  description?: string;
  riskLevel?: string;
  value?: string;
  [key: string]: any;
}

// Interface for compliance status
interface ComplianceStatusType {
  status?: string;
  complianceScore?: number;
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks?: string[];
  remediationSteps?: string[];
  [key: string]: any;
}

// Interface for implementation details
interface ImplementationDetails {
  complexity: string;
  timeToImplement: string;
  resources: string;
  personnelNeeds: string;
  technologies?: string[];
  [key: string]: any;
}

/**
 * Displays a comprehensive executive summary of security posture with key metrics
 *
 * ## Business Perspective
 *
 * This widget serves as an executive dashboard that provides a comprehensive view of
 * security posture, business value, implementation requirements, and compliance status.
 * It consolidates critical metrics from specialized widgets to support executive
 * decision-making and communication. 📊
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

  // Get services for data
  const {
    ciaContentService,
    error: ciaError,
    isLoading: ciaLoading,
  } = useCIAContentService();
  const {
    securityMetricsService,
    error: metricsError,
    isLoading: metricsLoading,
  } = useSecurityMetricsService();
  const {
    complianceService,
    error: complianceError,
    isLoading: complianceLoading,
  } = useComplianceService();

  // Determine if any service is loading or has errors
  const isLoading = ciaLoading || metricsLoading || complianceLoading;
  const error = ciaError || metricsError || complianceError;

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

  // Get security level description
  const securityLevelDescription = useMemo(
    () => getSecurityLevelDescription(overallSecurityLevel),
    [overallSecurityLevel]
  );

  // Calculate security score (0-100)
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

  // Get security classification
  const securityClassification = useMemo(() => {
    if (!isNullish(ciaContentService)) {
      try {
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

    // Fallback classification
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

  // Get data classification
  const dataClassification = useMemo(() => {
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

    // Fallback classification
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

  // Get implementation complexity
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

    // Fallback calculation
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

  // Helper function for status badge variant
  const getStatusVariant = (level: string): StatusType => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === "none") return "error";
    if (normalizedLevel === "low") return "warning";
    if (normalizedLevel === "moderate") return "info";
    if (normalizedLevel === "high") return "success";
    if (normalizedLevel === "very high") return "purple";
    return "neutral";
  };

  // Get compliance status
  const complianceStatus = useMemo((): ComplianceStatusType | null => {
    try {
      if (isNullish(complianceService)) return null;

      const status = complianceService.getComplianceStatus?.(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      // Ensure we have proper arrays
      if (status) {
        return {
          ...status,
          compliantFrameworks: status.compliantFrameworks || [],
          partiallyCompliantFrameworks:
            status.partiallyCompliantFrameworks || [],
          nonCompliantFrameworks: status.nonCompliantFrameworks || [],
        };
      }

      return null;
    } catch (err) {
      console.error("Error fetching compliance status:", err);
      return null;
    }
  }, [
    complianceService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get appropriate risk color class
  const getRiskColorClass = (risk: string): string => {
    if (risk.includes("Low")) return "text-green-600 dark:text-green-400";
    if (risk.includes("Medium")) return "text-yellow-600 dark:text-yellow-400";
    if (risk.includes("High")) return "text-orange-600 dark:text-orange-400";
    if (risk.includes("Critical")) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  // Get implementation time
  const getImplementationTime = (): string => {
    try {
      if (
        !isNullish(ciaContentService) &&
        typeof (ciaContentService as any).getImplementationTime === "function"
      ) {
        const time = (ciaContentService as any).getImplementationTime(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(time)) return time;
      }
    } catch (err) {
      console.error("Error fetching implementation time:", err);
    }

    // Fallback based on security score
    if (securityScore >= 80) return "3-6 months";
    if (securityScore >= 60) return "2-4 months";
    if (securityScore >= 40) return "1-2 months";
    return "2-4 weeks";
  };

  // Get resource requirements
  const getRequiredResources = (): string => {
    try {
      if (
        !isNullish(ciaContentService) &&
        typeof (ciaContentService as any).getRequiredResources === "function"
      ) {
        const resources = (ciaContentService as any).getRequiredResources(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );
        if (!isNullish(resources)) return resources;
      }
    } catch (err) {
      console.error("Error fetching resource requirements:", err);
    }

    // Fallback based on security score
    if (securityScore >= 80) return "Specialized Team";
    if (securityScore >= 60) return "Dedicated Team";
    if (securityScore >= 40) return "Small Team";
    return "Individual Effort";
  };

  // Calculate business maturity level based on security score
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

  // Get ROI estimate based on security score
  const getROIEstimate = (): string => {
    try {
      // Use the centralized utility function for consistent ROI calculation
      const roiEstimate = calculateROIEstimate(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
      return roiEstimate.value ?? "N/A"; // Add nullish coalescing operator to handle undefined
    } catch (err) {
      console.error("Error calculating ROI estimate:", err);
      return "N/A";
    }
  };

  // Get implementation cost estimate
  const getImplementationCost = (): string => {
    try {
      // Use the centralized utility function for consistent implementation cost
      const totalCost = calculateImplementationCost(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(totalCost);
    } catch (err) {
      console.error("Error calculating implementation cost:", err);
      return "N/A";
    }
  };

  // Get operational cost estimate
  const getOperationalCost = (): string => {
    try {
      // Use the centralized utility function for consistent operational cost
      const totalCost = calculateOperationalCost(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(totalCost);
    } catch (err) {
      console.error("Error calculating operational cost:", err);
      return "N/A";
    }
  };

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
              {/* Security Radar Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Security Profile
                </h3>
                <div className="h-[300px]">
                  <RadarChart
                    availabilityLevel={availabilityLevel}
                    integrityLevel={integrityLevel}
                    confidentialityLevel={confidentialityLevel}
                    testId={`${testId}-radar-chart`}
                  />
                </div>
              </div>

              {/* Security Level Summary */}
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
                      <span className="font-medium">{dataClassification}</span>
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
                      Validation Level:{" "}
                      <span className="font-medium">
                        {integrityLevel === "None"
                          ? "Unverified"
                          : integrityLevel === "Low"
                          ? "Basic Validation"
                          : integrityLevel === "Moderate"
                          ? "Validated"
                          : integrityLevel === "High"
                          ? "Strongly Validated"
                          : "Formally Verified"}
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
                        {availabilityLevel === "None"
                          ? "No guarantee"
                          : availabilityLevel === "Low"
                          ? "95%"
                          : availabilityLevel === "Moderate"
                          ? "99%"
                          : availabilityLevel === "High"
                          ? "99.9%"
                          : "99.999%"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Dashboard */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Key Security Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                      Business Maturity
                    </div>
                    <div className="text-lg font-bold">
                      {businessMaturityLevel}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {getBusinessMaturityDescription}
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Compliance Status
                    </div>
                    <div className="text-lg font-bold">
                      {complianceStatus?.complianceScore || securityScore}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Overall compliance alignment
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
                  This section summarizes the business value and financial
                  impact of your selected security levels, helping justify
                  security investments to stakeholders.
                </p>
              </div>

              {/* Business Impact Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Business Value Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Business Maturity */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Business Maturity Level
                    </h4>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                      {businessMaturityLevel}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      {getBusinessMaturityDescription}
                    </p>
                  </div>

                  {/* ROI Estimation */}
                  <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-300">
                      Estimated ROI
                    </h4>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400 mt-2">
                      {getROIEstimate()}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      {securityScore >= 80
                        ? "Strong return from security investments"
                        : securityScore >= 60
                        ? "Good return from security investments"
                        : securityScore >= 40
                        ? "Basic return, primarily risk avoidance"
                        : "Minimal return on investment"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Cost Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Implementation Cost */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Implementation Cost
                    </div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {getImplementationCost()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      One-time investment
                    </div>
                  </div>

                  {/* Operational Cost */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Operational Cost
                    </div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {getOperationalCost()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Annual expense
                    </div>
                  </div>

                  {/* Personnel Requirements */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Personnel Needs
                    </div>
                    <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      {(
                        (getSecurityLevelValue(availabilityLevel) +
                          getSecurityLevelValue(integrityLevel) +
                          getSecurityLevelValue(confidentialityLevel)) *
                        0.5
                      ).toFixed(1)}{" "}
                      FTE
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Full-time equivalents
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Enablement */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Business Enablement
                </h3>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">
                      Business Capabilities
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {securityScore >= 80 ? (
                        <>
                          <li>Enables digital transformation initiatives</li>
                          <li>Supports secure cloud adoption</li>
                          <li>Facilitates secure partner integrations</li>
                          <li>
                            Provides competitive advantage through security as a
                            value
                          </li>
                        </>
                      ) : securityScore >= 60 ? (
                        <>
                          <li>Supports most digital business initiatives</li>
                          <li>Enables secure customer data handling</li>
                          <li>Allows controlled partner access</li>
                          <li>Meets most customer security requirements</li>
                        </>
                      ) : securityScore >= 40 ? (
                        <>
                          <li>Supports basic business operations</li>
                          <li>Enables limited partner interactions</li>
                          <li>Meets minimum customer expectations</li>
                        </>
                      ) : (
                        <>
                          <li>Limited security capabilities</li>
                          <li>May restrict business opportunities</li>
                          <li>Potential compliance limitations</li>
                        </>
                      )}
                    </ul>
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
              {/* Implementation introduction */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
                <p className="text-sm">
                  This section summarizes implementation requirements for your
                  selected security levels, helping plan resources, timelines,
                  and technical approaches.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Implementation Timeline */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Estimated Implementation Time
                    </div>
                    <div className="text-lg font-bold">
                      {getImplementationTime()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Typical project timeline
                    </div>
                  </div>

                  {/* Required Resources */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm font-medium mb-1">
                      Required Resources
                    </div>
                    <div className="text-lg font-bold">
                      {getRequiredResources()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Resource allocation recommendation
                    </div>
                  </div>
                </div>
              </div>

              {/* Component Implementation Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Component Implementation Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Confidentiality Implementation */}
                  <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                      Confidentiality Implementation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {confidentialityLevel === "None"
                        ? "No data protection controls needed"
                        : confidentialityLevel === "Low"
                        ? "Basic access controls and authentication"
                        : confidentialityLevel === "Moderate"
                        ? "Role-based access and encryption for sensitive data"
                        : confidentialityLevel === "High"
                        ? "Comprehensive encryption and access controls"
                        : "Maximum protection with advanced encryption and zero-trust"}
                    </p>
                    <div className="mt-2 text-xs font-medium text-purple-700 dark:text-purple-300">
                      Level: {confidentialityLevel}
                    </div>
                  </div>

                  {/* Integrity Implementation */}
                  <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800">
                    <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                      Integrity Implementation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {integrityLevel === "None"
                        ? "No data validation controls needed"
                        : integrityLevel === "Low"
                        ? "Basic input validation and error checking"
                        : integrityLevel === "Moderate"
                        ? "Data validation and cryptographic checksums"
                        : integrityLevel === "High"
                        ? "Digital signatures and strong validation"
                        : "Formal verification and immutable audit trails"}
                    </p>
                    <div className="mt-2 text-xs font-medium text-green-700 dark:text-green-300">
                      Level: {integrityLevel}
                    </div>
                  </div>

                  {/* Availability Implementation */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">
                      Availability Implementation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {availabilityLevel === "None"
                        ? "No uptime guarantees or redundancy"
                        : availabilityLevel === "Low"
                        ? "Basic backup and recovery procedures"
                        : availabilityLevel === "Moderate"
                        ? "Redundant components and standard backups"
                        : availabilityLevel === "High"
                        ? "High availability clustering and failover"
                        : "Multi-site redundancy and continuous availability"}
                    </p>
                    <div className="mt-2 text-xs font-medium text-blue-700 dark:text-blue-300">
                      Level: {availabilityLevel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Considerations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Implementation Considerations
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-300">
                      Success Factors
                    </h4>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                      <li>Executive sponsorship and support</li>
                      <li>Clear security requirements definition</li>
                      <li>Adequate resource allocation</li>
                      <li>Proper testing and validation</li>
                      <li>Staff training and awareness</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">
                      Key Challenges
                    </h4>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                      <li>Balancing security with usability</li>
                      <li>Integration with existing systems</li>
                      <li>Managing scope and expectations</li>
                      <li>Maintaining consistent controls</li>
                      <li>Securing necessary expertise</li>
                    </ul>
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
              {/* Compliance introduction */}
              <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-4">
                <p className="text-sm">
                  This section summarizes your compliance status based on
                  selected security levels, highlighting alignment with
                  regulatory frameworks and standards.
                </p>
              </div>

              {/* Compliance Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Compliance Status Overview
                </h3>

                {!complianceStatus ? (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Compliance Score</span>
                      <span className="text-xl font-bold">
                        {securityScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                      <div
                        className={`h-2.5 rounded-full ${
                          securityScore >= 80
                            ? "bg-green-500"
                            : securityScore >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${securityScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {securityScore >= 80
                        ? "Strong compliance position"
                        : securityScore >= 50
                        ? "Moderate compliance position"
                        : "Compliance gaps detected"}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Compliance Score</span>
                      <span className="text-xl font-bold">
                        {complianceStatus.complianceScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-2">
                      <div
                        className={`h-2.5 rounded-full ${
                          (complianceStatus.complianceScore || 0) >= 80
                            ? "bg-green-500"
                            : (complianceStatus.complianceScore || 0) >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${complianceStatus.complianceScore || 0}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {complianceStatus.status ||
                        ((complianceStatus.complianceScore || 0) >= 80
                          ? "Strong compliance position"
                          : (complianceStatus.complianceScore || 0) >= 50
                          ? "Moderate compliance position"
                          : "Compliance gaps detected")}
                    </p>
                  </div>
                )}
              </div>

              {/* Framework Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Framework Compliance Status
                </h3>

                {!complianceStatus ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    Detailed compliance information is not available.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
                      <h4 className="font-medium text-green-700 dark:text-green-300 flex items-center justify-between">
                        <span>Compliant</span>
                        <span className="text-sm bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded-full">
                          {complianceStatus.compliantFrameworks.length}
                        </span>
                      </h4>
                      {complianceStatus.compliantFrameworks.length > 0 ? (
                        <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {complianceStatus.compliantFrameworks.map(
                            (framework, idx) => (
                              <li key={`compliant-${idx}`}>{framework}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                          No fully compliant frameworks
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
                      <h4 className="font-medium text-yellow-700 dark:text-yellow-300 flex items-center justify-between">
                        <span>Partially Compliant</span>
                        <span className="text-sm bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded-full">
                          {complianceStatus.partiallyCompliantFrameworks.length}
                        </span>
                      </h4>
                      {complianceStatus.partiallyCompliantFrameworks.length >
                      0 ? (
                        <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {complianceStatus.partiallyCompliantFrameworks.map(
                            (framework, idx) => (
                              <li key={`partial-${idx}`}>{framework}</li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                          No partially compliant frameworks
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Component Requirements */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
                  Component Compliance Requirements
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Confidentiality compliance */}
                  <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
                    <h5 className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                      Confidentiality
                    </h5>
                    <p className="text-xs">
                      <span className="font-medium">Level:</span>{" "}
                      {confidentialityLevel}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {confidentialityLevel === "None"
                        ? "Not sufficient for most compliance frameworks"
                        : confidentialityLevel === "Low"
                        ? "Meets basic compliance requirements"
                        : confidentialityLevel === "Moderate"
                        ? "Satisfies most regulatory requirements"
                        : confidentialityLevel === "High"
                        ? "Meets stringent compliance standards"
                        : "Exceeds most compliance requirements"}
                    </p>
                  </div>

                  {/* Integrity compliance */}
                  <div className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
                    <h5 className="text-sm font-medium mb-1 text-green-700 dark:text-green-300">
                      Integrity
                    </h5>
                    <p className="text-xs">
                      <span className="font-medium">Level:</span>{" "}
                      {integrityLevel}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {integrityLevel === "None"
                        ? "Not sufficient for most compliance frameworks"
                        : integrityLevel === "Low"
                        ? "Meets basic compliance requirements"
                        : integrityLevel === "Moderate"
                        ? "Satisfies most regulatory requirements"
                        : integrityLevel === "High"
                        ? "Meets stringent compliance standards"
                        : "Exceeds most compliance requirements"}
                    </p>
                  </div>

                  {/* Availability compliance */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
                    <h5 className="text-sm font-medium mb-1 text-blue-700 dark:text-blue-300">
                      Availability
                    </h5>
                    <p className="text-xs">
                      <span className="font-medium">Level:</span>{" "}
                      {availabilityLevel}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {availabilityLevel === "None"
                        ? "Not sufficient for most compliance frameworks"
                        : availabilityLevel === "Low"
                        ? "Meets basic compliance requirements"
                        : availabilityLevel === "Moderate"
                        ? "Satisfies most regulatory requirements"
                        : availabilityLevel === "High"
                        ? "Meets stringent compliance standards"
                        : "Exceeds most compliance requirements"}
                    </p>
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
