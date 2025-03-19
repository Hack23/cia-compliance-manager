import React from "react";
import { SecurityLevel } from "../types/cia";
import SimpleSelector from "./common/SecurityLevelSelector";
import EnhancedSelector from "./securitylevel/SecurityLevelSelector";

// Import the interface for the enhanced selector props
interface EnhancedSelectorProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
  disabled?: boolean;
  compact?: boolean;
  testId?: string;
}

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
  compact?: boolean; // Add compact mode support

  // Control prop to force a specific version
  useEnhancedVersion?: boolean;
}

/**
 * A unified selector component that can operate in two modes:
 * 1. Simple mode: A single selector for one security level
 * 2. Enhanced mode: A comprehensive selector for all three CIA components
 * 
 * The component handles type conversion between string values (from UI) and
 * SecurityLevel type (for type safety) when passing values to parent components.
 */
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
    // For enhanced selector, ensure we have all the required props
    if (!props.availabilityLevel || !props.integrityLevel || !props.confidentialityLevel) {
      console.warn(
        "SecurityLevelSelector: Enhanced mode requires availabilityLevel, integrityLevel, and confidentialityLevel props"
      );
      return null;
    }

    // Create adapters for callback functions to handle typing correctly
    // These adapters convert string values from Selection component to SecurityLevel
    const handleAvailabilityChange = props.onAvailabilityChange 
      ? (value: string) => props.onAvailabilityChange!(value)
      : undefined;
      
    const handleIntegrityChange = props.onIntegrityChange
      ? (value: string) => props.onIntegrityChange!(value)
      : undefined;
      
    const handleConfidentialityChange = props.onConfidentialityChange
      ? (value: string) => props.onConfidentialityChange!(value)
      : undefined;

    // Create the enhanced props with proper type conversion handlers
    const enhancedProps: EnhancedSelectorProps = {
      availabilityLevel: props.availabilityLevel,
      integrityLevel: props.integrityLevel,
      confidentialityLevel: props.confidentialityLevel,
      onAvailabilityChange: handleAvailabilityChange as unknown as (level: SecurityLevel) => void,
      onIntegrityChange: handleIntegrityChange as unknown as (level: SecurityLevel) => void,
      onConfidentialityChange: handleConfidentialityChange as unknown as (level: SecurityLevel) => void,
      disabled: props.disabled,
      testId: props.testId,
    };
    
    return <EnhancedSelector {...enhancedProps} />;
  } else {
    // For simple selector, ensure we have required props
    if (!props.label || !props.value || !props.onChange || !props.options) {
      console.warn(
        "SecurityLevelSelector: Missing required props for simple selector"
      );
      return null;
    }

    // Create an adapter for the onChange handler to safely convert between types
    const handleChange = (securityLevel: SecurityLevel) => {
      // Call the provided onChange with the string value
      props.onChange?.(securityLevel);
    };

    // Extract only the props that SimpleSelector needs, with correct type handling
    const simpleProps = {
      label: props.label,
      value: props.value as SecurityLevel, // Cast to SecurityLevel safely
      onChange: handleChange, // Use the adapter function
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
