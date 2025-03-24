import { SecurityLevel } from "./cia";
import { CIAComponentType } from "./cia-services";

/**
 * Type for a security resource
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
   * Resource description
   */
  description: string;

  /**
   * URL to access the resource
   */
  url?: string;

  /**
   * Resource type (e.g., Documentation, Tool, Template)
   */
  type?: string;

  /**
   * Source of the resource
   */
  source?: string;

  /**
   * Tags associated with the resource
   */
  tags?: string[];

  /**
   * CIA components this resource applies to
   */
  components?: string[];

  /**
   * Security levels this resource applies to
   */
  securityLevels?: string[];

  /**
   * Format of the resource (e.g., PDF, Website, Video)
   */
  format?: string;

  /**
   * License information
   */
  license?: string;

  /**
   * Rating (0-5)
   */
  rating?: number;

  /**
   * Date added
   */
  dateAdded?: string;

  /**
   * Implementation complexity (1-5)
   */
  complexity?: number;

  /**
   * Whether the resource is premium/paid
   */
  isPremium?: boolean;
  
  /**
   * Resource priority (1-5)
   */
  priority?: number;
  
  /**
   * Resource category for grouping
   */
  category?: string;
  
  /**
   * Relevant security levels (legacy field)
   */
  relevantLevels?: string[];
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
