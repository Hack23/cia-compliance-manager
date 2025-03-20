/**
 * Service exports for CIA Compliance Manager
 *
 * ## Business Perspective
 *
 * The services module provides the core business logic for assessing security levels,
 * determining compliance status, and evaluating business impact. These services
 * encapsulate domain knowledge and calculations that drive the application. 💼
 */

// Base Service
export { BaseService } from "./BaseService";

// CIA Content Service
export { CIAContentService, createCIAContentService } from "./ciaContentService";

// Business Impact Service
export { BusinessImpactService, createBusinessImpactService } from "./businessImpactService";

// Compliance Service
export { ComplianceService, createComplianceService } from "./complianceService";
export type { ComplianceStatus } from "./complianceService";
export { ComplianceServiceAdapter, ComplianceService as ComplianceServiceStatic } from "./ComplianceServiceAdapter";

// Security Metrics Service
export { createSecurityMetricsService, SecurityMetricsService } from "./securityMetricsService";

// Security Resource Service
export {
  createSecurityResourceService, SecurityResourceService
} from "./securityResourceService";

// Technical Implementation Service
export { createTechnicalImplementationService, TechnicalImplementationService } from "./technicalImplementationService";

