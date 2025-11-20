import { ReactNode } from "react";
import { SecurityLevel } from "./cia";
import {
  BusinessImpactDetails,
  CIADetails,
  ROIEstimate,
  TechnicalImplementationDetails,
} from "./cia-services";
import { CommonWidgetProps, WithSecurityLevelProps } from "./widget-props";

/**
 * Widget-specific interfaces that extend or use the core CIA types
 *
 * ## Business Perspective
 *
 * These interfaces support the visual representation of security controls,
 * providing stakeholders with an intuitive way to understand security impact. 📊
 *
 * The widget type system is designed to ensure consistency across the application
 * while supporting the specific business needs of different security assessment areas.
 *
 * @category Widgets
 * @packageDocumentation
 */

/**
 * Base widget props shared by all widgets
 *
 * @category Base Types
 */
export interface BaseWidgetProps extends CommonWidgetProps {
  /**
   * Optional children elements
   */
  children?: ReactNode;
}

/**
 * Props for security-related widgets
 *
 * ## Business Perspective
 *
 * These widgets form the foundation of security assessment in the application,
 * allowing organizations to visualize and manage their security posture
 * across the CIA triad. 🔒
 *
 * @category Base Types
 */
export interface SecurityWidgetBaseProps
  extends WithSecurityLevelProps,
    BaseWidgetProps {}

/**
 * Base props for all widgets
 *
 * ## Business Perspective
 *
 * All widgets in the application share these core properties, enabling
 * consistent styling, testing, and interactive capabilities. This creates
 * a unified dashboard experience for security officers and executives. 🎨
 *
 * @category Base Types
 */
export interface WidgetBaseProps {
  /**
   * Optional CSS class name
   */
  className?: string;

  /**
   * Optional test ID for testing
   */
  testId?: string;

  /**
   * Optional security level for widgets that only need one level
   */
  securityLevel?: SecurityLevel;
}

/**
 * Base props shared by all CIA-related widgets
 *
 * This provides a common foundation for all widgets that display
 * information based on CIA security levels.
 *
 * ## Business Perspective
 *
 * CIA-related widgets help organizations understand their security posture
 * from different angles (availability, integrity, confidentiality),
 * providing consistent assessment and reporting capabilities. 📋
 *
 * @category Base Types
 */
export interface CIABaseWidgetProps extends WidgetBaseProps {
  /**
   * Availability security level
   */
  availabilityLevel: SecurityLevel;

  /**
   * Integrity security level
   */
  integrityLevel: SecurityLevel;

  /**
   * Confidentiality security level
   */
  confidentialityLevel: SecurityLevel;
}

/**
 * Alias type for WidgetBaseProps to maintain backward compatibility
 *
 * @category Base Types
 */
export type WidgetProps = WidgetBaseProps;

/**
 * Props for widgets that display security summaries
 *
 * This widget displays a summary of the current security posture based on
 * confidentiality, integrity, and availability security levels. It provides
 * a consolidated view of the organization's security stance.
 *
 * ## Business Perspective
 *
 * This component helps security officers quickly visualize the current
 * security posture across the CIA triad. The security level information
 * is critical for compliance reporting and risk assessment. 🔒
 *
 * @category Assessment Widgets
 */
export interface SecuritySummaryWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional overall security level
   */
  securityLevel?: SecurityLevel;
}

/**
 * Props for widgets that display security impacts
 *
 * ## Business Perspective
 *
 * Impact widgets help stakeholders understand the consequences of their
 * security choices, highlighting how each security level affects the
 * organization from technical, operational, and business perspectives. 💼
 *
 * @category Impact Widgets
 */
export interface SecurityImpactWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional level (for backward compatibility)
   */
  level?: SecurityLevel;
}

/**
 * Props for widgets that display business impacts
 *
 * ## Business Perspective
 *
 * Business impact widgets translate technical security concepts into
 * business terms, helping executives understand ROI, cost-benefit analysis,
 * and business value of security investments. 📊
 *
 * @category Business Widgets
 */
export interface BusinessImpactWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional ROI information
   */
  roi?: {
    value: string;
    description: string;
  };
}

/**
 * Props for widgets that display compliance status
 *
 * ## Business Perspective
 *
 * Compliance widgets help organizations understand how their security settings
 * align with regulatory requirements, enabling them to identify gaps and
 * satisfy audit requirements. 📋
 *
 * @category Compliance Widgets
 */
export interface ComplianceWidgetProps extends SecurityWidgetBaseProps {
  /**
   * Optional refresh trigger to reload data
   */
  refreshTrigger?: number;
}

/**
 * Security level widget props for selecting and displaying security levels
 *
 * ## Business Perspective
 *
 * These widgets provide interactive controls for security professionals to
 * adjust security levels and immediately see the impact of their choices. 🔄
 *
 * @category Security Level Widgets
 */
export interface SecurityLevelWidgetProps extends CIABaseWidgetProps {
  /**
   * Callback for when security levels change
   */
  onLevelChange?: (
    component: "availability" | "integrity" | "confidentiality",
    level: SecurityLevel
  ) => void;

  /**
   * Whether the widget is disabled
   */
  disabled?: boolean;
}

/**
 * Detail interface for availability component information
 *
 * @category Component Details
 */
export interface AvailabilityDetail extends CIADetails {
  uptime: string;
  rto: string;
  rpo: string;
  mttr: string;
}

/**
 * Detail interface for integrity component information
 *
 * @category Component Details
 */
export interface IntegrityDetail extends CIADetails {
  validationMethod: string;
}

/**
 * Detail interface for confidentiality component information
 *
 * @category Component Details
 */
export interface ConfidentialityDetail extends CIADetails {
  protectionMethod: string;
}

/**
 * Props for business impact analysis widgets
 *
 * ## Business Perspective
 *
 * These widgets translate security settings into clear business impacts,
 * helping executives understand how security affects operations, finances,
 * and reputation. 💼
 *
 * @category Business Widgets
 */
export interface BusinessImpactAnalysisWidgetProps extends CIABaseWidgetProps {
  /**
   * Business impact details
   */
  businessImpact?: BusinessImpactDetails;
}

/**
 * Props for ComplianceStatusWidget component
 *
 * ## Business Perspective
 *
 * This widget helps compliance officers understand how current security
 * settings align with major regulatory frameworks, providing actionable
 * insights into compliance gaps and requirements. 📋
 *
 * @category Compliance Widgets
 */
export interface ComplianceStatusWidgetProps extends WidgetBaseProps {
  /**
   * Availability security level (optional when securityLevel is provided)
   */
  availabilityLevel?: SecurityLevel;

  /**
   * Integrity security level (optional when securityLevel is provided)
   */
  integrityLevel?: SecurityLevel;

  /**
   * Confidentiality security level (optional when securityLevel is provided)
   */
  confidentialityLevel?: SecurityLevel;

  /**
   * Optional overall security level, used as fallback when individual levels aren't provided
   */
  securityLevel?: SecurityLevel;

  /**
   * Optional refresh trigger to reload data
   */
  refreshTrigger?: number;
}

/**
 * Props for value creation widgets
 *
 * ## Business Perspective
 *
 * These widgets help executives understand the business value and ROI of
 * security investments, supporting budget justification and strategic
 * planning discussions. 💰
 *
 * @category Business Widgets
 */
export interface ValueCreationWidgetProps extends CIABaseWidgetProps {
  /**
   * Overall security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Return on investment estimate
   */
  roi?: ROIEstimate;
}

/**
 * Props for cost estimation widgets
 *
 * ## Business Perspective
 *
 * Cost estimation widgets help organizations understand the financial
 * implications of security choices, supporting budget planning and
 * investment prioritization. 💰
 *
 * @category Business Widgets
 */
export interface CostEstimationWidgetProps extends CIABaseWidgetProps {
  // No additional props needed beyond CIABaseWidgetProps
}

/**
 * Props for technical details widgets
 *
 * ## Business Perspective
 *
 * These widgets provide technical teams with implementation details and
 * guidance for meeting security requirements, translating policy into
 * actionable technical controls. 🔧
 *
 * @category Implementation Widgets
 */
export interface TechnicalDetailsWidgetProps extends CIABaseWidgetProps {
  /**
   * Implementation details for technical guidance
   */
  implementationDetails?: TechnicalImplementationDetails;
}

/**
 * Props for the CIA Impact Summary Widget
 *
 * ## Business Perspective
 *
 * This widget provides a consolidated view of security impacts across the
 * CIA triad, helping security officers understand the overall security
 * posture at a glance. 📊
 *
 * @category Assessment Widgets
 */
export interface CIAImpactSummaryWidgetProps extends SecurityLevelWidgetProps {
  /**
   * Whether to show detailed information
   */
  showDetails?: boolean;
}

/**
 * Props for security visualization widgets
 *
 * ## Business Perspective
 *
 * Visualization widgets help stakeholders understand complex security
 * concepts through intuitive charts and graphs, making security posture
 * more accessible to non-technical audiences. 📈
 *
 * @category Visualization Widgets
 */
export interface SecurityVisualizationWidgetProps extends CIABaseWidgetProps {
  /**
   * Type of chart to display
   */
  chartType?: "radar" | "bar" | "gauge";
}

/**
 * Props for security resources widgets
 *
 * ## Business Perspective
 *
 * These widgets provide resources and guidance for implementing security
 * controls, supporting security practitioners with practical implementation
 * advice and best practices. 📚
 *
 * @category Implementation Widgets
 */
export interface SecurityResourcesWidgetProps extends CIABaseWidgetProps {
  /**
   * Optional filter for resources
   */
  filter?: string;

  /**
   * Maximum number of items to display
   */
  maxItems?: number;
}

/**
 * Props for security component widgets
 *
 * ## Business Perspective
 *
 * These widgets represent individual CIA components, allowing detailed
 * analysis and adjustment of specific security aspects (availability,
 * integrity, or confidentiality). 🔍
 *
 * @category Component Widgets
 */
export interface SecurityComponentProps extends WidgetBaseProps {
  /**
   * The CIA component this widget represents
   */
  component: "availability" | "integrity" | "confidentiality";

  /**
   * Security level for this component
   */
  level: SecurityLevel;
}

/**
 * Props for security level selector components
 *
 * ## Business Perspective
 *
 * These interactive controls allow users to adjust security levels,
 * providing immediate feedback on the impact of their choices. 🎚️
 *
 * @category Control Widgets
 */
export interface SecurityLevelSelectorProps extends WidgetBaseProps {
  /**
   * Currently selected security level
   */
  selectedLevel: SecurityLevel;

  /**
   * Callback when level changes
   */
  onLevelChange: (level: SecurityLevel) => void;

  /**
   * The CIA component this selector controls
   */
  component: "availability" | "integrity" | "confidentiality";

  /**
   * Layout orientation
   */
  mode?: "horizontal" | "vertical";

  /**
   * Whether to highlight the selector
   */
  highlight?: boolean;

  /**
   * Whether to use compact layout
   */
  compact?: boolean;

  /**
   * Whether the selector is disabled
   */
  disabled?: boolean;
}

/**
 * Props for component impact widgets
 *
 * ## Business Perspective
 *
 * These widgets help analyze the impact of security levels on specific
 * CIA components, allowing focused assessment of individual security aspects. 🔍
 *
 * @category Component Widgets
 */
export interface ComponentImpactWidgetProps extends WidgetBaseProps {
  /**
   * Security level for this component
   */
  level: SecurityLevel;

  /**
   * The CIA component type to display
   */
  componentType: "availability" | "integrity" | "confidentiality";
}

/**
 * @deprecated Use widget prop interfaces from widget-props.ts instead
 * 
 * This interface is deprecated. Use the canonical widget prop interfaces
 * from widget-props.ts which provide better type safety and remove
 * deprecated properties like the generic `level` prop.
 * 
 * Migration:
 * - For AvailabilityImpactWidget: use AvailabilityImpactWidgetProps from widget-props.ts
 * - For IntegrityImpactWidget: use IntegrityImpactWidgetProps from widget-props.ts
 * - For ConfidentialityImpactWidget: use ConfidentialityImpactWidgetProps from widget-props.ts
 */
export interface ComponentImpactBaseProps {
  /**
   * @deprecated Use specific level props instead
   */
  level?: SecurityLevel;
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
  onLevelChange?: (level: SecurityLevel) => void;
}

/**
 * @deprecated Use AvailabilityImpactWidgetProps from widget-props.ts instead
 *
 * Props for the Availability Impact Widget
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how availability settings
 * affect uptime, recovery capabilities, and business continuity. ⏱️
 *
 * @category Impact Widgets
 */
export interface AvailabilityImpactWidgetProps
  extends ComponentImpactBaseProps {
  // All required props are inherited from ComponentImpactBaseProps
}

/**
 * @deprecated Use IntegrityImpactWidgetProps from widget-props.ts instead
 *
 * Props for the Integrity Impact Widget
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how integrity settings
 * affect data accuracy, validation processes, and information trustworthiness. 🔐
 *
 * @category Impact Widgets
 */
export interface IntegrityImpactWidgetProps extends ComponentImpactBaseProps {
  // All required props are inherited from ComponentImpactBaseProps
}

/**
 * @deprecated Use ConfidentialityImpactWidgetProps from widget-props.ts instead
 *
 * Props for the Confidentiality Impact Widget
 *
 * ## Business Perspective
 *
 * This widget helps stakeholders understand how confidentiality settings
 * affect data protection, access controls, and privacy safeguards. 🔒
 *
 * @category Impact Widgets
 */
export interface ConfidentialityImpactWidgetProps
  extends ComponentImpactBaseProps {
  // All required props are inherited from ComponentImpactBaseProps
}
