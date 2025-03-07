# CIA Compliance Manager Architecture

This document serves as the primary entry point for the CIA Compliance Manager's architectural documentation. It provides a comprehensive view of the system's design using the C4 model approach, starting from a high-level system context and drilling down to component interactions.

## 📚 Architecture Documentation Map

<div class="documentation-map">

| Document                                            | Type    | Focus           | Description                                                          |
| --------------------------------------------------- | ------- | --------------- | -------------------------------------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | Core    | 🏛️ Architecture | C4 model showing current system containers, components, and dynamics |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | Future  | 🏛️ Architecture | Vision for context-aware security posture management platform        |
| **[State Diagrams](STATEDIAGRAM.md)**               | Current | 🔄 Behavior     | Security profile and compliance status state transitions             |
| **[Future State Diagrams](FUTURE_STATEDIAGRAM.md)** | Future  | 🔄 Behavior     | Context-aware and adaptive security state transitions                |
| **[Process Flowcharts](FLOWCHART.md)**              | Current | 🔄 Process      | Security assessment and compliance workflows                         |
| **[Future Flowcharts](FUTURE_FLOWCHART.md)**        | Future  | 🔄 Process      | ML-enhanced and context-aware workflows                              |
| **[Mindmaps](MINDMAP.md)**                          | Current | 🧠 Concept      | System structure and component relationships                         |
| **[Future Mindmaps](FUTURE_MINDMAP.md)**            | Future  | 🧠 Concept      | Evolution roadmap and capability expansion                           |
| **[SWOT Analysis](SWOT.md)**                        | Current | 💼 Business     | Strategic strengths, weaknesses, opportunities, and threats          |
| **[Future SWOT Analysis](FUTURE_SWOT.md)**          | Future  | 💼 Business     | Strategic analysis of context-aware security platform                |
| **[CI/CD Workflows](WORKFLOWS.md)**                 | Current | 🔧 DevOps       | Build, test, and deployment automation                               |
| **[Future Workflows](FUTURE_WORKFLOWS.md)**         | Future  | 🔧 DevOps       | Advanced CI/CD with ML and security automation                       |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | Future  | 📊 Data         | Enhanced context-aware data architecture                             |

</div>

## C4 System Context Diagram

**💼 Business Focus:** Illustrates how different stakeholders interact with the system and the external dependencies required for compliance references and cost estimation.

**🔒 Security Focus:** Demonstrates clear boundaries between internal system components and external data sources, establishing the trust boundaries for security analysis.

```mermaid
C4Context
  title System Context diagram for CIA Compliance Manager

  Person(securityOfficer, "Security Officer", "Responsible for implementing and managing security controls")
  Person(businessStakeholder, "Business Stakeholder", "Makes decisions based on security assessments and cost analysis")
  Person(complianceManager, "Compliance Manager", "Ensures adherence to regulatory frameworks")
  Person(technicalImplementer, "Technical Implementer", "Implements security controls based on recommendations")

  System(ciaCM, "CIA Compliance Manager", "Helps organizations assess, implement, and manage security controls across the CIA triad")

  System_Ext(complianceFrameworks, "Compliance Frameworks", "External reference for industry standards like NIST 800-53, ISO 27001, etc.")
  System_Ext(costDatabase, "Cost Reference Database", "Provides industry benchmark costs for security implementations")

  Rel(securityOfficer, ciaCM, "Uses to assess security posture")
  Rel(businessStakeholder, ciaCM, "Uses to make security investment decisions")
  Rel(complianceManager, ciaCM, "Uses to verify compliance status")
  Rel(technicalImplementer, ciaCM, "Uses to get implementation guidance")

  Rel(ciaCM, complianceFrameworks, "Maps security controls to")
  Rel(ciaCM, costDatabase, "References for cost estimations")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  %% Colors and styles
  UpdateRelStyle(securityOfficer, ciaCM, "#1168bd", "bold")
  UpdateRelStyle(businessStakeholder, ciaCM, "#1168bd", "bold")
  UpdateRelStyle(complianceManager, ciaCM, "#1168bd", "bold")
  UpdateRelStyle(technicalImplementer, ciaCM, "#1168bd", "bold")

  UpdateRelStyle(ciaCM, complianceFrameworks, "#707070", "dashed")
  UpdateRelStyle(ciaCM, costDatabase, "#707070", "dashed")

  UpdateElementStyle(securityOfficer, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")
  UpdateElementStyle(businessStakeholder, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")
  UpdateElementStyle(complianceManager, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")
  UpdateElementStyle(technicalImplementer, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")

  UpdateElementStyle(ciaCM, $fontColor="#ffffff", $bgColor="#1168bd", $borderColor="#0b4884")
  UpdateElementStyle(complianceFrameworks, $fontColor="#ffffff", $bgColor="#999999", $borderColor="#6b6b6b")
  UpdateElementStyle(costDatabase, $fontColor="#ffffff", $bgColor="#999999", $borderColor="#6b6b6b")
```

## C4 Container Diagram

**🏛️ Architecture Focus:** Reveals the modular construction of the application with distinct components for security assessment, business impact analysis, cost estimation, and compliance mapping.

**🔧 Technical Focus:** Highlights how the single-page application architecture leverages React and TypeScript to create a responsive, client-side experience with centralized state management.

```mermaid
C4Container
  title Container diagram for CIA Compliance Manager

  Person(securityOfficer, "Security Officer", "Responsible for implementing and managing security controls")
  Person(businessStakeholder, "Business Stakeholder", "Makes decisions based on security assessments and cost analysis")

  System_Boundary(ciaCM, "CIA Compliance Manager") {
    Container(spaFrontend, "Single Page Application", "React, TypeScript, TailwindCSS", "Provides interactive user interface for security assessment and visualization")

    Container(securityAssessment, "Security Assessment Module", "React Components, TypeScript", "Handles CIA triad assessment and security level selection")
    Container(businessImpact, "Business Impact Analysis", "React Components, TypeScript", "Analyzes impact of security implementations on business operations")
    Container(costEstimation, "Cost Estimation Engine", "TypeScript, Chart.js", "Calculates CAPEX and OPEX for security implementations")
    Container(complianceMapping, "Compliance Mapping Engine", "TypeScript", "Maps security controls to compliance frameworks")

    ContainerDb(stateManager, "State Management", "React Context API", "Manages application state and security profiles")
  }

  System_Ext(complianceFrameworks, "Compliance Frameworks", "External systems with compliance requirements")

  Rel(securityOfficer, spaFrontend, "Uses")
  Rel(businessStakeholder, spaFrontend, "Reviews")

  Rel(spaFrontend, securityAssessment, "Uses")
  Rel(spaFrontend, businessImpact, "Uses")
  Rel(spaFrontend, costEstimation, "Uses")
  Rel(spaFrontend, complianceMapping, "Uses")

  Rel(securityAssessment, stateManager, "Reads/Updates")
  Rel(businessImpact, stateManager, "Reads")
  Rel(costEstimation, stateManager, "Reads")
  Rel(complianceMapping, stateManager, "Reads")

  Rel(complianceMapping, complianceFrameworks, "References")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  %% Colors and styles
  UpdateElementStyle(securityOfficer, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")
  UpdateElementStyle(businessStakeholder, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")

  UpdateElementStyle(spaFrontend, $fontColor="#ffffff", $bgColor="#1168bd", $borderColor="#0b4884")
  UpdateElementStyle(securityAssessment, $fontColor="#ffffff", $bgColor="#438dd5", $borderColor="#2e6295")
  UpdateElementStyle(businessImpact, $fontColor="#ffffff", $bgColor="#438dd5", $borderColor="#2e6295")
  UpdateElementStyle(costEstimation, $fontColor="#ffffff", $bgColor="#438dd5", $borderColor="#2e6295")
  UpdateElementStyle(complianceMapping, $fontColor="#ffffff", $bgColor="#438dd5", $borderColor="#2e6295")
  UpdateElementStyle(stateManager, $fontColor="#ffffff", $bgColor="#2a5d89", $borderColor="#1b3a54")

  UpdateElementStyle(complianceFrameworks, $fontColor="#ffffff", $bgColor="#999999", $borderColor="#6b6b6b")

  UpdateRelStyle(securityOfficer, spaFrontend, "#1168bd", "bold")
  UpdateRelStyle(businessStakeholder, spaFrontend, "#1168bd", "bold")

  UpdateRelStyle(spaFrontend, securityAssessment, "#707070", "solid")
  UpdateRelStyle(spaFrontend, businessImpact, "#707070", "solid")
  UpdateRelStyle(spaFrontend, costEstimation, "#707070", "solid")
  UpdateRelStyle(spaFrontend, complianceMapping, "#707070", "solid")

  UpdateRelStyle(securityAssessment, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(businessImpact, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(costEstimation, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(complianceMapping, stateManager, "#4b6cad", "solid")

  UpdateRelStyle(complianceMapping, complianceFrameworks, "#707070", "dashed")
```

## C4 Component Diagram

**🏛️ Architecture Focus:** Demonstrates the internal structure of the Security Assessment Module, showing how individual UI components interact with data repositories and state management.

**🔧 Technical Focus:** Illustrates the component-based approach to security assessment, with specialized components for selection, visualization, calculation, and recommendations.

```mermaid
C4Component
  title Component diagram for Security Assessment Module

  Container_Boundary(securityAssessment, "Security Assessment Module") {
    Component(securityLevelSelector, "Security Level Selector", "React Component", "Allows selection of security levels for CIA components")
    Component(securitySummary, "Security Summary Widget", "React Component", "Displays overall security posture and recommendations")
    Component(ciaImpactAnalysis, "CIA Impact Analysis", "React Component", "Shows detailed impact analysis for each CIA element")
    Component(securityRadarChart, "Security Radar Chart", "Chart.js", "Visualizes security level selections across CIA dimensions")
    Component(securityScoreCalculator, "Security Score Calculator", "TypeScript", "Calculates overall security score based on selections")
    Component(securityRecommendations, "Security Recommendations", "React Component", "Provides actionable security recommendations")

    ComponentDb(securityLevels, "Security Levels Repository", "TypeScript", "Stores definitions of security levels and their characteristics")
  }

  System_Ext(complianceFrameworks, "Compliance Frameworks", "External systems providing compliance requirements")

  Container(stateManager, "State Management", "React Context API", "Manages application state")

  Rel(securityLevelSelector, securityLevels, "Reads levels from")
  Rel(securityLevelSelector, stateManager, "Updates security selections in")
  Rel(securitySummary, stateManager, "Reads security state from")
  Rel(ciaImpactAnalysis, stateManager, "Reads security state from")
  Rel(securityRadarChart, stateManager, "Reads security state from")
  Rel(securityScoreCalculator, stateManager, "Reads security state from")
  Rel(securityRecommendations, securityLevels, "Gets recommendations from")
  Rel(securityRecommendations, complianceFrameworks, "Maps recommendations to")

  UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")

  %% Colors and styles
  UpdateElementStyle(securityLevelSelector, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securitySummary, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(ciaImpactAnalysis, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securityRadarChart, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securityScoreCalculator, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securityRecommendations, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securityLevels, $fontColor="#ffffff", $bgColor="#2a5d89", $borderColor="#1b3a54")
  UpdateElementStyle(stateManager, $fontColor="#ffffff", $bgColor="#2a5d89", $borderColor="#1b3a54")
  UpdateElementStyle(complianceFrameworks, $fontColor="#ffffff", $bgColor="#999999", $borderColor="#6b6b6b")

  UpdateRelStyle(securityLevelSelector, securityLevels, "#707070", "solid")
  UpdateRelStyle(securityLevelSelector, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(securitySummary, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(ciaImpactAnalysis, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(securityRadarChart, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(securityScoreCalculator, stateManager, "#4b6cad", "solid")
  UpdateRelStyle(securityRecommendations, securityLevels, "#707070", "solid")
  UpdateRelStyle(securityRecommendations, complianceFrameworks, "#707070", "dashed")
```

## C4 Dynamic Diagram

**👤 User Experience Focus:** Maps the sequence of interactions from initial security level selection to the display of various business impacts and compliance status.

**📊 Data Flow Focus:** Reveals how changes to security levels propagate through the application state to update multiple visualization components.

```mermaid
C4Dynamic
  title Dynamic diagram for Security Level Assessment

  Person(securityOfficer, "Security Officer", "Responsible for security controls")

  Container_Boundary(ciaCM, "CIA Compliance Manager") {
    Component(securityLevelSelector, "Security Level Selector", "React Component")
    Component(securitySummary, "Security Summary Widget", "React Component")
    Component(ciaImpactAnalysis, "CIA Impact Analysis", "React Component")
    Component(complianceStatus, "Compliance Status Widget", "React Component")
    Component(costEstimation, "Cost Estimation Widget", "React Component")
    ComponentDb(appState, "Application State", "React Context")
  }

  Rel(securityOfficer, securityLevelSelector, "1. Selects security levels")
  Rel(securityLevelSelector, appState, "2. Updates security profile")
  Rel(appState, securitySummary, "3a. Triggers update")
  Rel(appState, ciaImpactAnalysis, "3b. Triggers update")
  Rel(appState, complianceStatus, "3c. Triggers update")
  Rel(appState, costEstimation, "3d. Triggers update")
  Rel(securitySummary, securityOfficer, "4a. Shows security posture")
  Rel(ciaImpactAnalysis, securityOfficer, "4b. Shows business impact")
  Rel(complianceStatus, securityOfficer, "4c. Shows compliance status")
  Rel(costEstimation, securityOfficer, "4d. Shows cost implications")

  %% Colors and styles
  UpdateElementStyle(securityOfficer, $fontColor="#ffffff", $bgColor="#08427b", $borderColor="#052E56")
  UpdateElementStyle(securityLevelSelector, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(securitySummary, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(ciaImpactAnalysis, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(complianceStatus, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(costEstimation, $fontColor="#ffffff", $bgColor="#5ca8e0", $borderColor="#2e6295")
  UpdateElementStyle(appState, $fontColor="#ffffff", $bgColor="#2a5d89", $borderColor="#1b3a54")

  UpdateRelStyle(securityOfficer, securityLevelSelector, "#1168bd", "bold")
  UpdateRelStyle(securityLevelSelector, appState, "#4b6cad", "solid")
  UpdateRelStyle(appState, securitySummary, "#4b6cad", "dashed")
  UpdateRelStyle(appState, ciaImpactAnalysis, "#4b6cad", "dashed")
  UpdateRelStyle(appState, complianceStatus, "#4b6cad", "dashed")
  UpdateRelStyle(appState, costEstimation, "#4b6cad", "dashed")
  UpdateRelStyle(securitySummary, securityOfficer, "#1168bd", "solid")
  UpdateRelStyle(ciaImpactAnalysis, securityOfficer, "#1168bd", "solid")
  UpdateRelStyle(complianceStatus, securityOfficer, "#1168bd", "solid")
  UpdateRelStyle(costEstimation, securityOfficer, "#1168bd", "solid")
```

## Security Architecture Layers

### 1. Application Security

- **Content Security Policy (CSP)**: Restricts resource loading to prevent XSS attacks
- **Security Headers**: Implements modern web security headers (HSTS, X-Content-Type-Options, etc.)
- **Input Validation**: Validates all user inputs before processing
- **Output Sanitization**: Sanitizes data before rendering to prevent XSS
- **Error Handling**: Uses error boundaries to prevent exposing sensitive information

### 2. State Management Security

- **Immutable State**: Ensures state cannot be modified directly
- **State Validation**: Validates state transitions to prevent impossible states
- **Deep Object Freezing**: Prevents accidental state mutations

### 3. Network Security

- **HTTPS Only**: Enforces secure connections
- **API Request Validation**: Validates all API requests
- **Response Validation**: Validates API responses against expected schemas

### 4. Development Security

- **Dependency Scanning**: Automatically scans for vulnerable dependencies
- **Static Code Analysis**: Uses TypeScript strict mode and linting for code quality
- **Secrets Management**: No hardcoded secrets in codebase

## Architecture Color Legend

The color schemes used throughout the C4 diagrams follow these conventions:

| Element Type        | Color                 | Description                                         |
| ------------------- | --------------------- | --------------------------------------------------- |
| Person              | #08427b (Dark Blue)   | External users or roles interacting with the system |
| System              | #1168bd (Blue)        | The main system being described                     |
| Container           | #438dd5 (Medium Blue) | Main application containers within the system       |
| Component           | #5ca8e0 (Light Blue)  | Individual components within containers             |
| Database            | #2a5d89 (Navy Blue)   | Data storage components                             |
| External System     | #999999 (Gray)        | External systems or services                        |
| Active Relationship | #1168bd (Blue)        | User interactions with the system                   |
| Data Flow           | #4b6cad (Steel Blue)  | Data flows between components                       |
| Reference           | #707070 (Dark Gray)   | References to external systems or resources         |

This color scheme provides visual consistency across all architectural diagrams and helps distinguish between different types of components and their relationships.

## Testing Architecture

The CIA Compliance Manager implements comprehensive testing strategies to ensure reliability, security, and quality across all components.

### Unit Testing Strategy

[Unit Test Plan](../UnitTestPlan.md) - Our unit testing approach focuses on isolated component testing with mocked dependencies, using Vitest and React Testing Library. The plan details:

- Test organization and structure
- TestID patterns for reliable element selection
- Different types of component tests (rendering, interaction, state management)
- Best practices for testable components

### End-to-End Testing Strategy

[E2E Test Plan](../E2ETestPlan.md) - Our end-to-end testing strategy uses Cypress to validate complete user flows and business outcomes. The plan covers:

- User-centric testing approaches
- Resilient selector strategies
- Test patterns for business outcomes and user flows
- Custom commands and utilities for stable tests

These testing strategies work together to ensure the CIA Compliance Manager delivers consistent, reliable functionality while maintaining its security controls and architecture integrity.
