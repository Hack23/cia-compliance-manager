import { CIAComponent, SecurityLevel } from "./cia";

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

  /**
   * Optional CSS class name for custom styling
   */
  className?: string;

  /**
   * Optional test ID for automated testing
   */
  testId?: string;

  /**
   * Optional callback when security level changes
   */
  onLevelChange?: (level: SecurityLevel) => void;
}

// ============================================================================
// BASE WIDGET PROP INTERFACES
// ============================================================================

/**
 * Base props common to all widgets
 * 
 * Provides the foundation for all widget components with standard
 * styling, testing capabilities, and error handling.
 * 
 * Extends CommonWidgetProps to maintain consistency with existing patterns.
 * 
 * @example
 * ```typescript
 * interface MyWidgetProps extends BaseWidgetProps {
 *   customProp: string;
 * }
 * ```
 */
export interface BaseWidgetProps extends CommonWidgetProps {
  /**
   * Optional callback when widget encounters an error
   * @param error - Error that occurred
   */
  onError?: (error: Error) => void;
}

/**
 * Base props for widgets that display CIA component data
 * 
 * Used by widgets that need to show information for a single CIA component.
 * 
 * @example
 * ```typescript
 * <ComponentWidget 
 *   component="availability" 
 *   level="High" 
 * />
 * ```
 */
export interface CIAComponentWidgetProps extends BaseWidgetProps {
  /**
   * CIA triad component (availability, integrity, or confidentiality)
   */
  component: CIAComponent;

  /**
   * Current security level for the component
   */
  level: SecurityLevel;
}

/**
 * Base props for widgets that allow security level changes
 * 
 * Extends CIAComponentWidgetProps with interactive change capability.
 * 
 * @example
 * ```typescript
 * <InteractiveWidget
 *   component="integrity"
 *   level="Moderate"
 *   onLevelChange={(level) => console.log('New level:', level)}
 * />
 * ```
 */
export interface SecurityLevelChangeWidgetProps extends CIAComponentWidgetProps {
  /**
   * Callback fired when security level changes
   * @param level - New security level selected by user
   */
  onLevelChange: (level: SecurityLevel) => void;

  /**
   * If true, the widget is disabled and cannot be interacted with
   * @default false
   */
  disabled?: boolean;
}

/**
 * Base props for widgets that display all three CIA components
 * 
 * Used by widgets that need to show a complete security profile across
 * all CIA triad components.
 * 
 * @example
 * ```typescript
 * <ComprehensiveWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 * />
 * ```
 */
export interface AllCIAComponentsProps extends BaseWidgetProps {
  /**
   * Security level for availability component
   */
  availabilityLevel: SecurityLevel;

  /**
   * Security level for integrity component
   */
  integrityLevel: SecurityLevel;

  /**
   * Security level for confidentiality component
   */
  confidentialityLevel: SecurityLevel;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Extract only the CIA level props from AllCIAComponentsProps
 * 
 * Useful when you need just the security levels without other widget props.
 * 
 * @example
 * ```typescript
 * const levels: CIALevelsOnly = {
 *   availabilityLevel: 'High',
 *   integrityLevel: 'Very High',
 *   confidentialityLevel: 'Moderate'
 * };
 * ```
 */
export type CIALevelsOnly = Pick<
  AllCIAComponentsProps,
  'availabilityLevel' | 'integrityLevel' | 'confidentialityLevel'
>;

/**
 * Make all CIA levels optional
 * 
 * Useful for partial updates or default values.
 * 
 * @example
 * ```typescript
 * const partialLevels: PartialCIALevels = {
 *   availabilityLevel: 'High'
 *   // other levels are optional
 * };
 * ```
 */
export type PartialCIALevels = Partial<CIALevelsOnly>;

/**
 * Widget props with loading state
 * 
 * Generic interface for widgets that load and display data asynchronously.
 * 
 * @template T - Type of data being loaded
 * 
 * @example
 * ```typescript
 * interface MyData {
 *   value: number;
 * }
 * 
 * const props: WidgetPropsWithLoading<MyData> = {
 *   data: { value: 42 },
 *   loading: false,
 *   error: undefined
 * };
 * ```
 */
export interface WidgetPropsWithLoading<T> extends BaseWidgetProps {
  /**
   * Data to display in widget
   */
  data: T | null;

  /**
   * If true, widget is loading data
   */
  loading: boolean;

  /**
   * Error encountered while loading
   */
  error?: Error;
}

// ============================================================================
// ASSESSMENT CENTER WIDGET PROPS
// ============================================================================

/**
 * Props for SecurityLevelWidget component
 * 
 * Allows users to select and view security level for CIA components.
 * 
 * @example
 * ```typescript
 * <SecurityLevelWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   onAvailabilityChange={(level) => setLevel('availability', level)}
 * />
 * ```
 */
export interface SecurityLevelWidgetProps extends AllCIAComponentsProps {
  /**
   * Callback fired when availability level changes
   * @param level - New availability security level
   */
  onAvailabilityChange?: (level: SecurityLevel) => void;

  /**
   * Callback fired when integrity level changes
   * @param level - New integrity security level
   */
  onIntegrityChange?: (level: SecurityLevel) => void;

  /**
   * Callback fired when confidentiality level changes
   * @param level - New confidentiality security level
   */
  onConfidentialityChange?: (level: SecurityLevel) => void;
}

/**
 * Props for SecuritySummaryWidget component
 * 
 * Displays comprehensive security assessment summary across all CIA components.
 * 
 * @example
 * ```typescript
 * <SecuritySummaryWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   onLevelChange={(component, level) => handleChange(component, level)}
 * />
 * ```
 */
export interface SecuritySummaryWidgetProps extends AllCIAComponentsProps {
  /**
   * Callback fired when any security level changes
   * @param component - Which CIA component changed
   * @param level - New security level
   */
  onLevelChange?: (component: CIAComponent, level: SecurityLevel) => void;

  /**
   * Initial active tab index
   * @default 0
   */
  defaultTab?: number;
}

/**
 * Props for BusinessImpactAnalysisWidget component
 * 
 * Analyzes and displays business impact of security levels across
 * financial, operational, reputational, and regulatory dimensions.
 * 
 * @example
 * ```typescript
 * <BusinessImpactAnalysisWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   organizationSize="large"
 * />
 * ```
 */
export interface BusinessImpactAnalysisWidgetProps extends AllCIAComponentsProps {
  /**
   * Organization size for impact calculations
   * @default 'medium'
   */
  organizationSize?: 'small' | 'medium' | 'large' | 'enterprise';

  /**
   * Industry sector for impact analysis
   */
  industrySector?: string;
}

// ============================================================================
// BUSINESS VALUE WIDGET PROPS
// ============================================================================

/**
 * Props for CostEstimationWidget component
 * 
 * Estimates implementation costs for security controls based on
 * selected security levels across CIA components.
 * 
 * @example
 * ```typescript
 * <CostEstimationWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   showBreakdown
 *   currency="EUR"
 * />
 * ```
 */
export interface CostEstimationWidgetProps extends AllCIAComponentsProps {
  /**
   * If true, displays detailed cost breakdown
   * @default true
   */
  showBreakdown?: boolean;

  /**
   * Currency code for cost display
   * @default 'USD'
   */
  currency?: string;

  /**
   * Callback fired when cost estimation is complete
   * @param totalCost - Total estimated cost
   */
  onCostCalculated?: (totalCost: number) => void;
}

/**
 * Props for ComplianceStatusWidget component
 * 
 * Shows compliance status across multiple regulatory frameworks
 * based on current security levels.
 * 
 * @example
 * ```typescript
 * <ComplianceStatusWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   frameworks={['NIST', 'ISO27001', 'GDPR']}
 *   showRequirements
 * />
 * ```
 */
export interface ComplianceStatusWidgetProps extends AllCIAComponentsProps {
  /**
   * Compliance frameworks to check
   * @default ['NIST', 'ISO27001', 'GDPR']
   */
  frameworks?: string[];

  /**
   * If true, displays detailed compliance requirements
   * @default false
   */
  showRequirements?: boolean;

  /**
   * Optional industry context for compliance
   */
  industry?: string;

  /**
   * Optional region context for compliance
   */
  region?: string;
}

/**
 * Props for ValueCreationWidget component
 * 
 * Displays business value created by security investments
 * including ROI and value metrics.
 * 
 * @example
 * ```typescript
 * <ValueCreationWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   timePeriod={5}
 * />
 * ```
 */
export interface ValueCreationWidgetProps extends AllCIAComponentsProps {
  /**
   * Time period for ROI calculation (in years)
   * @default 3
   */
  timePeriod?: number;
}

// ============================================================================
// IMPACT ANALYSIS WIDGET PROPS
// ============================================================================

/**
 * Props for AvailabilityImpactWidget component
 * 
 * Displays availability-specific business impact including uptime,
 * recovery objectives, and resilience requirements.
 * 
 * @example
 * ```typescript
 * <AvailabilityImpactWidget
 *   availabilityLevel="High"
 *   integrityLevel="Moderate"
 *   confidentialityLevel="Moderate"
 *   showExtendedDetails
 * />
 * ```
 */
export interface AvailabilityImpactWidgetProps extends BaseWidgetProps {
  /**
   * @deprecated Use availabilityLevel instead
   */
  level?: SecurityLevel;

  /**
   * Availability security level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Integrity security level (optional, for context)
   */
  integrityLevel?: SecurityLevel;

  /**
   * Confidentiality security level (optional, for context)
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * If true, displays extended details
   * @default false
   */
  showExtendedDetails?: boolean;
}

/**
 * Props for IntegrityImpactWidget component
 * 
 * Displays integrity-specific business impact including data accuracy,
 * validation requirements, and audit controls.
 * 
 * @example
 * ```typescript
 * <IntegrityImpactWidget
 *   integrityLevel="Very High"
 *   availabilityLevel="High"
 *   confidentialityLevel="Moderate"
 *   showExtendedDetails
 * />
 * ```
 */
export interface IntegrityImpactWidgetProps extends BaseWidgetProps {
  /**
   * @deprecated Use integrityLevel instead
   */
  level?: SecurityLevel;

  /**
   * Availability security level (optional, for context)
   */
  availabilityLevel?: SecurityLevel;

  /**
   * Integrity security level
   */
  integrityLevel: SecurityLevel;

  /**
   * Confidentiality security level (optional, for context)
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * If true, displays extended details
   * @default false
   */
  showExtendedDetails?: boolean;
}

/**
 * Props for ConfidentialityImpactWidget component
 * 
 * Displays confidentiality-specific business impact including data
 * classification, access controls, and privacy safeguards.
 * 
 * @example
 * ```typescript
 * <ConfidentialityImpactWidget
 *   confidentialityLevel="High"
 *   availabilityLevel="Moderate"
 *   integrityLevel="High"
 * />
 * ```
 */
export interface ConfidentialityImpactWidgetProps extends BaseWidgetProps {
  /**
   * @deprecated Use confidentialityLevel instead
   */
  level?: SecurityLevel;

  /**
   * Availability security level (optional, for context)
   */
  availabilityLevel?: SecurityLevel;

  /**
   * Integrity security level (optional, for context)
   */
  integrityLevel?: SecurityLevel;

  /**
   * Confidentiality security level
   */
  confidentialityLevel: SecurityLevel;

  /**
   * If true, displays extended details
   * @default false
   */
  showExtendedDetails?: boolean;
}

// ============================================================================
// IMPLEMENTATION GUIDE WIDGET PROPS
// ============================================================================

/**
 * Props for TechnicalDetailsWidget component
 * 
 * Shows technical implementation details and guidance for
 * achieving security requirements.
 * 
 * @example
 * ```typescript
 * <TechnicalDetailsWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 * />
 * ```
 */
export interface TechnicalDetailsWidgetProps extends AllCIAComponentsProps {
  // All props inherited from AllCIAComponentsProps
}

/**
 * Props for SecurityResourcesWidget component
 * 
 * Displays relevant security resources and documentation based
 * on current security configuration.
 * 
 * @example
 * ```typescript
 * <SecurityResourcesWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   category="frameworks"
 * />
 * ```
 */
export interface SecurityResourcesWidgetProps extends AllCIAComponentsProps {
  /**
   * Filter resources by category
   */
  category?: 'documentation' | 'tools' | 'frameworks' | 'all';

  /**
   * Optional filter string for resource filtering
   */
  filter?: string;

  /**
   * Maximum number of items to display
   */
  maxItems?: number;
}

/**
 * Props for SecurityVisualizationWidget component
 * 
 * Visualizes security posture with interactive charts based on
 * CIA component security levels.
 * 
 * @example
 * ```typescript
 * <SecurityVisualizationWidget
 *   availabilityLevel="High"
 *   integrityLevel="Very High"
 *   confidentialityLevel="Moderate"
 *   chartType="bar"
 *   interactive
 * />
 * ```
 */
export interface SecurityVisualizationWidgetProps extends AllCIAComponentsProps {
  /**
   * Chart type to display
   * @default 'radar'
   */
  chartType?: 'radar' | 'bar' | 'line' | 'pie' | 'gauge';

  /**
   * If true, chart is interactive
   * @default true
   */
  interactive?: boolean;
}
