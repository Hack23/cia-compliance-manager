import React from "react";
import { SECURITY_SUMMARY_WIDGET_IDS } from "../../../constants/testIds";
import { SecurityLevel } from "../../../types/cia";
import { getImplementationDescription } from "../../../utils/implementationUtils";

/**
 * Props for SecurityImplementationTab component
 */
export interface SecurityImplementationTabProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  implementationComplexity: string;
  testId: string;
  implementationTime: string;
  requiredResources: string;
}

/**
 * Implementation tab component for SecuritySummaryWidget
 * Displays implementation requirements, timeline, resources, and considerations
 */
export const SecurityImplementationTab: React.FC<
  SecurityImplementationTabProps
> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  implementationComplexity,
  testId,
  implementationTime,
  requiredResources,
}) => {
  return (
    <div
      data-testid={testId || SECURITY_SUMMARY_WIDGET_IDS.section('content-implementation')}
      className="space-y-4"
    >
      {/* Implementation introduction */}
      <div className="p-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg mb-md">
        <p className="text-sm">
          This section summarizes implementation requirements for your selected
          security levels, helping plan resources, timelines, and technical
          approaches.
        </p>
      </div>

      {/* Implementation Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-md text-gray-800 dark:text-gray-100">
          Implementation Overview
        </h3>

        <div className="mb-md">
          <div className="flex items-center justify-between mb-sm">
            <div className="text-md font-medium">Implementation Complexity:</div>
            <div className="font-medium">{implementationComplexity}</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                implementationComplexity === "Low"
                  ? "w-1/4 bg-green-500"
                  : implementationComplexity === "Moderate"
                  ? "w-2/4 bg-yellow-500"
                  : implementationComplexity === "High"
                  ? "w-3/4 bg-orange-500"
                  : "w-full bg-red-500"
              }`}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-sm">
            {implementationComplexity === "Low"
              ? "Basic security controls with straightforward implementation"
              : implementationComplexity === "Moderate"
              ? "Standard security measures with moderate implementation effort"
              : implementationComplexity === "High"
              ? "Advanced security controls requiring significant implementation effort"
              : "Comprehensive security framework requiring extensive resources"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
          {/* Implementation Timeline */}
          <div className="p-md bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-xs">
              Estimated Implementation Time
            </div>
            <div className="text-lg font-bold">{implementationTime}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Typical project timeline
            </div>
          </div>

          {/* Required Resources */}
          <div className="p-md bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-sm font-medium mb-xs">Required Resources</div>
            <div className="text-lg font-bold">{requiredResources}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Resource allocation recommendation
            </div>
          </div>
        </div>
      </div>

      {/* Component Implementation Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-md text-gray-800 dark:text-gray-100">
          Component Implementation Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
          {/* Confidentiality Implementation */}
          <div className="p-md bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-lg border border-purple-100 dark:border-purple-800">
            <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-sm">
              Confidentiality Implementation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getImplementationDescription(
                "confidentiality",
                confidentialityLevel
              )}
            </p>
            <div className="mt-sm text-xs font-medium text-purple-700 dark:text-purple-300">
              Level: {confidentialityLevel}
            </div>
          </div>

          {/* Integrity Implementation */}
          <div className="p-md bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="font-medium text-green-700 dark:text-green-300 mb-sm">
              Integrity Implementation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getImplementationDescription("integrity", integrityLevel)}
            </p>
            <div className="mt-sm text-xs font-medium text-green-700 dark:text-green-300">
              Level: {integrityLevel}
            </div>
          </div>

          {/* Availability Implementation */}
          <div className="p-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-sm">
              Availability Implementation
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getImplementationDescription("availability", availabilityLevel)}
            </p>
            <div className="mt-sm text-xs font-medium text-blue-700 dark:text-blue-300">
              Level: {availabilityLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Considerations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-md border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-md text-gray-800 dark:text-gray-100">
          Implementation Considerations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div className="p-md bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg">
            <h4 className="font-medium text-yellow-700 dark:text-yellow-300">
              Success Factors
            </h4>
            <ul className="mt-sm space-y-1 list-disc list-inside text-sm">
              <li>Executive sponsorship and support</li>
              <li>Clear security requirements definition</li>
              <li>Adequate resource allocation</li>
              <li>Proper testing and validation</li>
              <li>Staff training and awareness</li>
            </ul>
          </div>

          <div className="p-md bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">
              Key Challenges
            </h4>
            <ul className="mt-sm space-y-1 list-disc list-inside text-sm">
              <li>Balancing security with usability</li>
              <li>Integration with existing systems</li>
              <li>Managing scope and expectations</li>
              <li>Maintaining consistent controls</li>
              <li>Securing necessary expertise</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
