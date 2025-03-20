import React, { useEffect, useState } from "react";
import withSecurityLevelState from "../../hoc/withSecurityLevelState";
import { ComplianceStatus } from "../../services/complianceService";
import { ComplianceService } from "../../services/ComplianceServiceAdapter";
import { SecurityLevel } from "../../types/cia";

/**
 * Props for ComplianceStatusWidget
 */
export interface ComplianceStatusWidgetProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  refreshTrigger?: number;
  className?: string;
  testId?: string;
}

/**
 * Compliance status constants
 */
const COMPLIANCE_STATUS = {
  FULL_COMPLIANCE: 'Compliant with all major frameworks',
  STANDARD_COMPLIANCE: 'Compliant with standard frameworks',
  BASIC_COMPLIANCE: 'Meets basic compliance only',
  NON_COMPLIANT: 'Non-Compliant'
};

/**
 * Test IDs for compliance status widget components
 */
export const COMPLIANCE_STATUS_TEST_IDS = {
  WIDGET: 'widget-compliance-status',
  TITLE: 'compliance-status-title',
  COMPLIANT: 'compliant-frameworks',
  PARTIAL: 'partially-compliant-frameworks',
  NON_COMPLIANT: 'non-compliant-frameworks',
  REMEDIATION: 'remediation-steps',
  FRAMEWORK_ITEM: 'framework-item'
};

/**
 * ComplianceStatusWidget displays the compliance status based on selected security levels
 * It shows compliant, partially compliant, and non-compliant frameworks
 * 
 * ## Business Perspective
 * 
 * This widget helps security officers visualize the current compliance status
 * across different regulatory frameworks. The color-coding provides immediate 
 * feedback on which frameworks are met, partially met, or not met. 📋
 * 
 * The remediation steps provide actionable guidance for improving compliance
 * posture, helping organizations prioritize security investments. 💼
 */
export const ComplianceStatusWidget: React.FC<ComplianceStatusWidgetProps> = ({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  refreshTrigger = 0,
  className = '',
  testId = 'compliance-status-widget'
}) => {
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus & { score?: number; requirements?: string[] }>({
    compliantFrameworks: [],
    partiallyCompliantFrameworks: [],
    nonCompliantFrameworks: [],
    remediationSteps: [],
    score: 0,
    requirements: [],
  });

  useEffect(() => {
    // Get compliance status from service
    const status = ComplianceService.getComplianceStatus(
      availabilityLevel,
      integrityLevel,
      confidentialityLevel
    );

    setComplianceStatus(status);
  }, [availabilityLevel, integrityLevel, confidentialityLevel, refreshTrigger]);

  // Type guard function to validate compliance status
  const isValidComplianceStatus = (status: any): status is ComplianceStatus => {
    return status && 
      Array.isArray(status.compliantFrameworks) && 
      Array.isArray(status.partiallyCompliantFrameworks) && 
      Array.isArray(status.nonCompliantFrameworks);
  };

  // Validate compliance status using type guard
  if (!isValidComplianceStatus(complianceStatus)) {
    console.error('Invalid compliance status received from service');
    return (
      <div 
        className={`p-4 border rounded shadow-sm ${className}`}
        data-testid={testId}
      >
        <h3 data-testid={COMPLIANCE_STATUS_TEST_IDS.TITLE} className="text-lg font-medium mb-2">
          Compliance Status
        </h3>
        <p>Error retrieving compliance status. Please try again.</p>
      </div>
    );
  }
  
  // Get overall compliance status text
  const statusText = ComplianceService.getComplianceStatusText(
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  );
  
  return (
    <div className={`border rounded-lg shadow-sm h-full ${className}`} data-testid={testId}>
      <div className="p-3 border-b bg-gray-50 dark:bg-gray-800">
        <h3 data-testid={COMPLIANCE_STATUS_TEST_IDS.TITLE} className="text-lg font-medium">
          Compliance Status
        </h3>
      </div>
      
      {/* Loading state */}
      {!complianceStatus ? (
        <div className="p-4 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="p-4">
          <div className="mb-4">
            <p className="font-medium">Overall Status:</p>
            <p className={`${getStatusTailwindClass(statusText)} font-medium`}>{statusText}</p>
          </div>
          
          {/* Compliant Frameworks */}
          {complianceStatus.compliantFrameworks.length > 0 && (
            <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.COMPLIANT}>
              <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Compliant Frameworks</h4>
              <div className="space-y-2">
                {complianceStatus.compliantFrameworks.map((framework: string, index: number) => (
                  <div 
                    key={`compliant-${index}`}
                    className="p-3 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg border border-green-200 dark:border-green-800"
                    data-testid={`compliant-framework-${index}`}
                  >
                    <div className="font-medium">{framework}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {ComplianceService.getFrameworkDescription(String(framework))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Partially Compliant Frameworks */}
          {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
            <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.PARTIAL}>
              <h4 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Partially Compliant Frameworks</h4>
              <div className="space-y-2">
                {complianceStatus.partiallyCompliantFrameworks.map((framework: string, index: number) => (
                  <div 
                    key={`partial-${index}`}
                    className="p-3 bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                    data-testid={`partial-framework-${index}`}
                  >
                    <div className="font-medium">{framework}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Non-Compliant Frameworks */}
          {complianceStatus.nonCompliantFrameworks.length > 0 && (
            <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.NON_COMPLIANT}>
              <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">Non-Compliant Frameworks</h4>
              <div className="space-y-2">
                {complianceStatus.nonCompliantFrameworks.map((framework: string, index: number) => (
                  <div 
                    key={`non-compliant-${index}`}
                    className="p-3 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-lg border border-red-200 dark:border-red-800"
                    data-testid={`non-compliant-framework-${index}`}
                  >
                    <div className="font-medium">{framework}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Remediation Steps */}
          {complianceStatus.remediationSteps && complianceStatus.remediationSteps.length > 0 && (
            <div data-testid={COMPLIANCE_STATUS_TEST_IDS.REMEDIATION}>
              <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Recommended Actions</h4>
              <div className="space-y-2">
                {complianceStatus.remediationSteps?.map((step: string, index: number) => (
                  <div 
                    key={`step-${index}`}
                    className="p-3 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Get the appropriate color class based on compliance status text
 * 
 * @param statusText - Compliance status text
 * @returns CSS class for text color
 */
function getStatusTailwindClass(statusText: string): string {
  switch (statusText) {
    case COMPLIANCE_STATUS.FULL_COMPLIANCE:
      return 'text-green-700 dark:text-green-400';
    case COMPLIANCE_STATUS.STANDARD_COMPLIANCE:
      return 'text-blue-700 dark:text-blue-400';
    case COMPLIANCE_STATUS.BASIC_COMPLIANCE:
      return 'text-yellow-700 dark:text-yellow-400';
    default:
      return 'text-red-700 dark:text-red-400';
  }
}

// Add a default export wrapped with security level state management
export default withSecurityLevelState(ComplianceStatusWidget);
