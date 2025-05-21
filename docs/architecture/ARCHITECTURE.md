# 🏗️ CIA Compliance Manager Architecture

This document provides a comprehensive view of the CIA Compliance Manager architecture using the C4 model, illustrating how components interact to deliver security assessment capabilities.

## 📚 Complete Architecture Documentation Map

<div class="documentation-map">

### Current Architecture

| Document                                          | Focus           | Description                               |
| ------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Architecture](ARCHITECTURE.md)**               | 🏗️ C4 Model     | C4 model showing system structure          |
| **[System Architecture](SYSTEM_ARCHITECTURE.md)** | 🏛️ System       | Layered architecture and component details |
| **[Data Model](DATA_MODEL.md)**                   | 📊 Data         | Current data structures and relationships  |
| **[Widget Analysis](WIDGET_ANALYSIS.md)**         | 🧩 Components   | Detailed widget component analysis        |

### Behavioral Documentation

| Document                                       | Focus           | Description                               |
| ---------------------------------------------- | --------------- | ----------------------------------------- |
| **[State Diagrams](STATEDIAGRAM.md)**          | 🔄 Behavior     | System state transitions                   |
| **[Process Flowcharts](FLOWCHART.md)**         | 🔄 Process      | Security assessment workflows              |
| **[Mindmaps](MINDMAP.md)**                     | 🧠 Concept      | System component relationships             |

### Business & Operations

| Document                                       | Focus           | Description                               |
| ---------------------------------------------- | --------------- | ----------------------------------------- |
| **[SWOT Analysis](SWOT.md)**                  | 💼 Business     | Strategic business assessment              |
| **[BCP Plan](BCPPlan.md)**                    | 🔄 Recovery     | Business continuity planning               |
| **[Workflows](WORKFLOWS.md)**                 | 🚀 DevOps       | CI/CD and development workflows            |

### Guidelines & Standards

| Document                                                   | Focus           | Description                               |
| ---------------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Style Guide](STYLE_GUIDE.md)**                          | 🎨 Style        | Documentation style guidelines             |
| **[Contribution Guidelines](CONTRIBUTION_GUIDELINES.md)**  | 📋 Guidelines   | Documentation contribution process         |

### Future Architecture

| Document                                               | Focus           | Description                               |
| ------------------------------------------------------ | --------------- | ----------------------------------------- |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**      | 🚀 Evolution    | Vision for platform evolution              |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**          | 🚀 Data         | Future data architecture vision            |
| **[Future Workflows](FUTURE_WORKFLOWS.md)**            | 🔄 DevOps       | Future CI/CD and development workflows     |
| **[Future SWOT](FUTURE_SWOT.md)**                      | 💼 Business     | Future strategic business assessment       |
| **[Future State Diagrams](FUTURE_STATEDIAGRAM.md)**    | 🔄 Behavior     | Future system state transitions            |
| **[Future Mindmaps](FUTURE_MINDMAP.md)**               | 🧠 Concept      | Future system component relationships      |
| **[Future Flowcharts](FUTURE_FLOWCHART.md)**           | 🔄 Process      | Future security assessment workflows       |

</div>

## 🌐 System Context

The CIA Compliance Manager operates within the broader context of an organization's security governance ecosystem.

```mermaid
C4Context
  title System Context Diagram for CIA Compliance Manager

  Person(securityOfficer, "Security Officer", "Manages security levels and reviews assessment results")
  Person(complianceManager, "Compliance Manager", "Ensures regulatory compliance and manages frameworks")
  Person(executiveStakeholder, "Executive Stakeholder", "Reviews business impacts and approves security investments")
  
  System(ciaManager, "CIA Compliance Manager", "Security assessment and compliance mapping platform")
  
  System_Ext(grcSystem, "GRC Platform", "Governance, Risk, and Compliance management")
  System_Ext(cmdb, "CMDB", "Configuration Management Database")
  System_Ext(siemSystem, "SIEM Solution", "Security Information and Event Management")

  Rel(securityOfficer, ciaManager, "Configures security levels and reviews assessments")
  Rel(complianceManager, ciaManager, "Maps security controls to compliance frameworks")
  Rel(executiveStakeholder, ciaManager, "Reviews business impact and investment reports")
  
  Rel(ciaManager, grcSystem, "Could integrate with (future)")
  Rel(ciaManager, cmdb, "Could reference asset information from (future)")
  Rel(ciaManager, siemSystem, "Could provide security recommendations for (future)")

  UpdateLayoutConfig($c4ShapeInRow="2", $c4BoundaryInRow="1")
```

## 🏢 Container View

The CIA Compliance Manager consists of several interconnected containers that provide its core functionality.

```mermaid
C4Container
    title Container Diagram - CIA Compliance Manager

    Person(securityOfficer, "Security Officer", "Manages security levels and reviews assessment results")
    
    System_Boundary(ciaManager, "CIA Compliance Manager") {
        Container(frontend, "Frontend Application", "React.js, TypeScript", "Web interface for security assessment and visualization")
        ContainerDb(staticData, "Static Data", "TypeScript Files", "Static security data, controls and framework information")
    }
    
    Rel(securityOfficer, frontend, "Uses")
    Rel(frontend, staticData, "Reads from", "Import")
    
    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
```

## 🧩 Component View

The frontend application is composed of specialized components organized by domain functionality.

```mermaid
C4Component
    title Component Diagram - Frontend Application

    Container_Boundary(frontend, "Frontend Application") {
        Component(slWidget, "Security Level Widget", "React, TypeScript", "Core configuration widget for CIA security levels")
        
        Component(assessmentWidgets, "Assessment Widgets", "React, TypeScript", "Security summary and business impact analysis")
        Component(businessWidgets, "Business Value Widgets", "React, TypeScript", "Compliance status, cost estimation, and value creation")
        Component(impactWidgets, "Impact Analysis Widgets", "React, TypeScript", "CIA component-specific impact analysis")
        Component(implWidgets, "Implementation Widgets", "React, TypeScript", "Technical details and security resources")
        
        Component(serviceLayer, "Service Layer", "TypeScript", "Business logic and data processing services")
        Component(dataProvider, "Data Provider", "TypeScript", "Provides security controls data and configuration")
        Component(utilityLayer, "Utility Layer", "TypeScript", "Shared utility functions for calculations and formatting")
    }

    Rel(slWidget, assessmentWidgets, "Provides security levels to")
    Rel(slWidget, businessWidgets, "Provides security levels to")
    Rel(slWidget, impactWidgets, "Provides security levels to")
    Rel(slWidget, implWidgets, "Provides security levels to")
    
    Rel(assessmentWidgets, serviceLayer, "Uses")
    Rel(businessWidgets, serviceLayer, "Uses")
    Rel(impactWidgets, serviceLayer, "Uses")
    Rel(implWidgets, serviceLayer, "Uses")
    
    Rel(serviceLayer, dataProvider, "Retrieves data from")
    Rel(serviceLayer, utilityLayer, "Uses")
    
    Rel(assessmentWidgets, utilityLayer, "Uses")
    Rel(businessWidgets, utilityLayer, "Uses")
    Rel(impactWidgets, utilityLayer, "Uses")
    Rel(implWidgets, utilityLayer, "Uses")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## 🔍 Service Component Diagram

This diagram shows the detailed structure of the service layer:

```mermaid
C4Component
    title Component Diagram - Service Layer

    Container_Boundary(services, "Service Layer") {
        Component(baseService, "BaseService", "TypeScript", "Base service with common functionality")
        Component(ciaContentService, "CIAContentService", "TypeScript", "Orchestrates access to CIA triad content")
        Component(businessImpactService, "BusinessImpactService", "TypeScript", "Handles business impact calculations")
        Component(complianceService, "ComplianceService", "TypeScript", "Manages compliance framework mapping")
        Component(securityMetricsService, "SecurityMetricsService", "TypeScript", "Calculates security metrics and scores")
        Component(technicalImplService, "TechnicalImplementationService", "TypeScript", "Provides implementation guidance")
        Component(securityResourceService, "SecurityResourceService", "TypeScript", "Manages security resource references")
    }

    Container_Boundary(dataLayer, "Data Layer") {
        Component(dataProvider, "CIADataProvider", "TypeScript", "Data provider interface")
        Component(defaultProvider, "DefaultDataProvider", "TypeScript", "Default implementation using static data")
        Component(staticData, "StaticDataFiles", "TypeScript", "JSON/TS data files for CIA components")
    }

    Rel(ciaContentService, baseService, "Extends")
    Rel(businessImpactService, baseService, "Extends")
    Rel(complianceService, baseService, "Extends")
    Rel(securityMetricsService, baseService, "Extends")
    Rel(technicalImplService, baseService, "Extends")
    Rel(securityResourceService, baseService, "Extends")
    
    Rel(ciaContentService, businessImpactService, "Uses")
    Rel(ciaContentService, complianceService, "Uses")
    Rel(ciaContentService, securityMetricsService, "Uses")
    Rel(ciaContentService, technicalImplService, "Uses")
    Rel(ciaContentService, securityResourceService, "Uses")
    
    Rel(baseService, dataProvider, "Uses")
    Rel(dataProvider, defaultProvider, "Implemented by")
    Rel(defaultProvider, staticData, "Reads from")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## 🧩 Widget Components Structure

This diagram shows the structure of the widget components:

```mermaid
C4Component
    title Component Diagram - Widget Components

    Container_Boundary(widgets, "Widget Components") {
        Component(widgetBase, "WidgetContainer", "React, TypeScript", "Base container for all widgets")
        
        Component(securityLevel, "SecurityLevelWidget", "React, TypeScript", "Core configuration widget")
        
        Component(securitySummary, "SecuritySummaryWidget", "React, TypeScript", "Overall security summary")
        Component(businessImpact, "BusinessImpactAnalysisWidget", "React, TypeScript", "Business impact analysis")
        
        Component(complianceStatus, "ComplianceStatusWidget", "React, TypeScript", "Compliance status and mapping")
        Component(costEstimation, "CostEstimationWidget", "React, TypeScript", "Implementation cost estimates")
        Component(valueCreation, "ValueCreationWidget", "React, TypeScript", "Business value metrics")
        
        Component(confidentiality, "ConfidentialityImpactWidget", "React, TypeScript", "Confidentiality impact")
        Component(integrity, "IntegrityImpactWidget", "React, TypeScript", "Integrity impact")
        Component(availability, "AvailabilityImpactWidget", "React, TypeScript", "Availability impact")
        
        Component(technicalDetails, "TechnicalDetailsWidget", "React, TypeScript", "Technical implementation details")
        Component(securityResources, "SecurityResourcesWidget", "React, TypeScript", "Security implementation resources")
        Component(securityVis, "SecurityVisualizationWidget", "React, TypeScript", "Security metrics visualization")
    }

    Rel(securitySummary, widgetBase, "Uses")
    Rel(businessImpact, widgetBase, "Uses")
    Rel(complianceStatus, widgetBase, "Uses")
    Rel(costEstimation, widgetBase, "Uses")
    Rel(valueCreation, widgetBase, "Uses")
    Rel(confidentiality, widgetBase, "Uses")
    Rel(integrity, widgetBase, "Uses")
    Rel(availability, widgetBase, "Uses")
    Rel(technicalDetails, widgetBase, "Uses")
    Rel(securityResources, widgetBase, "Uses")
    Rel(securityVis, widgetBase, "Uses")
    Rel(securityLevel, widgetBase, "Uses")

    UpdateLayoutConfig($c4ShapeInRow="4", $c4BoundaryInRow="1")
```

## 🪝 React Hooks Structure

This diagram shows the custom React hooks that bridge components and services:

```mermaid
C4Component
    title Component Diagram - React Hooks

    Container_Boundary(hooks, "React Hooks") {
        Component(useCIAContent, "useCIAContentService", "React, TypeScript", "Hook for CIA content service")
        Component(useCompliance, "useComplianceService", "React, TypeScript", "Hook for compliance service")
        Component(useSecurityMetrics, "useSecurityMetricsService", "React, TypeScript", "Hook for security metrics")
        Component(useTechnical, "useTechnicalImplementationService", "React, TypeScript", "Hook for technical implementation")
        Component(useResources, "useSecurityResourcesService", "React, TypeScript", "Hook for security resources")
    }

    Container_Boundary(services, "Services") {
        Component(ciaContentService, "CIAContentService", "TypeScript")
        Component(complianceService, "ComplianceService", "TypeScript")
        Component(securityMetricsService, "SecurityMetricsService", "TypeScript")
        Component(technicalImplService, "TechnicalImplementationService", "TypeScript")
        Component(securityResourceService, "SecurityResourceService", "TypeScript")
    }

    Container_Boundary(components, "Components") {
        Component(widgets, "Widget Components", "React")
    }

    Rel(widgets, useCIAContent, "Uses")
    Rel(widgets, useCompliance, "Uses")
    Rel(widgets, useSecurityMetrics, "Uses")
    Rel(widgets, useTechnical, "Uses")
    Rel(widgets, useResources, "Uses")
    
    Rel(useCIAContent, ciaContentService, "Provides")
    Rel(useCompliance, complianceService, "Provides")
    Rel(useSecurityMetrics, securityMetricsService, "Provides")
    Rel(useTechnical, technicalImplService, "Provides")
    Rel(useResources, securityResourceService, "Provides")

    UpdateLayoutConfig($c4ShapeInRow="5", $c4BoundaryInRow="1")
```

## 📊 Key Architecture Decisions

### Architecture Decision Records

| ID | Decision | Rationale |
|----|----------|-----------|
| ADR-001 | Widget-Based UI Architecture | Enables modular development and clear separation of concerns between different security assessment areas |
| ADR-002 | Static Data in TypeScript Files | Simplifies initial development and enables type safety without requiring a database |
| ADR-003 | Service Layer with Hooks | Provides clean API between UI components and business logic with React-idiomatic state management |
| ADR-004 | CIA Triad as Organizational Principle | Aligns with industry-standard security model and provides intuitive organization for security controls |
| ADR-005 | Multiple Views of Security (Technical, Business) | Addresses needs of different stakeholders, from technical implementers to business decision makers |

### Key Quality Attributes

| Quality Attribute | Support in Current Architecture |
|-------------------|--------------------------------|
| Modularity | Achieved through widget-based organization and service layer |
| Maintainability | Supported by TypeScript typing, consistent patterns, and clear interfaces |
| Extensibility | Enabled by service abstractions and data provider pattern |
| Performance | Basic performance considerations with React best practices |
| Security | Security-focused design reflects security best practices in application itself |
| Usability | Widget-based UI with consistent styling and interaction patterns |

## 🔍 Business View of Architecture 

### Stakeholder Alignment

```mermaid
flowchart TD
    SLW[Security Level Widget] --- SO[Security Officer]
    
    SSW[Security Summary Widget] --- CSO[Chief Security Officer]
    BIAW[Business Impact Analysis Widget] --- CSO
    
    CIW[CIA Impact Widgets] --- ST[Security Team]
    
    CSW[Compliance Status Widget] --- CO[Compliance Officer]
    
    CEW[Cost Estimation Widget] --- CFO[Finance Officer]
    VCW[Value Creation Widget] --- CFO & CEO[Executive Team]
    
    TDW[Technical Details Widget] --- IT[IT Implementation Team]
    SRW[Security Resources Widget] --- IT
    
    classDef stakeholder fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef widget fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class SO,CSO,ST,CO,CFO,CEO,IT stakeholder
    class SLW,SSW,BIAW,CIW,CSW,CEW,VCW,TDW,SRW widget
```

### Business Value Map

```mermaid
flowchart TD
    SL[Security Levels] -->|enables| RA[Risk Assessment]
    SL -->|enables| CI[Compliance Implementation] 
    SL -->|enables| SC[Security Controls]
    
    RA -->|provides| RI[Risk Insights]
    CI -->|ensures| RC[Regulatory Compliance]
    SC -->|delivers| SP[Security Posture]
    
    RI & RC & SP -->|create| BV[Business Value]
    
    BV -->|through| RL[Risk Reduction]
    BV -->|through| BC[Business Continuity]
    BV -->|through| CT[Customer Trust]
    BV -->|through| CD[Competitive Differentiation]
    BV -->|through| CA[Compliance Assurance]
    
    classDef input fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef output fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef value fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef benefit fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    
    class SL input
    class RA,CI,SC process
    class RI,RC,SP output
    class BV value
    class RL,BC,CT,CD,CA benefit
```

## Current Architecture Constraints

1. **Static Data Only**: The current implementation uses static TypeScript data files without database persistence
2. **Single-User Focus**: No multi-user or collaborative features are currently implemented  
3. **Client-Side Processing**: All processing occurs in the browser without server-side components
4. **Limited Customization**: Security metrics and frameworks are pre-defined without custom framework support
5. **No Authentication**: No user authentication or authorization system is currently implemented
