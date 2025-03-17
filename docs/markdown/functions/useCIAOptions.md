[**CIA Compliance Manager Documentation v0.8.5**](../README.md)

***

[CIA Compliance Manager Documentation](../globals.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [src/hooks/useCIAOptions.ts:706](https://github.com/Hack23/cia-compliance-manager/blob/b799ef22d9067d09cc69eaeddf109ac9dcdce934/src/hooks/useCIAOptions.ts#L706)

Custom hook for accessing CIA security options with memoization

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `availabilityOpts`

### confidentialityOptions

> **confidentialityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `confidentialityOpts`

### integrityOptions

> **integrityOptions**: `Partial`\<`Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\>\> = `integrityOpts`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: [`ROIEstimatesMap`](../interfaces/ROIEstimatesMap.md) = `roiEstimates`
