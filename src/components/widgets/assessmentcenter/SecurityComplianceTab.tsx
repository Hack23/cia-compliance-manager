import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { ComplianceStatusType } from "../../../types/compliance";
import { getComplianceRequirementText } from "../../../utils/complianceTextUtils";
import { getComplianceStatusText } from "../../../utils/statusUtils";
import { WidgetClasses } from "../../../utils/tailwindClassHelpers";

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
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-compliance')} className="space-y-4">
      {/* Compliance introduction */}
      <div className="p-sm bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-sm">
        <p className="text-sm">
          This section summarizes your compliance status based on selected
          security levels, highlighting alignment with regulatory frameworks and
          standards.
        </p>
      </div>

      {/* Compliance Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Compliance Status Overview
        </h3>

        {!complianceStatus ? (
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-sm">
              <span className="font-medium">Compliance Score</span>
              <span className="text-subheading font-bold">{securityScore}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-sm">
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
              {getComplianceStatusText(securityScore)}
            </p>
          </div>
        ) : (
          <div className="p-sm bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between items-center mb-sm">
              <span className="font-medium">Compliance Score</span>
              <span className="text-subheading font-bold">
                {complianceStatus.complianceScore}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mb-sm">
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
                getComplianceStatusText(complianceStatus.complianceScore || 0)}
            </p>
          </div>
        )}
      </div>

      {/* Framework Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Framework Compliance Status
        </h3>

        {!complianceStatus ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Detailed compliance information is not available.
          </p>
        ) : (
          <div className={WidgetClasses.grid2Cols}>
            <div className="p-sm bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg">
              <h4 className="font-medium text-green-700 dark:text-green-300 flex items-center justify-between">
                <span>Compliant</span>
                <span className="text-sm bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded-full">
                  {complianceStatus.compliantFrameworks.length}
                </span>
              </h4>
              {complianceStatus.compliantFrameworks.length > 0 ? (
                <ul className="mt-sm space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {complianceStatus.compliantFrameworks.map(
                    (framework, idx) => (
                      <li key={`compliant-${idx}`}>{framework}</li>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-sm text-sm text-gray-600 dark:text-gray-400 italic">
                  No fully compliant frameworks
                </p>
              )}
            </div>

            <div className="p-sm bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
              <h4 className="font-medium text-yellow-700 dark:text-yellow-300 flex items-center justify-between">
                <span>Partially Compliant</span>
                <span className="text-sm bg-yellow-100 dark:bg-yellow-800 px-2 py-0.5 rounded-full">
                  {complianceStatus.partiallyCompliantFrameworks.length}
                </span>
              </h4>
              {complianceStatus.partiallyCompliantFrameworks.length > 0 ? (
                <ul className="mt-sm space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                  {complianceStatus.partiallyCompliantFrameworks.map(
                    (framework, idx) => (
                      <li key={`partial-${idx}`}>{framework}</li>
                    )
                  )}
                </ul>
              ) : (
                <p className="mt-sm text-sm text-gray-600 dark:text-gray-400 italic">
                  No partially compliant frameworks
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Component Requirements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-sm text-gray-800 dark:text-gray-100">
          Component Compliance Requirements
        </h3>

        <div className={WidgetClasses.grid3Cols}>
          {/* Confidentiality compliance */}
          <div className="p-sm bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded">
            <h5 className="text-sm font-medium mb-xs text-purple-700 dark:text-purple-300">
              Confidentiality
            </h5>
            <p className="text-xs">
              <span className="font-medium">Level:</span> {confidentialityLevel}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-xs">
              {getComplianceRequirementText(
                "confidentiality",
                confidentialityLevel
              )}
            </p>
          </div>

          {/* Integrity compliance */}
          <div className="p-sm bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded">
            <h5 className="text-sm font-medium mb-xs text-green-700 dark:text-green-300">
              Integrity
            </h5>
            <p className="text-xs">
              <span className="font-medium">Level:</span> {integrityLevel}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-xs">
              {getComplianceRequirementText("integrity", integrityLevel)}
            </p>
          </div>

          {/* Availability compliance */}
          <div className="p-sm bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded">
            <h5 className="text-sm font-medium mb-xs text-blue-700 dark:text-blue-300">
              Availability
            </h5>
            <p className="text-xs">
              <span className="font-medium">Level:</span> {availabilityLevel}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-xs">
              {getComplianceRequirementText("availability", availabilityLevel)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
