import { useEffect, useState } from "react";
import { WithSecurityLevelProps } from "../hoc/withSecurityLevelState";
import { SecurityLevel } from "../types/cia";

/**
 * Hook for synchronizing security level state between component props and internal state
 *
 * This hook provides a way to manage security level state that can be controlled
 * both by component props and internal state, maintaining synchronization between them.
 *
 * ## Business Perspective
 *
 * Security level synchronization ensures that components reflect the organization's
 * current security posture accurately throughout the application. This maintains
 * consistency in assessment and reporting. 🔒
 *
 * @param propsOrAvailability - Either component props with levels or direct availability level
 * @param integrityOrCallbacks - Either integrity level or object with callbacks
 * @param confidentiality - Confidentiality level (only used in direct mode)
 * @returns Object containing local state and setters
 */
export function useSecurityLevelSync(
  propsOrAvailability: WithSecurityLevelProps | SecurityLevel = "Moderate",
  integrityOrCallbacks:
    | SecurityLevel
    | {
        onAvailabilityChange?: (level: SecurityLevel) => void;
        onIntegrityChange?: (level: SecurityLevel) => void;
        onConfidentialityChange?: (level: SecurityLevel) => void;
      } = "Moderate",
  confidentiality: SecurityLevel = "Moderate"
) {
  // Determine if we're using the object props format or direct params
  const isObjectProps = typeof propsOrAvailability === "object";

  // Extract values based on the calling pattern
  const availability = isObjectProps
    ? propsOrAvailability.availabilityLevel || "Moderate"
    : propsOrAvailability;

  const integrity = isObjectProps
    ? propsOrAvailability.integrityLevel || "Moderate"
    : typeof integrityOrCallbacks === "string"
    ? integrityOrCallbacks
    : "Moderate";

  const confidentialityLevel = isObjectProps
    ? propsOrAvailability.confidentialityLevel || "Moderate"
    : confidentiality;

  // Extract callbacks
  const callbacks = isObjectProps
    ? {
        onAvailabilityChange: propsOrAvailability.onAvailabilityChange,
        onIntegrityChange: propsOrAvailability.onIntegrityChange,
        onConfidentialityChange: propsOrAvailability.onConfidentialityChange,
      }
    : typeof integrityOrCallbacks === "object"
    ? integrityOrCallbacks
    : {};

  // Set up local state
  const [availabilityLevel, setAvailabilityLevel] =
    useState<SecurityLevel>(availability);
  const [integrityLevel, setIntegrityLevel] =
    useState<SecurityLevel>(integrity);
  const [confidLevel, setConfidLevel] =
    useState<SecurityLevel>(confidentialityLevel);

  // Create handlers that call both local state and callbacks
  const handleAvailabilityChange = (level: SecurityLevel) => {
    setAvailabilityLevel(level);
    callbacks.onAvailabilityChange?.(level);
  };

  const handleIntegrityChange = (level: SecurityLevel) => {
    setIntegrityLevel(level);
    callbacks.onIntegrityChange?.(level);
  };

  const handleConfidentialityChange = (level: SecurityLevel) => {
    setConfidLevel(level);
    callbacks.onConfidentialityChange?.(level);
  };

  // Keep local state in sync with props
  useEffect(() => {
    if (availability !== availabilityLevel) {
      setAvailabilityLevel(availability);
    }
  }, [availability]);

  useEffect(() => {
    if (integrity !== integrityLevel) {
      setIntegrityLevel(integrity);
    }
  }, [integrity]);

  useEffect(() => {
    if (confidentialityLevel !== confidLevel) {
      setConfidLevel(confidentialityLevel);
    }
  }, [confidentialityLevel]);

  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel: confidLevel,
    setAvailabilityLevel: handleAvailabilityChange,
    setIntegrityLevel: handleIntegrityChange,
    setConfidentialityLevel: handleConfidentialityChange,
  };
}
