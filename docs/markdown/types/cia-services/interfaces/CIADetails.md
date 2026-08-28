[**CIA Compliance Manager — Markdown Documentation v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia-services.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L223)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Extended by

- [`AvailabilityDetail`](../../widgets/interfaces/AvailabilityDetail.md)
- [`IntegrityDetail`](../../widgets/interfaces/IntegrityDetail.md)
- [`ConfidentialityDetail`](../../widgets/interfaces/ConfidentialityDetail.md)

## Properties

### description

> **description**: `string`

Defined in: [types/cia-services.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L224)

***

### technical

> **technical**: `string`

Defined in: [types/cia-services.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L225)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [types/cia-services.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L226)

***

### capex?

> `optional` **capex?**: `number`

Defined in: [types/cia-services.ts:228](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L228)

***

### opex?

> `optional` **opex?**: `number`

Defined in: [types/cia-services.ts:229](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L229)

***

### bg?

> `optional` **bg?**: `string`

Defined in: [types/cia-services.ts:231](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L231)

***

### text?

> `optional` **text?**: `string`

Defined in: [types/cia-services.ts:232](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L232)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/cia-services.ts:234](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L234)

***

### businessImpactDetails?

> `optional` **businessImpactDetails?**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L236)

***

### uptime?

> `optional` **uptime?**: `string`

Defined in: [types/cia-services.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L238)

***

### rto?

> `optional` **rto?**: `string`

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L239)

***

### rpo?

> `optional` **rpo?**: `string`

Defined in: [types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L240)

***

### mttr?

> `optional` **mttr?**: `string`

Defined in: [types/cia-services.ts:241](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L241)

***

### sla?

> `optional` **sla?**: `string`

Defined in: [types/cia-services.ts:242](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L242)

***

### validationMethod?

> `optional` **validationMethod?**: `string`

Defined in: [types/cia-services.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L244)

***

### validationLevel?

> `optional` **validationLevel?**: `string`

Defined in: [types/cia-services.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L245)

***

### errorRate?

> `optional` **errorRate?**: `string`

Defined in: [types/cia-services.ts:246](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L246)

***

### protectionMethod?

> `optional` **protectionMethod?**: `string`

Defined in: [types/cia-services.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L248)

***

### privacyImpact?

> `optional` **privacyImpact?**: `string`

Defined in: [types/cia-services.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L249)

***

### implementationComplexity?

> `optional` **implementationComplexity?**: `string`

Defined in: [types/cia-services.ts:251](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L251)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements?**: `string`

Defined in: [types/cia-services.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L252)

***

### requiredExpertise?

> `optional` **requiredExpertise?**: `string`

Defined in: [types/cia-services.ts:253](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L253)

***

### controlFamily?

> `optional` **controlFamily?**: `string`[]

Defined in: [types/cia-services.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L254)

***

### applicableFrameworks?

> `optional` **applicableFrameworks?**: `string`[]

Defined in: [types/cia-services.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L255)

***

### businessPerspective?

> `optional` **businessPerspective?**: `string`

Defined in: [types/cia-services.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L257)

***

### implementationSteps?

> `optional` **implementationSteps?**: `string`[]

Defined in: [types/cia-services.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L258)

***

### effort?

> `optional` **effort?**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [types/cia-services.ts:259](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L259)

***

### keyImpact?

> `optional` **keyImpact?**: `string`

Defined in: [types/cia-services.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L260)

***

### metric?

> `optional` **metric?**: `string`

Defined in: [types/cia-services.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L261)

***

### valuePoints?

> `optional` **valuePoints?**: `string`[]

Defined in: [types/cia-services.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L262)

***

### roiEstimate?

> `optional` **roiEstimate?**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [types/cia-services.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L263)

***

### implementationConsiderations?

> `optional` **implementationConsiderations?**: `string`

Defined in: [types/cia-services.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L264)

***

### securityIcon?

> `optional` **securityIcon?**: `string`

Defined in: [types/cia-services.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L266)

***

### complianceImpact?

> `optional` **complianceImpact?**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [types/cia-services.ts:267](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L267)

***

### codeExamples?

> `optional` **codeExamples?**: [`CodeExample`](CodeExample.md)[]

Defined in: [types/cia-services.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L269)

***

### technicalImplementation?

> `optional` **technicalImplementation?**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [types/cia-services.ts:270](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L270)

***

### expertise?

> `optional` **expertise?**: `string`

Defined in: [types/cia-services.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L272)

***

### timeframe?

> `optional` **timeframe?**: `string`

Defined in: [types/cia-services.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/types/cia-services.ts#L273)
