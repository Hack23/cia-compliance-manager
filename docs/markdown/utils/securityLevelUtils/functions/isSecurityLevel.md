[**CIA Compliance Manager — Markdown Documentation v1.1.128**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/securityLevelUtils](../README.md) / isSecurityLevel

# Function: isSecurityLevel()

> **isSecurityLevel**(`value`): `value is SecurityLevel`

Defined in: [utils/securityLevelUtils.ts:525](https://github.com/Hack23/cia-compliance-manager/blob/2e8ac3253dba27a3ec201aa4150b1a187ebebcb1/src/utils/securityLevelUtils.ts#L525)

Check if a string is a valid security level

Type guard function that validates whether a value is a valid SecurityLevel.
Useful for runtime type checking and validation of user input or API responses.

## Parameters

### value

`unknown`

Value to check (can be any type)

## Returns

`value is SecurityLevel`

Type predicate indicating if value is SecurityLevel

## Example

```typescript
if (isSecurityLevel(userInput)) {
  // TypeScript knows userInput is SecurityLevel here
  const level: SecurityLevel = userInput;
  console.log(`Valid security level: ${level}`);
}

isSecurityLevel('High')        // true
isSecurityLevel('Invalid')     // false
isSecurityLevel(123)           // false
isSecurityLevel(null)          // false
```
