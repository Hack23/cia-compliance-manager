import React from "react";
import { WIDGET_TEST_IDS } from "../../../constants/testIds";
import AvailabilityImpactWidget from "../AvailabilityImpactWidget";
import BusinessImpactAnalysisWidget from "../BusinessImpactAnalysisWidget";
import ComplianceStatusWidget from "../ComplianceStatusWidget";
import ConfidentialityImpactWidget from "../ConfidentialityImpactWidget";
import CostEstimationWidget from "../CostEstimationWidget";
import IntegrityImpactWidget from "../IntegrityImpactWidget";
import SecurityLevelWidget from "../SecurityLevelWidget";
import SecurityResourcesWidget from "../SecurityResourcesWidget";
import SecuritySummaryWidget from "../SecuritySummaryWidget";
import SecurityVisualizationWidget from "../SecurityVisualizationWidget";
import TechnicalDetailsWidget from "../TechnicalDetailsWidget";
import ValueCreationWidget from "../ValueCreationWidget";

// Type for widget registration
type WidgetRegistration = {
  key: string;
  component: React.ComponentType<any>;
  defaultProps?: Record<string, any>;
  testId: string;
};

// Type for widget props
type WidgetProps = Record<string, any>;

/**
 * Registry of available widgets with their default props and test IDs
 */
const widgetRegistry: WidgetRegistration[] = [
  {
    key: "security-level",
    component: SecurityLevelWidget,
    testId: WIDGET_TEST_IDS.SECURITY_LEVEL_WIDGET,
  },
  {
    key: "security-summary",
    component: SecuritySummaryWidget,
    testId: WIDGET_TEST_IDS.SECURITY_SUMMARY_WIDGET,
  },
  {
    key: "compliance-status",
    component: ComplianceStatusWidget,
    testId: WIDGET_TEST_IDS.COMPLIANCE_STATUS_WIDGET,
  },
  {
    key: "cost-estimation",
    component: CostEstimationWidget,
    testId: WIDGET_TEST_IDS.COST_ESTIMATION_WIDGET,
  },
  {
    key: "value-creation",
    component: ValueCreationWidget,
    testId: WIDGET_TEST_IDS.VALUE_CREATION_WIDGET,
  },
  {
    key: "security-visualization",
    component: SecurityVisualizationWidget,
    testId: WIDGET_TEST_IDS.SECURITY_VISUALIZATION_WIDGET,
  },
  {
    key: "technical-details",
    component: TechnicalDetailsWidget,
    testId: WIDGET_TEST_IDS.TECHNICAL_DETAILS_WIDGET,
  },
  {
    key: "business-impact",
    component: BusinessImpactAnalysisWidget,
    testId: WIDGET_TEST_IDS.BUSINESS_IMPACT_WIDGET,
  },
  {
    key: "confidentiality-impact",
    component: ConfidentialityImpactWidget,
    testId: WIDGET_TEST_IDS.CONFIDENTIALITY_IMPACT_WIDGET,
  },
  {
    key: "integrity-impact",
    component: IntegrityImpactWidget,
    testId: WIDGET_TEST_IDS.INTEGRITY_IMPACT_WIDGET,
  },
  {
    key: "availability-impact",
    component: AvailabilityImpactWidget,
    testId: WIDGET_TEST_IDS.AVAILABILITY_IMPACT_WIDGET,
  },
  {
    key: "security-resources",
    component: SecurityResourcesWidget,
    testId: WIDGET_TEST_IDS.SECURITY_RESOURCES_WIDGET,
  },
];

/**
 * Widget registry utility to manage and render widgets across the application
 */
const widgetRegistryUtils = {
  /**
   * Get a widget by its key
   *
   * @param key - The unique key for the widget
   * @returns The widget registration if found, or undefined
   */
  getWidget: (key: string): WidgetRegistration | undefined => {
    return widgetRegistry.find((widget) => widget.key === key);
  },

  /**
   * Render a specific widget with merged props
   *
   * @param key - The unique key for the widget
   * @param props - Props to pass to the widget
   * @returns The rendered widget component or null if widget not found
   */
  renderWidget: (key: string, props: WidgetProps = {}): React.ReactNode => {
    const widget = widgetRegistryUtils.getWidget(key);
    if (!widget) return null;

    const mergedProps = {
      ...(widget.defaultProps || {}),
      ...props,
      testId: props.testId || widget.testId,
    };

    return <widget.component {...mergedProps} key={key} />;
  },

  /**
   * Render multiple widgets based on provided keys and props
   *
   * @param keys - Array of widget keys to render, or undefined to render all
   * @param props - Props object where keys are widget keys and values are props
   * @returns Array of rendered widget components
   */
  renderWidgets: (
    keys?: string[],
    props: Record<string, WidgetProps> = {}
  ): React.ReactNode[] => {
    const widgetsToRender = keys
      ? widgetRegistry.filter((widget) => keys.includes(widget.key))
      : widgetRegistry;

    return widgetsToRender.map((widget) => {
      const widgetProps = props[widget.key] || {};
      return widgetRegistryUtils.renderWidget(widget.key, widgetProps);
    });
  },

  /**
   * Get all registered widget keys
   *
   * @returns Array of widget keys
   */
  getAllWidgetKeys: (): string[] => {
    return widgetRegistry.map((widget) => widget.key);
  },
};

export default widgetRegistryUtils;
