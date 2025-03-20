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
import { ComplianceStatusWidget } from "../components/widgets/ComplianceStatusWidget";
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
  renderWidgetsWithHandlers(
    filter?: (widget: WidgetDefinition<any>) => boolean,
    props?: WidgetProps,
    handlers?: {
      onAvailabilityChange?: (level: SecurityLevel) => void;
      onIntegrityChange?: (level: SecurityLevel) => void;
      onConfidentialityChange?: (level: SecurityLevel) => void;
    }
  ): React.ReactNode[];
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
    
    // Extract global security levels from props
    const securityLevels = {
      availabilityLevel: props.availabilityLevel || "Moderate" as SecurityLevel,
      integrityLevel: props.integrityLevel || "Moderate" as SecurityLevel,
      confidentialityLevel: props.confidentialityLevel || "Moderate" as SecurityLevel,
    };

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.id] || {};
      
      // Ensure each widget gets the same security level props for consistency
      const combinedProps = { 
        ...widget.defaultProps,
        ...securityLevels,         // Apply consistent security levels
        ...widgetProps,            // Allow other widget customization
        // Force the security levels again to ensure consistency
        availabilityLevel: securityLevels.availabilityLevel,
        integrityLevel: securityLevels.integrityLevel,
        confidentialityLevel: securityLevels.confidentialityLevel,
      };

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

  renderWidgetsWithHandlers(
    filter?: (widget: WidgetDefinition<any>) => boolean,
    props: WidgetProps = {},
    handlers?: {
      onAvailabilityChange?: (level: SecurityLevel) => void;
      onIntegrityChange?: (level: SecurityLevel) => void;
      onConfidentialityChange?: (level: SecurityLevel) => void;
    }
  ): React.ReactNode[] {
    let widgetsToRender = Array.from(this.widgets.values());

    if (filter) {
      widgetsToRender = widgetsToRender.filter(filter);
    }

    // Sort widgets by order, then position
    widgetsToRender = widgetsToRender
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .sort((a, b) => (a.position || 0) - (b.position || 0));
    
    // Extract global security levels from props
    const securityLevels = {
      availabilityLevel: props.availabilityLevel || "Moderate" as SecurityLevel,
      integrityLevel: props.integrityLevel || "Moderate" as SecurityLevel,
      confidentialityLevel: props.confidentialityLevel || "Moderate" as SecurityLevel,
    };

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.id] || {};
      
      // Ensure each widget gets the same security level props for consistency
      const combinedProps = { 
        ...widget.defaultProps,
        ...securityLevels,         // Apply consistent security levels
        ...widgetProps,            // Allow other widget customization
        // Add handlers so widgets can propagate changes back to the parent
        ...(handlers && {
          onAvailabilityChange: handlers.onAvailabilityChange,
          onIntegrityChange: handlers.onIntegrityChange,
          onConfidentialityChange: handlers.onConfidentialityChange,
        }),
        // Force the security levels again to ensure consistency
        availabilityLevel: securityLevels.availabilityLevel,
        integrityLevel: securityLevels.integrityLevel,
        confidentialityLevel: securityLevels.confidentialityLevel,
      };

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

// Register widgets in the desired order (order property determines display order)

// Group 1: Core Security Configuration and Overview (order 10-29)
widgetRegistry.register({
  id: "security-level",
  title: WIDGET_TITLES.SECURITY_LEVEL,
  component: SecurityLevelWidget,
  icon: WIDGET_ICONS.SECURITY_LEVEL,
  size: "medium",
  order: 10, // First widget - security configuration
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "business-impact",
  title: WIDGET_TITLES.BUSINESS_IMPACT,
  component: BusinessImpactAnalysisWidget,
  icon: WIDGET_ICONS.BUSINESS_IMPACT,
  size: "medium",
  order: 20, // Second widget - business impact
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register<SecuritySummaryWidgetProps>({
  id: "security-summary",
  title: WIDGET_TITLES.SECURITY_SUMMARY,
  component: SecuritySummaryWidget,
  icon: WIDGET_ICONS.SECURITY_SUMMARY,
  size: "medium",
  order: 25, // Third widget - security summary
});

// Group 2: Business Value and Compliance Widgets (order 30-49)
widgetRegistry.register({
  id: "value-creation",
  title: WIDGET_TITLES.VALUE_CREATION,
  component: ValueCreationWidget,
  icon: WIDGET_ICONS.VALUE_CREATION,
  size: "medium",
  order: 30, // Business value comes first in Group 2
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
    securityLevel: "Moderate" as SecurityLevel, // Add explicit securityLevel
  },
});

widgetRegistry.register({
  id: "cost-estimation",
  title: WIDGET_TITLES.COST_ESTIMATION,
  component: CostEstimationWidget,
  icon: WIDGET_ICONS.COST_ESTIMATION,
  size: "medium",
  order: 35, // Cost is part of business value
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "compliance-status",
  title: WIDGET_TITLES.COMPLIANCE_STATUS,
  component: ComplianceStatusWidget,
  icon: WIDGET_ICONS.COMPLIANCE_STATUS,
  size: "medium",
  order: 40, // Compliance is a business driver
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

// Group 3: CIA Component Impact Widgets (order 50-69)
widgetRegistry.register({
  id: "cia-impact-summary",
  title: WIDGET_TITLES.CIA_IMPACT_SUMMARY,
  component: CIAImpactSummaryWidget,
  icon: WIDGET_ICONS.CIA_IMPACT_SUMMARY,
  size: "medium",
  order: 50, // CIA summary before individual components
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "availability-impact",
  title: WIDGET_TITLES.AVAILABILITY_IMPACT,
  component: AvailabilityImpactWidget,
  icon: WIDGET_ICONS.AVAILABILITY_IMPACT,
  size: "medium",
  order: 55, // Availability comes first in CIA
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "integrity-impact",
  title: WIDGET_TITLES.INTEGRITY_IMPACT,
  component: IntegrityImpactWidget,
  icon: WIDGET_ICONS.INTEGRITY_IMPACT,
  size: "medium",
  order: 60, // Integrity comes second in CIA
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "confidentiality-impact",
  title: WIDGET_TITLES.CONFIDENTIALITY_IMPACT,
  component: ConfidentialityImpactWidget,
  icon: WIDGET_ICONS.CONFIDENTIALITY_IMPACT,
  size: "medium",
  order: 65, // Confidentiality comes third in CIA
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

// Group 4: Technical and Visualization Widgets (order 70-89)
widgetRegistry.register({
  id: "security-visualization",
  title: WIDGET_TITLES.SECURITY_VISUALIZATION,
  component: SecurityVisualizationWidget,
  icon: WIDGET_ICONS.SECURITY_VISUALIZATION,
  size: "medium",
  order: 70, // Visualization is useful for technical overview
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "security-resources",
  title: WIDGET_TITLES.SECURITY_RESOURCES,
  component: SecurityResourcesWidget,
  icon: WIDGET_ICONS.SECURITY_RESOURCES,
  size: "medium",
  order: 75, // Resources support implementation
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

widgetRegistry.register({
  id: "technical-details",
  title: WIDGET_TITLES.TECHNICAL_DETAILS,
  component: TechnicalDetailsWidget,
  icon: WIDGET_ICONS.TECHNICAL_DETAILS,
  size: "medium", // Changed from "large" to "medium" for consistency
  order: 80, // Technical details come last in the hierarchy
  defaultProps: {
    availabilityLevel: "Moderate" as SecurityLevel,
    integrityLevel: "Moderate" as SecurityLevel,
    confidentialityLevel: "Moderate" as SecurityLevel,
  },
});

const renderWidget = (
  widgetId: string, 
  widgetProps: Record<string, any> = {},
  onSecurityLevelChange?: {
    onAvailabilityChange?: (level: SecurityLevel) => void;
    onIntegrityChange?: (level: SecurityLevel) => void;
    onConfidentialityChange?: (level: SecurityLevel) => void;
  }
) => {
  const widgetConfig = getWidgetConfig(widgetId);
  if (!widgetConfig) return null;

  const { component: Component } = widgetConfig;
  
  // Merge security level change handlers if provided
  const mergedProps = {
    ...widgetProps,
    ...(onSecurityLevelChange && {
      onAvailabilityChange: onSecurityLevelChange.onAvailabilityChange,
      onIntegrityChange: onSecurityLevelChange.onIntegrityChange,
      onConfidentialityChange: onSecurityLevelChange.onConfidentialityChange
    })
  };

  return <Component key={widgetId} {...mergedProps} />;
};

// Define a function to get the widget config
function getWidgetConfig(widgetId: string) {
  // Implement logic to get the widget config from the registry instance
  return widgetRegistry.get(widgetId);
}

export default widgetRegistry;
