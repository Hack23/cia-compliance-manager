# 🔄 CIA Compliance Manager Process Flowcharts

> **Version:** v1.0 | **Last Updated:** 2025-11-22 | **Status:** Production

This document illustrates comprehensive process flows and workflows within the CIA Compliance Manager v1.0 application, showing how security assessment capabilities are delivered through React 19.x components with error handling, validation, and state management.

## 📚 Related Documentation

<div class="documentation-map">

| Document                                          | Focus           | Description                               |
| ------------------------------------------------- | --------------- | ----------------------------------------- |
| **[System Architecture](SYSTEM_ARCHITECTURE.md)** | 🏛️ System       | Layered architecture and component details |
| **[Architecture](ARCHITECTURE.md)**               | 🏗️ C4 Model     | C4 model showing system structure          |
| **[State Diagrams](STATEDIAGRAM.md)**             | 🔄 Behavior     | System state transitions with error boundaries |
| **[Security Architecture](SECURITY_ARCHITECTURE.md)** | 🛡️ Security | Security controls and threat mitigations |
| **[Threat Model](THREAT_MODEL.md)**               | 🎯 Threats      | STRIDE analysis and attack trees          |

</div>

## 🎯 Process Flow Overview

The CIA Compliance Manager implements v1.0 workflows for:

1. **Security Level Configuration**: Interactive CIA triad assessment with validation
2. **Assessment Generation**: Real-time calculation of security metrics and business impact
3. **Compliance Mapping**: Framework alignment (ISO 27001, NIST CSF, CIS Controls)
4. **Business Impact Analysis**: Financial, operational, and regulatory impact assessment
5. **Cost Estimation**: CAPEX/OPEX calculation for security implementations
6. **Data Export**: Report generation and documentation export
7. **Error Recovery**: React 19.x error boundary patterns with retry mechanisms

## 🏛️ ISMS Compliance Alignment

Per **[Hack23 ISMS Secure Development Policy §10](https://github.com/Hack23/ISMS/blob/main/Secure_Development_Policy.md)**:

- **ISO 27001 (A.8.1)**: Business process documentation maintained ✅
- **NIST CSF (ID.RA)**: Risk assessment processes documented ✅
- **CIS Controls (16.1)**: Application security processes defined ✅
- **Process Transparency**: Public documentation of security workflows ✅

## 🔍 Security Level Configuration Process (v1.0)

The following flowchart illustrates the enhanced v1.0 security level configuration with real-time validation and error handling:

```mermaid
flowchart TD
    Start([User Opens Application]) --> LoadState{Load Persisted<br>State?}
    LoadState -->|localStorage Available| RestoreState[Restore Security Levels<br>from localStorage]
    LoadState -->|No State| InitDefaults[Initialize Default Levels<br>All Moderate]
    
    RestoreState --> ValidateSaved{Validate<br>Saved State?}
    ValidateSaved -->|Valid| DisplayWidget[Display Security Level Widget]
    ValidateSaved -->|Invalid| InitDefaults
    InitDefaults --> DisplayWidget
    
    DisplayWidget --> UserInteract{User Action}
    
    UserInteract -->|Select Confidentiality| ValidateC{Validate<br>Selection}
    UserInteract -->|Select Integrity| ValidateI{Validate<br>Selection}
    UserInteract -->|Select Availability| ValidateA{Validate<br>Selection}
    
    ValidateC -->|Valid| UpdateC[Update Confidentiality]
    ValidateC -->|Invalid| ShowErrorC[Show Validation Error]
    ShowErrorC --> UserInteract
    
    ValidateI -->|Valid| UpdateI[Update Integrity]
    ValidateI -->|Invalid| ShowErrorI[Show Validation Error]
    ShowErrorI --> UserInteract
    
    ValidateA -->|Valid| UpdateA[Update Availability]
    ValidateA -->|Invalid| ShowErrorA[Show Validation Error]
    ShowErrorA --> UserInteract
    
    UpdateC --> PropagateState[Propagate State via<br>React Context]
    UpdateI --> PropagateState
    UpdateA --> PropagateState
    
    PropagateState --> PersistState[Persist to localStorage]
    PersistState --> TriggerRerender[Trigger Component<br>Re-renders]
    TriggerRerender --> UpdateWidgets[Update All<br>Assessment Widgets]
    UpdateWidgets --> DisplayWidget
    
    DisplayWidget -->|Export| GenerateExport[Generate Report]
    GenerateExport --> ExportComplete[Export Complete]
    ExportComplete --> DisplayWidget
    
    DisplayWidget -->|Error Occurs| ErrorBoundary{Error<br>Boundary}
    ErrorBoundary -->|Caught| ShowErrorUI[Display Error UI<br>with Retry Option]
    ShowErrorUI -->|User Retries| DisplayWidget
    ShowErrorUI -->|User Resets| InitDefaults
    
    %% Apply styles using class definitions
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef decision fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef validation fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef success fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white
    
    class Start,ExportComplete startend
    class DisplayWidget,RestoreState,InitDefaults,PropagateState,PersistState,TriggerRerender,UpdateWidgets,GenerateExport process
    class LoadState,UserInteract,ErrorBoundary decision
    class ValidateC,ValidateI,ValidateA,ValidateSaved validation
    class ShowErrorC,ShowErrorI,ShowErrorA,ShowErrorUI error
    class UpdateC confidentiality
    class UpdateI integrity
    class UpdateA availability
```

**Key v1.0 Enhancements:**
- ✅ **localStorage Persistence**: State survives browser sessions
- ✅ **Input Validation**: Real-time validation of security level selections
- ✅ **Error Boundaries**: React 19.x error recovery with retry mechanisms
- ✅ **State Propagation**: Automatic update of 11 assessment widgets
- ✅ **Type Safety**: TypeScript validation at compile and runtime

**Cross-Reference:** See [STATEDIAGRAM.md](STATEDIAGRAM.md#-securitylevelstate-hook-state-management) for detailed state machine.

## 🔄 Assessment Generation Process (v1.0)

This flowchart details the comprehensive assessment generation workflow with service layer integration:

```mermaid
flowchart TD
    SecurityLevels[Security Levels<br>Updated] --> ValidateLevels{Validate<br>Input?}
    ValidateLevels -->|Valid| InitServices[Initialize Service Layer]
    ValidateLevels -->|Invalid| ValidationError[Display Validation Error]
    ValidationError --> End([End])
    
    InitServices --> ParallelFetch{Parallel Service<br>Calls}
    
    ParallelFetch -->|CIAContentService| GetCIADetails[Retrieve CIA Component<br>Details & ROI]
    ParallelFetch -->|BusinessImpactService| CalcBusinessImpact[Calculate Business<br>Impact Analysis]
    ParallelFetch -->|ComplianceService| MapCompliance[Map to Compliance<br>Frameworks]
    ParallelFetch -->|SecurityMetricsService| CalcMetrics[Calculate Security<br>Metrics]
    ParallelFetch -->|TechnicalImplementationService| GetTechDetails[Retrieve Technical<br>Implementation]
    ParallelFetch -->|SecurityResourceService| GetResources[Retrieve Security<br>Resources]
    
    GetCIADetails --> Aggregate[Aggregate Assessment<br>Results]
    CalcBusinessImpact --> Aggregate
    MapCompliance --> Aggregate
    CalcMetrics --> Aggregate
    GetTechDetails --> Aggregate
    GetResources --> Aggregate
    
    Aggregate --> ValidateResults{Validate<br>Results?}
    ValidateResults -->|Valid| GenerateOutput[Generate Assessment<br>Output]
    ValidateResults -->|Invalid| FallbackData[Use Fallback<br>Defaults]
    FallbackData --> GenerateOutput
    
    GenerateOutput --> CalcCostEstimates[Calculate Cost<br>Estimates CAPEX/OPEX]
    CalcCostEstimates --> GenRecommendations[Generate Prioritized<br>Recommendations]
    GenRecommendations --> CompileResults[Compile Complete<br>Assessment Package]
    CompileResults --> UpdateWidgets[Update 11 Assessment<br>Widgets]
    
    UpdateWidgets --> RenderCheck{Render<br>Success?}
    RenderCheck -->|Success| DisplayResults[Display Assessment<br>Results]
    RenderCheck -->|Error| ErrorBoundary[Error Boundary<br>Catches Exception]
    ErrorBoundary --> LogError[Log Error Details]
    LogError --> ShowFallbackUI[Show Fallback UI<br>with Retry]
    ShowFallbackUI -->|Retry| InitServices
    ShowFallbackUI -->|Cancel| End
    
    DisplayResults --> UserAction{User Action}
    UserAction -->|Explore Details| DrillDown[Navigate to<br>Specific Widget]
    UserAction -->|Export| TriggerExport[Trigger Export<br>Workflow]
    UserAction -->|Modify Levels| UpdateLevels[Return to Security<br>Level Configuration]
    
    DrillDown --> DisplayResults
    TriggerExport --> End
    UpdateLevels --> SecurityLevels
    
    %% Apply styles using class definitions
    classDef input fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef service fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef decision fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef output fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef endnode fill:#95a5a6,stroke:#7f8c8d,stroke-width:2px,color:white
    
    class SecurityLevels input
    class InitServices,Aggregate,GenerateOutput,CalcCostEstimates,GenRecommendations,CompileResults,UpdateWidgets process
    class GetCIADetails,CalcBusinessImpact,MapCompliance,CalcMetrics,GetTechDetails,GetResources service
    class ValidateLevels,ParallelFetch,ValidateResults,RenderCheck,UserAction decision
    class ValidationError,FallbackData,ErrorBoundary,LogError,ShowFallbackUI error
    class DisplayResults,DrillDown,TriggerExport output
    class End endnode
```

**Service Layer Integration:**

| Service | Purpose | Output |
|---------|---------|--------|
| **CIAContentService** | Retrieves CIA triad details, recommendations, ROI | Security level descriptions, implementation guidance |
| **BusinessImpactService** | Calculates financial, operational, regulatory impact | Business impact analysis with risk quantification |
| **ComplianceService** | Maps to ISO 27001, NIST CSF, CIS Controls | Framework alignment and gap analysis |
| **SecurityMetricsService** | Calculates security scores and metrics | Security posture metrics and trends |
| **TechnicalImplementationService** | Provides implementation details | Technical specifications and architectures |
| **SecurityResourceService** | Retrieves security resources | Documentation links, tools, training |

**Performance Characteristics:**
- **Parallel Service Calls**: 6 services execute concurrently (~200-500ms total)
- **Caching**: Results cached in memory during session
- **Fallback Handling**: Default values if service fails
- **Error Recovery**: Automatic retry with exponential backoff

**Cross-Reference:** See [STATEDIAGRAM.md](STATEDIAGRAM.md#-widget-component-state-machine-v10) for widget lifecycle details.

## 🔄 Data Flow Process

This flowchart shows how data flows through the application components:

```mermaid
flowchart LR
    subgraph "User Interaction"
        UI[User Interface]
        Widgets[Widget Components]
    end
    
    subgraph "Application Logic"
        Hooks[React Hooks]
        Services[Service Layer]
    end
    
    subgraph "Data Management"
        Providers[Data Providers]
        Data[Static Data]
    end
    
    UI --> Widgets
    Widgets --> Hooks
    Hooks --> Services
    Services --> Providers
    Providers --> Data
    Data --> Providers
    Providers --> Services
    Services --> Hooks
    Hooks --> Widgets
    Widgets --> UI
    
    %% Apply styles using class definitions
    classDef ui fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef logic fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef data fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    
    class UI,Widgets ui
    class Hooks,Services logic
    class Providers,Data data
```

## 📊 Compliance Framework Mapping Process (v1.0)

This flowchart illustrates how security controls are mapped to compliance frameworks:

```mermaid
flowchart TD
    Start([Security Levels<br>Configured]) --> SelectFramework{Select Compliance<br>Framework}
    
    SelectFramework -->|ISO 27001| ISO[Map to ISO 27001<br>Controls]
    SelectFramework -->|NIST CSF 2.0| NIST[Map to NIST CSF<br>Functions]
    SelectFramework -->|CIS Controls v8.1| CIS[Map to CIS<br>Safeguards]
    SelectFramework -->|All Frameworks| AllFrameworks[Map to All<br>Frameworks]
    
    ISO --> MapControls[Map Security Levels<br>to Framework Controls]
    NIST --> MapControls
    CIS --> MapControls
    AllFrameworks --> MapControls
    
    MapControls --> ConfidentialityMap[Confidentiality Controls<br>A.8 Information Security]
    MapControls --> IntegrityMap[Integrity Controls<br>A.14 System Development]
    MapControls --> AvailabilityMap[Availability Controls<br>A.17 Business Continuity]
    
    ConfidentialityMap --> CalculateGap[Calculate Gap<br>Analysis]
    IntegrityMap --> CalculateGap
    AvailabilityMap --> CalculateGap
    
    CalculateGap --> IdentifyGaps{Gaps<br>Identified?}
    IdentifyGaps -->|Yes| PrioritizeGaps[Prioritize Gaps by<br>Risk & Impact]
    IdentifyGaps -->|No| FullCompliance[Full Compliance<br>Achieved]
    
    PrioritizeGaps --> GenerateRoadmap[Generate Implementation<br>Roadmap]
    FullCompliance --> GenerateRoadmap
    
    GenerateRoadmap --> EstimateCosts[Estimate Gap<br>Remediation Costs]
    EstimateCosts --> CalculateROI[Calculate Compliance<br>ROI]
    CalculateROI --> DisplayResults[Display Compliance<br>Status Widget]
    
    DisplayResults --> UserReview{User Action}
    UserReview -->|Export Report| GenerateReport[Generate Compliance<br>Report]
    UserReview -->|View Details| DrillDown[Navigate to<br>Control Details]
    UserReview -->|Change Levels| UpdateLevels[Modify Security<br>Levels]
    
    GenerateReport --> End([End])
    DrillDown --> DisplayResults
    UpdateLevels --> Start
    
    %% Apply styles
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef framework fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef mapping fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef output fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    
    class Start,End startend
    class MapControls,CalculateGap,PrioritizeGaps,GenerateRoadmap,EstimateCosts,CalculateROI process
    class ISO,NIST,CIS,AllFrameworks framework
    class ConfidentialityMap,IntegrityMap,AvailabilityMap mapping
    class SelectFramework,IdentifyGaps,UserReview decision
    class DisplayResults,GenerateReport,DrillDown output
```

**Framework Mapping Details:**

| Framework | Focus Area | Mapped Controls |
|-----------|-----------|----------------|
| **ISO 27001** | 14 control domains | A.5-A.18 based on CIA levels |
| **NIST CSF 2.0** | 6 functions (Govern, Identify, Protect, Detect, Respond, Recover) | Category alignment based on security posture |
| **CIS Controls v8.1** | 18 safeguards | Implementation groups (IG1-IG3) based on maturity |
| **GDPR** | Data protection | Articles 25, 32 technical/organizational measures |
| **HIPAA** | Healthcare data | Administrative, physical, technical safeguards |
| **SOC2** | Trust principles | Security, availability, confidentiality criteria |
| **PCI DSS** | Payment security | 12 requirements based on data sensitivity |

**Gap Analysis Methodology:**
1. **Current State**: Security levels → Framework controls
2. **Target State**: Required controls for compliance
3. **Gap Identification**: Missing or partial controls
4. **Risk Prioritization**: CVSS-based risk scoring
5. **Remediation Planning**: Phased implementation roadmap

**Cross-Reference:** See [SECURITY_ARCHITECTURE.md](SECURITY_ARCHITECTURE.md#-compliance-framework-mapping) for control details.

## 🧪 Testing Process

This flowchart illustrates the testing process for the application:

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

## 💼 Business Impact Analysis Workflow (v1.0)

This comprehensive workflow shows how business impact is calculated across multiple dimensions:

```mermaid
flowchart TD
    Start([Security Levels<br>Selected]) --> InitBIA[Initialize Business<br>Impact Analysis]
    
    InitBIA --> ParallelAnalysis{Parallel Impact<br>Assessment}
    
    ParallelAnalysis -->|Financial| FinancialImpact[Calculate Financial<br>Impact]
    ParallelAnalysis -->|Operational| OperationalImpact[Calculate Operational<br>Impact]
    ParallelAnalysis -->|Reputational| ReputationalImpact[Calculate Reputational<br>Impact]
    ParallelAnalysis -->|Regulatory| RegulatoryImpact[Calculate Regulatory<br>Impact]
    
    FinancialImpact --> CalculateLosses[Calculate Daily<br>Loss Estimates]
    CalculateLosses --> AssessConfidentiality[Assess Confidentiality<br>Breach Impact]
    AssessConfidentiality --> ConfidentialityFinancial{Impact<br>Level?}
    
    ConfidentialityFinancial -->|Very High| VH_Conf[$10K-50K daily]
    ConfidentialityFinancial -->|High| H_Conf[$1K-5K daily]
    ConfidentialityFinancial -->|Moderate| M_Conf[$500-1K daily]
    ConfidentialityFinancial -->|Low| L_Conf[$100-500 daily]
    ConfidentialityFinancial -->|None| N_Conf[$0 daily]
    
    VH_Conf --> AggregateFinancial[Aggregate Financial<br>Impact]
    H_Conf --> AggregateFinancial
    M_Conf --> AggregateFinancial
    L_Conf --> AggregateFinancial
    N_Conf --> AggregateFinancial
    
    OperationalImpact --> AssessDisruption[Assess Operational<br>Disruption]
    AssessDisruption --> CalculateDowntime[Calculate Downtime<br>Impact]
    CalculateDowntime --> AssessAvailability[Assess Availability<br>Requirements]
    AssessAvailability --> AvailabilityOperational{Impact<br>Level?}
    
    AvailabilityOperational -->|Very High| VH_Avail[Complete Service<br>Outage]
    AvailabilityOperational -->|High| H_Avail[Major Degradation]
    AvailabilityOperational -->|Moderate| M_Avail[Partial Impact]
    AvailabilityOperational -->|Low| L_Avail[Minor Disruption]
    AvailabilityOperational -->|None| N_Avail[No Impact]
    
    VH_Avail --> AggregateOperational[Aggregate Operational<br>Impact]
    H_Avail --> AggregateOperational
    M_Avail --> AggregateOperational
    L_Avail --> AggregateOperational
    N_Avail --> AggregateOperational
    
    ReputationalImpact --> AssessBrandDamage[Assess Brand<br>Damage]
    AssessBrandDamage --> CalculateRecovery[Calculate Recovery<br>Time & Cost]
    CalculateRecovery --> AggregateReputational[Aggregate Reputational<br>Impact]
    
    RegulatoryImpact --> IdentifyRegulations[Identify Applicable<br>Regulations]
    IdentifyRegulations --> CalculateFines[Calculate Potential<br>Fines & Penalties]
    CalculateFines --> AssessIntegrity[Assess Integrity<br>Requirements]
    AssessIntegrity --> IntegrityRegulatory{Impact<br>Level?}
    
    IntegrityRegulatory -->|Very High| VH_Int[Severe Penalties<br>License Revocation]
    IntegrityRegulatory -->|High| H_Int[Significant Fines<br>Legal Action]
    IntegrityRegulatory -->|Moderate| M_Int[Minor Penalties<br>Corrective Action]
    IntegrityRegulatory -->|Low| L_Int[Warnings<br>Documentation]
    IntegrityRegulatory -->|None| N_Int[No Penalties]
    
    VH_Int --> AggregateRegulatory[Aggregate Regulatory<br>Impact]
    H_Int --> AggregateRegulatory
    M_Int --> AggregateRegulatory
    L_Int --> AggregateRegulatory
    N_Int --> AggregateRegulatory
    
    AggregateFinancial --> CombineImpacts[Combine All Impact<br>Dimensions]
    AggregateOperational --> CombineImpacts
    AggregateReputational --> CombineImpacts
    AggregateRegulatory --> CombineImpacts
    
    CombineImpacts --> CalculateRisk[Calculate Overall<br>Business Risk]
    CalculateRisk --> GenerateMatrix[Generate Impact<br>Matrix]
    GenerateMatrix --> DisplayBIA[Display Business Impact<br>Analysis Widget]
    
    DisplayBIA --> UserAction{User Action}
    UserAction -->|Export| ExportBIA[Export BIA<br>Report]
    UserAction -->|Drill Down| ViewDetails[View Detailed<br>Impact Analysis]
    UserAction -->|Adjust Levels| ModifyLevels[Modify Security<br>Levels]
    
    ExportBIA --> End([End])
    ViewDetails --> DisplayBIA
    ModifyLevels --> Start
    
    %% Apply styles
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef analysis fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef impact fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef financial fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef operational fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef reputational fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef regulatory fill:#e67e22,stroke:#d35400,stroke-width:2px,color:white
    
    class Start,End startend
    class InitBIA,CalculateLosses,AssessDisruption,AssessBrandDamage,IdentifyRegulations,CombineImpacts,CalculateRisk,GenerateMatrix process
    class FinancialImpact,OperationalImpact,ReputationalImpact,RegulatoryImpact,AssessConfidentiality,AssessAvailability,AssessIntegrity analysis
    class ParallelAnalysis,ConfidentialityFinancial,AvailabilityOperational,IntegrityRegulatory,UserAction decision
    class AggregateFinancial,AggregateOperational,AggregateReputational,AggregateRegulatory impact
    class VH_Conf,H_Conf,M_Conf,L_Conf,N_Conf financial
    class VH_Avail,H_Avail,M_Avail,L_Avail,N_Avail operational
    class CalculateRecovery reputational
    class VH_Int,H_Int,M_Int,L_Int,N_Int regulatory
```

**Business Impact Dimensions:**

| Dimension | Measurement | Security Level Mapping |
|-----------|-------------|----------------------|
| **Financial** | Daily revenue loss | Confidentiality breach → $100-$50K/day |
| **Operational** | Service availability | Availability impact → 99.9% to 24/7 uptime |
| **Reputational** | Brand damage | Public disclosure → local to international coverage |
| **Regulatory** | Compliance penalties | Integrity violations → warnings to license revocation |

**Risk Quantification Method:**
```
Total Business Risk = (Financial Impact × Likelihood) + 
                      (Operational Impact × Likelihood) + 
                      (Reputational Impact × Likelihood) + 
                      (Regulatory Impact × Likelihood)
```

**Cross-Reference:** See [SECURITY_ARCHITECTURE.md](SECURITY_ARCHITECTURE.md#-business-impact-analysis) for impact calculations.

## 🔍 Widget Component Interaction

This flowchart shows how different widget components interact:

```mermaid
flowchart TD
    SLW[Security Level Widget] --> SSW[Security Summary Widget]
    SLW --> BIAW[Business Impact Widget]
    SLW --> CIA[CIA Component Widgets]
    SLW --> BV[Business Value Widgets]
    SLW --> IG[Implementation Guide Widgets]
    
    subgraph "CIA Components"
        CIA --> CIW[Confidentiality Impact]
        CIA --> IIW[Integrity Impact]
        CIA --> AIW[Availability Impact]
    end
    
    subgraph "Business Value"
        BV --> CSW[Compliance Status]
        BV --> CEW[Cost Estimation]
        BV --> VCW[Value Creation]
    end
    
    subgraph "Implementation Guide"
        IG --> TDW[Technical Details]
        IG --> SRW[Security Resources]
        IG --> SVW[Security Visualization]
    end
    
    %% Apply styles using class definitions
    classDef core fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef assessment fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef cia fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef business fill:#f1c40f,stroke:#f39c12,stroke-width:2px,color:black
    classDef implementation fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef confidentiality fill:#8e44ad,stroke:#6c3483,stroke-width:2px,color:white
    classDef integrity fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef availability fill:#2980b9,stroke:#2471a3,stroke-width:2px,color:white
    
    class SLW core
    class SSW,BIAW assessment
    class CIA,CIW,IIW,AIW cia
    class BV,CSW,CEW,VCW business
    class IG,TDW,SRW,SVW implementation
```

## 💰 Cost Estimation Workflow (v1.0)

This workflow shows the automated CAPEX/OPEX calculation process:

```mermaid
flowchart TD
    Start([Security Levels<br>Configured]) --> InitCostCalc[Initialize Cost<br>Estimation Service]
    
    InitCostCalc --> GetSecurityLevel[Retrieve Security<br>Levels]
    GetSecurityLevel --> ParallelEstimate{Parallel Cost<br>Calculation}
    
    ParallelEstimate -->|CAPEX| CalculateCAPEX[Calculate CAPEX]
    ParallelEstimate -->|OPEX| CalculateOPEX[Calculate OPEX]
    
    CalculateCAPEX --> ConfidentialityCapex[Confidentiality<br>Infrastructure]
    CalculateCAPEX --> IntegrityCapex[Integrity<br>Systems]
    CalculateCAPEX --> AvailabilityCapex[Availability<br>Infrastructure]
    
    ConfidentialityCapex --> CapexComponents[CAPEX Components]
    IntegrityCapex --> CapexComponents
    AvailabilityCapex --> CapexComponents
    
    CapexComponents --> Encryption[Encryption Hardware<br>HSM, TPM]
    CapexComponents --> Access[Access Control<br>MFA, Biometric]
    CapexComponents --> Monitoring[Monitoring Tools<br>SIEM, IDS/IPS]
    CapexComponents --> Backup[Backup Systems<br>Storage, DR Site]
    
    Encryption --> AggregateCapex[Aggregate CAPEX<br>Estimates]
    Access --> AggregateCapex
    Monitoring --> AggregateCapex
    Backup --> AggregateCapex
    
    CalculateOPEX --> ConfidentialityOpex[Confidentiality<br>Operations]
    CalculateOPEX --> IntegrityOpex[Integrity<br>Operations]
    CalculateOPEX --> AvailabilityOpex[Availability<br>Operations]
    
    ConfidentialityOpex --> OpexComponents[OPEX Components]
    IntegrityOpex --> OpexComponents
    AvailabilityOpex --> OpexComponents
    
    OpexComponents --> Staffing[Staffing Costs<br>Security Team]
    OpexComponents --> Training[Training & Cert<br>Annual]
    OpexComponents --> Licenses[Software Licenses<br>Annual]
    OpexComponents --> Maintenance[Maintenance<br>Annual]
    OpexComponents --> CloudServices[Cloud Services<br>Monthly]
    
    Staffing --> AggregateOpex[Aggregate OPEX<br>Estimates]
    Training --> AggregateOpex
    Licenses --> AggregateOpex
    Maintenance --> AggregateOpex
    CloudServices --> AggregateOpex
    
    AggregateCapex --> CombineCosts[Combine Total<br>Investment]
    AggregateOpex --> CombineCosts
    
    CombineCosts --> CalculateBreakdown[Calculate Cost<br>Breakdown by Level]
    CalculateBreakdown --> EstimateTimeline[Estimate Implementation<br>Timeline]
    EstimateTimeline --> CalculateROI[Calculate Security<br>ROI]
    
    CalculateROI --> GenerateScenarios[Generate Cost<br>Scenarios]
    GenerateScenarios --> CompareOptions{Multiple<br>Scenarios?}
    
    CompareOptions -->|Yes| ScenarioComparison[Compare Security<br>Level Scenarios]
    CompareOptions -->|No| SingleScenario[Single Scenario<br>Analysis]
    
    ScenarioComparison --> DisplayWidget[Display Cost<br>Estimation Widget]
    SingleScenario --> DisplayWidget
    
    DisplayWidget --> UserAction{User Action}
    UserAction -->|Export| ExportCosts[Export Cost<br>Report]
    UserAction -->|Compare| CompareScenarios[Compare Different<br>Security Levels]
    UserAction -->|Modify| AdjustLevels[Adjust Security<br>Levels]
    
    ExportCosts --> End([End])
    CompareScenarios --> DisplayWidget
    AdjustLevels --> Start
    
    %% Apply styles
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef calculation fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef component fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef capex fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef opex fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef output fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    
    class Start,End startend
    class InitCostCalc,GetSecurityLevel,CombineCosts,CalculateBreakdown,EstimateTimeline,CalculateROI,GenerateScenarios process
    class CalculateCAPEX,CalculateOPEX,AggregateCapex,AggregateOpex calculation
    class CapexComponents,OpexComponents,Encryption,Access,Monitoring,Backup,Staffing,Training,Licenses,Maintenance,CloudServices component
    class ParallelEstimate,CompareOptions,UserAction decision
    class ConfidentialityCapex,IntegrityCapex,AvailabilityCapex capex
    class ConfidentialityOpex,IntegrityOpex,AvailabilityOpex opex
    class DisplayWidget,ExportCosts,CompareScenarios output
```

**Cost Estimation Matrix:**

| Security Level | CAPEX Range | OPEX Annual | Implementation Time |
|---------------|-------------|-------------|-------------------|
| **None** | $0 | $0 | 0 days |
| **Low** | $50K-100K | $100K-200K | 3-6 months |
| **Moderate** | $200K-500K | $300K-600K | 6-12 months |
| **High** | $750K-1.5M | $750K-1.5M | 12-18 months |
| **Very High** | $2M-5M | $1.5M-3M | 18-24 months |

**Cost Components Breakdown:**

**CAPEX (Capital Expenditure):**
- Hardware Security Modules (HSM): $50K-500K
- Network Security Appliances: $100K-1M
- Backup & DR Infrastructure: $200K-2M
- Access Control Systems: $50K-300K
- Monitoring Tools: $100K-500K

**OPEX (Operating Expenditure):**
- Security Staff (3-10 FTE): $300K-1.5M annually
- Training & Certifications: $50K-200K annually
- Software Licenses: $100K-500K annually
- Cloud Security Services: $50K-500K annually
- Maintenance & Support: $100K-300K annually

**ROI Calculation:**
```
Security ROI = (Risk Mitigation Value - Total Investment) / Total Investment × 100%

Where:
- Risk Mitigation Value = Potential breach cost × Probability reduction
- Total Investment = CAPEX + (OPEX × Years)
```

**Cross-Reference:** See [STATEDIAGRAM.md](STATEDIAGRAM.md#-widget-interaction-states) for state management details.

## 🛡️ Error Handling and Recovery Flow (v1.0)

This comprehensive workflow shows React 19.x error boundary patterns with recovery mechanisms:

```mermaid
flowchart TD
    Start([Component<br>Rendering]) --> RenderAttempt[Attempt Component<br>Render]
    
    RenderAttempt --> RenderCheck{Render<br>Successful?}
    RenderCheck -->|Success| DisplayContent[Display Component<br>Content]
    RenderCheck -->|Error| ErrorCaught[Error Boundary<br>Catches Exception]
    
    ErrorCaught --> LogError[Log Error Details<br>to Console]
    LogError --> DetermineErrorType{Classify<br>Error Type}
    
    DetermineErrorType -->|Render Error| RenderError[Component Render<br>Exception]
    DetermineErrorType -->|Data Error| DataError[Invalid Data<br>Structure]
    DetermineErrorType -->|Network Error| NetworkError[Service Call<br>Failed]
    DetermineErrorType -->|Validation Error| ValidationError[Input Validation<br>Failed]
    
    RenderError --> ShowErrorUI[Display Error UI<br>with Error Message]
    DataError --> ShowErrorUI
    NetworkError --> ShowErrorUI
    ValidationError --> ShowErrorUI
    
    ShowErrorUI --> ProvideOptions[Provide Recovery<br>Options]
    ProvideOptions --> UserChoice{User<br>Action}
    
    UserChoice -->|Retry| ClearErrorState[Clear Error State]
    UserChoice -->|Reset| ResetToDefaults[Reset to Default<br>State]
    UserChoice -->|Ignore| PersistError[Persist Error State<br>Show Fallback]
    UserChoice -->|Report| OpenIssue[Open GitHub Issue<br>with Error Details]
    
    ClearErrorState --> RetryCount{Retry<br>Count < 3?}
    RetryCount -->|Yes| IncrementRetry[Increment Retry<br>Counter]
    RetryCount -->|No| MaxRetriesReached[Max Retries<br>Reached]
    
    IncrementRetry --> ExponentialBackoff[Apply Exponential<br>Backoff Delay]
    ExponentialBackoff --> RenderAttempt
    
    MaxRetriesReached --> ShowPermanentError[Show Permanent<br>Error State]
    ShowPermanentError --> SuggestActions[Suggest Alternative<br>Actions]
    SuggestActions --> End([End])
    
    ResetToDefaults --> ClearStorage[Clear localStorage<br>State]
    ClearStorage --> ReloadApp[Reload Application<br>with Defaults]
    ReloadApp --> Start
    
    PersistError --> RenderFallback[Render Fallback<br>Component]
    RenderFallback --> DisplayContent
    
    OpenIssue --> CreateIssueURL[Create GitHub Issue<br>URL with Details]
    CreateIssueURL --> OpenInNewTab[Open in New<br>Browser Tab]
    OpenInNewTab --> ShowErrorUI
    
    DisplayContent --> MonitorHealth[Monitor Component<br>Health]
    MonitorHealth --> HealthCheck{Component<br>Healthy?}
    HealthCheck -->|Healthy| DisplayContent
    HealthCheck -->|Unhealthy| ErrorCaught
    
    %% Apply styles
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef recovery fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef success fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    
    class Start,End startend
    class RenderAttempt,LogError,ShowErrorUI,ProvideOptions,IncrementRetry,ExponentialBackoff,ClearStorage,ReloadApp,CreateIssueURL,OpenInNewTab process
    class ErrorCaught,RenderError,DataError,NetworkError,ValidationError,ShowPermanentError error
    class RenderCheck,DetermineErrorType,UserChoice,RetryCount,HealthCheck decision
    class ClearErrorState,ResetToDefaults,RenderFallback,MonitorHealth recovery
    class DisplayContent success
```

**Error Boundary Implementation:**
```typescript
// WidgetErrorBoundary component (React class component)
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  retryCount: number;
}

// Error recovery strategies
const recoveryStrategies = {
  retry: () => this.setState({ hasError: false, error: null }),
  reset: () => { localStorage.clear(); window.location.reload(); },
  fallback: () => <FallbackComponent />,
  report: (error: Error) => window.open(`https://github.com/Hack23/cia-compliance-manager/issues/new?title=${encodeURIComponent(error.message)}`)
};
```

**Error Types Handled:**
- ✅ **Render Errors**: Component lifecycle exceptions
- ✅ **Data Validation Errors**: Type guard failures
- ✅ **Network Errors**: Service call failures
- ✅ **State Errors**: Invalid state transitions
- ❌ **Event Handler Errors**: Requires manual try-catch
- ❌ **Async Errors**: Requires promise catch

**Cross-Reference:** See [STATEDIAGRAM.md](STATEDIAGRAM.md#-react-error-boundary-state-transitions-v10) for error boundary state machine.

## 📤 Data Export and Report Generation Workflow (v1.0)

This workflow shows the comprehensive export process for generating assessment reports:

```mermaid
flowchart TD
    Start([User Triggers<br>Export]) --> SelectFormat{Select Export<br>Format}
    
    SelectFormat -->|JSON| ExportJSON[Export as JSON]
    SelectFormat -->|Markdown| ExportMarkdown[Export as Markdown]
    SelectFormat -->|PDF| ExportPDF[Export as PDF]
    SelectFormat -->|CSV| ExportCSV[Export as CSV]
    
    ExportJSON --> GatherData[Gather Assessment<br>Data]
    ExportMarkdown --> GatherData
    ExportPDF --> GatherData
    ExportCSV --> GatherData
    
    GatherData --> CollectSections{Collect Report<br>Sections}
    
    CollectSections -->|Security Levels| SecurityLevelData[Security Level<br>Configuration]
    CollectSections -->|Business Impact| BusinessImpactData[Business Impact<br>Analysis]
    CollectSections -->|Compliance| ComplianceData[Compliance Framework<br>Mapping]
    CollectSections -->|Costs| CostData[Cost Estimation<br>CAPEX/OPEX]
    CollectSections -->|Technical| TechnicalData[Technical Implementation<br>Details]
    CollectSections -->|Resources| ResourceData[Security Resources<br>& References]
    
    SecurityLevelData --> ValidateData{Validate<br>Data?}
    BusinessImpactData --> ValidateData
    ComplianceData --> ValidateData
    CostData --> ValidateData
    TechnicalData --> ValidateData
    ResourceData --> ValidateData
    
    ValidateData -->|Valid| FormatData[Format Data for<br>Selected Export Type]
    ValidateData -->|Invalid| HandleMissing[Handle Missing<br>Data]
    
    HandleMissing --> UsePlaceholders[Use Placeholder<br>Values]
    UsePlaceholders --> FormatData
    
    FormatData --> GenerateDocument[Generate Export<br>Document]
    GenerateDocument --> AddMetadata[Add Document<br>Metadata]
    
    AddMetadata --> MetadataFields[Add Metadata Fields]
    MetadataFields --> Timestamp[Timestamp:<br>ISO 8601 UTC]
    MetadataFields --> Version[App Version:<br>v1.0]
    MetadataFields --> Classification[Classification:<br>CIA Levels]
    
    Timestamp --> CompileDocument[Compile Final<br>Document]
    Version --> CompileDocument
    Classification --> CompileDocument
    
    CompileDocument --> ValidateOutput{Validate<br>Output?}
    ValidateOutput -->|Valid| PrepareDownload[Prepare Browser<br>Download]
    ValidateOutput -->|Invalid| ExportError[Export Generation<br>Failed]
    
    PrepareDownload --> CreateBlob[Create Blob<br>Object]
    CreateBlob --> GenerateURL[Generate Download<br>URL]
    GenerateURL --> TriggerDownload[Trigger Browser<br>Download]
    TriggerDownload --> CleanupURL[Cleanup Blob<br>URL]
    CleanupURL --> ShowSuccess[Show Success<br>Notification]
    ShowSuccess --> End([End])
    
    ExportError --> LogExportError[Log Export<br>Error]
    LogExportError --> ShowErrorMessage[Show Error<br>Message]
    ShowErrorMessage --> OfferRetry{Offer<br>Retry?}
    OfferRetry -->|Yes| Start
    OfferRetry -->|No| End
    
    %% Apply styles
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef data fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef success fill:#27ae60,stroke:#1e8449,stroke-width:2px,color:white
    classDef metadata fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    
    class Start,End startend
    class GatherData,FormatData,GenerateDocument,AddMetadata,CompileDocument,PrepareDownload,CreateBlob,GenerateURL,TriggerDownload,CleanupURL process
    class SecurityLevelData,BusinessImpactData,ComplianceData,CostData,TechnicalData,ResourceData,UsePlaceholders data
    class SelectFormat,CollectSections,ValidateData,ValidateOutput,OfferRetry decision
    class HandleMissing,ExportError,LogExportError,ShowErrorMessage error
    class ShowSuccess success
    class MetadataFields,Timestamp,Version,Classification metadata
```

**Export Format Specifications:**

| Format | Use Case | File Size | Browser Support |
|--------|----------|-----------|----------------|
| **JSON** | API integration, programmatic access | 10-50KB | All modern browsers |
| **Markdown** | Documentation, GitHub README | 20-100KB | All modern browsers |
| **PDF** | Executive reports, presentations | 100-500KB | Chrome, Firefox, Safari |
| **CSV** | Spreadsheet analysis, Excel | 5-20KB | All modern browsers |

**Export Contents:**

**1. Executive Summary**
- Security posture overview
- Key findings and recommendations
- Risk summary
- Compliance status

**2. Security Assessment**
- CIA triad configuration
- Security level justifications
- Implementation roadmap
- Technical specifications

**3. Business Impact Analysis**
- Financial impact assessment
- Operational impact assessment
- Reputational impact assessment
- Regulatory impact assessment

**4. Compliance Mapping**
- ISO 27001 control alignment
- NIST CSF function mapping
- CIS Controls safeguard mapping
- Gap analysis and remediation plan

**5. Cost Estimation**
- CAPEX breakdown
- OPEX breakdown
- ROI calculation
- Timeline and milestones

**6. Resources**
- Documentation links
- Tool recommendations
- Training resources
- Support contacts

**Document Metadata:**
```json
{
  "document": {
    "title": "CIA Compliance Manager Assessment",
    "version": "1.0",
    "generated": "2025-11-22T15:24:45.034Z",
    "tool": "CIA Compliance Manager v0.9.2",
    "classification": {
      "confidentiality": "Moderate",
      "integrity": "High",
      "availability": "High"
    }
  }
}
```

**Cross-Reference:** See [SECURITY_ARCHITECTURE.md](SECURITY_ARCHITECTURE.md#-data-protection) for data handling security controls.

## 🏊 User-System Interaction Swim Lane Diagram (v1.0)

This swim lane diagram shows multi-actor interactions during a complete assessment workflow:

```mermaid
flowchart TD
    subgraph User["🧑 User"]
        U1[Access Application]
        U2[Configure Security Levels]
        U3[Review Assessment]
        U4[Export Report]
        U5[Share with Stakeholders]
    end
    
    subgraph Browser["🌐 Browser"]
        B1[Load Application]
        B2[Render UI]
        B3[Validate Input]
        B4[Update Display]
        B5[Trigger Download]
    end
    
    subgraph AppState["📊 Application State"]
        S1[Initialize Defaults]
        S2[Update Security Levels]
        S3[Propagate Changes]
        S4[Calculate Assessment]
        S5[Prepare Export Data]
    end
    
    subgraph Services["⚙️ Service Layer"]
        SV1[Load Static Data]
        SV2[Calculate Business Impact]
        SV3[Map Compliance]
        SV4[Estimate Costs]
        SV5[Generate Report]
    end
    
    subgraph Storage["💾 Local Storage"]
        ST1[Load Saved State]
        ST2[Persist Security Levels]
        ST3[Cache Assessment]
        ST4[Store Preferences]
        ST5[Clear on Export]
    end
    
    U1 --> B1
    B1 --> S1
    S1 --> ST1
    ST1 --> SV1
    SV1 --> B2
    B2 --> U1
    
    U2 --> B3
    B3 --> S2
    S2 --> ST2
    ST2 --> S3
    S3 --> SV2
    SV2 --> SV3
    SV3 --> SV4
    SV4 --> S4
    S4 --> B4
    B4 --> U3
    
    U4 --> S5
    S5 --> SV5
    SV5 --> B5
    B5 --> U5
    
    classDef user fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white
    classDef browser fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef state fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef service fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    classDef storage fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    
    class U1,U2,U3,U4,U5 user
    class B1,B2,B3,B4,B5 browser
    class S1,S2,S3,S4,S5 state
    class SV1,SV2,SV3,SV4,SV5 service
    class ST1,ST2,ST3,ST4,ST5 storage
```

**Actor Responsibilities:**

| Actor | Role | Key Actions |
|-------|------|------------|
| **User** | Security professional/decision maker | Configure security requirements, review recommendations, export reports |
| **Browser** | Presentation layer | Render UI, validate inputs, manage user interactions |
| **Application State** | State management | Maintain security levels, coordinate updates, trigger calculations |
| **Service Layer** | Business logic | Calculate impacts, map compliance, estimate costs, generate reports |
| **Local Storage** | Persistence layer | Save/load state, cache assessments, persist preferences |

**Interaction Patterns:**

1. **Initial Load**: User → Browser → App State → Storage → Services → Browser → User
2. **Configuration**: User → Browser → App State → Storage → Services → Browser → User
3. **Assessment**: App State → Services (parallel) → App State → Browser → User
4. **Export**: User → App State → Services → Browser → User

## 🔄 Widget Lifecycle and State Transitions (v1.0)

This diagram shows the complete lifecycle of assessment widgets:

```mermaid
stateDiagram-v2
    [*] --> Mounting: Component Created
    
    state Mounting {
        [*] --> InitializingProps
        InitializingProps --> SettingUpState
        SettingUpState --> RegisteringListeners
        RegisteringListeners --> [*]
    }
    
    Mounting --> Idle: Mount Complete
    
    state Idle {
        [*] --> AwaitingInput
        AwaitingInput --> ValidatingProps
        ValidatingProps --> AwaitingInput
    }
    
    Idle --> Loading: Props Changed
    
    state Loading {
        [*] --> FetchingData
        FetchingData --> ProcessingData
        ProcessingData --> ValidatingData
        ValidatingData --> [*]
    }
    
    Loading --> Displaying: Data Valid
    Loading --> Error: Data Invalid
    
    state Displaying {
        [*] --> RenderingContent
        RenderingContent --> InteractiveMode
        InteractiveMode --> UpdatingView
        UpdatingView --> RenderingContent
    }
    
    Displaying --> Loading: Props Changed
    Displaying --> Exporting: Export Triggered
    
    state Exporting {
        [*] --> PreparingData
        PreparingData --> FormattingOutput
        FormattingOutput --> GeneratingFile
        GeneratingFile --> [*]
    }
    
    Exporting --> Displaying: Export Complete
    
    state Error {
        [*] --> DisplayingError
        DisplayingError --> OfferingRetry
        OfferingRetry --> WaitingForAction
    }
    
    Error --> Loading: User Retries
    Error --> Idle: User Resets
    
    Displaying --> Unmounting: Component Removed
    Idle --> Unmounting: Component Removed
    Error --> Unmounting: Component Removed
    
    state Unmounting {
        [*] --> CleaningUpListeners
        CleaningUpListeners --> ClearingState
        ClearingState --> RemovingDOM
        RemovingDOM --> [*]
    }
    
    Unmounting --> [*]
```

**Lifecycle Phases:**

| Phase | Duration | Key Operations |
|-------|----------|----------------|
| **Mounting** | <100ms | Initialize props, setup state, register event listeners |
| **Idle** | Variable | Await user input, validate props on change |
| **Loading** | 200-500ms | Fetch data from services, process and validate |
| **Displaying** | Variable | Render content, handle user interactions, update view |
| **Exporting** | 500-2000ms | Prepare data, format output, generate file |
| **Error** | Variable | Display error, offer recovery options |
| **Unmounting** | <50ms | Cleanup listeners, clear state, remove DOM |

**State Transition Events:**

- `Component Created`: React instantiates widget component
- `Mount Complete`: Component rendered in DOM
- `Props Changed`: Parent component updates security levels
- `Data Valid/Invalid`: Service call success or failure
- `Export Triggered`: User clicks export button
- `User Retries/Resets`: Error recovery action
- `Component Removed`: Parent component unmounts widget

**Cross-Reference:** See [STATEDIAGRAM.md](STATEDIAGRAM.md#-widget-component-state-machine-v10) for detailed state machine specifications.

## 🔐 Authentication and Session Management (Future)

> **Note:** v1.0 is a client-side only application with no authentication. This workflow is for future reference when backend integration is implemented.

```mermaid
flowchart TD
    Start([User Accesses<br>Application]) --> CheckSession{Session<br>Valid?}
    
    CheckSession -->|Yes| LoadApp[Load Application]
    CheckSession -->|No| ShowLogin[Show Login Page]
    
    ShowLogin --> UserLogin{Login<br>Method?}
    UserLogin -->|Username/Password| BasicAuth[Basic Authentication]
    UserLogin -->|SSO| SSOAuth[SSO/SAML Authentication]
    UserLogin -->|OAuth2| OAuth2Flow[OAuth2/OIDC Flow]
    
    BasicAuth --> ValidateCredentials{Credentials<br>Valid?}
    ValidateCredentials -->|Yes| CheckMFA{MFA<br>Enabled?}
    ValidateCredentials -->|No| LoginError[Show Login Error]
    LoginError --> ShowLogin
    
    CheckMFA -->|Yes| PromptMFA[Prompt for MFA Code]
    CheckMFA -->|No| CreateSession[Create User Session]
    
    PromptMFA --> ValidateMFA{MFA Code<br>Valid?}
    ValidateMFA -->|Yes| CreateSession
    ValidateMFA -->|No| MFAError[Show MFA Error]
    MFAError --> PromptMFA
    
    SSOAuth --> RedirectToIDP[Redirect to Identity<br>Provider]
    RedirectToIDP --> SAMLResponse[Receive SAML<br>Response]
    SAMLResponse --> ValidateSAML{SAML<br>Valid?}
    ValidateSAML -->|Yes| CreateSession
    ValidateSAML -->|No| SSOError[Show SSO Error]
    SSOError --> ShowLogin
    
    OAuth2Flow --> RedirectToProvider[Redirect to OAuth<br>Provider]
    RedirectToProvider --> AuthCodeReceived[Receive Authorization<br>Code]
    AuthCodeReceived --> ExchangeToken[Exchange for Access<br>Token]
    ExchangeToken --> ValidateToken{Token<br>Valid?}
    ValidateToken -->|Yes| CreateSession
    ValidateToken -->|No| OAuth2Error[Show OAuth2 Error]
    OAuth2Error --> ShowLogin
    
    CreateSession --> StoreToken[Store Session<br>Token]
    StoreToken --> SetExpiration[Set Token<br>Expiration]
    SetExpiration --> LoadApp
    
    LoadApp --> ActiveSession[Active User<br>Session]
    ActiveSession --> SessionMonitor{Session<br>Expired?}
    
    SessionMonitor -->|No| ContinueSession[Continue Using<br>Application]
    ContinueSession --> ActiveSession
    
    SessionMonitor -->|Yes| RefreshToken{Refresh Token<br>Available?}
    RefreshToken -->|Yes| RenewSession[Renew Session<br>Token]
    RefreshToken -->|No| SessionExpired[Session Expired]
    
    RenewSession --> ActiveSession
    SessionExpired --> ClearSession[Clear Session<br>Data]
    ClearSession --> ShowLogin
    
    ActiveSession -->|User Logs Out| Logout[User Logout<br>Requested]
    Logout --> InvalidateToken[Invalidate Session<br>Token]
    InvalidateToken --> ClearSession
    
    classDef startend fill:#3498db,stroke:#2980b9,stroke-width:2px,color:white,rx:25
    classDef process fill:#34495e,stroke:#2c3e50,stroke-width:2px,color:white
    classDef decision fill:#f39c12,stroke:#e67e22,stroke-width:2px,color:white
    classDef auth fill:#16a085,stroke:#1abc9c,stroke-width:2px,color:white
    classDef error fill:#e74c3c,stroke:#c0392b,stroke-width:2px,color:white
    classDef session fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:white
    
    class Start startend
    class LoadApp,CreateSession,StoreToken,SetExpiration,RenewSession,InvalidateToken,ClearSession process
    class CheckSession,UserLogin,ValidateCredentials,CheckMFA,ValidateMFA,ValidateSAML,ValidateToken,SessionMonitor,RefreshToken decision
    class BasicAuth,SSOAuth,OAuth2Flow,PromptMFA,RedirectToIDP,SAMLResponse,RedirectToProvider,AuthCodeReceived,ExchangeToken auth
    class LoginError,MFAError,SSOError,OAuth2Error error
    class ActiveSession,ContinueSession,SessionExpired,Logout session
```

**Future Authentication Requirements:**
- OAuth2/OIDC for modern SSO
- SAML 2.0 for enterprise SSO
- MFA support (TOTP, SMS, WebAuthn)
- Session timeout: 30 minutes idle
- Token refresh: 24-hour max lifetime
- Secure token storage (httpOnly cookies)

## 📊 Summary: v1.0 Process Flow Architecture

### Process Flow Inventory

| Process Category | Workflows | Decision Points | Error Paths | Documentation |
|-----------------|-----------|-----------------|-------------|---------------|
| **Security Configuration** | 1 | 5 | 3 | ✅ Complete |
| **Assessment Generation** | 1 | 4 | 2 | ✅ Complete |
| **Compliance Mapping** | 1 | 3 | 1 | ✅ Complete |
| **Business Impact Analysis** | 1 | 6 | 1 | ✅ Complete |
| **Cost Estimation** | 1 | 3 | 1 | ✅ Complete |
| **Error Handling** | 1 | 5 | 4 | ✅ Complete |
| **Data Export** | 1 | 4 | 2 | ✅ Complete |
| **User Interaction** | 1 (swim lane) | 0 | 0 | ✅ Complete |
| **Widget Lifecycle** | 1 (state diagram) | 2 | 2 | ✅ Complete |
| **Authentication** | 1 (future) | 7 | 4 | ✅ Complete |

**Total:** 10 process flows, 39 decision points, 20 error recovery paths

### React 19.x Integration

**Component Patterns:**
- Functional components with hooks (95% of components)
- Class components for error boundaries only
- Lazy loading with Suspense for code splitting
- Custom hooks for reusable state logic

**State Management:**
- `useState`: Component-level state
- `useEffect`: Side effects and subscriptions
- `useCallback`: Memoized event handlers
- Custom hooks: `useSecurityLevelState`, `useLocalStorage`

**Error Handling:**
- Error boundaries for React errors
- Try-catch for event handlers and async operations
- Type guards for runtime validation
- Graceful degradation with fallback UI

**Performance Optimizations:**
- Lazy loading reduces initial bundle by ~30%
- Parallel service calls reduce latency by ~60%
- localStorage caching eliminates redundant calculations
- Memoization prevents unnecessary re-renders

### ISMS Compliance Mapping

**ISO 27001 Alignment:**
- **A.8.1 (Inventory of Assets)**: Process documentation maintained ✅
- **A.12.1 (Operational Procedures)**: Documented procedures and responsibilities ✅
- **A.14.1 (Security in Development)**: Development process flows documented ✅
- **A.16.1 (Incident Management)**: Error handling and recovery procedures ✅

**NIST CSF 2.0 Alignment:**
- **GV.PO (Governance Policy)**: Process governance established ✅
- **ID.RA (Risk Assessment)**: Risk assessment processes documented ✅
- **PR.IP (Information Protection)**: Data handling processes defined ✅
- **DE.CM (Continuous Monitoring)**: Monitoring processes documented ✅
- **RS.MA (Response Management)**: Error response procedures defined ✅

**CIS Controls v8.1 Alignment:**
- **16.1 (Establish Process)**: Security processes established ✅
- **16.2 (Establish Process)**: Vulnerability management processes ✅
- **16.10 (Apply Secure Design)**: Secure design patterns documented ✅
- **16.14 (Establish Process)**: Incident response processes ✅

### Performance Metrics

**Process Execution Times:**
- Security Level Configuration: <100ms
- Assessment Generation: 200-500ms
- Compliance Mapping: 100-300ms
- Business Impact Analysis: 150-400ms
- Cost Estimation: 100-250ms
- Error Recovery: <50ms
- Data Export: 500-2000ms (format dependent)

**User Experience Metrics:**
- Time to First Render: <1s
- Time to Interactive: <2s
- Widget Update Latency: <300ms
- Export Generation: <3s
- Error Recovery Time: <5s

### Maintenance Notes

**Updating Process Flows:**
1. Review affected workflows when code changes
2. Update Mermaid diagrams to reflect changes
3. Update decision points and error paths
4. Verify cross-references to other documentation
5. Test diagram rendering in Markdown viewers

**Adding New Workflows:**
1. Identify user journey and business process
2. Map decision points and validation gates
3. Define error handling and recovery paths
4. Document in Mermaid flowchart format
5. Add to process inventory table
6. Cross-reference with STATEDIAGRAM.md

**Review Cycle:**
- Review after major feature releases
- Update when process flows change
- Validate against actual implementation quarterly
- Synchronize with STATEDIAGRAM.md changes

### Cross-References

- **[STATEDIAGRAM.md](STATEDIAGRAM.md)**: State machine specifications for all workflows
- **[SECURITY_ARCHITECTURE.md](SECURITY_ARCHITECTURE.md)**: Security controls for each process
- **[THREAT_MODEL.md](THREAT_MODEL.md)**: Threat analysis for process vulnerabilities
- **[WORKFLOWS.md](WORKFLOWS.md)**: CI/CD workflows and automation processes
- **[ARCHITECTURE.md](ARCHITECTURE.md)**: C4 model showing system context

---

**Document Status:** ✅ Complete | **Version:** v1.0 | **Last Updated:** 2025-11-22

These comprehensive process flowcharts provide complete documentation of the CIA Compliance Manager v1.0 workflows, illustrating how security assessment capabilities are delivered through well-defined processes with error handling, validation, and state management. The diagrams serve as authoritative documentation for developers, security professionals, and auditors understanding system operations per Hack23 ISMS requirements.
