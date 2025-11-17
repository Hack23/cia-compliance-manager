[**CIA Compliance Manager Diagrams v0.8.40**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia-services.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L227)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Extended by

- [`AvailabilityDetail`](../widgets/interfaces/AvailabilityDetail.md)
- [`IntegrityDetail`](../widgets/interfaces/IntegrityDetail.md)
- [`ConfidentialityDetail`](../widgets/interfaces/ConfidentialityDetail.md)

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [types/cia-services.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L269)

***

### bg?

> `optional` **bg**: `string`

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L239)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [types/cia-services.ts:231](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L231)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [types/cia-services.ts:246](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L246)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [types/cia-services.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L272)

***

### capex?

> `optional` **capex**: `number`

Defined in: [types/cia-services.ts:235](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L235)

***

### codeExamples?

> `optional` **codeExamples**: [`CodeExample`](CodeExample.md)[]

Defined in: [types/cia-services.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L286)

***

### complianceImpact?

> `optional` **complianceImpact**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [types/cia-services.ts:283](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L283)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [types/cia-services.ts:268](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L268)

***

### description

> **description**: `string`

Defined in: [types/cia-services.ts:229](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L229)

***

### effort?

> `optional` **effort**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [types/cia-services.ts:274](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L274)

***

### errorRate?

> `optional` **errorRate**: `string`

Defined in: [types/cia-services.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L258)

***

### expertise?

> `optional` **expertise**: `string`

Defined in: [types/cia-services.ts:290](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L290)

***

### impact?

> `optional` **impact**: `string`

Defined in: [types/cia-services.ts:232](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L232)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [types/cia-services.ts:265](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L265)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [types/cia-services.ts:279](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L279)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [types/cia-services.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L273)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [types/cia-services.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L275)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [types/cia-services.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L266)

***

### metric?

> `optional` **metric**: `string`

Defined in: [types/cia-services.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L276)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [types/cia-services.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L252)

***

### opex?

> `optional` **opex**: `number`

Defined in: [types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L236)

***

### privacyImpact?

> `optional` **privacyImpact**: `string`

Defined in: [types/cia-services.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L262)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [types/cia-services.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L261)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/cia-services.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L243)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [types/cia-services.ts:267](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L267)

***

### roiEstimate?

> `optional` **roiEstimate**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [types/cia-services.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L278)

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [types/cia-services.ts:251](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L251)

***

### rto?

> `optional` **rto**: `string`

Defined in: [types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L250)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [types/cia-services.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L282)

***

### sla?

> `optional` **sla**: `string`

Defined in: [types/cia-services.ts:253](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L253)

***

### technical

> **technical**: `string`

Defined in: [types/cia-services.ts:230](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L230)

***

### technicalImplementation?

> `optional` **technicalImplementation**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [types/cia-services.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L287)

***

### text?

> `optional` **text**: `string`

Defined in: [types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L240)

***

### timeframe?

> `optional` **timeframe**: `string`

Defined in: [types/cia-services.ts:291](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L291)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [types/cia-services.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L249)

***

### validationLevel?

> `optional` **validationLevel**: `string`

Defined in: [types/cia-services.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L257)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [types/cia-services.ts:256](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L256)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [types/cia-services.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/2b107bc5ef373a8a303974daa2e29737a341c871/src/types/cia-services.ts#L277)
