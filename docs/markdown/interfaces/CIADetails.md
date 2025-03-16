[**CIA Compliance Manager Documentation v0.8.4**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / CIADetails

# Interface: CIADetails

Defined in: [src/types/cia.ts:84](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L84)

Detailed CIA information used across the application
Contains rich information about impacts, technical details, and recommendations

## Extended by

- [`EnhancedCIADetails`](EnhancedCIADetails.md)

## Properties

### bg?

> `optional` **bg**: `string`

Defined in: [src/types/cia.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L101)

***

### businessImpact?

> `optional` **businessImpact**: `string`

Defined in: [src/types/cia.ts:88](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L88)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: `object`

Defined in: [src/types/cia.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L103)

#### financialImpact?

> `optional` **financialImpact**: `object`

##### financialImpact.description?

> `optional` **description**: `string`

#### operationalImpact?

> `optional` **operationalImpact**: `object`

##### operationalImpact.description?

> `optional` **description**: `string`

#### regulatory?

> `optional` **regulatory**: `object`

##### regulatory.description?

> `optional` **description**: `string`

#### reputationalImpact?

> `optional` **reputationalImpact**: `object`

##### reputationalImpact.description?

> `optional` **description**: `string`

***

### capex?

> `optional` **capex**: `number`

Defined in: [src/types/cia.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L99)

***

### complianceImplications?

> `optional` **complianceImplications**: `string`

Defined in: [src/types/cia.ts:97](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L97)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/cia.ts:85](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L85)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/cia.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L86)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/types/cia.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L90)

***

### opex?

> `optional` **opex**: `number`

Defined in: [src/types/cia.ts:100](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L100)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [src/types/cia.ts:93](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L93)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: [src/types/cia.ts:98](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L98)

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/types/cia.ts:92](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L92)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/types/cia.ts:91](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L91)

***

### technical?

> `optional` **technical**: `string`

Defined in: [src/types/cia.ts:87](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L87)

***

### technicalControls?

> `optional` **technicalControls**: `string`[]

Defined in: [src/types/cia.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L95)

***

### technicalMeasures?

> `optional` **technicalMeasures**: `string`[]

Defined in: [src/types/cia.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L96)

***

### text?

> `optional` **text**: `string`

Defined in: [src/types/cia.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L102)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/types/cia.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L89)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/types/cia.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/a6d8d6a2cab2160940b9a047208c12088d7e02cf/src/types/cia.ts#L94)
