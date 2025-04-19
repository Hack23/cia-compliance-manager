# CIA Compliance Manager API Documentation

This documentation provides detailed information about the CIA Compliance Manager API, classes, and components.

## Overview

The CIA Compliance Manager helps organizations assess and visualize their security posture across the three pillars of information security: **Confidentiality**, **Integrity**, and **Availability**. It provides tools for:

- Security level assessment
- Impact analysis
- Compliance evaluation
- Implementation guidance
- Business value estimation

## Core Architecture

The application follows a modular architecture organized into these key areas:

```typescript
// High-level architecture
CIA Compliance Manager
├── Core Types (CIA Triad Models)
├── Services (Security Business Logic)
├── Components
│   ├── Assessment Widgets
│   ├── Impact Analysis Widgets
│   ├── Implementation Widgets
│   └── Business Value Widgets
└── Utilities (Security Calculations)
```

## Component Catalog

The application includes various specialized components organized by category:

### Assessment Components
- **Security Level Selectors**: For choosing CIA security levels
- **Security Summary Widgets**: For displaying overall security status
- **Business Impact Analysis**: For analyzing business impact of security levels

### Impact Analysis Components
- **Confidentiality Impact**: For visualizing confidentiality impacts
- **Integrity Impact**: For visualizing integrity impacts
- **Availability Impact**: For visualizing availability impacts

### Implementation Components
- **Technical Details**: For displaying implementation considerations
- **Security Resources**: For providing security implementation guidance
- **Security Visualization**: For visualizing security relationships

### Business Value Components
- **Compliance Status**: For tracking framework compliance
- **Cost Estimation**: For estimating security implementation costs
- **Value Creation**: For displaying business value of security measures

## Services Architecture

The application is built on a service-oriented architecture:

- **Base Service**: Foundation for all services
- **CIA Content Service**: Manages security content and assessments
- **Compliance Service**: Evaluates compliance status against frameworks
- **Security Metrics Service**: Calculates security metrics and scores
- **Business Impact Service**: Analyzes business impacts of security decisions
- **Technical Implementation Service**: Provides implementation guidance
- **Security Resource Service**: Manages security resource references

## Key Types and Interfaces

The most important types to understand:

- **SecurityLevel**: The 1-5 rating for each security dimension
- **SecurityProfile**: Complete set of CIA security levels
- **BusinessImpact**: Impact assessment results
- **ComplianceStatus**: Compliance evaluation results

## Getting Started with the API

```typescript
// Example: Using the security level context
import { useSecurityLevelState } from './hooks';
import { SecurityLevelProvider } from './contexts';

function App() {
  return (
    <SecurityLevelProvider>
      <YourComponent />
    </SecurityLevelProvider>
  );
}

function YourComponent() {
  const { 
    confidentialityLevel, 
    integrityLevel, 
    availabilityLevel,
    setConfidentialityLevel 
  } = useSecurityLevelState();
  
  // Use the security levels
  return (
    <div>
      <h2>Current Security Profile</h2>
      <ul>
        <li>Confidentiality: {confidentialityLevel}</li>
        <li>Integrity: {integrityLevel}</li>
        <li>Availability: {availabilityLevel}</li>
      </ul>
      <button onClick={() => setConfidentialityLevel(5)}>
        Set Maximum Confidentiality
      </button>
    </div>
  );
}
```

## How to Use This Documentation

- **Browse by Category**: Use the left sidebar to navigate through different module categories
- **Search**: Use the search box to find specific types, functions, or components
- **Component Documentation**: See props, examples and usage guidance for each UI component
- **Service Documentation**: Explore the API methods for each service
- **Type Reference**: Review the type definitions that form the domain model

This documentation is primarily for developers working on the CIA Compliance Manager. For general usage information, please refer to the main project README.
