[**CIA Compliance Manager Documentation v0.8.5**](../../../README.md)

***

[CIA Compliance Manager Documentation](../../../modules.md) / [constants/complianceConstants](../README.md) / FRAMEWORK\_REQUIREMENTS

# Variable: FRAMEWORK\_REQUIREMENTS

> `const` **FRAMEWORK\_REQUIREMENTS**: `object`

Defined in: [src/constants/complianceConstants.ts:86](https://github.com/Hack23/cia-compliance-manager/blob/3ae0301247f765ba03c8c0fe645db4718bb8af76/src/constants/complianceConstants.ts#L86)

Framework requirements mapping security levels to compliance frameworks

## Type declaration

### GDPR

> **GDPR**: `object`

#### GDPR.availability

> **availability**: `object`

#### GDPR.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### GDPR.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### GDPR.confidentiality

> **confidentiality**: `object`

#### GDPR.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### GDPR.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### GDPR.controls

> **controls**: `string`[]

#### GDPR.description

> **description**: `string` = `"General Data Protection Regulation for EU personal data"`

#### GDPR.integrity

> **integrity**: `object`

#### GDPR.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### GDPR.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### HIPAA

> **HIPAA**: `object`

#### HIPAA.availability

> **availability**: `object`

#### HIPAA.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### HIPAA.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### HIPAA.confidentiality

> **confidentiality**: `object`

#### HIPAA.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### HIPAA.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### HIPAA.controls

> **controls**: `string`[]

#### HIPAA.description

> **description**: `string` = `"Health Insurance Portability and Accountability Act"`

#### HIPAA.integrity

> **integrity**: `object`

#### HIPAA.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### HIPAA.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### ISO 27001

> **ISO 27001**: `object`

#### ISO 27001.availability

> **availability**: `object`

#### ISO 27001.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### ISO 27001.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### ISO 27001.confidentiality

> **confidentiality**: `object`

#### ISO 27001.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### ISO 27001.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### ISO 27001.controls

> **controls**: `string`[]

#### ISO 27001.description

> **description**: `string` = `"Information Security Management System (ISMS) standard"`

#### ISO 27001.integrity

> **integrity**: `object`

#### ISO 27001.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### ISO 27001.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### NIST CSF

> **NIST CSF**: `object`

#### NIST CSF.availability

> **availability**: `object`

#### NIST CSF.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### NIST CSF.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### NIST CSF.confidentiality

> **confidentiality**: `object`

#### NIST CSF.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### NIST CSF.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### NIST CSF.controls

> **controls**: `string`[]

#### NIST CSF.description

> **description**: `string` = `"Cybersecurity Framework for improving critical infrastructure"`

#### NIST CSF.integrity

> **integrity**: `object`

#### NIST CSF.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### NIST CSF.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### PCI DSS

> **PCI DSS**: `object`

#### PCI DSS.availability

> **availability**: `object`

#### PCI DSS.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### PCI DSS.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### PCI DSS.confidentiality

> **confidentiality**: `object`

#### PCI DSS.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### PCI DSS.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### PCI DSS.controls

> **controls**: `string`[]

#### PCI DSS.description

> **description**: `string` = `"Payment Card Industry Data Security Standard"`

#### PCI DSS.integrity

> **integrity**: `object`

#### PCI DSS.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### PCI DSS.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### SOC2

> **SOC2**: `object`

#### SOC2.availability

> **availability**: `object`

#### SOC2.availability.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### SOC2.availability.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### SOC2.confidentiality

> **confidentiality**: `object`

#### SOC2.confidentiality.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### SOC2.confidentiality.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### SOC2.controls

> **controls**: `string`[]

#### SOC2.description

> **description**: `string` = `"Service Organization Control 2"`

#### SOC2.integrity

> **integrity**: `object`

#### SOC2.integrity.minimum

> **minimum**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### SOC2.integrity.recommended

> **recommended**: [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)
