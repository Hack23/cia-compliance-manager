import { useMemo } from 'react';
import { COMPLIANCE_TEST_IDS } from '../../constants/testIds';
import { ComplianceService } from '../../services/complianceService';
import { SecurityLevel } from '../../types/cia';

export interface ComplianceStatusWidgetProps {
  securityLevel?: SecurityLevel;
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  className?: string;
  testId?: string;
}

/**
 * ComplianceStatusWidget displays the compliance status based on selected security levels
 * It shows compliant, partially compliant, and non-compliant frameworks
 * 
 * ## Business Perspective
 * 
 * This widget helps security officers visualize the organization's compliance status
 * across different regulatory frameworks based on the selected security levels. It
 * provides immediate feedback on compliance gaps and remediation steps needed. 📋
 * 
 * @param props - Component props
 * @returns A React component
 */
export default function ComplianceStatusWidget({
  securityLevel = 'Moderate',
  availabilityLevel = 'Moderate',
  integrityLevel = 'Moderate',
  confidentialityLevel = 'Moderate',
  className = '',
  testId = COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
}: ComplianceStatusWidgetProps) {
  // Use a consistent set of security levels, preferring individual levels over overall securityLevel
  const effectiveAvailabilityLevel = availabilityLevel || securityLevel;
  const effectiveIntegrityLevel = integrityLevel || securityLevel;
  const effectiveConfidentialityLevel = confidentialityLevel || securityLevel;
  
  // Calculate compliance status
  const complianceStatus = useMemo(() => {
    return ComplianceService.getComplianceStatus(
      effectiveAvailabilityLevel,
      effectiveIntegrityLevel,
      effectiveConfidentialityLevel
    );
  }, [effectiveAvailabilityLevel, effectiveIntegrityLevel, effectiveConfidentialityLevel]);
  
  // Get overall compliance status text
  const complianceStatusText = useMemo(() => {
    return ComplianceService.getComplianceStatusText(
      effectiveAvailabilityLevel,
      effectiveIntegrityLevel,
      effectiveConfidentialityLevel
    );
  }, [effectiveAvailabilityLevel, effectiveIntegrityLevel, effectiveConfidentialityLevel]);
  
  // Determine badge color based on status
  const getBadgeColor = () => {
    if (complianceStatusText.includes('Non-Compliant')) {
      return 'bg-red-100 text-red-800 border-red-500';
    } else if (complianceStatusText.includes('basic')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-500';
    } else if (complianceStatusText.includes('standard')) {
      return 'bg-blue-100 text-blue-800 border-blue-500';
    } else {
      return 'bg-green-100 text-green-800 border-green-500';
    }
  };

  return (
    <div 
      className={`p-4 border rounded-lg shadow-sm ${className}`}
      data-testid={testId}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Compliance Status</h3>
        <div 
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium border-l-4 ${getBadgeColor()}`}
          data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_STATUS_BADGE}
        >
          {complianceStatusText}
        </div>
      </div>
      
      {/* Compliant Frameworks */}
      {complianceStatus.compliantFrameworks.length > 0 && (
        <div className="mb-3">
          <h4 className="font-medium text-green-700 mb-1">Compliant</h4>
          <ul 
            className="pl-5 list-disc text-sm text-gray-700"
            data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_REQUIREMENTS_LIST}
          >
            {complianceStatus.compliantFrameworks.map((framework, index) => (
              <li 
                key={`compliant-${index}`}
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}
              >
                {framework}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Partially Compliant Frameworks */}
      {complianceStatus.partiallyCompliantFrameworks.length > 0 && (
        <div className="mb-3">
          <h4 className="font-medium text-yellow-700 mb-1">Partially Compliant</h4>
          <ul className="pl-5 list-disc text-sm text-gray-700">
            {complianceStatus.partiallyCompliantFrameworks.map((framework, index) => (
              <li 
                key={`partial-${index}`}
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}
              >
                {framework}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Non-Compliant Frameworks */}
      {complianceStatus.nonCompliantFrameworks.length > 0 && (
        <div className="mb-3">
          <h4 className="font-medium text-red-700 mb-1">Non-Compliant</h4>
          <ul className="pl-5 list-disc text-sm text-gray-700">
            {complianceStatus.nonCompliantFrameworks.map((framework, index) => (
              <li 
                key={`non-compliant-${index}`}
                data-testid={COMPLIANCE_TEST_IDS.COMPLIANCE_FRAMEWORK_ITEM}
              >
                {framework}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Remediation Steps */}
      {complianceStatus.remediationSteps && complianceStatus.remediationSteps.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="font-medium mb-1">Remediation Steps</h4>
          <ul className="pl-5 list-disc text-sm text-gray-700">
            {complianceStatus.remediationSteps.map((step, index) => (
              <li key={`step-${index}`}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
