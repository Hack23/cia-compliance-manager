[**CIA Compliance Manager API Documentation v0.7.0**](../README.md)

***

[CIA Compliance Manager API Documentation](../globals.md) / useCIAOptions

# Function: useCIAOptions()

> **useCIAOptions**(): `object`

Defined in: [src/hooks/useCIAOptions.ts:668](https://github.com/Hack23/cia-compliance-manager/blob/main/src/hooks/useCIAOptions.ts#L668)

Custom hook for accessing CIA security options with memoization

## Returns

`object`

### availabilityOptions

> **availabilityOptions**: `Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\> = `availabilityOpts`

### confidentialityOptions

> **confidentialityOptions**: `Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\> = `confidentialityOpts`

### integrityOptions

> **integrityOptions**: `Record`\<[`SecurityLevel`](../type-aliases/SecurityLevel.md), [`EnhancedCIADetails`](../interfaces/EnhancedCIADetails.md)\> = `integrityOpts`

### ROI\_ESTIMATES

> **ROI\_ESTIMATES**: [`ROIEstimatesMap`](../type-aliases/ROIEstimatesMap.md) = `roiEstimates`
