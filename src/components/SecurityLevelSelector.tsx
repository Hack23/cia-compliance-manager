import React from "react";
import { SecurityLevel } from "../types/cia";
import EnhancedSelector from "./securitylevel/SecurityLevelSelector";

/**
 * Interface for the SecurityLevelSelector props focusing only on the enhanced version
 * since this is the only mode we'll ever use
 */
export interface SecurityLevelSelectorProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  onAvailabilityChange?: (level: string) => void;
  onIntegrityChange?: (level: string) => void;
  onConfidentialityChange?: (level: string) => void;
  disabled?: boolean;
  compact?: boolean;
  testId?: string;
  useEnhancedVersion?: boolean; // Kept for backward compatibility but no longer used
}

/**
 * SecurityLevelSelector is a simplified facade that always uses the enhanced selector
 * 
 * ## Business Perspective
 * 
 * This component provides a comprehensive interface for security officers to
 * configure all aspects of the CIA triad in one cohesive interface.
 * 
 * @param props Component properties for the enhanced security level selector
 * @returns Enhanced security level selector component
 */
const SecurityLevelSelector: React.FC<SecurityLevelSelectorProps> = (props) => {
  // Create adapters for callback functions to handle typing correctly
  const handleAvailabilityChange = props.onAvailabilityChange 
    ? (value: SecurityLevel) => {
        console.log("Availability change in facade:", value);
        props.onAvailabilityChange!(value);
      }
    : undefined;
    
  const handleIntegrityChange = props.onIntegrityChange
    ? (value: SecurityLevel) => {
        console.log("Integrity change in facade:", value);
        props.onIntegrityChange!(value);
      }
    : undefined;
    
  const handleConfidentialityChange = props.onConfidentialityChange
    ? (value: SecurityLevel) => {
        console.log("Confidentiality change in facade:", value);
        props.onConfidentialityChange!(value);
      }
    : undefined;

  // Pass through to the enhanced selector with proper typing
  return (
    <EnhancedSelector
      availabilityLevel={props.availabilityLevel}
      integrityLevel={props.integrityLevel}
      confidentialityLevel={props.confidentialityLevel}
      onAvailabilityChange={handleAvailabilityChange}
      onIntegrityChange={handleIntegrityChange}
      onConfidentialityChange={handleConfidentialityChange}
      disabled={props.disabled}
      compact={props.compact}
      testId={props.testId}
    />
  );
};

export default SecurityLevelSelector;
