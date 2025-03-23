import { SecurityLevel } from "./cia";

/**
 * Filter options for security resources
 */
export interface SecurityResourceFilter {
  /**
   * Filter by CIA component
   */
  component?:
    | "availability"
    | "integrity"
    | "confidentiality"
    | "general"
    | "all";

  /**
   * Filter by security level
   */
  securityLevel?: SecurityLevel;

  /**
   * Filter by resource type
   */
  type?: string;

  /**
   * Search query text
   */
  searchQuery?: string;

  /**
   * Filter by tags
   */
  tags?: string[];
}

/**
 * A security resource with metadata
 */
export interface SecurityResource {
  /**
   * Unique identifier for the resource
   */
  id: string;

  /**
   * Resource title
   */
  title: string;

  /**
   * Description of the resource
   */
  description: string;

  /**
   * URL to the resource
   */
  url: string;

  /**
   * Resource type (component or general)
   */
  type: "availability" | "integrity" | "confidentiality" | "general";

  /**
   * Security levels this resource is relevant for
   */
  relevantLevels?: SecurityLevel[];

  /**
   * Components this resource is relevant for
   */
  components?: string[];

  /**
   * Security levels in string format (needed for backward compatibility)
   */
  securityLevels?: string[];

  /**
   * Tags for categorization
   */
  tags?: string[];

  /**
   * Priority for sorting (higher numbers show first)
   */
  priority?: number;

  /**
   * Score for internal sorting (used by getRecommendedResources)
   */
  score?: number;

  /**
   * Resource category for grouping
   */
  category?: string;

  /**
   * Source of the resource (e.g., organization, author)
   */
  source?: string;
}
