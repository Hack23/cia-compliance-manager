import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { SECURITY_ICONS } from "../../../constants/uiConstants";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { CIAComponent, SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import { ComplianceStatusDetails } from "../../../types/compliance";
import { isNullish } from "../../../utils/typeGuards";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for StatusBadge subcomponent
 */
interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  testId?: string;
}

// Add function to determine badge status with proper typing
const getBadgeStatus = (complianceScore: number): StatusType => {
  if (complianceScore >= 80) return "success";
  if (complianceScore >= 50) return "warning";
  return "error";
};

/**
 * Props for ComplianceStatusWidget component
 */
export interface ComplianceStatusWidgetProps {
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
   * Optional industry for compliance context
   */
  industry?: string;

  /**
   * Optional region for compliance context
   */
  region?: string;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

// Add this interface to define the structure of a gap in gap analysis
interface ComplianceGap {
  framework: string;
  frameworkDescription: string;
  components: {
    availability: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
    integrity: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
    confidentiality: {
      current: SecurityLevel;
      required: SecurityLevel;
      gap: number;
    };
  };
  recommendations: string[];
}

/**
 * ComplianceStatusWidget displays status of compliance with various frameworks
 *
 * ## Business Perspective
 *
 * This widget helps executives and compliance officers understand how their
 * security controls align with regulatory requirements and industry standards.
 * It helps organizations identify compliance gaps and prioritize security
 * investments to meet their regulatory obligations. 📋
 */
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  industry,
  region,
  className = "",
  testId = COMPLIANCE_TEST_IDS.WIDGET,
}) => {
  // Use the compliance service
  const {
    complianceService,
    error: serviceError,
    isLoading,
  } = useComplianceService();

  // Active framework for detailed view
  const [activeFramework, setActiveFramework] = useState<string | null>(null);

  // Calculate overall security level with proper type safety
  const overallSecurityLevel = useMemo(() => {
    // Convert security levels to numeric values
    const levelValues: Record<SecurityLevel, number> = {
      None: 0,
      Low: 1,
      Moderate: 2,
      High: 3,
      "Very High": 4,
    };

    // Calculate the minimum security level as the overall level
    const minValue = Math.min(
      levelValues[availabilityLevel],
      levelValues[integrityLevel],
      levelValues[confidentialityLevel]
    );

    // Map numeric value back to SecurityLevel using a type-safe approach
    const levels: SecurityLevel[] = [
      "None",
      "Low",
      "Moderate",
      "High",
      "Very High",
    ];
    return levels.find((_, index) => index === minValue) || "Moderate";
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get compliance status with proper error handling
  const complianceStatus = useMemo((): ComplianceStatusDetails | null => {
    if (isLoading || serviceError || !complianceService) return null;

    try {
      // Use industry and region context when appropriate
      return complianceService.getComplianceStatus(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    } catch (err) {
      console.error("Error getting compliance status:", err);
      return null;
    }
  }, [
    complianceService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    industry, // Keep this dependency for potential future implementation
    region, // Keep this dependency for potential future implementation
    isLoading,
    serviceError,
  ]);

  // Get status text for display with proper error handling
  const getComplianceStatusText = useCallback((): string => {
    if (isLoading) return "Loading compliance status...";
    if (serviceError) return "Error loading compliance status";
    if (!complianceStatus) return "Unable to determine compliance status";

    try {
      if (complianceService?.getComplianceStatusText) {
        const statusText = complianceService.getComplianceStatusText(
          availabilityLevel,
          integrityLevel,
          confidentialityLevel
        );

        if (!isNullish(statusText)) {
          return statusText;
        }
      }

      // Fallback if service doesn't provide status text
      if (complianceStatus.status) {
        return complianceStatus.status;
      }

      // Final fallback
      return `Based on ${overallSecurityLevel} security level`;
    } catch (err) {
      console.error("Error getting compliance status text:", err);
      return "Unable to determine compliance status";
    }
  }, [
    complianceService,
    complianceStatus,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    overallSecurityLevel,
    isLoading,
    serviceError,
  ]);

  // Define a single helper function for framework status badges
  const getFrameworkStatusBadge = useCallback(
    (framework: string): StatusType => {
      if (!complianceStatus) return "neutral";

      if (complianceStatus.compliantFrameworks.includes(framework)) {
        return "success";
      } else if (
        complianceStatus.partiallyCompliantFrameworks.includes(framework)
      ) {
        return "warning";
      } else {
        return "error";
      }
    },
    [complianceStatus]
  );

  // Get status text
  const statusText = useMemo(
    () => getComplianceStatusText(),
    [getComplianceStatusText]
  );

  // Define gapAnalysis variable
  const gapAnalysis = useMemo(() => {
    if (isLoading || serviceError || !complianceService || !activeFramework)
      return null;

    try {
      return complianceService.getComplianceGapAnalysis(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        activeFramework
      );
    } catch (err) {
      console.error("Error getting gap analysis:", err);
      return null;
    }
  }, [
    complianceService,
    activeFramework,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    isLoading,
    serviceError,
  ]);

  // Create a type-safe implementation of getFrameworkRequiredLevel
  const getFrameworkRequiredLevel = useCallback(
    (framework: string, component: CIAComponent): SecurityLevel => {
      // If the service is available, use it
      if (complianceService?.getFrameworkRequiredLevel) {
        try {
          return complianceService.getFrameworkRequiredLevel(
            framework,
            component
          );
        } catch (err) {
          console.error(`Error getting required level for ${framework}:`, err);
        }
      }

      // Default fallback levels based on typical requirements
      const defaultLevels: Record<
        string,
        Record<CIAComponent, SecurityLevel>
      > = {
        "PCI DSS": {
          availability: "High",
          integrity: "High",
          confidentiality: "High",
        },
        HIPAA: {
          availability: "High",
          integrity: "High",
          confidentiality: "High",
        },
        GDPR: {
          availability: "Moderate",
          integrity: "High",
          confidentiality: "High",
        },
        "ISO 27001": {
          availability: "Moderate",
          integrity: "Moderate",
          confidentiality: "Moderate",
        },
        "SOC 2": {
          availability: "Moderate",
          integrity: "Moderate",
          confidentiality: "Moderate",
        },
      };

      // Return the default if available, otherwise return Moderate as a safe fallback
      return defaultLevels[framework]?.[component] || "Moderate";
    },
    [complianceService]
  );

  // Get framework description with error handling
  const getFrameworkDescription = useCallback(
    (framework: string): string => {
      if (!complianceService) return `${framework} requirements`;

      try {
        if (typeof complianceService.getFrameworkDescription === "function") {
          const description =
            complianceService.getFrameworkDescription(framework);
          return description || `${framework} requirements`;
        }
        return `${framework} requirements`;
      } catch (err) {
        console.error(`Error getting description for ${framework}:`, err);
        return `${framework} requirements`;
      }
    },
    [complianceService]
  );

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COMPLIANCE_STATUS || "Compliance Status"}
      icon={WIDGET_ICONS.COMPLIANCE_STATUS || "📋"}
      className={className}
      testId={testId}
      isLoading={isLoading}
      error={serviceError}
    >
      <div className="p-4">
        {/* Add high-level description */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <p className="text-sm">
            This widget shows your compliance status with various regulatory
            frameworks and industry standards based on your selected security
            levels.
          </p>
        </div>

        {/* Overall Compliance Status */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            Overall Compliance Status
          </h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_SUMMARY}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-2xl mr-2 text-blue-500">
                  {SECURITY_ICONS.compliance || "📋"}
                </span>
                <span className="font-medium">Compliance Status</span>
              </div>
              <StatusBadge
                status={getBadgeStatus(complianceStatus?.complianceScore ?? 0)}
                testId={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE}
              >
                {statusText}
              </StatusBadge>
            </div>

            {complianceStatus && (
              <div className="mt-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Compliance Score
                  </span>
                  <span
                    className="font-bold"
                    data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE}
                  >
                    {complianceStatus.complianceScore ?? 0}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                    <div
                      style={{
                        width: `${complianceStatus.complianceScore ?? 0}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-600"
                      data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE_BAR}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compliant Frameworks */}
        {complianceStatus &&
          complianceStatus.compliantFrameworks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Compliant Frameworks</h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
              >
                {complianceStatus.compliantFrameworks.map(
                  (framework, index) => (
                    <div
                      key={framework}
                      className={`p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-200 dark:border-green-800 cursor-pointer ${
                        activeFramework === framework
                          ? "ring-2 ring-green-500 dark:ring-green-400"
                          : ""
                      }`}
                      onClick={() => setActiveFramework(framework)}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-${index}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{framework}</span>
                        <StatusBadge
                          status={getFrameworkStatusBadge(framework)}
                          testId={`framework-status-badge-${index}`}
                        >
                          Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {getFrameworkDescription(framework)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* Partially Compliant Frameworks */}
        {complianceStatus &&
          complianceStatus.partiallyCompliantFrameworks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                Partially Compliant Frameworks
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                data-testid={
                  COMPLIANCE_TEST_IDS.PARTIALLY_COMPLIANT_FRAMEWORKS_LIST
                }
              >
                {complianceStatus.partiallyCompliantFrameworks.map(
                  (framework, index) => (
                    <div
                      key={framework}
                      className={`p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-200 dark:border-yellow-800 cursor-pointer ${
                        activeFramework === framework
                          ? "ring-2 ring-yellow-500 dark:ring-yellow-400"
                          : ""
                      }`}
                      onClick={() => setActiveFramework(framework)}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-partial-${index}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{framework}</span>
                        <StatusBadge
                          status={getFrameworkStatusBadge(framework)}
                          testId={`framework-partial-status-badge-${index}`}
                        >
                          Partially Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {getFrameworkDescription(framework)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* Non-Compliant Frameworks */}
        {complianceStatus &&
          complianceStatus.nonCompliantFrameworks.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">
                Non-Compliant Frameworks
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-3"
                data-testid={COMPLIANCE_TEST_IDS.NON_COMPLIANT_FRAMEWORKS_LIST}
              >
                {complianceStatus.nonCompliantFrameworks.map(
                  (framework, index) => (
                    <div
                      key={framework}
                      className={`p-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg border border-red-200 dark:border-red-800 cursor-pointer ${
                        activeFramework === framework
                          ? "ring-2 ring-red-500 dark:ring-red-400"
                          : ""
                      }`}
                      onClick={() => setActiveFramework(framework)}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-non-${index}`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{framework}</span>
                        <StatusBadge
                          status={getFrameworkStatusBadge(framework)}
                          testId={`framework-non-status-badge-${index}`}
                        >
                          Non-Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {getFrameworkDescription(framework)}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* Framework Gap Analysis */}
        {activeFramework && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">
              {activeFramework} Gap Analysis
            </h3>
            <div
              className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              data-testid={COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS}
            >
              {gapAnalysis ? (
                <div>
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">Status</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {gapAnalysis.isCompliant
                        ? `Your security controls meet the requirements for ${activeFramework}.`
                        : `Your security controls do not fully meet the requirements for ${activeFramework}.`}
                    </p>
                  </div>

                  {/* CIA Component Analysis */}
                  <div className="mb-3">
                    <h4 className="font-medium mb-1">Component Requirements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                      {["availability", "integrity", "confidentiality"].map(
                        (comp) => {
                          const componentType = comp as CIAComponent;
                          const currentLevel =
                            componentType === "availability"
                              ? availabilityLevel
                              : componentType === "integrity"
                              ? integrityLevel
                              : confidentialityLevel;
                          const requiredLevel = getFrameworkRequiredLevel(
                            activeFramework,
                            componentType
                          );
                          const isMeeting =
                            getSecurityLevelValue(currentLevel) >=
                            getSecurityLevelValue(requiredLevel);

                          return (
                            <div
                              key={comp}
                              className={`p-2 rounded-lg ${
                                isMeeting
                                  ? "bg-green-50 dark:bg-green-900 dark:bg-opacity-20"
                                  : "bg-red-50 dark:bg-red-900 dark:bg-opacity-20"
                              }`}
                            >
                              <div className="text-xs font-medium mb-1">
                                {componentType.charAt(0).toUpperCase() +
                                  componentType.slice(1)}
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>
                                  Current:{" "}
                                  <span className="font-medium">
                                    {currentLevel}
                                  </span>
                                </span>
                                <span>
                                  Required:{" "}
                                  <span className="font-medium">
                                    {requiredLevel}
                                  </span>
                                </span>
                              </div>
                              <div className="mt-1 text-xs text-right">
                                <StatusBadge
                                  status={isMeeting ? "success" : "error"}
                                  testId={`${comp}-requirement-status`}
                                >
                                  {isMeeting ? "Meeting" : "Not Meeting"}
                                </StatusBadge>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Gap Analysis */}
                  {gapAnalysis.gaps && gapAnalysis.gaps.length > 0 && (
                    <div className="mb-3">
                      <h4 className="font-medium mb-1">Compliance Gaps</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {gapAnalysis.gaps.map((gap, index) => (
                          <li key={index}>
                            {typeof gap === "string"
                              ? gap
                              : gap.framework ||
                                gap.frameworkDescription ||
                                "Undefined compliance gap"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommendations */}
                  {gapAnalysis.recommendations &&
                    gapAnalysis.recommendations.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-1">Recommendations</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                          {gapAnalysis.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ) : (
                <div
                  className="text-center text-gray-500 dark:text-gray-400 py-6"
                  data-testid={COMPLIANCE_TEST_IDS.NO_GAP_ANALYSIS}
                >
                  No gap analysis available for this framework.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compliance Tips */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-2">
            <span className="text-blue-500 dark:text-blue-400 mr-2">💡</span>
            <h3 className="font-medium">Compliance Tips</h3>
          </div>
          <ul
            className="text-sm space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_TIPS_LIST}
          >
            {complianceStatus && complianceStatus.complianceScore ? (
              complianceStatus.complianceScore < 50 ? (
                <>
                  <li>Focus on implementing foundational security controls</li>
                  <li>
                    Prioritize controls that address multiple compliance
                    frameworks
                  </li>
                  <li>
                    Consider engaging a compliance specialist to create a
                    roadmap
                  </li>
                </>
              ) : complianceStatus.complianceScore < 80 ? (
                <>
                  <li>
                    Address specific gaps in partially compliant frameworks
                  </li>
                  <li>
                    Implement regular compliance monitoring and validation
                  </li>
                  <li>Document your compliance controls and processes</li>
                </>
              ) : (
                <>
                  <li>
                    Maintain your strong compliance posture with regular reviews
                  </li>
                  <li>
                    Prepare for upcoming regulatory changes and new frameworks
                  </li>
                  <li>
                    Consider compliance certification to showcase your
                    capabilities
                  </li>
                </>
              )
            ) : (
              <>
                <li>
                  Implement controls across all CIA components for balanced
                  compliance
                </li>
                <li>
                  Start with the frameworks most relevant to your industry
                </li>
                <li>
                  Document your security controls to demonstrate compliance
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Helper function to convert security level to numeric value
function getSecurityLevelValue(level: SecurityLevel): number {
  const levelValues: Record<SecurityLevel, number> = {
    None: 0,
    Low: 1,
    Moderate: 2,
    High: 3,
    "Very High": 4,
  };
  return levelValues[level] || 0;
}

export default ComplianceStatusWidget;
