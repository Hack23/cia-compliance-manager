**CIA Compliance Manager Documentation v1.1.0**

***

# CIA Compliance Manager - Markdown Documentation

This documentation provides a complete API reference for the CIA Compliance Manager in Markdown format, suitable for embedding in GitHub repositories and other documentation systems.

## What is the CIA Compliance Manager?

The CIA Compliance Manager is a TypeScript/React application that helps visualize and evaluate information security posture based on the CIA triad model:

- **Confidentiality**: Protection from unauthorized access
- **Integrity**: Protection from unauthorized modification 
- **Availability**: Ensuring systems are operational when needed

Each dimension is rated on a scale of 1-5, creating a comprehensive security profile.

## Key Concepts

The application is structured around these core security concepts:

- **CIA Triad**: Confidentiality, Integrity, and Availability - the three pillars of information security
- **Security Levels**: Quantified measurements (1-5) of each CIA dimension  
- **Impact Analysis**: Assessment of business impacts at different security levels
- **Compliance**: Evaluation against security frameworks and standards
- **Risk Assessment**: Evaluation of security risks based on the CIA profile

## Module Organization

The codebase is organized into logical modules:

### Core Modules
- **Types**: Core data structures and interfaces defining the security model
- **Components**: UI building blocks and their props
- **Hooks**: State management utilities for CIA security levels
- **Services**: Business logic and data processing for security analysis
- **Utilities**: Helper functions and tools for security calculations

### Component Categories
- **Assessment Components**: For evaluating security posture
- **Impact Analysis Components**: For visualizing security impacts
- **Implementation Components**: For security implementation guidance
- **Business Value Components**: For cost/benefit analysis

## Usage Examples

### Security Level Selection

```typescript
// Security level selection
import { useSecurityLevelState } from './hooks';

function SecurityControls() {
  const { 
    confidentialityLevel, 
    setConfidentialityLevel 
  } = useSecurityLevelState();
  
  return (
    <div>
      <label>Confidentiality Level: {confidentialityLevel}</label>
      <input 
        type="range" 
        min="1" 
        max="5" 
        value={confidentialityLevel}
        onChange={(e) => setConfidentialityLevel(parseInt(e.target.value))} 
      />
    </div>
  );
}
```

### Compliance Evaluation

```typescript
// Checking compliance status
import { useComplianceService } from './hooks';

function ComplianceCheck() {
  const complianceService = useComplianceService();
  const { confidentialityLevel, integrityLevel, availabilityLevel } = useSecurityLevelState();
  
  const complianceStatus = complianceService.getComplianceStatus(
    "ISO27001", 
    { confidentiality: confidentialityLevel, integrity: integrityLevel, availability: availabilityLevel }
  );
  
  return (
    <div>
      <h3>ISO 27001 Compliance: {complianceStatus.isCompliant ? "Compliant" : "Non-Compliant"}</h3>
      <p>Compliance Score: {complianceStatus.complianceScore}%</p>
    </div>
  );
}
```

## Integration

This Markdown documentation can be easily integrated into your own project documentation by referencing the relevant files from your documentation system.

## Index of Key Types and Interfaces

- **[SecurityLevel](types/cia/type-aliases/SecurityLevel.md)**: Core security level type (1-5)
- **[SecurityProfile](types/cia/interfaces/SecurityProfile.md)**: Complete security profile
- **[ComplianceStatus](types/compliance/interfaces/ComplianceStatus.md)**: Compliance evaluation status
- **[BusinessImpact](types/businessImpact/interfaces/BusinessImpact.md)**: Business impact assessment
- **[RiskAssessment](types/widgets/interfaces/RiskAssessment.md)**: Security risk evaluation

## Core Components

- **[SecurityLevelSelector](components/securitylevel/classes/SecurityLevelSelector.md)**: For selecting security levels
- **[SecuritySummaryWidget](components/widgets/assessmentcenter/variables/SecuritySummaryWidget.md)**: For displaying security overview
- **[ComplianceStatusWidget](components/widgets/businessvalue/variables/ComplianceStatusWidget.md)**: For compliance reporting

## Services 

- **[BaseService](services/BaseService/classes/BaseService.md)**: Base service class
- **[ComplianceService](services/complianceService/classes/ComplianceService.md)**: For compliance evaluation
- **[SecurityMetricsService](services/securityMetricsService/classes/SecurityMetricsService.md)**: For security metrics calculation
