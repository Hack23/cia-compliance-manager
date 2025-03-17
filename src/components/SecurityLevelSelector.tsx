import React from "react";
import { SecurityLevel } from "../types/cia";
import SimpleSelector from "./common/SecurityLevelSelector";
import EnhancedSelector from "./securitylevel/SecurityLevelSelector";

/**
 * Unified SecurityLevelSelector that supports both simple and enhanced usage patterns
 *
 * ## Business Perspective
 *
 * Provides a consistent interface for security level selection across the application,
 * enabling both simple scenarios and comprehensive CIA triad security assessment.
 *
 * @param props - Component properties (supports both simple and enhanced selector props)
 * @returns The appropriate selector component based on provided props
 */
export interface UnifiedSecurityLevelSelectorProps {
  // Simple selector props
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: string[];
  description?: string;
  icon?: string;
  tooltipContent?: string;
  testId?: string;
  accentColor?: string;
  disabled?: boolean;
  className?: string;

  // Enhanced selector props
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  availabilityOptions?: Record<string, any>;
  integrityOptions?: Record<string, any>;
  confidentialityOptions?: Record<string, any>;
  showSelectionSummary?: boolean;
  showDescriptions?: boolean;

  // Control prop to force a specific version
  useEnhancedVersion?: boolean;
}

const SecurityLevelSelector: React.FC<UnifiedSecurityLevelSelectorProps> = (
  props
) => {
  // Determine which version to render based on props
  const isEnhancedVersion =
    props.useEnhancedVersion ||
    props.availabilityLevel !== undefined ||
    props.integrityLevel !== undefined ||
    props.confidentialityLevel !== undefined ||
    props.onAvailabilityChange !== undefined ||
    props.onIntegrityChange !== undefined ||
    props.onConfidentialityChange !== undefined;

  // Use either the enhanced or simple version based on props provided
  if (isEnhancedVersion) {
    // For enhanced selector, ensure we properly set defaults for required props
    const enhancedProps = {
      availabilityLevel: props.availabilityLevel || ("None" as SecurityLevel),
      integrityLevel: props.integrityLevel || ("None" as SecurityLevel),
      confidentialityLevel:
        props.confidentialityLevel || ("None" as SecurityLevel),
      ...props,
    };
    return <EnhancedSelector {...enhancedProps} />;
  } else {
    // For simple selector, ensure we provide the required props
    if (!props.label || !props.value || !props.onChange || !props.options) {
      console.warn(
        "SecurityLevelSelector: Missing required props for simple selector"
      );
      return null;
    }

    // Extract only the props that SimpleSelector needs, ensuring they're non-optional
    const simpleProps = {
      label: props.label,
      value: props.value,
      onChange: props.onChange,
      options: props.options,
      // Optional props can be passed as is
      description: props.description,
      icon: props.icon,
      tooltipContent: props.tooltipContent,
      testId: props.testId,
      accentColor: props.accentColor,
      disabled: props.disabled,
      className: props.className,
    };

    return <SimpleSelector {...simpleProps} />;
  }
};

export default SecurityLevelSelector;
