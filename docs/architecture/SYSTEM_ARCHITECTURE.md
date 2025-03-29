# 🏛️ CIA Compliance Manager System Architecture

This document provides multiple architectural perspectives of the CIA Compliance Manager system, illustrating how different layers interact to deliver security assessment, business impact analysis, and compliance mapping capabilities.

## 📚 Related Architecture Documentation

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | 🏛️ Architecture | C4 model showing current system structure |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🏛️ Architecture | Vision for context-aware platform         |
| **[Data Model](DATA_MODEL.md)**                     | 📊 Data         | Current data structures and relationships |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 📊 Data         | Context-aware data architecture           |
| **[State Diagrams](STATEDIAGRAM.md)**               | 🔄 Behavior     | System state transitions                  |
| **[Process Flowcharts](FLOWCHART.md)**              | 🔄 Process      | Security assessment workflows             |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | System component relationships            |

</div>

## 🌐 System Overview

The CIA Compliance Manager is structured as a layered architecture with clear separation of concerns between services, components, data structures, and utilities. The diagram below illustrates the high-level system architecture:

```mermaid
flowchart TD
    subgraph "Presentation Layer"
        UI[User Interface]
        Widgets[Widgets]
        Components[Common Components]
    end
    
    subgraph "Business Logic Layer"
        Services[Service Layer]
        Hooks[React Hooks]
    end
    
    subgraph "Data Layer"
        Providers[Data Providers]
        Models[Data Models]
    end
    
    subgraph "Utility Layer"
        Utils[Utility Functions]
    end
    
    UI --> Widgets --> Components
    Widgets --> Hooks --> Services
    Components --> Hooks
    Services --> Providers --> Models
    Services --> Utils
    Hooks --> Utils
    Components --> Utils
    
    classDef presentation fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef business fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef utility fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    
    class UI,Widgets,Components presentation
    class Services,Hooks business
    class Providers,Models data
    class Utils utility
```

## 🔧 Service Architecture

**💼 Business Focus:** The service layer encapsulates core business logic and provides a clean API for user interface components.

**🔄 Data Flow Focus:** Services handle data transformation, processing, and interaction with data providers.

```mermaid
classDiagram
    class BaseService {
        +CIADataProvider dataProvider
        #getComponentDetails(component, level) CIADetails
        #getCIAOptions(component) Record~string, CIADetails~
        #capitalizeFirstLetter(string) string
        #getValuePoints(level) string[]
    }
    
    class BusinessImpactService {
        +getBusinessImpact(component, level) BusinessImpactDetails
        +getCategoryIcon(category) string
        +getBusinessImpactDescription(component, level) string
        +getDetailedDescription(category, detail) string
        +calculateBusinessImpactLevel(...levels) string
    }
    
    class ComplianceService {
        +getComplianceStatus(...levels) ComplianceStatus
        +getFrameworkStatus(framework, ...levels) string
        +getCompliantFrameworks(...levels) string[]
        +getComplianceStatusText(...levels) string
        +getSupportedFrameworks() Framework[]
        +getFrameworkRequiredLevel(framework) SecurityLevel
        +isFrameworkApplicable(framework, ...levels) boolean
    }
    
    class SecurityMetricsService {
        +getSecurityMetrics(...levels) SecurityMetrics
        +getComponentMetrics(component, level) ComponentMetrics
        +getImpactMetrics(component, level) ImpactMetrics
        +getSecurityLevelDescription(level) string
        +getProtectionLevel(...levels) string
        +getSecurityIcon(level) string
        +calculateSecurityScore(...levels) number
        +calculateRoi(...levels) ROIMetrics
    }
    
    class SecurityResourceService {
        +getValuePoints(level) string[]
        +getSecurityResources(component, level) SecurityResource[]
    }
    
    class TechnicalImplementationService {
        +getTechnicalImplementation(component, level) TechnicalImplementationDetails
        +getComponentImplementationDetails(component, level) ComponentImplementationDetails
        +getTechnicalDescription(component, level) string
        +getRecommendations(component, level) string[]
        +getImplementationConsiderations(...levels) string
        +getImplementationTime(...levels) string
    }
    
    class CIAContentService {
        -BusinessImpactService businessImpactService
        -ComplianceService complianceService
        -SecurityMetricsService securityMetricsService
        -TechnicalImplementationService technicalImplementationService
        -SecurityResourceService securityResourceService
        +getBusinessImpact(component, level) BusinessImpactDetails
        +getSecurityMetrics(...levels) SecurityMetrics
        +getComplianceStatus(...levels) ComplianceStatus
        +getTechnicalImplementation(...) TechnicalImplementationDetails
        +getSecurityResources(...) SecurityResource[]
    }
    
    BaseService <|-- BusinessImpactService
    BaseService <|-- ComplianceService
    BaseService <|-- SecurityMetricsService
    BaseService <|-- SecurityResourceService
    BaseService <|-- TechnicalImplementationService
    BaseService <|-- CIAContentService
    CIAContentService --> BusinessImpactService
    CIAContentService --> ComplianceService
    CIAContentService --> SecurityMetricsService
    CIAContentService --> SecurityResourceService
    CIAContentService --> TechnicalImplementationService
```

### 🔄 Service Dependencies

```mermaid
flowchart TD
    CIA[CIAContentService] --> BIS[BusinessImpactService]
    CIA --> SMS[SecurityMetricsService]
    CIA --> CS[ComplianceService]
    CIA --> TIS[TechnicalImplementationService]
    CIA --> SRS[SecurityResourceService]
    
    BIS --> DP[CIADataProvider]
    SMS --> DP
    CS --> DP
    TIS --> DP
    SRS --> DP
    
    classDef main fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef service fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    
    class CIA main
    class BIS,SMS,CS,TIS,SRS service
    class DP data
```

## 🧩 Component Architecture

**🎯 UI Focus:** Components form the building blocks of the user interface, providing reusable functionality.

**🔄 Composition Focus:** Shows how components are composed to create the complete user experience.

```mermaid
classDiagram
    class Component {
        <<interface>>
        +render() ReactNode
    }
    
    class CommonComponents {
        BusinessImpactSection
        CIAImpactCard
        KeyValuePair
        MetricsCard
        RiskLevelBadge
        SecurityLevelBadge
        StatusBadge
        WidgetContainer
    }
    
    class ChartComponents {
        RadarChart
        SecurityRiskScore
    }
    
    class SecurityLevelComponents {
        SecurityLevelSelector
    }
    
    class Widget {
        <<interface>>
        +title: string
        +children: ReactNode
        +testId: string
    }
    
    class AssessmentWidgets {
        BusinessImpactAnalysisWidget
        SecurityLevelWidget
        SecuritySummaryWidget
    }
    
    class BusinessValueWidgets {
        ComplianceStatusWidget
        CostEstimationWidget
        ValueCreationWidget
    }
    
    class ImpactAnalysisWidgets {
        AvailabilityImpactWidget
        ConfidentialityImpactWidget
        IntegrityImpactWidget
    }
    
    class ImplementationGuideWidgets {
        SecurityResourcesWidget
        SecurityVisualizationWidget
        TechnicalDetailsWidget
    }
    
    Component <|-- CommonComponents
    Component <|-- ChartComponents
    Component <|-- SecurityLevelComponents
    Component <|-- Widget
    Widget <|-- AssessmentWidgets
    Widget <|-- BusinessValueWidgets
    Widget <|-- ImpactAnalysisWidgets
    Widget <|-- ImplementationGuideWidgets
    AssessmentWidgets ..> CommonComponents : uses
    BusinessValueWidgets ..> CommonComponents : uses
    ImpactAnalysisWidgets ..> CommonComponents : uses
    ImplementationGuideWidgets ..> CommonComponents : uses
    AssessmentWidgets ..> ChartComponents : uses
    ImplementationGuideWidgets ..> ChartComponents : uses
```

### 🖼️ Component Hierarchy

```mermaid
flowchart TD
    App[CIAClassificationApp] --> SLW[SecurityLevelWidget]
    App --> SSW[SecuritySummaryWidget]
    App --> BIAW[BusinessImpactAnalysisWidget]
    App --> CSW[ComplianceStatusWidget]
    App --> CEW[CostEstimationWidget]
    App --> VCW[ValueCreationWidget]
    App --> AIW[AvailabilityImpactWidget]
    App --> IIW[IntegrityImpactWidget]
    App --> CIW[ConfidentialityImpactWidget]
    App --> SRW[SecurityResourcesWidget]
    App --> SVW[SecurityVisualizationWidget]
    App --> TDW[TechnicalDetailsWidget]
    
    SLW --> SLS[SecurityLevelSelector]
    SLS --> SEL[Selection]
    
    SSW --> SRS[SecurityRiskScore]
    SSW --> RC[RadarChart]
    
    BIAW --> BIS[BusinessImpactSection]
    CSW --> SB[StatusBadge]
    SVW --> RC
    
    AIW --> KVP[KeyValuePair]
    IIW --> KVP
    CIW --> KVP
    
    SRW --> MC[MetricsCard]
    
    classDef app fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef widget fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef component fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef common fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    
    class App app
    class SLW,SSW,BIAW,CSW,CEW,VCW,AIW,IIW,CIW,SRW,SVW,TDW widget
    class SLS,RC,SRS component
    class SEL,BIS,SB,KVP,MC common
```

## 📊 Widget Architecture

**🧩 Modular Focus:** Widgets encapsulate domain-specific functionality in self-contained modules.

**💼 Domain Focus:** Each widget addresses a specific aspect of security assessment and management.

```mermaid
flowchart TD
    subgraph "Assessment Center"
        SLW[SecurityLevelWidget]
        SSW[SecuritySummaryWidget]
        BIAW[BusinessImpactAnalysisWidget]
    end
    
    subgraph "Business Value"
        CSW[ComplianceStatusWidget]
        CEW[CostEstimationWidget]
        VCW[ValueCreationWidget]
    end
    
    subgraph "Impact Analysis"
        AIW[AvailabilityImpactWidget]
        IIW[IntegrityImpactWidget]
        CIW[ConfidentialityImpactWidget]
    end
    
    subgraph "Implementation Guide"
        SRW[SecurityResourcesWidget]
        SVW[SecurityVisualizationWidget]
        TDW[TechnicalDetailsWidget]
    end
    
    SLW --> SSW
    SLW --> BIAW
    SLW --> CSW
    SLW --> CEW
    SLW --> VCW
    SLW --> AIW
    SLW --> IIW
    SLW --> CIW
    SLW --> SRW
    SLW --> SVW
    SLW --> TDW
    
    classDef assessment fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef business fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef impact fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef implementation fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    
    class SLW,SSW,BIAW assessment
    class CSW,CEW,VCW business
    class AIW,IIW,CIW impact
    class SRW,SVW,TDW implementation
```

### 📊 Widget Data Flow

```mermaid
sequenceDiagram
    participant User
    participant SLW as SecurityLevelWidget
    participant Service as Services
    participant Data as DataProvider
    participant OtherWidgets as Other Widgets
    
    User->>SLW: Set Security Levels
    SLW->>Service: Update Security Profile
    Service->>Data: Process Security Levels
    Service-->>SLW: Updated Profile Data
    Service-->>OtherWidgets: Updated Profile Data
    OtherWidgets-->>User: Display Updated Assessments
```

## 📂 Data Architecture

**📊 Data Model Focus:** Shows the organization and relationships of data structures.

**🧩 State Management Focus:** Illustrates how data flows and state is managed throughout the application.

```mermaid
erDiagram
    SecurityProfile {
        string confidentialityLevel
        string integrityLevel
        string availabilityLevel
    }
    
    CIADetails {
        string level
        string description
        string impact
        string technical
        string businessImpact
        number capex
        number opex
        array recommendations
    }
    
    BusinessImpact {
        object financial
        object operational
        object reputational
        object strategic
    }
    
    ComplianceStatus {
        string status
        array compliantFrameworks
        array partiallyCompliantFrameworks
        array nonCompliantFrameworks
        array remediationSteps
        number complianceScore
    }
    
    SecurityMetrics {
        number score
        number maxScore
        string percentage
        number totalCapex
        number totalOpex
        number totalCost
        string riskReduction
    }
    
    TechnicalImplementation {
        string description
        array implementationSteps
        object effort
    }
    
    SecurityResources {
        string id
        string title
        string description
        string url
        string type
        array tags
    }
    
    SecurityProfile ||--o{ CIADetails : "defined by"
    SecurityProfile ||--|| BusinessImpact : "assesses"
    SecurityProfile ||--|| ComplianceStatus : "maps to"
    SecurityProfile ||--|| SecurityMetrics : "measures"
    SecurityProfile ||--|| TechnicalImplementation : "implements"
    SecurityProfile ||--o{ SecurityResources : "utilizes"
```

### 🗃️ Data Provider Architecture

```mermaid
classDiagram
    class CIADataProvider {
        <<interface>>
        +confidentialityOptions: Record~string, CIADetails~
        +integrityOptions: Record~string, CIADetails~
        +availabilityOptions: Record~string, CIADetails~
        +roiEstimates: Record~string, ROIEstimate~
    }
    
    class DefaultDataProvider {
        +confidentialityOptions
        +integrityOptions
        +availabilityOptions
        +roiEstimates
    }
    
    class TestDataProvider {
        +confidentialityOptions
        +integrityOptions
        +availabilityOptions
        +roiEstimates
    }
    
    CIADataProvider <|.. DefaultDataProvider
    CIADataProvider <|.. TestDataProvider
```

## 🔨 Utility Architecture

**🧰 Tools Focus:** Shows the organization and purpose of utility functions that support the application.

**🔧 Reuse Focus:** Illustrates how utilities provide common functionality across the system.

```mermaid
classDiagram
    class Utils {
        colorUtils
        costCalculationUtils
        defaultDataProvider
        errorUtils
        formatUtils
        levelValuesUtils
        logger
        riskUtils
        securityDefaults
        securityLevelUtils
        serviceUtils
        typeGuards
        widgetHelpers
    }
    
    class colorUtils {
        +getColorForSecurityLevel() string
        +getBackgroundForSecurityLevel() string
        +getHexForLevel() string
    }
    
    class formatUtils {
        +formatCurrency() string
        +formatPercentage() string
        +truncateText() string
    }
    
    class levelValuesUtils {
        +getLevelValue() number
        +getLevelFromValue() string
        +compareSecurityLevels() number
    }
    
    class logger {
        +debug() void
        +info() void
        +warn() void
        +error() void
    }
    
    class riskUtils {
        +calculateRiskScore() number
        +getRiskLevel() string
        +getRiskColor() string
    }
    
    class securityLevelUtils {
        +normalizeSecurityLevel() string
        +getNextSecurityLevel() string
        +getPreviousSecurityLevel() string
    }
    
    class typeGuards {
        +isSecurityLevel() boolean
        +isCIAComponentType() boolean
        +isObject() boolean
    }
    
    Utils *-- colorUtils
    Utils *-- formatUtils
    Utils *-- levelValuesUtils
    Utils *-- logger
    Utils *-- riskUtils
    Utils *-- securityLevelUtils
    Utils *-- typeGuards
```

### 🔗 Utility Dependencies

```mermaid
flowchart LR
    subgraph "Components"
        Comp[UI Components]
    end
    
    subgraph "Services"
        Serv[Business Services]
    end
    
    subgraph "Utils"
        Format[Format Utils]
        Color[Color Utils]
        Risk[Risk Utils]
        Level[Level Utils]
        Logger[Logger]
        TypeGuard[Type Guards]
    end
    
    Comp --> Color
    Comp --> Format
    Comp --> Level
    
    Serv --> Risk
    Serv --> Level
    Serv --> Format
    Serv --> Logger
    Serv --> TypeGuard
    
    Risk --> Level
    Color --> Level
    
    classDef comp fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef serv fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef util fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    
    class Comp comp
    class Serv serv
    class Format,Color,Risk,Level,Logger,TypeGuard util
```

## 🔄 Workflow Architecture

**🔄 Process Focus:** Shows the key workflows and processes within the application.

**🚀 User Journey Focus:** Illustrates how users interact with the system to perform tasks.

```mermaid
stateDiagram-v2
    [*] --> InitialState
    InitialState --> SecurityLevelSelection: User Opens Application
    
    state SecurityLevelSelection {
        [*] --> SelectConfidentiality
        SelectConfidentiality --> SelectIntegrity
        SelectIntegrity --> SelectAvailability
        SelectAvailability --> [*]
    }
    
    SecurityLevelSelection --> SecurityAssessment: Levels Selected
    
    state SecurityAssessment {
        [*] --> CalculateSecurityScore
        CalculateSecurityScore --> EvaluateBusinessImpact
        EvaluateBusinessImpact --> MapToCompliance
        MapToCompliance --> GenerateRecommendations
        GenerateRecommendations --> [*]
    }
    
    SecurityAssessment --> ReviewResults: Assessment Complete
    
    state ReviewResults {
        [*] --> ExamineBusinessImpact
        [*] --> ReviewComplianceStatus
        [*] --> ExploreRecommendations
    }
    
    ReviewResults --> AdjustLevels: User Adjusts Settings
    AdjustLevels --> SecurityLevelSelection
    
    ReviewResults --> ExportResults: User Exports
    ExportResults --> [*]
```

## 🔌 Integration Architecture

**🔗 Integration Focus:** Shows how the application interfaces with external systems.

**🏗️ Extension Focus:** Illustrates the extension points for adding new functionality.

```mermaid
flowchart TD
    subgraph "CIA Compliance Manager"
        App[Core Application]
        Services[Service Layer]
        Data[Data Providers]
        API[API Layer]
    end
    
    subgraph "External Systems"
        GRC[GRC Platforms]
        SIEM[SIEM Systems]
        CMDB[Asset Management]
        BI[BI/Reporting]
    end
    
    App --> Services --> Data
    Services <--> API
    
    API <-.-> GRC
    API <-.-> SIEM
    API <-.-> CMDB
    API <-.-> BI
    
    classDef internal fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef external fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef integration fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    
    class App,Services,Data internal
    class GRC,SIEM,CMDB,BI external
    class API integration
```

## 🔒 Security Architecture

**🛡️ Security Focus:** Shows the security controls and mechanisms within the application.

**🔐 Protection Focus:** Illustrates how the system safeguards data and functionality.

```mermaid
flowchart TD
    subgraph "Authentication & Authorization"
        Auth[Authentication]
        Roles[Role-Based Access]
        Perm[Permissions]
    end
    
    subgraph "Data Security"
        Store[Secure Storage]
        Trans[Transport Security]
        Enc[Encryption]
    end
    
    subgraph "Application Security"
        Valid[Input Validation]
        Output[Output Sanitization]
        CSRF[CSRF Protection]
    end
    
    subgraph "Audit & Logging"
        Audit[Audit Logging]
        Monitor[Activity Monitoring]
        Alert[Security Alerts]
    end
    
    User((User)) --> Auth --> Roles --> Perm
    Perm --> App[Application]
    App --> Store
    App --> Trans
    App --> Enc
    App --> Valid
    App --> Output
    App --> CSRF
    App --> Audit --> Monitor --> Alert
    
    classDef user fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef authn fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef app fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef audit fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    
    class User user
    class Auth,Roles,Perm authn
    class Store,Trans,Enc data
    class Valid,Output,CSRF,App app
    class Audit,Monitor,Alert audit
```

## 🔄 State Management Architecture

**🔄 State Flow Focus:** Shows how state is managed and propagated through the application.

**🧩 Hook Focus:** Illustrates the role of React hooks in state management.

```mermaid
flowchart TD
    subgraph "State Management"
        App[Application State]
        Hooks[Custom Hooks]
        Context[React Context]
    end
    
    subgraph "Component State Consumers"
        Widgets[Widgets]
        Components[UI Components]
    end
    
    subgraph "State Providers"
        Services[Services]
        DataProviders[Data Providers]
    end
    
    App --> Context
    Context --> Hooks
    Services --> Hooks
    DataProviders --> Services
    
    Hooks --> Widgets
    Hooks --> Components
    
    classDef state fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef consumer fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef provider fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    
    class App,Context,Hooks state
    class Widgets,Components consumer
    class Services,DataProviders provider
```

## 📦 Package Dependencies

**🔗 Dependency Focus:** Shows the key dependencies between packages in the codebase.

**📚 Module Focus:** Illustrates how modules relate to each other.

```mermaid
flowchart TD
    subgraph "Core Packages"
        App[App]
        Components[Components]
        Services[Services]
        Hooks[Hooks]
        Utils[Utils]
        Data[Data]
        Types[Types]
    end
    
    App --> Components
    App --> Hooks
    Components --> Services
    Components --> Utils
    Hooks --> Services
    Hooks --> Utils
    Services --> Data
    Services --> Utils
    Services --> Types
    Data --> Types
    Utils --> Types
    
    classDef app fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef ui fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef business fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef utility fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    
    class App app
    class Components ui
    class Services,Hooks business
    class Data,Types data
    class Utils utility
```

## 🧪 Testing Architecture

**🧪 Test Focus:** Shows the testing approach and organization across the codebase.

**🔍 Quality Focus:** Illustrates how different types of tests ensure system quality.

```mermaid
flowchart TD
    subgraph "Test Types"
        Unit[Unit Tests]
        Integration[Integration Tests]
        Component[Component Tests]
        E2E[End-to-End Tests]
    end
    
    subgraph "Test Support"
        Mocks[Mock Objects]
        Fixtures[Test Fixtures]
        TestUtils[Test Utilities]
        TestData[Test Data]
    end
    
    subgraph "Test Coverage"
        Services[Services]
        Components[Components]
        Hooks[Hooks]
        Utils[Utils]
    end
    
    Unit --> Services
    Unit --> Utils
    Component --> Components
    Integration --> Hooks
    E2E --> App[Application]
    
    Unit & Component & Integration & E2E --> Mocks
    Unit & Component & Integration & E2E --> Fixtures
    Unit & Component & Integration & E2E --> TestUtils
    Unit & Component & Integration & E2E --> TestData
    
    classDef test fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef support fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef coverage fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef app fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    
    class Unit,Integration,Component,E2E test
    class Mocks,Fixtures,TestUtils,TestData support
    class Services,Components,Hooks,Utils coverage
    class App app
```

## Color Legend

The color scheme used throughout these diagrams follows a consistent pattern to enhance readability:

| Element Type           | Color                  | Description                                       |
| ------------------------ | ---------------------- | ------------------------------------------------- |
| Application Core         | #a0c8e0 (Medium Blue)  | Core application components and services          |
| User Interface           | #bbdefb (Light Blue)   | UI components, widgets, and presentation elements |
| Business Logic           | #d1c4e9 (Light Purple) | Business rules, services, and processing logic    |
| Data Elements            | #c8e6c9 (Light Green)  | Data structures, models, and storage              |
| Integration Elements     | #ffda9e (Light Orange) | External interfaces and integration points        |
| Support & Infrastructure | #ffccbc (Light Coral)  | Supporting functions, utilities, and infrastructure|

This consistent color scheme helps distinguish between different architectural aspects and creates visual continuity across all diagrams in the documentation.
