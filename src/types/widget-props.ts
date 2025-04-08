import { SecurityLevel } from "./cia";

/**
 * Standard interface for components that use security levels
 */
export interface WithSecurityLevelProps {
  /**
   * The selected availability level
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected integrity level
   */
  integrityLevel: SecurityLevel;

  /**
   * The selected confidentiality level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional callback for availability level changes
   */
  onAvailabilityChange?: (level: SecurityLevel) => void;

  /**
   * Optional callback for integrity level changes
   */
  onIntegrityChange?: (level: SecurityLevel) => void;

  /**
   * Optional callback for confidentiality level changes
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

/**
 * Common props shared by all widgets
 */
export interface CommonWidgetProps {
  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;
}

/**
 * Combined interface for widgets that use security levels
 */
export type SecurityWidgetProps = WithSecurityLevelProps & CommonWidgetProps;

/**
 * Base interface for components that impact security levels
 */
export interface ComponentImpactBaseProps {
  /**
   * @deprecated Use specific *Level properties instead
   */
  level?: SecurityLevel;

  /**
   * Current availability security level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Current integrity security level
   */
  integrityLevel: SecurityLevel;

  /**
   * Current confidentiality security level
   */
  confidentialityLevel: SecurityLevel;

  // ...other existing properties...
}
