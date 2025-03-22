[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [services/ComplianceServiceAdapter](../README.md) / ComplianceServiceAdapter

# Class: ComplianceServiceAdapter

Defined in: [src/services/ComplianceServiceAdapter.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L26)

Adapter for the ComplianceService that provides additional integration capabilities

## Integration Perspective

This adapter extends the base ComplianceService with additional integration
capabilities, allowing the application to connect with external compliance
systems and provide more detailed compliance mapping. It serves as a bridge
between the application's internal compliance model and external standards. 🔄

## Constructors

### new ComplianceServiceAdapter()

> **new ComplianceServiceAdapter**(`dataProvider`): `ComplianceServiceAdapter`

Defined in: [src/services/ComplianceServiceAdapter.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L29)

#### Parameters

##### dataProvider

[`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md)

#### Returns

`ComplianceServiceAdapter`

## Methods

### getComplianceGapAnalysis()

> **getComplianceGapAnalysis**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `framework`): `object`

Defined in: [src/services/ComplianceServiceAdapter.ts:126](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L126)

Get compliance gap analysis for security levels compared to framework requirements

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

##### framework

`string`

Target compliance framework

#### Returns

`object`

Gap analysis with recommendations

##### gaps

> **gaps**: `string`[]

##### isCompliant

> **isCompliant**: `boolean`

##### recommendations

> **recommendations**: `string`[]

***

### getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

Defined in: [src/services/ComplianceServiceAdapter.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L41)

Get compliance status based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`ComplianceStatusDetails`](../../complianceService/interfaces/ComplianceStatusDetails.md)

Compliance status details

***

### getComplianceStatusText()

> **getComplianceStatusText**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [src/services/ComplianceServiceAdapter.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L61)

Get compliance status text based on security levels

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level

#### Returns

`string`

Compliance status text

***

### getCompliantFrameworks()

> **getCompliantFrameworks**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`[]

Defined in: [src/services/ComplianceServiceAdapter.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L95)

Get list of frameworks that the current security levels comply with

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `availabilityLevel`

Confidentiality security level

#### Returns

`string`[]

Array of compliant framework names

***

### getComponentComplianceAssessment()

> **getComponentComplianceAssessment**(`component`, `level`, `framework`): `object`

Defined in: [src/services/ComplianceServiceAdapter.ts:230](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L230)

Get compliance assessment for a specific component and framework

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

##### framework

`string`

Target compliance framework

#### Returns

`object`

Assessment of component's compliance with the framework

##### gap

> **gap**: `number`

##### isCompliant

> **isCompliant**: `boolean`

##### requiredLevel

> **requiredLevel**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

***

### getFrameworkDescription()

> **getFrameworkDescription**(`framework`): `string`

Defined in: [src/services/ComplianceServiceAdapter.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L113)

Get description of a specific compliance framework

#### Parameters

##### framework

`string`

Framework name

#### Returns

`string`

Framework description

***

### getFrameworkRequiredLevel()

> **getFrameworkRequiredLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [src/services/ComplianceServiceAdapter.ts:302](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L302)

Get required security level for a framework component

#### Parameters

##### framework

`string`

Framework name

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

CIA component

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required security level

***

### getFrameworkStatus()

> **getFrameworkStatus**(`framework`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`): [`FrameworkComplianceStatus`](../type-aliases/FrameworkComplianceStatus.md)

Defined in: [src/services/ComplianceServiceAdapter.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L281)

Get framework status based on security levels

#### Parameters

##### framework

`string`

Framework name

##### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

##### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

##### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

#### Returns

[`FrameworkComplianceStatus`](../type-aliases/FrameworkComplianceStatus.md)

Framework compliance status

***

### isFrameworkApplicable()

> **isFrameworkApplicable**(`framework`, `industry`?, `region`?): `boolean`

Defined in: [src/services/ComplianceServiceAdapter.ts:352](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/services/ComplianceServiceAdapter.ts#L352)

Check if a framework is applicable to an industry or region

#### Parameters

##### framework

`string`

Framework name

##### industry?

`string`

Industry name

##### region?

`string`

Region name

#### Returns

`boolean`

Boolean indicating if the framework is applicable
