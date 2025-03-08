import React from "react";
import { CIADetails } from "../../types/cia";
import { INTEGRITY_IMPACT_TEST_IDS } from "../../constants/testIds";
import { CIA_COMPONENT_ICONS } from "../../constants/coreConstants";
import { BUSINESS_IMPACT_ICONS } from "../../constants/uiConstants";

interface IntegrityImpactWidgetProps {
  level: string;
  options: Record<string, CIADetails>;
  testId?: string;
}

// Fix the CIADetails type or ensure it has these properties
interface EnhancedCIADetails {
  description?: string;
  businessImpact?: string;
  validationMethod?: string;
  recommendations?: string[];
  [key: string]: any;
}

const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  level = "None",
  options = {},
  testId = INTEGRITY_IMPACT_TEST_IDS.INTEGRITY_IMPACT_PREFIX,
}) => {
  const currentOption = options[level] || ({} as EnhancedCIADetails);

  return (
    <div className="p-4 space-y-4" data-testid={testId}>
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
        <h3 className="text-md font-medium">Integrity Impact: {level}</h3>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Description</h4>
        <p className="text-sm">
          {currentOption.description || "No description available."}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Business Impact</h4>
        <p className="text-sm">
          {currentOption.businessImpact || "No impact information available."}
        </p>
      </div>

      {currentOption.validationMethod && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Validation Method</h4>
          <p className="text-sm">{currentOption.validationMethod}</p>
        </div>
      )}

      {currentOption.recommendations &&
        currentOption.recommendations.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1">
              {currentOption.recommendations.map((rec: string, idx: number) => (
                <li key={idx} className="text-sm">
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default IntegrityImpactWidget;
