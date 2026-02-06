[**CIA Compliance Manager Diagrams v1.1.17**](../../../README.md)

***

[CIA Compliance Manager Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / isSecurityLevel

# Function: isSecurityLevel()

> **isSecurityLevel**(`value`): `value is SecurityLevel`

Defined in: [utils/securityLevelUtils.ts:525](https://github.com/Hack23/cia-compliance-manager/blob/64549ac2e28eb854ca1acff8c4df7f34bf49dfaa/src/utils/securityLevelUtils.ts#L525)

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
