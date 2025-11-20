import React, { useEffect, useMemo } from "react";
import { WIDGET_ICONS, WIDGET_TITLES } from "../../../constants/appConstants";
import { getDefaultPrivacyImpact } from "../../../data/ciaOptionsData";
import { useBusinessImpact, useComponentDetails } from "../../../hooks";
import { useCIAContentService } from "../../../hooks/useCIAContentService";
import type { ConfidentialityImpactWidgetProps } from "../../../types/widget-props";
import { getSecurityLevelBackgroundClass } from "../../../utils/colorUtils";
import BusinessImpactSection from "../../common/BusinessImpactSection";
import SecurityLevelBadge from "../../common/SecurityLevelBadge";
import WidgetContainer from "../../common/WidgetContainer";

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
  availabilityLevel: _availabilityLevel,
  integrityLevel: _integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "widget-confidentiality-impact",
  showExtendedDetails: _showExtendedDetails = false,
  onError: _onError,
}) => {
  // Use the content service to get loading/error state
  const {
    ciaContentService,
    error: serviceError,
    isLoading,
  } = useCIAContentService();

  // Use the effective level - confidentialityLevel is required
  const effectiveLevel = confidentialityLevel || "Moderate";

  // Invoke error callback when service error occurs
  useEffect(() => {
    if (serviceError && _onError) {
      _onError(serviceError);
    }
  }, [serviceError, _onError]);

  // Use custom hooks for data fetching (replaces manual useMemo logic)
  const details = useComponentDetails("confidentiality", effectiveLevel);
  const businessImpact = useBusinessImpact("confidentiality", effectiveLevel);

  // Get data classification from service with fallback
  const dataClassification = useMemo(() => {
    if (!ciaContentService) {
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
    if (details && details.privacyImpact) {
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
