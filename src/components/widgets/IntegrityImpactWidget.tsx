import React, { useState } from "react";
import { WidgetBaseProps } from "../../types/widgets";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import WidgetBase from "../common/WidgetBase";
import { CIA_COMPONENT_ICONS } from "../../constants/coreConstants";
import { BUSINESS_IMPACT_ICONS } from "../../constants/uiConstants";

// Define proper TypeScript interfaces for the component props and options
interface IntegrityDetail {
  description: string;
  businessImpact: string;
  validationMethod?: string;
  recommendations: string[];
  technicalControls?: string[];
  complianceImplications?: string;
}

export interface IntegrityImpactWidgetProps extends WidgetBaseProps {
  integrityLevel: string;
  confidentialityLevel: string;
  availabilityLevel: string;
  options: Record<string, any>;
  testId?: string;
}

const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  integrityLevel,
  confidentialityLevel,
  availabilityLevel,
  options,
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
}) => {
  // Use integrityLevel instead of level
  const levelData = options[integrityLevel] || {};

  // Define default options with enhanced business context
  const defaultOptions: Record<string, IntegrityDetail> = {
    None: {
      description: "No data integrity controls implemented",
      businessImpact:
        "Business decisions may be based on potentially corrupt or inaccurate data, leading to operational errors and financial losses",
      validationMethod: "None",
      recommendations: [
        "Implement basic input validation for all data entry points",
        "Create manual verification processes for critical data",
        "Establish data quality baseline for future improvements",
      ],
    },
    Low: {
      description: "Basic input validation and error checking",
      businessImpact:
        "Reduced risk of obvious data errors, but still vulnerable to sophisticated data corruption leading to business impact",
      validationMethod: "Basic validation",
      recommendations: [
        "Enhance input validation with business rules",
        "Implement checksums for important data transfers",
        "Add audit logging for key data changes",
      ],
    },
    Moderate: {
      description:
        "Standard integrity controls with validation and verification",
      businessImpact:
        "Reasonable assurance of data accuracy for most business operations with detection capabilities for common manipulation",
      validationMethod: "Standard validation with checksums",
      recommendations: [
        "Implement comprehensive data validation frameworks",
        "Deploy change control processes for all systems",
        "Establish data quality monitoring",
      ],
    },
    High: {
      description:
        "Advanced integrity controls with cryptographic verification",
      businessImpact:
        "High confidence in data integrity with robust protection against tampering, supporting reliable business operations and compliance",
      validationMethod: "Cryptographic verification",
      recommendations: [
        "Deploy digital signatures for critical transactions",
        "Implement secure audit trails and tamper-evident logging",
        "Establish automated integrity monitoring and alerting",
      ],
    },
    "Very High": {
      description:
        "Comprehensive integrity framework with blockchain or similar technology",
      businessImpact:
        "Maximum assurance of data integrity with tamper-proof records, supporting critical business operations and stringent regulatory requirements",
      validationMethod: "Blockchain verification or equivalent",
      recommendations: [
        "Implement immutable ledger technology for critical data",
        "Deploy advanced cryptographic controls with key management",
        "Establish comprehensive data governance framework",
      ],
    },
  };

  // Safely merge provided options with defaults
  const mergedOptions = { ...defaultOptions, ...options };

  // Safely access the current option with fallback
  const currentOption =
    mergedOptions[integrityLevel] || mergedOptions["None"] || {};

  // Extract fields safely, handling both types
  const description = (currentOption && currentOption.description) || "";
  const businessImpact = (currentOption && currentOption.businessImpact) || "";
  const validationMethod =
    currentOption && "validationMethod" in currentOption
      ? currentOption.validationMethod
      : undefined;
  const recommendations =
    (currentOption && currentOption.recommendations) || [];

  // Use a consistent test ID
  const effectiveTestId = testId || "widget-integrity-impact";

  return (
    <WidgetBase
      title="Integrity Impact"
      icon="🔐"
      testId={testId}
      availabilityLevel={availabilityLevel}
      integrityLevel={integrityLevel}
      confidentialityLevel={confidentialityLevel}
    >
      <div
        className="p-4 space-y-4"
        data-testid={effectiveTestId}
        aria-labelledby="integrity-impact-title"
      >
        <div className="flex items-center mb-4">
          <span className="text-xl mr-2" aria-hidden="true">
            {CIA_COMPONENT_ICONS.INTEGRITY}
          </span>
          <h3 id="integrity-impact-title" className="text-md font-medium">
            Integrity Impact: {integrityLevel}
          </h3>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm">{description}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Business Impact</h4>
          <p className="text-sm">{businessImpact}</p>
        </div>

        {validationMethod && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
            <h4 className="text-sm font-medium mb-2">Validation Method</h4>
            <p className="text-sm">{validationMethod}</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul
              className="list-disc pl-5 space-y-1"
              aria-label="Integrity recommendations"
            >
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </WidgetBase>
  );
};

export default IntegrityImpactWidget;
