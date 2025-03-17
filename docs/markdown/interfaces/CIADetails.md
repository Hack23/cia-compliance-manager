[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / CIADetails

# Interface: CIADetails

Defined in: [src/types/cia.ts:101](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L101)

Detailed CIA information used across the application
Contains rich information about impacts, technical details, and recommendations

## Extended by

- [`EnhancedCIADetails`](EnhancedCIADetails.md)

## Properties

### bg?

> `optional` **bg**: `string`

Defined in: [src/types/cia.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L118)

***

### businessImpact?

> `optional` **businessImpact**: `string`

Defined in: [src/types/cia.ts:105](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L105)

***

### businessImpactDetails?

> `optional` **businessImpactDetails**: `object`

Defined in: [src/types/cia.ts:120](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L120)

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

Defined in: [src/types/cia.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L116)

***

### complianceImplications?

> `optional` **complianceImplications**: `string`

Defined in: [src/types/cia.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L114)

***

### description?

> `optional` **description**: `string`

Defined in: [src/types/cia.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L102)

***

### impact?

> `optional` **impact**: `string`

Defined in: [src/types/cia.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L103)

***

### mttr?

> `optional` **mttr**: `string`

Defined in: [src/types/cia.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L107)

***

### opex?

> `optional` **opex**: `number`

Defined in: [src/types/cia.ts:117](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L117)

***

### recommendations?

> `optional` **recommendations**: `string`[]

Defined in: [src/types/cia.ts:110](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L110)

***

### riskLevel?

> `optional` **riskLevel**: `string`

Defined in: [src/types/cia.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L115)

***

### rpo?

> `optional` **rpo**: `string`

Defined in: [src/types/cia.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L109)

***

### rto?

> `optional` **rto**: `string`

Defined in: [src/types/cia.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L108)

***

### technical?

> `optional` **technical**: `string`

Defined in: [src/types/cia.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L104)

***

### technicalControls?

> `optional` **technicalControls**: `string`[]

Defined in: [src/types/cia.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L112)

***

### technicalMeasures?

> `optional` **technicalMeasures**: `string`[]

Defined in: [src/types/cia.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L113)

***

### text?

> `optional` **text**: `string`

Defined in: [src/types/cia.ts:119](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L119)

***

### uptime?

> `optional` **uptime**: `string`

Defined in: [src/types/cia.ts:106](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L106)

***

### validationMethod?

> `optional` **validationMethod**: `string`

Defined in: [src/types/cia.ts:111](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/types/cia.ts#L111)
