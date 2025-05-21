# 🔁 CIA Compliance Manager CI/CD Workflows

This document details the continuous integration and deployment workflows used in the CIA Compliance Manager project. The workflows automate testing, security scanning, and release procedures to ensure code quality and security compliance.

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

## 🔄 Workflow Overview

The project uses GitHub Actions for automation with the following workflows:

1. **🚀 Build, Attest and Release**: Builds, attests, and releases new versions with security scanning
2. **🧪 Test and Report**: Runs unit and E2E tests with coverage reporting
3. **🔍 CodeQL Analysis**: Security scanning for code vulnerabilities
4. **📦 Dependency Review**: Scanning of dependency changes for vulnerabilities
5. **⭐ Scorecard Analysis**: OSSF security scorecard for supply chain security
6. **📜 License Checking**: Verification of dependency licenses for compliance
7. **🏷️ PR Labeler**: Automated labeling of pull requests
8. **🔆 Lighthouse**: Performance, accessibility, and best practices auditing
9. **🔒 ZAP Scan**: Dynamic security scanning of deployed application

## Workflow Relationships

```mermaid
flowchart TB
    subgraph "Continuous Integration"
        direction TB
        PR[Pull Request] --> TestReport[Test and Report]
        PR --> DependencyReview[Dependency Review]
        PR --> Labeler[PR Labeler]
        TestReport --> LicenseCheck[License Check]
        TestReport --> CodeQL[CodeQL Analysis]
        CodeQL --> Scorecard[Scorecard Analysis]
    end

    subgraph "Continuous Deployment"
        direction TB
        Release[Release Trigger] --> BuildTest[Prepare & Test]
        BuildTest --> LicenseCheck2[License Check]
        LicenseCheck2 --> Build[Build Package]
        Build --> GenerateSBOM[Generate SBOM]
        GenerateSBOM --> Attestations[Create Attestations]
        Attestations --> CreateRelease[Create GitHub Release]
        CreateRelease --> DeployGHPages[Deploy to GitHub Pages]
        DeployGHPages --> Lighthouse[Lighthouse Audit]
        DeployGHPages --> ZAPScan[ZAP Security Scan]
    end

    PR -.-> |"approved & merged"| main[Main Branch]
    main --> Scorecard
    main --> CodeQL
    main -.-> |"tag created or manual trigger"| Release

    %% Enhanced color styling
    classDef integration fill:#a0c8e0,stroke:#333,stroke-width:1.5px,color:black
    classDef deployment fill:#86b5d9,stroke:#333,stroke-width:1.5px,color:black
    classDef process fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef trigger fill:#bbdefb,stroke:#333,stroke-width:1.5px,color:black
    classDef security fill:#ffccbc,stroke:#333,stroke-width:1.5px,color:black
    classDef audit fill:#ffecb3,stroke:#333,stroke-width:1.5px,color:black

    class PR,TestReport,DependencyReview,Labeler integration
    class CodeQL,Scorecard,LicenseCheck security
    class Release,BuildTest,Build,CreateRelease,DeployGHPages,LicenseCheck2,GenerateSBOM,Attestations deployment
    class Lighthouse,ZAPScan audit
    class main process
```

## 📜 License Checking Workflow

The project includes license checking as part of the CI/CD process to ensure all dependencies comply with the project's license requirements:

```mermaid
flowchart TD
    Start[CI Pipeline] --> Setup[Setup Environment]
    Setup --> Install[Install Dependencies]
    Install --> LicenseCheck[Check Licenses]
    LicenseCheck --> Pass{Licenses OK?}
    Pass -->|Yes| Continue[Continue Pipeline]
    Pass -->|No| Fail[Fail Build]

    %% Enhanced styling with better visual hierarchy
    classDef startNode fill:#bbdefb,stroke:#333,stroke-width:2px,color:black
    classDef processNode fill:#a0c8e0,stroke:#333,stroke-width:1.5px,color:black
    classDef checkNode fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef decisionNode fill:#d1c4e9,stroke:#333,stroke-width:2px,color:black
    classDef failNode fill:#ffccbc,stroke:#333,stroke-width:2px,color:black,font-weight:bold

    class Start startNode
    class Setup,Install,Continue processNode
    class LicenseCheck checkNode
    class Pass decisionNode
    class Fail failNode
```

License checks are run both during PR verification and before releases to ensure compliance.

## 🧪 Test and Report Workflow

This workflow runs on pull requests and pushes to the main branch to ensure code quality.

```mermaid
flowchart TD
    Start[Push or PR] --> Prepare[Setup Environment]
    Prepare --> BuildValidation[Build Validation]
    Prepare --> UnitTests[Run Unit Tests]
    Prepare --> E2ETests[Run E2E Tests]
    BuildValidation --> LicenseCheck[Check Licenses]
    UnitTests --> Coverage[Generate Coverage Report]
    E2ETests --> TestReport[Generate Test Report]
    Coverage --> Upload[Upload Reports]
    TestReport --> Upload
    Upload --> End[End]

    %% Enhanced styling with improved flow and grouping
    classDef startNode fill:#bbdefb,stroke:#333,stroke-width:2px,color:black
    classDef processNode fill:#a0c8e0,stroke:#333,stroke-width:1.5px,color:black
    classDef testNode fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef reportNode fill:#d1c4e9,stroke:#333,stroke-width:1.5px,color:black
    classDef endNode fill:#86b5d9,stroke:#333,stroke-width:2px,color:black
    classDef checkNode fill:#ffccbc,stroke:#333,stroke-width:1.5px,color:black

    class Start,End startNode
    class Prepare,BuildValidation processNode
    class UnitTests,E2ETests testNode
    class Coverage,TestReport,Upload reportNode
    class LicenseCheck checkNode
```

## 🚀 Release Workflow

This workflow handles the release process for new versions, triggered by version tags or manual workflow dispatch.

```mermaid
flowchart TD
    Start[Release Trigger] --> Prepare[Prepare Release]
    Prepare --> TestBuild[Test & Build]
    TestBuild --> LicenseCheck[Check Licenses]
    LicenseCheck --> Build[Build Package]
    Build --> SBOM[Generate SBOM]
    SBOM --> Attestation[Generate Attestations]
    Attestation --> CreateRelease[Create GitHub Release]
    CreateRelease --> Deploy[Deploy to GitHub Pages]
    Deploy --> LighthouseAudit[Lighthouse Audit]
    Deploy --> ZAPScan[ZAP Security Scan]
    LighthouseAudit --> End[End]
    ZAPScan --> End

    %% Enhanced styling with better visual hierarchy
    classDef startNode fill:#bbdefb,stroke:#333,stroke-width:2px,color:black
    classDef processNode fill:#a0c8e0,stroke:#333,stroke-width:1.5px,color:black
    classDef securityNode fill:#d1c4e9,stroke:#333,stroke-width:1.5px,color:black
    classDef deployNode fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef endNode fill:#86b5d9,stroke:#333,stroke-width:2px,color:black
    classDef checkNode fill:#ffccbc,stroke:#333,stroke-width:1.5px,color:black
    classDef auditNode fill:#ffecb3,stroke:#333,stroke-width:1.5px,color:black

    class Start,End startNode
    class Prepare,TestBuild,Build processNode
    class SBOM,Attestation,ZAPScan securityNode
    class CreateRelease,Deploy deployNode
    class LicenseCheck checkNode
    class LighthouseAudit auditNode
```

## 🔍 Security and Quality Scanning Workflows

Multiple security and quality scanning workflows validate different aspects of the codebase and deployed application.

```mermaid
flowchart TD
    subgraph "Security & Quality Workflows"
        direction TB
        PR[Pull Request] --> DependencyReview[Dependency Review]
        Branch[Main Branch] --> CodeQL[CodeQL Analysis]
        Branch --> Scorecard[Scorecard Analysis]
        Deploy[Deployment] --> Lighthouse[Lighthouse Audit]
        Deploy --> ZAPScan[ZAP Security Scan]
    end

    DependencyReview --> Report1[PR Comments]
    CodeQL --> Report2[GitHub Security Tab]
    Scorecard --> Report3[Security Dashboard]
    Lighthouse --> Report4[Performance Report]
    ZAPScan --> Report5[Security Findings]

    %% Enhanced styling with improved grouping
    classDef sourceNode fill:#a0c8e0,stroke:#333,stroke-width:2px,color:black
    classDef scanNode fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef reportNode fill:#d1c4e9,stroke:#333,stroke-width:1.5px,color:black,font-style:italic
    classDef auditNode fill:#ffecb3,stroke:#333,stroke-width:1.5px,color:black

    class PR,Branch,Deploy sourceNode
    class DependencyReview,CodeQL,Scorecard,ZAPScan scanNode
    class Report1,Report2,Report3,Report5 reportNode
    class Lighthouse,Report4 auditNode
```

### 🔍 CodeQL Analysis Workflow

Analyzes code for security vulnerabilities using GitHub's CodeQL engine. Runs on:

- Push to main branch
- Pull requests to main branch
- Weekly schedule (Mondays)

### 📦 Dependency Review

Scans dependency manifest changes in pull requests to identify vulnerable packages.

### ⭐ Scorecard Analysis

Evaluates the project against OSSF security best practices:

- Branch protection rules
- Dependency management
- Code signing
- Other supply chain security practices

### 🔆 Lighthouse Audit

Runs performance and best practices audits on the deployed application:

- Performance metrics
- Accessibility compliance
- SEO optimization
- PWA compatibility
- Best practices adherence

The workflow uses a budget.json file to define performance budgets and thresholds, uploading results as artifacts and to temporary public storage for viewing.

### 🔒 ZAP Security Scan

Performs dynamic application security testing (DAST) on the deployed application:

- Identifies common web vulnerabilities
- API security scanning
- Checks for OWASP Top 10 vulnerabilities
- Generates comprehensive security reports

ZAP scans are performed using the OWASP ZAP Docker container against the deployed GitHub Pages site to identify runtime security issues that static analysis might miss.

## CI/CD Integration

Performance tests and license checks are integrated with CI/CD pipelines to catch performance regressions and licensing issues:

```yaml
# Excerpt from CI configuration
stages:
  - test
  - performance
  - compliance
  - security

performance-tests:
  stage: performance
  script:
    - npm run cypress:run:perf
  artifacts:
    paths:
      - cypress/reports/performance/

license-check:
  stage: compliance
  script:
    - npm run test:licenses
  artifacts:
    paths:
      - license-report/

lighthouse-audit:
  stage: performance
  script:
    - npm run lighthouse
  artifacts:
    paths:
      - lighthouse-reports/

zap-scan:
  stage: security
  script:
    - npm run zap-scan
  artifacts:
    paths:
      - zap-reports/
```

## Mermaid Diagram Support

GitHub natively supports Mermaid diagrams in Markdown files. The diagrams in this documentation leverage this support to visually represent workflows using the Mermaid syntax. This enables:

- Real-time rendering of workflow diagrams
- Automatic updates when the workflow code changes
- Interactive visualization of complex processes

For more information about Mermaid syntax and capabilities, see the [Mermaid documentation](https://mermaid.js.org/).

## Continuous Integration Diagram

The complete CI/CD pipeline integrates all workflows:

```mermaid
flowchart LR
    subgraph "Code Changes"
        direction TB
        Developer([Developer]) --> PR[Pull Request]
        PR --> Review[Code Review]
        Review --> Merge[Merge to Main]
        Merge --> Tag[Version Tag]
        Tag --> Release[Release]
    end

    subgraph "Automated Checks"
        direction TB
        PR --> UnitE2E[Unit & E2E Tests]
        PR --> DependencyScan[Dependency Scan]
        PR --> LicenseCheck[License Check]
        UnitE2E --> Reports[Test Reports]
        Merge --> CodeQLScan[CodeQL Analysis]
        Merge --> ScoreCard[Security Scorecard]
    end

    subgraph "Release Process"
        direction TB
        Release --> Build[Build & Attestation]
        Build --> LicenseVerify[License Verification]
        LicenseVerify --> SBOM[Generate SBOM]
        SBOM --> DeployGH[GitHub Release]
        DeployGH --> DeployPages[GitHub Pages]
        DeployPages --> Lighthouse[Lighthouse Audit]
        DeployPages --> ZAPScan[ZAP Security Scan]
    end

    %% Enhanced styling with better visual hierarchy and flow indicators
    classDef devNode fill:#a0c8e0,stroke:#333,stroke-width:2px,color:black
    classDef codeNode fill:#bbdefb,stroke:#333,stroke-width:1.5px,color:black
    classDef testNode fill:#c8e6c9,stroke:#333,stroke-width:1.5px,color:black
    classDef deployNode fill:#86b5d9,stroke:#333,stroke-width:1.5px,color:black
    classDef reportNode fill:#d1c4e9,stroke:#333,stroke-width:1.5px,color:black
    classDef checkNode fill:#ffccbc,stroke:#333,stroke-width:1.5px,color:black
    classDef auditNode fill:#ffecb3,stroke:#333,stroke-width:1.5px,color:black

    class Developer devNode
    class PR,Review,Merge,Tag,Release codeNode
    class UnitE2E,DependencyScan,Reports,CodeQLScan,ScoreCard testNode
    class Build,DeployGH,DeployPages deployNode
    class LicenseCheck,LicenseVerify checkNode
    class SBOM,ZAPScan reportNode
    class Lighthouse auditNode
```

## Future CI/CD Improvements

The following enhancements are planned for future CI/CD pipeline improvements:

1. **Automated Versioning**: Semantic versioning based on commit messages
2. **Performance Testing**: Expanding performance benchmarks with more metrics
3. **Security Scanning Enhancement**: Additional security scanners and threat modeling
4. **Containerization**: Docker image building and container scanning
5. **Environment-Specific Deployments**: Staging and production deployment pipelines
6. **Automated Accessibility Testing**: Extended accessibility compliance validation
7. **Continuous Performance Monitoring**: Trend analysis for performance metrics
8. **Vulnerability Management**: Automated vulnerability tracking and remediation workflows
9. **Compliance Reporting**: Automated compliance status reporting and auditing

For details on the future architecture direction, see [FUTURE_ARCHITECTURE.md](FUTURE_ARCHITECTURE.md).
