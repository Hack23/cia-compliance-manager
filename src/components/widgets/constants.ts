/**
 * Constants used by widget components
 */

// Compliance status values
export const COMPLIANCE_STATUS = {
  FULLY_COMPLIANT: "Meets all compliance requirements",
  SUBSTANTIALLY_COMPLIANT: "Meets most compliance requirements",
  BASIC_COMPLIANCE: "Meets basic compliance only",
  MINIMAL_COMPLIANCE: "Minimal compliance achieved",
  NON_COMPLIANT: "Does not meet compliance requirements"
};

// Test IDs for compliance status widget
export const COMPLIANCE_STATUS_TEST_IDS = {
  WIDGET: "compliance-status-widget",
  OVERALL_STATUS: "compliance-overall-status",
  COMPLIANT: "compliance-compliant-frameworks",
  PARTIAL: "compliance-partially-compliant-frameworks",
  NON_COMPLIANT: "compliance-non-compliant-frameworks",
  REMEDIATION_STEPS: "compliance-remediation-steps",
  FRAMEWORK_ITEM: "compliance-framework-item",
  REMEDIATION_STEP: "compliance-remediation-step"
};

// Don't re-export from itself, which causes circular dependency
