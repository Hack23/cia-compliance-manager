[**CIA Compliance Manager Diagrams v1.0.2**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [types/businessImpact](../README.md) / BUSINESS\_CONSIDERATIONS

# Variable: BUSINESS\_CONSIDERATIONS

> `const` **BUSINESS\_CONSIDERATIONS**: `object`

Defined in: [types/businessImpact.ts:380](https://github.com/Hack23/cia-compliance-manager/blob/175c46a72442c615bb0c104848c5b4deec0cfc31/src/types/businessImpact.ts#L380)

## Type Declaration

### AVAILABILITY

> **AVAILABILITY**: `object`

#### AVAILABILITY.HIGH

> **HIGH**: `never`[] = `[]`

#### AVAILABILITY.LOW

> **LOW**: `never`[] = `[]`

#### AVAILABILITY.MODERATE

> **MODERATE**: `never`[] = `[]`

#### AVAILABILITY.NONE

> **NONE**: `never`[] = `[]`

#### AVAILABILITY.VERY\_HIGH

> **VERY\_HIGH**: `never`[] = `[]`

### compliance?

> `optional` **compliance**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Compliance considerations

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `object`

#### CONFIDENTIALITY.HIGH

> **HIGH**: `never`[] = `[]`

#### CONFIDENTIALITY.LOW

> **LOW**: `never`[] = `[]`

#### CONFIDENTIALITY.MODERATE

> **MODERATE**: `never`[] = `[]`

#### CONFIDENTIALITY.NONE

> **NONE**: `never`[] = `[]`

#### CONFIDENTIALITY.VERY\_HIGH

> **VERY\_HIGH**: `never`[] = `[]`

### financial

> **financial**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Financial considerations

### INTEGRITY

> **INTEGRITY**: `object`

#### INTEGRITY.HIGH

> **HIGH**: `never`[] = `[]`

#### INTEGRITY.LOW

> **LOW**: `never`[] = `[]`

#### INTEGRITY.MODERATE

> **MODERATE**: `never`[] = `[]`

#### INTEGRITY.NONE

> **NONE**: `never`[] = `[]`

#### INTEGRITY.VERY\_HIGH

> **VERY\_HIGH**: `never`[] = `[]`

### operational

> **operational**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Operational considerations

### regulatory?

> `optional` **regulatory**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Regulatory considerations

### reputational?

> `optional` **reputational**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Reputational considerations

### strategic

> **strategic**: [`BusinessConsideration`](../interfaces/BusinessConsideration.md)[]

Strategic considerations
