import { SecurityLevel } from "./cia";
import { CIAComponentType } from "./cia-services";

/**
 * Security resource type definitions
 */

/**
 * Security resource interface
 */
export interface SecurityResource {
  /**
   * Resource ID
   */
  id: string;

  /**
   * Resource title
   */
  title: string;

  /**
   * Resource URL
   */
  url: string;

  /**
   * Resource description
   */
  description?: string;

  /**
   * Resource type or category
   */
  type?: string;

  /**
   * Resource tags
   */
  tags?: string[];

  /**
   * CIA component relevance
   */
  component?: "availability" | "integrity" | "confidentiality" | "general";

  /**
   * Security level relevance
   */
  level?: string;

  /**
   * Resource source/provider
   */
  source?: string;

  /**
   * Resource category
   */
  category?: string;

  /**
   * Resource priority/relevance score (0-100)
   */
  priority?: number;

  /**
   * Security levels this resource applies to
   */
  securityLevels?: string[];

  /**
   * Components this resource applies to (multiple possible)
   */
  components?: string[];

  /**
   * Levels this resource is relevant for
   */
  relevantLevels?: string[];

  /**
   * Format of the resource (e.g., PDF, Website, Video)
   */
  format?: string;

  /**
   * Resource relevance score
   */
  relevance?: number;

  /**
   * Implementation complexity (1-5)
   */
  complexity?: number;

  /**
   * Whether the resource is premium/paid
   */
  isPremium?: boolean;
}

/**
 * Filter options for security resources
 */
export interface SecurityResourceFilter {
  /**
   * Filter by CIA component
   */
  component?: CIAComponentType | string;

  /**
   * Filter by security level
   */
  securityLevel?: SecurityLevel | string;

  /**
   * Filter by resource type (Documentation, Tool, etc.)
   */
  type?: string;

  /**
   * Text search query
   */
  searchQuery?: string;

  /**
   * Filter by tags
   */
  tags?: string[];

  /**
   * Whether to include premium resources
   */
  includePremium?: boolean;

  /**
   * Maximum complexity level (1-5)
   */
  maxComplexity?: number;

  /**
   * Minimum rating (0-5)
   */
  minRating?: number;
}

/**
 * Type for a security resource category
 */
export interface ResourceCategory {
  /**
   * Category identifier
   */
  id: string;

  /**
   * Category name
   */
  name: string;

  /**
   * Category description
   */
  description: string;

  /**
   * Category icon
   */
  icon?: string;
}

/**
 * Enhanced security resource with additional properties for internal use
 */
export interface EnhancedSecurityResource extends SecurityResource {
  /**
   * Relevance score for sorting purposes (0-100)
   */
  relevance?: number;

  /**
   * Computed score based on match criteria
   */
  score?: number;
}
