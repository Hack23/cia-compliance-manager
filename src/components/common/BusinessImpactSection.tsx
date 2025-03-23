import React from "react";
import { BusinessImpactDetails } from "../../types/cia-services";
import { getRiskBadgeVariant } from "../../utils";

interface BusinessImpactSectionProps {
  impact: BusinessImpactDetails;
  color: string;
  testId?: string;
}

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
  const riskLevel =
    impact.financial?.riskLevel || impact.operational?.riskLevel || "Unknown";

  // Get appropriate badge variant for risk level
  const badgeVariant = getRiskBadgeVariant(riskLevel);

  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border shadow-sm security-card"
      data-testid={testId}
    >
      <h4 className="text-md font-medium mb-3 flex items-center">
        <span className="mr-2">💼</span>
        Business Impact
      </h4>

      <p
        className="text-gray-600 dark:text-gray-300 mb-4"
        data-testid={`${testId}-summary`}
      >
        {impact.summary || "No business impact data available"}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Financial Impact */}
        {impact.financial && (
          <div
            className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">💰</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300`}
              >
                Financial Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.financial.description ||
                "No financial impact information available"}
            </p>
            {impact.financial.annualRevenueLoss && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Annual Revenue Loss: </span>
                {impact.financial.annualRevenueLoss}
              </p>
            )}
          </div>
        )}

        {/* Operational Impact */}
        {impact.operational && (
          <div
            className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">⚙️</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300`}
              >
                Operational Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.operational.description ||
                "No operational impact information available"}
            </p>
            {impact.operational.meanTimeToRecover && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Mean Time to Recover: </span>
                {impact.operational.meanTimeToRecover}
              </p>
            )}
          </div>
        )}

        {/* Reputational Impact */}
        {impact.reputational && (
          <div
            className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">🏆</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300`}
              >
                Reputational Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.reputational.description ||
                "No reputational impact information available"}
            </p>
            {impact.reputational.reputationalImpact && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {impact.reputational.reputationalImpact}
              </p>
            )}
          </div>
        )}

        {/* Strategic Impact */}
        {impact.strategic && (
          <div
            className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">🎯</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300`}
              >
                Strategic Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.strategic.description ||
                "No strategic impact information available"}
            </p>
            {impact.strategic.competitiveAdvantage && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-medium">Competitive Advantage: </span>
                {impact.strategic.competitiveAdvantage}
              </p>
            )}
          </div>
        )}

        {/* Regulatory Impact */}
        {impact.regulatory && (
          <div
            className={`p-3 rounded-md bg-opacity-10 bg-${color}-100 dark:bg-${color}-900 dark:bg-opacity-20 border border-${color}-200 dark:border-${color}-800`}
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">📜</span>
              <span
                className={`font-medium text-${color}-700 dark:text-${color}-300`}
              >
                Regulatory Impact
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {impact.regulatory.description ||
                "No regulatory impact information available"}
            </p>
            {impact.regulatory.complianceImpact && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
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
