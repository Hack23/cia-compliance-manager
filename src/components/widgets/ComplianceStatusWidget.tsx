import React, { useMemo } from "react";
import { SecurityLevel } from "../../types/cia";
import { FRAMEWORK_TEST_IDS } from "../../constants/testIds";
import { COMPLIANCE_FRAMEWORKS } from "../../constants/appConstants";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";

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
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ComplianceStatusWidget shows compliance status with various frameworks
 * based on the selected security levels
 */
const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}) => {
  // Get compliance data from ciaContentService or create mock data if service method doesn't exist
  const complianceData = useMemo<ComplianceData>(() => {
    // Check if method exists, otherwise use mock data
    if (typeof ciaContentService.getComplianceStatus === "function") {
      return ciaContentService.getComplianceStatus(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      );
    }

    // Mock data if service method doesn't exist
    return {
      compliantFrameworks:
        availabilityLevel === "High" &&
        integrityLevel === "High" &&
        confidentialityLevel === "High"
          ? Object.keys(COMPLIANCE_FRAMEWORKS)
          : ["SOC2"],
      partiallyCompliantFrameworks: ["ISO27001", "PCI_DSS"],
      nonCompliantFrameworks: ["HIPAA", "NIST"],
      requirements: [
        "Data encryption at rest",
        "Access controls",
        "Regular security assessments",
      ],
      remediationSteps: [
        "Implement encryption",
        "Set up access control",
        "Schedule security audits",
      ],
    };
  }, [availabilityLevel, integrityLevel, confidentialityLevel]);

  // Extract compliance frameworks and status
  const {
    compliantFrameworks,
    partiallyCompliantFrameworks,
    nonCompliantFrameworks,
  } = useMemo(() => {
    return {
      compliantFrameworks: complianceData.compliantFrameworks || [],
      partiallyCompliantFrameworks:
        complianceData.partiallyCompliantFrameworks || [],
      nonCompliantFrameworks: complianceData.nonCompliantFrameworks || [],
    };
  }, [complianceData]);

  // Determine overall compliance status
  const overallStatus = useMemo(() => {
    if (
      nonCompliantFrameworks.length ===
      Object.keys(COMPLIANCE_FRAMEWORKS).length
    ) {
      return "Non-Compliant";
    } else if (
      compliantFrameworks.length === Object.keys(COMPLIANCE_FRAMEWORKS).length
    ) {
      return "Fully Compliant";
    } else if (compliantFrameworks.length > 0) {
      return "Partially Compliant";
    } else {
      return "Non-Compliant";
    }
  }, [compliantFrameworks.length, nonCompliantFrameworks.length]);

  // Get the appropriate status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Fully Compliant":
        return "success";
      case "Partially Compliant":
        return "warning";
      case "Non-Compliant":
        return "error";
      default:
        return "neutral";
    }
  };

  return (
    <WidgetContainer
      title="Compliance Status"
      icon="✅"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Overall Status */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Overall Status</h3>
          <StatusBadge
            status={getStatusVariant(overallStatus)}
            testId={FRAMEWORK_TEST_IDS.COMPLIANCE_STATUS_BADGE}
          >
            {overallStatus}
          </StatusBadge>
        </div>

        {/* Compliant Frameworks */}
        <div data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_FRAMEWORKS_CONTAINER}>
          <h4 className="text-md font-medium mb-3">Framework Compliance</h4>

          {compliantFrameworks.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">
                Compliant Frameworks
              </h5>
              <ul
                className="space-y-2 text-gray-600 dark:text-gray-300"
                data-testid={FRAMEWORK_TEST_IDS.COMPLIANT_FRAMEWORKS_LIST}
              >
                {compliantFrameworks.map((framework: string, index: number) => (
                  <li
                    key={framework}
                    className="flex items-center"
                    data-testid={`${FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-${index}`}
                  >
                    <span className="mr-2 text-green-600 dark:text-green-400">
                      ✓
                    </span>
                    <span>
                      {
                        COMPLIANCE_FRAMEWORKS[
                          framework as keyof typeof COMPLIANCE_FRAMEWORKS
                        ]
                      }
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Partially Compliant Frameworks */}
          {partiallyCompliantFrameworks.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-400 mb-2">
                Partially Compliant Frameworks
              </h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {partiallyCompliantFrameworks.map(
                  (framework: string, index: number) => (
                    <li
                      key={framework}
                      className="flex items-center"
                      data-testid={`${FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-partial-${index}`}
                    >
                      <span className="mr-2 text-yellow-600 dark:text-yellow-400">
                        ⚠️
                      </span>
                      <span>
                        {
                          COMPLIANCE_FRAMEWORKS[
                            framework as keyof typeof COMPLIANCE_FRAMEWORKS
                          ]
                        }
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Non-Compliant Frameworks */}
          {nonCompliantFrameworks.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">
                Non-Compliant Frameworks
              </h5>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {nonCompliantFrameworks.map(
                  (framework: string, index: number) => (
                    <li
                      key={framework}
                      className="flex items-center"
                      data-testid={`${FRAMEWORK_TEST_IDS.FRAMEWORK_ITEM_PREFIX}-non-${index}`}
                    >
                      <span className="mr-2 text-red-600 dark:text-red-400">
                        ✗
                      </span>
                      <span>
                        {
                          COMPLIANCE_FRAMEWORKS[
                            framework as keyof typeof COMPLIANCE_FRAMEWORKS
                          ]
                        }
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Compliance Requirements - show when frameworks are compliant */}
        {complianceData.requirements &&
          complianceData.requirements.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2">
                Compliance Requirements Met
              </h4>
              <ul
                className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300"
                data-testid={FRAMEWORK_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}
              >
                {complianceData.requirements?.map(
                  (requirement: string, index: number) => (
                    <li key={index}>{requirement}</li>
                  )
                )}
              </ul>
            </div>
          )}

        {/* Remediation Steps - show when not fully compliant */}
        {complianceData.remediationSteps &&
          complianceData.remediationSteps.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2 flex items-center">
                <span className="mr-2">🔍</span>
                Steps to Improve Compliance
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {complianceData.remediationSteps?.map(
                  (step: string, index: number) => (
                    <li key={index}>{step}</li>
                  )
                )}
              </ul>
            </div>
          )}
      </div>
    </WidgetContainer>
  );
};

export default ComplianceStatusWidget;
