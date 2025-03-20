import React, { useEffect, useState } from "react";
import { SecurityLevel } from "../types/cia";

/**
 * Interface defining props for components with security level state
 * 
 * This interface is used by the withSecurityLevelState HOC and components
 * that need to handle security level props consistently.
 */
export interface WithSecurityLevelProps {
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

/**
 * Higher-Order Component (HOC) that adds security level state management to a component
 *
 * ## Business Perspective
 *
 * This HOC provides consistent security level state management across widgets,
 * ensuring that all components respond to global security level changes while
 * maintaining their ability to have local overrides. It creates a standardized
 * approach to handling security levels throughout the application. 🔒
 */
function withSecurityLevelState<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithSecurityLevelProps> {
  return function WithSecurityLevelState(props: P & WithSecurityLevelProps): React.ReactElement {
    // Extract security level props
    const {
      availabilityLevel: propsAvailabilityLevel = "Moderate" as SecurityLevel,
      integrityLevel: propsIntegrityLevel = "Moderate" as SecurityLevel,
      confidentialityLevel: propsConfidentialityLevel = "Moderate" as SecurityLevel,
      onAvailabilityChange,
      onIntegrityChange,
      onConfidentialityChange,
      ...otherProps
    } = props;

    // Set up internal state
    const [availabilityLevel, setAvailabilityLevel] = useState<SecurityLevel>(
      propsAvailabilityLevel
    );
    const [integrityLevel, setIntegrityLevel] = useState<SecurityLevel>(
      propsIntegrityLevel
    );
    const [confidentialityLevel, setConfidentialityLevel] = useState<SecurityLevel>(
      propsConfidentialityLevel
    );

    const componentName = Component.displayName || Component.name || 'Unknown';
    
    // Add versioning to prevent circular updates
    const [updateVersion, setUpdateVersion] = useState(0);

    // Sync internal state with props when props change
    useEffect(() => {
      // Only update if the prop value is different from current state
      if (propsAvailabilityLevel !== availabilityLevel) {
        console.log(`HOC (${componentName}): Updating availability from ${availabilityLevel} to ${propsAvailabilityLevel}`);
        setAvailabilityLevel(propsAvailabilityLevel);
        // Increment version to prevent circular updates
        setUpdateVersion(prev => prev + 1);
      }
    }, [propsAvailabilityLevel]);

    useEffect(() => {
      // Only update if the prop value is different from current state
      if (propsIntegrityLevel !== integrityLevel) {
        console.log(`HOC (${componentName}): Updating integrity from ${integrityLevel} to ${propsIntegrityLevel}`);
        setIntegrityLevel(propsIntegrityLevel);
        // Increment version to prevent circular updates
        setUpdateVersion(prev => prev + 1);
      }
    }, [propsIntegrityLevel]);

    useEffect(() => {
      // Only update if the prop value is different from current state
      if (propsConfidentialityLevel !== confidentialityLevel) {
        console.log(`HOC (${componentName}): Updating confidentiality from ${confidentialityLevel} to ${propsConfidentialityLevel}`);
        setConfidentialityLevel(propsConfidentialityLevel);
        // Increment version to prevent circular updates
        setUpdateVersion(prev => prev + 1);
      }
    }, [propsConfidentialityLevel]);

    // Handle level changes
    const handleAvailabilityChange = (level: SecurityLevel) => {
      console.log(`HOC (${componentName}): handleAvailabilityChange called with ${level}`);
      // Update internal state first
      setAvailabilityLevel(level);
      // Call parent handler if provided
      if (onAvailabilityChange) {
        console.log(`HOC (${componentName}): Calling parent onAvailabilityChange with ${level}`);
        onAvailabilityChange(level);
      }
    };

    const handleIntegrityChange = (level: SecurityLevel) => {
      console.log(`HOC (${componentName}): handleIntegrityChange called with ${level}`);
      // Update internal state first
      setIntegrityLevel(level);
      // Call parent handler if provided
      if (onIntegrityChange) {
        console.log(`HOC (${componentName}): Calling parent onIntegrityChange with ${level}`);
        onIntegrityChange(level);
      }
    };

    const handleConfidentialityChange = (level: SecurityLevel) => {
      console.log(`HOC (${componentName}): handleConfidentialityChange called with ${level}`);
      // Update internal state first
      setConfidentialityLevel(level);
      // Call parent handler if provided
      if (onConfidentialityChange) {
        console.log(`HOC (${componentName}): Calling parent onConfidentialityChange with ${level}`);
        onConfidentialityChange(level);
      }
    };

    return (
      <Component
        {...(otherProps as P)}
        availabilityLevel={availabilityLevel}
        integrityLevel={integrityLevel}
        confidentialityLevel={confidentialityLevel}
        onAvailabilityChange={handleAvailabilityChange}
        onIntegrityChange={handleIntegrityChange}
        onConfidentialityChange={handleConfidentialityChange}
      />
    );
  };
}

export default withSecurityLevelState;
