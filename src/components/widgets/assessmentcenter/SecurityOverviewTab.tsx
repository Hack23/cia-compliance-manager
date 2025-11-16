import React from "react";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import { getRiskLevelFromSecurityLevel } from "../../../utils/securityLevelUtils";
import {
  getIntegrityValidationLevel,
  getAvailabilityUptimeTarget,
} from "../../../utils/implementationUtils";
import RadarChart from "../../charts/RadarChart";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import StatusBadge from "../../common/StatusBadge";

/**
 * Props for SecurityOverviewTab component
 */
export interface SecurityOverviewTabProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  dataClassification: string;
  implementationComplexity: string;
  businessMaturityLevel: string;
  businessMaturityDescription: string;
  securityScore: number;
  complianceScore?: number;
  testId: string;
  getStatusVariant: (level: string) => StatusType;
}

/**
 * Overview tab component for SecuritySummaryWidget
 * Displays security profile radar chart and key metrics
 */
export const SecurityOverviewTab: React.FC<SecurityOverviewTabProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  dataClassification,
  implementationComplexity,
  businessMaturityLevel,
  businessMaturityDescription,
  securityScore,
  complianceScore,
  testId,
  getStatusVariant,
}) => {
  return (
    <div data-testid={`${testId}-content-overview`} className="space-y-4">
      {/* Security Radar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Security Profile
        </h3>
        <div className="h-[300px]">
          <RadarChart
            availabilityLevel={availabilityLevel}
            integrityLevel={integrityLevel}
            confidentialityLevel={confidentialityLevel}
            testId={`${testId}-radar-chart`}
          />
        </div>
      </div>

      {/* Security Level Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Security Components
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Confidentiality Card */}
          <div
            className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2 text-purple-500 dark:text-purple-400">
                🔒
              </span>
              <h4 className="font-medium text-purple-700 dark:text-purple-300">
                Confidentiality
              </h4>
            </div>
            <div className="flex items-center justify-between mb-1">
              <SecurityLevelIndicator level={confidentialityLevel} />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(confidentialityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(confidentialityLevel)}
              </StatusBadge>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Classification:{" "}
              <span className="font-medium">{dataClassification}</span>
            </div>
          </div>

          {/* Integrity Card */}
          <div
            className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2 text-green-500 dark:text-green-400">
                ✓
              </span>
              <h4 className="font-medium text-green-700 dark:text-green-300">
                Integrity
              </h4>
            </div>
            <div className="flex items-center justify-between mb-1">
              <SecurityLevelIndicator level={integrityLevel} />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(integrityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(integrityLevel)}
              </StatusBadge>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Validation Level:{" "}
              <span className="font-medium">
                {getIntegrityValidationLevel(integrityLevel)}
              </span>
            </div>
          </div>

          {/* Availability Card */}
          <div
            className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2 text-blue-500 dark:text-blue-400">
                ⏱️
              </span>
              <h4 className="font-medium text-blue-700 dark:text-blue-300">
                Availability
              </h4>
            </div>
            <div className="flex items-center justify-between mb-1">
              <SecurityLevelIndicator level={availabilityLevel} />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(availabilityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(availabilityLevel)}
              </StatusBadge>
            </div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Uptime Target:{" "}
              <span className="font-medium">
                {getAvailabilityUptimeTarget(availabilityLevel)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-100">
          Key Security Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">
              Implementation Complexity
            </div>
            <div className="text-lg font-bold">{implementationComplexity}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Based on combined security levels
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">Business Maturity</div>
            <div className="text-lg font-bold">{businessMaturityLevel}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {businessMaturityDescription}
            </div>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-1">Compliance Status</div>
            <div className="text-lg font-bold">
              {complianceScore || securityScore}%
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Overall compliance alignment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
