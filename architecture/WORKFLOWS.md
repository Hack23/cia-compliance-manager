# CIA Compliance Manager CI/CD Workflows

This document describes the CI/CD workflows implemented for the CIA Compliance Manager project, illustrating the automated processes for code quality, security checks, testing, and release management.

## 📚 Related Architecture Documentation

<div class="documentation-map">

| Document                                            | Focus           | Description                               |
| --------------------------------------------------- | --------------- | ----------------------------------------- |
| **[Current Architecture](ARCHITECTURE.md)**         | 🏛️ Architecture | C4 model showing current system structure |
| **[Future Architecture](FUTURE_ARCHITECTURE.md)**   | 🏛️ Architecture | Vision for context-aware platform         |
| **[State Diagrams](STATEDIAGRAM.md)**               | 🔄 Behavior     | Current system state transitions          |
| **[Future State Diagrams](FUTURE_STATEDIAGRAM.md)** | 🔄 Behavior     | Enhanced adaptive state transitions       |
| **[Process Flowcharts](FLOWCHART.md)**              | 🔄 Process      | Current security workflows                |
| **[Future Flowcharts](FUTURE_FLOWCHART.md)**        | 🔄 Process      | Enhanced context-aware workflows          |
| **[Mindmaps](MINDMAP.md)**                          | 🧠 Concept      | Current system component relationships    |
| **[Future Mindmaps](FUTURE_MINDMAP.md)**            | 🧠 Concept      | Future capability evolution               |
| **[SWOT Analysis](SWOT.md)**                        | 💼 Business     | Current strategic assessment              |
| **[Future SWOT Analysis](FUTURE_SWOT.md)**          | 💼 Business     | Future strategic opportunities            |
| **[Future Workflows](FUTURE_WORKFLOWS.md)**         | 🔧 DevOps       | Enhanced CI/CD with ML                    |
| **[Future Data Model](FUTURE_DATA_MODEL.md)**       | 📊 Data         | Context-aware data architecture           |

</div>

## Overview of CI/CD Pipeline

<div class="workflow-overview">

The project implements a comprehensive CI/CD pipeline with distinct workflows for:

1. **🔄 Continuous Integration (CI)** workflows that run on each PR and push
2. **🔒 Security analysis** workflows for vulnerability detection
3. **📦 Release automation** for creating verified, attested releases

</div>

## CodeQL Security Analysis Workflow

**🔒 Security Focus:** Automatically analyzes code for potential security vulnerabilities and coding errors using GitHub's CodeQL engine.

**🛡️ Risk Management Focus:** Provides early detection of security issues during development, preventing vulnerabilities from reaching production.

```mermaid
flowchart TD
    A[Push to main/PR] -->|Triggers| B[CodeQL Analysis]
    B --> C{Initialize CodeQL}
    C --> D[Autobuild Project]
    D --> E[Analyze JavaScript/TypeScript]
    E --> F{Security Issues?}
    F -->|Yes| G[Report Security Vulnerabilities]
    F -->|No| H[Clean Analysis]

    classDef trigger fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black;
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black;
    classDef security fill:#ffcdd2,stroke:#333,stroke-width:1px,color:black;
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black;
    classDef good fill:#66cc66,stroke:#333,stroke-width:1px,color:white;
    classDef bad fill:#ff6666,stroke:#333,stroke-width:1px,color:white;

    class A trigger;
    class B,C,D,E process;
    class F decision;
    class G bad;
    class H good;
```

## Release Workflow

**🔗 Supply Chain Security Focus:** Implements secure build processes with attestations and provenance to ensure release integrity and verify authenticity.

**📦 Release Management Focus:** Automates the versioning, building, testing, and publishing process for new releases with comprehensive artifacts.

```mermaid
flowchart TD
    A[Tag Push/Manual Trigger] --> B[Prepare Release]
    B --> C[Set Version]
    C --> D{Run Tests}
    D -->|Pass| E[Build Release Package]
    D -->|Fail| D1[Abort Release]
    E --> F[Generate SBOM]
    F --> G[Create Attestations]
    G --> H[Publish Release]
    H --> I[Notify Stakeholders]

    classDef trigger fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black
    classDef test fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef security fill:#ffcdd2,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef publish fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef fail fill:#ff6666,stroke:#333,stroke-width:1px,color:white

    class A trigger
    class B,C,E,F,G publish
    class D decision
    class D1 fail
    class H,I publish
```

## Continuous Integration Process

**🔧 DevOps Focus:** Illustrates the automated build and test process that runs on every code change to maintain quality and prevent regressions.

**👷 Development Focus:** Shows how developers get immediate feedback on their code changes through automated testing and quality checks.

```mermaid
stateDiagram-v2
    [*] --> CodeChange: Developer Push/PR

    CodeChange --> BuildProcess: Trigger CI

    state BuildProcess {
        [*] --> InstallDependencies
        InstallDependencies --> TypeCheck: npm install
        TypeCheck --> Lint: tsc --noEmit
        Lint --> UnitTests: eslint
        UnitTests --> BuildAssets: vitest run
        BuildAssets --> [*]: vite build
    }

    BuildProcess --> TestingPhase: Build Success

    state TestingPhase {
        [*] --> ComponentTests
        ComponentTests --> IntegrationTests
        IntegrationTests --> E2ETests: cypress run
        E2ETests --> [*]
    }

    TestingPhase --> QualityGate: Tests Complete

    QualityGate --> DeployPreview: Pass
    QualityGate --> FailureFeedback: Fail

    DeployPreview --> [*]: Preview URL Available
    FailureFeedback --> [*]: Error Report Sent

    classDef start fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black
    classDef test fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef gate fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef deploy fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef fail fill:#ff6666,stroke:#333,stroke-width:1px,color:white

    class CodeChange,BuildProcess start
    class TestingPhase test
    class QualityGate gate
    class DeployPreview deploy
    class FailureFeedback fail
```

## Security Scanning Integration

**🔒 Security Focus:** Shows how automated security scans are integrated throughout the development lifecycle to identify vulnerabilities early.

**📋 Compliance Focus:** Illustrates the implementation of automated compliance checks and security policy enforcement via CI/CD.

```mermaid
flowchart TD
    A[Code Commit] --> B{PR or Push?}
    B -->|PR| C1[Quick Security Scans]
    B -->|Push to Main| C2[Comprehensive Scans]

    C1 --> D1[SAST Scan]
    C1 --> D2[Dependency Check]

    C2 --> E1[Full SAST]
    C2 --> E2[SCA Scan]
    C2 --> E3[Secret Detection]
    C2 --> E4[License Compliance]

    D1 & D2 --> F1{Quick Issues?}
    E1 & E2 & E3 & E4 --> F2{Major Issues?}

    F1 -->|Yes| G1[Block PR]
    F1 -->|No| G2[Approve Security]

    F2 -->|Yes| H1[Create Security Issue]
    F2 -->|No| H2[Update Security Dashboard]

    G1 & G2 --> I[PR Processing]
    H1 & H2 --> J[Main Branch Status]

    I --> K[PR Merged]
    K --> C2

    J --> L{Status}
    L -->|Clean| M[Pass Security Gate]
    L -->|Issues| N[Fix Security Issues]
    N --> A

    M --> O[Deploy to Environments]

    classDef commit fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black
    classDef scan fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef issue fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef clean fill:#66cc66,stroke:#333,stroke-width:1px,color:white
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black
    classDef deploy fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black

    class A commit
    class B,F1,F2,L decision
    class C1,C2,D1,D2,E1,E2,E3,E4 scan
    class G1,H1,N issue
    class G2,H2,M clean
    class I,J,K process
    class O deploy
```

## Key Workflow Features

### 1. CodeQL Security Scanning

<div class="feature-block">

The CodeQL workflow automatically scans for security vulnerabilities in:

- 🔍 JavaScript and TypeScript code
- 🧩 React component vulnerabilities
- 💉 Potential injection attacks
- 🐞 Insecure coding patterns

Results are reported through GitHub Security tab with automated alerts for maintainers.

</div>

### 2. Comprehensive Testing Integration

<div class="feature-block">

The release workflow ensures quality through:

- ✅ Vitest unit tests with high coverage requirements
- 🧪 Cypress end-to-end tests for user flows
- 👁️ Visual regression tests for UI components
- 📊 Test reports and artifacts published for review

</div>

### 3. Software Bill of Materials (SBOM)

<div class="feature-block">

Every release includes:

- 📋 Complete SBOM in SPDX JSON format
- 📦 Dependency listing with versions
- ⚖️ License compliance information
- 🔒 Known vulnerability status

</div>

### 4. Release Attestations

<div class="feature-block">

The workflow creates cryptographically signed attestations certifying:

- 🔗 Build provenance (who built it, when, and how)
- 📋 SBOM verification for dependency transparency
- 🔐 Artifact integrity through secure hashing

</div>

### 5. Pipeline Security Controls

<div class="feature-block">

Security throughout the CI/CD pipeline is maintained by:

- 🛡️ Hardened CI runner environments
- 🔒 Limited pipeline permissions
- 📌 Pinned action versions with SHA hashes
- 🔄 Dependency caching for build reproducibility
- 📝 Audit logging of all CI/CD operations

</div>

## Benefits of the CI/CD Approach

<div class="benefits-section">

1. **🔄 Consistent Quality:** Automated testing ensures code quality across all changes
2. **🔒 Security Integration:** Security scanning is built into the development process
3. **✅ Release Confidence:** Every release has verified provenance and integrity
4. **📋 Compliance Support:** Automated attestations help meet regulatory requirements
5. **👩‍💻 Developer Experience:** Fast feedback on code quality and security issues

</div>
