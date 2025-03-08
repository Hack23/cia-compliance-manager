import React, { ReactNode } from "react";
import { WidgetContainer } from "../components/common";
// Add SECURITY_LEVELS import
import { SECURITY_LEVELS } from "../constants/appConstants";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/coreConstants";

// Add export to the interface definition
export interface WidgetDefinition {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  defaultProps?: object;
  icon?: ReactNode;
  size?: "small" | "medium" | "large" | "full";
  order?: number;
}

// Class to manage available widgets and their configurations
export class WidgetRegistry {
  private widgets: Map<string, WidgetDefinition> = new Map();

  // Register a widget with the system
  register(widgetDef: WidgetDefinition): void {
    this.widgets.set(widgetDef.id, {
      order: 999, // Default order if not specified
      size: "medium", // Default size if not specified
      ...widgetDef,
    });
  }

  // Get a specific widget by ID
  get(id: string): WidgetDefinition | undefined {
    return this.widgets.get(id);
  }

  // Improve the getAll method to handle sorting edge cases
  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values()).sort((a, b) => {
      // Handle undefined order values safely
      const orderA = typeof a.order === "number" ? a.order : 999;
      const orderB = typeof b.order === "number" ? a.order : 999;
      // Ensure we're working with numbers for the subtraction
      return (orderA || 999) - (orderB || 999);
    });
  }

  // Render a specific widget with props
  renderWidget(id: string, props: any = {}): ReactNode {
    const widget = this.widgets.get(id);
    if (!widget) return null;

    const combinedProps = { ...widget.defaultProps, ...props };

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
  }

  // Render all widgets that match a filter
  renderWidgets(
    filter?: (widget: WidgetDefinition) => boolean,
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

// Fix: Import components directly instead of using require()
// This avoids issues during testing
import SecuritySummaryWidget from "../components/widgets/SecuritySummaryWidget";
import ComplianceStatusWidget from "../components/widgets/ComplianceStatusWidget";
import ValueCreationWidget from "../components/widgets/ValueCreationWidget";
import CostEstimationWidget from "../components/widgets/CostEstimationWidget";
import SecurityLevelWidget from "../components/widgets/SecurityLevelWidget";
import RadarChart from "../components/RadarChart";
import IntegrityImpactWidget from "../components/widgets/IntegrityImpactWidget";
import ConfidentialityImpactWidget from "../components/widgets/ConfidentialityImpactWidget";
import AvailabilityImpactWidget from "../components/widgets/AvailabilityImpactWidget";
import SecurityResourcesWidget from "../components/widgets/SecurityResourcesWidget";
import TechnicalDetailsWidget from "../components/widgets/TechnicalDetailsWidget";
import BusinessImpactAnalysisWidget from "../components/widgets/BusinessImpactAnalysisWidget";

// Pre-register core widgets
widgetRegistry.register({
  id: "security-level",
  title: "Security Level Selection",
  component: SecurityLevelWidget,
  size: "medium",
  order: 5,
});

widgetRegistry.register({
  id: "security-visualization",
  title: "Security Profile Visualization",
  component: RadarChart,
  size: "medium",
  order: 15,
});

widgetRegistry.register({
  id: "security-summary",
  title: WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 10,
  // Define defaultProps with the standardized prop names
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
  },
});

// Update all widget registrations to use standardized props

// Add defaultProps for compliance status widget
widgetRegistry.register({
  id: "compliance-status",
  title: WIDGET_TITLES.COMPLIANCE_STATUS,
  component: ComplianceStatusWidget,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
  },
});

widgetRegistry.register({
  id: "value-creation",
  title: WIDGET_TITLES.VALUE_CREATION,
  component: ValueCreationWidget,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 30,
});

widgetRegistry.register({
  id: "cost-estimation",
  title: WIDGET_TITLES.COST_ESTIMATION,
  component: CostEstimationWidget,
  icon: WIDGET_ICONS.COST_ESTIMATION,
  size: "medium",
  order: 40,
});

widgetRegistry.register({
  id: "availability-impact",
  title: "Availability Impact",
  component: AvailabilityImpactWidget,
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 50,
  // Use component-specific pattern
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

// Add defaultProps for integrity impact widget
widgetRegistry.register({
  id: "integrity-impact",
  title: "Integrity Impact",
  component: IntegrityImpactWidget,
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 60,
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

// Add defaultProps for confidentiality impact widget
widgetRegistry.register({
  id: "confidentiality-impact",
  title: "Confidentiality Impact",
  component: ConfidentialityImpactWidget,
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 70,
  defaultProps: {
    level: SECURITY_LEVELS.NONE,
    options: {},
  },
});

widgetRegistry.register({
  id: "security-resources",
  title: "Security Resources",
  component: SecurityResourcesWidget,
  size: "medium",
  order: 80,
});

// Add defaultProps for technical details widget
widgetRegistry.register({
  id: "technical-details",
  title: "Technical Implementation",
  component: TechnicalDetailsWidget,
  size: "medium",
  order: 90,
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
    availabilityOptions: {},
    integrityOptions: {},
    confidentialityOptions: {},
  },
});

// Add defaultProps for business impact analysis widget
widgetRegistry.register({
  id: "business-impact-analysis",
  title: "Business Impact Analysis",
  component: BusinessImpactAnalysisWidget,
  size: "medium",
  order: 100,
  defaultProps: {
    availabilityLevel: SECURITY_LEVELS.NONE,
    integrityLevel: SECURITY_LEVELS.NONE,
    confidentialityLevel: SECURITY_LEVELS.NONE,
    securityLevel: SECURITY_LEVELS.NONE,
  },
});

export default widgetRegistry;
