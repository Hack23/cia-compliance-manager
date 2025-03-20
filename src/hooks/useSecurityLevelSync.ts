import { useEffect, useState } from 'react';
import { WithSecurityLevelProps } from '../hoc/withSecurityLevelState';
import { SecurityLevel } from '../types/cia';

/**
 * Hook for synchronizing security level state with props
 * 
 * This hook provides a way for components to maintain local state
 * of security levels while keeping in sync with parent props.
 * 
 * @param propsOrAvailability - Either props object or availability level
 * @param integrityOrCallbacks - Either integrity level or callbacks object
 * @param confidentiality - Confidentiality level (only used in direct mode)
 * @returns Object containing local state and setters
 */
export function useSecurityLevelSync(
  propsOrAvailability: WithSecurityLevelProps | SecurityLevel = "Moderate",
  integrityOrCallbacks: SecurityLevel | {
    onAvailabilityChange?: (level: SecurityLevel) => void;
    onIntegrityChange?: (level: SecurityLevel) => void;
    onConfidentialityChange?: (level: SecurityLevel) => void;
  } = "Moderate",
  confidentiality: SecurityLevel = "Moderate"
) {
  // Determine if we're using the object props format or direct params
  const isObjectProps = typeof propsOrAvailability === 'object';

  // Extract values based on the calling pattern
  const availability = isObjectProps
    ? propsOrAvailability.availabilityLevel || "Moderate"
    : propsOrAvailability;

  const integrity = isObjectProps
    ? propsOrAvailability.integrityLevel || "Moderate"
    : integrityOrCallbacks as SecurityLevel;

  const confidentialityLevel = isObjectProps
    ? propsOrAvailability.confidentialityLevel || "Moderate"
    : confidentiality;

  // Create local state for each security level
  const [localAvailabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(availability);
  const [localIntegrityLevel, setIntegrityLevel] = useState<SecurityLevel>(integrity);
  const [localConfidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(confidentialityLevel);

  // Sync local state with props
  useEffect(() => {
    if (availability !== localAvailabilityLevel) {
      setAvailabilityLevel(availability);
    }
  }, [availability]);

  useEffect(() => {
    if (integrity !== localIntegrityLevel) {
      setIntegrityLevel(integrity);
    }
  }, [integrity]);

  useEffect(() => {
    if (confidentialityLevel !== localConfidentialityLevel) {
      setConfidentialityLevel(confidentialityLevel);
    }
  }, [confidentialityLevel]);

  return {
    availabilityLevel: localAvailabilityLevel,
    integrityLevel: localIntegrityLevel,
    confidentialityLevel: localConfidentialityLevel,
    setAvailabilityLevel,
    setIntegrityLevel,
    setConfidentialityLevel
  };
}

export default useSecurityLevelSync;
