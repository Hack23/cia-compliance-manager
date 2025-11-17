import { SecurityLevel } from "./cia";

/**
 * Standard interface for components that use security levels
 * 
 * This interface should be used by any component that needs to display
 * or modify security levels for the CIA triad components. It provides
 * a consistent pattern for props across the application.
 * 
 * @example
 * ```typescript
 * interface MyWidgetProps extends WithSecurityLevelProps {
 *   customProp: string;
 * }
 * 
 * const MyWidget: React.FC<MyWidgetProps> = ({
 *   availabilityLevel,
 *   integrityLevel,
 *   confidentialityLevel,
 *   onAvailabilityChange
 * }) => {
 *   // Component implementation
 * };
 * ```
 */
export interface WithSecurityLevelProps {
  /**
   * The selected availability level
   * 
   * Controls system uptime and accessibility requirements.
   * 
   * @example 'High'
   */
  availabilityLevel: SecurityLevel;

  /**
   * The selected integrity level
   * 
   * Controls data accuracy and consistency requirements.
   * 
   * @example 'Very High'
   */
  integrityLevel: SecurityLevel;

  /**
   * The selected confidentiality level
   * 
   * Controls data privacy and access control requirements.
   * 
   * @example 'Moderate'
   */
  confidentialityLevel: SecurityLevel;

  /**
   * Optional callback fired when availability level changes
   * 
   * @param level - New security level selected by user
   * 
   * @example
   * ```typescript
   * onAvailabilityChange={(level) => {
   *   console.log('New availability level:', level);
   *   updateConfiguration('availability', level);
   * }}
   * ```
   */
  onAvailabilityChange?: (level: SecurityLevel) => void;

  /**
   * Optional callback fired when integrity level changes
   * 
   * @param level - New security level selected by user
   * 
   * @example
   * ```typescript
   * onIntegrityChange={(level) => {
   *   console.log('New integrity level:', level);
   *   updateConfiguration('integrity', level);
   * }}
   * ```
   */
  onIntegrityChange?: (level: SecurityLevel) => void;

  /**
   * Optional callback fired when confidentiality level changes
   * 
   * @param level - New security level selected by user
   * 
   * @example
   * ```typescript
   * onConfidentialityChange={(level) => {
   *   console.log('New confidentiality level:', level);
   *   updateConfiguration('confidentiality', level);
   * }}
   * ```
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

/**
 * Common props shared by all widgets
 * 
 * Provides standard customization options that all widgets should support
 * for consistent styling and testing across the application.
 * 
 * @example
 * ```typescript
 * <MyWidget 
 *   className="custom-styles" 
 *   testId="my-widget-test" 
 * />
 * ```
 */
export interface CommonWidgetProps {
  /**
   * Optional CSS class name for custom styling
   * 
   * Allows consumers to apply custom styles via CSS classes.
   * Use Tailwind CSS classes or custom CSS classes.
   * 
   * @example "mt-4 border-2 rounded-lg"
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   * 
   * Used by testing frameworks (Cypress, Vitest) to locate
   * and interact with the component. Should follow the pattern
   * defined in testIds constants.
   * 
   * @example "security-widget-availability"
   */
  testId?: string;
}

/**
 * Combined interface for widgets that use security levels
 * 
 * Merges security level props with common widget props, providing
 * a complete set of props for security-aware widgets.
 * 
 * @example
 * ```typescript
 * const SecurityWidget: React.FC<SecurityWidgetProps> = ({
 *   availabilityLevel,
 *   integrityLevel,
 *   confidentialityLevel,
 *   onAvailabilityChange,
 *   className,
 *   testId
 * }) => {
 *   return (
 *     <div className={className} data-testid={testId}>
 *       Widget content here
 *     </div>
 *   );
 * };
 * ```
 */
export type SecurityWidgetProps = WithSecurityLevelProps & CommonWidgetProps;

/**
 * Base interface for components that impact security levels
 * 
 * Provides a foundation for components that need to display or
 * interact with security levels across all CIA components.
 * 
 * @deprecated The generic `level` property is deprecated. Use specific 
 * `availabilityLevel`, `integrityLevel`, and `confidentialityLevel` instead.
 * 
 * @example
 * ```typescript
 * interface MyComponentProps extends ComponentImpactBaseProps {
 *   additionalProp: string;
 * }
 * ```
 */
export interface ComponentImpactBaseProps {
  /**
   * @deprecated Use specific *Level properties instead (availabilityLevel, integrityLevel, confidentialityLevel)
   * 
   * This property is maintained for backward compatibility but will be
   * removed in a future version. Migrate to using the specific level properties.
   */
  level?: SecurityLevel;

  /**
   * Current availability security level
   * 
   * Represents the selected security level for system availability
   * and uptime requirements.
   */
  availabilityLevel: SecurityLevel;

  /**
   * Current integrity security level
   * 
   * Represents the selected security level for data integrity
   * and accuracy requirements.
   */
  integrityLevel: SecurityLevel;

  /**
   * Current confidentiality security level
   * 
   * Represents the selected security level for data privacy
   * and access control requirements.
   */
  confidentialityLevel: SecurityLevel;

  // ...other existing properties...
}
