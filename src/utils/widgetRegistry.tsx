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
  SecurityLevelWidgetProps,
  IntegrityImpactWidgetProps,
  ConfidentialityImpactWidgetProps,
  AvailabilityImpactWidgetProps,
  SecurityResourcesWidgetProps,
  ValueCreationWidgetProps,
  BusinessImpactAnalysisWidgetProps,
  WidgetBaseProps,
} from "../types/widgets";

// Widget component type without constraint
type WidgetComponentType<T> = React.ComponentType<T>;

// Enhanced widget definition interface with better typing
export interface WidgetDefinition<T extends WidgetBaseProps> {
  id: string;
  title: string;
  component: WidgetComponentType<T>;
  defaultProps?: Partial<T>;
  icon?: ReactNode;
  size?: "small" | "medium" | "large" | "full";
  order?: number;
  description?: string;
}

// Class to manage available widgets and their configurations
export class WidgetRegistry {
  private widgets: Map<string, WidgetDefinition<any>> = new Map();

  // Register a widget with better typing
  register<T extends WidgetBaseProps>(widgetDef: WidgetDefinition<T>): void {
    this.widgets.set(widgetDef.id, widgetDef);
  }

  // Get a specific widget by ID with improved typing
  get<T extends WidgetBaseProps>(id: string): WidgetDefinition<T> | undefined {
    return this.widgets.get(id) as WidgetDefinition<T> | undefined;
  }

  // Improved getAll method with better typing and error handling
  getAll(): Array<WidgetDefinition<WidgetBaseProps>> {
    try {
      return Array.from(this.widgets.values()).sort((a, b) => {
        // Handle undefined order values safely
        const orderA = typeof a.order === "number" ? a.order : 999;
        const orderB = typeof b.order === "number" ? b.order : 999;
        return orderA - orderB;
      });
    } catch (error) {
      console.error("Error getting widgets:", error);
      return [];
    }
  }

  // Render a specific widget with improved type safety and error handling
  renderWidget<T extends WidgetBaseProps>(
    id: string,
    props: Partial<T> = {}
  ): ReactNode {
    try {
      const widget = this.widgets.get(id) as WidgetDefinition<T> | undefined;
      if (!widget) return null;

      // Safely merge default props with provided props
      const combinedProps = {
        ...(widget.defaultProps || {}),
        ...props,
      } as T;

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
    } catch (error) {
      return handleWidgetError(
        error instanceof Error
          ? error
          : new Error(`Error rendering ${id} widget`)
      );
    }
  }

  // Render widgets with better type safety
  renderWidgets(
    filter?: (widget: WidgetDefinition<WidgetBaseProps>) => boolean,
    props: Record<string, Record<string, unknown>> = {}
  ): ReactNode[] {
    try {
      const widgetsToRender = Array.from(this.widgets.values())
        .filter(filter || (() => true))
        .sort((a, b) => (a.order || 999) - (b.order || 999));

      return widgetsToRender.map((widget) => {
        try {
          const widgetProps = props[widget.id] || {};

          // Safely merge props
          const combinedProps = {
            ...(widget.defaultProps || {}),
            ...widgetProps,
          };

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
        } catch (error) {
          return (
            <WidgetContainer
              key={widget.id}
              title={widget.title}
              icon={widget.icon}
              size={widget.size}
              testId={`widget-${widget.id}-error`}
            >
              {handleWidgetError(
                error instanceof Error
                  ? error
                  : new Error(`Error rendering ${widget.title} widget`)
              )}
            </WidgetContainer>
          );
        }
      });
    } catch (error) {
      return [
        handleWidgetError(
          error instanceof Error ? error : new Error("Error rendering widgets")
        ),
      ];
    }
  }
}

// Create and export a singleton instance
export const widgetRegistry = new WidgetRegistry();

// Define interface for RadarChart props
interface RadarChartProps extends WidgetBaseProps {
  availabilityLevel: string;
  integrityLevel: string;
  confidentialityLevel: string;
}

// Define interface for CIAImpactProps
interface CIAImpactProps extends WidgetBaseProps {
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  className?: string;
}

// Pre-register core widgets with proper typing
widgetRegistry.register<SecurityLevelWidgetProps>({
  id: "security-level",
  title: "Security Level Selection",
  component: SecurityLevelWidget,
  size: "medium",
  order: 5,
  description: "Select appropriate security levels for your system",
});

widgetRegistry.register<RadarChartProps>({
  id: "security-visualization",
  title: "Security Profile Visualization",
  component: RadarChart,
  size: "medium",
  order: 15,
  description: "Visualize your security profile across CIA dimensions",
});

widgetRegistry.register<SecuritySummaryWidgetProps>({
  id: "security-summary",
  title: WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 10,
  description: "Summary of your current security posture",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
    securityLevel: SECURITY_LEVELS.NONE,
  },
});

// Add defaultProps for compliance status widget
widgetRegistry.register<ComplianceStatusWidgetProps>({
  id: "compliance-status",
  title: WIDGET_TITLES.COMPLIANCE_STATUS,
  component: ComplianceStatusWidget,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
  description: "Overview of your system's compliance status",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
  },
});

// Register the CIAImpactSummaryWidget
widgetRegistry.register<CIAImpactProps>({
  id: "cia-impact-summary",
  title: "CIA Impact Summary",
  component: CIAImpactSummaryWidget,
  icon: "🛡️",
  size: "small",
  order: 12,
  description: "Summary of CIA security impacts",
  defaultProps: {
    availability: SECURITY_LEVELS.NONE,
    integrity: SECURITY_LEVELS.NONE,
    confidentiality: SECURITY_LEVELS.NONE,
  },
});

// Register other widgets with proper typing - add specific type annotations
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

widgetRegistry.register<IntegrityImpactWidgetProps>({
  id: "integrity-impact",
  title: WIDGET_TITLES.INTEGRITY_IMPACT,
  component: IntegrityImpactWidget,
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 30,
  description: "Impact and recommendations for data integrity",
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

widgetRegistry.register<ConfidentialityImpactWidgetProps>({
  id: "confidentiality-impact",
  title: WIDGET_TITLES.CONFIDENTIALITY_IMPACT,
  component: ConfidentialityImpactWidget,
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 35,
  description: "Impact and recommendations for data confidentiality",
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

widgetRegistry.register<AvailabilityImpactWidgetProps>({
  id: "availability-impact",
  title: WIDGET_TITLES.AVAILABILITY_IMPACT,
  component: AvailabilityImpactWidget,
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 40,
  description: "Impact and recommendations for system availability",
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

widgetRegistry.register<SecurityResourcesWidgetProps>({
  id: "security-resources",
  title: WIDGET_TITLES.SECURITY_RESOURCES,
  component: SecurityResourcesWidget,
  icon: WIDGET_ICONS.SECURITY_RESOURCES,
  size: "medium",
  order: 45,
  description: "Security resources and documentation",
  defaultProps: {
    securityLevel: SECURITY_LEVELS.NONE,
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
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
  },
});

widgetRegistry.register<BusinessImpactAnalysisWidgetProps>({
  id: "business-impact",
  title: WIDGET_TITLES.BUSINESS_IMPACT,
  component: BusinessImpactAnalysisWidget,
  icon: WIDGET_ICONS.BUSINESS_IMPACT,
  size: "large",
  order: 55,
  description: "Analysis of security impacts on business operations",
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
  },
});

export default widgetRegistry;
