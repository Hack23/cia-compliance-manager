import { useEffect, useState } from 'react';
import { SecurityLevel } from '../types/cia';

/**
 * Hook for synchronizing security level props with local state
 * 
 * @param props Security level props from parent component
 * @returns Object containing local state that stays in sync with props
 */
export function useSecurityLevelSync(props: {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  componentName?: string;
}) {
  const { 
    availabilityLevel: propAvailability,
    integrityLevel: propIntegrity,
    confidentialityLevel: propConfidentiality,
    componentName = 'Component'
  } = props;
  
  // Create local state for each security level
  const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(propAvailability);
  const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(propIntegrity);
  const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(propConfidentiality);
  
  // Sync local state with props
  useEffect(() => {
    setAvailabilityLevel(propAvailability);
  }, [propAvailability]);
  
  useEffect(() => {
    setIntegrityLevel(propIntegrity);
  }, [propIntegrity]);
  
  useEffect(() => {
    setConfidentialityLevel(propConfidentiality);
  }, [propConfidentiality]);
  
  // Debug logging
  useEffect(() => {
    console.log(`[${componentName}] Security levels:`, {
      props: { propAvailability, propIntegrity, propConfidentiality },
      state: { availabilityLevel, integrityLevel, confidentialityLevel }
    });
  }, [
    componentName,
    propAvailability, propIntegrity, propConfidentiality,
    availabilityLevel, integrityLevel, confidentialityLevel
  ]);
  
  return {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel
  };
}

export default useSecurityLevelSync;
