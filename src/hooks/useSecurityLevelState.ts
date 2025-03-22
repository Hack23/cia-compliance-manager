import { useEffect } from "react";
import { useSecurityLevelContext } from "../contexts/SecurityLevelContext";
import { SecurityLevel } from "../types/cia";

// Export the options type directly for documentation purposes
export type { UseSecurityLevelStateOptions } from "../types/componentPropExports";

/**
 * Options for useSecurityLevelState hook
 */
interface UseSecurityLevelStateOptions {
  /**
   * Override default availability level with component-specific value
   */
  availabilityLevel?: SecurityLevel;

  /**
   * Override default integrity level with component-specific value
   */
  integrityLevel?: SecurityLevel;

  /**
   * Override default confidentiality level with component-specific value
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * Custom handler for availability changes
   */
  onAvailabilityChange?: (level: SecurityLevel) => void;

  /**
   * Custom handler for integrity changes
   */
  onIntegrityChange?: (level: SecurityLevel) => void;

  /**
   * Custom handler for confidentiality changes
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

/**
 * Hook that combines global security level context with component-specific overrides
 *
 * This provides a unified way for components to both read from global state
 * and propagate changes back to it, while allowing component-specific overrides.
 *
 * @param options Configuration options including overrides and change handlers
 * @returns Security levels and setter functions
 */
export function useSecurityLevelState(
  options: UseSecurityLevelStateOptions = {}
) {
  // Access the global security level context
  const context = useSecurityLevelContext();

  // Apply component-specific overrides if provided
  const availabilityLevel =
    options.availabilityLevel || context.availabilityLevel;
  const integrityLevel = options.integrityLevel || context.integrityLevel;
  const confidentialityLevel =
    options.confidentialityLevel || context.confidentialityLevel;

  // Create handler functions that call both context and component handlers
  const handleAvailabilityChange = (level: SecurityLevel) => {
    // Call global context handler
    context.setAvailabilityLevel(level);

    // Call component-specific handler if provided
    if (options.onAvailabilityChange) {
      options.onAvailabilityChange(level);
    }
  };

  const handleIntegrityChange = (level: SecurityLevel) => {
    // Call global context handler
    context.setIntegrityLevel(level);

    // Call component-specific handler if provided
    if (options.onIntegrityChange) {
      options.onIntegrityChange(level);
    }
  };

  const handleConfidentialityChange = (level: SecurityLevel) => {
    // Call global context handler
    context.setConfidentialityLevel(level);

    // Call component-specific handler if provided
    if (options.onConfidentialityChange) {
      options.onConfidentialityChange(level);
    }
  };

  // Sync with context if component-specific values change
  useEffect(() => {
    if (
      options.availabilityLevel &&
      options.availabilityLevel !== context.availabilityLevel
    ) {
      context.setAvailabilityLevel(options.availabilityLevel);
    }
  }, [options.availabilityLevel, context]);

  useEffect(() => {
    if (
      options.integrityLevel &&
      options.integrityLevel !== context.integrityLevel
    ) {
      context.setIntegrityLevel(options.integrityLevel);
    }
  }, [options.integrityLevel, context]);

  useEffect(() => {
    if (
      options.confidentialityLevel &&
      options.confidentialityLevel !== context.confidentialityLevel
    ) {
      context.setConfidentialityLevel(options.confidentialityLevel);
    }
  }, [options.confidentialityLevel, context]);

  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel: handleAvailabilityChange,
    setIntegrityLevel: handleIntegrityChange,
    setConfidentialityLevel: handleConfidentialityChange,
  };
}
