# 📊 CIA Compliance Manager Data Model

This document provides a comprehensive view of the current data model used in the CIA Compliance Manager. It outlines the key data structures, relationships, and organization that power the security assessment, business impact analysis, and compliance mapping functionalities.

## 📚 Related Architecture Documentation

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | 🏛️ Architecture | C4 model showing current system structure |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🏛️ Architecture | Vision for context-aware platform         |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 📊 Data         | Enhanced context-aware data architecture  |
| **[State Diagrams](STATEDIAGRAM.md)**               | 🔄 Behavior     | Current system state transitions          |
| **[Process Flowcharts](FLOWCHART.md)**              | 🔄 Process      | Current security workflows                |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | Current system component relationships    |
| **[CI/CD Workflows](WORKFLOWS.md)**                 | 🔧 DevOps       | Current automation processes              |

</div>

## 🧩 Core Data Model Overview

The CIA Compliance Manager's data model revolves around three primary domains:

```mermaid
erDiagram
    SecurityAssessment {
        object confidentiality
        object integrity
        object availability
        number securityScore
    }
    
    BusinessImpact {
        object financialImpact
        object operationalImpact
        object reputationalImpact
        object strategicImpact
    }
    
    ComplianceMapping {
        array frameworks
        object mappingStatus
        object gapAnalysis
    }
    
    SecurityAssessment ||--|| BusinessImpact : "influences"
    SecurityAssessment ||--|| ComplianceMapping : "maps to"
```

## 🔒 CIA Triad Data Model

**🔧 Technical Focus:** Illustrates the structure of the CIA Triad security levels and their implementation in the system.

**🔒 Security Focus:** Shows how security levels are defined, categorized, and used for security posture assessment.

```mermaid
classDiagram
    class CIADetails {
        +string level
        +string description
        +string impact
        +string technical
        +string businessImpact
        +number capex
        +number opex
        +string[] recommendations
    }
    
    class ConfidentialityLevel {
        +CIADetails level1
        +CIADetails level2
        +CIADetails level3
        +CIADetails level4
        +CIADetails level5
    }
    
    class IntegrityLevel {
        +CIADetails level1
        +CIADetails level2
        +CIADetails level3
        +CIADetails level4
        +CIADetails level5
    }
    
    class AvailabilityLevel {
        +CIADetails level1
        +CIADetails level2
        +CIADetails level3
        +CIADetails level4
        +CIADetails level5
    }
    
    class SecurityProfile {
        +string confidentialityLevel
        +string integrityLevel
        +string availabilityLevel
        +calculateSecurityScore() number
        +getRecommendations() Recommendation[]
    }

    ConfidentialityLevel "1" *-- "5" CIADetails
    IntegrityLevel "1" *-- "5" CIADetails
    AvailabilityLevel "1" *-- "5" CIADetails
    SecurityProfile --> "1" ConfidentialityLevel : uses
    SecurityProfile --> "1" IntegrityLevel : uses
    SecurityProfile --> "1" AvailabilityLevel : uses
```

### 📊 Security Level Data Structure

The core data structures for the CIA triad components follow a consistent pattern:

```mermaid
classDiagram
    class CIADetails {
        +string level
        +string description
        +string impact
        +string technical
        +string businessImpact
        +number capex
        +number opex
        +string[] recommendations
    }
```

| Property         | Type       | Description                                               | Example                                                  |
|------------------|------------|-----------------------------------------------------------|----------------------------------------------------------|
| 🏷️ level         | string     | Identifier for the security level                         | "Level 1", "Level 2", etc.                               |
| 📝 description   | string     | Detailed description of the security level                | "Basic protection for non-sensitive data"                 |
| 💥 impact        | string     | Impact of implementing this security level                | "Minimal protection against common threats"               |
| 🔧 technical     | string     | Technical aspects of implementation                       | "Simple access controls and basic encryption"            |
| 💼 businessImpact| string     | Business considerations for this level                    | "Suitable for low-value, public information"              |
| 💰 capex         | number     | Capital expenditure required                              | 5000                                                     |
| 💸 opex          | number     | Operational expenditure required                          | 1000                                                     |
| 📋 recommendations| string[]  | List of recommended controls and actions                   | ["Implement basic access controls", "Train users"]       |

## 💼 Business Impact Data Model

**💰 Financial Focus:** Illustrates the structure of business impact data used for ROI calculations and financial projections.

**📊 Analysis Focus:** Shows how business impacts are categorized and calculated across different dimensions.

```mermaid
classDiagram
    class BusinessImpact {
        +FinancialImpact financial
        +OperationalImpact operational
        +ReputationalImpact reputational
        +StrategicImpact strategic
        +calculateOverallImpact() number
        +generateImpactReport() Report
    }
    
    class FinancialImpact {
        +string description
        +string riskLevel
        +string annualRevenueLoss
        +number expectedLossValue
    }
    
    class OperationalImpact {
        +string description
        +string riskLevel
        +string meanTimeToRecover
        +number productivityImpact
    }
    
    class ReputationalImpact {
        +string description
        +string riskLevel
        +string brandDamage
        +string customerTrust
    }
    
    class StrategicImpact {
        +string description
        +string riskLevel
        +string marketPosition
        +string competitiveAdvantage
    }
    
    class ROIEstimates {
        +number expectedLoss
        +number implementationCost
        +number mitigatedRisk
        +number returnOnInvestment
        +calculateROI() number
    }

    BusinessImpact *-- FinancialImpact
    BusinessImpact *-- OperationalImpact
    BusinessImpact *-- ReputationalImpact
    BusinessImpact *-- StrategicImpact
    BusinessImpact --> ROIEstimates
```

### 💰 Financial Impact Structure

```mermaid
classDiagram
    class FinancialImpact {
        +string description
        +string riskLevel
        +string annualRevenueLoss
        +number expectedLossValue
    }
    
    class RiskImpact {
        +string levelName
        +string description
        +number lossPercentage
        +calculateExpectedLoss(number revenue) number
    }
    
    class ROIEstimates {
        +number level1_5
        +number level2_5
        +number level3_5
        +number level4_5
        +number level5_5
    }

    FinancialImpact --> RiskImpact
    FinancialImpact --> ROIEstimates
```

## 🔄 Value Creation Data Model

**💼 Business Focus:** Shows the data structures used to calculate and demonstrate value creation from security investments.

**📊 ROI Focus:** Illustrates how ROI and business value are calculated from security implementations.

```mermaid
classDiagram
    class ValueCreation {
        +string description
        +string valueDriver
        +string[] benefits
        +string[] metrics
        +calculateValueMetric() number
    }
    
    class SecurityValueDriver {
        +string name
        +string description
        +string[] metrics
        +ValueCategory category
    }
    
    class ValueCategory {
        +string name
        +string description
        +number weightFactor
    }
    
    ValueCreation --> SecurityValueDriver
    SecurityValueDriver --> ValueCategory
```

## 📋 Compliance Mapping Data Model

**🔒 Security Focus:** Illustrates how security controls are mapped to compliance frameworks.

**📋 Regulatory Focus:** Shows the data structures used for compliance tracking and gap analysis.

```mermaid
classDiagram
    class ComplianceMapping {
        +string frameworkName
        +ControlMapping[] mappings
        +calculateComplianceScore() number
        +identifyGaps() ComplianceGap[]
    }
    
    class ControlMapping {
        +string controlId
        +string controlName
        +string description
        +string[] securityLevels
        +boolean implemented
    }
    
    class ComplianceFramework {
        +string name
        +string version
        +string description
        +FrameworkControl[] controls
    }
    
    class FrameworkControl {
        +string controlId
        +string name
        +string description
        +string domain
        +string category
    }
    
    class ComplianceGap {
        +string controlId
        +string description
        +string impact
        +string remediation
        +number priority
    }

    ComplianceMapping --> ComplianceFramework
    ComplianceMapping *-- ControlMapping
    ComplianceFramework *-- FrameworkControl
    ComplianceMapping *-- ComplianceGap
```

## 🔄 Data Relationships

**🔗 Integration Focus:** Shows how the different data domains relate to each other in the overall system.

**🏛️ Architecture Focus:** Illustrates the core relationships that drive the CIA Compliance Manager functionality.

```mermaid
flowchart TD
    subgraph "Security Assessment"
        SA[Security Profile] --> C[Confidentiality]
        SA --> I[Integrity] 
        SA --> A[Availability]
        
        C --> CL[Confidentiality Levels]
        I --> IL[Integrity Levels]
        A --> AL[Availability Levels]
    end
    
    subgraph "Business Impact"
        BI[Business Impact] --> FI[Financial Impact]
        BI --> OI[Operational Impact]
        BI --> RI[Reputational Impact]
        BI --> SI[Strategic Impact]
        
        FI --> VC[Value Creation]
        FI --> ROI[ROI Estimates]
    end
    
    subgraph "Compliance"
        CM[Compliance Mapping] --> CF[Compliance Frameworks]
        CM --> CN[Control Mappings]
        CM --> CG[Compliance Gaps]
    end
    
    SA --> BI
    SA --> CM
    BI --> CM
    
    classDef security fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef business fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef compliance fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef component fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    
    class SA,C,I,A,CL,IL,AL security
    class BI,FI,OI,RI,SI,VC,ROI business
    class CM,CF,CN,CG compliance
```

## 📊 Data Flow Diagram

**🔄 Process Focus:** Shows how data flows through the system from security assessment to business impact and compliance mapping.

**📊 Data Focus:** Illustrates the key data transformations and processing steps.

```mermaid
flowchart TD
    A[User Inputs Security Levels] --> B[Security Profile Creation]
    B --> C{Security Domain}
    
    C -->|Confidentiality| D1[Process Confidentiality Data]
    C -->|Integrity| D2[Process Integrity Data]
    C -->|Availability| D3[Process Availability Data]
    
    D1 --> E1[Confidentiality Assessment]
    D2 --> E2[Integrity Assessment]
    D3 --> E3[Availability Assessment]
    
    E1 & E2 & E3 --> F[Calculate Security Score]
    F --> G[Security Posture Evaluation]
    
    G --> H1[Business Impact Analysis]
    G --> H2[Compliance Mapping]
    
    H1 --> I1[Financial Impact Calculation]
    H1 --> I2[Operational Impact Evaluation]
    H1 --> I3[Reputation/Strategic Assessment]
    
    I1 & I2 & I3 --> J[ROI Calculation]
    J --> K[Value Creation Mapping]
    
    H2 --> L1[Control Mapping]
    H2 --> L2[Gap Analysis]
    L1 & L2 --> M[Compliance Status Report]
    
    K & M --> N[Comprehensive Assessment Report]
    
    classDef input fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef security fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef business fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef compliance fill:#ffccbc,stroke:#333,stroke-width:1px,color:black
    classDef output fill:#b39ddb,stroke:#333,stroke-width:1px,color:black
    
    class A input
    class B,D1,D2,D3,F,G process
    class C decision
    class E1,E2,E3 security
    class H1,I1,I2,I3,J,K business
    class H2,L1,L2,M compliance
    class N output
```

## 💾 Data Storage and Persistence

**🔧 Technical Focus:** Shows how data is stored and persisted within the application.

**📊 Implementation Focus:** Illustrates the storage mechanisms and persistence approaches.

```mermaid
flowchart TD
    A[Application State] --> B{Storage Mechanism}
    
    B -->|Local Storage| C1[Browser Local Storage]
    B -->|Session Storage| C2[Browser Session Storage]
    B -->|Export/Import| C3[JSON File Export]
    
    C1 --> D1[Persistent Security Profiles]
    C2 --> D2[Temporary Session Data]
    C3 --> D3[Shareable Assessment Data]
    
    D1 --> E1[Load on Application Start]
    D2 --> E2[Cache During Session]
    D3 --> E3[Import From File]
    
    E1 & E2 & E3 --> F[Application State Hydration]
    F --> G[CIA Assessment Display]

    classDef state fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef mechanism fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef storage fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef action fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef display fill:#ffccbc,stroke:#333,stroke-width:1px,color:black
    
    class A,F state
    class B mechanism
    class C1,C2,C3 storage
    class D1,D2,D3 data
    class E1,E2,E3 action
    class G display
```

## 🧩 Key Data Model Components

| Component                     | Purpose                                                   | Related Files                                                    | Primary Interfaces          |
|------------------------------|-----------------------------------------------------------|-----------------------------------------------------------------|----------------------------|
| 🔒 CIA Security Levels       | Define security levels for confidentiality, integrity, availability | `confidentialityData.ts`, `integrityData.ts`, `availabilityData.ts` | `CIADetails` interface      |
| 💰 ROI Estimates             | Calculate return on investment for security implementations | `roiEstimatesData.ts`                                            | `ROIEstimates` interface    |
| 📊 Business Impact           | Quantify business impact of security decisions            | `riskImpactData.ts`                                             | `RiskImpact` interface      |
| 💼 Value Creation            | Map security investments to business value                 | `valueCreationData.ts`                                           | `ValueCreation` interface   |
| 🔄 CIA Options               | Expose security level options for selection               | `ciaOptionsData.ts`                                              | Various export constants    |
| 📋 Compliance Mapping        | Map security controls to compliance frameworks            | Component-specific implementation                               | `ComplianceMapping` interface |

## 🔗 Data Model Implementation Details

**🔧 Technical Focus:** Details how the data model is technically implemented in the codebase.

**💻 Code Focus:** Illustrates the key TypeScript data structures and interfaces.

```typescript
// CIA Details Interface - Core model for security level details
interface CIADetails {
    level: string;
    description: string;
    impact: string;
    technical: string;
    businessImpact: string;
    capex: number;
    opex: number;
    recommendations: string[];
}

// Business Impact Interface
interface BusinessImpactDetails {
    financialImpact: {
        description: string;
        riskLevel: string;
        annualRevenueLoss: string;
        expectedLossValue: number;
    };
    operationalImpact: {
        description: string;
        riskLevel: string;
        meanTimeToRecover: string;
        productivityImpact: number;
    };
    reputationalImpact: {
        description: string;
        riskLevel: string;
        brandDamage: string;
        customerTrust: string;
    };
    strategicImpact: {
        description: string;
        riskLevel: string;
        marketPosition: string;
        competitiveAdvantage: string;
    };
}

// Security Profile Interface
interface SecurityProfile {
    confidentialityLevel: string;
    integrityLevel: string;
    availabilityLevel: string;
    assessmentDate: Date;
    businessContext: string;
    securityScore: number;
}
```

## 🔄 Data Model Evolution

**🚀 Future Focus:** Shows how the current data model will evolve into the future context-aware model.

**🧩 Architecture Focus:** Illustrates the planned enhancements and extensions to the data model.

```mermaid
timeline
    title Data Model Evolution Plan
    section Current Model
        Now : Core CIA structures
            : Basic business impact
            : Simple compliance mapping
    section Near Future
        Q1 2024 : Context parameters
               : Enhanced business impact
               : Extended compliance mapping
    section Mid-Term
        Q3 2024 : ML data structures
               : Feedback systems
               : Integration interfaces
    section Long-Term
        2025 : Predictive models
            : Autonomous adaptation
            : Context-aware engine
```

## 📈 Data Flow Between Components

**🏛️ Architecture Focus:** Shows how data flows between different components in the system.

**🔄 Process Focus:** Illustrates the key data transformations and exchange patterns.

```mermaid
sequenceDiagram
    participant User
    participant SecurityAssessment
    participant BusinessImpact
    participant ComplianceMapping
    participant DataStorage
    
    User->>SecurityAssessment: Set Security Levels
    SecurityAssessment->>SecurityAssessment: Calculate Security Score
    SecurityAssessment->>BusinessImpact: Security Profile
    BusinessImpact->>BusinessImpact: Calculate Business Impacts
    BusinessImpact->>BusinessImpact: Determine ROI
    SecurityAssessment->>ComplianceMapping: Security Levels
    ComplianceMapping->>ComplianceMapping: Map to Frameworks
    ComplianceMapping->>ComplianceMapping: Identify Gaps
    
    SecurityAssessment-->>DataStorage: Store Security Profile
    BusinessImpact-->>DataStorage: Store Impact Analysis
    ComplianceMapping-->>DataStorage: Store Compliance Status
    
    SecurityAssessment->>User: Display Security Posture
    BusinessImpact->>User: Display Business Impacts
    ComplianceMapping->>User: Display Compliance Status
```

This documentation provides a comprehensive view of the current data model powering the CIA Compliance Manager. It illustrates the key structures, relationships, and implementation patterns that enable the system's security assessment, business impact analysis, and compliance mapping capabilities.
