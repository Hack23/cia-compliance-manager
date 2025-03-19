import React, { useMemo } from 'react';
import { COMPLIANCE_STATUS } from '../../constants/coreConstants';
import { ComplianceService } from '../../services/complianceService';
import { SecurityLevel } from '../../types/cia';
import { ComplianceStatusWidgetProps } from '../../types/widgets';
import { isComplianceStatus } from '../../utils/typeGuards';

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
export default function ComplianceStatusWidget({
  className = '',
  testId = COMPLIANCE_STATUS_TEST_IDS.WIDGET,
  availabilityLevel = 'Moderate',
  integrityLevel = 'Moderate',
  confidentialityLevel = 'Moderate',
  securityLevel
}: ComplianceStatusWidgetProps): React.ReactElement {
  // If a single security level is provided, use it for all dimensions
  const availability = useMemo<SecurityLevel>(() => 
    availabilityLevel || securityLevel || 'Moderate'
  , [availabilityLevel, securityLevel]);
  
  const integrity = useMemo<SecurityLevel>(() => 
    integrityLevel || securityLevel || 'Moderate'
  , [integrityLevel, securityLevel]);
  
  const confidentiality = useMemo<SecurityLevel>(() => 
    confidentialityLevel || securityLevel || 'Moderate'
  , [confidentialityLevel, securityLevel]);
  
  // Get compliance status based on security levels
  const complianceStatus = useMemo(() => {
    return ComplianceService.getComplianceStatus(
      availability,
      integrity,
      confidentiality
    );
  }, [availability, integrity, confidentiality]);
  
  // Validate compliance status using type guard
  if (!isComplianceStatus(complianceStatus)) {
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
    availability,
    integrity,
    confidentiality
  );
  
  return (
    <div 
      className={`p-4 border rounded shadow-sm ${className}`}
      data-testid={testId}
    >
      <h3 data-testid={COMPLIANCE_STATUS_TEST_IDS.TITLE} className="text-lg font-medium mb-2">
        Compliance Status
      </h3>
      
      <div className="mb-3">
        <p className="font-medium">Overall Status:</p>
        <p className={`${getStatusColorClass(statusText)} font-medium`}>{statusText}</p>
      </div>
      
      {/* Compliant Frameworks */}
      {complianceStatus.compliantFrameworks.length > 0 && (
        <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.COMPLIANT}>
          <h4 className="font-medium text-green-700 mb-1">Compliant Frameworks</h4>
          <ul className="list-disc pl-5">
            {complianceStatus.compliantFrameworks.map((framework, index) => (
              <li 
                key={`compliant-${index}`} 
                className="text-sm" 
                data-testid={`${COMPLIANCE_STATUS_TEST_IDS.FRAMEWORK_ITEM}-compliant-${index}`}
              >
                {String(framework)}
                <span className="block text-xs text-gray-600 mt-1">
                  {ComplianceService.getFrameworkDescription(String(framework))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Partially Compliant Frameworks */}
      {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
        <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.PARTIAL}>
          <h4 className="font-medium text-yellow-700 mb-1">Partially Compliant Frameworks</h4>
          <ul className="list-disc pl-5">
            {complianceStatus.partiallyCompliantFrameworks.map((framework, index) => (
              <li 
                key={`partial-${index}`} 
                className="text-sm" 
                data-testid={`${COMPLIANCE_STATUS_TEST_IDS.FRAMEWORK_ITEM}-partial-${index}`}
              >
                {String(framework)}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Non-Compliant Frameworks */}
      {complianceStatus.nonCompliantFrameworks.length > 0 && (
        <div className="mb-4" data-testid={COMPLIANCE_STATUS_TEST_IDS.NON_COMPLIANT}>
          <h4 className="font-medium text-red-700 mb-1">Non-Compliant Frameworks</h4>
          <ul className="list-disc pl-5">
            {complianceStatus.nonCompliantFrameworks.map((framework, index) => (
              <li 
                key={`non-compliant-${index}`} 
                className="text-sm" 
                data-testid={`${COMPLIANCE_STATUS_TEST_IDS.FRAMEWORK_ITEM}-non-compliant-${index}`}
              >
                {String(framework)}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Remediation Steps */}
      {complianceStatus.remediationSteps && complianceStatus.remediationSteps.length > 0 && (
        <div data-testid={COMPLIANCE_STATUS_TEST_IDS.REMEDIATION}>
          <h4 className="font-medium text-blue-700 mb-1">Recommended Actions</h4>
          <ul className="list-disc pl-5">
            {complianceStatus.remediationSteps.map((step, index) => (
              <li key={`step-${index}`} className="text-sm mb-1">{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

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
