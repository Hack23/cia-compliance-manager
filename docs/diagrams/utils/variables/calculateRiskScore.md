[**CIA Compliance Manager Diagrams v0.8.7**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / calculateRiskScore

# Variable: calculateRiskScore()

> **calculateRiskScore**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `number`

Defined in: [utils/index.ts:89](https://github.com/Hack23/cia-compliance-manager/blob/c1b03266cad85c2f58531e3fd0aea147fa649ae0/src/utils/index.ts#L89)

Calculate risk score from security levels

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

## Returns

`number`

Risk score (0-100)
