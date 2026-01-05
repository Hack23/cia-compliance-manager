import React from "react";
import { ImplementationGuidancePanelProps } from "../../../types/componentPropExports";

/**
 * ImplementationGuidancePanel component - displays implementation tips and guidance
 * 
 * ## Business Perspective
 * 
 * Provides actionable implementation guidance to security teams, helping them
 * understand effort requirements and common challenges for each CIA component.
 * Improves implementation success rates and resource planning. 🎯
 * 
 * ## Technical Perspective
 * 
 * Extracted from SecurityResourcesWidget to improve maintainability and reduce file size.
 * Provides component-specific implementation guidance for the CIA triad with compact
 * spacing and progressive disclosure patterns.
 * 
 * @component
 * 
 * @example
 * ```tsx
 * <ImplementationGuidancePanel
 *   implementationGuides={guides}
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="High"
 * />
 * ```
 */
const ImplementationGuidancePanel: React.FC<ImplementationGuidancePanelProps> = ({
  implementationGuides,
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  className = "",
  testId = "implementation-guidance-panel",
}) => {
  return (
    <div className={`mt-lg ${className}`} data-testid={testId}>
      <h3 className="text-lg font-medium mb-md">Implementation Tips</h3>

      <div className="space-y-sm">
        {/* General implementation tips */}
        <div className="p-sm bg-neutral-light/10 dark:bg-neutral-dark/20 rounded-md">
          <h4 className="text-md font-medium mb-sm">
            Getting Started with Implementation
          </h4>
          <ol className="list-decimal list-inside space-y-xs text-sm text-gray-600 dark:text-gray-400 pl-md">
            <li>Begin with a thorough assessment of your current security controls</li>
            <li>Prioritize implementations based on risk exposure and business impact</li>
            <li>Implement controls gradually, starting with foundational elements</li>
            <li>Document your implementation process and security configurations</li>
            <li>Test and validate controls after implementation</li>
          </ol>
        </div>

        {/* Component-specific tips */}
        {implementationGuides.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-sm">
            {/* Confidentiality Implementation */}
            {implementationGuides[2] && (
              <div className="p-sm bg-primary-light/10 dark:bg-primary-dark/20 rounded-md border border-primary-light dark:border-primary-dark">
                <h4 className="text-md font-medium mb-sm text-primary-dark dark:text-primary-light flex items-center">
                  <span className="mr-sm">🔒</span>Confidentiality ({confidentialityLevel})
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-sm">
                    {implementationGuides[2].description ||
                      "Focus on data protection and access controls."}
                  </p>
                  <div className="text-xs space-y-xs">
                    <div>
                      <span className="font-medium">Expertise:</span>{" "}
                      {implementationGuides[2].expertiseLevel || "Standard"}
                    </div>
                    <div>
                      <span className="font-medium">Effort:</span>{" "}
                      {implementationGuides[2].developmentEffort || "Medium"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Integrity Implementation */}
            {implementationGuides[1] && (
              <div className="p-sm bg-success-light/10 dark:bg-success-dark/20 rounded-md border border-success-light dark:border-success-dark">
                <h4 className="text-md font-medium mb-sm text-green-700 dark:text-green-300 flex items-center">
                  <span className="mr-sm">✓</span>Integrity ({integrityLevel})
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-sm">
                    {implementationGuides[1].description ||
                      "Focus on data accuracy and validation mechanisms."}
                  </p>
                  <div className="text-xs space-y-xs">
                    <div>
                      <span className="font-medium">Expertise:</span>{" "}
                      {implementationGuides[1].expertiseLevel || "Standard"}
                    </div>
                    <div>
                      <span className="font-medium">Effort:</span>{" "}
                      {implementationGuides[1].developmentEffort || "Medium"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Availability Implementation */}
            {implementationGuides[0] && (
              <div className="p-sm bg-info-light/10 dark:bg-info-dark/20 rounded-md border border-info-light dark:border-info-dark">
                <h4 className="text-md font-medium mb-sm text-blue-700 dark:text-blue-300 flex items-center">
                  <span className="mr-sm">⏱️</span>Availability ({availabilityLevel})
                </h4>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-sm">
                    {implementationGuides[0].description ||
                      "Focus on systems uptime and recovery capabilities."}
                  </p>
                  <div className="text-xs space-y-xs">
                    <div>
                      <span className="font-medium">Expertise:</span>{" "}
                      {implementationGuides[0].expertiseLevel || "Standard"}
                    </div>
                    <div>
                      <span className="font-medium">Effort:</span>{" "}
                      {implementationGuides[0].developmentEffort || "Medium"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Common Implementation Challenges */}
        <div className="p-sm bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-100 dark:border-yellow-800">
          <h4 className="text-md font-medium mb-sm text-yellow-700 dark:text-yellow-300 flex items-center">
            <span className="mr-sm">⚠️</span>Common Implementation Challenges
          </h4>
          <ul className="list-disc list-inside space-y-xs text-sm text-gray-600 dark:text-gray-400 pl-md">
            <li>Balancing security with usability and performance</li>
            <li>Maintaining consistent controls across different environments</li>
            <li>Integration with legacy systems and applications</li>
            <li>Building security expertise and awareness across teams</li>
            <li>Allocating sufficient resources for ongoing maintenance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImplementationGuidancePanel;
