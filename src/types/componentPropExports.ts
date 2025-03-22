/**
 * # Component Props Type Exports
 *
 * This file centralizes component prop type exports to ensure they're
 * properly documented and available for type checking.
 *
 * ## Business Perspective
 * Standardized prop types ensure consistent component behavior and integration
 * across the CIA compliance visualization tools. 📝
 *
 * @packageDocumentation
 */

// Import common component prop interfaces
import { CIAComponent, SecurityLevel } from "./cia";

// Re-export from components/common
export interface BusinessImpactSectionProps {
  title: string;
  description: string;
  testId?: string;
  className?: string;
  icon?: string;
}

export interface BusinessRiskDisplayProps {
  riskLevel: string;
  description?: string;
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface CIAImpactCardProps {
  title: string;
  description: string;
  icon: string;
  value: string;
  impact?: string;
  color?: string;
  testId?: string;
}

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  testId?: string;
}

export interface KeyValuePairProps {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
  testId?: string;
}

export interface MetricsCardProps {
  title: string;
  value: string | number;
  icon?: string;
  description?: string;
  testId?: string;
  className?: string;
}

export interface RiskAssessmentProps {
  riskLevel: string;
  description?: string;
  recommendations?: string[];
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface RiskLevelBadgeProps {
  level: string;
  showIcon?: boolean;
  className?: string;
  testId?: string;
}

export interface SecurityLevelBadgeProps {
  level: SecurityLevel;
  category?: CIAComponent | string;
  showIcon?: boolean;
  colorClass?: string;
  textClass?: string;
  className?: string;
  testId?: string;
}

export interface SecurityLevelSummaryItemProps {
  label: string;
  value: SecurityLevel;
  icon?: string;
  testId?: string;
  color?: string;
  borderColor?: string;
  compact?: boolean;
}

export interface SecurityRiskScoreProps {
  score: number;
  maxScore?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
  testId?: string;
}

export interface StatusBadgeProps {
  status: string;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
  testId?: string;
}

export interface TabProps {
  label: string;
  value: string;
  isActive?: boolean;
  onClick: (value: string) => void;
  testId?: string;
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  className?: string;
  testId?: string;
}

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  className?: string;
  testId?: string;
}

export interface WidgetActionButtonProps {
  icon: string;
  onClick: () => void;
  label: string;
  testId?: string;
}

export interface WidgetActionsProps {
  actions: WidgetActionButtonProps[];
  className?: string;
  testId?: string;
}

export interface WidgetHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  actions?: WidgetActionButtonProps[];
  className?: string;
  testId?: string;
}

// Chart component props
export interface RadarChartProps {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  className?: string;
  testId?: string;
}

// Security level component props
export interface SecurityLevelSelectorProps {
  component: "availability" | "integrity" | "confidentiality";
  selectedLevel: SecurityLevel;
  onLevelChange: (level: SecurityLevel) => void;
  mode?: "horizontal" | "vertical";
  highlight?: boolean;
  compact?: boolean;
  disabled?: boolean;
  testId?: string;
}

export interface SelectionProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  label: string;
  className?: string;
  testId?: string;
}

// Performance component props
export interface SecurityLevelChangeTrackerProps {
  showPerformance?: boolean;
  children: React.ReactNode;
  testId?: string;
}

// Context props
export interface SecurityLevelContextType {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  setAvailabilityLevel: (level: SecurityLevel) => void;
  setIntegrityLevel: (level: SecurityLevel) => void;
  setConfidentialityLevel: (level: SecurityLevel) => void;
}

export interface SecurityLevelProviderProps {
  children: React.ReactNode;
  initialAvailability?: SecurityLevel;
  initialIntegrity?: SecurityLevel;
  initialConfidentiality?: SecurityLevel;
}

// Hook options
export interface UseSecurityLevelStateOptions {
  availabilityLevel?: SecurityLevel;
  integrityLevel?: SecurityLevel;
  confidentialityLevel?: SecurityLevel;
  onAvailabilityChange?: (level: SecurityLevel) => void;
  onIntegrityChange?: (level: SecurityLevel) => void;
  onConfidentialityChange?: (level: SecurityLevel) => void;
}
