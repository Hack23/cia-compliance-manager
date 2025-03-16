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

    I --> K[Execute Plan]
    J --> L[Export Report]
    K --> M[Review Results]
    L --> M
    M --> N{Continue Improvement?}
    N -->|Yes| B
    N -->|No| O[End Assessment]

    %% Cool color scheme
    classDef startState fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef action fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef endState fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class A,O startState
    class C1,C2,C3,D,E,F,G process
    class B,H,N decision
    class I,J,K,L,M action
```

## Compliance Evaluation Process

**📋 Compliance Focus:** Illustrates how security levels are mapped to compliance frameworks to determine compliance status.

**🔄 Process Focus:** Shows the step-by-step process of evaluating compliance based on security levels and generating remediation recommendations.

```mermaid
flowchart TD
    A[Start Compliance Evaluation] --> B[Get Current Security Levels]
    B --> C[Map Levels to Framework Controls]
    C --> D[Compare with Framework Requirements]
    D --> E{Framework Requirements Met?}

    E -->|Yes| F1[Mark Framework as Compliant]
    E -->|Partially| F2[Mark Framework as Partially Compliant]
    E -->|No| F3[Mark Framework as Non-Compliant]

    F1 & F2 & F3 --> G[Identify Compliance Gaps]
    G --> H[Generate Remediation Recommendations]
    H --> I{Multiple Frameworks?}

    I -->|Yes, Next Framework| C
    I -->|No, Complete| J[Calculate Overall Compliance Score]
    J --> K[Generate Compliance Report]
    K --> L[End Compliance Evaluation]

    %% Cool color scheme
    classDef startState fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef status fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef endState fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class A,L startState
    class B,C,D,G,H,J,K process
    class E,I decision
    class F1,F2,F3 status
```

## Cost Estimation Workflow

**💰 Financial Focus:** Illustrates the process of calculating implementation costs for security controls.

**📊 ROI Focus:** Shows how costs are analyzed alongside security benefits to determine return on investment.

```mermaid
flowchart TD
    A[Begin Cost Estimation] --> B[Get Selected Security Levels]
    B --> C1[Calculate CAPEX]
    B --> C2[Calculate OPEX]

    C1 --> D[Apply Organization Size Multiplier]
    C2 --> D
    D --> E[Calculate Total Cost of Ownership]

    E --> F[Estimate Expected Loss Value]
    F --> G[Calculate Risk Reduction]
    G --> H[Determine ROI]

    H --> I{Positive ROI?}
    I -->|Yes| J1[Flag as Recommended Investment]
    I -->|No| J2[Flag for Cost-Benefit Review]

    J1 --> K[Generate Cost Report]
    J2 --> K
    K --> L[End Cost Estimation]

    %% Cool color scheme
    classDef startState fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef calc fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef result fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef endState fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class A,L startState
    class B,C1,C2,D,E,F,G,H calc
    class I decision
    class J1,J2,K result
```

<div class="diagram-legend">
These flowcharts provide a visual representation of the key processes within the CIA Compliance Manager. They illustrate the decision flows and process steps that users typically follow when working with the application, from security assessment to compliance evaluation and cost estimation.
</div>
