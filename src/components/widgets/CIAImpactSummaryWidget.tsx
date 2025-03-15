import React from "react";
import { SecurityLevel } from "../../types/cia";
import ciaContentService from "../../services/ciaContentService";
import WidgetContainer from "../common/WidgetContainer";
import StatusBadge from "../common/StatusBadge";
import KeyValuePair from "../common/KeyValuePair";
import SecurityLevelSummaryItem from "../common/SecurityLevelSummaryItem";
import { CIA_COMPONENT_COLORS } from "../../constants/colorConstants";
import { CIA_COMPONENT_ICONS, CIA_LABELS } from "../../constants/appConstants";
import { calculateOverallSecurityLevel } from "../../types/cia";
import { getSecurityLevelBadgeVariant } from "../../utils/securityLevelUtils";

/**
 * Props for CIAImpactSummaryWidget component
 */
export interface CIAImpactSummaryWidgetProps {
  confidentialityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  availabilityLevel: SecurityLevel;
  // Add aliases for test compatibility
  confidentiality?: SecurityLevel;
  integrity?: SecurityLevel;
  availability?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * CIAImpactSummaryWidget shows a consolidated view of all three CIA pillars
 * with consistent UI/UX styling and color schemes.
 */
const CIAImpactSummaryWidget: React.FC<CIAImpactSummaryWidgetProps> = ({
  // Support both property naming styles with fallbacks
  confidentialityLevel,
  integrityLevel,
  availabilityLevel,
  confidentiality,
  integrity,
  availability,
  className = "",
  testId = "cia-impact-summary-widget",
}) => {
  // Use the provided value or fallback to the alternative property name
  const actualConfidentialityLevel =
    confidentialityLevel || confidentiality || ("None" as SecurityLevel);
  const actualIntegrityLevel =
    integrityLevel || integrity || ("None" as SecurityLevel);
  const actualAvailabilityLevel =
    availabilityLevel || availability || ("None" as SecurityLevel);

  // Get component details for each pillar
  const confidentialityDetails = ciaContentService.getComponentDetails(
    "confidentiality",
    actualConfidentialityLevel
  );

  const integrityDetails = ciaContentService.getComponentDetails(
    "integrity",
    actualIntegrityLevel
  );

  const availabilityDetails = ciaContentService.getComponentDetails(
    "availability",
    actualAvailabilityLevel
  );

  // Calculate overall security level based on the three components
  const overallSecurityLevel = calculateOverallSecurityLevel(
    actualAvailabilityLevel,
    actualIntegrityLevel,
    actualConfidentialityLevel
  );

  return (
    <WidgetContainer
      title="CIA Security Impact Summary"
      icon="🔐"
      className={className}
      testId={testId}
    >
      <div className="space-y-6">
        {/* Overall Security Level */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <span className="mr-2">🛡️</span>
            Overall Security Profile
          </h3>
          <div className="flex items-center">
            <StatusBadge
              status={getSecurityLevelBadgeVariant(overallSecurityLevel)}
              className="mr-2"
            >
              {overallSecurityLevel}
            </StatusBadge>
            <span className="text-gray-600 dark:text-gray-300">
              Security Level
            </span>
          </div>
        </div>

        {/* CIA Component Summary */}
        <div className="flex flex-wrap gap-2 mb-4">
          <SecurityLevelSummaryItem
            label={CIA_LABELS.CONFIDENTIALITY}
            value={actualConfidentialityLevel}
            icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
            testId={`${testId}-confidentiality-summary`}
            color="purple"
            borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
          />
          <SecurityLevelSummaryItem
            label={CIA_LABELS.INTEGRITY}
            value={actualIntegrityLevel}
            icon={CIA_COMPONENT_ICONS.INTEGRITY}
            testId={`${testId}-integrity-summary`}
            color="green"
            borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
          />
          <SecurityLevelSummaryItem
            label={CIA_LABELS.AVAILABILITY}
            value={actualAvailabilityLevel}
            icon={CIA_COMPONENT_ICONS.AVAILABILITY}
            testId={`${testId}-availability-summary`}
            color="blue"
            borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
          />
        </div>

        {/* CIA Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Confidentiality Card */}
          <div
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
            }}
          >
            <h4 className="font-medium mb-2 flex items-center">
              <span className="mr-2">
                {CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              </span>
              {CIA_LABELS.CONFIDENTIALITY}
            </h4>
            <StatusBadge status="purple" className="mb-2">
              {actualConfidentialityLevel}
            </StatusBadge>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {confidentialityDetails?.description?.substring(0, 100)}...
            </p>
            <KeyValuePair
              label="Protection Method"
              value={
                confidentialityDetails?.protectionMethod || "Not specified"
              }
              className="mt-2"
            />
          </div>

          {/* Integrity Card */}
          <div
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4"
            style={{ borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
          >
            <h4 className="font-medium mb-2 flex items-center">
              <span className="mr-2">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
              {CIA_LABELS.INTEGRITY}
            </h4>
            <StatusBadge status="success" className="mb-2">
              {actualIntegrityLevel}
            </StatusBadge>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {integrityDetails?.description?.substring(0, 100)}...
            </p>
            <KeyValuePair
              label="Validation Method"
              value={integrityDetails?.validationMethod || "Not specified"}
              className="mt-2"
            />
          </div>

          {/* Availability Card */}
          <div
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY,
            }}
          >
            <h4 className="font-medium mb-2 flex items-center">
              <span className="mr-2">{CIA_COMPONENT_ICONS.AVAILABILITY}</span>
              {CIA_LABELS.AVAILABILITY}
            </h4>
            <StatusBadge status="info" className="mb-2">
              {actualAvailabilityLevel}
            </StatusBadge>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {availabilityDetails?.description?.substring(0, 100)}...
            </p>
            <KeyValuePair
              label="Uptime Target"
              value={availabilityDetails?.uptime || "Not specified"}
              className="mt-2"
            />
          </div>
        </div>

        {/* Additional information section */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
          <h4 className="font-medium mb-2">Security Profile Summary</h4>
          <p className="text-sm">
            This security profile combines {actualConfidentialityLevel}{" "}
            confidentiality, {actualIntegrityLevel} integrity, and{" "}
            {actualAvailabilityLevel} availability controls to create an{" "}
            {overallSecurityLevel.toLowerCase()} security posture. For detailed
            implementation recommendations, see the individual CIA component
            tabs.
          </p>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default CIAImpactSummaryWidget;
