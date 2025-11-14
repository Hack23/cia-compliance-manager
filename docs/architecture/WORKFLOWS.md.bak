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

## 🔐 Security Hardening Practices

The CIA Compliance Manager implements industry best practices for securing CI/CD pipelines, with a particular focus on GitHub Action hardening using StepSecurity recommendations:

```mermaid
flowchart LR
    subgraph "Pipeline Security Hardening"
        PH[Permissions Hardening] --> LAP[Least Access Principle]
        PS[Pin SHA Versions] --> IDT[Immutable Dependencies]
        AV[Action Verification] --> TS[Trusted Sources]
        AS[Action Scanning] --> VV[Vulnerability Validation]
        OT[OIDC Tokens] --> EF[Ephemeral Credentials]
    end
    
    subgraph "StepSecurity Implementation"
        HG[Harden Github] --> AC[Action Configuration]
        DS[Dependency Securing] --> DP[Dependency Pinning]
        AA[Action Analysis] --> VD[Vulnerability Detection]
        CH[Continuous Hardening] --> AM[Automated Maintenance]
    end
    
    PH --> HG
    PS --> DS
    AV --> AA
    OT --> CH
    
    classDef practice fill:#3498db,stroke:#2980b9,stroke-width:1.5px,color:white
    classDef implementation fill:#27ae60,stroke:#1e8449,stroke-width:1.5px,color:white
    
    class PH,PS,AV,AS,OT practice
    class HG,DS,AA,CH implementation
```

### Specific Hardening Measures

The project employs the following security hardening techniques in its workflows:

1. **🔒 Permissions Restriction**: Every workflow uses the principle of least privilege with explicit permissions declarations
   
   ```yaml
   permissions:
     contents: read
     actions: read
     checks: write
     pull-requests: write
   ```

2. **📌 SHA Pinning**: External actions are pinned to specific SHA hashes for immutability
   
   ```yaml
   - uses: actions/checkout@8ade135a41bc03ea155e62e844d188df1ea18608 # v4.1.0
   ```

3. **🪄 StepSecurity Auto-hardening**: Workflows are periodically scanned and updated with StepSecurity best practices

4. **📜 SBOM Generation**: Software Bill of Materials is generated during the release process for transparency

5. **✅ Attestation Creation**: Build and dependency attestations are created and signed during release

6. **⏱️ Timeout Limits**: All jobs have appropriate timeout limits to prevent resource exhaustion

7. **🔑 OIDC Token Usage**: GitHub OIDC tokens are used for secure authenticated deployments instead of long-lived secrets

## 🧪 Test and Report Workflow

The test-and-report workflow runs comprehensive testing and generates quality metrics for pull requests and pushes to the main branch:

```mermaid
flowchart TD
    CodeChange[Code Change] --> UnitTests[Run Unit Tests]
    UnitTests --> IntegrationTests[Run Integration Tests]
    IntegrationTests --> UITests[Run UI Tests]
    UITests --> CoverageMeasurement[Measure Code Coverage]
    CoverageMeasurement --> Adequate{Coverage<br>Adequate?}
    Adequate -->|Yes| MergeCode[Merge Code]
    Adequate -->|No| AddTests[Add More Tests]
    AddTests --> UnitTests
    
    %% Apply styles using class definitions
    classDef start fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef decision fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef endProcess fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    
    class CodeChange start
    class UnitTests,IntegrationTests,UITests,CoverageMeasurement,AddTests process
    class Adequate decision
    class MergeCode endProcess
```

### Test Workflow Implementation

The test-and-report workflow is implemented as a GitHub Action and includes the following key steps:

1. **Repository Checkout**: Securely checks out code with proper permissions
2. **Node.js Setup**: Sets up Node.js environment with caching for faster builds
3. **Dependency Installation**: Installs dependencies with audit checks
4. **Linting**: Runs code quality checks with ESLint
5. **Unit Tests**: Runs Vitest unit tests with coverage reporting
6. **E2E Tests**: Runs end-to-end tests with Cypress
7. **Report Generation**: Creates and uploads coverage and test reports

### Test Report and Metrics Generation

The workflow automatically generates and publishes the following metrics and reports:

1. **Code Coverage**: Vitest generates detailed code coverage reports showing statement, branch, function, and line coverage.

2. **Test Results**: All test results are aggregated and published as GitHub artifacts and comments on PRs.

3. **Performance Metrics**: Key performance metrics including:
   - Test execution times
   - Build performance metrics
   - Component rendering benchmarks

4. **Quality Gates**: The workflow enforces quality gates including:
   - Minimum 80% code coverage threshold
   - Zero failing tests
   - No TypeScript or linting errors
   - All security checks passing

## 🔐 Security Testing Integration

The workflow integrates with security testing tools to provide immediate feedback on potential security issues:

```mermaid
flowchart TD
    PR[Pull Request] --> Tests[Run Tests]
    Tests --> StaticAnalysis[Static Analysis]
    StaticAnalysis --> DependencyScan[Scan Dependencies]
    DependencyScan --> SecretScanning[Secret Detection]
    SecretScanning --> LicenseCheck[License Verification]
    LicenseCheck --> QualityGates{All Checks<br>Pass?}
    QualityGates -->|Yes| Report[Generate Report]
    QualityGates -->|No| Fail[Fail Build]
    
    Report --> Approval{Approval<br>Required?}
    Approval -->|Yes| RequestReview[Request Review]
    Approval -->|No| AutoMerge[Auto-merge]
    
    RequestReview --> ReviewProcess[Review Process]
    ReviewProcess --> MergeDecision{Merge<br>Decision}
    MergeDecision -->|Approved| Merge[Merge PR]
    MergeDecision -->|Rejected| UpdateCode[Update Code]
    UpdateCode --> Tests
    
    classDef pr fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef test fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef security fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef decision fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef merge fill:#2ecc71,stroke:#27ae60,stroke-width:2px,color:white
    classDef review fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:black
    
    class PR,UpdateCode pr
    class Tests,Report test
    class StaticAnalysis,DependencyScan,SecretScanning,LicenseCheck,Fail security
    class QualityGates,Approval,MergeDecision decision
    class AutoMerge,Merge merge
    class RequestReview,ReviewProcess review
```

## 📊 Audit Reports and Security Artifacts

The CIA Compliance Manager automatically generates comprehensive security and quality audit reports:

```mermaid
flowchart TD
    subgraph "Security Artifacts"
        SBOM[Software Bill of Materials]
        ATT[Build Attestations]
        VAR[Vulnerability Assessment]
        LIC[License Compliance]
    end
    
    subgraph "Quality Reports"
        COV[Code Coverage]
        TST[Test Results]
        PERF[Performance Metrics]
        ACC[Accessibility Report]
    end
    
    subgraph "Integration"
        GHA[GitHub Actions]
        GHP[GitHub Pages]
        GHS[GitHub Security Tab]
    end
    
    GHA --> SBOM & ATT & VAR & LIC & COV & TST & PERF & ACC
    SBOM & ATT --> GHP
    VAR & COV & TST --> GHS
    
    classDef security fill:#e74c3c,stroke:#c0392b,stroke-width:1.5px,color:white
    classDef quality fill:#3498db,stroke:#2980b9,stroke-width:1.5px,color:white
    classDef integration fill:#8e44ad,stroke:#6c3483,stroke-width:1.5px,color:white
    
    class SBOM,ATT,VAR,LIC security
    class COV,TST,PERF,ACC quality
    class GHA,GHP,GHS integration
```

### Audit Artifact Generation

The following audit artifacts are generated during the CI/CD process:

1. **📦 SBOM Generation**: A Software Bill of Materials is created using `cyclonedx-bom` during release:
   - Provides a complete inventory of all dependencies
   - Includes versions, licenses, and package metadata
   - Published as a release artifact
   - Used for vulnerability tracking

2. **🔏 Build Attestations**: The release workflow creates and signs attestations:
   - Build provenance attestations using SLSA framework
   - Dependency attestation documenting package sources
   - All attestations stored with release artifacts

3. **📈 Coverage Reports**: The test-and-report workflow generates and publishes:
   - Code coverage reports from Vitest
   - Unit and integration test results
   - Performance test metrics

4. **🔍 Security Scanning Results**: Multiple security scanning outputs are produced:
   - CodeQL vulnerability reports
   - ZAP scan findings
   - Dependency vulnerability assessments
   - OSSF Scorecard with supply chain security metrics

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
    class CodeQL,Scorecard,LicenseCheck,LicenseCheck2 security
    class Release,BuildTest,Build,CreateRelease,DeployGHPages,GenerateSBOM,Attestations deployment
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

## 🚀 Release Workflow

The release workflow handles the build, attestation, and deployment process for new versions, triggered by version tags or manual workflow dispatch:

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

### Key Release Steps

The release workflow includes the following key steps:

1. **Setup Environment**: Configures Node.js with dependency caching
2. **Install Dependencies**: Uses `npm ci` with audit checks
3. **License Verification**: Ensures all dependencies have acceptable licenses
4. **Build Package**: Creates optimized production build
5. **SBOM Generation**: Creates Software Bill of Materials
6. **Create Attestations**: Generates and signs build provenance and dependency attestations
7. **Release Creation**: Creates GitHub release with artifacts
8. **GitHub Pages Deployment**: Deploys to GitHub Pages
9. **Post-Deployment Tests**: Runs Lighthouse and ZAP security scans

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

The CodeQL workflow uses customized query packs for JavaScript/TypeScript that include:
- Security vulnerability detection
- Code quality issues
- Control flow analysis
- Data flow analysis
- Type checking

Findings are reported directly to the GitHub Security tab with severity ratings and remediation guidance.

### 📦 Dependency Review

Scans dependency manifest changes in pull requests to identify vulnerable packages:

1. Checks for known vulnerabilities in new or updated dependencies
2. Flags vulnerabilities based on severity level
3. Provides remediation advice in PR comments
4. Enforces dependency policy requirements

### ⭐ Scorecard Analysis

Evaluates the project against OSSF security best practices:

1. Branch protection rules
2. Dependency management
3. Code signing
4. Other supply chain security practices

The Scorecard workflow runs weekly and uploads results to the GitHub Security tab, providing:
- Overall security score
- Individual scores for each category
- Improvement recommendations
- Trending information

### 🔆 Lighthouse Audit

Runs performance and best practices audits on the deployed application:

1. Performance metrics
2. Accessibility compliance
3. SEO optimization
4. PWA compatibility
5. Best practices adherence

The workflow uses a budget.json file to define performance budgets and thresholds, uploading results as artifacts and to temporary public storage for viewing.

### 🔒 ZAP Security Scan

Performs dynamic application security testing (DAST) on the deployed application:

1. Identifies common web vulnerabilities
2. API security scanning
3. Checks for OWASP Top 10 vulnerabilities
4. Generates comprehensive security reports

ZAP scans are performed using the OWASP ZAP Docker container against the deployed GitHub Pages site to identify runtime security issues that static analysis might miss.

## CI/CD Integration

Performance tests and license checks are integrated with CI/CD pipelines to catch performance regressions and licensing issues.

The integration approach follows a layered security model:

```mermaid
flowchart LR
    PR([Pull Request]) --> Static[Static Analysis]
    Static --> Build[Build & Test]
    Build --> Security[Security Scanning]
    Security --> Deploy[Deploy Preview]
    Deploy --> Audit[Audit & Verify]
    
    classDef prNode fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef phase fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:black
    
    class PR prNode
    class Static,Build,Security,Deploy,Audit phase
```

Each phase adds additional security and quality validation:

1. **Static Analysis**: ESLint, TypeScript, Dependency Review
2. **Build & Test**: Unit tests, E2E tests, Coverage checks
3. **Security Scanning**: CodeQL, License verification
4. **Deploy Preview**: Preview environments, Smoke tests
5. **Audit & Verify**: Lighthouse, ZAP, Accessibility testing

## Future CI/CD Improvements

While focusing on stabilizing the current workflows for the v1.0 release, the following enhancements are planned for future pipeline improvements:

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
