[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / EnhancedCIADetails

# Interface: EnhancedCIADetails

Defined in: [src/hooks/useCIAOptions.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L25)

Common interface for all CIA security options to ensure consistency

## Extends

- [`CIADetails`](CIADetails.md)

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L69)

***

### bg

> **bg**: `string`

Defined in: [src/hooks/useCIAOptions.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L31)

#### Overrides

[`CIADetails`](CIADetails.md).[`bg`](CIADetails.md#bg)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L28)

#### Overrides

[`CIADetails`](CIADetails.md).[`businessImpact`](CIADetails.md#businessimpact)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: `object`

Defined in: [src/hooks/useCIAOptions.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L34)

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

#### Overrides

[`CIADetails`](CIADetails.md).[`businessImpactDetails`](CIADetails.md#businessimpactdetails)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [src/hooks/useCIAOptions.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L71)

***

### capex

> **capex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:29](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L29)

#### Overrides

[`CIADetails`](CIADetails.md).[`capex`](CIADetails.md#capex)

***

### codeExamples?

> `optional` **codeExamples**: `object`[]

Defined in: [src/hooks/useCIAOptions.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L96)

#### code

> **code**: `string`

#### language

> **language**: `string`

#### title

> **title**: `string`

***

### complianceImpact?

> `optional` **complianceImpact**: `object`

Defined in: [src/hooks/useCIAOptions.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L87)

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

### complianceImplications?

> `optional` **complianceImplications**: `string`

Defined in: src/types/cia.ts:97

#### Inherited from

[`CIADetails`](CIADetails.md).[`complianceImplications`](CIADetails.md#complianceimplications)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L68)

***

### description

> **description**: `string`

Defined in: [src/hooks/useCIAOptions.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L26)

#### Overrides

[`CIADetails`](CIADetails.md).[`description`](CIADetails.md#description)

***

### effort?

> `optional` **effort**: `object`

Defined in: [src/hooks/useCIAOptions.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L73)

#### development

> **development**: `string`

#### expertise

> **expertise**: `string`

#### maintenance

> **maintenance**: `string`

***

### impact?

> `optional` **impact**: `string`

Defined in: src/types/cia.ts:86

#### Inherited from

[`CIADetails`](CIADetails.md).[`impact`](CIADetails.md#impact)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [src/hooks/useCIAOptions.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L65)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [src/hooks/useCIAOptions.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L85)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L72)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L78)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [src/hooks/useCIAOptions.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L66)

***

### metric?

> `optional` **metric**: `string`

Defined in: [src/hooks/useCIAOptions.ts:79](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L79)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/hooks/useCIAOptions.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L61)

#### Overrides

[`CIADetails`](CIADetails.md).[`mttr`](CIADetails.md#mttr)

***

### opex

> **opex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:30](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L30)

#### Overrides

[`CIADetails`](CIADetails.md).[`opex`](CIADetails.md#opex)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:64](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L64)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L33)

#### Overrides

[`CIADetails`](CIADetails.md).[`recommendations`](CIADetails.md#recommendations)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [src/hooks/useCIAOptions.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L67)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: src/types/cia.ts:98

#### Inherited from

[`CIADetails`](CIADetails.md).[`riskLevel`](CIADetails.md#risklevel)

***

### roiEstimate?

> `optional` **roiEstimate**: `object`

Defined in: [src/hooks/useCIAOptions.ts:81](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L81)

#### description

> **description**: `string`

#### value

> **value**: `string`

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/hooks/useCIAOptions.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L60)

#### Overrides

[`CIADetails`](CIADetails.md).[`rpo`](CIADetails.md#rpo)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/hooks/useCIAOptions.ts:59](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L59)

#### Overrides

[`CIADetails`](CIADetails.md).[`rto`](CIADetails.md#rto)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [src/hooks/useCIAOptions.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L86)

***

### technical

> **technical**: `string`

Defined in: [src/hooks/useCIAOptions.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L27)

#### Overrides

[`CIADetails`](CIADetails.md).[`technical`](CIADetails.md#technical)

***

### technicalControls?

> `optional` **technicalControls**: `string`[]

Defined in: src/types/cia.ts:95

#### Inherited from

[`CIADetails`](CIADetails.md).[`technicalControls`](CIADetails.md#technicalcontrols)

***

### technicalImplementation?

> `optional` **technicalImplementation**: `object`

Defined in: [src/hooks/useCIAOptions.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L102)

#### description

> **description**: `string`

#### effort

> **effort**: `object`

##### effort.development

> **development**: `string`

##### effort.expertise

> **expertise**: `string`

##### effort.maintenance

> **maintenance**: `string`

#### implementationSteps

> **implementationSteps**: `string`[]

#### requirements?

> `optional` **requirements**: `string`[]

#### technologies?

> `optional` **technologies**: `string`[]

***

### technicalMeasures?

> `optional` **technicalMeasures**: `string`[]

Defined in: src/types/cia.ts:96

#### Inherited from

[`CIADetails`](CIADetails.md).[`technicalMeasures`](CIADetails.md#technicalmeasures)

***

### text

> **text**: `string`

Defined in: [src/hooks/useCIAOptions.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L32)

#### Overrides

[`CIADetails`](CIADetails.md).[`text`](CIADetails.md#text)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/hooks/useCIAOptions.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L62)

#### Overrides

[`CIADetails`](CIADetails.md).[`uptime`](CIADetails.md#uptime)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L63)

#### Overrides

[`CIADetails`](CIADetails.md).[`validationMethod`](CIADetails.md#validationmethod)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L80)
