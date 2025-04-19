import React, { useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { getDefaultPrivacyImpact } from "../../../data/ciaOptionsData";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import { ComponentImpactBaseProps } from "../../../types/widgets";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import { getDefaultComponentImpact } from "../../../utils/riskUtils";
import { isNullish } from "../../../utils/typeGuards";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

/**
 * Props for the Confidentiality Impact Widget
 */
export interface ConfidentialityImpactWidgetProps
  extends ComponentImpactBaseProps {
  // All required props are inherited from ComponentImpactBaseProps
}

/**
 * Displays confidentiality impact details for the selected security level
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality security levels
 * affect business operations through metrics like data classification, access controls,
 * and encryption methods. The visualization of these metrics supports better decision-making
 * about data protection requirements and privacy investments. 🔒
 */
const ConfidentialityImpactWidget: React.FC<
  ConfidentialityImpactWidgetProps
> = ({
  level, // For backward compatibility
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-confidentiality-impact",
  onLevelChange,
}) => {
  // Use the content service to get component details
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Use the effective level - prefer the specific confidentialityLevel if available,
  // otherwise fall back to the legacy level prop
  const effectiveLevel = confidentialityLevel || level || "Moderate";

  // Get component details from service
  const details = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return null;
      }

      const componentDetails = ciaContentService.getComponentDetails(
        "confidentiality",
        effectiveLevel
      );

      return isNullish(componentDetails) ? null : componentDetails;
    } catch (err) {
      console.error("Error fetching confidentiality details:", err);
      return null;
    }
  }, [ciaContentService, effectiveLevel]);

  // Get business impact from service with fallback to our utility
  const businessImpact = useMemo(() => {
    try {
      if (isNullish(ciaContentService)) {
        return getDefaultComponentImpact("confidentiality", effectiveLevel);
      }

      const impact = ciaContentService.getBusinessImpact(
        "confidentiality",
        effectiveLevel
      );

      return (
        impact || getDefaultComponentImpact("confidentiality", effectiveLevel)
      );
    } catch (err) {
      console.error("Error fetching business impact details:", err);
      return getDefaultComponentImpact("confidentiality", effectiveLevel);
    }
  }, [ciaContentService, effectiveLevel]);

  // Get data classification from service with fallback
  const dataClassification = useMemo(() => {
    if (isNullish(ciaContentService)) {
      return `${effectiveLevel} Classification`;
    }

    try {
      return ciaContentService.getInformationSensitivity(effectiveLevel);
    } catch (err) {
      console.error("Error getting data classification:", err);
      return `${effectiveLevel} Classification`;
    }
  }, [ciaContentService, effectiveLevel]);

  // Get privacy impact with fallback to utility function
  const privacyImpact = useMemo(() => {
    if (!isNullish(details) && details.privacyImpact) {
      return details.privacyImpact;
    }
    return getDefaultPrivacyImpact(effectiveLevel);
  }, [details, effectiveLevel]);

  return (
    <WidgetContainer
      title={
        WIDGET_TITLES.CONFIDENTIALITY_IMPACT ||
        "Confidentiality Impact Analysis"
      }
      icon={WIDGET_ICONS.CONFIDENTIALITY_IMPACT || "🔒"}
      className={`${className} overflow-visible`}
      testId={testId}
      isLoading={isLoading}
      error={serviceError}
    >
      <div className="max-h-[550px] overflow-y-auto pr-1">
        <div
          className="p-4"
          role="region"
          aria-labelledby="confidentiality-impact-heading"
        >
          <div className="mb-4">
            <SecurityLevelBadge
              category="Confidentiality"
              level={effectiveLevel}
              // Use utility functions for consistent color handling
              colorClass={getSecurityLevelBackgroundClass("purple")}
              textClass="text-purple-800 dark:text-purple-300"
              testId={`${testId}-confidentiality-badge`}
            />
          </div>

          {/* Business Impact */}
          {businessImpact && (
            <BusinessImpactSection
              impact={businessImpact}
              color="purple"
              testId={`${testId}-business-impact`}
            />
          )}

          {/* Data Protection & Classification */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">📊</span>Data Protection
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
                <div className="text-sm font-medium mb-1 text-purple-700 dark:text-purple-300">
                  Data Classification
                </div>
                <div className="text-lg font-bold">{dataClassification}</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Level of data sensitivity
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Impact */}
          <div className="mb-6">
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="mr-2">🔒</span>Privacy Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-sm font-medium mb-1">Privacy Impact:</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {privacyImpact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
};

export default ConfidentialityImpactWidget;
