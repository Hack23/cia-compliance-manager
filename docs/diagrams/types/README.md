[**CIA Compliance Manager Diagrams v0.8.6**](../README.md)

***

[CIA Compliance Manager Diagrams](../modules.md) / types

# types

# Type Definitions Module

This module exports all type definitions used across the CIA Compliance Manager.

## Business Perspective
Type definitions ensure consistent data structures throughout the application,
supporting reliable security assessments and business impact analysis.

## Technical Perspective
Centralized type exports simplify imports and enforce type consistency.

## Namespaces

- [CIAUtilities](namespaces/CIAUtilities/README.md)

## Interfaces

### Base Types

- [BaseWidgetProps](interfaces/BaseWidgetProps.md)
- [CIABaseWidgetProps](interfaces/CIABaseWidgetProps.md)

### Business Widgets

- [BusinessImpactAnalysisWidgetProps](interfaces/BusinessImpactAnalysisWidgetProps.md)
- [CostEstimationWidgetProps](interfaces/CostEstimationWidgetProps.md)
- [ValueCreationWidgetProps](interfaces/ValueCreationWidgetProps.md)

### Compliance Widgets

- [ComplianceStatusWidgetProps](interfaces/ComplianceStatusWidgetProps.md)

### Impact Widgets

- [AvailabilityImpactWidgetProps](interfaces/AvailabilityImpactWidgetProps.md)
- [ConfidentialityImpactWidgetProps](interfaces/ConfidentialityImpactWidgetProps.md)
- [IntegrityImpactWidgetProps](interfaces/IntegrityImpactWidgetProps.md)

### Implementation Widgets

- [SecurityResourcesWidgetProps](interfaces/SecurityResourcesWidgetProps.md)
- [TechnicalDetailsWidgetProps](interfaces/TechnicalDetailsWidgetProps.md)

### Other

- [AvailabilityImpact](interfaces/AvailabilityImpact.md)
- [BaseImpact](interfaces/BaseImpact.md)
- [BusinessConsideration](interfaces/BusinessConsideration.md)
- [BusinessConsiderations](interfaces/BusinessConsiderations.md)
- [BusinessImpactDetail](interfaces/BusinessImpactDetail.md)
- [BusinessImpactDetails](interfaces/BusinessImpactDetails.md)
- [BusinessImpactIcons](interfaces/BusinessImpactIcons.md)
- [BusinessImpactSectionProps](interfaces/BusinessImpactSectionProps.md)
- [BusinessKeyBenefit](interfaces/BusinessKeyBenefit.md)
- [BusinessKeyBenefits](interfaces/BusinessKeyBenefits.md)
- [BusinessRiskDisplayProps](interfaces/BusinessRiskDisplayProps.md)
- [BusinessROIEstimates](interfaces/BusinessROIEstimates.md)
- [BusinessValueMetric](interfaces/BusinessValueMetric.md)
- [CIADataProvider](interfaces/CIADataProvider.md)
- [CIADetails](interfaces/CIADetails.md)
- [CIAImpact](interfaces/CIAImpact.md)
- [CIAImpactCardProps](interfaces/CIAImpactCardProps.md)
- [CIAOptions](interfaces/CIAOptions.md)
- [CodeExample](interfaces/CodeExample.md)
- [CommonWidgetProps](interfaces/CommonWidgetProps.md)
- [ComplianceImpact](interfaces/ComplianceImpact.md)
- [ConfidentialityImpact](interfaces/ConfidentialityImpact.md)
- [ImplementationEffort](interfaces/ImplementationEffort.md)
- [IntegrityImpact](interfaces/IntegrityImpact.md)
- [MetricsCardProps](interfaces/MetricsCardProps.md)
- [RadarChartProps](interfaces/RadarChartProps.md)
- [RiskAssessmentProps](interfaces/RiskAssessmentProps.md)
- [ROIEstimate](interfaces/ROIEstimate.md)
- [ROIEstimatesMap](interfaces/ROIEstimatesMap.md)
- [ROIMetrics](interfaces/ROIMetrics.md)
- [SecurityLevels](interfaces/SecurityLevels.md)
- [StatusBadgeProps](interfaces/StatusBadgeProps.md)
- [TechnicalImplementationDetails](interfaces/TechnicalImplementationDetails.md)
- [WidgetHeaderProps](interfaces/WidgetHeaderProps.md)
- [WithSecurityLevelProps](interfaces/WithSecurityLevelProps.md)

### Security Level Widgets

- [SecurityLevelWidgetProps](interfaces/SecurityLevelWidgetProps.md)

## Type Aliases

### Base Types

- [WidgetProps](type-aliases/WidgetProps.md)

### Other

- [CIAComponent](type-aliases/CIAComponent.md)
- [CIAComponentType](type-aliases/CIAComponentType.md)

## Functions

- [calculateOverallSecurityLevel](functions/calculateOverallSecurityLevel.md)
- [calculateRiskLevel](functions/calculateRiskLevel.md)
- [getSecurityLevelFromValue](functions/getSecurityLevelFromValue.md)
- [isCIAComponentType](functions/isCIAComponentType.md)

## References

### ComplianceFramework

Re-exports [ComplianceFramework](compliance/interfaces/ComplianceFramework.md)

***

### ComplianceStatus

Re-exports [ComplianceStatus](../index/interfaces/ComplianceStatus.md)

***

### ComplianceStatusDetails

Re-exports [ComplianceStatusDetails](compliance/interfaces/ComplianceStatusDetails.md)

***

### FrameworkApplicabilityOptions

Re-exports [FrameworkApplicabilityOptions](compliance/interfaces/FrameworkApplicabilityOptions.md)

***

### FrameworkComplianceStatus

Re-exports [FrameworkComplianceStatus](compliance/interfaces/FrameworkComplianceStatus.md)

***

### SecurityLevel

Re-exports [SecurityLevel](../index/type-aliases/SecurityLevel.md)

***

### SecurityProfile

Re-exports [SecurityProfile](../index/interfaces/SecurityProfile.md)
