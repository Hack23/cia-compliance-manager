import React from "react";
import { BusinessImpactDetails } from "../../types/cia-services";

interface BusinessImpactSectionProps {
  impact: BusinessImpactDetails;
  color: string;
  testId?: string;
  compact?: boolean; // New prop for compact mode
}

/**
 * Reusable component for displaying business impact information
 * Used by various CIA impact widgets to provide consistent UI
 */
const BusinessImpactSection: React.FC<BusinessImpactSectionProps> = ({
  impact,
  color,
  testId = "business-impact-section",
  compact = false, // Default to standard mode
}) => {
  // Extract risk level from the impact financial or operational data
  // Using the risk level in the UI
  const riskLevelForDisplay =
    impact.financial?.riskLevel || impact.operational?.riskLevel || "Unknown";

  return (
    <div
      className={`${
        compact ? "p-2" : "p-4"
      } rounded-lg border shadow-sm security-card bg-gray-50 dark:bg-gray-800 ${
        compact ? "compact" : ""
      }`}
      data-testid={testId}
    >
      <h4
        className={`${
          compact ? "text-sm" : "text-md"
        } font-medium mb-2 flex items-center`}
      >
        <span className="mr-2">💼</span>
        Business Impact
        <span className={`ml-2 text-${compact ? "xs" : "sm"} text-gray-500`}>
          Risk: {riskLevelForDisplay}
        </span>
      </h4>

      <p
        className={`text-gray-600 dark:text-gray-300 ${
          compact ? "mb-2 text-xs" : "mb-4"
        }`}
        data-testid={`${testId}-summary`}
      >
        {impact.summary || "No business impact data available"}
      </p>

      <div
        className={`grid grid-cols-1 ${
          compact ? "gap-2" : "md:grid-cols-2 gap-4"
        }`}
      >
        {/* Financial Impact */}
        {impact.financial && (
          <div
            className={`${
              compact ? "p-2" : "p-3"
            } rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">💰</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Financial Impact
              </span>
            </div>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-gray-700 dark:text-gray-300`}
            >
              {impact.financial.description ||
                "No financial impact information available"}
            </p>
            {impact.financial.annualRevenueLoss && (
              <p
                className={`${
                  compact ? "text-xs mt-0.5" : "text-sm mt-1"
                } text-gray-700 dark:text-gray-300`}
              >
                <span className="font-medium">Annual Revenue Loss: </span>
                {impact.financial.annualRevenueLoss}
              </p>
            )}
          </div>
        )}

        {/* Operational Impact */}
        {impact.operational && (
          <div
            className={`${
              compact ? "p-2" : "p-3"
            } rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">⚙️</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Operational Impact
              </span>
            </div>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-gray-700 dark:text-gray-300`}
            >
              {impact.operational.description ||
                "No operational impact information available"}
            </p>
            {impact.operational.meanTimeToRecover && (
              <p
                className={`${
                  compact ? "text-xs mt-0.5" : "text-sm mt-1"
                } text-gray-700 dark:text-gray-300`}
              >
                <span className="font-medium">Mean Time to Recover: </span>
                {impact.operational.meanTimeToRecover}
              </p>
            )}
          </div>
        )}

        {/* Reputational Impact */}
        {impact.reputational && (
          <div
            className={`${
              compact ? "p-2" : "p-3"
            } rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">🏆</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Reputational Impact
              </span>
            </div>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-gray-700 dark:text-gray-300`}
            >
              {impact.reputational.description ||
                "No reputational impact information available"}
            </p>
            {impact.reputational.reputationalImpact && (
              <p
                className={`${
                  compact ? "text-xs mt-0.5" : "text-sm mt-1"
                } text-gray-700 dark:text-gray-300`}
              >
                {impact.reputational.reputationalImpact}
              </p>
            )}
          </div>
        )}

        {/* Strategic Impact */}
        {impact.strategic && (
          <div
            className={`${
              compact ? "p-2" : "p-3"
            } rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">🎯</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Strategic Impact
              </span>
            </div>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-gray-700 dark:text-gray-300`}
            >
              {impact.strategic.description ||
                "No strategic impact information available"}
            </p>
            {impact.strategic.competitiveAdvantage && (
              <p
                className={`${
                  compact ? "text-xs mt-0.5" : "text-sm mt-1"
                } text-gray-700 dark:text-gray-300`}
              >
                <span className="font-medium">Competitive Advantage: </span>
                {impact.strategic.competitiveAdvantage}
              </p>
            )}
          </div>
        )}

        {/* Regulatory Impact */}
        {impact.regulatory && (
          <div
            className={`${
              compact ? "p-2" : "p-3"
            } rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-1">
              <span className="mr-2">📜</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                Regulatory Impact
              </span>
            </div>
            <p
              className={`${
                compact ? "text-xs" : "text-sm"
              } text-gray-700 dark:text-gray-300`}
            >
              {impact.regulatory.description ||
                "No regulatory impact information available"}
            </p>
            {impact.regulatory.complianceImpact && (
              <p
                className={`${
                  compact ? "text-xs mt-0.5" : "text-sm mt-1"
                } text-gray-700 dark:text-gray-300`}
              >
                {impact.regulatory.complianceImpact}
              </p>
            )}
            {impact.regulatory.complianceViolations &&
              impact.regulatory.complianceViolations.length > 0 && (
                <div className="mt-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Potential Violations:{" "}
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {impact.regulatory.complianceViolations.map(
                      (violation, index) => (
                        <span
                          key={index}
                          className={`px-2 py-0.5 text-xs rounded-full bg-${color}-50 text-${color}-700 dark:bg-${color}-900 dark:bg-opacity-50 dark:text-${color}-300`}
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
