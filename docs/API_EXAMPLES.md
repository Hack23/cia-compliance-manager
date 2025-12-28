# 📚 API Usage Examples - CIA Compliance Manager

**Version:** 1.1.0 | **Last Updated:** 2025-12-28 | **Status:** ✅ Production Ready

This document provides practical examples of using the CIA Compliance Manager API. All examples are production-ready and follow best practices.

## 📋 Table of Contents

- [Service Usage](#-service-usage)
- [Widget Integration](#-widget-integration)
- [Custom Hooks](#-custom-hooks)
- [Utility Functions](#-utility-functions)
- [Type Guards](#-type-guards)
- [Common Patterns](#-common-patterns)

## 🔧 Service Usage

### CIAContentService

The `CIAContentService` provides access to CIA triad content and details.

#### Getting Component Details

```typescript
import { CIAContentService } from './services/ciaContentService';
import { useCIADataProvider } from './hooks/useCIADataProvider';

// In your component or service
const dataProvider = useCIADataProvider();
const service = new CIAContentService(dataProvider);

// Get confidentiality details for High security level
const confidentialityDetails = service.getComponentDetails('confidentiality', 'High');

if (confidentialityDetails) {
  console.log('Description:', confidentialityDetails.description);
  console.log('Technical:', confidentialityDetails.technical);
  console.log('Business Impact:', confidentialityDetails.businessImpact);
  console.log('CAPEX:', confidentialityDetails.capex);
  console.log('OPEX:', confidentialityDetails.opex);
}
```

#### Getting All CIA Options

```typescript
// Get all security level options for availability
const availabilityOptions = service.getCIAOptions('availability');

// Iterate through all security levels
Object.entries(availabilityOptions).forEach(([level, details]) => {
  console.log(`${level}: ${details.description}`);
});
```

#### Calculating ROI

```typescript
// Get ROI estimate for High security level
const roiMetrics = service.calculateROI('High');

console.log('Investment Value:', roiMetrics.value);
console.log('ROI Percentage:', roiMetrics.percentage);
console.log('Description:', roiMetrics.description);
```

### BusinessImpactService

The `BusinessImpactService` quantifies business impact across multiple dimensions.

#### Getting Business Impact Analysis

```typescript
import { BusinessImpactService } from './services/businessImpactService';

const service = new BusinessImpactService(dataProvider);

// Get business impact for High integrity level
const impact = service.getBusinessImpact('integrity', 'High');

console.log('Summary:', impact.summary);
console.log('Financial Impact:', impact.financial.description);
console.log('Financial Risk Level:', impact.financial.riskLevel);
console.log('Operational Impact:', impact.operational.description);
console.log('Operational Risk Level:', impact.operational.riskLevel);
console.log('Reputational Impact:', impact.reputational.description);
console.log('Strategic Impact:', impact.strategic.description);
```

#### Iterating Through Impact Categories

```typescript
const impact = service.getBusinessImpact('confidentiality', 'Very High');

// Process all impact categories
const categories = ['financial', 'operational', 'reputational', 'strategic', 'regulatory'];

categories.forEach(category => {
  const categoryImpact = impact[category];
  if (categoryImpact && typeof categoryImpact === 'object' && 'description' in categoryImpact) {
    console.log(`${category}:`, categoryImpact.description);
    console.log(`Risk Level:`, categoryImpact.riskLevel);
  }
});
```

### ComplianceService

The `ComplianceService` handles compliance framework mapping and status.

#### Getting Compliance Status

```typescript
import { ComplianceServiceAdapter } from './services/ComplianceServiceAdapter';

const service = new ComplianceServiceAdapter(dataProvider);

// Get compliance status for High security levels
const status = service.getComplianceStatus('High', 'High', 'High');

console.log('Overall Status:', status.overallStatus);
console.log('Compliance Score:', `${status.complianceScore}%`);
console.log('Frameworks:', status.frameworks);

// Check specific framework
status.frameworks.forEach(framework => {
  console.log(`${framework.name}: ${framework.status} (${framework.coverage}% coverage)`);
});
```

#### Getting Gap Analysis

```typescript
// Identify gaps for Moderate security levels
const gaps = service.getGapAnalysis('Moderate', 'Moderate', 'Moderate');

console.log('Total Gaps:', gaps.totalGaps);
console.log('Critical Gaps:', gaps.criticalGaps);

// Process each gap
gaps.gaps.forEach(gap => {
  console.log(`Gap: ${gap.control}`);
  console.log(`Severity: ${gap.severity}`);
  console.log(`Recommendation: ${gap.recommendation}`);
});
```

### SecurityMetricsService

The `SecurityMetricsService` provides security metrics and calculations.

#### Getting Security Metrics

```typescript
import { SecurityMetricsService } from './services/securityMetricsService';

const service = new SecurityMetricsService(dataProvider);

// Get overall security metrics
const metrics = service.getSecurityMetrics('High', 'Moderate', 'High');

console.log('Overall Score:', metrics.overallScore);
console.log('Risk Level:', metrics.riskLevel);
console.log('Confidentiality Score:', metrics.confidentialityScore);
console.log('Integrity Score:', metrics.integrityScore);
console.log('Availability Score:', metrics.availabilityScore);
```

#### Calculating Cost Estimates

```typescript
// Get detailed cost estimates
const costs = service.getCostEstimates('High', 'High', 'High');

console.log('Total CAPEX:', costs.totalCapex);
console.log('Total OPEX:', costs.totalOpex);
console.log('Total Annual Cost:', costs.totalAnnualCost);

// Breakdown by component
console.log('Confidentiality CAPEX:', costs.breakdown.confidentiality.capex);
console.log('Integrity OPEX:', costs.breakdown.integrity.opex);
console.log('Availability Total:', costs.breakdown.availability.total);
```

## 🧩 Widget Integration

### Using Security Level Widget

```typescript
import { SecurityLevelWidget } from './components/widgets/assessmentcenter/SecurityLevelWidget';
import { useState } from 'react';

function App() {
  const [confidentiality, setConfidentiality] = useState<SecurityLevel>('Moderate');
  const [integrity, setIntegrity] = useState<SecurityLevel>('Moderate');
  const [availability, setAvailability] = useState<SecurityLevel>('Moderate');

  return (
    <SecurityLevelWidget
      confidentiality={confidentiality}
      integrity={integrity}
      availability={availability}
      onConfidentialityChange={setConfidentiality}
      onIntegrityChange={setIntegrity}
      onAvailabilityChange={setAvailability}
    />
  );
}
```

### Using Business Impact Analysis Widget

```typescript
import { BusinessImpactAnalysisWidget } from './components/widgets/assessmentcenter/BusinessImpactAnalysisWidget';

function ImpactDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <BusinessImpactAnalysisWidget
        confidentiality="High"
        integrity="High"
        availability="Moderate"
      />
    </div>
  );
}
```

### Using Compliance Status Widget

```typescript
import { ComplianceStatusWidget } from './components/widgets/businessvalue/ComplianceStatusWidget';

function ComplianceDashboard() {
  const [levels, setLevels] = useState({
    confidentiality: 'High' as SecurityLevel,
    integrity: 'High' as SecurityLevel,
    availability: 'High' as SecurityLevel,
  });

  return (
    <ComplianceStatusWidget
      confidentiality={levels.confidentiality}
      integrity={levels.integrity}
      availability={levels.availability}
    />
  );
}
```

### Creating a Custom Dashboard

```typescript
import { SecuritySummaryWidget } from './components/widgets/assessmentcenter/SecuritySummaryWidget';
import { CostEstimationWidget } from './components/widgets/businessvalue/CostEstimationWidget';
import { TechnicalDetailsWidget } from './components/widgets/implementationguide/TechnicalDetailsWidget';

function CustomDashboard() {
  const [securityLevels, setSecurityLevels] = useState({
    confidentiality: 'Moderate' as SecurityLevel,
    integrity: 'Moderate' as SecurityLevel,
    availability: 'Moderate' as SecurityLevel,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Assessment Section */}
        <SecuritySummaryWidget {...securityLevels} />
        
        {/* Business Value Section */}
        <CostEstimationWidget {...securityLevels} />
        
        {/* Implementation Guide Section */}
        <TechnicalDetailsWidget {...securityLevels} />
      </div>
    </div>
  );
}
```

## 🪝 Custom Hooks

### Using useCIAContentService Hook

```typescript
import { useCIAContentService } from './hooks/useCIAContentService';

function SecurityDetails() {
  const service = useCIAContentService();
  
  const details = service.getComponentDetails('confidentiality', 'High');
  
  if (!details) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h2>Confidentiality - High Level</h2>
      <p>{details.description}</p>
      <p>Technical: {details.technical}</p>
      <p>CAPEX: ${details.capex}</p>
      <p>OPEX: ${details.opex}</p>
    </div>
  );
}
```

### Using useComplianceService Hook

```typescript
import { useComplianceService } from './hooks/useComplianceService';

function ComplianceStatus() {
  const service = useComplianceService();
  
  const status = service.getComplianceStatus('High', 'High', 'Moderate');
  
  return (
    <div>
      <h2>Compliance Status: {status.overallStatus}</h2>
      <p>Score: {status.complianceScore}%</p>
      <ul>
        {status.frameworks.map(framework => (
          <li key={framework.name}>
            {framework.name}: {framework.status} ({framework.coverage}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Using useSecurityMetricsService Hook

```typescript
import { useSecurityMetricsService } from './hooks/useSecurityMetricsService';

function SecurityMetrics() {
  const service = useSecurityMetricsService();
  const [levels] = useState({
    confidentiality: 'High' as SecurityLevel,
    integrity: 'Moderate' as SecurityLevel,
    availability: 'High' as SecurityLevel,
  });
  
  const metrics = service.getSecurityMetrics(
    levels.confidentiality,
    levels.integrity,
    levels.availability
  );
  
  return (
    <div>
      <h2>Security Metrics</h2>
      <p>Overall Score: {metrics.overallScore}</p>
      <p>Risk Level: {metrics.riskLevel}</p>
      <div className="grid grid-cols-3 gap-4">
        <div>CIA: {metrics.confidentialityScore}</div>
        <div>Integrity: {metrics.integrityScore}</div>
        <div>Availability: {metrics.availabilityScore}</div>
      </div>
    </div>
  );
}
```

## 🛠️ Utility Functions

### Security Level Utilities

```typescript
import { 
  normalizeSecurityLevel,
  getSecurityLevelValue,
  getSecurityLevelByValue 
} from './utils/securityLevelUtils';

// Normalize user input
const level1 = normalizeSecurityLevel('high');        // 'High'
const level2 = normalizeSecurityLevel('VERY HIGH');   // 'Very High'
const level3 = normalizeSecurityLevel(null);          // 'Moderate' (default)

// Get numeric value
const value = getSecurityLevelValue('High');          // 3

// Get level from value
const level = getSecurityLevelByValue(4);             // 'Very High'
```

### Risk Utilities

```typescript
import {
  calculateRiskScore,
  getRiskLevel,
  getRiskColor
} from './utils/riskUtils';

// Calculate risk score
const score = calculateRiskScore('High', 'Moderate', 'High');
console.log('Risk Score:', score);

// Get risk level description
const riskLevel = getRiskLevel(score);
console.log('Risk Level:', riskLevel);  // e.g., 'High Risk'

// Get color for visualization
const color = getRiskColor(riskLevel);
console.log('Color:', color);  // e.g., '#FF9800'
```

### Format Utilities

```typescript
import {
  formatCurrency,
  formatPercentage,
  formatSecurityLevel
} from './utils/formatUtils';

// Format currency
const cost = formatCurrency(50000);
console.log(cost);  // '$50,000'

// Format percentage
const percentage = formatPercentage(0.85);
console.log(percentage);  // '85%'

// Format security level for display
const level = formatSecurityLevel('Very High');
console.log(level);  // 'Very High' (with proper spacing)
```

### Color Utilities

```typescript
import {
  getSecurityLevelColor,
  getComplianceStatusColor,
  getRiskLevelColor
} from './utils/colorUtils';

// Get color for security level
const securityColor = getSecurityLevelColor('High');
console.log(securityColor);  // { bg: '#FF9800', text: '#FFFFFF' }

// Get color for compliance status
const complianceColor = getComplianceStatusColor('Compliant');
console.log(complianceColor);  // { bg: '#4CAF50', text: '#FFFFFF' }

// Get color for risk level
const riskColor = getRiskLevelColor('Critical Risk');
console.log(riskColor);  // '#D32F2F'
```

## 🛡️ Type Guards

### Validating CIA Components

```typescript
import { isCIAComponentType } from './types/cia-services';

function processComponent(component: string) {
  if (isCIAComponentType(component)) {
    // TypeScript now knows component is CIAComponentType
    const details = service.getComponentDetails(component, 'High');
    console.log(details);
  } else {
    console.error('Invalid CIA component:', component);
  }
}
```

### Validating Security Levels

```typescript
import { isSecurityLevel } from './utils/typeGuards';

function processLevel(level: unknown) {
  if (isSecurityLevel(level)) {
    // TypeScript now knows level is SecurityLevel
    const value = getSecurityLevelValue(level);
    console.log('Level value:', value);
  } else {
    console.error('Invalid security level:', level);
  }
}
```

## 🎯 Common Patterns

### Building a Security Assessment Flow

```typescript
import { useState } from 'react';
import { SecurityLevel } from './types/cia';

function SecurityAssessmentWizard() {
  // Step 1: Define state
  const [step, setStep] = useState(1);
  const [assessment, setAssessment] = useState({
    confidentiality: 'Moderate' as SecurityLevel,
    integrity: 'Moderate' as SecurityLevel,
    availability: 'Moderate' as SecurityLevel,
  });

  // Step 2: Handle level changes
  const updateLevel = (component: 'confidentiality' | 'integrity' | 'availability', level: SecurityLevel) => {
    setAssessment(prev => ({ ...prev, [component]: level }));
  };

  // Step 3: Get services
  const ciaService = useCIAContentService();
  const complianceService = useComplianceService();
  const metricsService = useSecurityMetricsService();

  // Step 4: Calculate results
  const metrics = metricsService.getSecurityMetrics(
    assessment.confidentiality,
    assessment.integrity,
    assessment.availability
  );

  const compliance = complianceService.getComplianceStatus(
    assessment.confidentiality,
    assessment.integrity,
    assessment.availability
  );

  // Step 5: Render wizard steps
  return (
    <div>
      {step === 1 && (
        <SecurityLevelWidget
          {...assessment}
          onConfidentialityChange={(l) => updateLevel('confidentiality', l)}
          onIntegrityChange={(l) => updateLevel('integrity', l)}
          onAvailabilityChange={(l) => updateLevel('availability', l)}
        />
      )}
      
      {step === 2 && (
        <div>
          <h2>Assessment Results</h2>
          <p>Overall Score: {metrics.overallScore}</p>
          <p>Compliance Status: {compliance.overallStatus}</p>
        </div>
      )}
      
      <div>
        <button onClick={() => setStep(step - 1)} disabled={step === 1}>
          Previous
        </button>
        <button onClick={() => setStep(step + 1)} disabled={step === 2}>
          Next
        </button>
      </div>
    </div>
  );
}
```

### Implementing Custom Security Reports

```typescript
function SecurityReport() {
  const [levels] = useState({
    confidentiality: 'High' as SecurityLevel,
    integrity: 'High' as SecurityLevel,
    availability: 'Moderate' as SecurityLevel,
  });

  const ciaService = useCIAContentService();
  const businessImpactService = new BusinessImpactService(dataProvider);
  const metricsService = useSecurityMetricsService();

  // Gather all data
  const confidentialityDetails = ciaService.getComponentDetails('confidentiality', levels.confidentiality);
  const integrityDetails = ciaService.getComponentDetails('integrity', levels.integrity);
  const availabilityDetails = ciaService.getComponentDetails('availability', levels.availability);

  const businessImpact = businessImpactService.getBusinessImpact('confidentiality', levels.confidentiality);
  const metrics = metricsService.getSecurityMetrics(levels.confidentiality, levels.integrity, levels.availability);
  const costs = metricsService.getCostEstimates(levels.confidentiality, levels.integrity, levels.availability);

  // Generate report
  return (
    <div className="security-report">
      <h1>Security Assessment Report</h1>
      
      <section>
        <h2>Security Levels</h2>
        <ul>
          <li>Confidentiality: {levels.confidentiality}</li>
          <li>Integrity: {levels.integrity}</li>
          <li>Availability: {levels.availability}</li>
        </ul>
      </section>

      <section>
        <h2>Security Metrics</h2>
        <p>Overall Score: {metrics.overallScore}</p>
        <p>Risk Level: {metrics.riskLevel}</p>
      </section>

      <section>
        <h2>Cost Analysis</h2>
        <p>Total CAPEX: ${costs.totalCapex}</p>
        <p>Total OPEX: ${costs.totalOpex}</p>
        <p>Annual Cost: ${costs.totalAnnualCost}</p>
      </section>

      <section>
        <h2>Business Impact</h2>
        <p>{businessImpact.summary}</p>
        <ul>
          <li>Financial: {businessImpact.financial.description}</li>
          <li>Operational: {businessImpact.operational.description}</li>
          <li>Reputational: {businessImpact.reputational.description}</li>
        </ul>
      </section>

      <section>
        <h2>Technical Details</h2>
        {confidentialityDetails && (
          <div>
            <h3>Confidentiality</h3>
            <p>{confidentialityDetails.technical}</p>
          </div>
        )}
        {/* Similar sections for integrity and availability */}
      </section>
    </div>
  );
}
```

### Implementing Level Comparison

```typescript
function SecurityLevelComparison() {
  const ciaService = useCIAContentService();
  const levels: SecurityLevel[] = ['Low', 'Moderate', 'High', 'Very High'];

  // Compare all levels for confidentiality
  const comparisons = levels.map(level => ({
    level,
    details: ciaService.getComponentDetails('confidentiality', level),
  }));

  return (
    <div className="comparison-table">
      <table>
        <thead>
          <tr>
            <th>Level</th>
            <th>Description</th>
            <th>CAPEX</th>
            <th>OPEX</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map(({ level, details }) => (
            <tr key={level}>
              <td>{level}</td>
              <td>{details?.description || 'N/A'}</td>
              <td>${details?.capex || 0}</td>
              <td>${details?.opex || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## 📖 Additional Resources

### Documentation

- [Developer Guide](./DEVELOPER_GUIDE.md) - Complete development guide
- [Migration Guide](./MIGRATION_GUIDE.md) - Version upgrade guide
- [API Documentation](https://hack23.github.io/cia-compliance-manager/api-docs) - Full API reference

### Code Examples

- [Widget Testing Recipe](./widget-testing-recipe.md) - Testing patterns
- [Service Architecture](./SERVICE_ARCHITECTURE.md) - Service design patterns

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Document Control:**  
**✅ Approved by:** Documentation Team  
**📤 Distribution:** Public  
**🏷️ Classification:** Public  
**📅 Effective Date:** 2025-12-28  
**⏰ Next Review:** 2026-03-28  
**🎯 Framework Compliance:** ISO 27001, NIST CSF 2.0
