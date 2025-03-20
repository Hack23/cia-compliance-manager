import React, { useEffect, useState } from "react";
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
    <div className={`border rounded-lg shadow-sm h-100 ${className}`} data-testid={testId}>
      <div className="p-3 border-bottom bg-light">
        <h3 data-testid={COMPLIANCE_STATUS_TEST_IDS.TITLE} className="mb-0">
          Compliance Status
        </h3>
      </div>
      <div className="p-3">
        <div className="mb-3">
          <p className="font-medium">Overall Status:</p>
          <p className={`${getStatusColorClass(statusText)} font-medium`}>{statusText}</p>
        </div>
        
        {/* Compliant Frameworks */}
        {complianceStatus.compliantFrameworks.length > 0 && (
          <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.COMPLIANT}>
            <h4 className="font-medium text-green-700 mb-1">Compliant Frameworks</h4>
            <ul className="list-group mb-3">
              {complianceStatus.compliantFrameworks.map((framework: string, index: number) => (
                <li 
                  key={`compliant-${index}`}
                  className="list-group-item list-group-item-success d-flex justify-content-between align-items-center"
                  data-testid={`compliant-framework-${index}`}
                >
                  <div>
                    <strong>{framework}</strong>
                    <div className="text-muted small">
                      {ComplianceService.getFrameworkDescription(String(framework))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Partially Compliant Frameworks */}
        {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
          <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.PARTIAL}>
            <h4 className="font-medium text-yellow-700 mb-1">Partially Compliant Frameworks</h4>
            <ul className="list-group mb-3">
              {complianceStatus.partiallyCompliantFrameworks.map((framework: string, index: number) => (
                <li 
                  key={`partial-${index}`}
                  className="list-group-item list-group-item-warning d-flex justify-content-between align-items-center"
                  data-testid={`partial-framework-${index}`}
                >
                  <div>
                    <strong>{framework}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Non-Compliant Frameworks */}
        {complianceStatus.nonCompliantFrameworks.length > 0 && (
          <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.NON_COMPLIANT}>
            <h4 className="font-medium text-red-700 mb-1">Non-Compliant Frameworks</h4>
            <ul className="list-group mb-3">
              {complianceStatus.nonCompliantFrameworks.map((framework: string, index: number) => (
                <li 
                  key={`non-compliant-${index}`}
                  className="list-group-item list-group-item-danger d-flex justify-content-between align-items-center"
                  data-testid={`non-compliant-framework-${index}`}
                >
                  <div>
                    <strong>{framework}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Remediation Steps */}
        {complianceStatus.remediationSteps && complianceStatus.remediationSteps.length > 0 && (
          <div data-testid={COMPLIANCE_STATUS_TEST_IDS.REMEDIATION}>
            <h4 className="font-medium text-blue-700 mb-1">Recommended Actions</h4>
            <ul className="list-group">
              {complianceStatus.remediationSteps?.map((step: string, index: number) => (
                <li 
                  key={`step-${index}`}
                  className="list-group-item text-sm mb-1"
                >
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Get the appropriate color class based on compliance status text
 * 
 * @param statusText - Compliance status text
 * @returns CSS class for text color
 */
function getStatusColorClass(statusText: string): string {
  switch (statusText) {
    case COMPLIANCE_STATUS.FULL_COMPLIANCE:
      return 'text-green-700';
    case COMPLIANCE_STATUS.STANDARD_COMPLIANCE:
      return 'text-blue-700';
    case COMPLIANCE_STATUS.BASIC_COMPLIANCE:
      return 'text-yellow-700';
    default:
      return 'text-red-700';
  }
}

// Add a default export to maintain backward compatibility
export default ComplianceStatusWidget;
