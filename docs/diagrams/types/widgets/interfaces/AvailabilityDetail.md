[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/widgets](../README.md) / AvailabilityDetail

# Interface: AvailabilityDetail

Defined in: [src/types/widgets.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L118)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Extends

- [`CIADetails`](../../cia-services/interfaces/CIADetails.md)

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [src/types/cia-services.ts:207](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L207)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`applicableFrameworks`](../../cia-services/interfaces/CIADetails.md#applicableframeworks)

***

### bg

> **bg**: `string`

Defined in: [src/types/cia-services.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L181)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`bg`](../../cia-services/interfaces/CIADetails.md#bg)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [src/types/cia-services.ts:173](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L173)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`businessImpact`](../../cia-services/interfaces/CIADetails.md#businessimpact)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: [`BusinessImpactDetails`](../../cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [src/types/cia-services.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L188)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`businessImpactDetails`](../../cia-services/interfaces/CIADetails.md#businessimpactdetails)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [src/types/cia-services.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L210)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`businessPerspective`](../../cia-services/interfaces/CIADetails.md#businessperspective)

***

### capex

> **capex**: `number`

Defined in: [src/types/cia-services.ts:177](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L177)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`capex`](../../cia-services/interfaces/CIADetails.md#capex)

***

### codeExamples?

> `optional` **codeExamples**: [`CodeExample`](../../cia-services/interfaces/CodeExample.md)[]

Defined in: [src/types/cia-services.ts:224](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L224)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`codeExamples`](../../cia-services/interfaces/CIADetails.md#codeexamples)

***

### complianceImpact?

> `optional` **complianceImpact**: [`ComplianceImpact`](../../cia-services/interfaces/ComplianceImpact.md)

Defined in: [src/types/cia-services.ts:221](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L221)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`complianceImpact`](../../cia-services/interfaces/CIADetails.md#complianceimpact)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [src/types/cia-services.ts:206](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L206)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`controlFamily`](../../cia-services/interfaces/CIADetails.md#controlfamily)

***

### description

> **description**: `string`

Defined in: [src/types/cia-services.ts:171](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L171)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`description`](../../cia-services/interfaces/CIADetails.md#description)

***

### effort?

> `optional` **effort**: [`ImplementationEffort`](../../cia-services/interfaces/ImplementationEffort.md)

Defined in: [src/types/cia-services.ts:212](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L212)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`effort`](../../cia-services/interfaces/CIADetails.md#effort)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/cia-services.ts:174](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L174)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`impact`](../../cia-services/interfaces/CIADetails.md#impact)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [src/types/cia-services.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L203)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`implementationComplexity`](../../cia-services/interfaces/CIADetails.md#implementationcomplexity)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [src/types/cia-services.ts:217](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L217)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`implementationConsiderations`](../../cia-services/interfaces/CIADetails.md#implementationconsiderations)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [src/types/cia-services.ts:211](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L211)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`implementationSteps`](../../cia-services/interfaces/CIADetails.md#implementationsteps)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [src/types/cia-services.ts:213](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L213)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`keyImpact`](../../cia-services/interfaces/CIADetails.md#keyimpact)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [src/types/cia-services.ts:204](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L204)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`maintenanceRequirements`](../../cia-services/interfaces/CIADetails.md#maintenancerequirements)

***

### metric?

> `optional` **metric**: `string`

Defined in: [src/types/cia-services.ts:214](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L214)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`metric`](../../cia-services/interfaces/CIADetails.md#metric)

***

### mttr

> **mttr**: `string`

Defined in: [src/types/widgets.ts:122](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L122)

#### Overrides

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`mttr`](../../cia-services/interfaces/CIADetails.md#mttr)

***

### opex

> **opex**: `number`

Defined in: [src/types/cia-services.ts:178](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L178)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`opex`](../../cia-services/interfaces/CIADetails.md#opex)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [src/types/cia-services.ts:200](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L200)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`protectionMethod`](../../cia-services/interfaces/CIADetails.md#protectionmethod)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [src/types/cia-services.ts:185](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L185)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`recommendations`](../../cia-services/interfaces/CIADetails.md#recommendations)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [src/types/cia-services.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L205)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`requiredExpertise`](../../cia-services/interfaces/CIADetails.md#requiredexpertise)

***

### roiEstimate?

> `optional` **roiEstimate**: [`ROIEstimate`](../../cia-services/interfaces/ROIEstimate.md)

Defined in: [src/types/cia-services.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L216)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`roiEstimate`](../../cia-services/interfaces/CIADetails.md#roiestimate)

***

### rpo

> **rpo**: `string`

Defined in: [src/types/widgets.ts:121](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L121)

#### Overrides

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`rpo`](../../cia-services/interfaces/CIADetails.md#rpo)

***

### rto

> **rto**: `string`

Defined in: [src/types/widgets.ts:120](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L120)

#### Overrides

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`rto`](../../cia-services/interfaces/CIADetails.md#rto)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [src/types/cia-services.ts:220](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L220)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`securityIcon`](../../cia-services/interfaces/CIADetails.md#securityicon)

***

### technical

> **technical**: `string`

Defined in: [src/types/cia-services.ts:172](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L172)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`technical`](../../cia-services/interfaces/CIADetails.md#technical)

***

### technicalImplementation?

> `optional` **technicalImplementation**: [`TechnicalImplementationDetails`](../../cia-services/interfaces/TechnicalImplementationDetails.md)

Defined in: [src/types/cia-services.ts:225](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L225)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`technicalImplementation`](../../cia-services/interfaces/CIADetails.md#technicalimplementation)

***

### text

> **text**: `string`

Defined in: [src/types/cia-services.ts:182](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L182)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`text`](../../cia-services/interfaces/CIADetails.md#text)

***

### uptime

> **uptime**: `string`

Defined in: [src/types/widgets.ts:119](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/widgets.ts#L119)

#### Overrides

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`uptime`](../../cia-services/interfaces/CIADetails.md#uptime)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/types/cia-services.ts:197](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L197)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`validationMethod`](../../cia-services/interfaces/CIADetails.md#validationmethod)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [src/types/cia-services.ts:215](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/types/cia-services.ts#L215)

#### Inherited from

[`CIADetails`](../../cia-services/interfaces/CIADetails.md).[`valuePoints`](../../cia-services/interfaces/CIADetails.md#valuepoints)
