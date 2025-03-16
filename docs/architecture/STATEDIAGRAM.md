# CIA Compliance Manager State Diagrams

This document contains state diagrams that illustrate key states and transitions within the CIA Compliance Manager.

## 📚 Related Architecture Documentation

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | 🏛️ Architecture | C4 model showing current system structure |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🏛️ Architecture | Vision for context-aware platform         |
| **[Future State Diagrams](FUTURE_STATEDIAGRAM.md)** | 🔄 Behavior     | Enhanced adaptive state transitions       |
| **[Process Flowcharts](FLOWCHART.md)**              | 🔄 Process      | Current security workflows                |
| **[Future Flowcharts](FUTURE_FLOWCHART.md)**        | 🔄 Process      | Enhanced context-aware workflows          |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | Current system component relationships    |
| **[Future Mindmaps](FUTURE_MINDMAP.md)**            | 🧠 Concept      | Future capability evolution               |
| **[SWOT Analysis](SWOT.md)**                        | 💼 Business     | Current strategic assessment              |
| **[Future SWOT Analysis](FUTURE_SWOT.md)**          | 💼 Business     | Future strategic opportunities            |
| **[CI/CD Workflows](WORKFLOWS.md)**                 | 🔧 DevOps       | Current automation processes              |
| **[Future Workflows](FUTURE_WORKFLOWS.md)**         | 🔧 DevOps       | Enhanced CI/CD with ML                    |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 📊 Data         | Context-aware data architecture           |

</div>

## Security Profile State Diagram

**🔒 Security Focus:** Illustrates the states and transitions of a security profile as security levels are configured and updated.

**🔄 State Transition Focus:** Shows how security profiles evolve from initialization to completeness, with transitions triggered by user actions.

```mermaid
stateDiagram-v2
    [*] --> Initialized: Create Security Profile
    Initialized --> PartiallyConfigured: Set First Security Level
    PartiallyConfigured --> PartiallyConfigured: Set Additional Security Level
    PartiallyConfigured --> Configured: Set All Security Levels
    Configured --> Analyzed: Calculate Business Impact
    Analyzed --> ComplianceMapped: Map to Compliance Frameworks
    ComplianceMapped --> CostEstimated: Calculate Implementation Costs
    CostEstimated --> RecommendationsGenerated: Generate Recommendations
    RecommendationsGenerated --> Implemented: Implement Recommendations
    RecommendationsGenerated --> [*]: Export Report Only
    Implemented --> [*]: Complete Implementation

    Configured --> Configured: Update Security Level
    Analyzed --> Analyzed: Recalculate Impact
    ComplianceMapped --> ComplianceMapped: Update Compliance Mapping
    CostEstimated --> CostEstimated: Update Cost Estimates

    %% Cool color scheme
    classDef default fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef analysis fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef action fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef end fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class Initialized,PartiallyConfigured,Configured default
    class Analyzed,ComplianceMapped analysis
    class CostEstimated,RecommendationsGenerated action
    class Implemented end
    class [*] start
```

## Compliance Status State Diagram

**📋 Compliance Focus:** Illustrates how compliance status changes based on security level selections and framework requirements.

**🚦 Status Transition Focus:** Shows the transitions between different compliance states and the actions that trigger them.

```mermaid
stateDiagram-v2
    [*] --> NotEvaluated: Initialize Compliance Status
    NotEvaluated --> Evaluating: Select Security Levels
    Evaluating --> NonCompliant: All Levels Below Requirements
    Evaluating --> PartiallyCompliant: Some Levels Meet Requirements
    Evaluating --> Compliant: All Levels Meet Requirements

    NonCompliant --> Evaluating: Update Security Levels
    PartiallyCompliant --> Evaluating: Update Security Levels
    Compliant --> Evaluating: Update Security Levels

    NonCompliant --> RemediationPlanned: Create Remediation Plan
    RemediationPlanned --> RemediationInProgress: Begin Remediation
    RemediationInProgress --> RemediationInProgress: Continue Remediation
    RemediationInProgress --> PartiallyCompliant: Partial Remediation Complete
    RemediationInProgress --> Compliant: Full Remediation Complete

    Compliant --> [*]: Generate Compliance Report
    PartiallyCompliant --> [*]: Generate Partial Compliance Report
    NonCompliant --> [*]: Generate Non-Compliance Report

    %% Cool color scheme
    classDef default fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef noncompliant fill:#f8cecc,stroke:#333,stroke-width:1px,color:black
    classDef partial fill:#fff2cc,stroke:#333,stroke-width:1px,color:black
    classDef compliant fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef remediation fill:#dae8fc,stroke:#333,stroke-width:1px,color:black

    class NotEvaluated,Evaluating default
    class NonCompliant noncompliant
    class PartiallyCompliant partial
    class Compliant compliant
    class RemediationPlanned,RemediationInProgress remediation
    class [*] start
```

## Widget State Diagram

**🖥️ UI Focus:** Illustrates the states of dashboard widgets as they respond to security level changes and user interactions.

**🔄 Data Flow Focus:** Shows how widgets update in response to data changes and user-initiated actions.

```mermaid
stateDiagram-v2
    [*] --> Initialized: Widget Mounted
    Initialized --> Loading: Request Data
    Loading --> Error: Data Error
    Loading --> DataReceived: Data Loaded
    DataReceived --> Rendered: Render Widget
    Rendered --> Interactive: Enable Interactions

    Interactive --> Updating: User Interaction
    Updating --> Loading: Request New Data

    Interactive --> Filtering: Apply Filter
    Filtering --> Rendered: Update Display

    Interactive --> Expanding: Expand Detail View
    Expanding --> Expanded: Show Details
    Expanded --> Interactive: Collapse View

    Interactive --> Exporting: Export Data
    Exporting --> Interactive: Export Complete

    Error --> Loading: Retry
    Error --> [*]: Unmount
    Interactive --> [*]: Unmount

    %% Cool color scheme
    classDef default fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef loading fill:#fff2cc,stroke:#333,stroke-width:1px,color:black
    classDef data fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef interaction fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef error fill:#f8cecc,stroke:#333,stroke-width:1px,color:black

    class Initialized,Rendered default
    class Loading,Updating,Filtering,Expanding,Exporting loading
    class DataReceived,Exported data
    class Interactive,Expanded interaction
    class Error error
    class [*] start
```

<div class="diagram-legend">
These state diagrams illustrate the various states and transitions that occur within the CIA Compliance Manager application. They provide a visual representation of how different components of the system change state in response to user actions and data updates, offering insights into the application's behavior over time.
</div>
