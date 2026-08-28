[**CIA Compliance Manager — Markdown Documentation v1.1.140**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useCIAOptions](../README.md) / UseCIAOptionsReturn

# Interface: UseCIAOptionsReturn

Defined in: [hooks/useCIAOptions.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L257)

Return type for useCIAOptions hook

Provides access to CIA security level options, ROI estimates,
and utility functions for working with security configurations.

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:259](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L259)

Availability security level options with details and costs

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:262](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L262)

Integrity security level options with details and costs

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:265](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L265)

Confidentiality security level options with details and costs

***

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

Defined in: [hooks/useCIAOptions.ts:268](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L268)

ROI estimates for different security investment levels

***

### getAvailabilityOptions

> **getAvailabilityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:271](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L271)

Get availability options (same as availabilityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getIntegrityOptions

> **getIntegrityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:274](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L274)

Get integrity options (same as integrityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getConfidentialityOptions

> **getConfidentialityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L277)

Get confidentiality options (same as confidentialityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getROIEstimates

> **getROIEstimates**: () => `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

Defined in: [hooks/useCIAOptions.ts:280](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L280)

Get ROI estimates (same as ROI_ESTIMATES property)

#### Returns

`Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

***

### getROIEstimateForSecurityLevel

> **getROIEstimateForSecurityLevel**: (`level`) => [`ROIType`](../type-aliases/ROIType.md)

Defined in: [hooks/useCIAOptions.ts:287](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L287)

Get ROI type for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to get ROI type for

#### Returns

[`ROIType`](../type-aliases/ROIType.md)

Corresponding ROI type

***

### getCombinedROIKey

> **getCombinedROIKey**: (`confidentiality`, `integrity`, `availability`) => [`ROIType`](../type-aliases/ROIType.md)

Defined in: [hooks/useCIAOptions.ts:296](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L296)

Get combined ROI key based on CIA triad levels

#### Parameters

##### confidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality level

##### integrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity level

##### availability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability level

#### Returns

[`ROIType`](../type-aliases/ROIType.md)

ROI type based on highest security level

***

### getROIDataForCombinedKey

> **getROIDataForCombinedKey**: (`key`) => [`ROIData`](ROIData.md)

Defined in: [hooks/useCIAOptions.ts:307](https://github.com/Hack23/cia-compliance-manager/blob/a92120748e126e0e01fb8f5587b3f98734c071a1/src/hooks/useCIAOptions.ts#L307)

Get ROI data for a specific ROI type

#### Parameters

##### key

[`ROIType`](../type-aliases/ROIType.md)

ROI type key

#### Returns

[`ROIData`](ROIData.md)

ROI data object
