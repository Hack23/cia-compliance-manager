# 🏛️ CIA Compliance Manager System Architecture

This document provides multiple architectural perspectives of the CIA Compliance Manager system, illustrating how different layers interact to deliver security assessment, business impact analysis, and compliance mapping capabilities.

## 📚 Architecture Documentation Map

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[System Architecture](SYSTEM_ARCHITECTURE.md)**   | 🏛️ System       | Layered architecture and component details |
| **[Architecture](ARCHITECTURE.md)**                 | 🏗️ C4 Model     | C4 model showing system structure          |
| **[Data Model](DATA_MODEL.md)**                     | 📊 Data         | Current data structures and relationships  |
| **[State Diagrams](STATEDIAGRAM.md)**               | 🔄 Behavior     | System state transitions                   |
| **[Process Flowcharts](FLOWCHART.md)**              | 🔄 Process      | Security assessment workflows              |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | System component relationships             |
| **[Widget Analysis](WIDGET_ANALYSIS.md)**           | 🧩 Components   | Detailed widget component analysis         |
| **[Style Guide](STYLE_GUIDE.md)**                   | 🎨 Style        | Documentation style guidelines             |
| **[SWOT Analysis](SWOT.md)**                        | 💼 Business     | Strategic business assessment              |
| **[BCP Plan](BCPPlan.md)**                          | 🔄 Recovery     | Business continuity planning               |
| **[Workflows](WORKFLOWS.md)**                       | 🚀 DevOps       | CI/CD and development workflows            |
| **[Contribution Guidelines](CONTRIBUTION_GUIDELINES.md)** | 📋 Guidelines | Documentation contribution process        |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🚀 Evolution    | Vision for platform evolution              |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 🚀 Evolution    | Future data architecture vision            |

</div>

## 🌐 System Overview

The CIA Compliance Manager is structured as a layered architecture with clear separation of concerns between services, components, data structures, and utilities. The diagram below illustrates the high-level system architecture:

```mermaid
flowchart TD
    subgraph "Presentation Layer"
        UI[User Interface]
        Widgets[Widget Components]
        Common[Common Components]
    end
    
    subgraph "Business Logic Layer"
        Services[Service Layer]
        Hooks[React Hooks]
    end
    
    subgraph "Data Layer"
        Providers[Data Providers]
        StaticData[Static Data Files]
    end
    
    subgraph "Utility Layer"
        Utils[Utility Functions]
    end
    
    UI --> Widgets --> Common
    Widgets --> Hooks --> Services
    Common --> Hooks
    Services --> Providers --> StaticData
    Services --> Utils
    Hooks --> Utils
    Common --> Utils
    
    classDef presentation fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#ffffff
    classDef business fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef data fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef utility fill:#455A64,stroke:#37474F,stroke-width:2px,color:#ffffff
    
    class UI,Widgets,Common presentation
    class Services,Hooks business
    class Providers,StaticData data
    class Utils utility
```

## 🧩 Widget Architecture

The application uses a widget-based architecture organized into four main categories, each addressing specific aspects of security assessment and management:

```mermaid
flowchart TB
    subgraph Core
        SLW["Security Level<br>Widget"]
    end

    subgraph Categories ["CIA Security Widget Categories"]
        subgraph Assessment ["📊 Assessment Center"]
            SSW["Security Summary<br>Widget"]
            BIAW["Business Impact<br>Analysis Widget"]
        end
        
        subgraph Business ["💰 Business Value"]
            CSW["Compliance Status<br>Widget"]
            CEW["Cost Estimation<br>Widget"]
            VCW["Value Creation<br>Widget"]
        end
        
        subgraph Impact ["🔍 Impact Analysis"]
            subgraph CIA ["🔐 CIA Components"]
                CIW["Confidentiality<br>Impact Widget"]
                IIW["Integrity<br>Impact Widget"]
                AIW["Availability<br>Impact Widget"]
            end
        end
        
        subgraph Implementation ["🛠️ Implementation"]
            SRW["Security Resources<br>Widget"]
            SVW["Security Visualization<br>Widget"]
            TDW["Technical Details<br>Widget"]
        end
    end
    
    SLW --> SSW & BIAW
    SLW --> CSW & CEW & VCW
    SLW --> CIW & IIW & AIW
    SLW --> SRW & SVW & TDW
    
    %% Apply styles using class definitions
    classDef core fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef assessment fill:#FF9800,stroke:#F57C00,stroke-width:2px,color:#ffffff
    classDef business fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef impact fill:#D32F2F,stroke:#B71C1C,stroke-width:2px,color:#ffffff
    classDef implementation fill:#4CAF50,stroke:#2E7D32,stroke-width:2px,color:#ffffff
    classDef confidentiality fill:#7B1FA2,stroke:#7B1FA2,stroke-width:2px,color:#ffffff
    classDef integrity fill:#2E7D32,stroke:#2E7D32,stroke-width:2px,color:#ffffff
    classDef availability fill:#1565C0,stroke:#1565C0,stroke-width:2px,color:#ffffff
    
    %% Apply classes to nodes
    class SLW core
    class SSW,BIAW assessment
    class CSW,CEW,VCW business
    class CIW confidentiality
    class IIW integrity
    class AIW availability
    class SRW,SVW,TDW implementation
```

## 🔧 Service Architecture

The service layer encapsulates business logic and provides a clean API for widget components. Services retrieve data from static files through data providers:

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
        +getComplianceGapAnalysis(...) GapAnalysis
    }
    
    class SecurityMetricsService {
        +getSecurityMetrics(...levels) SecurityMetrics
        +getComponentMetrics(component, level) ComponentMetrics
        +getSecurityLevelDescription(level) string
        +getProtectionLevel(...levels) string
        +getSecurityIcon(level) string
        +calculateSecurityScore(...levels) number
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
        +getComponentDetails(component, level) CIADetails
    }
    
    BaseService <|-- BusinessImpactService
    BaseService <|-- ComplianceService
    BaseService <|-- SecurityMetricsService
    BaseService <|-- CIAContentService
    CIAContentService --> BusinessImpactService
    CIAContentService --> ComplianceService
    CIAContentService --> SecurityMetricsService
```

## 📊 Data Architecture

The application currently uses static data files for all configuration and content. There is no database in the current implementation:

```mermaid
flowchart TD
    subgraph "Data Access Layer"
        CIADataProvider(["CIADataProvider\n<<interface>>"])
        DefaultDP[DefaultDataProvider]
        TestDP[TestDataProvider]
    end
    
    subgraph "Data Files"
        confidentialityOpts["confidentialityOptions.ts"]
        integrityOpts["integrityOptions.ts"]
        availabilityOpts["availabilityOptions.ts"]
        frameworkData["frameworks.ts"]
        resourcesData["securityResources.ts"]
    end
    
    CIADataProvider -.-> DefaultDP
    CIADataProvider -.-> TestDP
    
    DefaultDP --> confidentialityOpts
    DefaultDP --> integrityOpts
    DefaultDP --> availabilityOpts
    DefaultDP --> frameworkData
    DefaultDP --> resourcesData
    
    Services[Service Layer] --> CIADataProvider
    
    %% Style definitions
    classDef interface fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#ffffff
    classDef provider fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef data fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef service fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    
    %% Apply styles
    class CIADataProvider interface
    class DefaultDP,TestDP provider
    class confidentialityOpts,integrityOpts,availabilityOpts,frameworkData,resourcesData data
    class Services service
```

## 🔨 Utility Architecture

The application has a rich set of utility functions that provide common functionality across components:

```mermaid
classDiagram
    class Utils {
        colorUtils
        costCalculationUtils
        businessValueUtils
        formatUtils
        riskUtils
        securityLevelUtils
        typeGuards
    }
    
    class colorUtils {
        +getSecurityLevelBackgroundClass(color) string
        +getSecurityLevelTextClass(color) string
        +getColorForSecurityLevel(level) string
        +getBackgroundForSecurityLevel(level) string
    }
    
    class costCalculationUtils {
        +calculateTotalSecurityCost(...levels) CostDetails
        +calculateComponentCost(component, level) ComponentCost
        +estimateImplementationCost(...levels) number
    }
    
    class businessValueUtils {
        +calculateROIEstimate(...levels) ROIEstimate
        +generateValueMetrics(...levels) BusinessValueMetric[]
        +getComponentValueStatements(component, level) string[]
    }
    
    class formatUtils {
        +formatCurrency(value) string
        +formatPercentage(value) string
        +truncateText(text, length) string
    }
    
    class riskUtils {
        +calculateBusinessImpactLevel(...levels) string
        +getRiskLevelFromImpactLevel(level) string
        +getDefaultComponentImpact(component, level) BusinessImpact
        +getImplementationComplexity(...levels) string
    }
    
    class securityLevelUtils {
        +normalizeSecurityLevel(level) SecurityLevel
        +getSecurityLevelValue(level) number
        +getNextSecurityLevel(level) SecurityLevel
        +getPreviousSecurityLevel(level) SecurityLevel
    }
    
    class typeGuards {
        +isSecurityLevel(value) boolean
        +isCIAComponent(value) boolean
        +isArray(value) boolean
        +isObject(value) boolean
        +isString(value) boolean
        +isNullish(value) boolean
    }
    
    Utils *-- colorUtils
    Utils *-- costCalculationUtils
    Utils *-- businessValueUtils
    Utils *-- formatUtils
    Utils *-- riskUtils
    Utils *-- securityLevelUtils
    Utils *-- typeGuards
```

## 🧰 React Hook Architecture

Custom hooks provide a clean interface for components to access services and manage state:

```mermaid
flowchart TD
    subgraph "React Hooks"
        useCIA[useCIAContentService]
        useComp[useComplianceService]
        useSecMetrics[useSecurityMetricsService]
        useSecRes[useSecurityResourcesService]
        useTech[useTechnicalImplementationService]
    end
    
    subgraph "Services"
        CIA[CIAContentService]
        Comp[ComplianceService]
        SecMetrics[SecurityMetricsService]
        SecRes[SecurityResourceService]
        Tech[TechnicalImplementationService]
    end
    
    subgraph "Components"
        Widgets[Widget Components]
    end
    
    Widgets --> useCIA & useComp & useSecMetrics & useSecRes & useTech
    useCIA --> CIA
    useComp --> Comp
    useSecMetrics --> SecMetrics
    useSecRes --> SecRes
    useTech --> Tech
    
    classDef hook fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#ffffff
    classDef service fill:#1565C0,stroke:#0D47A1,stroke-width:2px,color:#ffffff
    classDef component fill:#2196F3,stroke:#1565C0,stroke-width:2px,color:#ffffff
    
    class useCIA,useComp,useSecMetrics,useSecRes,useTech hook
    class CIA,Comp,SecMetrics,SecRes,Tech service
    class Widgets component
```

## 🔄 Application Data Flow

The diagram below illustrates how data flows through the application:

```mermaid
sequenceDiagram
    participant User
    participant Widget as Widget Components
    participant Hooks as React Hooks
    participant Services as Services
    participant Providers as Data Providers
    participant Data as Static Data Files
    
    User->>Widget: Change security level
    Widget->>Hooks: Call hook with new level
    Hooks->>Services: Forward request
    Services->>Providers: Request data
    Providers->>Data: Access static data
    Data-->>Providers: Return data
    Providers-->>Services: Return formatted data
    Services-->>Hooks: Process & return data
    Hooks-->>Widget: Return processed data
    Widget-->>User: Update UI
```

## 🧪 Testing Architecture

The application uses Vitest for testing with a structured approach to component and service testing:

```mermaid
flowchart TD
    subgraph "Test Types"
        Unit[Unit Tests]
        Component[Component Tests]
        Integration[Integration Tests]
    end
    
    subgraph "Test Utilities"
        Mocks[Mock Services/Hooks]
        TestUtils[Testing Utilities]
        TestData[Test Data]
        TestIDs[Test IDs Constants]
    end
    
    subgraph "Test Coverage"
        Services[Services]
        Hooks[Hooks]
        Widgets[Widgets]
        Common[Common Components]
        Utils[Utilities]
    end
    
    Unit --> Services
    Unit --> Utils
    Component --> Widgets
    Component --> Common
    Integration --> Hooks
    
    Unit & Component & Integration --> Mocks
    Unit & Component & Integration --> TestUtils
    Unit & Component & Integration --> TestData
    Component & Integration --> TestIDs
    
    classDef testType fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#ffffff
    classDef testUtil fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#ffffff
    classDef coverage fill:#2E7D32,stroke:#1B5E20,stroke-width:2px,color:#ffffff
    
    class Unit,Component,Integration testType
    class Mocks,TestUtils,TestData,TestIDs testUtil
    class Services,Hooks,Widgets,Common,Utils coverage
```

## Color Schema

The color schema used throughout these diagrams follows consistent patterns to enhance readability:

| Element Type | Color | Purpose |
|-------------|-------|---------|
| 🔒 Confidentiality | #8e44ad (Purple) | Confidentiality-related components |
| ✓ Integrity | #27ae60 (Green) | Integrity-related components |
| ⏱️ Availability | #2980b9 (Blue) | Availability-related components |
| 🏛️ Core Architecture | #34495e (Dark Blue) | Core architectural elements |
| 🧩 UI Components | #e74c3c (Red) | User interface elements |
| ⚙️ Services | #3498db (Light Blue) | Service layer components |
| 💼 Business Value | #f1c40f (Yellow) | Business impact, value creation |
| 🛠️ Implementation | #16a085 (Teal) | Technical implementation, utilities |
