[**CIA Compliance Manager — UML Diagrams v1.1.167**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/ComplianceServiceAdapter](../README.md) / getFrameworkCoverage

# Function: getFrameworkCoverage()

> **getFrameworkCoverage**(`levels`): [`FrameworkCoverage`](../interfaces/FrameworkCoverage.md)[]

Defined in: [services/ComplianceServiceAdapter.ts:463](https://github.com/Hack23/cia-compliance-manager/blob/2ae69334cea45a949f2efda6ff07c1e1e463257f/src/services/ComplianceServiceAdapter.ts#L463)

Get framework coverage analysis based on security levels

## Parameters

### levels

Object containing security levels for availability, integrity, and confidentiality

#### availability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### integrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### confidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

[`FrameworkCoverage`](../interfaces/FrameworkCoverage.md)[]

Array of framework coverage information
