[**CIA Compliance Manager — Markdown Documentation v1.1.122**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateRiskScore

# Variable: calculateRiskScore

> **calculateRiskScore**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `number`

Defined in: [utils/index.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/fdbd0224f5e379f45807637facf704ea40d9b47d/src/utils/index.ts#L104)

Calculate risk score from security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`number`

Risk score (0-100)
