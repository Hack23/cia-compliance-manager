[**CIA Compliance Manager Diagrams v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [hooks/useCIAOptions](../README.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [src/hooks/useCIAOptions.ts:706](https://github.com/Hack23/cia-compliance-manager/blob/eca22610f41e5f6b6c0cece88769b1ffbe9db4bd/src/hooks/useCIAOptions.ts#L706)

Custom hook for accessing CIA security options with memoization

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `availabilityOpts`

### confidentialityOptions

> **confidentialityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `confidentialityOpts`

### integrityOptions

> **integrityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `integrityOpts`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: [`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md) = `roiEstimates`
