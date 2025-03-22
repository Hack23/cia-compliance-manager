/**
 * # CIA Compliance Manager
 *
 * Core module for the CIA Compliance Manager application that provides
 * tools for assessing, implementing, and managing security controls
 * across the CIA triad.
 *
 * ## Business Perspective
 *
 * This is the main entry point for the application, providing access to all
 * components, services, hooks and utilities needed to build and maintain
 * security compliance dashboards. 🔒
 *
 * @packageDocumentation
 */

// Re-export types with namespacing to avoid conflicts
import * as Types from "./types";
export { Types };

// Re-export services with namespacing
import * as Services from "./services";
export { Services };

// Re-export components with namespacing
import * as Components from "./components";
export { Components };

// Re-export hooks with namespacing
import * as Hooks from "./hooks";
export { Hooks };

// Re-export utils with namespacing
import * as Utils from "./utils";
export { Utils };

// Export the main app directly
export { default as CIAClassificationApp } from "./application/CIAClassificationApp";

// Selectively export commonly used types without ambiguity
export type { SecurityLevel, SecurityProfile } from "./types/cia";
export type { ComplianceStatus } from "./types/cia-services";
