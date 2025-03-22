[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [src/types/cia-services.ts:169](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L169)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Extended by

- [`AvailabilityDetail`](../../widgets/interfaces/AvailabilityDetail.md)
- [`IntegrityDetail`](../../widgets/interfaces/IntegrityDetail.md)
- [`ConfidentialityDetail`](../../widgets/interfaces/ConfidentialityDetail.md)

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [src/types/cia-services.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L207)

***

### bg

> **bg**: `string`

Defined in: [src/types/cia-services.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L181)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [src/types/cia-services.ts:173](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L173)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [src/types/cia-services.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L188)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [src/types/cia-services.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L210)

***

### capex

> **capex**: `number`

Defined in: [src/types/cia-services.ts:177](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L177)

***

### codeExamples?

> `optional` **codeExamples**: [`CodeExample`](CodeExample.md)[]

Defined in: [src/types/cia-services.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L224)

***

### complianceImpact?

> `optional` **complianceImpact**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [src/types/cia-services.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L221)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [src/types/cia-services.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L206)

***

### description

> **description**: `string`

Defined in: [src/types/cia-services.ts:171](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L171)

***

### effort?

> `optional` **effort**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [src/types/cia-services.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L212)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/cia-services.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L174)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [src/types/cia-services.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L203)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [src/types/cia-services.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L217)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [src/types/cia-services.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L211)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [src/types/cia-services.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L213)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [src/types/cia-services.ts:204](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L204)

***

### metric?

> `optional` **metric**: `string`

Defined in: [src/types/cia-services.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L214)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/types/cia-services.ts:194](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L194)

***

### opex

> **opex**: `number`

Defined in: [src/types/cia-services.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L178)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [src/types/cia-services.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L200)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [src/types/cia-services.ts:185](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L185)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [src/types/cia-services.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L205)

***

### roiEstimate?

> `optional` **roiEstimate**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [src/types/cia-services.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L216)

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/types/cia-services.ts:193](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L193)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/types/cia-services.ts:192](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L192)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [src/types/cia-services.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L220)

***

### technical

> **technical**: `string`

Defined in: [src/types/cia-services.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L172)

***

### technicalImplementation?

> `optional` **technicalImplementation**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [src/types/cia-services.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L225)

***

### text

> **text**: `string`

Defined in: [src/types/cia-services.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L182)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/types/cia-services.ts:191](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L191)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/types/cia-services.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L197)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [src/types/cia-services.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L215)
