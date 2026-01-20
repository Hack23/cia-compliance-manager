import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS, SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { StatusType } from "../../../types/common/StatusTypes";
import { getRiskLevelFromSecurityLevel } from "../../../utils/securityLevelUtils";
import {
  getIntegrityValidationLevel,
  getAvailabilityUptimeTarget,
} from "../../../utils/implementationUtils";
import { WidgetClasses, cn } from "../../../utils/tailwindClassHelpers";
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
    <div data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-overview')} className="space-y-xs">
      {/* Security Radar Chart */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-xs text-gray-800 dark:text-gray-100">
          Security Profile
        </h3>
        <div className="h-[200px]">
          <RadarChart
            availabilityLevel={availabilityLevel}
            integrityLevel={integrityLevel}
            confidentialityLevel={confidentialityLevel}
            testId={`${testId}-radar-chart`}
          />
        </div>
      </div>

      {/* Security Level Summary */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-xs text-gray-800 dark:text-gray-100">
          Security Components
        </h3>

        <div className={WidgetClasses.grid3Cols}>
          {/* Confidentiality Card */}
          <div
            className="p-xs bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD}
          >
            <div className="flex items-center mb-xs">
              <span className="text-body mr-xs text-purple-500 dark:text-purple-400" aria-hidden="true">
                🔒
              </span>
              <h4 className="text-caption font-medium text-purple-700 dark:text-purple-300">
                Confidentiality
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <SecurityLevelIndicator level={confidentialityLevel} size="sm" />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(confidentialityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(confidentialityLevel)}
              </StatusBadge>
            </div>
          </div>

          {/* Integrity Card */}
          <div
            className="p-xs bg-green-50 dark:bg-green-900/20 rounded border border-green-100 dark:border-green-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD}
          >
            <div className="flex items-center mb-xs">
              <span className="text-body mr-xs text-green-500 dark:text-green-400" aria-hidden="true">
                ✓
              </span>
              <h4 className="text-caption font-medium text-green-700 dark:text-green-300">
                Integrity
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <SecurityLevelIndicator level={integrityLevel} size="sm" />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(integrityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(integrityLevel)}
              </StatusBadge>
            </div>
          </div>

          {/* Availability Card */}
          <div
            className="p-xs bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-100 dark:border-blue-800"
            data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD}
          >
            <div className="flex items-center mb-xs">
              <span className="text-body mr-xs text-blue-500 dark:text-blue-400" aria-hidden="true">
                ⏱️
              </span>
              <h4 className="text-caption font-medium text-blue-700 dark:text-blue-300">
                Availability
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <SecurityLevelIndicator level={availabilityLevel} size="sm" />
              <StatusBadge
                status={getStatusVariant(
                  getRiskLevelFromSecurityLevel(availabilityLevel)
                )}
                size="sm"
              >
                {getRiskLevelFromSecurityLevel(availabilityLevel)}
              </StatusBadge>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Dashboard */}
      <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-sm bg-white dark:bg-gray-800">
        <h3 className="text-body-lg font-medium mb-xs text-gray-800 dark:text-gray-100">
          Key Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
          <div className="p-xs bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-xs text-gray-700 dark:text-gray-200">
              Complexity
            </div>
            <div className="text-body-lg font-bold">{implementationComplexity}</div>
          </div>

          <div className="p-xs bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-xs text-gray-700 dark:text-gray-200">Maturity</div>
            <div className="text-body-lg font-bold">{businessMaturityLevel}</div>
          </div>

          <div className="p-xs bg-gray-50 dark:bg-gray-700 rounded">
            <div className="text-xs font-medium mb-xs text-gray-700 dark:text-gray-200">Compliance</div>
            <div className="text-body-lg font-bold">
              {complianceScore || securityScore}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
