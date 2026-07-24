[**CIA Compliance Manager — UML Diagrams v1.1.118**](../README.md)

***

[CIA Compliance Manager — UML Diagrams](../modules.md) / data

# data

# Data Module

Aggregates all public data modules for the CIA Compliance Manager.
Includes security data, CIA options, risk impact data, security resources,
and value creation data.

## Variables

- [availabilityData](variables/availabilityData.md)
- [confidentialityData](variables/confidentialityData.md)
- [integrityData](variables/integrityData.md)
- [roiEstimatesData](variables/roiEstimatesData.md)

## References

### availabilityOptions

Re-exports [availabilityOptions](security/variables/availabilityOptions.md)

***

### confidentialityOptions

Re-exports [confidentialityOptions](security/variables/confidentialityOptions.md)

***

### integrityOptions

Re-exports [integrityOptions](security/variables/integrityOptions.md)

***

### ROI\_ESTIMATES

Re-exports [ROI_ESTIMATES](security/variables/ROI_ESTIMATES.md)

***

### defaultCIADataProvider

Re-exports [defaultCIADataProvider](ciaOptionsData/variables/defaultCIADataProvider.md)

***

### getCIAOptionsForComponent

Re-exports [getCIAOptionsForComponent](ciaOptionsData/functions/getCIAOptionsForComponent.md)

***

### getImplementationDetails

Re-exports [getImplementationDetails](ciaOptionsData/functions/getImplementationDetails.md)

***

### getDefaultSLAMetrics

Re-exports [getDefaultSLAMetrics](ciaOptionsData/functions/getDefaultSLAMetrics.md)

***

### getDefaultPrivacyImpact

Re-exports [getDefaultPrivacyImpact](ciaOptionsData/functions/getDefaultPrivacyImpact.md)

***

### getDefaultValidationLevel

Re-exports [getDefaultValidationLevel](ciaOptionsData/functions/getDefaultValidationLevel.md)

***

### getDefaultErrorRate

Re-exports [getDefaultErrorRate](ciaOptionsData/functions/getDefaultErrorRate.md)

***

### CIADetails

Re-exports [CIADetails](../types/cia-services/interfaces/CIADetails.md)

***

### financialImpactByLevel

Re-exports [financialImpactByLevel](riskImpactData/variables/financialImpactByLevel.md)

***

### operationalImpactByLevel

Re-exports [operationalImpactByLevel](riskImpactData/variables/operationalImpactByLevel.md)

***

### reputationalImpactByLevel

Re-exports [reputationalImpactByLevel](riskImpactData/variables/reputationalImpactByLevel.md)

***

### AVAILABILITY\_RISK\_IMPACTS

Re-exports [AVAILABILITY_RISK_IMPACTS](riskImpactData/variables/AVAILABILITY_RISK_IMPACTS.md)

***

### INTEGRITY\_RISK\_IMPACTS

Re-exports [INTEGRITY_RISK_IMPACTS](riskImpactData/variables/INTEGRITY_RISK_IMPACTS.md)

***

### CONFIDENTIALITY\_RISK\_IMPACTS

Re-exports [CONFIDENTIALITY_RISK_IMPACTS](riskImpactData/variables/CONFIDENTIALITY_RISK_IMPACTS.md)

***

### getRiskLevelFromSecurityLevel

Re-exports [getRiskLevelFromSecurityLevel](riskImpactData/functions/getRiskLevelFromSecurityLevel.md)

***

### getBusinessImpact

Re-exports [getBusinessImpact](riskImpactData/functions/getBusinessImpact.md)

***

### calculateBusinessImpactLevel

Re-exports [calculateBusinessImpactLevel](riskImpactData/functions/calculateBusinessImpactLevel.md)

***

### getRiskImpactLabel

Re-exports [getRiskImpactLabel](riskImpactData/functions/getRiskImpactLabel.md)

***

### createDefaultBusinessImpact

Re-exports [createDefaultBusinessImpact](riskImpactData/functions/createDefaultBusinessImpact.md)

***

### isRiskImpactLevel

Re-exports [isRiskImpactLevel](riskImpactData/functions/isRiskImpactLevel.md)

***

### isRiskImpact

Re-exports [isRiskImpact](riskImpactData/functions/isRiskImpact.md)

***

### isValidCIAComponent

Re-exports [isValidCIAComponent](riskImpactData/functions/isValidCIAComponent.md)

***

### RiskImpactLevel

Re-exports [RiskImpactLevel](riskImpactData/type-aliases/RiskImpactLevel.md)

***

### RiskImpact

Re-exports [RiskImpact](riskImpactData/interfaces/RiskImpact.md)

***

### securityResources

Re-exports [securityResources](securityResources/variables/securityResources.md)

***

### securityResourcesData

Re-exports [securityResourcesData](securityResources/variables/securityResourcesData.md)

***

### valueCreationPoints

Re-exports [valueCreationPoints](valueCreationData/variables/valueCreationPoints.md)

***

### valueCreationTitles

Re-exports [valueCreationTitles](valueCreationData/variables/valueCreationTitles.md)

***

### valueCreationImpact

Re-exports [valueCreationImpact](valueCreationData/variables/valueCreationImpact.md)

***

### VALUE\_CREATION\_POINTS

Re-exports [VALUE_CREATION_POINTS](valueCreationData/variables/VALUE_CREATION_POINTS.md)

***

### BUSINESS\_CONSIDERATIONS

Re-exports [BUSINESS_CONSIDERATIONS](valueCreationData/variables/BUSINESS_CONSIDERATIONS.md)

***

### BUSINESS\_BENEFITS

Re-exports [BUSINESS_BENEFITS](valueCreationData/variables/BUSINESS_BENEFITS.md)

***

### getROIEstimateForLevel

Re-exports [getROIEstimateForLevel](valueCreationData/functions/getROIEstimateForLevel.md)

***

### getROIEstimate

Re-exports [getROIEstimate](valueCreationData/functions/getROIEstimate.md)

***

### getValuePoints

Re-exports [getValuePoints](valueCreationData/functions/getValuePoints.md)

***

### getBusinessConsiderations

Re-exports [getBusinessConsiderations](valueCreationData/functions/getBusinessConsiderations.md)

***

### getBusinessBenefits

Re-exports [getBusinessBenefits](valueCreationData/functions/getBusinessBenefits.md)

***

### industryValueInsights

Re-exports [industryValueInsights](valueCreationData/variables/industryValueInsights.md)
