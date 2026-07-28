[**CIA Compliance Manager — Markdown Documentation v1.1.121**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / compareSecurityLevels

# Variable: compareSecurityLevels

> **compareSecurityLevels**: (`levelA`, `levelB`) => `number`

Defined in: [utils/index.ts:95](https://github.com/Hack23/cia-compliance-manager/blob/5fee1bc4aabc01ca6dd59fb34a80389334401588/src/utils/index.ts#L95)

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
