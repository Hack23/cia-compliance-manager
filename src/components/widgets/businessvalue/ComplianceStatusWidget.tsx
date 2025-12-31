import React, { useCallback, useMemo, useState } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { SECURITY_ICONS } from "../../../constants/uiConstants";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { CIAComponent, SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import { ComplianceStatusDetails } from "../../../types/compliance";
import { ComplianceStatusWidgetProps } from "../../../types/widget-props";
import { isNullish } from "../../../utils/typeGuards";
import { getWidgetAriaDescription } from "../../../utils/accessibility";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";
import WidgetErrorBoundary from "../../common/WidgetErrorBoundary";

// Add function to determine badge status with proper typing
const getBadgeStatus = (complianceScore: number): StatusType => {
  if (complianceScore >= 80) return "success";
  if (complianceScore >= 50) return "warning";
  return "error";
};

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
    <WidgetErrorBoundary widgetName="Compliance Status">
      <WidgetContainer
        title={WIDGET_TITLES.COMPLIANCE_STATUS || "Compliance Status"}
        icon={WIDGET_ICONS.COMPLIANCE_STATUS || "📋"}
        className={className}
        testId={testId}
        isLoading={isLoading}
        error={serviceError}
      >
      <div 
        className={cn("p-md sm:p-lg")}
        role="region"
        aria-label={getWidgetAriaDescription(
          "Compliance Status",
          "Status of compliance with regulatory frameworks and industry standards"
        )}
      >
        {/* Add high-level description */}
        <section 
          className={cn(
            WidgetClasses.section,
            "bg-info-light/10 dark:bg-info-dark/20"
          )}
          aria-labelledby="compliance-description-heading"
        >
          <p id="compliance-description-heading" className={cn(WidgetClasses.body)}>
            This widget shows your compliance status with various regulatory
            frameworks and industry standards based on your selected security
            levels.
          </p>
        </section>

        {/* Overall Compliance Status */}
        <section 
          className="mb-lg"
          aria-labelledby="overall-compliance-heading"
        >
          <h3 id="overall-compliance-heading" className={cn(WidgetClasses.heading)}>
            Overall Compliance Status
          </h3>
          <div
            className={cn(
              WidgetClasses.card,
              "bg-neutral-light/10 dark:bg-neutral-dark/20"
            )}
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_SUMMARY}
            role="group"
            aria-label="Compliance status summary"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-title mr-sm text-info" aria-hidden="true">
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
              <div className="mt-md">
                <div className="flex justify-between items-center mb-sm">
                  <span 
                    className={cn(WidgetClasses.body)}
                    id="compliance-score-label"
                  >
                    Compliance Score
                  </span>
                  <span
                    className="font-bold"
                    data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE}
                    aria-labelledby="compliance-score-label"
                    role="status"
                    aria-live="polite"
                  >
                    {complianceStatus.complianceScore ?? 0}%
                  </span>
                </div>
                <div className="relative pt-1">
                  <div 
                    className="overflow-hidden h-2 mb-sm text-xs flex rounded bg-info-light/20 dark:bg-info-dark"
                    role="progressbar"
                    aria-valuenow={complianceStatus.complianceScore ?? 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Compliance score: ${complianceStatus.complianceScore ?? 0} percent`}
                  >
                    <div
                      style={{
                        width: `${complianceStatus.complianceScore ?? 0}%`,
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-info dark:bg-info-light"
                      data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE_BAR}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Compliant Frameworks */}
        {complianceStatus &&
          complianceStatus.compliantFrameworks.length > 0 && (
            <div className="mb-lg">
              <h3 className={cn(WidgetClasses.heading)}>Compliant Frameworks</h3>
              <div
                className={cn(WidgetClasses.grid2Cols)}
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
              >
                {complianceStatus.compliantFrameworks.map(
                  (framework, index) => (
                    <div
                      key={framework}
                      className={cn(
                        WidgetClasses.card,
                        WidgetClasses.cardInteractive,
                        "bg-success-light/10 dark:bg-success-dark/20 border-success-light dark:border-success-dark",
                        activeFramework === framework &&
                          "ring-2 ring-success dark:ring-success-light"
                      )}
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-xs">
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
            <div className="mb-lg">
              <h3 className="text-lg font-medium mb-sm">
                Partially Compliant Frameworks
              </h3>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-md"
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
                      <div className="flex justify-between items-center mb-xs">
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
            <div className="mb-lg">
              <h3 className="text-lg font-medium mb-sm">
                Non-Compliant Frameworks
              </h3>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-md"
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
                      <div className="flex justify-between items-center mb-xs">
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
          <div className="mt-lg">
            <h3 className="text-lg font-medium mb-sm">
              {activeFramework} Gap Analysis
            </h3>
            <div
              className="p-md bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              data-testid={COMPLIANCE_TEST_IDS.FRAMEWORK_GAP_ANALYSIS}
            >
              {gapAnalysis ? (
                <div>
                  <div className="mb-md">
                    <h4 className="font-medium mb-xs">Status</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {gapAnalysis.isCompliant
                        ? `Your security controls meet the requirements for ${activeFramework}.`
                        : `Your security controls do not fully meet the requirements for ${activeFramework}.`}
                    </p>
                  </div>

                  {/* CIA Component Analysis */}
                  <div className="mb-md">
                    <h4 className="font-medium mb-xs">Component Requirements</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm mt-sm">
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
                              <div className="text-xs font-medium mb-xs">
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
                              <div className="mt-xs text-xs text-right">
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
                    <div className="mb-md">
                      <h4 className="font-medium mb-xs">Compliance Gaps</h4>
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
                        <h4 className="font-medium mb-xs">Recommendations</h4>
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
        <div className="mt-lg p-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-sm">
            <span className="text-blue-500 dark:text-blue-400 mr-sm">💡</span>
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
    </WidgetErrorBoundary>
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
