[**CIA Compliance Manager Documentation v0.8.5**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(`customProvider`?): `object`

Defined in: [hooks/useCIAOptions.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/4f2006283e1cd56feb8daea1f810b2bc8c1b1d1b/src/hooks/useCIAOptions.ts#L28)

Custom hook to access CIA options throughout the application

## Parameters

### customProvider?

`Partial`\<[`CIADataProvider`](../../types/interfaces/CIADataProvider.md)\>

Optional custom data provider

## Returns

`object`

CIA options for all components

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](../../types/interfaces/CIADetails.md)\> = `dataProvider.availabilityOptions`

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](../../types/interfaces/CIADetails.md)\> = `dataProvider.confidentialityOptions`

### getComponentDescription()

> **getComponentDescription**: (`component`, `level`) => `string`

#### Parameters

##### component

`"confidentiality"` | `"integrity"` | `"availability"`

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`

### getComponentDetails()

> **getComponentDetails**: (`component`, `level`) => [`CIADetails`](../../types/interfaces/CIADetails.md)

#### Parameters

##### component

`"confidentiality"` | `"integrity"` | `"availability"`

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../types/interfaces/CIADetails.md)

### getImplementationDetails()

> **getImplementationDetails**: (`component`, `level`) => `object`

#### Parameters

##### component

`"confidentiality"` | `"integrity"` | `"availability"`

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`object`

##### effort

> **effort**: `string` \| [`ImplementationEffort`](../../types/interfaces/ImplementationEffort.md)

##### expertise

> **expertise**: `string`

##### recommendations

> **recommendations**: `string`[]

##### timeframe

> **timeframe**: `string`

### getROIEstimate()

> **getROIEstimate**: (`level`) => [`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

[`ROIEstimate`](../../types/interfaces/ROIEstimate.md)

### getValuePoints()

> **getValuePoints**: (`level`) => `string`[]

#### Parameters

##### level

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md), [`CIADetails`](../../types/interfaces/CIADetails.md)\> = `dataProvider.integrityOptions`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: [`ROIEstimatesMap`](../../types/interfaces/ROIEstimatesMap.md) = `dataProvider.roiEstimates`
