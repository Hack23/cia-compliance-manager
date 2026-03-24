[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia-services.ts:231](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L231)

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

Defined in: [types/cia-services.ts:233](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L233)

***

### technical

> **technical**: `string`

Defined in: [types/cia-services.ts:234](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L234)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [types/cia-services.ts:235](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L235)

***

### impact?

> `optional` **impact?**: `string`

Defined in: [types/cia-services.ts:236](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L236)

***

### capex?

> `optional` **capex?**: `number`

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L239)

***

### opex?

> `optional` **opex?**: `number`

Defined in: [types/cia-services.ts:240](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L240)

***

### bg?

> `optional` **bg?**: `string`

Defined in: [types/cia-services.ts:243](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L243)

***

### text?

> `optional` **text?**: `string`

Defined in: [types/cia-services.ts:244](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L244)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/cia-services.ts:247](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L247)

***

### businessImpactDetails?

> `optional` **businessImpactDetails?**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L250)

***

### uptime?

> `optional` **uptime?**: `string`

Defined in: [types/cia-services.ts:253](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L253)

***

### rto?

> `optional` **rto?**: `string`

Defined in: [types/cia-services.ts:254](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L254)

***

### rpo?

> `optional` **rpo?**: `string`

Defined in: [types/cia-services.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L255)

***

### mttr?

> `optional` **mttr?**: `string`

Defined in: [types/cia-services.ts:256](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L256)

***

### sla?

> `optional` **sla?**: `string`

Defined in: [types/cia-services.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L257)

***

### validationMethod?

> `optional` **validationMethod?**: `string`

Defined in: [types/cia-services.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L260)

***

### validationLevel?

> `optional` **validationLevel?**: `string`

Defined in: [types/cia-services.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L261)

***

### errorRate?

> `optional` **errorRate?**: `string`

Defined in: [types/cia-services.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L262)

***

### protectionMethod?

> `optional` **protectionMethod?**: `string`

Defined in: [types/cia-services.ts:265](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L265)

***

### privacyImpact?

> `optional` **privacyImpact?**: `string`

Defined in: [types/cia-services.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L266)

***

### implementationComplexity?

> `optional` **implementationComplexity?**: `string`

Defined in: [types/cia-services.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L269)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements?**: `string`

Defined in: [types/cia-services.ts:270](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L270)

***

### requiredExpertise?

> `optional` **requiredExpertise?**: `string`

Defined in: [types/cia-services.ts:271](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L271)

***

### controlFamily?

> `optional` **controlFamily?**: `string`[]

Defined in: [types/cia-services.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L272)

***

### applicableFrameworks?

> `optional` **applicableFrameworks?**: `string`[]

Defined in: [types/cia-services.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L273)

***

### businessPerspective?

> `optional` **businessPerspective?**: `string`

Defined in: [types/cia-services.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L276)

***

### implementationSteps?

> `optional` **implementationSteps?**: `string`[]

Defined in: [types/cia-services.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L277)

***

### effort?

> `optional` **effort?**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [types/cia-services.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L278)

***

### keyImpact?

> `optional` **keyImpact?**: `string`

Defined in: [types/cia-services.ts:279](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L279)

***

### metric?

> `optional` **metric?**: `string`

Defined in: [types/cia-services.ts:280](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L280)

***

### valuePoints?

> `optional` **valuePoints?**: `string`[]

Defined in: [types/cia-services.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L281)

***

### roiEstimate?

> `optional` **roiEstimate?**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [types/cia-services.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L282)

***

### implementationConsiderations?

> `optional` **implementationConsiderations?**: `string`

Defined in: [types/cia-services.ts:283](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L283)

***

### securityIcon?

> `optional` **securityIcon?**: `string`

Defined in: [types/cia-services.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L286)

***

### complianceImpact?

> `optional` **complianceImpact?**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [types/cia-services.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L287)

***

### codeExamples?

> `optional` **codeExamples?**: [`CodeExample`](CodeExample.md)[]

Defined in: [types/cia-services.ts:290](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L290)

***

### technicalImplementation?

> `optional` **technicalImplementation?**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [types/cia-services.ts:291](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L291)

***

### expertise?

> `optional` **expertise?**: `string`

Defined in: [types/cia-services.ts:294](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L294)

***

### timeframe?

> `optional` **timeframe?**: `string`

Defined in: [types/cia-services.ts:295](https://github.com/Hack23/cia-compliance-manager/blob/bf8189075bc86cb5a8999dce70d7c9c39852b616/src/types/cia-services.ts#L295)
