[**CIA Compliance Manager Documentation v0.8.6**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [utils](../README.md) / calculateOverallSecurityLevelFromValues

# Variable: calculateOverallSecurityLevelFromValues()

> **calculateOverallSecurityLevelFromValues**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy`) => [`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:78](https://github.com/Hack23/cia-compliance-manager/blob/050a250237d6f621490781dbdf95155919f35aed/src/utils/index.ts#L78)

Calculate overall security level from individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Confidentiality security level

### strategy

Calculation strategy ('min', 'max', 'avg', 'weighted')

`"min"` | `"max"` | `"avg"` | `"weighted"`

## Returns

[`SecurityLevel`](../../index/type-aliases/SecurityLevel.md)

Calculated overall security level
