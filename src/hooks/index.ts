/**
 * # React Hooks
 *
 * This module provides custom React hooks for the CIA Compliance Manager.
 *
 * ## Business Perspective
 * Hooks encapsulate reusable business logic that can be shared across components,
 * ensuring consistent security assessment and presentation.
 *
 * ## Architecture Perspective
 * Hooks follow React's composition model to provide reusable stateful logic
 * without class components or complex patterns.
 *
 * ## Security Perspective
 * Hooks properly manage and validate security-related data, ensuring consistent
 * application of security controls.
 *
 * @module hooks
 */

export * from "./useCIAOptions";
export { useCIAOptions } from "./useCIAOptions";
export * from "./useLocalStorage";

