import React, { ComponentType } from 'react';
import { SecurityLevel } from '../types/cia';

// Define the props interface directly here to avoid circular dependencies
export interface WithSecurityLevelProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

// Import the hook from the correct location
import { useSecurityLevelSync } from '../hooks/useSecurityLevelSync';

/**
 * Higher-Order Component that adds security level state management to a component
 * 
 * This HOC uses useSecurityLevelSync under the hood for standardized security level handling
 * 
 * @param WrappedComponent - The component to enhance with security level state
 * @returns A component with security level state management
 */
function withSecurityLevelState<P extends WithSecurityLevelProps>(
  WrappedComponent: ComponentType<P>
): React.FC<P> {
  // Define the display name for debugging
  const displayName = 
    WrappedComponent.displayName || 
    WrappedComponent.name || 
    'Component';
  
  // Create the wrapper component
  const WithSecurityLevelState: React.FC<P> = (props: P) => {
    // Use our custom hook for standardized state management
    const {
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      setAvailabilityLevel,
      setIntegrityLevel,
      setConfidentialityLevel
    } = useSecurityLevelSync(
      props.availabilityLevel, 
      props.integrityLevel, 
      props.confidentialityLevel
    );

    // Create handler functions that call both the hook's setters and any passed handlers
    const handleAvailabilityChange = (level: SecurityLevel) => {
      setAvailabilityLevel(level);
      props.onAvailabilityChange?.(level);
    };

    const handleIntegrityChange = (level: SecurityLevel) => {
      setIntegrityLevel(level);
      props.onIntegrityChange?.(level);
    };

    const handleConfidentialityChange = (level: SecurityLevel) => {
      setConfidentialityLevel(level);
      props.onConfidentialityChange?.(level);
    };

    // Clone the props to avoid mutation
    const enhancedProps = {
      ...props,
      availabilityLevel,
      integrityLevel,
      confidentialityLevel,
      onAvailabilityChange: handleAvailabilityChange,
      onIntegrityChange: handleIntegrityChange,
      onConfidentialityChange: handleConfidentialityChange
    } as P;

    // Render the wrapped component with the enhanced props
    return <WrappedComponent {...enhancedProps} />;
  };

  // Set the display name for easier debugging
  WithSecurityLevelState.displayName = `withSecurityLevelState(${displayName})`;

  return WithSecurityLevelState;
}

export default withSecurityLevelState;
