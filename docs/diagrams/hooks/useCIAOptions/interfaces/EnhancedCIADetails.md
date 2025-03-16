[**CIA Compliance Manager Diagrams v0.8.0**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIAOptions](../README.md) / EnhancedCIADetails

# Interface: EnhancedCIADetails

Defined in: [src/hooks/useCIAOptions.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L31)

Common interface for all CIA security options to ensure consistency

## Extends

- [`CIADetails`](../../../types/cia/interfaces/CIADetails.md)

## Properties

### applicableFrameworks?

> `optional` **applicableFrameworks**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:75](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L75)

***

### bg

> **bg**: `string`

Defined in: [src/hooks/useCIAOptions.ts:37](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L37)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`bg`](../../../types/cia/interfaces/CIADetails.md#bg)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L34)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`businessImpact`](../../../types/cia/interfaces/CIADetails.md#businessimpact)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: `object`

Defined in: [src/hooks/useCIAOptions.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L40)

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

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`businessImpactDetails`](../../../types/cia/interfaces/CIADetails.md#businessimpactdetails)

***

### businessPerspective?

> `optional` **businessPerspective**: `string`

Defined in: [src/hooks/useCIAOptions.ts:77](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L77)

***

### capex

> **capex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L35)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`capex`](../../../types/cia/interfaces/CIADetails.md#capex)

***

### codeExamples?

> `optional` **codeExamples**: `object`[]

Defined in: [src/hooks/useCIAOptions.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L102)

#### code

> **code**: `string`

#### language

> **language**: `string`

#### title

> **title**: `string`

***

### complianceImpact?

> `optional` **complianceImpact**: `object`

Defined in: [src/hooks/useCIAOptions.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L93)

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

Defined in: [src/types/cia.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/cia.ts#L97)

#### Inherited from

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`complianceImplications`](../../../types/cia/interfaces/CIADetails.md#complianceimplications)

***

### controlFamily?

> `optional` **controlFamily**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:74](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L74)

***

### description

> **description**: `string`

Defined in: [src/hooks/useCIAOptions.ts:32](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L32)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`description`](../../../types/cia/interfaces/CIADetails.md#description)

***

### effort?

> `optional` **effort**: `object`

Defined in: [src/hooks/useCIAOptions.ts:79](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L79)

#### development

> **development**: `string`

#### expertise

> **expertise**: `string`

#### maintenance

> **maintenance**: `string`

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/cia.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/cia.ts#L86)

#### Inherited from

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`impact`](../../../types/cia/interfaces/CIADetails.md#impact)

***

### implementationComplexity?

> `optional` **implementationComplexity**: `string`

Defined in: [src/hooks/useCIAOptions.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L71)

***

### implementationConsiderations?

> `optional` **implementationConsiderations**: `string`

Defined in: [src/hooks/useCIAOptions.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L91)

***

### implementationSteps?

> `optional` **implementationSteps**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L78)

***

### keyImpact?

> `optional` **keyImpact**: `string`

Defined in: [src/hooks/useCIAOptions.ts:84](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L84)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements**: `string`

Defined in: [src/hooks/useCIAOptions.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L72)

***

### metric?

> `optional` **metric**: `string`

Defined in: [src/hooks/useCIAOptions.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L85)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/hooks/useCIAOptions.ts:67](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L67)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`mttr`](../../../types/cia/interfaces/CIADetails.md#mttr)

***

### opex

> **opex**: `number`

Defined in: [src/hooks/useCIAOptions.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L36)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`opex`](../../../types/cia/interfaces/CIADetails.md#opex)

***

### protectionMethod?

> `optional` **protectionMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L70)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L39)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`recommendations`](../../../types/cia/interfaces/CIADetails.md#recommendations)

***

### requiredExpertise?

> `optional` **requiredExpertise**: `string`

Defined in: [src/hooks/useCIAOptions.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L73)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: [src/types/cia.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/cia.ts#L98)

#### Inherited from

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`riskLevel`](../../../types/cia/interfaces/CIADetails.md#risklevel)

***

### roiEstimate?

> `optional` **roiEstimate**: `object`

Defined in: [src/hooks/useCIAOptions.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L87)

#### description

> **description**: `string`

#### value

> **value**: `string`

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/hooks/useCIAOptions.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L66)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`rpo`](../../../types/cia/interfaces/CIADetails.md#rpo)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/hooks/useCIAOptions.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L65)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`rto`](../../../types/cia/interfaces/CIADetails.md#rto)

***

### securityIcon?

> `optional` **securityIcon**: `string`

Defined in: [src/hooks/useCIAOptions.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L92)

***

### technical

> **technical**: `string`

Defined in: [src/hooks/useCIAOptions.ts:33](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L33)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`technical`](../../../types/cia/interfaces/CIADetails.md#technical)

***

### technicalControls?

> `optional` **technicalControls**: `string`[]

Defined in: [src/types/cia.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/cia.ts#L95)

#### Inherited from

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`technicalControls`](../../../types/cia/interfaces/CIADetails.md#technicalcontrols)

***

### technicalImplementation?

> `optional` **technicalImplementation**: `object`

Defined in: [src/hooks/useCIAOptions.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L108)

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

Defined in: [src/types/cia.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/types/cia.ts#L96)

#### Inherited from

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`technicalMeasures`](../../../types/cia/interfaces/CIADetails.md#technicalmeasures)

***

### text

> **text**: `string`

Defined in: [src/hooks/useCIAOptions.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L38)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`text`](../../../types/cia/interfaces/CIADetails.md#text)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/hooks/useCIAOptions.ts:68](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L68)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`uptime`](../../../types/cia/interfaces/CIADetails.md#uptime)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/hooks/useCIAOptions.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L69)

#### Overrides

[`CIADetails`](../../../types/cia/interfaces/CIADetails.md).[`validationMethod`](../../../types/cia/interfaces/CIADetails.md#validationmethod)

***

### valuePoints?

> `optional` **valuePoints**: `string`[]

Defined in: [src/hooks/useCIAOptions.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/791b5a1b6e700c8b8480de209374e4cb1086330d/src/hooks/useCIAOptions.ts#L86)
