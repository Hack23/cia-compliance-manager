import React, { useMemo } from "react";
import { COMPLIANCE_TEST_IDS } from "../../constants/testIds";
import { useCIAOptions } from "../../hooks/useCIAOptions";
import { ComplianceService } from "../../services/complianceService";
import { SecurityLevel } from "../../types/cia";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

// Define a proper interface for framework objects
interface ComplianceFramework {
  id: string;
  name: string;
  status: string;
  description?: string;
}

// Define the compliance status response type
interface ComplianceStatusResponse {
  status: string;
  label?: string;
  complianceScore: number;
  compliantFrameworks: ComplianceFramework[];
  partiallyCompliantFrameworks: ComplianceFramework[];
  nonCompliantFrameworks: ComplianceFramework[];
  remediationSteps?: string[];
  requirements?: string[];
}

/**
 * Interface for component props
 */
interface ComplianceStatusWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityLevel?: SecurityLevel;
  testId?: string;
}

/**
 * Compliance Status Widget Component
 *
 * Displays the compliance status for various frameworks based on
 * the selected security levels across the CIA triad.
 *
 * ## Business Perspective
 *
 * This widget helps organizations understand their regulatory
 * compliance posture based on their security controls, identifying
 * frameworks they comply with and those requiring remediation. 📋
 *
 * The visual status indicators make it easy for compliance officers
 * and executives to quickly assess compliance status across multiple
 * regulatory frameworks.
 *
 * @param props - Component props
 * @returns React component
 */
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  testId = COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}) => {
  // Get options from hook
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  // Create compliance service instance
  const complianceService = useMemo(() => {
    return new ComplianceService({
      availabilityOptions,
      integrityOptions,
      confidentialityOptions,
      roiEstimates: {
        NONE: { returnRate: "0%", description: "No return" },
        LOW: { returnRate: "50%", description: "Low return" },
        MODERATE: { returnRate: "150%", description: "Moderate return" },
        HIGH: { returnRate: "300%", description: "High return" },
        VERY_HIGH: { returnRate: "500%", description: "Maximum return" },
      },
    });
  }, [availabilityOptions, integrityOptions, confidentialityOptions]);

  // Get compliance status with proper typing
  const complianceStatus = useMemo(
    () => {
      const rawStatus = complianceService.getComplianceStatus(
        availabilityLevel || "Moderate",
        integrityLevel || "Moderate",
        confidentialityLevel || "Moderate"
      );
      
      // Transform string arrays to ComplianceFramework arrays if needed
      return {
        status: rawStatus.status,
        label: rawStatus.status, // Default label to status if not provided
        complianceScore: rawStatus.complianceScore,
        remediationSteps: rawStatus.remediationSteps || [],
        requirements: rawStatus.requirements || [],
        // Convert string arrays to ComplianceFramework objects
        compliantFrameworks: rawStatus.compliantFrameworks.map((f) => {
          return typeof f === "string"
            ? { id: f, name: f, status: "compliant" }
            : f as ComplianceFramework;
        }),
        partiallyCompliantFrameworks: rawStatus.partiallyCompliantFrameworks.map((f) => {
          return typeof f === "string"
            ? { id: f, name: f, status: "partial" }
            : f as ComplianceFramework;
        }),
        nonCompliantFrameworks: rawStatus.nonCompliantFrameworks.map((f) => {
          return typeof f === "string"
            ? { id: f, name: f, status: "non-compliant" }
            : f as ComplianceFramework;
        }),
      } as ComplianceStatusResponse;
    },
    [complianceService, availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Helper function to get framework description
  const getFrameworkDescription = (framework: ComplianceFramework | string): string => {
    if (typeof framework === 'string') {
      return complianceService.getFrameworkDescription(framework);
    }
    return framework.description || `Framework for ${framework.name}`;
  };

  // Convert status badge variant to Status Badge component variant
  const getStatusBadgeVariant = (status: string): "success" | "warning" | "error" | "info" | "neutral" => {
    switch(status.toLowerCase()) {
      case "compliant":
        return "success";
      case "partially compliant":
      case "partial":
        return "warning";
      case "non-compliant":
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <WidgetContainer title="Compliance Status" testId={testId}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-lg font-semibold"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_TITLE}
          >
            Overall Status
          </h3>
          <StatusBadge 
            status={getStatusBadgeVariant(complianceStatus.status)}
          >
            {complianceStatus.label || complianceStatus.status}
          </StatusBadge>
        </div>
        <p
          className="text-gray-600 dark:text-gray-300 mt-2"
          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_DESCRIPTION}
        >
          Based on your current security levels (A: {availabilityLevel}, I:{" "}
          {integrityLevel}, C: {confidentialityLevel})
        </p>
        <div className="mt-2">
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-3 rounded">
            <span className="text-sm font-medium">Compliance Score: </span>
            <span
              className="font-bold"
              data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_SCORE}
            >
              {complianceStatus.complianceScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Compliant Frameworks */}
      {complianceStatus.compliantFrameworks.length > 0 && (
        <div
          className="mb-4"
          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_COMPLIANT_FRAMEWORKS}
        >
          <h3 className="text-md font-semibold mb-2">Compliant Frameworks</h3>
          <div className="space-y-2">
            {complianceStatus.compliantFrameworks.map((framework) => (
              <div
                key={`compliant-${typeof framework === 'string' ? framework : framework.id || framework.name}`}
                className="p-2 bg-green-50 dark:bg-green-800 dark:bg-opacity-30 rounded border-l-4 border-green-500"
                data-testid={`${COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}-${typeof framework === 'string' ? framework : framework.name}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StatusBadge
                      status={getStatusBadgeVariant(typeof framework === 'string' ? 'compliant' : framework.status)}
                      size="sm"
                    >
                      {typeof framework === 'string' ? framework : framework.name}
                    </StatusBadge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {getFrameworkDescription(framework)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partially Compliant Frameworks */}
      {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
        <div
          className="mb-4"
          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_PARTIAL_FRAMEWORKS}
        >
          <h3 className="text-md font-semibold mb-2">
            Partially Compliant Frameworks
          </h3>
          <div className="space-y-2">
            {complianceStatus.partiallyCompliantFrameworks.map((framework) => (
              <div
                key={`partial-${typeof framework === 'string' ? framework : framework.id || framework.name}`}
                className="p-2 bg-yellow-50 dark:bg-yellow-800 dark:bg-opacity-30 rounded border-l-4 border-yellow-500"
                data-testid={`${COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}-${typeof framework === 'string' ? framework : framework.name}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StatusBadge
                      status={getStatusBadgeVariant(typeof framework === 'string' ? 'partial' : framework.status)}
                      size="sm"
                    >
                      {typeof framework === 'string' ? framework : framework.name}
                    </StatusBadge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {getFrameworkDescription(framework)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Non-Compliant Frameworks */}
      {complianceStatus.nonCompliantFrameworks.length > 0 && (
        <div
          className="mb-4"
          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_NONCOMPLIANT_FRAMEWORKS}
        >
          <h3 className="text-md font-semibold mb-2">
            Non-Compliant Frameworks
          </h3>
          <div className="space-y-2">
            {complianceStatus.nonCompliantFrameworks.map((framework) => (
              <div
                key={`non-compliant-${typeof framework === 'string' ? framework : framework.id || framework.name}`}
                className="p-2 bg-red-50 dark:bg-red-800 dark:bg-opacity-30 rounded border-l-4 border-red-500"
                data-testid={`${COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}-${typeof framework === 'string' ? framework : framework.name}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <StatusBadge
                      status={getStatusBadgeVariant(typeof framework === 'string' ? 'non-compliant' : framework.status)}
                      size="sm"
                    >
                      {typeof framework === 'string' ? framework : framework.name}
                    </StatusBadge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {getFrameworkDescription(framework)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remediation Steps */}
      {complianceStatus.remediationSteps &&
        complianceStatus.remediationSteps.length > 0 && (
          <div
            className="mt-4"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_REMEDIATION}
          >
            <h3 className="text-md font-semibold mb-2">Remediation Steps</h3>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <ul className="list-disc pl-5 space-y-1">
                {complianceStatus.remediationSteps.map((step, index) => (
                  <li key={`step-${index}`} className="text-sm">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      {/* Compliance Requirements */}
      {complianceStatus.requirements &&
        complianceStatus.requirements.length > 0 && (
          <div
            className="mt-4"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_REQUIREMENTS}
          >
            <h3 className="text-md font-semibold mb-2">
              Framework Requirements
            </h3>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
              <ul className="list-disc pl-5 space-y-1">
                {complianceStatus.requirements.map((req, index) => (
                  <li key={`req-${index}`} className="text-sm">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </WidgetContainer>
  );
};

/**
 * Get the overall status variant based on compliance status
 */
function getOverallStatusVariant(status: {
  compliantFrameworks: ComplianceFramework[];
  partiallyCompliantFrameworks: ComplianceFramework[];
  nonCompliantFrameworks: ComplianceFramework[];
}): "compliant" | "partial" | "non-compliant" {
  const {
    compliantFrameworks,
    partiallyCompliantFrameworks,
    nonCompliantFrameworks,
  } = status;

  // If there are no frameworks at all, return non-compliant
  const totalFrameworks =
    compliantFrameworks.length +
    partiallyCompliantFrameworks.length +
    nonCompliantFrameworks.length;
  if (totalFrameworks === 0) return "non-compliant";

  // If all frameworks are compliant
  if (compliantFrameworks.length === totalFrameworks) return "compliant";

  // If there are no non-compliant frameworks but some partial
  if (
    nonCompliantFrameworks.length === 0 &&
    partiallyCompliantFrameworks.length > 0
  )
    return "partial";

  // If there are any non-compliant frameworks
  if (nonCompliantFrameworks.length > 0) return "non-compliant";

  return "partial";
}

export default ComplianceStatusWidget;
