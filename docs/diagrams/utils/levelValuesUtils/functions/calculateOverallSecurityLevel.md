[**CIA Compliance Manager Diagrams v0.8.24**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/levelValuesUtils](../README.md) / calculateOverallSecurityLevel

# Function: calculateOverallSecurityLevel()

> **calculateOverallSecurityLevel**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `strategy`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/levelValuesUtils.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/8f5d084752ccee354557e96bf8b49239fb671c91/src/utils/levelValuesUtils.ts#L69)

Calculate overall security level from individual CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

### strategy

Calculation strategy ('min', 'max', 'avg', 'weighted')

`"min"` | `"max"` | `"avg"` | `"weighted"`

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Calculated overall security level
