import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { SecurityLevel } from '../types/cia';

/**
 * Interface defining the data and functions available in the SecurityLevelContext
 */
interface SecurityLevelContextType {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  setAvailabilityLevel: (level: SecurityLevel) => void;
  setIntegrityLevel: (level: SecurityLevel) => void; 
  setConfidentialityLevel: (level: SecurityLevel) => void;
}

/**
 * Props for the SecurityLevelProvider component
 */
interface SecurityLevelProviderProps {
  children: ReactNode;
  initialAvailability?: SecurityLevel;
  initialIntegrity?: SecurityLevel;
  initialConfidentiality?: SecurityLevel;
}

// Create context with a default value
const SecurityLevelContext = createContext<SecurityLevelContextType>({
  availabilityLevel: 'Moderate',
  integrityLevel: 'Moderate',
  confidentialityLevel: 'Moderate',
  setAvailabilityLevel: () => {},
  setIntegrityLevel: () => {},
  setConfidentialityLevel: () => {}
});

/**
 * Provider component that manages global security level state
 * 
 * @param props Provider props with initial values and children
 * @returns Provider component with context
 */
export const SecurityLevelProvider: React.FC<SecurityLevelProviderProps> = ({
  children,
  initialAvailability = 'Moderate',
  initialIntegrity = 'Moderate',
  initialConfidentiality = 'Moderate'
}) => {
  // State for each security level
  const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(initialAvailability);
  const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(initialIntegrity);
  const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(initialConfidentiality);

  // Create memoized handlers for setting security levels
  const handleSetAvailability = useCallback((level: SecurityLevel) => {
    setAvailabilityLevel(level);
  }, []);

  const handleSetIntegrity = useCallback((level: SecurityLevel) => {
    setIntegrityLevel(level);
  }, []);

  const handleSetConfidentiality = useCallback((level: SecurityLevel) => {
    setConfidentialityLevel(level);
  }, []);

  // Create context value
  const contextValue: SecurityLevelContextType = {
    availabilityLevel,
    integrityLevel,
    confidentialityLevel,
    setAvailabilityLevel: handleSetAvailability,
    setIntegrityLevel: handleSetIntegrity,
    setConfidentialityLevel: handleSetConfidentiality
  };

  return (
    <SecurityLevelContext.Provider value={contextValue}>
      {children}
    </SecurityLevelContext.Provider>
  );
};

/**
 * Custom hook for accessing the security level context
 * 
 * @returns SecurityLevelContext with security levels and setter functions
 */
export const useSecurityLevelContext = (): SecurityLevelContextType => {
  const context = useContext(SecurityLevelContext);
  
  if (!context) {
    throw new Error('useSecurityLevelContext must be used within a SecurityLevelProvider');
  }
  
  return context;
};
