# CIA Compliance Manager API Documentation

This documentation provides detailed information about the CIA Compliance Manager API, classes, and components.

## Core Modules

- **Application**: Main application components and entry points
- **Components**: UI components for security visualization and management
- **Services**: Business logic and data services for security assessment
- **Hooks**: React hooks for state management and data access
- **Utils**: Utility functions for security calculations and formatting
- **Types**: Core type definitions and interfaces

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
}
```

## API Usage

This documentation is primarily for developers working on the CIA Compliance Manager. For general usage information, please refer to the main project README.
