/**
 * # Application Module
 *
 * This module contains the main application components that orchestrate the CIA Compliance Manager.
 *
 * ## Business Perspective
 * The application layer combines all components and services to deliver the complete
 * compliance management solution to end users, providing a cohesive security assessment tool.
 *
 * ## Architecture Perspective
 * This module follows a component-based architecture, with the main application component
 * managing state and coordinating between UI components and services.
 *
 * ## Security Perspective
 * The application implements proper state management for security levels and ensures
 * consistent application of security controls across the CIA triad.
 *
 * @module application
 */

export { default as CIAClassificationApp } from "./CIAClassificationApp";
