import React, { ReactNode } from "react";
import { WIDGET_ICONS } from "../../constants/appConstants";
import { APP_TEST_IDS, createDynamicTestId } from "../../constants/testIds";
import {
    availabilityOptions,
    confidentialityOptions,
    integrityOptions,
} from "../../hooks/useCIAOptions";
import { gridClasses } from "../../styles/gridStyles";
import { SecurityLevel } from "../../types/cia";
import widgetRegistry from "../../utils/widgetRegistry";
import WidgetHeader from "../common/WidgetHeader";
// Keep imports for directly included widgets
import TechnicalDetailsWidget from "../widgets/TechnicalDetailsWidget";

// Main Dashboard component props
interface DashboardProps {
  children?: ReactNode;
  useRegistry?: boolean;
  availability?: string;
  integrity?: string;
  confidentiality?: string;
  columnsSmall?: number;
  columnsMedium?: number;
  columnsLarge?: number;
  className?: string;
  compact?: boolean;
  showBorders?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  children,
  useRegistry = false,
  availability,
  integrity,
  confidentiality,
  columnsSmall = 1,
  columnsMedium = 2,
  columnsLarge = 3,
  className = "",
  compact = false,
  showBorders = true,
}) => {
  // Prepare props for business impact widgets
  const impactWidgetProps = {
    "availability-impact": {
      level: availability,
      options: availabilityOptions,
    },
    "integrity-impact": {
      level: integrity,
      options: integrityOptions,
    },
    "confidentiality-impact": {
      level: confidentiality,
      options: confidentialityOptions,
    },
  };

  // Common props for security widgets
  const securityProps = {
    securityLevel: calculateOverallLevel(
      availability,
      integrity,
      confidentiality
    ),
    availabilityLevel: availability,
    integrityLevel: integrity,
    confidentialityLevel: confidentiality,
  };

  // Props for each registered widget
  const widgetProps = {
    "security-summary": securityProps,
    "compliance-status": {
      securityLevels: {
        availabilityLevel: availability,
        integrityLevel: integrity,
        confidentialityLevel: confidentiality,
      },
    },
    "value-creation": {
      securityLevel: securityProps.securityLevel,
    },
    "cost-estimation": calculateCostProps(
      availability,
      integrity,
      confidentiality
    ),
    ...impactWidgetProps,
  };

  return (
    <div
      className={`dashboard-grid ${gridClasses} ${className}`}
      data-testid={APP_TEST_IDS.DASHBOARD_GRID}
    >
      {useRegistry
        ? // Make sure this correctly calls renderWidgets from the widget registry
          widgetRegistry.renderWidgets(undefined, widgetProps)
        : // Otherwise render children directly
          React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            return child;
          })}

      {/* Only include TechnicalDetailsWidget when not using registry and props are available */}
      {!useRegistry && availability && integrity && confidentiality && (
        <TechnicalDetailsWidget
          key="technical-details"
          availabilityLevel={availability as SecurityLevel}
          integrityLevel={integrity as SecurityLevel}
          confidentialityLevel={confidentiality as SecurityLevel}
        />
      )}
    </div>
  );
};

// Helper function to calculate overall security level
function calculateOverallLevel(
  availability?: string,
  integrity?: string,
  confidentiality?: string
): string {
  const levels = ["None", "Low", "Moderate", "High", "Very High"];
  const availabilityIndex = levels.indexOf(availability || "None");
  const integrityIndex = levels.indexOf(integrity || "None");
  const confidentialityIndex = levels.indexOf(confidentiality || "None");

  const avgIndex = Math.round(
    (availabilityIndex + integrityIndex + confidentialityIndex) / 3
  );

  return levels[avgIndex] || "None";
}

// Helper function to calculate cost props
function calculateCostProps(
  availability?: string,
  integrity?: string,
  confidentiality?: string
) {
  // Handle undefined values
  const availLevel = availability || "None";
  const intLevel = integrity || "None";
  const confLevel = confidentiality || "None";

  const totalCapex =
    (availabilityOptions[availLevel as SecurityLevel]?.capex || 0) +
    (integrityOptions[intLevel as SecurityLevel]?.capex || 0) +
    (confidentialityOptions[confLevel as SecurityLevel]?.capex || 0);

  const totalOpex =
    (availabilityOptions[availLevel as SecurityLevel]?.opex || 0) +
    (integrityOptions[intLevel as SecurityLevel]?.opex || 0) +
    (confidentialityOptions[confLevel as SecurityLevel]?.opex || 0);

  return {
    totalCapex,
    totalOpex,
    capexEstimate: `${totalCapex * 5000}`,
    opexEstimate: `${totalOpex * 2000}`,
    isSmallSolution: totalCapex <= 60,
    roi: `${Math.round(200 + totalCapex / 2)}%`,
  };
}

// DashboardWidget component for widget containers
interface DashboardWidgetProps {
  title: string;
  size?: "small" | "medium" | "large" | "full";
  children: ReactNode;
  className?: string;
  icon?: keyof typeof WIDGET_ICONS | string; // Updated to accept both keys and string emojis
  testId?: string;
  description?: string;
  headerClassName?: string;
  showHeader?: boolean;
  colSpan?: number;
  rowSpan?: number;
  actions?: ReactNode;
  headerContent?: ReactNode;
  loading?: boolean;
  error?: Error | null;
  fullHeight?: boolean;
  compact?: boolean;
  emptyState?: ReactNode;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  children,
  title,
  description,
  className = "",
  headerClassName = "",
  testId,
  showHeader = true,
  colSpan = 1,
  rowSpan = 1,
  actions,
  headerContent,
  loading = false,
  error = null,
  fullHeight = true,
  compact = false,
  emptyState,
  icon, // Now accepts both keys and direct emoji strings
}) => {
  // Map widget sizes to grid column spans
  const sizeClasses = {
    small: "widget-col-4", // 1/3 width (standard)
    medium: "widget-col-4", // 1/3 width (standard)
    large: "widget-col-6", // 1/2 width
    full: "widget-col-12", // Full width
  };

  return (
    <div
      className={`widget ${sizeClasses.medium} ${className} ${
        fullHeight ? "h-full" : ""
      }`}
      data-testid={testId || createDynamicTestId.widgetId(title)}
      role="region"
      aria-labelledby={`widget-title-${title
        ?.toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      {showHeader && (
        <WidgetHeader
          title={title}
          iconKey={icon}
          actions={actions || headerContent}
          className={headerClassName}
          testId={`${testId || createDynamicTestId.widgetId(title)}-header`}
        />
      )}

      <div className="widget-body">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">
            <div className="font-bold">Error</div>
            <div>{error.toString()}</div>
          </div>
        ) : (
          <div className="widget-content-wrapper">
            {children || emptyState || (
              <div className="text-gray-400 p-4 text-center italic">
                No content available
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
