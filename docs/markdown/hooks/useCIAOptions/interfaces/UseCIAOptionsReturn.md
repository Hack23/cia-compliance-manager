[**CIA Compliance Manager Documentation v1.0.3**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [hooks/useCIAOptions](../README.md) / UseCIAOptionsReturn

# Interface: UseCIAOptionsReturn

Defined in: [hooks/useCIAOptions.ts:258](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L258)

Return type for useCIAOptions hook

Provides access to CIA security level options, ROI estimates,
and utility functions for working with security configurations.

## Properties

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L260)

Availability security level options with details and costs

***

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L266)

Confidentiality security level options with details and costs

***

### getAvailabilityOptions()

> **getAvailabilityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L272)

Get availability options (same as availabilityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getCombinedROIKey()

> **getCombinedROIKey**: (`confidentiality`, `integrity`, `availability`) => [`ROIType`](../type-aliases/ROIType.md)

Defined in: [hooks/useCIAOptions.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L297)

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

### getConfidentialityOptions()

> **getConfidentialityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L278)

Get confidentiality options (same as confidentialityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getIntegrityOptions()

> **getIntegrityOptions**: () => `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L275)

Get integrity options (same as integrityOptions property)

#### Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

***

### getROIDataForCombinedKey()

> **getROIDataForCombinedKey**: (`key`) => [`ROIData`](ROIData.md)

Defined in: [hooks/useCIAOptions.ts:308](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L308)

Get ROI data for a specific ROI type

#### Parameters

##### key

[`ROIType`](../type-aliases/ROIType.md)

ROI type key

#### Returns

[`ROIData`](ROIData.md)

ROI data object

***

### getROIEstimateForSecurityLevel()

> **getROIEstimateForSecurityLevel**: (`level`) => [`ROIType`](../type-aliases/ROIType.md)

Defined in: [hooks/useCIAOptions.ts:288](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L288)

Get ROI type for a specific security level

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to get ROI type for

#### Returns

[`ROIType`](../type-aliases/ROIType.md)

Corresponding ROI type

***

### getROIEstimates()

> **getROIEstimates**: () => `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

Defined in: [hooks/useCIAOptions.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L281)

Get ROI estimates (same as ROI_ESTIMATES property)

#### Returns

`Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

***

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIAOptionDetails`](CIAOptionDetails.md)\>

Defined in: [hooks/useCIAOptions.ts:263](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L263)

Integrity security level options with details and costs

***

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: `Record`\<[`ROIType`](../type-aliases/ROIType.md), [`ROIData`](ROIData.md)\>

Defined in: [hooks/useCIAOptions.ts:269](https://github.com/Hack23/cia-compliance-manager/blob/154d4849b7a49eb8fb95e15a0e05f6b86eed9405/src/hooks/useCIAOptions.ts#L269)

ROI estimates for different security investment levels
