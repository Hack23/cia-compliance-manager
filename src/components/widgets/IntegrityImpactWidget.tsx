import React from "react";
import { CIADetails } from "../../types/cia";
import { WIDGET_TEST_IDS } from "../../constants/testIds";
import { CIA_COMPONENT_ICONS } from "../../constants/coreConstants";
import { BUSINESS_IMPACT_ICONS } from "../../constants/uiConstants";

interface IntegrityImpactWidgetProps {
  level?: string;
  options?: Record<string, CIADetails>;
}

const IntegrityImpactWidget: React.FC<IntegrityImpactWidgetProps> = ({
  level = "None",
  options = {},
}) => {
  // Properly type currentOption as CIADetails with a type assertion
  const currentOption = (options[level] || {}) as CIADetails;

  return (
    <div
      className="p-4 space-y-4"
      data-testid={
        WIDGET_TEST_IDS.INTEGRITY_IMPACT_WIDGET || "widget-integrity-impact"
      }
    >
      <div className="flex items-center mb-4">
        <span className="text-xl mr-2">{CIA_COMPONENT_ICONS.INTEGRITY}</span>
        <h3 className="text-md font-medium">Integrity Impact: {level}</h3>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Description</h4>
        <p className="text-sm">
          {currentOption?.description || "No description available."}
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
        <h4 className="text-sm font-medium mb-2">Business Impact</h4>
        <p className="text-sm">
          {currentOption?.businessImpact || "No impact information available."}
        </p>
      </div>

      {currentOption?.validationMethod && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h4 className="text-sm font-medium mb-2">Validation Method</h4>
          <p className="text-sm">{currentOption.validationMethod}</p>
        </div>
      )}

      {currentOption?.recommendations &&
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
