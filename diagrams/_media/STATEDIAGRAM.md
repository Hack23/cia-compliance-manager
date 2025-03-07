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

**💼 Business Focus:** Demonstrates how organizations can progress through increasingly mature security implementations, with corresponding improvements in compliance status and risk reduction.

**🔒 Security Focus:** Illustrates the relationship between security controls implementation and resulting risk posture, showing clear transitions between different security maturity levels.

```mermaid
stateDiagram-v2
    [*] --> NoSecurity: Initialize

    state "No Security" as NoSecurity {
      [*] --> NoSecurity_inner
      state "Security Level: None<br/>Compliance: Non-Compliant<br/>Risk: Critical" as NoSecurity_inner
    }

    state "Basic Security" as BasicSecurity {
      [*] --> BasicSecurity_inner
      state "Security Level: Low<br/>Compliance: Minimal<br/>Risk: High" as BasicSecurity_inner
    }

    state "Moderate Security" as ModerateSecurity {
      [*] --> ModerateSecurity_inner
      state "Security Level: Moderate<br/>Compliance: Partial<br/>Risk: Medium" as ModerateSecurity_inner
    }

    state "High Security" as HighSecurity {
      [*] --> HighSecurity_inner
      state "Security Level: High<br/>Compliance: Standard<br/>Risk: Low" as HighSecurity_inner
    }

    state "Very High Security" as VeryHighSecurity {
      [*] --> VeryHighSecurity_inner
      state "Security Level: Very High<br/>Compliance: Full<br/>Risk: Minimal" as VeryHighSecurity_inner
    }

    NoSecurity --> BasicSecurity: Implement Basic Controls
    BasicSecurity --> ModerateSecurity: Upgrade to Moderate
    ModerateSecurity --> HighSecurity: Upgrade to High
    HighSecurity --> VeryHighSecurity: Upgrade to Very High

    VeryHighSecurity --> HighSecurity: Reduce Security
    HighSecurity --> ModerateSecurity: Reduce Security
    ModerateSecurity --> BasicSecurity: Reduce Security
    BasicSecurity --> NoSecurity: Remove Controls

    classDef noSecurity fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef basicSecurity fill:#ffb366,stroke:#333,stroke-width:1px,color:white
    classDef moderateSecurity fill:#ffff66,stroke:#333,stroke-width:1px,color:black
    classDef highSecurity fill:#99cc66,stroke:#333,stroke-width:1px,color:white
    classDef veryHighSecurity fill:#66cc66,stroke:#333,stroke-width:1px,color:white

    class NoSecurity noSecurity
    class BasicSecurity basicSecurity
    class ModerateSecurity moderateSecurity
    class HighSecurity highSecurity
    class VeryHighSecurity veryHighSecurity
```

## Compliance Status State Diagram

**💼 Business Focus:** Shows how compliance status evolves based on control implementation, helping organizations visualize their compliance journey and the steps needed to achieve full compliance.

**📋 Regulatory Focus:** Illustrates the assessment workflow and status changes that occur during compliance evaluation, including the relationship between control implementation and compliance achievement.

```mermaid
stateDiagram-v2
    [*] --> Initial: Start Assessment

    state "Initial" as Initial {
      [*] --> Initial_inner
      state "No compliance checks run" as Initial_inner
    }

    state "Non-Compliant" as NonCompliant {
      [*] --> NonCompliant_inner
      state "Status: Non-Compliant<br/>Risk Level: High<br/>Frameworks: 0%" as NonCompliant_inner
    }

    state "Partially Compliant" as PartiallyCompliant {
      [*] --> PartiallyCompliant_inner
      state "Status: Partially Compliant<br/>Risk Level: Medium<br/>Frameworks: Varies" as PartiallyCompliant_inner
    }

    state "Compliant" as Compliant {
      [*] --> Compliant_inner
      state "Status: Compliant<br/>Risk Level: Low<br/>Frameworks: 100%" as Compliant_inner
    }

    Initial --> NonCompliant: Insufficient Controls
    Initial --> PartiallyCompliant: Some Controls
    Initial --> Compliant: All Required Controls

    NonCompliant --> PartiallyCompliant: Add Controls
    PartiallyCompliant --> Compliant: Complete Implementation

    Compliant --> PartiallyCompliant: Controls Degraded
    PartiallyCompliant --> NonCompliant: Controls Removed

    NonCompliant --> [*]: End Assessment
    PartiallyCompliant --> [*]: End Assessment
    Compliant --> [*]: End Assessment

    classDef initial fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef nonCompliant fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef partiallyCompliant fill:#ffcc66,stroke:#333,stroke-width:1px,color:black
    classDef compliant fill:#66cc66,stroke:#333,stroke-width:1px,color:white

    class Initial initial
    class NonCompliant nonCompliant
    class PartiallyCompliant partiallyCompliant
    class Compliant compliant
```

<div class="diagram-legend">
These state diagrams illustrate the different security states a system can transition through and how the compliance status changes based on the implementation of security controls. They help visualize the progression from low to high security levels and the corresponding changes in compliance status. The color scheme provides immediate visual feedback about the risk level and compliance status:

- 🔴 Red indicates critical/high risk or non-compliance
- 🟠 Orange/Yellow represents moderate risk or partial compliance
- 🟢 Green shows low/minimal risk or full compliance
- 🔵 Blue is used for neutral or initial states
</div>
