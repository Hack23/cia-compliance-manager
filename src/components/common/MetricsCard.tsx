import React, { ReactNode } from 'react';
import { COMMON_COMPONENT_TEST_IDS } from '../../constants/testIds';

export type MetricsCardVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple";

interface MetricsCardProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Card value (main metric)
   */
  value: ReactNode;
  
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  
  /**
   * Optional label to display below the value
   */
  label?: string;
  
  /**
   * Optional trend indicator (+10%, -5%, etc.)
   */
  trend?: string;
  
  /**
   * Direction of the trend (up, down, neutral)
   */
  trendDirection?: 'up' | 'down' | 'neutral';
  
  /**
   * Optional CSS class for the card
   */
  className?: string;
  
  /**
   * Optional test ID for automated testing
   */
  testId?: string;
  
  /**
   * Optional variant for the card
   */
  variant?: MetricsCardVariant;
  
  /**
   * Optional accent color for the card
   */
  accentColor?: string;
  
  /**
   * Optional compact mode for the card
   */
  compact?: boolean;
}

/**
 * Displays a metric card with a title, value, and optional trend
 * 
 * ## Business Perspective
 * 
 * This component provides a standardized way to display key metrics
 * across security dashboards, helping executives and security teams
 * quickly identify important information and trends. 📊
 */
const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  label,
  trend,
  trendDirection = 'neutral',
  className = '',
  testId = COMMON_COMPONENT_TEST_IDS.METRICS_CARD,
  variant = "default",
  accentColor,
  compact = false,
}) => {
  // Color variants
  const variants = {
    default: {
      bg: "bg-gray-50 dark:bg-gray-800",
      text: "text-gray-800 dark:text-gray-200",
      border: "border-gray-200 dark:border-gray-700",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-900 dark:bg-opacity-20",
      text: "text-green-700 dark:text-green-300",
      border: "border-green-200 dark:border-green-800",
    },
    warning: {
      bg: "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20",
      text: "text-yellow-700 dark:text-yellow-300",
      border: "border-yellow-200 dark:border-yellow-800",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-900 dark:bg-opacity-20",
      text: "text-red-700 dark:text-red-300",
      border: "border-red-200 dark:border-red-800",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-800",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-200 dark:border-purple-800",
    },
  };

  const { bg, text, border } = variants[variant];
  const padding = compact ? "p-3" : "p-4";

  // Determine trend color and icon
  const getTrendColor = () => {
    if (trendDirection === 'up') return 'text-green-500 dark:text-green-400';
    if (trendDirection === 'down') return 'text-red-500 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };
  
  const getTrendIcon = () => {
    if (trendDirection === 'up') return '↑';
    if (trendDirection === 'down') return '↓';
    return '→';
  };

  return (
    <div
      className={`${bg} rounded-lg border ${border} ${padding} shadow-sm ${className}`}
      data-testid={testId}
      style={
        accentColor
          ? { borderLeftColor: accentColor, borderLeftWidth: "4px" }
          : undefined
      }
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </div>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      <div className={`text-xl font-bold mt-2 ${text}`}>{value}</div>
      <div className="flex items-center">
        {label && (
          <div 
            className="text-sm text-gray-500 dark:text-gray-400"
            data-testid={`${testId}-label`}
          >
            {label}
          </div>
        )}
        
        {trend && (
          <div 
            className={`ml-auto text-sm ${getTrendColor()}`}
            data-testid={`${testId}-trend`}
          >
            <span className="mr-1">{getTrendIcon()}</span>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
