# CIA Compliance Manager Flowcharts

This document contains flowcharts that illustrate key processes within the CIA Compliance Manager.

## Security Level Assessment Workflow

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

    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef decision fill:#ffffde,stroke:#333,stroke-width:1px;
    classDef start fill:#d1e0ff,stroke:#333,stroke-width:1px;
    classDef end fill:#d1e0ff,stroke:#333,stroke-width:1px;

    class A,K start;
    class B,H decision;
    class C1,C2,C3,D,E,F,G,I,J process;
```

## Compliance Evaluation Process

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

    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px;
    classDef decision fill:#ffffde,stroke:#333,stroke-width:1px;
    classDef start fill:#d1e0ff,stroke:#333,stroke-width:1px;
    classDef end fill:#d1e0ff,stroke:#333,stroke-width:1px;

    class Start,End start;
    class Frameworks,EvalCompStatus,NextFw decision;
    class GetLevel,MapControls,CheckReqs,MarkCompliant,MarkPartial,MarkNoncomp,GenReport process;
```

These flowcharts illustrate key operational processes within the CIA Compliance Manager application. They provide a clear visual representation of the decision-making and evaluation workflows that users will follow when using the system.
