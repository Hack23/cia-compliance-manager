import React from "react";
import { BusinessImpactDetails } from "../../types/cia-services";

/**
 * Valid color values for business impact sections
 */
type ImpactColor = "blue" | "green" | "orange" | "purple" | "cyan" | "red";

interface BusinessImpactSectionProps {
  impact: BusinessImpactDetails;
  color: string;
  testId?: string;
}

/**
 * Get explicit background color classes to avoid dynamic Tailwind class generation
 * @param color - Color name (blue, green, orange, purple, cyan, red)
 * @returns Explicit className string for background colors
 */
const getBackgroundColorClasses = (color: ImpactColor): string => {
  switch (color) {
    case "blue":
      return "bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800";
    case "green":
      return "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800";
    case "orange":
      return "bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800";
    case "purple":
      return "bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800";
    case "cyan":
      return "bg-cyan-100 dark:bg-cyan-900 border-cyan-200 dark:border-cyan-800";
    case "red":
      return "bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800";
    default: {
      // Exhaustive check - TypeScript will error if new colors are added
      const exhaustiveCheck: never = color;
      throw new Error(`Unsupported color: ${String(exhaustiveCheck)}`);
    }
  }
};

/**
 * Get explicit text color classes to avoid dynamic Tailwind class generation
 * @param color - Color name (blue, green, orange, purple, cyan, red)
 * @returns Explicit className string for text colors
 */
const getTextColorClasses = (color: ImpactColor): string => {
  switch (color) {
    case "blue":
      return "text-blue-700 dark:text-blue-300";
    case "green":
      return "text-green-700 dark:text-green-300";
    case "orange":
      return "text-orange-700 dark:text-orange-300";
    case "purple":
      return "text-purple-700 dark:text-purple-300";
    case "cyan":
      return "text-cyan-700 dark:text-cyan-300";
    case "red":
      return "text-red-700 dark:text-red-300";
    default: {
      // Exhaustive check - TypeScript will error if new colors are added
      const exhaustiveCheck: never = color;
      throw new Error(`Unsupported color: ${String(exhaustiveCheck)}`);
    }
  }
};

/**
 * Get explicit badge color classes for rounded-full badges
 * This provides complete styling for small badges including dark mode support
 * @param color - Color name (blue, green, orange, purple, cyan, red)
 * @returns Explicit className string for badge styling
 */
const getBadgeColorClasses = (color: ImpactColor): string => {
  switch (color) {
    case "blue":
      return "bg-blue-50 text-blue-700 dark:bg-blue-900 dark:bg-opacity-50 dark:text-blue-300";
    case "green":
      return "bg-green-50 text-green-700 dark:bg-green-900 dark:bg-opacity-50 dark:text-green-300";
    case "orange":
      return "bg-orange-50 text-orange-700 dark:bg-orange-900 dark:bg-opacity-50 dark:text-orange-300";
    case "purple":
      return "bg-purple-50 text-purple-700 dark:bg-purple-900 dark:bg-opacity-50 dark:text-purple-300";
    case "cyan":
      return "bg-cyan-50 text-cyan-700 dark:bg-cyan-900 dark:bg-opacity-50 dark:text-cyan-300";
    case "red":
      return "bg-red-50 text-red-700 dark:bg-red-900 dark:bg-opacity-50 dark:text-red-300";
    default: {
      // Exhaustive check - TypeScript will error if new colors are added
      const exhaustiveCheck: never = color;
      throw new Error(`Unsupported color: ${String(exhaustiveCheck)}`);
    }
  }
};

/**
 * Reusable component for displaying business impact information
 * Used by various CIA impact widgets to provide consistent UI
 */
const BusinessImpactSection: React.FC<BusinessImpactSectionProps> = ({
  impact,
  color,
  testId = "business-impact-section",
}) => {
  // Extract risk level from the impact financial or operational data
  // Using the risk level in the UI
  const riskLevelForDisplay =
    impact.financial?.riskLevel || impact.operational?.riskLevel || "Unknown";

  // Safely cast color to ImpactColor type with fallback to gray for invalid values
  const safeColor = (["blue", "green", "orange", "purple", "cyan", "red"].includes(color) 
    ? color 
    : "blue") as ImpactColor;

  // Get explicit color classes for this color scheme
  const bgClasses = getBackgroundColorClasses(safeColor);
  const textClasses = getTextColorClasses(safeColor);
  const badgeClasses = getBadgeColorClasses(safeColor);

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card"
      data-testid={testId}
    >
      <h4 className="text-md font-medium mb-3 flex items-center">
        <span className="mr-2">💼</span>
        Business Impact
        <span className="ml-2 text-sm text-gray-500">
          Risk: {riskLevelForDisplay}
        </span>
      </h4>

      <p
        className="text-gray-600 dark:text-gray-300 mb-4"
        data-testid={`${testId}-summary`}
      >
        {impact.summary || "No business impact data available"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Financial Impact */}
        {impact.financial && (
          <div
            className={`p-2 rounded-md bg-opacity-10 dark:bg-opacity-20 border ${bgClasses}`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">💰</span>
              <span className={`font-medium ${textClasses}`}>
                Financial Impact
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {impact.financial.description ||
                "No financial impact information available"}
            </p>
            {impact.financial.annualRevenueLoss && (
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Annual Revenue Loss: </span>
                {impact.financial.annualRevenueLoss}
              </p>
            )}
          </div>
        )}

        {/* Operational Impact */}
        {impact.operational && (
          <div
            className={`p-2 rounded-md bg-opacity-10 dark:bg-opacity-20 border ${bgClasses}`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">⚙️</span>
              <span className={`font-medium ${textClasses}`}>
                Operational Impact
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {impact.operational.description ||
                "No operational impact information available"}
            </p>
            {impact.operational.meanTimeToRecover && (
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Mean Time to Recover: </span>
                {impact.operational.meanTimeToRecover}
              </p>
            )}
          </div>
        )}

        {/* Reputational Impact */}
        {impact.reputational && (
          <div
            className={`p-2 rounded-md bg-opacity-10 dark:bg-opacity-20 border ${bgClasses}`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">🏆</span>
              <span className={`font-medium ${textClasses}`}>
                Reputational Impact
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {impact.reputational.description ||
                "No reputational impact information available"}
            </p>
            {impact.reputational.reputationalImpact && (
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {impact.reputational.reputationalImpact}
              </p>
            )}
          </div>
        )}

        {/* Strategic Impact */}
        {impact.strategic && (
          <div
            className={`p-2 rounded-md bg-opacity-10 dark:bg-opacity-20 border ${bgClasses}`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">🎯</span>
              <span className={`font-medium ${textClasses}`}>
                Strategic Impact
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {impact.strategic.description ||
                "No strategic impact information available"}
            </p>
            {impact.strategic.competitiveAdvantage && (
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Competitive Advantage: </span>
                {impact.strategic.competitiveAdvantage}
              </p>
            )}
          </div>
        )}

        {/* Regulatory Impact */}
        {impact.regulatory && (
          <div
            className={`p-2 rounded-md bg-opacity-10 dark:bg-opacity-20 border ${bgClasses}`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">📜</span>
              <span className={`font-medium ${textClasses}`}>
                Regulatory Impact
              </span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300">
              {impact.regulatory.description ||
                "No regulatory impact information available"}
            </p>
            {impact.regulatory.complianceImpact && (
              <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                {impact.regulatory.complianceImpact}
              </p>
            )}
            {impact.regulatory.complianceViolations &&
              impact.regulatory.complianceViolations.length > 0 && (
                <div className="mt-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Potential Violations:{" "}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {impact.regulatory.complianceViolations.map(
                      (violation, index) => (
                        <span
                          key={index}
                          className={`px-2 py-0.5 text-xs rounded-full ${badgeClasses}`}
                        >
                          {violation}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessImpactSection;
