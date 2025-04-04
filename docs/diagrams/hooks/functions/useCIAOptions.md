[**CIA Compliance Manager Diagrams v0.8.6**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [hooks/useCIAOptions.ts:171](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/hooks/useCIAOptions.ts#L171)

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getAvailabilityOptions()

> **getAvailabilityOptions**: () => `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getCombinedROIKey()

> **getCombinedROIKey**: (`confidentiality`, `integrity`, `availability`) => `ROIType`

#### Parameters

##### confidentiality

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### integrity

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

##### availability

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`ROIType`

### getConfidentialityOptions()

> **getConfidentialityOptions**: () => `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getIntegrityOptions()

> **getIntegrityOptions**: () => `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getROIDataForCombinedKey()

> **getROIDataForCombinedKey**: (`key`) => `ROIData`

#### Parameters

##### key

`ROIType`

#### Returns

`ROIData`

### getROIEstimateForSecurityLevel()

> **getROIEstimateForSecurityLevel**: (`level`) => `ROIType`

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`ROIType`

### getROIEstimates()

> **getROIEstimates**: () => `Record`\<`ROIType`, `ROIData`\>

#### Returns

`Record`\<`ROIType`, `ROIData`\>

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `Record`\<`ROIType`, `ROIData`\>
