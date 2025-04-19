# CIA Compliance Manager - Markdown Documentation

This documentation provides a complete API reference for the CIA Compliance Manager in Markdown format, suitable for embedding in GitHub repositories and other documentation systems.

## Key Concepts

The CIA Compliance Manager is structured around core security concepts:

- **CIA Triad**: Confidentiality, Integrity, and Availability - the three pillars of information security
- **Security Levels**: Quantified measurements (1-5) of each CIA dimension  
- **Impact Analysis**: Assessment of business impacts at different security levels
- **Compliance**: Evaluation against security frameworks and standards

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

## Integration

This Markdown documentation can be easily integrated into your own project documentation by referencing the relevant files from your documentation system.

## Index of Key Types and Interfaces

- [SecurityLevel](types/index/type-aliases/SecurityLevel.md): Core security level type
- [SecurityProfile](types/index/interfaces/SecurityProfile.md): Complete security profile
- [ComplianceStatus](types/compliance/interfaces/ComplianceStatus.md): Compliance evaluation status
- [BusinessImpact](types/businessImpact/interfaces/BusinessImpact.md): Business impact assessment
