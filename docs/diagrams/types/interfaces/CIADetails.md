[**CIA Compliance Manager Diagrams v0.8.5**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [types](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia-services.ts:202](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L202)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L240)

***

### bg

> **bg**: `string`

Defined in: [types/cia-services.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L214)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [types/cia-services.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L206)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [types/cia-services.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L221)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [types/cia-services.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L243)

***

### capex

> **capex**: `number`

Defined in: [types/cia-services.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L210)

***

### codeExamples?

> `optional` **codeExamples**: [`CodeExample`](CodeExample.md)[]

Defined in: [types/cia-services.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L257)

***

### complianceImpact?

> `optional` **complianceImpact**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [types/cia-services.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L254)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L239)

***

### description

> **description**: `string`

Defined in: [types/cia-services.ts:204](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L204)

***

### effort?

> `optional` **effort**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [types/cia-services.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L245)

***

### expertise?

> `optional` **expertise**: `string`

Defined in: [types/cia-services.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L261)

***

### impact?

> `optional` **impact**: `string`

Defined in: [types/cia-services.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L207)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L236)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L250)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [types/cia-services.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L244)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [types/cia-services.ts:246](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L246)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [types/cia-services.ts:237](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L237)

***

### metric?

> `optional` **metric**: `string`

Defined in: [types/cia-services.ts:247](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L247)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [types/cia-services.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L227)

***

### opex

> **opex**: `number`

Defined in: [types/cia-services.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L211)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [types/cia-services.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L233)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/cia-services.ts:218](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L218)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [types/cia-services.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L238)

***

### roiEstimate?

> `optional` **roiEstimate**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [types/cia-services.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L249)

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [types/cia-services.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L226)

***

### rto?

> `optional` **rto**: `string`

Defined in: [types/cia-services.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L225)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [types/cia-services.ts:253](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L253)

***

### technical

> **technical**: `string`

Defined in: [types/cia-services.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L205)

***

### technicalImplementation?

> `optional` **technicalImplementation**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [types/cia-services.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L258)

***

### text

> **text**: `string`

Defined in: [types/cia-services.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L215)

***

### timeframe?

> `optional` **timeframe**: `string`

Defined in: [types/cia-services.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L262)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [types/cia-services.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L224)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [types/cia-services.ts:230](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L230)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [types/cia-services.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/types/cia-services.ts#L248)
