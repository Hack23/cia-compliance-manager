[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / EnhancedCIADetails

# Interface: EnhancedCIADetails

Defined in: [src/hooks/useCIAOptions.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L9)

Common interface for all CIA security options to ensure consistency

## Extends

- [`CIADetails`](CIADetails.md)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L53)

***

### bg

> **bg**: `string`

Defined in: [src/hooks/useCIAOptions.ts:15](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L15)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:12](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L12)

#### Overrides

[`CIADetails`](CIADetails.md).[`businessImpact`](CIADetails.md#businessimpact)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: `object`

Defined in: [src/hooks/useCIAOptions.ts:18](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L18)

#### financialImpact?

> `optional` **financialImpact**: `object`

##### financialImpact.annualRevenueLoss?

> `optional` **annualRevenueLoss**: `string`

##### financialImpact.description

> **description**: `string`

##### financialImpact.riskLevel

> **riskLevel**: `string`

#### operationalImpact?

> `optional` **operationalImpact**: `object`

##### operationalImpact.description

> **description**: `string`

##### operationalImpact.meanTimeToRecover?

> `optional` **meanTimeToRecover**: `string`

##### operationalImpact.riskLevel

> **riskLevel**: `string`

#### regulatory?

> `optional` **regulatory**: `object`

##### regulatory.complianceViolations?

> `optional` **complianceViolations**: `string`[]

##### regulatory.description

> **description**: `string`

##### regulatory.riskLevel

> **riskLevel**: `string`

#### reputationalImpact?

> `optional` **reputationalImpact**: `object`

##### reputationalImpact.description

> **description**: `string`

##### reputationalImpact.riskLevel

> **riskLevel**: `string`

#### strategic?

> `optional` **strategic**: `object`

##### strategic.description

> **description**: `string`

##### strategic.riskLevel

> **riskLevel**: `string`

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [src/hooks/useCIAOptions.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L55)

***

### capex

> **capex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L13)

#### Overrides

[`CIADetails`](CIADetails.md).[`capex`](CIADetails.md#capex)

***

### codeExamples?

> `optional` **codeExamples**: `object`[]

Defined in: [src/hooks/useCIAOptions.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L80)

#### code

> **code**: `string`

#### language

> **language**: `string`

#### title

> **title**: `string`

***

### complianceImpact?

> `optional` **complianceImpact**: `object`

Defined in: [src/hooks/useCIAOptions.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L71)

#### frameworks

> **frameworks**: `object`

##### frameworks.compliant

> **compliant**: `string`[]

##### frameworks.nonCompliant

> **nonCompliant**: `string`[]

##### frameworks.partiallyCompliant

> **partiallyCompliant**: `string`[]

#### remediationSteps?

> `optional` **remediationSteps**: `string`[]

#### requirements?

> `optional` **requirements**: `string`[]

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L52)

***

### description

> **description**: `string`

Defined in: [src/hooks/useCIAOptions.ts:10](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L10)

#### Overrides

[`CIADetails`](CIADetails.md).[`description`](CIADetails.md#description)

***

### effort?

> `optional` **effort**: `object`

Defined in: [src/hooks/useCIAOptions.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L57)

#### development

> **development**: `string`

#### expertise

> **expertise**: `string`

#### maintenance

> **maintenance**: `string`

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [src/hooks/useCIAOptions.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L49)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [src/hooks/useCIAOptions.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L69)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L56)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L62)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [src/hooks/useCIAOptions.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L50)

***

### metric?

> `optional` **metric**: `string`

Defined in: [src/hooks/useCIAOptions.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L63)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/hooks/useCIAOptions.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L45)

***

### opex

> **opex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:14](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L14)

#### Overrides

[`CIADetails`](CIADetails.md).[`opex`](CIADetails.md#opex)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:48](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L48)

#### Overrides

[`CIADetails`](CIADetails.md).[`protectionMethod`](CIADetails.md#protectionmethod)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:17](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L17)

#### Overrides

[`CIADetails`](CIADetails.md).[`recommendations`](CIADetails.md#recommendations)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [src/hooks/useCIAOptions.ts:51](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L51)

***

### roiEstimate?

> `optional` **roiEstimate**: `object`

Defined in: [src/hooks/useCIAOptions.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L65)

#### description

> **description**: `string`

#### value

> **value**: `string`

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/hooks/useCIAOptions.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L44)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/hooks/useCIAOptions.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L43)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [src/hooks/useCIAOptions.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L70)

***

### technical

> **technical**: `string`

Defined in: [src/hooks/useCIAOptions.ts:11](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L11)

#### Overrides

[`CIADetails`](CIADetails.md).[`technical`](CIADetails.md#technical)

***

### text

> **text**: `string`

Defined in: [src/hooks/useCIAOptions.ts:16](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L16)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/hooks/useCIAOptions.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L46)

#### Overrides

[`CIADetails`](CIADetails.md).[`uptime`](CIADetails.md#uptime)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L47)

#### Overrides

[`CIADetails`](CIADetails.md).[`validationMethod`](CIADetails.md#validationmethod)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L64)
