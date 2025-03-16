# CIA Compliance Manager CI/CD Workflows

This document details the continuous integration and deployment workflows used in the CIA Compliance Manager project. The workflows automate testing, security scanning, and release procedures to ensure code quality, security, and reliable deployment.

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

## Workflow Overview

The project uses GitHub Actions for automation with the following workflows:

1. **Test and Report**: Run unit and E2E tests with coverage reporting
2. **CodeQL Analysis**: Security scanning for code vulnerabilities
3. **Dependency Review**: Scanning of dependency changes for vulnerabilities
4. **Scorecard Analysis**: OSSF security scorecard for supply chain security
5. **Release Process**: Build, attest, and deploy new versions
6. **PR Labeler**: Automated labeling of pull requests

## Workflow Relationships

```mermaid
flowchart TB
    subgraph "Continuous Integration"
        PR[Pull Request] --> TestReport[Test and Report]
        PR --> DependencyReview[Dependency Review]
        PR --> Labeler[PR Labeler]
        TestReport --> CodeQL[CodeQL Analysis]
        CodeQL --> Scorecard[Scorecard Analysis]
    end

    subgraph "Continuous Deployment"
        Release[Release Trigger] --> BuildTest[Prepare & Test]
        BuildTest --> Build[Build Package]
        Build --> CreateRelease[Create GitHub Release]
        CreateRelease --> DeployGHPages[Deploy to GitHub Pages]
    end

    PR -.-> |"approved & merged"| main[Main Branch]
    main --> Scorecard
    main --> CodeQL
    main -.-> |"tag created or manual trigger"| Release

    %% Cool color styling
    classDef integration fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef deployment fill:#86b5d9,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef trigger fill:#bbdefb,stroke:#333,stroke-width:1px,color:black

    class PR,TestReport,DependencyReview,Labeler,CodeQL,Scorecard integration
    class Release,BuildTest,Build,CreateRelease,DeployGHPages deployment
    class main process
```

## Test and Report Workflow

This workflow runs on pull requests and pushes to the main branch to ensure code quality.

```mermaid
flowchart TD
    Start[Push or PR] --> Prepare[Setup Environment]
    Prepare --> UnitTests[Run Unit Tests]
    Prepare --> E2ETests[Run E2E Tests]
    UnitTests --> Coverage[Generate Coverage Report]
    E2ETests --> TestReport[Generate Test Report]
    Coverage --> Upload[Upload Reports]
    TestReport --> Upload
    Upload --> End[End]

    %% Cool color styling
    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef test fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef report fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef end fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class Start,End start
    class Prepare process
    class UnitTests,E2ETests test
    class Coverage,TestReport,Upload report
```

## Release Workflow

This workflow handles the release process for new versions, triggered by version tags or manual workflow dispatch.

```mermaid
flowchart TD
    Start[Release Trigger] --> Prepare[Prepare Release]
    Prepare --> TestBuild[Test & Build]
    TestBuild --> SBOM[Generate SBOM]
    SBOM --> Attestation[Generate Attestations]
    Attestation --> CreateRelease[Create GitHub Release]
    CreateRelease --> Deploy[Deploy to GitHub Pages]
    Deploy --> End[End]

    %% Cool color styling
    classDef start fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef process fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef security fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black
    classDef deploy fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef end fill:#86b5d9,stroke:#333,stroke-width:1px,color:black

    class Start,End start
    class Prepare,TestBuild process
    class SBOM,Attestation security
    class CreateRelease,Deploy deploy
```

## Security Scanning Workflows

Multiple security scanning workflows validate different aspects of the codebase.

```mermaid
flowchart TD
    subgraph "Security Workflows"
        PR[Pull Request] --> DependencyReview[Dependency Review]
        Branch[Main Branch] --> CodeQL[CodeQL Analysis]
        Branch --> Scorecard[Scorecard Analysis]
    end

    DependencyReview --> Report1[PR Comments]
    CodeQL --> Report2[GitHub Security Tab]
    Scorecard --> Report3[Security Dashboard]

    %% Cool color styling
    classDef source fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef scan fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef report fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black

    class PR,Branch source
    class DependencyReview,CodeQL,Scorecard scan
    class Report1,Report2,Report3 report
```

### CodeQL Analysis Workflow

Analyzes code for security vulnerabilities using GitHub's CodeQL engine. Runs on:

- Push to main branch
- Pull requests to main branch
- Weekly schedule (Mondays)

### Dependency Review

Scans dependency manifest changes in pull requests to identify vulnerable packages.

### Scorecard Analysis

Evaluates the project against OSSF security best practices:

- Branch protection rules
- Dependency management
- Code signing
- Other supply chain security practices

## Continuous Integration Diagram

The complete CI/CD pipeline integrates all workflows:

```mermaid
flowchart LR
    subgraph "Code Changes"
        Developer --> PR[Pull Request]
        PR --> Review[Code Review]
        Review --> Merge[Merge to Main]
        Merge --> Tag[Version Tag]
        Tag --> Release[Release]
    end

    subgraph "Automated Checks"
        PR --> UnitE2E[Unit & E2E Tests]
        PR --> DependencyScan[Dependency Scan]
        UnitE2E --> Reports[Test Reports]
        Merge --> CodeQLScan[CodeQL Analysis]
        Merge --> ScoreCard[Security Scorecard]
    end

    subgraph "Release Process"
        Release --> Build[Build & Attestation]
        Build --> DeployGH[GitHub Release]
        DeployGH --> DeployPages[GitHub Pages]
    end

    %% Cool color styling
    classDef dev fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef code fill:#bbdefb,stroke:#333,stroke-width:1px,color:black
    classDef test fill:#c8e6c9,stroke:#333,stroke-width:1px,color:black
    classDef deploy fill:#86b5d9,stroke:#333,stroke-width:1px,color:black
    classDef report fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black

    class Developer,PR,Review dev
    class Merge,Tag,Release code
    class UnitE2E,DependencyScan,Reports,CodeQLScan,ScoreCard test
    class Build,DeployGH,DeployPages deploy

    %% Remove previous styling that doesn't match cool color theme
    style PR fill:#a0c8e0,stroke:#333,stroke-width:2px
    style Release fill:#86b5d9,stroke:#333,stroke-width:2px
    style DeployPages fill:#c8e6c9,stroke:#333,stroke-width:2px
```

## Future CI/CD Improvements

The following enhancements are planned for future CI/CD pipeline improvements:

1. **Automated Versioning**: Semantic versioning based on commit messages
2. **Performance Testing**: Integrating performance benchmarks into CI pipeline
3. **Security Scanning Enhancement**: Additional security scanners
4. **Containerization**: Docker image building and container scanning
5. **Environment-Specific Deployments**: Staging and production deployment pipelines

For details on the future architecture direction, see [FUTURE_ARCHITECTURE.md](./FUTURE_ARCHITECTURE.md).
