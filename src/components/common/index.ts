/**
 * # Common UI Components
 *
 * This module provides basic UI building blocks used throughout the application.
 *
 * ## Business Perspective
 * Common components ensure consistent UI patterns and branding across the application,
 * enhancing user experience and recognition.
 *
 * ## Architecture Perspective
 * These components form the foundation layer of the component architecture,
 * promoting reusability and maintainability.
 *
 * ## Security Perspective
 * Common components implement consistent input validation and output encoding
 * to prevent XSS and injection vulnerabilities.
 *
 * @module components/common
 */

export { default as BusinessImpactSection } from "./BusinessImpactSection";
export { default as CIAImpactCard } from "./CIAImpactCard";
export { default as KeyValuePair } from "./KeyValuePair";
export { default as MetricsCard } from "./MetricsCard";
export { default as StatusBadge } from "./StatusBadge";
export { default as ValueDisplay } from "./ValueDisplay";
export { default as WidgetContainer } from "./WidgetContainer";
export { default as WidgetHeader } from "./WidgetHeader";
