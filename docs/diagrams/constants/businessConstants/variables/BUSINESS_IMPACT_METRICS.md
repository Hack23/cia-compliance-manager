[**CIA Compliance Manager Diagrams v0.8.10**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [constants/businessConstants](../README.md) / BUSINESS\_IMPACT\_METRICS

# Variable: BUSINESS\_IMPACT\_METRICS

> `const` **BUSINESS\_IMPACT\_METRICS**: `object`

Defined in: [constants/businessConstants.ts:637](https://github.com/Hack23/cia-compliance-manager/blob/680c1f0618a64f5e2a4571e2b2ee23d6baf8dc9d/src/constants/businessConstants.ts#L637)

Enhanced business impact metrics with specific values

## Type declaration

### AVAILABILITY

> **AVAILABILITY**: `object`

#### AVAILABILITY.HIGH

> **HIGH**: `object`

#### AVAILABILITY.HIGH.customerImpact

> **customerImpact**: `string` = `"Minor disruption, negligible customer impact"`

#### AVAILABILITY.HIGH.downtime

> **downtime**: `string` = `"Up to 44 minutes/year (99.99% uptime)"`

#### AVAILABILITY.HIGH.financialImpact

> **financialImpact**: `string` = `"0.1-1% of annual revenue"`

#### AVAILABILITY.LOW

> **LOW**: `object`

#### AVAILABILITY.LOW.customerImpact

> **customerImpact**: `string` = `"Significant disruption, some customer loss"`

#### AVAILABILITY.LOW.downtime

> **downtime**: `string` = `"Up to 48 hours/year (99.45% uptime)"`

#### AVAILABILITY.LOW.financialImpact

> **financialImpact**: `string` = `"5-15% of annual revenue"`

#### AVAILABILITY.MODERATE

> **MODERATE**: `object`

#### AVAILABILITY.MODERATE.customerImpact

> **customerImpact**: `string` = `"Noticeable disruption, minimal customer loss"`

#### AVAILABILITY.MODERATE.downtime

> **downtime**: `string` = `"Up to 8.8 hours/year (99.9% uptime)"`

#### AVAILABILITY.MODERATE.financialImpact

> **financialImpact**: `string` = `"1-5% of annual revenue"`

#### AVAILABILITY.NONE

> **NONE**: `object`

#### AVAILABILITY.NONE.customerImpact

> **customerImpact**: `string` = `"Severe disruption, likely customer loss"`

#### AVAILABILITY.NONE.downtime

> **downtime**: `string` = `"Unpredictable (potentially >168 hours/year)"`

#### AVAILABILITY.NONE.financialImpact

> **financialImpact**: `string` = `"15-20% of annual revenue"`

#### AVAILABILITY.VERY\_HIGH

> **VERY\_HIGH**: `object`

#### AVAILABILITY.VERY\_HIGH.customerImpact

> **customerImpact**: `string` = `"Minimal to no disruption or customer impact"`

#### AVAILABILITY.VERY\_HIGH.downtime

> **downtime**: `string` = `"Up to 5 minutes/year (99.999% uptime)"`

#### AVAILABILITY.VERY\_HIGH.financialImpact

> **financialImpact**: `string` = `"<0.1% of annual revenue"`

### CONFIDENTIALITY

> **CONFIDENTIALITY**: `object`

#### CONFIDENTIALITY.HIGH

> **HIGH**: `object`

#### CONFIDENTIALITY.HIGH.dataBreachRisk

> **dataBreachRisk**: `string` = `"Low probability"`

#### CONFIDENTIALITY.HIGH.financialImpact

> **financialImpact**: `string` = `"1-5% of annual revenue"`

#### CONFIDENTIALITY.HIGH.reputationalDamage

> **reputationalDamage**: `string` = `"Minor, short-term damage"`

#### CONFIDENTIALITY.LOW

> **LOW**: `object`

#### CONFIDENTIALITY.LOW.dataBreachRisk

> **dataBreachRisk**: `string` = `"High probability"`

#### CONFIDENTIALITY.LOW.financialImpact

> **financialImpact**: `string` = `"10-20% of annual revenue"`

#### CONFIDENTIALITY.LOW.reputationalDamage

> **reputationalDamage**: `string` = `"Significant, long-term damage"`

#### CONFIDENTIALITY.MODERATE

> **MODERATE**: `object`

#### CONFIDENTIALITY.MODERATE.dataBreachRisk

> **dataBreachRisk**: `string` = `"Moderate probability"`

#### CONFIDENTIALITY.MODERATE.financialImpact

> **financialImpact**: `string` = `"5-10% of annual revenue"`

#### CONFIDENTIALITY.MODERATE.reputationalDamage

> **reputationalDamage**: `string` = `"Moderate, recoverable damage"`

#### CONFIDENTIALITY.NONE

> **NONE**: `object`

#### CONFIDENTIALITY.NONE.dataBreachRisk

> **dataBreachRisk**: `string` = `"Extremely high probability"`

#### CONFIDENTIALITY.NONE.financialImpact

> **financialImpact**: `string` = `"20-30% of annual revenue"`

#### CONFIDENTIALITY.NONE.reputationalDamage

> **reputationalDamage**: `string` = `"Severe, potentially business-ending"`

#### CONFIDENTIALITY.VERY\_HIGH

> **VERY\_HIGH**: `object`

#### CONFIDENTIALITY.VERY\_HIGH.dataBreachRisk

> **dataBreachRisk**: `string` = `"Very low probability"`

#### CONFIDENTIALITY.VERY\_HIGH.financialImpact

> **financialImpact**: `string` = `"<1% of annual revenue"`

#### CONFIDENTIALITY.VERY\_HIGH.reputationalDamage

> **reputationalDamage**: `string` = `"Minimal to no damage"`

### INTEGRITY

> **INTEGRITY**: `object`

#### INTEGRITY.HIGH

> **HIGH**: `object`

#### INTEGRITY.HIGH.dataCorruption

> **dataCorruption**: `string` = `"Very low probability, always detected"`

#### INTEGRITY.HIGH.financialImpact

> **financialImpact**: `string` = `"0.1-1% of annual revenue"`

#### INTEGRITY.HIGH.regulatoryRisk

> **regulatoryRisk**: `string` = `"Minor violations, limited penalties"`

#### INTEGRITY.LOW

> **LOW**: `object`

#### INTEGRITY.LOW.dataCorruption

> **dataCorruption**: `string` = `"Moderate probability of detected corruption"`

#### INTEGRITY.LOW.financialImpact

> **financialImpact**: `string` = `"5-10% of annual revenue"`

#### INTEGRITY.LOW.regulatoryRisk

> **regulatoryRisk**: `string` = `"Significant violations and penalties"`

#### INTEGRITY.MODERATE

> **MODERATE**: `object`

#### INTEGRITY.MODERATE.dataCorruption

> **dataCorruption**: `string` = `"Low probability, usually detected"`

#### INTEGRITY.MODERATE.financialImpact

> **financialImpact**: `string` = `"1-5% of annual revenue"`

#### INTEGRITY.MODERATE.regulatoryRisk

> **regulatoryRisk**: `string` = `"Moderate violations and penalties"`

#### INTEGRITY.NONE

> **NONE**: `object`

#### INTEGRITY.NONE.dataCorruption

> **dataCorruption**: `string` = `"High probability of undetected corruption"`

#### INTEGRITY.NONE.financialImpact

> **financialImpact**: `string` = `"10-15% of annual revenue"`

#### INTEGRITY.NONE.regulatoryRisk

> **regulatoryRisk**: `string` = `"Severe violations and penalties"`

#### INTEGRITY.VERY\_HIGH

> **VERY\_HIGH**: `object`

#### INTEGRITY.VERY\_HIGH.dataCorruption

> **dataCorruption**: `string` = `"Negligible probability, immediately detected"`

#### INTEGRITY.VERY\_HIGH.financialImpact

> **financialImpact**: `string` = `"<0.1% of annual revenue"`

#### INTEGRITY.VERY\_HIGH.regulatoryRisk

> **regulatoryRisk**: `string` = `"Minimal to no violations or penalties"`
