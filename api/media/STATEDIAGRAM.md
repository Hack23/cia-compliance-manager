# CIA Compliance Manager State Diagrams

This document contains state diagrams that illustrate key states and transitions within the CIA Compliance Manager.

## Security Profile State Diagram

```mermaid
stateDiagram-v2
    [*] --> NoSecurity: Initialize

    NoSecurity: Security Level: None
    NoSecurity: Compliance: Non-Compliant
    NoSecurity: Risk: Critical

    BasicSecurity: Security Level: Low
    BasicSecurity: Compliance: Minimal
    BasicSecurity: Risk: High

    ModerateSecurity: Security Level: Moderate
    ModerateSecurity: Compliance: Partial
    ModerateSecurity: Risk: Medium

    HighSecurity: Security Level: High
    HighSecurity: Compliance: Standard
    HighSecurity: Risk: Low

    VeryHighSecurity: Security Level: Very High
    VeryHighSecurity: Compliance: Full
    VeryHighSecurity: Risk: Minimal

    NoSecurity --> BasicSecurity: Implement Basic Controls
    BasicSecurity --> ModerateSecurity: Upgrade to Moderate
    ModerateSecurity --> HighSecurity: Upgrade to High
    HighSecurity --> VeryHighSecurity: Upgrade to Very High

    VeryHighSecurity --> HighSecurity: Reduce Security
    HighSecurity --> ModerateSecurity: Reduce Security
    ModerateSecurity --> BasicSecurity: Reduce Security
    BasicSecurity --> NoSecurity: Remove Controls
```

## Compliance Status State Diagram

```mermaid
stateDiagram-v2
    [*] --> Initial: Start Assessment

    Initial: No compliance checks run

    NonCompliant: Status: Non-Compliant
    NonCompliant: Risk Level: High
    NonCompliant: Frameworks: 0%

    PartiallyCompliant: Status: Partially Compliant
    PartiallyCompliant: Risk Level: Medium
    PartiallyCompliant: Frameworks: Varies

    Compliant: Status: Compliant
    Compliant: Risk Level: Low
    Compliant: Frameworks: 100%

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
```

These state diagrams illustrate the different security states a system can transition through and how the compliance status changes based on the implementation of security controls. They help visualize the progression from low to high security levels and the corresponding changes in compliance status.
