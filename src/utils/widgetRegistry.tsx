/**
 * Widget Registry for dynamic widget loading and management
 *
 * ## Business Perspective
 *
 * The widget registry enables flexible, customizable dashboards that can
 * be tailored to different user roles (from security analysts to executives)
 * while maintaining consistent data presentation across the application. 📊
 */

import React from "react";
import WidgetContainer from "../components/common/WidgetContainer";
import AvailabilityImpactWidget from "../components/widgets/AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget from "../components/widgets/BusinessImpactAnalysisWidget";
import CIAImpactSummaryWidget from "../components/widgets/CIAImpactSummaryWidget";
import ComplianceStatusWidget from "../components/widgets/ComplianceStatusWidget";
import ConfidentialityImpactWidget from "../components/widgets/ConfidentialityImpactWidget";
import CostEstimationWidget from "../components/widgets/CostEstimationWidget";
import IntegrityImpactWidget from "../components/widgets/IntegrityImpactWidget";
import SecurityLevelWidget from "../components/widgets/SecurityLevelWidget";
import SecurityResourcesWidget from "../components/widgets/SecurityResourcesWidget";
import SecuritySummaryWidget from "../components/widgets/SecuritySummaryWidget";
import SecurityVisualizationWidget from "../components/widgets/SecurityVisualizationWidget";
import TechnicalDetailsWidget from "../components/widgets/TechnicalDetailsWidget";
import ValueCreationWidget from "../components/widgets/ValueCreationWidget";
import { WIDGET_ICONS, WIDGET_TITLES } from "../constants/appConstants";
import { WIDGET_REGISTRY_TEST_IDS } from "../constants/testIds";
import { SecurityLevel } from "../types/cia";
import { SecuritySummaryWidgetProps } from "../types/widgets";

// Define widget props interface for type safety
interface WidgetProps {
  [key: string]: any;
}

// Define widget registry interface
export interface WidgetRegistry {
  register<T>(config: WidgetDefinition<T>): void;
  get(id: string): WidgetDefinition<any> | undefined;
  getAll(): WidgetDefinition<any>[];
  renderWidget(id: string, props?: any): React.ReactNode;
  renderWidgets(filter?: (widget: WidgetDefinition<any>) => boolean, props?: WidgetProps): React.ReactNode[];
}

// Define widget definition interface
export interface WidgetDefinition<T = any> {
  id: string;
  title: string;
  component: React.ComponentType<T>;
  icon: string;
  size?: "small" | "medium" | "large" | "full";
  order?: number;
  defaultProps?: Partial<T>;
  minSecurityLevel?: SecurityLevel;
  maxSecurityLevel?: SecurityLevel;
  description?: string;
  position?: number;
}

// Widget registry implementation
export class WidgetRegistryImpl implements WidgetRegistry {
  private widgets: Map<string, WidgetDefinition<any>> = new Map();

  register<T>(config: WidgetDefinition<T>): void {
    this.widgets.set(config.id, config);
  }

  get(id: string): WidgetDefinition<any> | undefined {
    return this.widgets.get(id);
  }

  getAll(): WidgetDefinition<any>[] {
    return Array.from(this.widgets.values());
  }

  renderWidget(id: string, props: any = {}): React.ReactNode {
    const widget = this.widgets.get(id);
    if (!widget) return null;

    const combinedProps = { ...widget.defaultProps, ...props };

    return (
      <WidgetContainer
        key={widget.id}
        title={widget.title}
        icon={widget.icon}
        testId={`${WIDGET_REGISTRY_TEST_IDS.WIDGET_PREFIX}${widget.id}`}
      >
        <widget.component {...combinedProps} />
      </WidgetContainer>
    );
  }

  renderWidgets(
    filter?: (widget: WidgetDefinition<any>) => boolean,
    props: WidgetProps = {}
  ): React.ReactNode[] {
    let widgetsToRender = Array.from(this.widgets.values());

    if (filter) {
      widgetsToRender = widgetsToRender.filter(filter);
    }

    // Sort widgets by order, then position
    widgetsToRender = widgetsToRender
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .sort((a, b) => (a.position || 0) - (b.position || 0));

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.id] || {};
      const combinedProps = { ...widget.defaultProps, ...widgetProps };

      return (
        <WidgetContainer
          key={widget.id}
          title={widget.title}
          icon={widget.icon}
          testId={`${WIDGET_REGISTRY_TEST_IDS.WIDGET_PREFIX}${widget.id}`}
        >
          <widget.component {...combinedProps} />
        </WidgetContainer>
      );
    });
  }
}

// Create and export a singleton instance
const widgetRegistry = new WidgetRegistryImpl();

// Register core widgets
widgetRegistry.register<SecuritySummaryWidgetProps>({
  id: "security-summary",
  title: WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 10,
});

widgetRegistry.register({
  id: "compliance-status",
  title: WIDGET_TITLES.COMPLIANCE_STATUS,
  component: ComplianceStatusWidget,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 20,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "value-creation",
  title: WIDGET_TITLES.VALUE_CREATION,
  component: ValueCreationWidget,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 30,
  defaultProps: {
    securityLevel: "None" as SecurityLevel,
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "cost-estimation",
  title: WIDGET_TITLES.COST_ESTIMATION,
  component: CostEstimationWidget,
  icon: WIDGET_ICONS.COST_ESTIMATION,
  size: "medium",
  order: 40,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "security-levels",
  title: WIDGET_TITLES.SECURITY_LEVEL,
  component: SecurityLevelWidget,
  icon: WIDGET_ICONS.SECURITY_LEVEL,
  size: "medium",
  order: 1,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
    setAvailability: () => {},
    setIntegrity: () => {},
    setConfidentiality: () => {},
    onAvailabilityChange: () => {},
    onIntegrityChange: () => {},
    onConfidentialityChange: () => {},
    // Remove securityLevel property as it doesn't exist in SecurityLevelWidgetProps
  },
});

widgetRegistry.register({
  id: "cia-impact-summary",
  title: WIDGET_TITLES.CIA_IMPACT_SUMMARY,
  component: CIAImpactSummaryWidget,
  icon: WIDGET_ICONS.CIA_IMPACT_SUMMARY,
  size: "small",
  order: 12,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

// Register security visualization widget
widgetRegistry.register({
  id: "security-visualization",
  title: WIDGET_TITLES.SECURITY_VISUALIZATION,
  component: SecurityVisualizationWidget,
  icon: WIDGET_ICONS.SECURITY_VISUALIZATION,
  size: "medium",
  order: 15,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

// Register CIA triad component widgets
widgetRegistry.register({
  id: "availability-impact",
  title: WIDGET_TITLES.AVAILABILITY_IMPACT,
  component: AvailabilityImpactWidget,
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 50,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "integrity-impact",
  title: WIDGET_TITLES.INTEGRITY_IMPACT,
  component: IntegrityImpactWidget,
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 60,
  defaultProps: {
    integrityLevel: "None" as SecurityLevel,
    availabilityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "confidentiality-impact",
  title: WIDGET_TITLES.CONFIDENTIALITY_IMPACT,
  component: ConfidentialityImpactWidget,
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 70,
  defaultProps: {
    confidentialityLevel: "None" as SecurityLevel,
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "technical-details",
  title: WIDGET_TITLES.TECHNICAL_DETAILS,
  component: TechnicalDetailsWidget,
  icon: WIDGET_ICONS.TECHNICAL_DETAILS,
  size: "large",
  order: 80,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "business-impact",
  title: WIDGET_TITLES.BUSINESS_IMPACT,
  component: BusinessImpactAnalysisWidget,
  icon: WIDGET_ICONS.BUSINESS_IMPACT,
  size: "full",
  order: 90,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "security-resources",
  title: WIDGET_TITLES.SECURITY_RESOURCES,
  component: SecurityResourcesWidget,
  icon: WIDGET_ICONS.SECURITY_RESOURCES,
  size: "large",
  order: 100,
  defaultProps: {
    availabilityLevel: "None" as SecurityLevel,
    integrityLevel: "None" as SecurityLevel,
    confidentialityLevel: "None" as SecurityLevel,
    securityLevel: "None" as SecurityLevel,
  },
});

export default widgetRegistry;
