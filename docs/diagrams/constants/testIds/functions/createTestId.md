[**CIA Compliance Manager — UML Diagrams v1.1.144**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/testIds](../README.md) / createTestId

# Function: createTestId()

> **createTestId**(...`parts`): `string`

Defined in: [constants/testIds.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/2eb40cb173e01bba3d798101b3bf4d31665a41ba/src/constants/testIds.ts#L45)

Generate hierarchical test ID from parts

## Parameters

### parts

...`string`[]

Array of ID parts to combine

## Returns

`string`

Formatted test ID in kebab-case

## Examples

```ts
createTestId('cost', 'estimation', 'button', 'submit')
// Returns: 'cost-estimation-button-submit'
```

```ts
createTestId('widget', 'Security Level')
// Returns: 'widget-security-level'
```
