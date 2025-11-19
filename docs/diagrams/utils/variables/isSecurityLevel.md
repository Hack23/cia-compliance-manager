[**CIA Compliance Manager Diagrams v0.9.0**](../../README.md)

***

[CIA Compliance Manager Diagrams](../../modules.md) / [utils](../README.md) / isSecurityLevel

# Variable: isSecurityLevel()

> **isSecurityLevel**: (`value`) => `value is SecurityLevel`

Defined in: [utils/index.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/bc57971ed3748ecb634c027ecf03cc2853174aaa/src/utils/index.ts#L112)

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
