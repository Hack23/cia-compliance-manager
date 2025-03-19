import React, { useMemo, useState } from "react";
import { SUMMARY_TEST_IDS } from "../../constants/testIds";
import { useCIAContentService } from "../../hooks/useCIAContentService";
import { SecurityLevel } from "../../types/cia";
import { getRiskLevelFromSecurityLevel } from "../../utils";
import { getSecurityLevelValue } from "../../utils/levelValuesUtils";
import { KeyValuePair } from "../common/KeyValuePair";
import { RiskAssessment } from "../common/RiskAssessment";
import { SecurityLevelSummaryItem } from "../common/SecurityLevelSummaryItem";
import { SecurityRiskScore } from "../common/SecurityRiskScore";
import StatusBadge from "../common/StatusBadge";
import WidgetContainer from "../common/WidgetContainer";

// Constants for colors, icons and labels
const CIA_COMPONENT_COLORS = {
  AVAILABILITY: { PRIMARY: "#3498db" },
  INTEGRITY: { PRIMARY: "#2ecc71" },
  CONFIDENTIALITY: { PRIMARY: "#9b59b6" }
};

const CIA_COMPONENT_ICONS = {
  AVAILABILITY: "⏱️",
  INTEGRITY: "✅",
  CONFIDENTIALITY: "🔒"
};

const CIA_LABELS = {
  AVAILABILITY: "Availability",
  INTEGRITY: "Integrity",
  CONFIDENTIALITY: "Confidentiality"
};

// Security recommendations by level
const SECURITY_RECOMMENDATIONS = {
  NONE: "Immediate Security Upgrade Required",
  LOW: "Basic Security Enhancement Recommended",
  MODERATE: "Standard Security Maintenance",
  HIGH: "Advanced Security Optimization",
  VERY_HIGH: "Maximum Security Maintained",
  BASIC: "Basic Security Controls Recommended"
};

interface SecuritySummaryWidgetProps {
  className?: string;
  testId?: string;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  securityLevel?: SecurityLevel;
}

/**
 * Displays a summary of the selected security levels and their impacts
 * 
 * ## Business Perspective
 * 
 * This widget provides executives and security officers with a consolidated view
 * of the organization's security posture across the CIA triad. The high-level metrics
 * support quick assessment and reporting for stakeholder communications. 📊
 */
export function SecuritySummaryWidget({
  className = "",
  testId = "security-summary-widget",
  availabilityLevel = "Moderate" as SecurityLevel,
  integrityLevel = "Moderate" as SecurityLevel,
  confidentialityLevel = "Moderate" as SecurityLevel,
  securityLevel,
}: SecuritySummaryWidgetProps): React.ReactElement {
  const { ciaContentService } = useCIAContentService();
  const [showMetrics, setShowMetrics] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [showBusinessImpact, setShowBusinessImpact] = useState(false);
  
  // Get details for availability only
  const availabilityDetails = useMemo(
    () => ciaContentService.getComponentDetails("availability", availabilityLevel),
    [availabilityLevel, ciaContentService]
  );

  // Calculate overall security level if not provided
  const overallSecurityLevel = useMemo((): SecurityLevel => {
    if (securityLevel) return securityLevel;
    // Use a default implementation if the method doesn't exist
    if (!ciaContentService.calculateBusinessImpactLevel) {
      // Simple implementation matching what's in businessImpactService
      const levels = [availabilityLevel, integrityLevel, confidentialityLevel];
      const values = levels.map(level => {
        switch (level) {
          case "None": return 0;
          case "Low": return 1;
          case "Moderate": return 2;
          case "High": return 3;
          case "Very High": return 4;
          default: return 0;
        }
      });
      const avg = values.reduce((a: number, b: number) => a + b, 0) / values.length;
      const roundedAvg = Math.round(avg);
      
      switch (roundedAvg) {
        case 0: return "None";
        case 1: return "Low";
        case 2: return "Moderate";
        case 3: return "High";
        case 4: return "Very High";
        default: return "Moderate";
      }
    }
    // Cast the returned string to SecurityLevel type
    return ciaContentService.calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    ) as SecurityLevel;
  }, [availabilityLevel, integrityLevel, confidentialityLevel, ciaContentService, securityLevel]);

  // Calculate the overall business impact
  const businessImpactLevel = useMemo(() => {
    // Get the minimum security level across all three components
    // as it represents the weakest link in the security chain
    const securityLevels = [availabilityLevel, integrityLevel, confidentialityLevel];
    const levelValues = { None: 0, Low: 1, Moderate: 2, High: 3, "Very High": 4 };
    
    // Find the minimum level
    const minLevelValue = Math.min(
      levelValues[availabilityLevel], 
      levelValues[integrityLevel], 
      levelValues[confidentialityLevel]
    );
    
    // Map back to a SecurityLevel
    const minLevel = Object.keys(levelValues).find(
      key => levelValues[key as SecurityLevel] === minLevelValue
    ) as SecurityLevel;
    
    // Calculate business impact based on this minimum level
    return ciaContentService.calculateBusinessImpactLevel(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );
  }, [availabilityLevel, integrityLevel, confidentialityLevel, ciaContentService]);

  // Get security description
  const securityDescription = useMemo(() => {
    return ciaContentService.getSecurityLevelDescription(overallSecurityLevel);
  }, [overallSecurityLevel, ciaContentService]);

  // Get ROI estimates
  const roiData = useMemo(() => {
    return ciaContentService.getROIEstimates(overallSecurityLevel);
  }, [overallSecurityLevel, ciaContentService]);

  // Return Rate - handle missing property with default
  const roiValue = useMemo(() => {
    return roiData?.returnRate || roiData?.value || "N/A";
  }, [roiData]);

  // Technical descriptions for each component
  const availabilityTechDescription = useMemo(() => 
    ciaContentService.getTechnicalDescription("availability", availabilityLevel),
    [availabilityLevel, ciaContentService]
  );

  const integrityTechDescription = useMemo(() => 
    ciaContentService.getTechnicalDescription("integrity", integrityLevel),
    [integrityLevel, ciaContentService]
  );

  const confidentialityTechDescription = useMemo(() => 
    ciaContentService.getTechnicalDescription("confidentiality", confidentialityLevel),
    [confidentialityLevel, ciaContentService]
  );

  // Business impact descriptions for each component
  const availabilityBusinessImpact = useMemo(() => 
    ciaContentService.getBusinessImpactDescription("availability", availabilityLevel),
    [availabilityLevel, ciaContentService]
  );

  const integrityBusinessImpact = useMemo(() => 
    ciaContentService.getBusinessImpactDescription("integrity", integrityLevel),
    [integrityLevel, ciaContentService]
  );

  const confidentialityBusinessImpact = useMemo(() => 
    ciaContentService.getBusinessImpactDescription("confidentiality", confidentialityLevel),
    [confidentialityLevel, ciaContentService]
  );

  // Get security icon
  const securityIcon = useMemo(() => 
    ciaContentService.getSecurityIcon?.(overallSecurityLevel) || "🔒",
    [overallSecurityLevel, ciaContentService]
  );
  
  // Get badge variant for security level
  const getSecurityLevelBadgeVariant = (level: SecurityLevel): "success" | "warning" | "error" | "info" | "neutral" => {
    switch (level) {
      case "None":
        return "error";
      case "Low":
        return "warning";
      case "Moderate":
        return "info";
      case "High":
        return "success";
      case "Very High":
        return "success";
      default:
        return "neutral";
    }
  };

  // Get recommendations for the security level
  const recommendations = useMemo(() => {
    if (!ciaContentService.getRecommendations) return [];
    return ciaContentService.getRecommendations("confidentiality", overallSecurityLevel) || [];
  }, [overallSecurityLevel, ciaContentService]);

  // Calculate security score
  const securityScore = useMemo(() => 
    getSecurityLevelValue(overallSecurityLevel) * 25,
    [overallSecurityLevel]
  );

  // Calculate risk level
  const riskLevel = useMemo(() => {
    return getRiskLevelFromSecurityLevel(overallSecurityLevel);
  }, [overallSecurityLevel]);

  return (
    <WidgetContainer
      title="Security Summary"
      icon="🔒"
      className={className}
      testId={testId}
    >
      <div className="p-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <span
                  className="text-3xl"
                  data-testid={SUMMARY_TEST_IDS.SECURITY_ICON}
                  role="img"
                  aria-label={`Security level: ${overallSecurityLevel}`}
                >
                  {securityIcon}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{overallSecurityLevel} Security</h3>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400 mt-1"
                  data-testid={SUMMARY_TEST_IDS.SECURITY_SUMMARY_DESCRIPTION}
                >
                  {securityDescription}
                </p>
              </div>
            </div>
            <SecurityRiskScore
              score={securityScore}
              label={riskLevel}
              testId={`${testId}-risk-score`}
            />
          </div>

          <RiskAssessment
            securityLevel={overallSecurityLevel}
            testId={`${testId}-risk-assessment`}
          />
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
            data-testid={SUMMARY_TEST_IDS.SUMMARY_CONTAINER}
          >
            <SecurityLevelSummaryItem
              label={CIA_LABELS.AVAILABILITY}
              value={availabilityLevel}
              icon={CIA_COMPONENT_ICONS.AVAILABILITY}
              testId={`${testId}-availability-summary`}
              color="blue"
              borderColor={CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY}
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.INTEGRITY}
              value={integrityLevel}
              icon={CIA_COMPONENT_ICONS.INTEGRITY}
              testId={`${testId}-integrity-summary`}
              color="green"
              borderColor={CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY}
              compact={true}
            />
            <SecurityLevelSummaryItem
              label={CIA_LABELS.CONFIDENTIALITY}
              value={confidentialityLevel}
              icon={CIA_COMPONENT_ICONS.CONFIDENTIALITY}
              testId={`${testId}-confidentiality-summary`}
              color="purple"
              borderColor={CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY}
              compact={true}
            />
          </div>
        </div>
        
        {/* ROI Estimate */}
        <div 
          className="mt-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 p-3 rounded-lg"
          data-testid={SUMMARY_TEST_IDS.ROI_ESTIMATE_SUMMARY}
        >
          <KeyValuePair
            label="Estimated ROI"
            value={roiValue}
            testId={SUMMARY_TEST_IDS.ROI_ESTIMATE_PAIR}
            valueClassName="text-green-600 dark:text-green-400 text-lg"
          />
          {roiData?.description && (
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              {roiData.description}
            </p>
          )}
        </div>

        {/* Toggleable Technical Details Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            data-testid={SUMMARY_TEST_IDS.TECHNICAL_SECTION_TOGGLE}
            aria-expanded={showTechnicalDetails}
          >
            <span>Technical Implementation</span>
            <span
              className="transition-transform duration-200"
              style={{
                transform: showTechnicalDetails ? "rotate(180deg)" : "none",
              }}
            >
              {showTechnicalDetails ? "▲" : "▼"}
            </span>
          </button>

          {showTechnicalDetails && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.TECHNICAL_DETAILS_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_TECH_HEADING}
                >
                  Availability Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_TECH_DETAILS}
                >
                  {availabilityTechDescription}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_TECH_HEADING}
                >
                  Integrity Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_TECH_DETAILS}
                >
                  {integrityTechDescription}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_HEADING}
                >
                  Confidentiality Implementation
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_TECH_DETAILS}
                >
                  {confidentialityTechDescription}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toggleable Business Impact Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowBusinessImpact(!showBusinessImpact)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_TOGGLE}
            aria-expanded={showBusinessImpact}
          >
            <span>Business Impact</span>
            <span
              className="transition-transform duration-200"
              style={{
                transform: showBusinessImpact ? "rotate(180deg)" : "none",
              }}
            >
              {showBusinessImpact ? "▲" : "▼"}
            </span>
          </button>

          {showBusinessImpact && (
            <div
              className="mt-3 space-y-4 pl-3 border-l-2 border-gray-200 dark:border-gray-700"
              data-testid={SUMMARY_TEST_IDS.BUSINESS_IMPACT_SECTION}
            >
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.AVAILABILITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_IMPACT_HEADING}
                >
                  Availability Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.AVAILABILITY_IMPACT_DETAILS}
                >
                  {availabilityBusinessImpact}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_IMPACT_HEADING}
                >
                  Integrity Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.INTEGRITY_IMPACT_DETAILS}
                >
                  {integrityBusinessImpact}
                </p>
              </div>

              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY }}
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_IMPACT_HEADING}
                >
                  Confidentiality Impact
                </h4>
                <p
                  className="text-sm text-gray-600 dark:text-gray-400"
                  data-testid={SUMMARY_TEST_IDS.CONFIDENTIALITY_IMPACT_DETAILS}
                >
                  {confidentialityBusinessImpact}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Key Recommendations */}
        <div className="mt-4">
          <h4
            className="font-medium mb-2"
            data-testid={SUMMARY_TEST_IDS.RECOMMENDATION_HEADING}
          >
            Security Recommendation
          </h4>
          
          <StatusBadge
            status={getSecurityLevelBadgeVariant(overallSecurityLevel)}
            testId={SUMMARY_TEST_IDS.SECURITY_RECOMMENDATION}
          >
            {SECURITY_RECOMMENDATIONS[
              overallSecurityLevel
                .toUpperCase()
                .replace(" ", "_") as keyof typeof SECURITY_RECOMMENDATIONS
            ] || SECURITY_RECOMMENDATIONS.BASIC}
          </StatusBadge>

          {recommendations.length > 0 && (
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              {recommendations.slice(0, 3).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Toggleable Metrics Section */}
        <div className="mt-4">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="flex items-center justify-between w-full text-left font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
            data-testid={SUMMARY_TEST_IDS.METRICS_TOGGLE}
            aria-expanded={showMetrics}
          >
            <span>Availability Metrics</span>
            <span
              className="transition-transform duration-200"
              style={{ transform: showMetrics ? "rotate(180deg)" : "none" }}
            >
              {showMetrics ? "▲" : "▼"}
            </span>
          </button>

          {showMetrics && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              data-testid={SUMMARY_TEST_IDS.METRICS_SECTION}
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <h5 className="text-sm font-medium mb-2">Uptime</h5>
                <p className="text-lg font-bold">
                  {availabilityDetails?.uptime || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <h5 className="text-sm font-medium mb-2">
                  Mean Time To Recovery (MTTR)
                </h5>
                <p className="text-lg font-bold">
                  {availabilityDetails?.mttr || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <h5 className="flex items-center justify-center text-sm font-medium mb-2">
                  <span className="mr-1">⏱️</span>Recovery Time Objective (RTO)
                </h5>
                <p className="text-lg font-bold">
                  {availabilityDetails?.rto || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                <h5 className="flex items-center justify-center text-sm font-medium mb-2">
                  <span className="mr-1">💾</span>Recovery Point Objective (RPO)
                </h5>
                <p className="text-lg font-bold">
                  {availabilityDetails?.rpo || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Data Classifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.CONFIDENTIALITY.PRIMARY,
            }}
          >
            <h4 className="text-md font-medium mb-2">
              Data Protection Classification
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <KeyValuePair
                label="Classification Level"
                value={confidentialityLevel}
                testId={`${testId}-classification-level`}
              />
              <KeyValuePair
                label="Information Sensitivity"
                value={ciaContentService.getInformationSensitivity?.(
                  confidentialityLevel
                ) || "Not specified"}
                testId={`${testId}-information-sensitivity`}
              />
            </div>
          </div>

          <div
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4"
            style={{
              borderLeftColor: CIA_COMPONENT_COLORS.INTEGRITY.PRIMARY,
            }}
          >
            <h4 className="text-md font-medium mb-2">
              Data Integrity Classification
            </h4>
            <div className="grid grid-cols-1 gap-2">
              <KeyValuePair
                label="Protection Level"
                value={integrityLevel}
                testId={`${testId}-protection-level`}
              />
              {(() => {
                const details = ciaContentService.getTechnicalImplementation?.(
                  "integrity",
                  integrityLevel
                );
                return details &&
                  typeof details === 'object' &&
                  "validationMethod" in details &&
                  details.validationMethod ? (
                  <KeyValuePair
                    label="Validation Technique"
                    value={details.validationMethod as string}
                    testId={`${testId}-validation-technique`}
                  />
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>
    </WidgetContainer>
  );
}

export default SecuritySummaryWidget;
