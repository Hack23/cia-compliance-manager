/**
 * # Component Library
 *
 * This module provides React components for building the CIA Compliance Manager UI.
 *
 * ## Business Perspective
 * These components implement the visual representation of the security compliance
 * dashboard, allowing stakeholders to make informed decisions about security investments.
 *
 * ## Architecture Perspective
 * Components are organized by functional area and follow a layered architecture pattern,
 * with common components at the base and specialized widgets building upon them.
 *
 * ## Security Perspective
 * UI components implement visual security indicators and follow secure coding practices
 * to prevent XSS and ensure proper data validation.
 *
 * @module components
 */

// Re-export from subdirectories
export * from "./charts";
export * from "./common";
export * from "./dashboard";
export * from "./securitylevel";
export * from "./widgets";
