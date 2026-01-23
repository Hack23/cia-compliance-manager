[**CIA Compliance Manager Documentation v1.1.12**](../README.md)

***

[CIA Compliance Manager Documentation](../modules.md) / types

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

- [AvailabilityImpactWidgetProps](interfaces/AvailabilityImpactWidgetProps.md)
- [BaseWidgetProps](interfaces/BaseWidgetProps.md)
- [BusinessImpactDetail](interfaces/BusinessImpactDetail.md)
- [BusinessImpactDetails](interfaces/BusinessImpactDetails.md)
- [BusinessImpactSectionProps](interfaces/BusinessImpactSectionProps.md)
- [BusinessRiskDisplayProps](interfaces/BusinessRiskDisplayProps.md)
- [CIADataProvider](interfaces/CIADataProvider.md)
- [CIADetails](interfaces/CIADetails.md)
- [CIAImpactCardProps](interfaces/CIAImpactCardProps.md)
- [CodeExample](interfaces/CodeExample.md)
- [CommonWidgetProps](interfaces/CommonWidgetProps.md)
- [ComplianceImpact](interfaces/ComplianceImpact.md)
- [ComplianceStatusWidgetProps](interfaces/ComplianceStatusWidgetProps.md)
- [ConfidentialityImpactWidgetProps](interfaces/ConfidentialityImpactWidgetProps.md)
- [ImplementationEffort](interfaces/ImplementationEffort.md)
- [IntegrityImpactWidgetProps](interfaces/IntegrityImpactWidgetProps.md)
- [KeyboardShortcut](interfaces/KeyboardShortcut.md)
- [KeyboardShortcutContextValue](interfaces/KeyboardShortcutContextValue.md)
- [KeyboardShortcutHelpProps](interfaces/KeyboardShortcutHelpProps.md)
- [MetricsCardProps](interfaces/MetricsCardProps.md)
- [RadarChartProps](interfaces/RadarChartProps.md)
- [RiskAssessmentProps](interfaces/RiskAssessmentProps.md)
- [ROIEstimate](interfaces/ROIEstimate.md)
- [ROIEstimatesMap](interfaces/ROIEstimatesMap.md)
- [ROIMetrics](interfaces/ROIMetrics.md)
- [SecurityLevelWidgetProps](interfaces/SecurityLevelWidgetProps.md)
- [SecurityResourcesWidgetProps](interfaces/SecurityResourcesWidgetProps.md)
- [ShortcutBadgeProps](interfaces/ShortcutBadgeProps.md)
- [StatusBadgeProps](interfaces/StatusBadgeProps.md)
- [Tab](interfaces/Tab.md)
- [TabsState](interfaces/TabsState.md)
- [TechnicalImplementationDetails](interfaces/TechnicalImplementationDetails.md)
- [UseKeyboardShortcutsOptions](interfaces/UseKeyboardShortcutsOptions.md)
- [UseTabsOptions](interfaces/UseTabsOptions.md)
- [UseTabsReturn](interfaces/UseTabsReturn.md)
- [WidgetHeaderProps](interfaces/WidgetHeaderProps.md)
- [WithSecurityLevelProps](interfaces/WithSecurityLevelProps.md)

## Type Aliases

- [BusinessImpactAnalysisWidgetProps](type-aliases/BusinessImpactAnalysisWidgetProps.md)
- [CIAComponentColor](type-aliases/CIAComponentColor.md)
- [CIAComponentType](type-aliases/CIAComponentType.md)
- [CostEstimationWidgetProps](type-aliases/CostEstimationWidgetProps.md)
- [Platform](type-aliases/Platform.md)
- [ShortcutCategory](type-aliases/ShortcutCategory.md)
- [ShortcutMap](type-aliases/ShortcutMap.md)
- [TechnicalDetailsWidgetProps](type-aliases/TechnicalDetailsWidgetProps.md)
- [ValueCreationWidgetProps](type-aliases/ValueCreationWidgetProps.md)

## Functions

- [isCIAComponentType](functions/isCIAComponentType.md)

## References

### AvailabilityImpact

Re-exports [AvailabilityImpact](cia/interfaces/AvailabilityImpact.md)

***

### BaseImpact

Re-exports [BaseImpact](cia/interfaces/BaseImpact.md)

***

### BusinessConsideration

Re-exports [BusinessConsideration](businessImpact/interfaces/BusinessConsideration.md)

***

### BusinessConsiderations

Re-exports [BusinessConsiderations](businessImpact/interfaces/BusinessConsiderations.md)

***

### BusinessImpactIcons

Re-exports [BusinessImpactIcons](businessImpact/interfaces/BusinessImpactIcons.md)

***

### BusinessKeyBenefit

Re-exports [BusinessKeyBenefit](businessImpact/interfaces/BusinessKeyBenefit.md)

***

### BusinessKeyBenefits

Re-exports [BusinessKeyBenefits](businessImpact/interfaces/BusinessKeyBenefits.md)

***

### BusinessROIEstimates

Re-exports [BusinessROIEstimates](businessImpact/interfaces/BusinessROIEstimates.md)

***

### BusinessValueMetric

Re-exports [BusinessValueMetric](businessImpact/interfaces/BusinessValueMetric.md)

***

### calculateOverallSecurityLevel

Re-exports [calculateOverallSecurityLevel](cia/functions/calculateOverallSecurityLevel.md)

***

### calculateRiskLevel

Re-exports [calculateRiskLevel](cia/functions/calculateRiskLevel.md)

***

### CIABaseWidgetProps

Re-exports [CIABaseWidgetProps](widgets/interfaces/CIABaseWidgetProps.md)

***

### CIAComponent

Re-exports [CIAComponent](cia/type-aliases/CIAComponent.md)

***

### CIAImpact

Re-exports [CIAImpact](cia/interfaces/CIAImpact.md)

***

### CIAOptions

Re-exports [CIAOptions](cia/interfaces/CIAOptions.md)

***

### ComplianceFramework

Re-exports [ComplianceFramework](compliance/interfaces/ComplianceFramework.md)

***

### ComplianceStatus

Re-exports [ComplianceStatus](../index/interfaces/ComplianceStatus.md)

***

### ComplianceStatusDetails

Re-exports [ComplianceStatusDetails](compliance/interfaces/ComplianceStatusDetails.md)

***

### ConfidentialityImpact

Re-exports [ConfidentialityImpact](cia/interfaces/ConfidentialityImpact.md)

***

### FrameworkApplicabilityOptions

Re-exports [FrameworkApplicabilityOptions](compliance/interfaces/FrameworkApplicabilityOptions.md)

***

### FrameworkComplianceStatus

Re-exports [FrameworkComplianceStatus](compliance/interfaces/FrameworkComplianceStatus.md)

***

### getSecurityLevelFromValue

Re-exports [getSecurityLevelFromValue](cia/functions/getSecurityLevelFromValue.md)

***

### IntegrityImpact

Re-exports [IntegrityImpact](cia/interfaces/IntegrityImpact.md)

***

### SecurityLevel

Re-exports [SecurityLevel](cia/type-aliases/SecurityLevel.md)

***

### SecurityLevels

Re-exports [SecurityLevels](cia/interfaces/SecurityLevels.md)

***

### SecurityProfile

Re-exports [SecurityProfile](cia/interfaces/SecurityProfile.md)

***

### WidgetProps

Re-exports [WidgetProps](widgets/type-aliases/WidgetProps.md)
