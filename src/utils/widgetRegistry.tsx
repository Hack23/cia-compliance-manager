import { ReactNode } from "react";
import WidgetContainer from "../components/common/WidgetContainer";
import {
  SECURITY_LEVELS,
  WIDGET_ICONS,
  WIDGET_TITLES,
} from "../constants/coreConstants";
import { SecurityLevel } from "../types/cia";
import {
  WidgetComponentType,
  WidgetDefinition,
  WidgetSize,
} from "../types/widgets";
import handleWidgetError from "./errorHandlers";

// Import all widget components
import AvailabilityImpactWidget, {
  AvailabilityImpactWidgetProps,
} from "../components/widgets/AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget, {
  BusinessImpactAnalysisWidgetProps,
} from "../components/widgets/BusinessImpactAnalysisWidget";
import CIAImpactSummaryWidget, {
  CIAImpactSummaryWidgetProps,
} from "../components/widgets/CIAImpactSummaryWidget";
import ComplianceStatusWidget, {
  ComplianceStatusWidgetProps,
} from "../components/widgets/ComplianceStatusWidget";
import ConfidentialityImpactWidget, {
  ConfidentialityImpactWidgetProps,
} from "../components/widgets/ConfidentialityImpactWidget";
import CostEstimationWidget, {
  CostEstimationWidgetProps,
} from "../components/widgets/CostEstimationWidget";
import IntegrityImpactWidget, {
  IntegrityImpactWidgetProps,
} from "../components/widgets/IntegrityImpactWidget";
import SecurityResourcesWidget, {
  SecurityResourcesWidgetProps,
} from "../components/widgets/SecurityResourcesWidget";
import SecuritySummaryWidget, {
  SecuritySummaryWidgetProps,
} from "../components/widgets/SecuritySummaryWidget";
import SecurityVisualizationWidget, {
  SecurityVisualizationWidgetProps,
} from "../components/widgets/SecurityVisualizationWidget";
import TechnicalDetailsWidget, {
  TechnicalDetailsWidgetProps,
} from "../components/widgets/TechnicalDetailsWidget";
import ValueCreationWidget, {
  ValueCreationWidgetProps,
} from "../components/widgets/ValueCreationWidget";

/**
 * Type definition for widget size options
 */
export type WidgetSizeOption = "small" | "medium" | "large" | "full";

/**
 * Convert a size string to widget size dimensions
 *
 * @param size The size string to convert
 * @returns Widget dimensions object or undefined
 */
const convertSizeToWidgetSize = (size?: string): WidgetSize | undefined => {
  if (!size) return undefined;

  // Map string sizes to appropriate width/height dimensions
  switch (size) {
    case "small":
      return { width: 1, height: 1 };
    case "medium":
      return { width: 2, height: 1 };
    case "large":
      return { width: 2, height: 2 };
    case "full":
      return { width: 4, height: 2 };
    default:
      return { width: 2, height: 1 }; // Default to medium
  }
};

/**
 * Widget Registry interface defining the API for working with widgets
 */
export interface WidgetRegistry {
  register<T>(definition: WidgetDefinition<T>): void;
  get<T>(id: string): WidgetDefinition<T> | undefined;
  getAll(): WidgetDefinition<any>[];
  renderWidget<T>(id: string, props?: Partial<T>): ReactNode | null;
  renderWidgets(
    filter?: (widget: WidgetDefinition<any>) => boolean,
    props?: Record<string, any>
  ): ReactNode[];
}

/**
 * Class to manage available widgets and their configurations
 *
 * ## Business Perspective
 *
 * This registry provides a central system for managing all widgets in the application,
 * enabling consistent behavior, appearance, and dynamic layout capabilities.
 * The singleton approach ensures all dashboard views share the same widget definitions
 * for consistency across the application. 🔄
 */
class WidgetRegistryImpl implements WidgetRegistry {
  private widgets: Map<string, WidgetDefinition<any>> = new Map();

  /**
   * Register a widget with the registry
   * @param definition Widget definition object
   */
  register<T>(definition: WidgetDefinition<T>): void {
    // Apply default values for missing properties
    const finalDefinition = {
      ...definition,
      size: definition.size || "medium",
      order: definition.order || 999,
    };

    this.widgets.set(finalDefinition.id, finalDefinition);
  }

  /**
   * Get a widget definition by ID
   * @param id Widget identifier
   * @returns Widget definition or undefined if not found
   */
  get<T>(id: string): WidgetDefinition<T> | undefined {
    return this.widgets.get(id) as WidgetDefinition<T> | undefined;
  }

  /**
   * Get all registered widgets as an array
   * @returns Array of widget definitions
   */
  getAll(): WidgetDefinition<any>[] {
    return Array.from(this.widgets.values()).sort(
      (a, b) => a.order! - b.order!
    );
  }

  /**
   * Render a single widget by ID with optional props
   * @param id Widget identifier
   * @param props Optional props to pass to the widget
   * @returns Rendered widget or null if widget not found
   */
  renderWidget<T>(id: string, props: Partial<T> = {}): ReactNode | null {
    const widget = this.widgets.get(id);
    if (!widget) return null;

    try {
      // Merge default props with provided props
      const finalProps = {
        ...widget.defaultProps,
        ...props,
      };

      return (
        <WidgetContainer
          key={widget.id}
          title={widget.title}
          icon={widget.icon}
          size={convertSizeToWidgetSize(widget.size)}
          testId={`widget-${widget.id}`}
        >
          <widget.component {...finalProps} />
        </WidgetContainer>
      );
    } catch (error) {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      return handleWidgetError(errorObj, id);
    }
  }

  /**
   * Render multiple widgets filtered by a predicate function
   * @param filter Optional filter function to select widgets
   * @param props Optional props for each widget by ID
   * @returns Array of rendered widget components
   */
  renderWidgets(
    filter?: (widget: WidgetDefinition<any>) => boolean,
    props: Record<string, any> = {}
  ): ReactNode[] {
    const widgetsToRender = Array.from(this.widgets.values())
      .filter(filter || (() => true))
      .sort((a, b) => a.order! - b.order!);

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.id] || {};
      const combinedProps = { ...widget.defaultProps, ...widgetProps };

      return (
        <WidgetContainer
          key={widget.id}
          title={widget.title}
          icon={widget.icon}
          size={convertSizeToWidgetSize(widget.size)}
          testId={`widget-${widget.id}`}
        >
          <widget.component {...combinedProps} />
        </WidgetContainer>
      );
    });
  }
}

// Create and export a singleton instance
export const widgetRegistry = new WidgetRegistryImpl();

// Register core widgets
widgetRegistry.register<SecuritySummaryWidgetProps>({
  id: "security-summary",
  title: WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 10,
});

widgetRegistry.register<ComplianceStatusWidgetProps>({
  id: "compliance-status",
  title: WIDGET_TITLES.COMPLIANCE_STATUS,
  component:
    ComplianceStatusWidget as unknown as WidgetComponentType<ComplianceStatusWidgetProps>,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

widgetRegistry.register<ValueCreationWidgetProps>({
  id: "value-creation",
  title: WIDGET_TITLES.VALUE_CREATION,
  component:
    ValueCreationWidget as WidgetComponentType<ValueCreationWidgetProps>,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 25,
  description: "Business value created by security investments",
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

// Register integrity impact widget with proper type assertion
widgetRegistry.register<IntegrityImpactWidgetProps>({
  id: "integrity-impact",
  title: WIDGET_TITLES.INTEGRITY_IMPACT,
  component: IntegrityImpactWidget,
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 30,
  description: "Impact and recommendations for data integrity",
  defaultProps: {
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

// Register confidentiality impact widget with proper type assertion
widgetRegistry.register<ConfidentialityImpactWidgetProps>({
  id: "confidentiality-impact",
  title: WIDGET_TITLES.CONFIDENTIALITY_IMPACT,
  component: ConfidentialityImpactWidget,
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 35,
  description: "Impact and recommendations for data confidentiality",
  defaultProps: {
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

widgetRegistry.register<AvailabilityImpactWidgetProps>({
  id: "availability-impact",
  title: WIDGET_TITLES.AVAILABILITY_IMPACT,
  component:
    AvailabilityImpactWidget as unknown as WidgetComponentType<AvailabilityImpactWidgetProps>,
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 40,
  description: "Impact and recommendations for system availability",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    options: {},
  },
});

widgetRegistry.register<SecurityResourcesWidgetProps>({
  id: "security-resources",
  title: WIDGET_TITLES.SECURITY_RESOURCES,
  component:
    SecurityResourcesWidget as unknown as WidgetComponentType<SecurityResourcesWidgetProps>,
  icon: WIDGET_ICONS.SECURITY_RESOURCES,
  size: "medium",
  order: 45,
  description: "Security resources and documentation",
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

widgetRegistry.register<TechnicalDetailsWidgetProps>({
  id: "technical-details",
  title: WIDGET_TITLES.TECHNICAL_IMPLEMENTATION,
  component: TechnicalDetailsWidget,
  icon: WIDGET_ICONS.TECHNICAL_IMPLEMENTATION,
  size: "large",
  order: 50,
  description: "Technical implementation details for security controls",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

widgetRegistry.register<BusinessImpactAnalysisWidgetProps>({
  id: "business-impact",
  title: WIDGET_TITLES.BUSINESS_IMPACT,
  component: BusinessImpactAnalysisWidget,
  icon: WIDGET_ICONS.BUSINESS_IMPACT,
  size: "large",
  order: 55,
  description: "Business impact analysis for security choices",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

// Register CIAImpactSummaryWidget
widgetRegistry.register<CIAImpactSummaryWidgetProps>({
  id: "cia-impact-summary",
  title: "CIA Impact Summary",
  description: "Shows a consolidated overview of CIA security impacts",
  component: CIAImpactSummaryWidget,
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
  size: "small",
  order: 12,
  icon: "🛡️",
  position: 0,
});

// Register security visualization widget
widgetRegistry.register<SecurityVisualizationWidgetProps>({
  id: "security-visualization",
  title: WIDGET_TITLES.SECURITY_VISUALIZATION,
  component: SecurityVisualizationWidget,
  icon: WIDGET_ICONS.SECURITY_VISUALIZATION,
  size: "medium",
  order: 15,
  description: "Security profile visualization and risk assessment",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

// Register cost estimation widget
widgetRegistry.register<CostEstimationWidgetProps>({
  id: "cost-estimation",
  title: WIDGET_TITLES.COST_ESTIMATION,
  component: CostEstimationWidget,
  icon: WIDGET_ICONS.COST_ESTIMATION,
  size: "medium",
  order: 22,
  description: "Cost estimation for security implementation",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    integrityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
    confidentialityLevel: SECURITY_LEVELS.NONE as SecurityLevel,
  },
});

// Create a utility object with simple methods for testing
export const widgetRegistryUtils = {
  getWidget: function <T>(id: string): WidgetDefinition<T> | undefined {
    return widgetRegistry.get<T>(id);
  },

  getAllWidgetKeys: function (): string[] {
    return widgetRegistry.getAll().map((widget) => widget.id);
  },

  renderWidget: function <T>(
    id: string,
    props: Partial<T> = {}
  ): ReactNode | null {
    return widgetRegistry.renderWidget<T>(id, props);
  },

  renderWidgets: function (
    keys?: string[],
    props: Record<string, any> = {}
  ): ReactNode[] {
    if (keys) {
      return widgetRegistry.renderWidgets(
        (widget) => keys.includes(widget.id),
        props
      );
    }
    return widgetRegistry.renderWidgets(undefined, props);
  },
};

export default widgetRegistry;
