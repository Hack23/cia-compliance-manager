# 🔄 CIA Compliance Manager State Diagrams

This document illustrates the key state transitions and behavioral models of the CIA Compliance Manager application, showing how the system responds to user interactions and processes security assessments.

## 📚 Related Documentation

<div class="documentation-map">

| Document                                          | Focus           | Description                               |
| ------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Architecture](ARCHITECTURE.md)**               | 🏗️ Architecture | C4 model showing system structure         |
| **[Process Flowcharts](FLOWCHART.md)**            | 🔄 Process      | Security assessment workflows             |
| **[System Architecture](SYSTEM_ARCHITECTURE.md)** | 🏛️ System       | Layered architecture and component details |
| **[Widget Analysis](WIDGET_ANALYSIS.md)**         | 🧩 Components   | Detailed widget component analysis        |

</div>

## 🔍 Application Core States

The diagram below shows the main application states and transitions between them:

```mermaid
stateDiagram-v2
    [*] --> Initializing
    
    state Initializing {
        [*] --> LoadingConfigurations
        LoadingConfigurations --> LoadingServices
        LoadingServices --> InitializingUI
        InitializingUI --> [*]
    }
    
    Initializing --> Ready: Initialization Complete
    
    state Ready {
        [*] --> DefaultSecurityLevels
        DefaultSecurityLevels --> CustomSecurityLevels: User Adjusts Levels
    }
    
    Ready --> Assessing: User Triggers Assessment
    
    state Assessing {
        [*] --> CalculatingSecurityScore
        CalculatingSecurityScore --> EvaluatingBusinessImpact
        EvaluatingBusinessImpact --> MappingToCompliance
        MappingToCompliance --> GeneratingRecommendations
        GeneratingRecommendations --> [*]
    }
    
    Assessing --> Reviewing: Assessment Complete
    
    state Reviewing {
        [*] --> ViewingResults
        ViewingResults --> ExploringDetails: User Explores Specific Areas
        ExploringDetails --> ViewingResults: Return to Overview
    }
    
    Reviewing --> Ready: User Adjusts Security Levels
    Reviewing --> Exporting: User Exports Results
    
    Exporting --> Reviewing: Export Complete
    
    classDef initial fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef review fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef export fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    
    class Initializing initial
    class Ready,Assessing process
    class Reviewing review
    class Exporting export
```

## 🔒 Security Level Selection States

This diagram illustrates the state transitions during security level configuration:

```mermaid
stateDiagram-v2
    [*] --> DefaultProfile: Initial Load
    
    state DefaultProfile {
        [*] --> ModerateSecurityLevels
    }
    
    DefaultProfile --> EditingProfile: User Selects Security Levels
    
    state EditingProfile {
        [*] --> SelectingConfidentiality
        SelectingConfidentiality --> SelectingIntegrity: Next
        SelectingIntegrity --> SelectingAvailability: Next
        SelectingAvailability --> ReviewingSelections: Complete
        
        SelectingConfidentiality --> ReviewingSelections: Skip
        SelectingIntegrity --> ReviewingSelections: Skip
        
        ReviewingSelections --> SelectingConfidentiality: Edit Confidentiality
        ReviewingSelections --> SelectingIntegrity: Edit Integrity
        ReviewingSelections --> SelectingAvailability: Edit Availability
    }
    
    EditingProfile --> ProfileSelected: User Confirms Selections
    
    state ProfileSelected {
        [*] --> LoadingProfileDetails
        LoadingProfileDetails --> DisplayingProfileDetails
    }
    
    ProfileSelected --> EditingProfile: User Modifies Security Levels
    
    classDef defaultState fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef editing fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef selected fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class DefaultProfile defaultState
    class EditingProfile editing
    class ProfileSelected selected
    class SelectingConfidentiality confidentiality
    class SelectingIntegrity integrity
    class SelectingAvailability availability
```

## 📊 Assessment Widget States

The state diagram for assessment widgets shows how they respond to security level changes:

```mermaid
stateDiagram-v2
    [*] --> Idle: Widget Initialized
    
    Idle --> Loading: Security Levels Changed
    
    state Loading {
        [*] --> FetchingData
        FetchingData --> ProcessingData
        ProcessingData --> RenderingResults
        RenderingResults --> [*]
    }
    
    Loading --> DisplayingResults: Data Loaded
    Loading --> Error: Data Fetch Failed
    
    state DisplayingResults {
        [*] --> ShowingPrimaryView
        ShowingPrimaryView --> ShowingDetailedView: User Requests Details
        ShowingDetailedView --> ShowingPrimaryView: User Returns to Summary
    }
    
    Error --> Retrying: User Requests Retry
    Retrying --> Loading
    
    DisplayingResults --> Idle: Widget Reset
    
    classDef idle fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef loading fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef display fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    
    class Idle idle
    class Loading,Retrying loading
    class DisplayingResults,ShowingPrimaryView,ShowingDetailedView display
    class Error error
```

## 🧩 Widget Interaction States

This diagram shows the state transitions resulting from interactions between widgets:

```mermaid
stateDiagram-v2
    state SecurityLevelWidget {
        [*] --> Ready
        Ready --> Configuring: User Changes Security Level
        Configuring --> Propagating: New Levels Selected
        Propagating --> Ready: Propagation Complete
    }
    
    state AssessmentWidgets {
        [*] --> Idle
        Idle --> Loading: Receive New Security Levels
        Loading --> Rendering: Data Retrieved
        Rendering --> Displaying: Render Complete
        Displaying --> Idle: Reset or New Changes
    }
    
    SecurityLevelWidget --> AssessmentWidgets: Security Levels Changed
    
    classDef slw fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef aw fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    
    class SecurityLevelWidget slw
    class AssessmentWidgets aw
```

## 🔒 Confidentiality Component States

This diagram illustrates states related to confidentiality controls:

```mermaid
stateDiagram-v2
    [*] --> NoAccess
    
    NoAccess --> BasicAccess: Level Low
    BasicAccess --> StandardAccess: Level Moderate
    StandardAccess --> EnhancedAccess: Level High
    EnhancedAccess --> ZeroTrust: Level Very High
    
    ZeroTrust --> EnhancedAccess: Decrease Level
    EnhancedAccess --> StandardAccess: Decrease Level
    StandardAccess --> BasicAccess: Decrease Level
    BasicAccess --> NoAccess: Decrease Level
    
    state NoAccess {
        [*] --> PublicData
    }
    
    state BasicAccess {
        [*] --> SimpleAuthentication
    }
    
    state StandardAccess {
        [*] --> RoleBasedControl
        RoleBasedControl --> DataEncryption
    }
    
    state EnhancedAccess {
        [*] --> MFA
        MFA --> EndToEndEncryption
        EndToEndEncryption --> AuditLogging
    }
    
    state ZeroTrust {
        [*] --> ContinuousVerification
        ContinuousVerification --> JustInTimeAccess
        JustInTimeAccess --> LeastPrivilege
        LeastPrivilege --> ContextAwareAccess
    }
    
    classDef none fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef low fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef moderate fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef high fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef veryhigh fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    
    class NoAccess,PublicData none
    class BasicAccess,SimpleAuthentication low
    class StandardAccess,RoleBasedControl,DataEncryption moderate
    class EnhancedAccess,MFA,EndToEndEncryption,AuditLogging high
    class ZeroTrust,ContinuousVerification,JustInTimeAccess,LeastPrivilege,ContextAwareAccess veryhigh
```

## ✓ Integrity Component States

This diagram illustrates states related to integrity controls:

```mermaid
stateDiagram-v2
    [*] --> NoValidation
    
    NoValidation --> BasicValidation: Level Low
    BasicValidation --> StandardValidation: Level Moderate
    StandardValidation --> EnhancedValidation: Level High
    EnhancedValidation --> FormalVerification: Level Very High
    
    FormalVerification --> EnhancedValidation: Decrease Level
    EnhancedValidation --> StandardValidation: Decrease Level
    StandardValidation --> BasicValidation: Decrease Level
    BasicValidation --> NoValidation: Decrease Level
    
    state NoValidation {
        [*] --> NoControls
    }
    
    state BasicValidation {
        [*] --> ManualChecks
    }
    
    state StandardValidation {
        [*] --> AutomatedValidation
        AutomatedValidation --> ErrorHandling
    }
    
    state EnhancedValidation {
        [*] --> CryptographicVerification
        CryptographicVerification --> DataSignatures
        DataSignatures --> ImmutableLogging
    }
    
    state FormalVerification {
        [*] --> BlockchainValidation
        BlockchainValidation --> ZeroKnowledgeProofs
        ZeroKnowledgeProofs --> FormalMethodVerification
    }
    
    classDef none fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef low fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef moderate fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef high fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef veryhigh fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    
    class NoValidation,NoControls none
    class BasicValidation,ManualChecks low
    class StandardValidation,AutomatedValidation,ErrorHandling moderate
    class EnhancedValidation,CryptographicVerification,DataSignatures,ImmutableLogging high
    class FormalVerification,BlockchainValidation,ZeroKnowledgeProofs,FormalMethodVerification veryhigh
```

## ⏱️ Availability Component States

This diagram illustrates states related to availability controls:

```mermaid
stateDiagram-v2
    [*] --> NoAvailability
    
    NoAvailability --> BasicAvailability: Level Low
    BasicAvailability --> StandardAvailability: Level Moderate
    StandardAvailability --> EnhancedAvailability: Level High
    EnhancedAvailability --> ContinuousAvailability: Level Very High
    
    ContinuousAvailability --> EnhancedAvailability: Decrease Level
    EnhancedAvailability --> StandardAvailability: Decrease Level
    StandardAvailability --> BasicAvailability: Decrease Level
    BasicAvailability --> NoAvailability: Decrease Level
    
    state NoAvailability {
        [*] --> NoSLA
    }
    
    state BasicAvailability {
        [*] --> MinimalUptime
        MinimalUptime --> BasicBackup
    }
    
    state StandardAvailability {
        [*] --> DefinedSLA
        DefinedSLA --> RegularBackups
        RegularBackups --> IncidentResponse
    }
    
    state EnhancedAvailability {
        [*] --> HighAvailabilitySystem
        HighAvailabilitySystem --> DisasterRecovery
        DisasterRecovery --> AutomatedFailover
    }
    
    state ContinuousAvailability {
        [*] --> MultiRegionDeployment
        MultiRegionDeployment --> RealTimeFailover
        RealTimeFailover --> SelfHealingSystems
    }
    
    classDef none fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    classDef low fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef moderate fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef high fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    classDef veryhigh fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white
    
    class NoAvailability,NoSLA none
    class BasicAvailability,MinimalUptime,BasicBackup low
    class StandardAvailability,DefinedSLA,RegularBackups,IncidentResponse moderate
    class EnhancedAvailability,HighAvailabilitySystem,DisasterRecovery,AutomatedFailover high
    class ContinuousAvailability,MultiRegionDeployment,RealTimeFailover,SelfHealingSystems veryhigh
```

These state diagrams provide a comprehensive view of the CIA Compliance Manager's behavioral model, illustrating how the application transitions between states in response to user interactions and security level changes.
