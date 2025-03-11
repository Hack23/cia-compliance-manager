import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { FRAMEWORK_TEST_IDS } from "../../constants/testIds";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";
import { normalizeSecurityLevel } from "../../utils/securityLevelUtils";

// Define types for compliance data returned from service
interface ComplianceData {
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  requirements?: string[];
  remediationSteps?: string[];
}

/**
 * ComplianceStatusWidgetProps interface for the compliance status widget props
 */
export interface ComplianceStatusWidgetProps {
  securityLevel?: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ComplianceStatusWidget displays the compliance status based on selected security levels
 * It shows compliant, partially compliant, and non-compliant frameworks
 */
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel = "None",
  integrityLevel = "None",
  confidentialityLevel = "None",
  className = "",
  testId = FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}) => {
  // Normalize security levels
  const safeAvailability = normalizeSecurityLevel(availabilityLevel);
  const safeIntegrity = normalizeSecurityLevel(integrityLevel);
  const safeConfidentiality = normalizeSecurityLevel(confidentialityLevel);

  // Get compliance data based on security levels
  const complianceData = useMemo(
    () =>
      ciaContentService.getComplianceStatus(
        safeAvailability,
        safeIntegrity,
        safeConfidentiality
      ),
    [safeAvailability, safeIntegrity, safeConfidentiality]
  );

  // Calculate overall compliance score based on the number of compliant frameworks
  const calculateComplianceScore = (data: ComplianceData): number => {
    const totalFrameworks =
      data.compliantFrameworks.length +
      data.partiallyCompliantFrameworks.length +
      data.nonCompliantFrameworks.length;

    if (totalFrameworks === 0) return 0;

    // Full compliance = 1 point, partial = 0.5 points
    const score =
      (data.compliantFrameworks.length +
        data.partiallyCompliantFrameworks.length * 0.5) /
      totalFrameworks;

    return Math.round(score * 100);
  };

  const complianceScore = calculateComplianceScore(complianceData);

  // Get status badge variant based on compliance score
  const getComplianceStatusVariant = (
    score: number
  ): "success" | "warning" | "error" | "info" => {
    if (score >= 75) return "success";
    if (score >= 50) return "info";
    if (score >= 25) return "warning";
    return "error";
  };

  return (
    <WidgetContainer
      title="Compliance Status"
      icon="📋"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Compliance Score Card */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium">Compliance Status</h3>
            <StatusBadge
              status={getComplianceStatusVariant(complianceScore)}
              size="lg"
              testId={FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}
            >
              {complianceScore}%
            </StatusBadge>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Based on your selected security levels: {safeAvailability}{" "}
            Availability, {safeIntegrity} Integrity, and {safeConfidentiality}{" "}
            Confidentiality.
          </p>
        </div>

        {/* Compliant Frameworks */}
        <div className="p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-10 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-medium mb-2 flex items-center text-green-700 dark:text-green-400">
            <span className="mr-2">✓</span>
            Compliant Frameworks
          </h4>

          {complianceData.compliantFrameworks.length > 0 ? (
            <ul
              className="list-disc list-inside space-y-1"
              data-testid={FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
            >
              {complianceData.compliantFrameworks.map((framework, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <StatusBadge status="success" size="xs" className="mr-2">
                    Compliant
                  </StatusBadge>
                  {framework.replace(/_/g, " ")}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No compliant frameworks at current security levels.
            </p>
          )}
        </div>

        {/* Partially Compliant Frameworks */}
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-10 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h4 className="font-medium mb-2 flex items-center text-yellow-700 dark:text-yellow-400">
            <span className="mr-2">⚠️</span>
            Partially Compliant Frameworks
          </h4>

          {complianceData.partiallyCompliantFrameworks.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {complianceData.partiallyCompliantFrameworks.map(
                (framework, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                  >
                    <StatusBadge status="warning" size="xs" className="mr-2">
                      Partial
                    </StatusBadge>
                    {framework.replace(/_/g, " ")}
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No partially compliant frameworks at current security levels.
            </p>
          )}
        </div>

        {/* Non-Compliant Frameworks */}
        <div className="p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-10 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="font-medium mb-2 flex items-center text-red-700 dark:text-red-400">
            <span className="mr-2">❌</span>
            Non-Compliant Frameworks
          </h4>

          {complianceData.nonCompliantFrameworks.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {complianceData.nonCompliantFrameworks.map((framework, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <StatusBadge status="error" size="xs" className="mr-2">
                    Non-Compliant
                  </StatusBadge>
                  {framework.replace(/_/g, " ")}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No non-compliant frameworks at current security levels.
            </p>
          )}
        </div>

        {/* Remediation Steps (if available) */}
        {complianceData.remediationSteps &&
          complianceData.remediationSteps.length > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-10 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium mb-2 flex items-center text-blue-700 dark:text-blue-400">
                <span className="mr-2">🛠️</span>
                Remediation Steps
              </h4>

              <ul
                className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300"
                data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}
              >
                {complianceData.remediationSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </WidgetContainer>
  );
};

export default ComplianceStatusWidget;
