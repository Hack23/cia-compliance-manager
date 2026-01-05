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

// Maximum number of gaps to display in compact view
const MAX_DISPLAYED_GAPS = 3;

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
        className="p-md"
        role="region"
        aria-label={getWidgetAriaDescription(
          "Compliance Status",
          "Status of compliance with regulatory frameworks and industry standards"
        )}
      >
        {/* Overall Compliance Status - Compact */}
        <section 
          className="mb-md"
          aria-labelledby="overall-compliance-heading"
        >
          <div className="grid grid-cols-2 gap-sm mb-sm">
            <div className="p-sm bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light/30 dark:border-info-dark/30">
              <div className="text-caption text-info-dark dark:text-info-light font-medium mb-xs">Compliance Status</div>
              <div className="text-body-lg font-bold text-info-dark dark:text-info-light">
                {statusText}
              </div>
            </div>
            <div className="p-sm bg-success-light/10 dark:bg-success-dark/20 rounded-md border border-success-light/30 dark:border-success-dark/30">
              <div className="text-caption text-success-dark dark:text-success-light font-medium mb-xs">Score</div>
              <div className="flex items-center">
                <div className="text-body-lg font-bold text-success-dark dark:text-success-light mr-sm" data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE}>
                  {complianceStatus?.complianceScore ?? 0}%
                </div>
                <StatusBadge
                  status={getBadgeStatus(complianceStatus?.complianceScore ?? 0)}
                  testId={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE}
                >
                  {getBadgeStatus(complianceStatus?.complianceScore ?? 0)}
                </StatusBadge>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          {complianceStatus && (
            <div 
              className="relative h-1.5 rounded-full bg-info-light/20 dark:bg-info-dark overflow-hidden"
              role="progressbar"
              aria-valuenow={complianceStatus.complianceScore ?? 0}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Compliance score: ${complianceStatus.complianceScore ?? 0} percent`}
            >
              <div
                style={{ width: `${complianceStatus.complianceScore ?? 0}%` }}
                className="h-full bg-info dark:bg-info-light"
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE_BAR}
              ></div>
            </div>
          )}
        </section>

        {/* Framework Status - Horizontal Badge Layout */}
        {complianceStatus && (
          <div className="mb-md">
            <h3 className="text-body-lg font-medium mb-sm">Framework Status</h3>
            
            {/* Compliant Frameworks - Horizontal badges */}
            {complianceStatus.compliantFrameworks.length > 0 && (
              <div className="mb-sm">
                <div className="text-caption text-success-dark dark:text-success-light font-medium mb-xs">✓ Compliant</div>
                <div className="flex flex-wrap gap-xs" data-testid={COMPLIANCE_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}>
                  {complianceStatus.compliantFrameworks.map((framework, index) => (
                    <button
                      key={framework}
                      onClick={() => setActiveFramework(framework)}
                      className={cn(
                        "px-sm py-xs rounded-md text-caption font-medium transition-all",
                        "bg-success-light/20 dark:bg-success-dark/30 text-success-dark dark:text-success-light",
                        "border border-success-light/50 dark:border-success-dark/50",
                        "hover:bg-success-light/30 dark:hover:bg-success-dark/40",
                        activeFramework === framework && "ring-2 ring-success dark:ring-success-light"
                      )}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-${index}`}
                    >
                      {framework}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Partially Compliant - Horizontal badges */}
            {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
              <div className="mb-sm">
                <div className="text-caption text-warning-dark dark:text-warning-light font-medium mb-xs">⚠ Partial</div>
                <div className="flex flex-wrap gap-xs" data-testid={COMPLIANCE_TEST_IDS.PARTIALLY_COMPLIANT_FRAMEWORKS_LIST}>
                  {complianceStatus.partiallyCompliantFrameworks.map((framework, index) => (
                    <button
                      key={framework}
                      onClick={() => setActiveFramework(framework)}
                      className={cn(
                        "px-sm py-xs rounded-md text-caption font-medium transition-all",
                        "bg-warning-light/20 dark:bg-warning-dark/30 text-warning-dark dark:text-warning-light",
                        "border border-warning-light/50 dark:border-warning-dark/50",
                        "hover:bg-warning-light/30 dark:hover:bg-warning-dark/40",
                        activeFramework === framework && "ring-2 ring-warning dark:ring-warning-light"
                      )}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-partial-${index}`}
                    >
                      {framework}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Non-Compliant - Horizontal badges */}
            {complianceStatus.nonCompliantFrameworks.length > 0 && (
              <div className="mb-sm">
                <div className="text-caption text-error-dark dark:text-error-light font-medium mb-xs">✗ Non-Compliant</div>
                <div className="flex flex-wrap gap-xs" data-testid={COMPLIANCE_TEST_IDS.NON_COMPLIANT_FRAMEWORKS_LIST}>
                  {complianceStatus.nonCompliantFrameworks.map((framework, index) => (
                    <button
                      key={framework}
                      onClick={() => setActiveFramework(framework)}
                      className={cn(
                        "px-sm py-xs rounded-md text-caption font-medium transition-all",
                        "bg-error-light/20 dark:bg-error-dark/30 text-error-dark dark:text-error-light",
                        "border border-error-light/50 dark:border-error-dark/50",
                        "hover:bg-error-light/30 dark:hover:bg-error-dark/40",
                        activeFramework === framework && "ring-2 ring-error dark:ring-error-light"
                      )}
                      data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-non-${index}`}
                    >
                      {framework}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Framework Gap Analysis - Compact */}
        {activeFramework && (
          <div className="mb-md">
            <div className="p-sm bg-neutral-light/5 dark:bg-neutral-dark/10 rounded-md border border-neutral-light/20 dark:border-neutral-dark/20">
              <h3 className="text-body-lg font-medium mb-sm">{activeFramework} Gap Analysis</h3>
              
              {gapAnalysis ? (
                <div className="space-y-sm">
                  {/* Status */}
                  <div className="text-caption text-neutral-dark dark:text-neutral-light">
                    {gapAnalysis.isCompliant
                      ? `✓ Meeting ${activeFramework} requirements`
                      : `✗ Not fully meeting ${activeFramework} requirements`}
                  </div>

                  {/* Component Requirements - Compact Grid */}
                  <div className="grid grid-cols-3 gap-xs">
                    {["availability", "integrity", "confidentiality"].map((comp) => {
                      const componentType = comp as CIAComponent;
                      const currentLevel =
                        componentType === "availability"
                          ? availabilityLevel
                          : componentType === "integrity"
                          ? integrityLevel
                          : confidentialityLevel;
                      const requiredLevel = getFrameworkRequiredLevel(activeFramework, componentType);
                      const isMeeting = getSecurityLevelValue(currentLevel) >= getSecurityLevelValue(requiredLevel);

                      return (
                        <div
                          key={comp}
                          className={cn(
                            "p-xs rounded text-caption",
                            isMeeting
                              ? "bg-success-light/10 dark:bg-success-dark/20 text-success-dark dark:text-success-light"
                              : "bg-error-light/10 dark:bg-error-dark/20 text-error-dark dark:text-error-light"
                          )}
                        >
                          <div className="font-medium mb-xs">
                            {componentType.charAt(0).toUpperCase() + componentType.slice(1)}
                          </div>
                          <div className="flex flex-col">
                            <span>{currentLevel}</span>
                            <span className="opacity-70">→ {requiredLevel}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Gaps and Recommendations - Compact */}
                  {gapAnalysis.gaps && gapAnalysis.gaps.length > 0 && (
                    <div className="text-caption text-error-dark dark:text-error-light">
                      <div className="font-medium mb-xs">Gaps:</div>
                      <ul className="space-y-xs pl-sm">
                        {gapAnalysis.gaps.slice(0, MAX_DISPLAYED_GAPS).map((gap, index) => (
                          <li key={index}>
                            • {typeof gap === "string" ? gap : gap.framework || gap.frameworkDescription || "Undefined gap"}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-caption text-neutral-dark/70 dark:text-neutral-light/70 py-sm">
                  No gap analysis available
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compliance Tips - Compact */}
        <div className="p-sm bg-info-light/5 dark:bg-info-dark/10 rounded-md border border-info-light/20 dark:border-info-dark/20">
          <div className="flex items-center mb-xs">
            <span className="text-info-dark dark:text-info-light mr-xs">💡</span>
            <h3 className="text-body font-medium">Tips</h3>
          </div>
          <ul className="text-caption text-neutral-dark dark:text-neutral-light space-y-xs pl-sm">
            {complianceStatus && complianceStatus.complianceScore ? (
              complianceStatus.complianceScore < 50 ? (
                <>
                  <li>• Focus on foundational security controls</li>
                  <li>• Prioritize multi-framework controls</li>
                </>
              ) : complianceStatus.complianceScore < 80 ? (
                <>
                  <li>• Address specific gaps in partial frameworks</li>
                  <li>• Implement regular compliance monitoring</li>
                </>
              ) : (
                <>
                  <li>• Maintain strong posture with regular reviews</li>
                  <li>• Prepare for upcoming regulatory changes</li>
                </>
              )
            ) : (
              <>
                <li>• Implement controls across all CIA components</li>
                <li>• Start with industry-relevant frameworks</li>
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
