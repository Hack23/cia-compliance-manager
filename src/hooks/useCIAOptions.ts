import { useState, useCallback } from 'react';
import { SecurityLevel } from '../types/cia';

/**
 * Return type for the useCIAOptions hook
 */
export interface UseCIAOptionsReturn {
  /** Currently selected availability level */
  availabilityLevel: SecurityLevel;
  /** Currently selected integrity level */
  integrityLevel: SecurityLevel;
  /** Currently selected confidentiality level */
  confidentialityLevel: SecurityLevel;
  /** Update availability level */
  setAvailabilityLevel: (level: SecurityLevel) => void;
  /** Update integrity level */
  setIntegrityLevel: (level: SecurityLevel) => void;
  /** Update confidentiality level */
  setConfidentialityLevel: (level: SecurityLevel) => void;
  /** Reset all levels to default */
  resetLevels: () => void;
}

/**
 * Default security level
 */
const DEFAULT_LEVEL: SecurityLevel = 'None';

/**
 * Hook for managing CIA security level options state
 *
 * Provides state management for all three CIA (Confidentiality, Integrity,
 * Availability) security levels with setters and reset functionality.
 *
 * @param initialAvailability - Initial availability security level (default: 'None')
 * @param initialIntegrity - Initial integrity security level (default: 'None')
 * @param initialConfidentiality - Initial confidentiality security level (default: 'None')
 * @returns CIA security level state and setter functions
 *
 * @example
 * ```typescript
 * const {
 *   availabilityLevel,
 *   integrityLevel,
 *   confidentialityLevel,
 *   setAvailabilityLevel,
 *   setIntegrityLevel,
 *   setConfidentialityLevel,
 *   resetLevels
 * } = useCIAOptions('Low', 'Low', 'Low');
 *
 * // Update a level
 * setAvailabilityLevel('High');
 *
 * // Reset all levels
 * resetLevels();
 * ```
 */
export function useCIAOptions(
  initialAvailability: SecurityLevel = DEFAULT_LEVEL,
  initialIntegrity: SecurityLevel = DEFAULT_LEVEL,
  initialConfidentiality: SecurityLevel = DEFAULT_LEVEL
): UseCIAOptionsReturn {
  const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(initialAvailability);
  const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(initialIntegrity);
  const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(initialConfidentiality);

  const resetLevels = useCallback(() => {
    setAvailabilityLevel(initialAvailability);
    setIntegrityLevel(initialIntegrity);
    setConfidentialityLevel(initialConfidentiality);
  }, [initialAvailability, initialIntegrity, initialConfidentiality]);

  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel,
    setIntegrityLevel,
    setConfidentialityLevel,
    resetLevels,
  };
}

export default useCIAOptions;
