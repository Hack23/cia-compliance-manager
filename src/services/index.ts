/**
 * # Application Services
 *
 * This module provides services that implement core business logic and data access.
 *
 * ## Business Perspective
 * Services encapsulate the domain logic for compliance management and security
 * assessment, providing a reusable API for UI components.
 *
 * ## Architecture Perspective
 * The service layer follows a domain-driven design approach, separating business
 * logic from presentation concerns.
 *
 * ## Security Perspective
 * Services implement consistent security assessment logic and maintain the integrity
 * of security control recommendations across the application.
 *
 * @module services
 */

export { default as ciaContentService } from "./ciaContentService";
