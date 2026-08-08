[**CIA Compliance Manager — UML Diagrams v1.1.129**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / compareSecurityLevels

# Variable: compareSecurityLevels

> **compareSecurityLevels**: (`levelA`, `levelB`) => `number`

Defined in: [utils/index.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/caa20908239c393ad6ffb27f9a5d3b0eb037294e/src/utils/index.ts#L95)

Compare two security levels

## Parameters

### levelA

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

First security level

### levelB

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Second security level

## Returns

`number`

-1 if A < B, 0 if A = B, 1 if A > B
