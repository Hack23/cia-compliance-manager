# GitHub Copilot Instructions for CIA Compliance Manager

## 🚨 Project Milestone Priority - v1.0 Release

**CURRENT VERSION: 0.8.4**

The primary objective is to reach version 1.0 by focusing exclusively on:
- **Completing existing widgets** - Do not create new widgets or features
- **Fixing bugs** in existing components and services
- **Improving stability** of current functionality
- **Correcting data inconsistencies** in services and data structures
- **Enhancing test coverage** for existing features
- **Optimizing performance** of current implementation

All suggestions must focus on completing and correcting existing widgets, data, and services. **Do not extend functionality or add new features.**

## Project Overview

The CIA Compliance Manager is a React TypeScript application that helps organizations assess, implement, and manage security controls across the CIA (Confidentiality, Integrity, Availability) triad. The application provides:

- Security level assessments and visualizations
- Cost estimation for security implementations
- Compliance mapping to frameworks
- Business impact analysis

## Domain Knowledge

### CIA Triad Security Levels

The application defines security levels for each component of the CIA triad:

- **Availability**:

  - None (< 90% uptime, unpredictable recovery)
  - Low (95% uptime, RTO: 24-48 hours)
  - Moderate (99% uptime, RTO: 4-8 hours)
  - High (99.9% uptime, RTO: 15-60 minutes)
  - Very High (99.99% uptime, RTO: <5 minutes)

- **Integrity**:

  - None (No validation controls)
  - Low (Manual Validation with basic checks)
  - Moderate (Automated Validation with comprehensive checks)
  - High (Cryptographic Verification with hash validation)
  - Very High (Distributed Ledger/Blockchain Validation)

- **Confidentiality**:
  - None (No access controls)
  - Low (Basic access control with minimal encryption)
  - Moderate (Standard encryption with RBAC)
  - High (E2E encryption with MFA and monitoring)
  - Very High (Military-grade encryption with zero-trust architecture)

### Business Impact Analysis

Security measures are evaluated across multiple business dimensions:

- **Financial Impact**: Revenue loss, expected loss value, ROI calculations
- **Operational Impact**: Mean time to recover (MTTR), recovery time objective (RTO), recovery point objective (RPO)
- **Reputational Impact**: Customer trust erosion, brand damage assessment
- **Regulatory Impact**: Compliance violations, legal consequences, framework alignment
- **Strategic Impact**: Long-term business effects, market positioning, competitive advantage

### Compliance Frameworks

The system maps security controls to various compliance frameworks:

- NIST 800-53 Rev. 5 (Security and Privacy Controls)
- ISO 27001:2022 (Information Security Management)
- NIST CSF 2.0 (Cybersecurity Framework)
- GDPR (General Data Protection Regulation)
- HIPAA (Health Insurance Portability and Accountability Act)
- SOC2 (Service Organization Control)
- PCI DSS (Payment Card Industry Data Security Standard)

## Core Types and Interfaces

The application uses a comprehensive type system to represent security concepts:

```typescript
// Key type representing security levels
type SecurityLevel = "None" | "Low" | "Moderate" | "High" | "Very High";

// Business impact details structure
interface BusinessImpactDetail {
  description?: string;
  riskLevel?: string;
  annualRevenueLoss?: string;
  meanTimeToRecover?: string;
  complianceViolations?: string[];
}

// Security level details
interface CIADetails {
  description?: string;
  impact?: string;
  technical?: string;
  businessImpact?: string;
  uptime?: string;
  mttr?: string;
  rto?: string;
  rpo?: string;
  recommendations?: string[];
  // ... other properties
}

// Calculate the overall security level (example utility function)
function calculateOverallSecurityLevel(
  availabilityLevel: SecurityLevel,
  integrityLevel: SecurityLevel,
  confidentialityLevel: SecurityLevel
): SecurityLevel {
  // Implementation details...
}
```

## Technology Stack

- React 19+ (using latest React features)
- TypeScript 5.8+
- Vite 6+ for build tooling
- Vitest for unit testing
- TailwindCSS 4+ for styling
- Chart.js for visualizations

## Core Principles

When making suggestions, please adhere to the following principles:

### 1. Strict Typing

- Always use explicit TypeScript types, avoid `any` type
- Prefer interfaces for object types that can be extended
- Use type unions instead of generic types where appropriate
- Leverage TypeScript's utility types when applicable (Pick, Omit, Partial, etc.)
- Always define return types for functions
- Use type guards for domain-specific concepts

```typescript
// ✅ GOOD
interface SecurityLevel {
  level: string;
  value: number;
  description: string;
}

function calculateSecurityScore(levels: SecurityLevel[]): number {
  // implementation
}

// Type guard example for security levels
function isSecurityLevel(value: unknown): value is SecurityLevel {
  return (
    typeof value === "string" &&
    ["None", "Low", "Moderate", "High", "Very High"].includes(value as string)
  );
}

// ❌ BAD
function calculateSecurityScore(levels: any): any {
  // implementation
}
```

### 2. Business-Oriented Code Organization

- Group code by CIA triad components when appropriate (Confidentiality, Integrity, Availability)
- Use domain-specific naming that reflects security concepts and business impact
- Structure business impact calculations to reflect financial, operational, and regulatory considerations
- Implement type guards for domain-specific concepts (e.g., `isSecurityLevel`, `isComplianceFramework`)
- Add business perspective comments to help understand the business purpose of each component
- Use utility functions for core security calculations (e.g., `calculateRiskLevel`, `getSecurityLevelValue`)

### 3. Code Improvement Strategy

- **Focus exclusively on completing and fixing existing files** - do not create new ones
- **Prioritize bug fixes and stability improvements** in current widgets
- Make the minimal necessary changes to ensure features work properly
- Maintain backward compatibility of interfaces and APIs
- Focus on reaching feature-completeness of existing components
- Improve error handling and edge cases in existing code
- Add proper JSDoc comments for public APIs where missing
- Identify and address inconsistencies between components and data services
- Follow the existing patterns and naming conventions exactly

**For v1.0 release: Focus on correctness, stability, and completing what exists - not adding new features.**

### 4. React 19 Best Practices

- Use function components with hooks
- Leverage React's built-in memoization (useMemo, useCallback)
- Use the new React 19 features appropriately:
  - React compiler optimizations
  - Document metadata (`<title>`, `<meta>`)
  - Actions API when appropriate
  - New asset loading optimizations
  - Error boundary hooks

```typescript
// ✅ GOOD - Using React 19 patterns
import { useMemo } from "react";

interface SecurityChartProps {
  data: SecurityData[];
  options: ChartOptions;
}

function SecurityChart({ data, options }: SecurityChartProps): JSX.Element {
  const processedData = useMemo(() => {
    return processData(data);
  }, [data]);

  return <ChartComponent data={processedData} options={options} />;
}
```

### 5. Testing Requirements

- Focus on tests for existing functionality - prioritize coverage of critical paths
- When fixing bugs, add tests that would have caught the bug
- Ensure all current widgets have appropriate unit tests
- Mock external dependencies with proper TypeScript typing
- Verify business logic implementations match specifications
- Test edge cases and error handling scenarios in existing code

```typescript
// ✅ GOOD - Using vi.hoisted for test mocks
const mockSecurityLevels = vi.hoisted(() => ({
  None: {
    capex: 0,
    opex: 0,
    description: "No security controls implemented",
  },
  Low: {
    capex: 5,
    opex: 2,
    description: "Basic security controls",
  },
  Moderate: {
    capex: 10,
    opex: 5,
    description: "Standard security controls",
  },
  High: {
    capex: 15,
    opex: 8,
    description: "Advanced security controls",
  },
  "Very High": {
    capex: 20,
    opex: 10,
    description: "Maximum security controls",
  },
}));

vi.mock("../hooks/useCIAOptions", () => ({
  __esModule: true,
  useCIAOptions: () => ({
    availabilityOptions: mockSecurityLevels,
    integrityOptions: mockSecurityLevels,
    confidentialityOptions: mockSecurityLevels,
    ROI_ESTIMATES: {
      NONE: { returnRate: "0%", description: "No ROI" },
      LOW: { returnRate: "50%", description: "Low ROI" },
      MODERATE: { returnRate: "200%", description: "Moderate ROI" },
      HIGH: { returnRate: "350%", description: "High ROI" },
      VERY_HIGH: { returnRate: "500%", description: "Very high ROI" },
    },
  }),
  // Export constants directly as well
  availabilityOptions: mockSecurityLevels,
  integrityOptions: mockSecurityLevels,
  confidentialityOptions: mockSecurityLevels,
}));
```

### 6. State Management

- Use React Context API for global state
- Leverage useMemo and useCallback for performance optimization
- Use immutable state patterns
- Type all state explicitly
- Organize state by domain concerns (security levels, compliance status, business impact)
- Consider the future context-aware architecture when designing state
- Use custom hooks like useCIAOptions to access domain data

### 7. Component Structure

- Use consistent component structures
- Separate business logic from presentation
- Implement prop validation with TypeScript interfaces
- Use named exports for components
- Add business perspective comments to explain the business purpose of complex components
- Follow the widget structure for dashboard components
- Reference component test IDs from test-id-analysis.md

### 8. UI/UX Design Principles

- Design components with user-centered approach focusing on security officer workflows
- Follow accessibility standards (WCAG 2.1 AA) for all interactive elements
- Maintain consistent visual hierarchy that reflects security severity levels
- Use color psychology appropriate to security contexts (red for critical issues, amber for warnings, green for compliant states)
- Implement progressive disclosure for complex security information
- Design with responsive layouts that work across device sizes
- Ensure clear feedback for user actions especially for security-critical operations
- Use data visualization best practices for security metrics and compliance status
- Incorporate appropriate micro-interactions to improve user engagement
- Provide contextual help and tooltips for security terminology

```tsx
// ✅ GOOD - User-centered security interface design
import React from "react";
import { Tooltip } from "../common/Tooltip";

interface ComplianceIndicatorProps {
  status: "compliant" | "partial" | "non-compliant";
  framework: string;
  details: string;
  onViewDetails: () => void;
}

/**
 * Displays compliance status with visual indicators and contextual help
 *
 * ## UX Perspective
 *
 * This component uses color, icons, and progressive disclosure to help
 * users quickly understand compliance status while providing access
 * to deeper details when needed. The tooltip provides context without
 * cluttering the interface. 🎨
 */
export function ComplianceIndicator({
  status,
  framework,
  details,
  onViewDetails,
}: ComplianceIndicatorProps) {
  // Status-dependent styling
  const statusStyles = {
    compliant: "bg-green-100 text-green-800 border-green-500",
    partial: "bg-yellow-100 text-yellow-800 border-yellow-500",
    "non-compliant": "bg-red-100 text-red-800 border-red-500",
  };

  return (
    <div
      className={`p-3 rounded-md border-l-4 ${statusStyles[status]}`}
      data-testid={`compliance-${framework}-status`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <StatusIcon status={status} />
          <h4 className="ml-2 font-medium">{framework}</h4>
          <Tooltip content="Compliance status based on selected security levels">
            <span className="ml-1 text-gray-500">ⓘ</span>
          </Tooltip>
        </div>
        <button
          onClick={onViewDetails}
          className="text-sm underline"
          aria-label={`View details for ${framework} compliance`}
        >
          View details
        </button>
      </div>
    </div>
  );
}
```

### 9. Business Development Perspective

- Align code changes with measurable business value and ROI
- Design features with clear stakeholder benefits (CISO, security teams, compliance officers)
- Structure components to support upsell opportunities for premium features
- Enable data collection for business intelligence with appropriate privacy controls
- Consider integration points with enterprise systems (SIEM, GRC platforms)
- Build for scalability across different business sizes and security maturity levels
- Include value proposition elements in feature documentation
- Design for both free open-source and potential commercial offerings
- Implement features with demonstrable compliance cost reduction
- Support multi-tenant capabilities for potential SaaS deployment

```typescript
// ✅ GOOD - Business value articulation in features
import { SecurityLevel } from "../types/cia";

interface ROICalculationOptions {
  availabilityLevel: SecurityLevel;
  integrityLevel: SecurityLevel;
  confidentialityLevel: SecurityLevel;
  organizationSize: "small" | "medium" | "large" | "enterprise";
  industryRiskFactor: number; // 1-10 scale
  implementationTimeframe: number; // months
}

/**
 * Calculates return on investment for security implementations
 *
 * ## Business Perspective
 *
 * This function helps organizations quantify the business value of
 * security investments by calculating expected ROI based on industry
 * benchmarks, organization size, and implementation timeframes.
 *
 * The calculations support executive decision-making by demonstrating
 * the financial benefits of appropriate security controls, which is
 * essential for budget approvals and resource allocation. 💼
 *
 * It also serves as a potential upsell opportunity for premium
 * features by showing quantifiable value. 📈
 */
export function calculateSecurityROI({
  availabilityLevel,
  integrityLevel,
  confidentialityLevel,
  organizationSize,
  industryRiskFactor,
  implementationTimeframe,
}: ROICalculationOptions): {
  annualSavings: number;
  breachRiskReduction: number;
  paybackPeriod: number;
  complianceCostReduction: number;
  threeYearROI: number;
} {
  // Implementation details...

  return {
    annualSavings,
    breachRiskReduction,
    paybackPeriod,
    complianceCostReduction,
    threeYearROI,
  };
}
```

## Architectural Considerations

### Current Architecture

The application uses a modular React architecture:

- React Component Library for UI
- State Management for security profiles
- Business Impact Analysis calculations
- Compliance Mapping to frameworks
- Cost Estimation for implementations
- Widget-based dashboard components

### Future Evolution

Consider these future directions when making code changes:

- Context-Aware Security (industry, size, regulatory adaptation)
- Business Impact Intelligence (quantifiable risk, operational impact)
- Integration Ecosystem (security tools, GRC platforms, SIEM/SOAR)
- Machine Learning Enhancement (recommendation engine, anomaly detection)
- DevSecOps Integration (CI/CD hooks, security as code)
- Decision Support Systems (what-if analysis, scenario modeling)

## File Organization Guidelines

- Group related components in the same directory
- Keep utilities separate from components
- Place tests alongside the files they test
- Follow the existing project structure
- Organize by business domain when appropriate
- Use standard directory structure (components, hooks, services, types, utils)

## Business Context Documentation

- Add JSDoc comments that explain business purpose, not just technical function
- Document how components relate to CIA security aspects
- Explain business impact calculations and their significance
- Document compliance mapping logic and framework requirements
- Add "Business Perspective" comment blocks to explain business context
- Use emoji labeling for different business perspectives (💼 Business, 🔒 Security, 📋 Compliance)

```typescript
/**
 * Core CIA types used throughout the application
 *
 * ## Business Perspective
 *
 * ### Business Impact
 * The types defined in this file are crucial for representing the core concepts
 * of the CIA triad. They are used throughout the application to ensure consistent
 * handling of security levels and impacts. 💼
 *
 * ### Compliance
 * By defining clear and consistent types for security levels and impacts,
 * this file helps the application meet various compliance requirements. 📋
 *
 * ### Risk Management
 * The types in this file play a key role in identifying and mitigating potential
 * risks by providing a structured way to represent and analyze security impacts. ⚠️
 */
```

## Performance Considerations

- Minimize re-renders using proper dependency arrays with hooks
- Use proper memoization for expensive calculations
- Consider code splitting for large components
- Optimize business impact and compliance calculations that may become computationally intensive
- Use virtualization for large data sets
- Implement proper code chunking in build configurations

## Examples

### Component Example with Business Context

```tsx
// ✅ GOOD
import React, { useMemo } from "react";
import { SecurityLevel } from "../types/cia";

interface SecurityWidgetProps {
  level: SecurityLevel;
  score: number;
  onLevelChange: (level: SecurityLevel) => void;
}

/**
 * Displays a security widget with configurable level and score
 *
 * @param props - The component props
 * @returns A React component
 *
 * ## Business Perspective
 *
 * This widget helps security officers visualize the current security level
 * and its impact score. The color-coding provides immediate feedback on
 * whether the security posture meets organizational requirements. 💼
 *
 * The risk level visualization supports compliance reporting requirements
 * by clearly indicating the current status against defined thresholds. 📋
 */
export function SecurityWidget({
  level,
  score,
  onLevelChange,
}: SecurityWidgetProps): JSX.Element {
  const colorClass = useMemo(() => {
    return score > 80
      ? "text-green-500" // High compliance
      : score > 50
      ? "text-yellow-500" // Moderate compliance
      : "text-red-500"; // Low compliance - requires attention
  }, [score]);

  // Calculate risk level based on security level
  const riskLevel = useMemo(() => {
    const levelValues = {
      None: "Critical",
      Low: "High",
      Moderate: "Medium",
      High: "Low",
      "Very High": "Minimal",
    };
    return levelValues[level] || "Unknown";
  }, [level]);

  return (
    <div className="p-4 border rounded shadow-sm" data-testid="security-widget">
      <h3 className={colorClass} data-testid="security-level-display">
        Security Level: {level}
      </h3>
      <p data-testid="security-score">Score: {score}</p>
      <p data-testid="risk-level">Risk Level: {riskLevel}</p>
      <button
        onClick={() => onLevelChange("High")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        aria-label="Upgrade security level"
        data-testid="upgrade-security-button"
      >
        Upgrade
      </button>
    </div>
  );
}
```

### Hook Example with Business Logic

```tsx
// ✅ GOOD
import { useState, useEffect, useCallback } from "react";
import { SecurityLevel, getSecurityLevelValue } from "../types/cia";

interface SecurityLevelDetails {
  name: SecurityLevel;
  value: number;
  description: string;
}

interface UseSecurityLevelsOptions {
  initialLevel?: SecurityLevel;
  onChange?: (level: SecurityLevelDetails) => void;
}

/**
 * Hook for managing security levels with business impact awareness
 *
 * @param options - Configuration options
 * @returns Security level state and management functions
 *
 * ## Business Perspective
 *
 * This hook centralizes security level management and determines whether
 * the current level meets high security requirements (value >= 3).
 * Organizations use this to evaluate if their security controls satisfy
 * regulatory requirements for sensitive data handling. 🔒
 *
 * The isHighSecurity flag is particularly important for GDPR, HIPAA, and
 * financial regulations compliance where high security is mandated. 📋
 */
export function useSecurityLevels({
  initialLevel = "Moderate" as SecurityLevel,
  onChange,
}: UseSecurityLevelsOptions = {}): {
  level: SecurityLevelDetails;
  setLevel: (level: SecurityLevel) => void;
  isHighSecurity: boolean;
  isMinimalRisk: boolean;
} {
  const [level, setLevelState] = useState<SecurityLevelDetails>({
    name: initialLevel,
    value: getSecurityLevelValue(initialLevel),
    description: getLevelDescription(initialLevel),
  });

  const setLevel = useCallback(
    (newLevel: SecurityLevel) => {
      const securityLevel: SecurityLevelDetails = {
        name: newLevel,
        value: getSecurityLevelValue(newLevel),
        description: getLevelDescription(newLevel),
      };
      setLevelState(securityLevel);
      onChange?.(securityLevel);
    },
    [onChange]
  );

  // Business rule: High security is defined as level value >= 3
  const isHighSecurity = level.value >= 3;

  // Business rule: Minimal risk is achieved only at Very High security
  const isMinimalRisk = level.value === 4;

  // Initialize with passed level
  useEffect(() => {
    if (initialLevel !== level.name) {
      setLevel(initialLevel);
    }
  }, [initialLevel, level.name, setLevel]);

  return {
    level,
    setLevel,
    isHighSecurity,
    isMinimalRisk,
  };
}

// Helper function to get description for a security level
function getLevelDescription(level: SecurityLevel): string {
  const descriptions: Record<SecurityLevel, string> = {
    None: "No security controls implemented",
    Low: "Basic security controls with minimal protection",
    Moderate: "Standard security controls with adequate protection",
    High: "Advanced security controls with strong protection",
    "Very High": "Maximum security controls with comprehensive protection",
  };

  return descriptions[level] || "Unknown security level";
}
```

### Service Example with Business Logic

```typescript
// ✅ GOOD
import { SecurityLevel } from "../types/cia";

interface ComplianceStatus {
  compliantFrameworks: string[];
  partiallyCompliantFrameworks: string[];
  nonCompliantFrameworks: string[];
  remediationSteps?: string[];
}

/**
 * Service for evaluating compliance status based on security levels
 *
 * ## Business Perspective
 *
 * This service maps CIA security levels to compliance frameworks, helping
 * organizations understand their regulatory posture and identify gaps that
 * need addressing. 📋
 *
 * The getComplianceStatus function is critical for audit preparation and
 * provides actionable remediation steps for compliance shortfalls. 💼
 */
export class ComplianceService {
  /**
   * Evaluates compliance status based on current security levels
   *
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @returns Compliance status with framework mapping and remediation steps
   */
  public static getComplianceStatus(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): ComplianceStatus {
    // Implementation details...

    // Generate remediation steps based on compliance gaps
    const remediationSteps = generateRemediationSteps(
      partiallyCompliantFrameworks,
      nonCompliantFrameworks
    );

    return {
      compliantFrameworks,
      partiallyCompliantFrameworks,
      nonCompliantFrameworks,
      remediationSteps,
    };
  }

  /**
   * Calculates the business impact level based on security levels
   *
   * @param availabilityLevel - Current availability security level
   * @param integrityLevel - Current integrity security level
   * @param confidentialityLevel - Current confidentiality security level
   * @returns The calculated business impact level
   */
  public static calculateBusinessImpactLevel(
    availabilityLevel: SecurityLevel,
    integrityLevel: SecurityLevel,
    confidentialityLevel: SecurityLevel
  ): SecurityLevel {
    // Implementation details...
    return calculatedImpactLevel;
  }
}

// Helper function to generate remediation steps
function generateRemediationSteps(
  partiallyCompliantFrameworks: string[],
  nonCompliantFrameworks: string[]
): string[] {
  const steps: string[] = [];

  // For each framework, add specific remediation steps
  if (nonCompliantFrameworks.includes("GDPR")) {
    steps.push("Implement data protection impact assessments");
    steps.push("Establish data subject rights procedures");
  }

  if (nonCompliantFrameworks.includes("HIPAA")) {
    steps.push("Develop PHI handling procedures");
    steps.push("Implement breach notification process");
  }

  return steps;
}
```

Remember: Focus on improving existing code rather than creating new files, maintain strict typing, and follow React 19 best practices while considering the business context of security and compliance management.
