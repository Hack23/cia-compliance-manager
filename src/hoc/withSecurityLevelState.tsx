import React, { useEffect, useState } from 'react';
import { SecurityLevel } from '../types/cia';

// Props that the HOC will receive and pass down
export interface WithSecurityLevelProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  [key: string]: any; // Allow any other props
}

/**
 * Higher-Order Component that adds security level state management
 * 
 * This HOC adds local state management to any component that receives 
 * security level props, ensuring consistent state handling across widgets.
 * 
 * @param WrappedComponent The component to wrap with security level state
 * @returns A component with added security level state management
 */
export function withSecurityLevelState<P extends WithSecurityLevelProps>(
  WrappedComponent: React.ComponentType<P>
) {
  // Create a wrapper component that will handle the security level state
  const WithSecurityLevelState = (props: P) => {
    // Destructure security level props to create local state
    const { 
      availabilityLevel: propAvailability,
      integrityLevel: propIntegrity,
      confidentialityLevel: propConfidentiality,
      ...otherProps 
    } = props;
    
    // Create local state for each security level
    const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(propAvailability);
    const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(propIntegrity);
    const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(propConfidentiality);
    
    // Sync local state with props
    useEffect(() => {
      if (propAvailability !== availabilityLevel) {
        setAvailabilityLevel(propAvailability);
      }
    }, [propAvailability]);
    
    useEffect(() => {
      if (propIntegrity !== integrityLevel) {
        setIntegrityLevel(propIntegrity);
      }
    }, [propIntegrity]);
    
    useEffect(() => {
      if (propConfidentiality !== confidentialityLevel) {
        setConfidentialityLevel(propConfidentiality);
      }
    }, [propConfidentiality]);
    
    // Debug logging of security level state
    useEffect(() => {
      console.log(`[${WrappedComponent.displayName || 'Component'}] Security levels:`, {
        props: { propAvailability, propIntegrity, propConfidentiality },
        state: { availabilityLevel, integrityLevel, confidentialityLevel }
      });
    }, [
      propAvailability, propIntegrity, propConfidentiality,
      availabilityLevel, integrityLevel, confidentialityLevel
    ]);
    
    // Render the wrapped component with the managed state
    return (
      <WrappedComponent
        {...otherProps as any}
        availabilityLevel={availabilityLevel}
        integrityLevel={integrityLevel}
        confidentialityLevel={confidentialityLevel}
      />
    );
  };
  
  // Set display name for debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithSecurityLevelState.displayName = `WithSecurityLevelState(${displayName})`;
  
  return WithSecurityLevelState;
}

export default withSecurityLevelState;
