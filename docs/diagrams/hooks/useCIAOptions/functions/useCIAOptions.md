[**CIA Compliance Manager Diagrams v0.8.38**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIAOptions](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [hooks/useCIAOptions.ts:171](https://github.com/Hack23/cia-compliance-manager/blob/aedb85c440cd82a5c63a8b131e99fe72da8b07ec/src/hooks/useCIAOptions.ts#L171)

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### getAvailabilityOptions()

> **getAvailabilityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### getCombinedROIKey()

> **getCombinedROIKey**: (`confidentiality`, `integrity`, `availability`) => [`ROIType`](../type-aliases/ROIType.md)

#### Parameters

##### confidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### integrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

##### availability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIType`](../type-aliases/ROIType.md)

### getConfidentialityOptions()

> **getConfidentialityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### getIntegrityOptions()

> **getIntegrityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### getROIDataForCombinedKey()

> **getROIDataForCombinedKey**: (`key`) => [`ROIData`](../interfaces/ROIData.md)

#### Parameters

##### key

[`ROIType`](../type-aliases/ROIType.md)

#### Returns

[`ROIData`](../interfaces/ROIData.md)

### getROIEstimateForSecurityLevel()

> **getROIEstimateForSecurityLevel**: (`level`) => [`ROIType`](../type-aliases/ROIType.md)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`ROIType`](../type-aliases/ROIType.md)

### getROIEstimates()

> **getROIEstimates**: () => `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](../interfaces/ROIData.md)\>

#### Returns

`Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](../interfaces/ROIData.md)\>

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](../interfaces/CIAOptionDetails.md)\>

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](../interfaces/ROIData.md)\>
