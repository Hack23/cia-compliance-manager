import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { COMPLIANCE_TEST_IDS } from "../../../constants/testIds";
import { useComplianceService } from "../../../hooks/useComplianceService";
import { ComplianceStatusDetails } from "../../../services/complianceService";
import { SecurityLevel } from "../../../types/cia";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Framework interface
 */
interface ComplianceFramework {
  id: string;
  name: string;
  description?: string;
  version?: string;
}

/**
 * Framework status interface
 */
interface FrameworkStatus {
  complianceLevel: string;
  description: string;
  gaps?: string[];
}

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
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Displays compliance status against various regulatory frameworks
 *
 * ## Business Perspective
 *
 * This widget shows organizations how their selected security controls align
 * with regulatory requirements, helping compliance officers identify gaps
 * and demonstrate adherence to key frameworks during audits. 📋
 */
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "compliance-status",
}) => {
  // Get compliance service
  const complianceService = useComplianceService();

  // Get compliance frameworks
  const frameworks = useMemo<ComplianceFramework[]>(() => {
    // Add type assertion until the service interface is updated
    return (complianceService as any).getComplianceFrameworks?.() || [];
  }, [complianceService]);

  // Calculate framework statuses
  const frameworkStatuses = useMemo(() => {
    return frameworks.map((framework: ComplianceFramework) => {
      // Add type assertion until the service interface is updated
      const status = (complianceService as any).getFrameworkStatus?.(
        framework.id,
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) || {
        complianceLevel: "non-compliant",
        description: "Unable to determine compliance status",
      };

      return {
        framework,
        status,
      };
    });
  }, [
    complianceService,
    frameworks,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Calculate overall compliance status
  const overallStatus = useMemo(() => {
    // Try to get the overall status directly if available
    try {
      const statusDetails = (complianceService as any).getComplianceStatus?.(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ) as ComplianceStatusDetails;

      if (statusDetails) {
        return (
          statusDetails.status ||
          (statusDetails.compliantFrameworks.length === 0
            ? "Non-Compliant"
            : statusDetails.compliantFrameworks.length ===
              frameworkStatuses.length
            ? "Fully Compliant"
            : "Partially Compliant")
        );
      }
    } catch (error) {
      console.error("Error getting compliance status:", error);
    }

    // Fallback to calculating from framework statuses
    const compliantCount = frameworkStatuses.filter(
      (fs: { status: FrameworkStatus }) =>
        fs.status.complianceLevel === "compliant"
    ).length;
    const partialCount = frameworkStatuses.filter(
      (fs: { status: FrameworkStatus }) =>
        fs.status.complianceLevel === "partially-compliant"
    ).length;

    if (compliantCount === frameworkStatuses.length) {
      return "Fully Compliant";
    } else if (compliantCount + partialCount === frameworkStatuses.length) {
      return "Partially Compliant";
    } else {
      return "Non-Compliant";
    }
  }, [
    complianceService,
    frameworkStatuses,
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
  ]);

  // Get badge status for overall compliance
  const getOverallBadgeStatus = useMemo(() => {
    if (overallStatus === "Fully Compliant") return "success";
    if (overallStatus === "Partially Compliant") return "warning";
    return "error";
  }, [overallStatus]);

  // Get badge status for a specific framework
  const getFrameworkBadgeStatus = (complianceLevel: string) => {
    if (complianceLevel === "compliant") return "success";
    if (complianceLevel === "partially-compliant") return "warning";
    return "error";
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.COMPLIANCE_STATUS}
      icon={WIDGET_ICONS.COMPLIANCE_STATUS}
      className={className}
      testId={testId}
    >
      <div className="p-4 space-y-4">
        {/* Overall compliance status */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">
            Overall Compliance Status
          </h3>
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <StatusBadge
              status={getOverallBadgeStatus}
              testId={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE}
            >
              {overallStatus}
            </StatusBadge>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {overallStatus === "Fully Compliant"
                ? "Your current security levels satisfy all major compliance frameworks."
                : overallStatus === "Partially Compliant"
                ? "Your security levels partially satisfy compliance requirements. Review gaps below."
                : "Your security levels do not meet minimum requirements for some frameworks."}
            </p>
          </div>
        </div>

        {/* Framework-specific compliance */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Framework Compliance</h3>
          <div
            className="space-y-3"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER}
          >
            {frameworkStatuses.map(
              ({
                framework,
                status,
              }: {
                framework: ComplianceFramework;
                status: FrameworkStatus;
              }) => (
                <div
                  key={framework.id}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  data-testid={`${COMPLIANCE_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-${framework.id}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{framework.name}</h4>
                    <StatusBadge
                      status={getFrameworkBadgeStatus(status.complianceLevel)}
                    >
                      {status.complianceLevel === "compliant"
                        ? "Compliant"
                        : status.complianceLevel === "partially-compliant"
                        ? "Partially Compliant"
                        : "Non-Compliant"}
                    </StatusBadge>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {status.description}
                  </p>
                  {status.gaps && status.gaps.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-red-600 dark:text-red-400">
                        Compliance Gaps:
                      </h5>
                      <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {status.gaps.map((gap: string, index: number) => (
                          <li key={index}>{gap}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Compliance recommendations */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-2">
            <span className="text-blue-500 dark:text-blue-400 mr-2">💡</span>
            <h3 className="font-medium">Recommendations</h3>
          </div>
          <ul className="text-sm space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
            {overallStatus !== "Fully Compliant" ? (
              <>
                <li>
                  Consider improving security levels to meet compliance
                  requirements
                </li>
                <li>
                  Focus on addressing specific gaps identified in each framework
                </li>
                <li>
                  Consult with a compliance specialist for detailed remediation
                  steps
                </li>
              </>
            ) : (
              <li>
                Maintain current security posture and regularly review for any
                updates to compliance frameworks
              </li>
            )}
          </ul>
        </div>
      </div>
    </WidgetContainer>
  );
};

// Export the component directly without HOC
export default ComplianceStatusWidget;
