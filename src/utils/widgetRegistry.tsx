import React, { ReactNode } from "react";
import { WIDGET_TITLES, WIDGET_ICONS } from "../constants/coreConstants";
import { SECURITY_LEVELS } from "../constants/appConstants";
import AvailabilityImpactWidget from "../components/widgets/AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget from "../components/widgets/BusinessImpactAnalysisWidget";
import ComplianceStatusWidget from "../components/widgets/ComplianceStatusWidget";
import ConfidentialityImpactWidget from "../components/widgets/ConfidentialityImpactWidget";
import CostEstimationWidget from "../components/widgets/CostEstimationWidget";
import IntegrityImpactWidget from "../components/widgets/IntegrityImpactWidget";
import RadarChart from "../components/RadarChart";
import SecurityLevelWidget from "../components/widgets/SecurityLevelWidget";
import SecurityResourcesWidget from "../components/widgets/SecurityResourcesWidget";
import SecuritySummaryWidget from "../components/widgets/SecuritySummaryWidget";
import TechnicalDetailsWidget from "../components/widgets/TechnicalDetailsWidget";
import ValueCreationWidget from "../components/widgets/ValueCreationWidget";
import CIAImpactSummaryWidget from "../components/widgets/CIAImpactSummaryWidget";
import { WidgetContainer } from "../components/common";
import { handleWidgetError } from "./widgetHelpers";

// Import all widget prop types
import {
  CostEstimationWidgetProps,
  SecuritySummaryWidgetProps,
  TechnicalDetailsWidgetProps,
  ComplianceStatusWidgetProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  AvailabilityImpactWidgetProps,
  SecurityResourcesWidgetProps,
  ValueCreationWidgetProps,
  BusinessImpactAnalysisWidgetProps,
  WidgetBaseProps,
} from "../types/widgets";

// Import SecurityLevel type
import { SecurityLevel } from "../types/cia";

// Widget component type without constraint
type WidgetComponentType<T> = React.ComponentType<T>;

// Standardized interface for CIAImpactProps
interface CIAImpactSummaryWidgetProps extends WidgetBaseProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
}

// Modified WidgetDefinition interface to make generic type constraint optional
export interface WidgetDefinition<T> {
  id: string;
  title: string;
  component: WidgetComponentType<T>;
  defaultProps?: Partial<T>;
  icon?: ReactNode;
  size?: "small" | "medium" | "large" | "full";
  order?: number;
  description?: string;
  position?: number;
}

// Class to manage available widgets and their configurations
class WidgetRegistry {
  private widgets: Map<string, WidgetDefinition<any>> = new Map();

  // Register a widget with the registry
  register<T>(definition: WidgetDefinition<T>): void {
    // Apply default values for missing properties
    const finalDefinition = {
      ...definition,
      size: definition.size || "medium",
      order: definition.order || 999,
    };

    this.widgets.set(finalDefinition.id, finalDefinition);
  }

  // Get a widget definition by ID
  get<T>(id: string): WidgetDefinition<T> | undefined {
    return this.widgets.get(id) as WidgetDefinition<T> | undefined;
  }

  // Get all registered widgets as an array
  getAll(): WidgetDefinition<any>[] {
    return Array.from(this.widgets.values()).sort(
      (a, b) => a.order! - b.order!
    );
  }

  // Render a single widget by ID with optional props
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
          size={widget.size}
          testId={`widget-${widget.id}`}
        >
          <widget.component {...finalProps} />
        </WidgetContainer>
      );
    } catch (error) {
      // Fix error handling by creating an Error object if it's not already one
      const errorObj =
        error instanceof Error ? error : new Error(String(error));
      // Swap the parameter order - Error object first, then id
      return handleWidgetError(errorObj, id);
    }
  }

  // Render multiple widgets filtered by a predicate function
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
          size={widget.size}
          testId={`widget-${widget.id}`}
        >
          <widget.component {...combinedProps} />
        </WidgetContainer>
      );
    });
  }
}

// Create and export a singleton instance
export const widgetRegistry = new WidgetRegistry();

// Pre-register core widgets
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
  // Fix the type compatibility issue with type assertion
  component:
    ComplianceStatusWidget as unknown as WidgetComponentType<ComplianceStatusWidgetProps>,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE,
  },
});

widgetRegistry.register<ValueCreationWidgetProps>({
  id: "value-creation",
  title: WIDGET_TITLES.VALUE_CREATION,
  component: ValueCreationWidget,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 25,
  description: "Business value created by security investments",
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE,
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
  // Fix the type compatibility issue with type assertion
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
  // Fix the type compatibility issue with type assertion
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

// For CIAImpactSummaryWidget component registration
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

export default widgetRegistry;
