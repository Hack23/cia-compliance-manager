import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { SECURITY_SUMMARY_TEST_IDS } from "../../../constants/testIds";
import { useCIAOptions } from "../../../hooks/useCIAOptions";
import { SecurityLevel } from "../../../types/cia";
import {
  calculateOverallSecurityLevel,
  getRiskLevelFromSecurityLevel,
} from "../../../utils/securityLevelUtils";
import SecurityLevelIndicator from "../../common/SecurityLevelIndicator";
import StatusBadge from "../../common/StatusBadge";
import WidgetContainer from "../../common/WidgetContainer";

// Import the StatusType from our types
import { StatusType } from "../../../types/common/StatusTypes";

/**
 * SecuritySummaryWidget props
 */
export interface SecuritySummaryWidgetProps {
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
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID
   */
  testId?: string;
}

/**
 * Displays a summary of all security levels and overall security posture
 *
 * ## Business Perspective
 *
 * This widget provides an at-a-glance view of the organization's security posture
 * across the CIA triad, helping security officers and executives quickly understand
 * their current security stance and identify areas that need attention. 📊
 *
 * The calculated compliance and risk metrics help align technical security controls
 * with business and regulatory requirements. 💼
 */
const SecuritySummaryWidget: React.FC<SecuritySummaryWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = SECURITY_SUMMARY_TEST_IDS.WIDGET,
}) => {
  const { availabilityOptions, integrityOptions, confidentialityOptions } =
    useCIAOptions();

  // Calculate overall security level
  const overallSecurityLevel = useMemo(
    () =>
      calculateOverallSecurityLevel(
        availabilityLevel,
        integrityLevel,
        confidentialityLevel
      ),
    [availabilityLevel, integrityLevel, confidentialityLevel]
  );

  // Fix the return type to match our StatusType
  const getStatusVariant = (level: string): StatusType => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel === "none") return "error";
    if (normalizedLevel === "low") return "warning";
    if (normalizedLevel === "moderate") return "info";
    if (normalizedLevel === "high") return "success";
    if (normalizedLevel === "very high") {
      // Now this is a valid StatusType
      return "purple";
    }
    return "neutral";
  };

  return (
    <WidgetContainer
      title={WIDGET_TITLES.SECURITY_SUMMARY}
      icon={WIDGET_ICONS.SECURITY_SUMMARY}
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Overall Security Level</h3>
          <div
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.OVERALL_LEVEL}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Overall Security:
              </span>
              <SecurityLevelIndicator level={overallSecurityLevel} size="lg" />
            </div>
            <p
              className="mt-2 text-sm text-gray-600 dark:text-gray-400"
              data-testid={SECURITY_SUMMARY_TEST_IDS.SUMMARY_DESCRIPTION}
            >
              {`This security profile provides ${overallSecurityLevel.toLowerCase()} level protection based on your selected components.`}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-2">Component Security Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Availability Card */}
          <div
            className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">⏱️</span>
              <h4 className="font-medium">Availability</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_LEVEL}
              >
                <SecurityLevelIndicator level={availabilityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span data-testid={SECURITY_SUMMARY_TEST_IDS.AVAILABILITY_RISK}>
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(availabilityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(availabilityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>

          {/* Integrity Card */}
          <div
            className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">✓</span>
              <h4 className="font-medium">Integrity</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_LEVEL}
              >
                <SecurityLevelIndicator level={integrityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span data-testid={SECURITY_SUMMARY_TEST_IDS.INTEGRITY_RISK}>
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(integrityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(integrityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>

          {/* Confidentiality Card */}
          <div
            className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg"
            data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_CARD}
          >
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🔒</span>
              <h4 className="font-medium">Confidentiality</h4>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Level:
              </span>
              <span
                className="font-medium"
                data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_LEVEL}
              >
                <SecurityLevelIndicator level={confidentialityLevel} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Risk:
              </span>
              <span
                data-testid={SECURITY_SUMMARY_TEST_IDS.CONFIDENTIALITY_RISK}
              >
                <StatusBadge
                  status={getStatusVariant(
                    getRiskLevelFromSecurityLevel(confidentialityLevel)
                  )}
                  size="sm"
                >
                  {getRiskLevelFromSecurityLevel(confidentialityLevel)}
                </StatusBadge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default SecuritySummaryWidget;
