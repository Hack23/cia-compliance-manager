# CIA Compliance Manager Flowcharts

This document contains flowcharts that illustrate key processes within the CIA Compliance Manager.

## 📚 Related Architecture Documentation

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | 🏛️ Architecture | C4 model showing current system structure |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🏛️ Architecture | Vision for context-aware platform         |
| **[State Diagrams](STATEDIAGRAM.md)**               | 🔄 Behavior     | Current system state transitions          |
| **[Future State Diagrams](FUTURE_STATEDIAGRAM.md)** | 🔄 Behavior     | Enhanced adaptive state transitions       |
| **[Future Flowcharts](FUTURE_FLOWCHART.md)**        | 🔄 Process      | Enhanced context-aware workflows          |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | Current system component relationships    |
| **[Future Mindmaps](FUTURE_MINDMAP.md)**            | 🧠 Concept      | Future capability evolution               |
| **[SWOT Analysis](SWOT.md)**                        | 💼 Business     | Current strategic assessment              |
| **[Future SWOT Analysis](FUTURE_SWOT.md)**          | 💼 Business     | Future strategic opportunities            |
| **[CI/CD Workflows](WORKFLOWS.md)**                 | 🔧 DevOps       | Current automation processes              |
| **[Future Workflows](FUTURE_WORKFLOWS.md)**         | 🔧 DevOps       | Enhanced CI/CD with ML                    |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 📊 Data         | Context-aware data architecture           |

</div>

## Security Level Assessment Workflow

**💼 Business Focus:** Maps the decision process from security domain selection through business impact analysis, compliance evaluation, and cost calculation to final recommendations.

**👤 User Journey Focus:** Illustrates the complete user flow for conducting a security assessment, showing decision points and alternative paths based on implementation choices.

```mermaid
flowchart TD
    A[Start Assessment] --> B{Select Security Domain}
    B -->|Availability| C1[Set Availability Level]
    B -->|Integrity| C2[Set Integrity Level]
    B -->|Confidentiality| C3[Set Confidentiality Level]

    C1 --> D[Calculate Business Impact]
    C2 --> D
    C3 --> D

    D --> E[Evaluate Compliance Status]
    E --> F[Calculate Implementation Costs]
    F --> G[Generate Recommendations]

    G --> H{Implementation Decision}
    H -->|Implement| I[Create Implementation Plan]
    H -->|Adjust| B
    H -->|Report Only| J[Generate Security Report]

    I --> K[End Assessment]
    J --> K

    classDef startNode fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef endNode fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef domain fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef cost fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef report fill:#bbdefb,stroke:#333,stroke-width:1px,color:black

    class A,K startNode
    class B,H decision
    class C1,C2,C3 domain
    class D,E process
    class F cost
    class G,I,J report
```

## Compliance Evaluation Process

**📋 Regulatory Focus:** Shows the step-by-step process of evaluating compliance status against multiple frameworks based on implemented security controls.

**📊 Reporting Focus:** Illustrates how compliance findings are aggregated across frameworks to generate comprehensive compliance reports and status indicators.

```mermaid
flowchart TD
    Start[Start Compliance Check] --> GetLevel[Get Security Levels]
    GetLevel --> MapControls[Map Security Controls to Frameworks]

    MapControls --> Frameworks{For Each Framework}
    Frameworks --> CheckReqs[Check Requirements]
    CheckReqs --> EvalCompStatus{Evaluate Status}

    EvalCompStatus -->|All Requirements Met| MarkCompliant[Mark as Compliant]
    EvalCompStatus -->|Some Requirements Met| MarkPartial[Mark as Partial]
    EvalCompStatus -->|No Requirements Met| MarkNoncomp[Mark as Non-Compliant]

    MarkCompliant --> NextFw{More Frameworks?}
    MarkPartial --> NextFw
    MarkNoncomp --> NextFw

    NextFw -->|Yes| Frameworks
    NextFw -->|No| GenReport[Generate Compliance Report]
    GenReport --> End[End Compliance Check]

    classDef startNode fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef endNode fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef compliant fill:#66cc66,stroke:#333,stroke-width:1px,color:white
    classDef partial fill:#ffcc66,stroke:#333,stroke-width:1px,color:black
    classDef noncomp fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef report fill:#bbdefb,stroke:#333,stroke-width:1px,color:black

    class Start,End startNode
    class Frameworks,EvalCompStatus,NextFw decision
    class GetLevel,MapControls,CheckReqs process
    class MarkCompliant compliant
    class MarkPartial partial
    class MarkNoncomp noncomp
    class GenReport report
```

<div class="diagram-legend">
These flowcharts illustrate key operational processes within the CIA Compliance Manager application. The color scheme provides visual distinction between different types of process steps:

- 🔵 Blue represents start/end points and report generation
- 🟡 Yellow/orange indicates decision points
- 🟢 Green indicates compliance status
- 🔴 Red indicates non-compliance
- 🟣 Purple highlights cost-related calculations
</div>
