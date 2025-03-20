import { useEffect, useState } from "react";
import { WithSecurityLevelProps } from "../hoc/withSecurityLevelState";
import { SecurityLevel } from "../types/cia";

/**
 * Hook for synchronizing component state with security level props
 * 
 * ## Business Perspective
 * 
 * This hook ensures that components stay in sync with application-wide security
 * level changes while maintaining their ability to handle local state changes.
 * It simplifies security level state management for function components. 🔒
 * 
 * @param props Security level props from parent component
 * @returns State and handlers for security levels
 */
export function useSecurityLevelSync(props: WithSecurityLevelProps) {
  // Get props with defaults
  const { 
    availabilityLevel: propsAvailabilityLevel = "Moderate",
    integrityLevel: propsIntegrityLevel = "Moderate",
    confidentialityLevel: propsConfidentialityLevel = "Moderate",
    onAvailabilityChange,
    onIntegrityChange,
    onConfidentialityChange
  } = props;
  
  // Set up local state
  const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(propsAvailabilityLevel);
  const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(propsIntegrityLevel);
  const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(propsConfidentialityLevel);
  
  // Sync local state with incoming props
  useEffect(() => {
    if (propsAvailabilityLevel !== availabilityLevel) {
      setAvailabilityLevel(propsAvailabilityLevel);
    }
  }, [propsAvailabilityLevel]);
  
  useEffect(() => {
    if (propsIntegrityLevel !== integrityLevel) {
      setIntegrityLevel(propsIntegrityLevel);
    }
  }, [propsIntegrityLevel]);
  
  useEffect(() => {
    if (propsConfidentialityLevel !== confidentialityLevel) {
      setConfidentialityLevel(propsConfidentialityLevel);
    }
  }, [propsConfidentialityLevel]);
  
  // Handle level changes with propagation to parent
  const handleAvailabilityChange = (level: SecurityLevel) => {
    setAvailabilityLevel(level);
    if (onAvailabilityChange) {
      onAvailabilityChange(level);
    }
  };
  
  const handleIntegrityChange = (level: SecurityLevel) => {
    setIntegrityLevel(level);
    if (onIntegrityChange) {
      onIntegrityChange(level);
    }
  };
  
  const handleConfidentialityChange = (level: SecurityLevel) => {
    setConfidentialityLevel(level);
    if (onConfidentialityChange) {
      onConfidentialityChange(level);
    }
  };
  
  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel: handleAvailabilityChange,
    setIntegrityLevel: handleIntegrityChange,
    setConfidentialityLevel: handleConfidentialityChange
  };
}

export default useSecurityLevelSync;
