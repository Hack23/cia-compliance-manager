import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { ComplianceStatusType } from "../../../types/compliance";
import { getComplianceRequirementText } from "../../../utils/complianceTextUtils";
import { getComplianceStatusText } from "../../../utils/statusUtils";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";

/**
 * Props for SecurityComplianceTab component
 */
export interface SecurityComplianceTabProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  securityScore: number;
  complianceStatus: ComplianceStatusType | null;
  testId: string;
}

/**
 * Compliance tab component for SecuritySummaryWidget
 * Displays compliance status, framework alignment, and component requirements
 */
export const SecurityComplianceTab: React.FC<SecurityComplianceTabProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  securityScore,
  complianceStatus,
  testId,
}) => {
  return (
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-compliance')} className="space-y-sm">
      {/* Compliance introduction */}
      <div className="p-sm bg-blue-50 dark:bg-blue-900/20 rounded mb-sm">
        <p className="text-caption">
          Compliance status and framework alignment for your security levels.
        </p>
      </div>

      {/* Compliance Status */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Compliance Status
        </h3>

        {!complianceStatus ? (
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded">
            <div className="flex justify-between items-center mb-sm">
              <span className="text-caption font-medium">Score</span>
              <span className="text-body-lg font-bold">{securityScore}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  securityScore >= 80
                    ? "bg-green-500"
                    : securityScore >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded">
            <div className="flex justify-between items-center mb-sm">
              <span className="text-caption font-medium">Score</span>
              <span className="text-body-lg font-bold">
                {complianceStatus.complianceScore}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
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
          </div>
        )}
      </div>

      {/* Framework Status */}
      {complianceStatus && (
        <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
          <h3 className="text-body-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
            Framework Status
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <div className="p-sm bg-green-50 dark:bg-green-900/20 rounded">
              <h4 className="text-caption font-medium text-green-700 dark:text-green-300 flex items-center justify-between">
                <span>Compliant</span>
                <span className="text-xs bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded-full">
                  {complianceStatus.compliantFrameworks.length}
                </span>
              </h4>
              {complianceStatus.compliantFrameworks.length > 0 ? (
                <ul className="mt-sm space-y-sm list-disc list-inside text-xs text-gray-600 dark:text-gray-400">
                  {complianceStatus.compliantFrameworks.map(
                    (framework, idx) => (
                      <li key={`compliant-${idx}`}>{framework}</li>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-sm text-xs text-gray-600 dark:text-gray-400 italic">
                  None
                </p>
              )}
            </div>

            <div className="p-sm bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <h4 className="text-caption font-medium text-yellow-700 dark:text-yellow-300 flex items-center justify-between">
                <span>Partial</span>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded-full">
                  {complianceStatus.partiallyCompliantFrameworks.length}
                </span>
              </h4>
              {complianceStatus.partiallyCompliantFrameworks.length > 0 ? (
                <ul className="mt-sm space-y-sm list-disc list-inside text-xs text-gray-600 dark:text-gray-400">
                  {complianceStatus.partiallyCompliantFrameworks.map(
                    (framework, idx) => (
                      <li key={`partial-${idx}`}>{framework}</li>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-sm text-xs text-gray-600 dark:text-gray-400 italic">
                  None
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
