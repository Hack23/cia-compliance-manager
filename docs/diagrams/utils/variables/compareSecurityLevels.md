[**CIA Compliance Manager Diagrams v1.1.26**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / compareSecurityLevels

# Variable: compareSecurityLevels()

> **compareSecurityLevels**: (`levelA`, `levelB`) => `number`

Defined in: [utils/index.ts:105](https://github.com/Hack23/cia-compliance-manager/blob/5f2722b27ad5a860c0c32d7458a8ddb0e3dddde9/src/utils/index.ts#L105)

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
