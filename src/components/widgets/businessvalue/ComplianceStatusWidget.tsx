import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { SECURITY_ICONS } from "../../../constants/uiConstants";
import { useComplianceService } from "../../../hooks/useComplianceService";
import type { CIAComponentType } from "../../../types";
import { SecurityLevel } from "../../../types/cia";
import { ComplianceStatusDetails } from "../../../types/compliance";
import { calculateOverallSecurityLevel } from "../../../utils/securityLevelUtils";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for ComplianceStatusWidget component
 */
interface ComplianceStatusWidgetProps {
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
  const { complianceService, error, isLoading } = useComplianceService();

  // Active framework for detailed view
  const [activeFramework, setActiveFramework] = useState<string | null>(null);

  // Calculate overall security level
  const overallSecurityLevel = useMemo(() => {
    return calculateOverallSecurityLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Get compliance status
  const complianceStatus = useMemo((): ComplianceStatusDetails | null => {
    if (isLoading || error || !complianceService) return null;

    try {
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
    isLoading,
    error,
  ]);

  /**
   * Get compliance status text with fallback
   */
  const getComplianceStatusText = useCallback(() => {
    if (!complianceService) {
      return "Unknown compliance status";
    }

    // First check if the service has the getComplianceStatusText method
    if (typeof complianceService.getComplianceStatusText === "function") {
      return complianceService.getComplianceStatusText(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    }

    // Fallback to computing status from getComplianceStatus
    const status = complianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    // Define the total number of frameworks supported
    // This should come from the compliance service, but we use a reasonable default if not available
    const totalFrameworkCount =
      Object.keys(complianceService.frameworkRequirements || {}).length || 7;

    // Determine status text based on frameworks
    if (
      status.compliantFrameworks.length === totalFrameworkCount &&
      status.nonCompliantFrameworks.length === 0
    ) {
      return "Fully Compliant";
    } else if (status.compliantFrameworks.length > 0) {
      return "Partially Compliant";
    }

    return "Non-Compliant";
  }, [
    complianceService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get status text for display
  const statusText = useMemo(() => {
    if (isLoading) return "Loading compliance status...";
    if (error) return "Error loading compliance status";
    if (!complianceStatus) return "Unable to determine compliance status";

    return complianceService?.getComplianceStatusText(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [
    complianceService,
    complianceStatus,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    isLoading,
    error,
  ]);

  // Helper function to get badge status
  const getBadgeStatus = (
    score: number
  ): "success" | "warning" | "error" | "info" | "neutral" => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  // Get gap analysis for the active framework
  const gapAnalysis = useMemo(() => {
    if (!activeFramework || !complianceService) return null;

    try {
      return complianceService.getComplianceGapAnalysis(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel,
        activeFramework // Pass as string instead of array
      );
    } catch (err) {
      console.error("Error getting gap analysis:", err);
      return null;
    }
  }, [
    activeFramework,
    complianceService,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get framework status badges
  const getFrameworkStatusBadge = (
    status: string
  ): "success" | "warning" | "error" => {
    if (status === "compliant") return "success";
    if (status === "partially-compliant") return "warning";
    return "error";
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COMPLIANCE_STATUS}
      icon={WIDGET_ICONS.COMPLIANCE_STATUS}
      className={className}
      testId={testId}
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

        {/* Error state */}
        {error && (
          <div
            className="p-3 mb-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-20 text-red-800 dark:text-red-200 rounded-lg"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_ERROR}
          >
            <h4 className="font-medium">Error</h4>
            <p className="text-sm">
              {error.message || "An error occurred loading compliance data."}
            </p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div
            className="p-3 mb-4 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-800 dark:text-blue-200 rounded-lg"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_LOADING}
          >
            <p className="text-sm">Loading compliance status...</p>
          </div>
        )}

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
                  {SECURITY_ICONS.compliance}
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
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{framework}</span>
                        <StatusBadge
                          status="success"
                          testId={`${COMPLIANCE_TEST_IDS.FRAMEWORK_STATUS}-${index}`}
                        >
                          Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {complianceService?.getFrameworkDescription(framework)}
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
                          status="warning"
                          testId={`${COMPLIANCE_TEST_IDS.FRAMEWORK_STATUS}-partial-${index}`}
                        >
                          Partially Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {complianceService?.getFrameworkDescription(framework)}
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
                          status="error"
                          testId={`${COMPLIANCE_TEST_IDS.FRAMEWORK_STATUS}-non-${index}`}
                        >
                          Non-Compliant
                        </StatusBadge>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {complianceService?.getFrameworkDescription(framework)}
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
                    <h4 className="text-md font-medium">
                      Current Compliance Status
                    </h4>
                    <StatusBadge
                      status={
                        gapAnalysis.overallStatus ===
                        "Fully compliant with all frameworks"
                          ? "success"
                          : "error"
                      }
                      testId={COMPLIANCE_TEST_IDS.SELECTED_FRAMEWORK_STATUS}
                    >
                      {gapAnalysis.overallStatus ===
                      "Fully compliant with all frameworks"
                        ? "Compliant"
                        : "Non-Compliant"}
                    </StatusBadge>
                  </div>

                  {/* CIA Component Analysis */}
                  <div className="mb-3">
                    <h4 className="text-md font-medium mb-2">
                      Component Requirements
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Availability */}
                      <div
                        className="p-2 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
                        data-testid={
                          COMPLIANCE_TEST_IDS.AVAILABILITY_REQUIREMENT
                        }
                      >
                        <div className="text-sm font-medium mb-1">
                          Availability
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Current:</span>
                          <span className="text-xs font-medium">
                            {availabilityLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Required:</span>
                          <span
                            className="text-xs font-medium"
                            data-testid={
                              COMPLIANCE_TEST_IDS.AVAILABILITY_REQUIRED_LEVEL
                            }
                          >
                            {complianceService?.getFrameworkRequiredLevel(
                              activeFramework,
                              "availability" as CIAComponentType
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Integrity */}
                      <div
                        className="p-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
                        data-testid={COMPLIANCE_TEST_IDS.INTEGRITY_REQUIREMENT}
                      >
                        <div className="text-sm font-medium mb-1">
                          Integrity
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Current:</span>
                          <span className="text-xs font-medium">
                            {integrityLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Required:</span>
                          <span
                            className="text-xs font-medium"
                            data-testid={
                              COMPLIANCE_TEST_IDS.INTEGRITY_REQUIRED_LEVEL
                            }
                          >
                            {complianceService?.getFrameworkRequiredLevel(
                              activeFramework,
                              "integrity" as CIAComponentType
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Confidentiality */}
                      <div
                        className="p-2 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
                        data-testid={
                          COMPLIANCE_TEST_IDS.CONFIDENTIALITY_REQUIREMENT
                        }
                      >
                        <div className="text-sm font-medium mb-1">
                          Confidentiality
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Current:</span>
                          <span className="text-xs font-medium">
                            {confidentialityLevel}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs">Required:</span>
                          <span
                            className="text-xs font-medium"
                            data-testid={
                              COMPLIANCE_TEST_IDS.CONFIDENTIALITY_REQUIRED_LEVEL
                            }
                          >
                            {complianceService?.getFrameworkRequiredLevel(
                              activeFramework,
                              "confidentiality" as CIAComponentType
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gap Analysis */}
                  {gapAnalysis.gaps.length > 0 && (
                    <>
                      <div className="mb-3">
                        <h4 className="text-md font-medium mb-2">
                          Compliance Gaps
                        </h4>
                        <ul
                          className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400"
                          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_GAPS_LIST}
                        >
                          {gapAnalysis.gaps.map(
                            (gap: ComplianceGap, index: number) => (
                              <li
                                key={index}
                                data-testid={`${COMPLIANCE_TEST_IDS.COMPLIANCE_GAP_ITEM}-${index}`}
                              >
                                {`${gap.framework}: ${gap.components.confidentiality.required} level required (current: ${gap.components.confidentiality.current})`}
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-md font-medium mb-2">
                          Recommendations
                        </h4>
                        <ul
                          className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400"
                          data-testid={
                            COMPLIANCE_TEST_IDS.COMPLIANCE_RECOMMENDATIONS_LIST
                          }
                        >
                          {gapAnalysis.recommendations.map(
                            (recommendation: string, index: number) => (
                              <li
                                key={index}
                                data-testid={`${COMPLIANCE_TEST_IDS.COMPLIANCE_RECOMMENDATION_ITEM}-${index}`}
                              >
                                {recommendation}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
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

export default ComplianceStatusWidget;
