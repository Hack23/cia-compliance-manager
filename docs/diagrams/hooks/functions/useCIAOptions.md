[**CIA Compliance Manager Diagrams v0.8.8**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [hooks](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [hooks/useCIAOptions.ts:171](https://github.com/Hack23/cia-compliance-manager/blob/88094f2c4c350fd10a1e440c3eab70aedd819944/src/hooks/useCIAOptions.ts#L171)

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getAvailabilityOptions()

> **getAvailabilityOptions**: () => `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getCombinedROIKey()

> **getCombinedROIKey**: (`confidentiality`, `integrity`, `availability`) => `ROIType`

#### Parameters

##### confidentiality

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

##### integrity

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

##### availability

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`ROIType`

### getConfidentialityOptions()

> **getConfidentialityOptions**: () => `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### getIntegrityOptions()

> **getIntegrityOptions**: () => `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

#### Returns

`Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

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

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`ROIType`

### getROIEstimates()

> **getROIEstimates**: () => `Record`\<`ROIType`, `ROIData`\>

#### Returns

`Record`\<`ROIType`, `ROIData`\>

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md), `CIAOptionDetails`\>

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `Record`\<`ROIType`, `ROIData`\>
