// New file to explicitly export types from service modules

/**
 * Types used by the CIA Content Service
 * @packageDocumentation
 */

// This file aggregates service-related types. Add new types here if needed.

// Re-export types from ciaContentService
export interface ComponentTechnicalDetails {
  description: string;
  implementationSteps: string[];
  effort: {
    development: string;
    maintenance: string;
    expertise: string;
  };
}
